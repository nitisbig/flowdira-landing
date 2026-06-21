/* ============================================================
   Region pages — "Web design agency for [region]". DELIBERATELY
   region-level, not per-city: Flowdira has no local address or
   reviews, so city pages would be thin-content penalty bait.
   Each page earns its keep with TRUE, region-specific delivery
   facts (timezone, currency, compliance) — not a city find-and-
   replace. See docs/programmatic-seo.md §3.
   ============================================================ */
import type { Faq, Block } from "../lib/pseo";

export interface Region {
  slug: string;
  name: string;
  /** Short form used in copy, e.g. "US", "European", "Australian". */
  adjective: string;
  title: string;
  description: string;
  h1Lead: string;
  h1Accent: string;
  lede: string;
  intro: string[];
  /** Region-specific, genuinely-true delivery facts. */
  facts: Block[];
  faqs: Faq[];
}

export const regions: Region[] = [
  {
    slug: "united-states",
    name: "United States",
    adjective: "US",
    title: "Web Design & Development Agency for the US | Flowdira",
    description:
      "Flowdira is a remote web design, development and AI studio serving US businesses — fast, accessible, conversion-focused websites with timezone-friendly collaboration.",
    h1Lead: "A web & AI studio for",
    h1Accent: "US businesses.",
    lede: "Flowdira designs, builds and ships modern websites and AI features for businesses across the United States — remote, senior, and easy to work with across US timezones.",
    intro: [
      "American businesses compete in one of the most crowded digital markets in the world, where site speed, accessibility and conversion directly decide who wins the click. Flowdira builds websites engineered for exactly that — fast, accessible and designed to convert — for clients across the US.",
      "We're a remote studio, which means you get senior design, development and AI work without local-agency overhead, and we structure collaboration around your working hours so the timezone gap is a non-issue.",
    ],
    facts: [
      {
        title: "Built for US accessibility expectations",
        body: "We build to WCAG accessibility standards — the foundation behind ADA expectations for US websites — so your site is usable by everyone and on safer legal footing.",
      },
      {
        title: "Timezone-friendly collaboration",
        body: "We schedule overlap with US hours for calls and reviews and work asynchronously the rest of the time, so progress never waits on the clock.",
      },
      {
        title: "Priced and invoiced in USD",
        body: "Clear, fixed quotes in US dollars with no surprise invoices — you know the full investment before we start.",
      },
      {
        title: "Performance that wins competitive markets",
        body: "90+ Lighthouse scores and strong Core Web Vitals out of the box — the speed edge that matters when US search results are this competitive.",
      },
    ],
    faqs: [
      {
        q: "Can you work with US clients remotely across timezones?",
        a: "Yes — most of our work is remote and we deliberately schedule overlap with US business hours for calls and reviews, working asynchronously otherwise. Clients consistently find the timezone gap is a non-issue.",
      },
      {
        q: "Do you build websites that meet US accessibility (ADA) expectations?",
        a: "We build to WCAG standards, which underpin ADA expectations for US sites. That means better usability for everyone and a stronger legal footing, baked in rather than bolted on.",
      },
      {
        q: "How do payments and pricing work for US clients?",
        a: "We quote a fixed price in USD up front, so you know the full investment before we begin, with clear milestones and no surprise invoices later.",
      },
    ],
  },
  {
    slug: "europe",
    name: "Europe",
    adjective: "European",
    title: "Web Design & Development Agency for Europe | Flowdira",
    description:
      "Flowdira is a remote web design, development and AI studio serving European businesses — GDPR-aware, fast, multilingual-ready websites built on a modern stack.",
    h1Lead: "A web & AI studio for",
    h1Accent: "European businesses.",
    lede: "Flowdira designs and builds fast, GDPR-aware websites and AI features for businesses across Europe — modern, compliant and ready for multiple languages and markets.",
    intro: [
      "European businesses operate across languages, currencies and one of the world's strictest privacy regimes. A website here has to be fast and beautiful, but also privacy-compliant and often multilingual. Flowdira builds sites that handle all of that without compromise.",
      "As a remote studio we bring senior design, development and AI capability to clients across Europe, with GDPR and cookie-consent handled properly from the start — not patched on after launch.",
    ],
    facts: [
      {
        title: "GDPR & cookie-consent done right",
        body: "We implement privacy-respecting analytics, proper cookie consent and data handling aligned with GDPR — compliance built into the foundation, not bolted on.",
      },
      {
        title: "Multilingual & multi-market ready",
        body: "Architecture and CMS set up for multiple languages and regions, with the right hreflang and structure so each market ranks in its own language.",
      },
      {
        title: "Works across European timezones",
        body: "Comfortable overlap with CET/CEST and surrounding zones for calls and reviews, with async delivery in between.",
      },
      {
        title: "Modern, fast, sustainable builds",
        body: "Lightweight, pre-rendered sites that load fast across Europe via global CDN — better Core Web Vitals and a lighter energy footprint.",
      },
    ],
    faqs: [
      {
        q: "Do you build GDPR-compliant websites?",
        a: "Yes. We implement privacy-respecting analytics, proper cookie consent and careful data handling aligned with GDPR from the start, so compliance is part of the build rather than a risky afterthought.",
      },
      {
        q: "Can you build a multilingual website for several European markets?",
        a: "We can. We structure the site and CMS for multiple languages and regions, with correct hreflang and architecture, so each market gets a fast, properly-ranking experience in its own language.",
      },
      {
        q: "Which European timezones can you work with?",
        a: "We're comfortable overlapping with Central European Time and the surrounding zones for meetings and reviews, and work asynchronously otherwise — so collaboration stays smooth wherever in Europe you are.",
      },
    ],
  },
  {
    slug: "australia",
    name: "Australia",
    adjective: "Australian",
    title: "Web Design & Development Agency for Australia | Flowdira",
    description:
      "Flowdira is a remote web design, development and AI studio serving Australian businesses — fast, locally-relevant, Privacy Act-aware websites built on a modern stack.",
    h1Lead: "A web & AI studio for",
    h1Accent: "Australian businesses.",
    lede: "Flowdira designs and builds fast, modern websites and AI features for businesses across Australia — locally relevant, compliant, and built to convert in the Australian market.",
    intro: [
      "Australian businesses need websites that load fast despite the distance from many global servers, speak to a local audience, and respect Australian privacy expectations. Flowdira builds sites engineered for the Australian market — quick, polished and locally relevant.",
      "We're a remote studio delivering senior design, development and AI work to clients across Australia, and we make the timezone work in your favour with planned overlap and async delivery.",
    ],
    facts: [
      {
        title: "Fast across Australian distances",
        body: "Pre-rendered pages served from a global CDN with edge locations near Australia, so your site loads fast for local visitors despite the geography.",
      },
      {
        title: "Australian Privacy Principles aware",
        body: "Data handling and consent built with the Australian Privacy Principles and Spam Act expectations in mind, so you're on solid footing locally.",
      },
      {
        title: "Locally-relevant content & SEO",
        body: "Australian-English copy, local schema and search structure tuned for how Australians actually search — not a generic global template.",
      },
      {
        title: "Timezone overlap that works",
        body: "We plan overlap with AEST/AEDT for calls and reviews and deliver asynchronously otherwise, keeping momentum around the clock.",
      },
    ],
    faqs: [
      {
        q: "Will my site load fast for Australian visitors?",
        a: "Yes. We serve pre-rendered pages from a global CDN with edge locations near Australia, so visitors get fast load times locally despite the distance to many overseas servers.",
      },
      {
        q: "Do you account for Australian privacy law?",
        a: "We build data handling and consent with the Australian Privacy Principles and Spam Act expectations in mind, so your site respects local requirements rather than only overseas ones.",
      },
      {
        q: "How does working with a remote studio across Australian timezones work?",
        a: "We plan regular overlap with AEST/AEDT for meetings and reviews and work asynchronously in between, so you get responsive collaboration and steady progress regardless of the timezone difference.",
      },
    ],
  },
];

export const getRegion = (slug: string) => regions.find((r) => r.slug === slug);
