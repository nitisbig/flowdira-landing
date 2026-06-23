/**
 * Flowdira knowledge base — the SINGLE SOURCE OF TRUTH for what the concierge
 * knows. Edit this file (and redeploy) to change what the bot can say.
 *
 * Keep it factual and in sync with the website. The system prompt instructs the
 * model to answer ONLY from what's here and to defer to contact@flowdira.com for
 * anything not covered — so don't add claims you can't stand behind.
 *
 * Drafted from the live site copy (Hero, Services, Process, Stats, FAQ).
 * Review the numbers and pricing language before going live.
 */
export const KNOWLEDGE = `
# About Flowdira

Flowdira is a small website **design, development & AI integration studio**.
One team takes a project from idea to live — design, build, and AI woven in —
with no handoffs and no gaps. Tagline: "Websites that look designed, built to
convert." Sites are designed in Figma, built clean, and shipped from GitHub to
Vercel.

Positioning: senior, accountable work from one studio — faster than an in-house
hire, more cohesive than juggling separate freelancers.

# Services

1. **Website Design** — UI/UX and brand-driven design that turns first
   impressions into trust: wireframes, design systems, brand identity, and
   pixel-perfect Figma files made to convert.

2. **Web Development** — fast, accessible front-end builds in Astro, Next.js &
   React. Clean, maintainable code, headless CMS, and 90+ Lighthouse scores out
   of the box.

3. **AI Integration** — AI woven into your product: chatbots, AI agents, RAG
   (smart) search, lead qualification, content drafting, and workflow automation
   using the latest LLMs. The goal is always measurable — faster responses,
   fewer manual tasks, features customers genuinely feel.

# How we work (process)

1. **Discover** — map goals, audience and tech stack; deliver a clear plan with
   fixed scope and timeline.
2. **Design** — wireframes evolve into polished, on-brand UI in Figma, reviewed
   in real time.
3. **Develop** — clean Astro & Next.js builds with AI features wired in,
   type-safe and tested on every commit.
4. **Deploy** — pushed to GitHub, auto-built and shipped live on Vercel, with
   analytics, SEO and handover docs.

# Pricing & timelines

- **Pricing is per-project, quoted to scope.** Clients get a fixed quote up
  front — the full investment is known before work starts, with no surprise
  invoices. Exact prices are not published; share scope to get a quote.
- **Timelines:** a typical marketing site goes from kickoff to launch in about
  **two weeks (~14 days)**; larger builds with custom functionality or AI
  features take roughly **four to eight weeks**. A milestone timeline is given
  on day one, and work ships in stages.

# SEO & performance

Every build ships with clean semantic markup, fast Core Web Vitals, structured
data, sitemaps and metadata baked in — the technical foundation Google rewards.
Designed for both search engines and the humans who convert. Custom builds load
faster, rank better and customise further than template builders (Wix /
WordPress), and you own your code.

# Support & ownership

Launch is the start, not the finish. Care plans cover updates, monitoring,
performance and new features. Clients always own their code and hosting; many
keep Flowdira on as their ongoing web & AI partner. Redesigns and migrations are
a core offering — existing SEO and brand equity are preserved, the rest is
rebuilt on a faster, modern stack.

# Tech stack

Astro, Next.js, React, headless CMS, Figma for design, GitHub + Vercel for
deploy. The latest LLMs for AI features.

# Studio in numbers (from the site)

- 40+ projects designed, built & shipped
- 98 average Lighthouse performance score
- ~14 days typical time from kickoff to launch
- 97% of clients come back for more

# Contact / next step

The best way to start or get a quote is to **book a demo** — click any
"Book a demo" button on the site to open a short form (name, email, what you
need, and a few project details). Flowdira replies within one business day with
ideas, a timeline and a fixed quote. You can also email **contact@flowdira.com**
directly. There is no public phone number or pricing page — booking a demo or
email is the entry point.
`.trim();
