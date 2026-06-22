# Flowdira Chatbot — Sales/Lead Concierge — Design Spec

**Date:** 2026-06-22
**Status:** Approved (pending spec review)
**Topic:** Provider-agnostic AI chat concierge for the Flowdira landing page

---

## 1. Goal & scope

Add a site-wide AI chat widget to the Flowdira landing page that acts as a
**sales / lead concierge**: it answers prospect questions about Flowdira's
services, process, and positioning — grounded in a curated knowledge file — and
nudges interested visitors toward the existing contact CTA
(`mailto:contact@flowdira.com` / the `/#contact` anchor).

The LLM backend is **provider-agnostic**: provider is selected entirely through
configuration (`baseURL` + `apiKey` + `model`), targeting the OpenAI-compatible
`/chat/completions` API that nearly every provider speaks (OpenAI, OpenRouter,
Groq, Together, DeepSeek, local Ollama, etc.). Swapping providers requires no
code change.

### In scope
- Floating launcher button + chat panel, available on every page.
- Streaming (SSE) responses, token-by-token.
- Curated knowledge file as the single source of truth for what the bot "knows".
- Standalone TypeScript Cloudflare Worker backend (free tier) holding the secret
  API key, knowledge, and abuse controls.
- Lightweight abuse/cost controls (rate limiting, hard caps, origin allowlist).
- Accessibility + design-system-matched styling.

### Out of scope (YAGNI)
- No lead storage / database / CRM (bot points to existing CTA only).
- No RAG / embeddings / vector store (curated file is enough for a small site).
- No auth, no multi-model picker UI, no chat analytics.
- No per-message persistence beyond `sessionStorage`.

---

## 2. Architecture

Two decoupled parts:

```
Browser (flowdira.com — static Astro on Vercel)
  └─ ChatWidget island ── POST {messages} ──▶  Cloudflare Worker (TS, free tier)
        ◀──────── SSE stream ────────             │ 1. CORS preflight / origin allowlist
                                                  │ 2. rate-limit binding (GA)
                                                  │ 3. validate + cap payload
                                                  │ 4. build [system + history]
                                                  ▼
                                     ${LLM_BASE_URL}/chat/completions
                                     (OpenAI-compatible, stream: true)
```

- The **Astro site stays 100% static** — no Vercel adapter, no SSR. The only
  change to the site is mounting one client island.
- The **Worker is the only secret-holding / network-proxying piece.** It is
  deployed independently via `wrangler deploy`.
- **Why a separate Cloudflare Worker (not a Vercel function):** Cloudflare's
  native **Rate Limiting binding is GA** (Sep 2025), giving real distributed
  rate limiting instead of best-effort in-memory limiting on Vercel serverless.
  Free tier is 100k requests/day — far beyond a landing page's needs. Keeps the
  Vercel deploy purely static.
- **Why TypeScript (not Python) for the Worker:** the logic is a trivial
  `fetch` + SSE transform. TS runs on the GA Workers runtime with fast cold
  starts; Python Workers (Pyodide/WASM, beta) add cold-start weight and risk
  `EXCEEDED_CPU` on the free tier's CPU limits, for zero functional benefit
  here.

---

## 3. Repository layout

Worker code lives in a **`backend/` subfolder of this same repo** — versioned
alongside the site, deployed separately.

```
flowdira-landing page/
├─ src/
│  ├─ components/
│  │  └─ ChatWidget.astro        # NEW — launcher + panel + scoped styles + client script
│  └─ layouts/
│     └─ Layout.astro            # EDIT — mount <ChatWidget /> once, site-wide
├─ backend/                      # NEW — standalone Cloudflare Worker
│  ├─ src/
│  │  ├─ index.ts                # fetch handler (CORS, rate-limit, validate, proxy, SSE transform)
│  │  ├─ system-prompt.ts        # buildSystemPrompt(knowledge) → persona + guardrails
│  │  └─ knowledge.ts            # curated Flowdira facts (single source of truth, hand-edited)
│  ├─ wrangler.toml              # name, main, compat date, ratelimit binding, vars
│  ├─ package.json
│  ├─ tsconfig.json
│  └─ .dev.vars                  # gitignored — local secrets/vars
├─ .env                          # EDIT/NEW — PUBLIC_CHAT_API_URL for the site (gitignored)
└─ .gitignore                    # EDIT — ensure backend/.dev.vars + backend/node_modules ignored
```

---

## 4. Configuration — provider-agnostic

| Key | Location | Type | Example |
|---|---|---|---|
| `LLM_BASE_URL` | Worker | var | `https://api.openai.com/v1` (or OpenRouter/Groq/DeepSeek base) |
| `LLM_MODEL` | Worker | var | `gpt-4o-mini`, `llama-3.1-70b-versatile`, etc. |
| `LLM_API_KEY` | Worker | **secret** | set via `wrangler secret put LLM_API_KEY` |
| `ALLOWED_ORIGINS` | Worker | var | `https://flowdira.com,https://www.flowdira.com,http://localhost:4321` |
| `PUBLIC_CHAT_API_URL` | Astro `.env` | public var | deployed Worker URL the widget calls |

- Optional tuning vars (with sane defaults baked in): `MAX_TOKENS` (default 500),
  `RATE_LIMIT_PER_MIN` (default 20), `MAX_MESSAGE_CHARS` (default 1500),
  `MAX_HISTORY` (default 10).
- **Provider swap** = change `LLM_BASE_URL`, `LLM_MODEL`, and the `LLM_API_KEY`
  secret. No redeploy of the frontend, no code edits.
- Local dev: Worker reads `backend/.dev.vars`; the site reads its own `.env`
  (Astro exposes only `PUBLIC_`-prefixed vars to the browser).
- The upstream request always calls `${LLM_BASE_URL}/chat/completions` with
  `Authorization: Bearer ${LLM_API_KEY}`.

---

## 5. Backend (Cloudflare Worker) behavior

`POST /` accepting JSON `{ messages: ChatMessage[] }` where
`ChatMessage = { role: "user" | "assistant", content: string }`.

Request pipeline in `src/index.ts`:

1. **CORS / preflight** — handle `OPTIONS`; respond with allowed-origin headers.
2. **Origin allowlist** — if request `Origin` not in `ALLOWED_ORIGINS`, return
   `403`. (Blocks other sites from spending the key.)
3. **Method check** — only `POST` for chat; else `405`.
4. **Rate limit** — Cloudflare `ratelimit` binding keyed on `CF-Connecting-IP`,
   `RATE_LIMIT_PER_MIN` requests / 60s. Over limit → `429`.
5. **Validate + cap** —
   - body is JSON with a `messages` array, else `400`;
   - drop everything but the last `MAX_HISTORY` messages;
   - reject if any message > `MAX_MESSAGE_CHARS`, or roles are invalid → `400`.
6. **Build payload** —
   `{ model: LLM_MODEL, stream: true, max_tokens: MAX_TOKENS, temperature: <fixed>,
   messages: [ {role:"system", content: buildSystemPrompt(knowledge)}, ...history ] }`.
   Model/temperature are fixed server-side; the client can never set them.
7. **Call upstream** — `fetch(${LLM_BASE_URL}/chat/completions, ...)`.
8. **Stream transform** — read the upstream SSE, parse `data:` lines, extract
   `choices[0].delta.content`, and re-emit **clean, provider-neutral** frames:
   `data: {"delta":"…"}\n\n`, finishing with `data: [DONE]\n\n`. This shields the
   client from per-provider response-shape differences (true provider-agnosticism).
   Implemented with `TransformStream`.

### System prompt (`system-prompt.ts`)
Wraps the knowledge file with:
- **Persona:** warm, concise Flowdira concierge (a web design / development / AI
  integration studio).
- **Grounding rule:** answer only from the provided knowledge. If a fact (e.g.
  exact pricing) isn't present, say so plainly and direct the visitor to
  `contact@flowdira.com`. Never invent prices, timelines, or claims.
- **Goal:** answer prospect questions, surface relevant services, and on clear
  buying intent, nudge toward the contact CTA — without being pushy.
- **Guardrails:** stay on topic (Flowdira + web/AI services); politely decline
  unrelated/abusive requests; keep replies short and chat-style.

### Knowledge file (`knowledge.ts`)
A single hand-edited export string containing: what Flowdira does, the three
service pillars (Design / Develop / AI), the process, positioning/differentiators,
common FAQ-style answers, and the contact CTA. Editing this file is the only step
needed to update what the bot knows.

---

## 6. Frontend (Astro `ChatWidget.astro`)

- **Markup:** a floating launcher button (bottom-right) and a chat panel with a
  header (title + close), a scrollable message list, and an input row
  (textarea + send).
- **Styling:** scoped `<style>` using existing design tokens — cream `--paper`,
  forest `--forest`, gold `--gold`, brand-blue `--blue` for interactive/active
  states — consistent with the editorial design language and grain treatment.
- **Client script (vanilla, in the island):**
  - maintains an in-memory `messages` array, mirrored to `sessionStorage` so the
    conversation survives in-session navigation;
  - on send: append the user bubble, open an empty assistant bubble, `POST` to
    `PUBLIC_CHAT_API_URL` with the capped history;
  - read the SSE stream via `fetch` + `ReadableStream` reader, appending each
    `delta` to the live assistant bubble; finalize on `[DONE]`;
  - disable send while streaming; surface errors inline.
- **Mount:** add `<ChatWidget />` once near the end of `Layout.astro`'s body so it
  appears on every page (home, privacy, terms, and all pSEO routes).

### Accessibility & responsiveness
- Fully keyboard operable; `Esc` closes the panel; focus moves into the panel on
  open and returns to the launcher on close.
- Streamed assistant text announced via an `aria-live="polite"` region.
- `prefers-reduced-motion` respected for open/close transitions (consistent with
  the site's existing reduced-motion gating).
- On small screens the panel becomes a full-height sheet.

---

## 7. Data flow (single message)

1. Visitor types and sends. Client appends the user bubble, opens an empty
   assistant bubble, and POSTs `{ messages: [last MAX_HISTORY] }`.
2. Worker runs the pipeline (§5) and calls the upstream provider with
   `stream: true`.
3. Worker parses upstream deltas and re-emits clean `data:{"delta":"…"}` frames,
   ending with `data:[DONE]`.
4. Client appends text live as frames arrive; on `[DONE]` it finalizes the bubble
   and re-enables input. History is saved to `sessionStorage`.

---

## 8. Error handling

| Condition | Backend | Frontend UX |
|---|---|---|
| Disallowed origin | `403` | (not user-facing; dev misconfig) |
| Bad/oversized body | `400` | "Couldn't send that — please shorten your message." |
| Rate limited | `429` | "You're going a bit fast — try again in a moment." |
| Upstream/provider error | `502` or SSE error frame | "Something went wrong. You can email contact@flowdira.com." |
| Network drop mid-stream | — | Inline retry affordance; partial text preserved. |

The fallback contact (`contact@flowdira.com`) is surfaced on hard failures so a
prospect is never dead-ended.

---

## 9. Abuse & cost controls (summary)

- **Rate limiting:** Cloudflare `ratelimit` binding (GA), per-IP, default
  20/min — real distributed limiting on the free tier.
- **Hard caps:** `max_tokens` (~500), per-message length (~1500 chars), history
  trimmed to last 10, total-payload guard.
- **Origin allowlist:** CORS allowlist prevents other origins from using the key.
- **Server-fixed model/temperature:** client cannot escalate cost via params.

These caps are the durable cost ceiling regardless of how rate limiting behaves
under load.

---

## 10. Deployment & local dev

- **Backend:** `cd backend && wrangler deploy`. Secrets via
  `wrangler secret put LLM_API_KEY`; vars in `wrangler.toml`. Local:
  `wrangler dev` reading `backend/.dev.vars`.
- **Frontend:** unchanged Vercel pipeline (`astro build`, static). Set
  `PUBLIC_CHAT_API_URL` in Vercel env + local `.env`.
- **`.gitignore`:** ensure `backend/.dev.vars` and `backend/node_modules/` are
  ignored (the existing `.env*` rules already cover the site `.env`).

---

## 11. Open items / future (not now)
- Optional Cloudflare Turnstile gate if bot traffic becomes a problem.
- Optional lead capture (collect + notify/store) if the studio later wants
  off-hours capture — would add a notification/storage component.
- Optional inline "try it" embed in the AI services section as a portfolio demo.
