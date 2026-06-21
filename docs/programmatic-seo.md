# Flowdira — Programmatic SEO Strategy

> Living document. Drives the data-templated pages under `src/data/*` and
> `src/pages/{web-design-for,compare,glossary,web-design}/`.

## 1. Situation

Flowdira is a website **design + development + AI-integration** studio serving
clients in the **US, Europe and Australia** (remote, no fixed local office). The
site was a single landing page (`/`) plus `/privacy` and `/terms`. A one-page
brochure site has almost nothing for Google to rank against the long tail of
buyer queries.

**Domain authority is near zero** (new domain). That single fact shapes every
decision below: we win on *relevance and unique value per page*, not volume.
Pumping out thousands of thin pages would trigger thin-content / doorway-page
penalties and waste crawl budget.

## 2. The opportunity (4 playbooks, layered)

| Playbook | URL pattern | Pages (v1) | Search intent | Data moat |
|----------|-------------|-----------|---------------|-----------|
| **Industry / persona** | `/web-design-for/[industry]/` | 8 | "web design for dentists" | Our positioning + real portfolio |
| **Comparison** | `/compare/[a]-vs-[b]/` | 6 | "astro vs next.js", "wix vs custom" | First-hand build experience |
| **Glossary** | `/glossary/[term]/` | 10 | "what is RAG", "headless CMS" | Topical authority for AI + web |
| **Region** | `/web-design/[region]/` | 3 | "web design agency USA/Europe/Australia" | Region-specific delivery facts |

**27 spoke pages + 4 hub pages = 31 new indexable URLs**, every one with
genuinely unique copy (≥500 words of differentiated content + a page-specific
FAQ that emits `FAQPage` schema).

### Why these four
- **Industry pages** match how an agency actually sells and convert best — a
  dentist searching "website design for dentists" is high-intent and we can
  speak to their specific pains (appointment booking, reviews, HIPAA-adjacent
  forms) instead of generic copy.
- **Comparison pages** capture mid-funnel buyers already deciding *how* to build
  ("Webflow vs custom", "Astro vs Next.js"). Lower competition, first-hand
  authority — we build on this stack daily.
- **Glossary pages** build topical authority around our AI + performance niche
  and earn AI-search / featured-snippet visibility ("what is RAG").
- **Region pages** layer geo-intent. See the honest caveat below.

## 3. Honest risk note — location pages

The client asked for location targeting (US / Europe / Australia). We are
**deliberately building region-level pages, not per-city pages.**

- Per-city pages ("web design agency in Austin") need *real local signals* —
  a verifiable address, Google Business Profile, local reviews, local backlinks.
  Flowdira has none of these. City pages without them are the textbook
  thin-content / doorway pattern Google penalises, and they will not rank.
- Region pages earn their keep with **unique, true** content: timezone overlap &
  async workflow, currency/invoicing, and compliance that genuinely differs by
  market (**GDPR/cookie law** in Europe, **ADA / WCAG** expectations in the US,
  **Australian Privacy Principles / Spam Act**). That is real differentiation,
  not a find-and-replace of a city name.
- If/when Flowdira establishes a registered address + reviews in a specific
  city, revisit per-city pages then — not before.

## 4. Data defensibility

Ranked strongest → weakest (we lean on the top of this list):

1. **Proprietary** — Flowdira's process, pricing model, opinions, and the
   **7 real shipped projects** in `works_url.txt` (use as proof/examples).
2. **Product-derived** — stack choices and Lighthouse results we actually ship.
3. **Public** — generic definitions (glossary). We add our own framing so the
   page isn't a Wikipedia echo.

## 5. Architecture

- **Subfolders, not subdomains** — consolidates authority on `flowdira.com`.
- **Typed data modules** (`src/data/*.ts`) + Astro `getStaticPaths` dynamic
  routes. Static output, zero runtime cost, fits the existing Astro 5 setup.
- **Shared shell** (`src/components/pseo/PseoShell.astro`) renders chrome,
  breadcrumbs, hero and a CTA band; `.pseo-*` classes live in `global.css` so
  styling is consistent and matches the editorial design system.
- **Schema per type**: every page emits `BreadcrumbList`; spokes add `Service`
  (industry/region), `DefinedTerm` (glossary) and `FAQPage` where a FAQ exists.

## 6. Internal linking (hub & spoke)

- Each playbook has a **hub** (`/web-design-for/`, `/compare/`, `/glossary/`,
  `/web-design/`) linking to all its spokes.
- Each **spoke** links back to its hub, to 2–3 sibling spokes, to relevant
  glossary terms, and to the home `#services` / `#contact` conversion points.
- Hubs are linked from the **site footer** ("Explore") so nothing is orphaned
  and every page is ≤2 clicks from `/`.
- All pages flow into `sitemap-index.xml` automatically via `@astrojs/sitemap`.

## 7. Quality bar (per page)

- [ ] Unique `<title>` + meta description (no templated duplicates)
- [ ] ≥500 words of page-specific, true content
- [ ] One H1 containing the target phrase
- [ ] Page-specific FAQ (3 Qs) → `FAQPage` schema
- [ ] Breadcrumbs + `BreadcrumbList`
- [ ] Links out to ≥3 related internal pages, links in from a hub
- [ ] Matches the cream/forest/blue design system

## 8. Post-launch

Submit `sitemap-index.xml` in Search Console. Track per-pattern: indexation
rate, impressions, position, CTR. Watch for cannibalisation (two pages chasing
one phrase) and prune or merge any page that stays thin/un-impressed after ~3
months. Expand the winning pattern (more industries / comparisons) before
adding new patterns.

## 9. Scaling later (cheap, because it's data-driven)

Add an object to the relevant `src/data/*.ts` file → a new page builds
automatically with full schema, breadcrumbs and internal links. Highest-value
next steps: more industries, an **industry × region** matrix only once region
pages prove they rank, and case-study pages for the 7 portfolio sites.
