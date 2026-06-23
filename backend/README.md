# Flowdira backend

A standalone Cloudflare Worker that serves two endpoints for the (static) site:

- **`POST /`** — a **provider-agnostic** chat concierge. Proxies an
  OpenAI-compatible `/chat/completions` endpoint, holds the secret API key,
  grounds replies in a curated knowledge file, and streams clean SSE frames.
- **`POST /book-demo`** — the **Book a demo** form handler. Validates a lead and
  emails it (owner notification + visitor auto-reply) via [Resend](https://resend.com).

Both reuse the same origin allowlist (CORS) and native rate limiting.

- **Frontend:** `src/components/ChatWidget.astro` and
  `src/components/BookDemoModal.astro` (in the main site) call this Worker via
  `PUBLIC_CHAT_API_URL` (chat posts to `/`, the modal posts to `/book-demo`).
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

### Book a demo (`POST /book-demo`)

```
Modal form ──POST {name,email,company,service,message,budget,timeline,company_url}──▶ Worker
                                     │ origin allowlist (CORS)
                                     │ rate limit (DEMO_RATE_LIMITER, 5/60s)
                                     │ validate + cap (demo.ts); honeypot → silent 200
                                     ▼
                        Resend API ──▶ owner notification (reply_to = visitor)
                                    └▶ visitor auto-reply (best-effort)
                          ◀──── { ok: true }  |  { error, message }
```

`demo.ts` owns validation + email building. The honeypot field `company_url`
(hidden from humans) makes the Worker return `200 { ok: true }` and send nothing.
The visitor auto-reply is **best-effort** — until the sending domain is verified
in Resend, sends to arbitrary addresses are rejected, so a failed auto-reply does
**not** fail the request as long as the owner notification was accepted.

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
| `RESEND_API_KEY` | **secret** | `wrangler secret put RESEND_API_KEY` (prod) / `.dev.vars` (local) |
| `DEMO_TO` | `wrangler.toml [vars]` | inbox that receives demo notifications (`contact@flowdira.com`) |
| `DEMO_FROM` | `wrangler.toml [vars]` | verified sender, e.g. `Flowdira <demo@flowdira.com>` |
| `MAX_DEMO_MESSAGE_CHARS` | `[vars]` | cap on the project-details field |

Current default provider: **Groq** (`llama-3.3-70b-versatile`).

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

Quick checks:
```bash
# Chat
curl -N -X POST http://127.0.0.1:8787/ \
  -H "Origin: https://flowdira.com" -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"What does Flowdira do?"}]}'

# Book a demo
curl -X POST http://127.0.0.1:8787/book-demo \
  -H "Origin: https://flowdira.com" -H "Content-Type: application/json" \
  -d '{"name":"Jane","email":"jane@example.com","message":"Need a new site","service":"Design"}'
```

`npm run typecheck` runs `tsc --noEmit`.

## Deploy

```bash
cd backend
wrangler login                       # one-time, your Cloudflare account
wrangler secret put LLM_API_KEY      # paste the provider key (never committed)
wrangler secret put RESEND_API_KEY   # paste the Resend key (never committed)
wrangler deploy                      # prints the live Worker URL
```

Then wire the site to the deployed URL:
1. Add the production domain(s) to `ALLOWED_ORIGINS` in `wrangler.toml` if not
   already present, and `wrangler deploy` again.
2. Set `PUBLIC_CHAT_API_URL` to the Worker URL in the repo `.env` **and** in the
   site's host build settings as an environment variable (Production + Preview),
   then redeploy the site so the value is inlined into the client bundle.
   _The marketing site (flowdira.com) is hosted on **Cloudflare Pages** — set the
   var under Pages → project → Settings → Environment variables → Build. (This
   Worker is a separate Cloudflare deploy via `wrangler`, not part of the Pages
   build.)_

### Resend setup (one-time, for `/book-demo`)

1. Create a free [Resend](https://resend.com) account and an API key (`re_…`).
2. `wrangler secret put RESEND_API_KEY` (local: add it to `.dev.vars`).
3. **Verify the sending domain** to send the visitor auto-reply: add Resend's DNS
   records for `flowdira.com`, then set
   `DEMO_FROM = "Flowdira <demo@flowdira.com>"` in `wrangler.toml` and redeploy.
   - **Before verification:** Resend test mode only sends from
     `onboarding@resend.dev` to **your own account email**. So set `DEMO_TO` to
     that email to receive owner notifications immediately; the visitor auto-reply
     stays disabled-by-rejection (handled gracefully) until the domain is verified.

## Updating what the bot knows

Edit `src/knowledge.ts` (facts) and/or `src/system-prompt.ts` (persona/rules),
then `wrangler deploy`. Keep claims accurate — the prompt instructs the model to
answer only from the knowledge and defer unknowns to `contact@flowdira.com`.

## Notes on model choice

Default is `llama-3.3-70b-versatile` — it follows the grounding rules well
(won't invent prices) and holds scope firmly (declines clearly off-topic
requests instead of answering them). If you want lower latency/cost and can
accept softer off-topic refusals, switch `LLM_MODEL` to `llama-3.1-8b-instant`
— config-only, no code change.
