/**
 * Worker environment — provider-agnostic LLM config + bindings.
 *
 * Non-secret vars come from wrangler.toml [vars] (overridable locally via
 * .dev.vars). LLM_API_KEY is a secret: `wrangler secret put LLM_API_KEY`
 * in production, or placed in .dev.vars for local dev.
 */
export interface Env {
  /** OpenAI-compatible API base, e.g. https://api.openai.com/v1 */
  LLM_BASE_URL: string;
  /** Model id, e.g. gpt-4o-mini, llama-3.1-70b-versatile */
  LLM_MODEL: string;
  /** Secret API key (Bearer token) for the provider. */
  LLM_API_KEY: string;
  /** Comma-separated allowlist of browser origins permitted to call this Worker. */
  ALLOWED_ORIGINS: string;
  /** Hard cap on response tokens (string; parsed to number). */
  MAX_TOKENS: string;
  /** Requests per minute per IP, for user-facing messaging (string; parsed). */
  RATE_LIMIT_PER_MIN: string;
  /** Max characters allowed in a single user message (string; parsed). */
  MAX_MESSAGE_CHARS: string;
  /** Max number of prior messages forwarded upstream (string; parsed). */
  MAX_HISTORY: string;
  /** Native Workers rate-limit binding (configured in wrangler.toml). */
  CHAT_RATE_LIMITER: RateLimit;
}

/**
 * Minimal type for the GA Workers rate-limit binding.
 * `limit({ key })` returns `{ success }` — false once the key is over budget.
 */
export interface RateLimit {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}
