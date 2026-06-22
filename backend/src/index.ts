/**
 * Flowdira chat concierge — Worker entrypoint.
 *
 * PHASE 1 SCAFFOLD: this is a minimal stub so the Worker boots and config is
 * validated. The real request pipeline (CORS/origin allowlist → rate limit →
 * validate → upstream proxy → SSE transform) is implemented in Phase 3.
 */
import type { Env } from "./env";

export default {
  async fetch(request: Request, _env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, service: "flowdira-chat" });
    }

    return new Response(
      "Flowdira chat backend (scaffold). Chat endpoint lands in Phase 3.",
      { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } },
    );
  },
} satisfies ExportedHandler<Env>;
