# Implementation Plan — Flowdira Chat Concierge

**Spec:** `docs/superpowers/specs/2026-06-22-chatbot-concierge-design.md`
**Date:** 2026-06-22

Defaults: `MAX_TOKENS=500`, `RATE_LIMIT_PER_MIN=20`, `MAX_MESSAGE_CHARS=1500`,
`MAX_HISTORY=10`. Example provider: OpenAI-compatible, `LLM_MODEL=gpt-4o-mini`
(swappable via env).

---

## Phase 1 — Backend scaffold (`backend/`)
1. Create `backend/` with `package.json` (wrangler + typescript devDeps),
   `tsconfig.json`, and `wrangler.toml` (name, `main = src/index.ts`, recent
   `compatibility_date`, `[[ratelimit]]` binding, `[vars]` for `LLM_BASE_URL`,
   `LLM_MODEL`, `ALLOWED_ORIGINS`, and optional tuning vars).
2. Add `backend/.dev.vars.example` (documented) and `backend/.dev.vars`
   (gitignored, real local values).
3. Update root `.gitignore`: `backend/node_modules/`, `backend/.dev.vars`.
4. **Verify:** `cd backend && npx wrangler dev` boots without error.

## Phase 2 — Knowledge + system prompt
5. `backend/src/knowledge.ts` — curated Flowdira facts (services, process,
   positioning, FAQ answers, contact CTA). *You will fill the real copy; I'll
   scaffold from existing site/FAQ/pSEO content as a first draft.*
6. `backend/src/system-prompt.ts` — `buildSystemPrompt(knowledge)` with persona,
   grounding rule, sales goal, guardrails.

## Phase 3 — Worker request pipeline (`backend/src/index.ts`)
7. CORS preflight (`OPTIONS`) + origin allowlist (`403` on miss).
8. Method check (`POST` only), JSON parse + validation (`messages` array, roles,
   per-message length, trim to `MAX_HISTORY`) → `400` on bad input.
9. Rate limit via `ratelimit` binding keyed on `CF-Connecting-IP` → `429`.
10. Build upstream payload (`system + history`, fixed `model`/`temperature`/
    `max_tokens`, `stream: true`) and `fetch` `${LLM_BASE_URL}/chat/completions`.
11. `TransformStream`: parse upstream SSE → re-emit clean `data:{"delta":"…"}`
    frames → `data:[DONE]`. Map upstream/non-200 to `502` + SSE error frame.
12. **Verify:** `curl -N` a POST to local `wrangler dev` streams clean deltas;
    bad origin → 403; oversized body → 400; rapid calls → 429.

## Phase 4 — Frontend widget (`src/components/ChatWidget.astro`)
13. Markup: launcher button + panel (header/close, scrollable message list,
    textarea + send).
14. Scoped styles using design tokens (`--paper`/`--forest`/`--gold`/`--blue`,
    grain), mobile full-height sheet.
15. Client script: `messages` state + `sessionStorage`; send → POST to
    `import.meta.env.PUBLIC_CHAT_API_URL`; read SSE via `fetch` +
    `ReadableStream`, append deltas live, finalize on `[DONE]`; disable send while
    streaming; inline error states (429 / 502 / network) with contact fallback.
16. A11y: keyboard ops, `Esc` to close, focus management, `aria-live` region,
    `prefers-reduced-motion`.
17. Mount `<ChatWidget />` in `src/layouts/Layout.astro` (site-wide). Add
    `PUBLIC_CHAT_API_URL` to root `.env`.
18. **Verify:** `npm run dev`, widget opens on home + a pSEO page, streams a reply
    from local Worker, keyboard + reduced-motion behave.

## Phase 5 — Deploy & docs
19. `wrangler secret put LLM_API_KEY`; `wrangler deploy`; capture Worker URL.
20. Set `PUBLIC_CHAT_API_URL` in Vercel env (Production + Preview) and local `.env`.
21. Add `backend/README.md` (config, provider swap, deploy, local dev).
22. **Verify (prod):** deployed site streams; provider swap test (change
    `LLM_BASE_URL`/`LLM_MODEL`/secret → still works, no code change).

---

## Commit checkpoints
- C1: backend scaffold + gitignore (Phase 1)
- C2: knowledge + system prompt (Phase 2)
- C3: worker pipeline + streaming (Phase 3)
- C4: widget + layout mount (Phase 4)
- C5: deploy docs + README (Phase 5)
