/**
 * Request shape, runtime config parsing, and validation/capping.
 *
 * These are the durable cost guards: regardless of how rate limiting behaves,
 * a single request can never exceed maxMessageChars per message, maxHistory
 * messages, or a sane absolute array length.
 */
import type { Env } from "./env";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatConfig {
  maxTokens: number;
  maxMessageChars: number;
  maxHistory: number;
}

/** Hard ceiling on incoming array length before trimming, to reject abuse. */
const ABSOLUTE_MAX_MESSAGES = 100;

function toInt(value: string | undefined, fallback: number): number {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export function parseConfig(env: Env): ChatConfig {
  return {
    maxTokens: toInt(env.MAX_TOKENS, 500),
    maxMessageChars: toInt(env.MAX_MESSAGE_CHARS, 1500),
    maxHistory: toInt(env.MAX_HISTORY, 10),
  };
}

export type ValidationResult =
  | { ok: true; messages: ChatMessage[] }
  | { ok: false; error: string };

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false;
  const m = value as Record<string, unknown>;
  return (
    (m.role === "user" || m.role === "assistant") &&
    typeof m.content === "string"
  );
}

/**
 * Validate the request body and return a trimmed, capped message list ready to
 * forward upstream (system prompt is prepended by the caller).
 */
export function validateMessages(
  body: unknown,
  cfg: ChatConfig,
): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const messages = (body as Record<string, unknown>).messages;
  if (!Array.isArray(messages)) {
    return { ok: false, error: "Expected a 'messages' array." };
  }
  if (messages.length === 0) {
    return { ok: false, error: "Send at least one message." };
  }
  if (messages.length > ABSOLUTE_MAX_MESSAGES) {
    return { ok: false, error: "Too many messages." };
  }

  const cleaned: ChatMessage[] = [];
  for (const item of messages) {
    if (!isChatMessage(item)) {
      return { ok: false, error: "Each message needs a valid role and content." };
    }
    const content = item.content.trim();
    if (content.length === 0) {
      return { ok: false, error: "Messages can't be empty." };
    }
    if (content.length > cfg.maxMessageChars) {
      return {
        ok: false,
        error: `Please keep messages under ${cfg.maxMessageChars} characters.`,
      };
    }
    cleaned.push({ role: item.role, content });
  }

  // Keep only the most recent turns.
  const trimmed = cleaned.slice(-cfg.maxHistory);

  if (trimmed[trimmed.length - 1]?.role !== "user") {
    return { ok: false, error: "The last message must be from the user." };
  }

  return { ok: true, messages: trimmed };
}
