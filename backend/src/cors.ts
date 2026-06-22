/**
 * Origin allowlisting + CORS headers.
 *
 * The browser sends an `Origin` header; we only ever reflect origins that are
 * explicitly listed in ALLOWED_ORIGINS. This is what stops other sites from
 * pointing their chat widget at this Worker and spending the API key.
 */
import type { Env } from "./env";

export function parseAllowedOrigins(env: Env): string[] {
  return env.ALLOWED_ORIGINS.split(",")
    .map((o) => o.trim())
    .filter(Boolean);
}

export function isAllowedOrigin(
  origin: string | null,
  allowed: string[],
): origin is string {
  return origin !== null && allowed.includes(origin);
}

/** CORS headers for an already-validated, allowed origin. */
export function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}
