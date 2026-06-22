# Flowdira chat backend

A standalone, **provider-agnostic** Cloudflare Worker that powers the site's chat
concierge. It proxies an OpenAI-compatible `/chat/completions` endpoint, holds
the secret API key, grounds replies in a curated knowledge file, and streams
clean SSE frames to the browser widget.

- **Frontend:** `src/components/ChatWidget.astro` (in the main site) calls this
  Worker via `PUBLIC_CHAT_API_URL`.
- **Design/plan:** `docs/superpowers/specs/2026-06-22-chatbot-concierge-design.md`.

## How it works

```
Browser widget ──POST {messages}──▶ Worker
                                     │ origin allowlist (CORS)
                                     │ rate limit (CHAT_RATE_LIMITER, 20/60s)
                                     │ validate + cap (length, history)
                                     │ prepend system prompt + knowledge
                                     ▼
                        ${LLM_BASE_URL}/chat/completions  (stream: true)
        ◀──── SSE: data:{"delta":"…"} … data:[DONE] ────
```

Source: `index.ts` (pipeline), `cors.ts`, `chat.ts` (validation), `stream.ts`
(SSE transform), `system-prompt.ts` + `knowledge.ts` (what the bot knows).

## Configuration (provider-agnostic)

Any provider speaking the OpenAI-compatible chat API works — only config changes,
never code.

| Key | Where | Notes |
|---|---|---|
| `LLM_BASE_URL` | `wrangler.toml [vars]` | API base, e.g. `https://api.groq.com/openai/v1` |
| `LLM_MODEL` | `wrangler.toml [vars]` | e.g. `llama-3.1-8b-instant` |
| `LLM_API_KEY` | **secret** | `wrangler secret put LLM_API_KEY` (prod) / `.dev.vars` (local) |
| `ALLOWED_ORIGINS` | `wrangler.toml [vars]` | comma-separated browser origins allowed to call the Worker |
| `MAX_TOKENS` / `RATE_LIMIT_PER_MIN` / `MAX_MESSAGE_CHARS` / `MAX_HISTORY` | `[vars]` | cost/abuse caps |

Current default provider: **Groq** (`llama-3.1-8b-instant`).

### Swapping providers
1. Edit `LLM_BASE_URL` + `LLM_MODEL` in `wrangler.toml` (e.g. OpenAI
   `https://api.openai.com/v1` + `gpt-4o-mini`, OpenRouter, DeepSeek, local
   Ollama…).
2. `wrangler secret put LLM_API_KEY` with that provider's key.
3. `wrangler deploy`. No frontend change, no code change.

## Local development

```bash
cd backend
npm install
# put your key in .dev.vars (gitignored):
#   LLM_API_KEY="..."
npm run dev            # wrangler dev on http://127.0.0.1:8787
```

Point the site at it: in the repo root `.env`, set
`PUBLIC_CHAT_API_URL="http://127.0.0.1:8787"`, then run `npm run dev` in the root
to start Astro. The dev origin `http://localhost:4321` is already in
`ALLOWED_ORIGINS`.

Quick check:
```bash
curl -N -X POST http://127.0.0.1:8787/ \
  -H "Origin: https://flowdira.com" -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What does Flowdira do?"}]}'
```

`npm run typecheck` runs `tsc --noEmit`.

## Deploy

```bash
cd backend
wrangler login                       # one-time, your Cloudflare account
wrangler secret put LLM_API_KEY      # paste the provider key (never committed)
wrangler deploy                      # prints the live Worker URL
```

Then wire the site to the deployed URL:
1. Add the production domain(s) to `ALLOWED_ORIGINS` in `wrangler.toml` if not
   already present, and `wrangler deploy` again.
2. Set `PUBLIC_CHAT_API_URL` to the Worker URL in the repo `.env` **and** in
   Vercel → Project → Settings → Environment Variables (Production + Preview),
   then redeploy the site so the value is inlined into the client bundle.

## Updating what the bot knows

Edit `src/knowledge.ts` (facts) and/or `src/system-prompt.ts` (persona/rules),
then `wrangler deploy`. Keep claims accurate — the prompt instructs the model to
answer only from the knowledge and defer unknowns to `contact@flowdira.com`.

## Notes on model choice

`llama-3.1-8b-instant` is fast and cheap and follows the grounding rules well
(e.g. it won't invent prices). Being a small model, it's a bit soft on strict
scope refusals (it may still answer a clearly off-topic request). For tighter
guardrails, switch `LLM_MODEL` to a stronger model (e.g. Groq's
`llama-3.3-70b-versatile`) — config-only, no code change.
