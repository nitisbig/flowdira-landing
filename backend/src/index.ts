/**
 * Flowdira chat concierge — Worker entrypoint.
 *
 * Pipeline for POST /:
 *   CORS/origin allowlist -> rate limit -> validate+cap -> build [system+history]
 *   -> call ${LLM_BASE_URL}/chat/completions (stream) -> SSE transform -> client.
 *
 * Success: 200 text/event-stream of `data:{"delta":"…"}` frames ending in
 * `data:[DONE]`. Errors: JSON `{ error, message? }` with a 4xx/5xx status.
 */
import type { Env } from "./env";
import { corsHeaders, isAllowedOrigin, parseAllowedOrigins } from "./cors";
import { parseConfig, validateMessages } from "./chat";
import { buildSystemPrompt } from "./system-prompt";
import { transformUpstreamSSE } from "./stream";

const CONTACT = "contact@flowdira.com";
const TEMPERATURE = 0.4;

function jsonResponse(
  body: unknown,
  status: number,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...extraHeaders },
  });
}

/** Join base + path without doubling or dropping the slash. */
function chatCompletionsUrl(baseUrl: string): string {
  return `${baseUrl.replace(/\/+$/, "")}/chat/completions`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const origin = request.headers.get("Origin");
    const allowed = parseAllowedOrigins(env);

    // Health check — no CORS needed.
    if (request.method === "GET" && url.pathname === "/health") {
      return jsonResponse({ ok: true, service: "flowdira-chat" }, 200);
    }

    // CORS preflight.
    if (request.method === "OPTIONS") {
      return isAllowedOrigin(origin, allowed)
        ? new Response(null, { status: 204, headers: corsHeaders(origin) })
        : new Response(null, { status: 403 });
    }

    if (request.method !== "POST") {
      return jsonResponse({ error: "method_not_allowed" }, 405);
    }

    // Origin allowlist — blocks other sites from spending the key.
    if (!isAllowedOrigin(origin, allowed)) {
      return jsonResponse({ error: "forbidden" }, 403);
    }
    const cors = corsHeaders(origin);

    // Rate limit per client IP (native GA binding).
    const ip = request.headers.get("CF-Connecting-IP") ?? "unknown";
    const { success } = await env.CHAT_RATE_LIMITER.limit({ key: ip });
    if (!success) {
      return jsonResponse(
        { error: "rate_limited", message: "You're going a bit fast — try again in a moment." },
        429,
        cors,
      );
    }

    // Parse + validate body.
    const cfg = parseConfig(env);
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return jsonResponse({ error: "invalid_json" }, 400, cors);
    }
    const result = validateMessages(body, cfg);
    if (!result.ok) {
      return jsonResponse({ error: "invalid_request", message: result.error }, 400, cors);
    }

    // Build upstream payload. Model/temperature/max_tokens are fixed
    // server-side; the client can never escalate cost.
    const payload = {
      model: env.LLM_MODEL,
      stream: true,
      max_tokens: cfg.maxTokens,
      temperature: TEMPERATURE,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...result.messages,
      ],
    };

    // Call the provider.
    let upstream: Response;
    try {
      upstream = await fetch(chatCompletionsUrl(env.LLM_BASE_URL), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${env.LLM_API_KEY}`,
        },
        body: JSON.stringify(payload),
      });
    } catch {
      return jsonResponse(
        { error: "upstream_unreachable", message: `Something went wrong reaching the assistant. Please email ${CONTACT}.` },
        502,
        cors,
      );
    }

    if (!upstream.ok || !upstream.body) {
      // Log for debugging; never leak the provider's error to the client.
      console.error("Upstream error", upstream.status, await upstream.text().catch(() => ""));
      return jsonResponse(
        { error: "upstream_error", message: `Something went wrong. You can email ${CONTACT}.` },
        502,
        cors,
      );
    }

    // Stream clean, provider-neutral SSE frames back to the browser.
    return new Response(transformUpstreamSSE(upstream.body), {
      status: 200,
      headers: {
        ...cors,
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
      },
    });
  },
} satisfies ExportedHandler<Env>;
