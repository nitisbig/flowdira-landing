# Flowdira — Landing Page

Marketing landing page for **Flowdira**, a website design, development & AI
integration studio. Built with **Astro** for a near‑zero‑JS, fast‑loading,
SEO‑first site.

> Design language: warm editorial — cream paper, deep forest green, gold accent,
> a characterful serif (**Fraunces**) paired with a clean grotesque
> (**Hanken Grotesk**). Adapted from the supplied reference into a unique,
> production‑grade studio aesthetic.

## Tech

- **Astro 5** — static output, HTML‑first, ~1 kB of shipped JS (scroll reveals + mobile menu)
- **@fontsource‑variable** — self‑hosted variable fonts (no layout shift, no external font requests)
- **@astrojs/sitemap** — automatic `sitemap-index.xml`
- CSS custom properties design system, CSS‑only animations, `IntersectionObserver` reveals

## Scripts

```bash
npm install      # install dependencies
npm run dev      # local dev server → http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

## Structure

```
src/
  layouts/Layout.astro      # <head>, SEO meta, OpenGraph, JSON‑LD, fonts, reveal engine
  styles/global.css         # design tokens + base + utilities
  components/
    Header.astro            # sticky nav + mobile sheet
    Hero.astro              # split hero, sunburst, floating deploy/stat cards
    LogoCloud.astro         # marquee of client wordmarks
    Services.astro          # Design · Development · AI Integration
    Showcase.astro          # work as GitHub→Vercel deployment cards
    Process.astro           # Discover · Design · Develop · Deploy
    Stats.astro             # dark forest results band
    Testimonial.astro       # featured client quote
    CTA.astro               # contact band w/ email handoff
    Footer.astro            # sitemap links + socials
  pages/index.astro         # composes the page
public/
  favicon.svg  og.svg  robots.txt
```

## SEO

- Keyword‑optimised `<title>`, meta description & keywords targeting
  *website design and development*, *AI integration services*,
  *web development agency*, *Vercel deployment*, and related terms.
- `ProfessionalService` + `WebSite` JSON‑LD structured data.
- OpenGraph + Twitter cards, canonical URLs, `robots.txt`, sitemap.
- Semantic landmarks, skip link, `prefers-reduced-motion` support.

## Deploy to Vercel

Zero config — Vercel auto‑detects Astro.

1. Push this folder to a **GitHub** repo.
2. In Vercel → **New Project** → import the repo.
3. Framework preset: **Astro** (auto). Build `npm run build`, output `dist/`.
4. Deploy. Every push to `main` ships a new production deployment; PRs get
   preview URLs.

> Update `site: 'https://flowdira.com'` in `astro.config.mjs` and the social
> handles in `Footer.astro` / JSON‑LD to your real URLs before launch.

### Recommended follow‑up

The OpenGraph image is an SVG (`public/og.svg`). Most social platforms prefer
raster — generate a `1200×630` PNG (e.g. with `@vercel/og`) for perfect link
previews on X, LinkedIn & Slack.
