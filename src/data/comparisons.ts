/* ============================================================
   Comparison pages — "[A] vs [B]". Mid-funnel buyer intent.
   First-hand authority: we build on these tools daily, so the
   verdict is an opinion, not a Wikipedia paraphrase.
   ============================================================ */
import type { Faq } from "../lib/pseo";

export interface CompareRow {
  aspect: string;
  a: string;
  b: string;
}

export interface Comparison {
  slug: string;
  optionA: string;
  optionB: string;
  title: string;
  description: string;
  h1: string;
  lede: string;
  intro: string[];
  rows: CompareRow[];
  /** Flowdira's honest take — paragraphs. */
  verdict: string[];
  faqs: Faq[];
}

export const comparisons: Comparison[] = [
  {
    slug: "astro-vs-nextjs",
    optionA: "Astro",
    optionB: "Next.js",
    title: "Astro vs Next.js: Which Should You Build With? | Flowdira",
    description:
      "Astro vs Next.js compared by a studio that ships both. Performance, use cases, SEO and when each wins — plus our honest recommendation for your project.",
    h1: "Astro vs Next.js",
    lede: "Two excellent modern frameworks, two different sweet spots. Here's how they compare — from a studio that ships production sites on both.",
    intro: [
      "Astro and Next.js are both top-tier choices in 2026, but they're optimised for different problems. Astro is content-first and ships almost no JavaScript by default; Next.js is app-first and excels when your site is really a web application. Picking the wrong one means either fighting the framework or shipping a slower site than you needed to.",
      "We build on both regularly, so this isn't theoretical. Below is how they actually compare on the things that matter for a real project.",
    ],
    rows: [
      { aspect: "Best for", a: "Content & marketing sites, blogs, docs, landing pages", b: "Web apps, dashboards, highly interactive products" },
      { aspect: "Default JS shipped", a: "Near-zero — interactivity is opt-in ('islands')", b: "More by default; React runs the page" },
      { aspect: "Raw performance", a: "Exceptional out of the box for content", b: "Excellent when tuned; heavier baseline" },
      { aspect: "Rendering", a: "Static + on-demand, framework-agnostic UI", b: "SSR, SSG, ISR, RSC — very flexible" },
      { aspect: "Learning curve", a: "Gentle, HTML-first", b: "Steeper; React + App Router concepts" },
      { aspect: "Ecosystem", a: "Growing, can use React/Vue/Svelte inside", b: "Huge, mature React ecosystem" },
    ],
    verdict: [
      "Our rule of thumb: if the site is mostly content that needs to load fast and rank — a marketing site, blog, docs or landing pages — Astro is usually the better tool. It ships less code, so Core Web Vitals are excellent with little effort. (This very site is built in Astro.)",
      "If the project is fundamentally an application — authenticated dashboards, complex state, lots of real-time interactivity — Next.js earns its weight and the React ecosystem pays off. Many products use both: Astro for the marketing site, Next.js for the app.",
      "The honest answer is that the framework matters less than who builds it. We choose per project and tell you why.",
    ],
    faqs: [
      {
        q: "Is Astro faster than Next.js?",
        a: "For content-heavy sites, usually yes — Astro ships almost no JavaScript by default, so it tends to have better Core Web Vitals out of the box. A carefully built Next.js site can be very fast too, but you have to work harder to get there.",
      },
      {
        q: "Can I use React components in Astro?",
        a: "Yes. Astro is UI-agnostic — you can drop in React (or Vue/Svelte) components as interactive 'islands' while keeping the rest of the page static. That makes it easy to reuse existing React work.",
      },
      {
        q: "Which one should my business use?",
        a: "If your site is mainly content and marketing, Astro is often the better fit; if it's really a web app, Next.js usually wins. We assess your specific project and recommend the right one — and sometimes that's both.",
      },
    ],
  },
  {
    slug: "custom-website-vs-wordpress",
    optionA: "Custom website",
    optionB: "WordPress",
    title: "Custom Website vs WordPress: Which Is Right for You? | Flowdira",
    description:
      "Custom website vs WordPress compared on speed, security, cost, SEO and scalability. An honest look at when a custom build beats WordPress — and when it doesn't.",
    h1: "Custom website vs WordPress",
    lede: "WordPress powers a huge share of the web — but 'popular' isn't the same as 'right for you'. Here's an honest comparison.",
    intro: [
      "WordPress is everywhere, and for good reason: it's flexible, familiar and cheap to start. But that flexibility comes from plugins, and plugins bring weight, security exposure and maintenance. A custom build trades the plugin ecosystem for speed, security and control. Which is right depends on your priorities.",
      "We've built and rescued plenty of both, so here's a straight comparison rather than a sales pitch.",
    ],
    rows: [
      { aspect: "Speed", a: "Fast by design; only the code you need", b: "Depends heavily on theme + plugins; often slow" },
      { aspect: "Security", a: "Small attack surface, no plugin vulnerabilities", b: "Plugins are the #1 source of hacks" },
      { aspect: "Maintenance", a: "Minimal; nothing to constantly update", b: "Ongoing plugin/core updates required" },
      { aspect: "Upfront cost", a: "Higher to build", b: "Lower to start" },
      { aspect: "Editing content", a: "Headless CMS, tailored to you", b: "Familiar WordPress admin" },
      { aspect: "Scalability & control", a: "Full control; scales cleanly", b: "Can get tangled as plugins accumulate" },
    ],
    verdict: [
      "If you need a simple blog or brochure site today and budget is the tightest constraint, WordPress is a reasonable start. It's cheap and the admin is familiar.",
      "But if performance, security, SEO and long-term control matter — and especially if the site is core to your business — a custom build usually wins. You own clean code, you're not exposed to plugin vulnerabilities, and the site loads fast without constant maintenance. We often pair a custom front-end with a friendly headless CMS so you keep easy editing without the WordPress baggage.",
      "The deciding factor is usually how much the site matters to your business. The more it matters, the more a custom build pays off.",
    ],
    faqs: [
      {
        q: "Is a custom website really faster than WordPress?",
        a: "Generally yes. A custom site ships only the code it needs, while WordPress speed depends on its theme and stack of plugins, which often add significant weight. Faster pages help both conversions and SEO.",
      },
      {
        q: "Will I still be able to edit content on a custom site?",
        a: "Yes. We connect a headless CMS tailored to your content, so editing is often simpler than WordPress — without the plugin sprawl and update treadmill.",
      },
      {
        q: "Is WordPress less secure?",
        a: "Its core is reasonably secure, but plugins are the most common source of WordPress hacks. A custom build has a much smaller attack surface because there's no third-party plugin ecosystem to exploit.",
      },
    ],
  },
  {
    slug: "custom-website-vs-wix",
    optionA: "Custom website",
    optionB: "Wix",
    title: "Custom Website vs Wix: Honest Comparison | Flowdira",
    description:
      "Custom website vs Wix compared on performance, SEO, ownership, cost and scalability. When a website builder is fine — and when it's holding your business back.",
    h1: "Custom website vs Wix",
    lede: "Wix is a great way to get online in a weekend. But builders have real ceilings. Here's when you've outgrown one.",
    intro: [
      "Website builders like Wix lower the barrier to getting online — drag, drop, publish. For a hobby site or a quick first presence, that's genuinely useful. The trade-offs show up as your business grows: performance ceilings, SEO limits, and the fact that you don't truly own the site or its code.",
      "Here's an honest comparison so you can tell whether you've outgrown the builder.",
    ],
    rows: [
      { aspect: "Time to launch", a: "Weeks (designed + built)", b: "Days (drag-and-drop)" },
      { aspect: "Performance", a: "Optimised, fast", b: "Heavier; limited control over speed" },
      { aspect: "SEO ceiling", a: "Full control of markup, schema, speed", b: "Improved, but still constrained" },
      { aspect: "Ownership", a: "You own the code and can move freely", b: "Locked into the platform" },
      { aspect: "Customisation", a: "Anything you can design", b: "Limited to the builder's capabilities" },
      { aspect: "Cost over time", a: "Higher upfront, lower ceiling", b: "Low upfront, recurring + capped growth" },
    ],
    verdict: [
      "If you're testing an idea, on a shoestring, or just need a basic presence fast, Wix is fine — don't over-engineer a hobby. Use the builder and move on.",
      "Once the website is a real growth channel — when SEO rankings, conversion rate and brand perception affect revenue — a builder starts to cost you more than it saves. A custom site removes the ceilings: full control over performance and SEO, a design that's truly yours, and code you own and can take anywhere.",
      "Migrating off a builder later is doable but disruptive, so if you can already see growth coming, building custom sooner avoids a painful move.",
    ],
    faqs: [
      {
        q: "Is Wix bad for SEO?",
        a: "It's improved a lot and is fine for basics, but it still constrains how much control you have over speed, markup and structured data. A custom site removes those ceilings, which matters once you're competing for rankings.",
      },
      {
        q: "Can you migrate my existing Wix site?",
        a: "Yes. We rebuild on a faster, modern stack, carefully preserve the content and SEO that's already working, and set up redirects so you don't lose rankings in the move.",
      },
      {
        q: "Is a custom site worth it over Wix for a small business?",
        a: "If your website meaningfully drives revenue, usually yes — the performance, SEO and ownership benefits compound. If it's just a basic placeholder, a builder may be all you need for now.",
      },
    ],
  },
  {
    slug: "custom-website-vs-webflow",
    optionA: "Custom website",
    optionB: "Webflow",
    title: "Custom Website vs Webflow: Which to Choose? | Flowdira",
    description:
      "Custom website vs Webflow compared on design freedom, performance, cost, SEO and scalability. A studio's honest take on when each approach makes sense.",
    h1: "Custom website vs Webflow",
    lede: "Webflow is the most capable visual builder out there. So when does a fully custom build still win? Here's the honest line.",
    intro: [
      "Webflow sits between a builder and a custom site: powerful visual design, decent performance, and real CMS capability. For many marketing sites it's genuinely good. But it has its own constraints — platform lock-in, recurring costs that scale, and ceilings on advanced functionality and integrations.",
      "Because Webflow is so capable, the choice is more nuanced than with simpler builders. Here's how we think about it.",
    ],
    rows: [
      { aspect: "Design freedom", a: "Unlimited", b: "High, within Webflow's model" },
      { aspect: "Performance", a: "Fully optimisable", b: "Good, but limited fine-tuning" },
      { aspect: "Advanced functionality", a: "Anything (apps, AI, custom logic)", b: "Constrained; needs workarounds/embeds" },
      { aspect: "CMS", a: "Any headless CMS you like", b: "Built-in CMS (with item limits)" },
      { aspect: "Ownership", a: "Own the code, host anywhere", b: "Hosted on Webflow; platform lock-in" },
      { aspect: "Ongoing cost", a: "Hosting only", b: "Recurring plan, scales with usage" },
    ],
    verdict: [
      "For a straightforward marketing site where the team wants to edit visually and the functionality is standard, Webflow is a strong, fast-to-launch choice. We won't oversell custom when Webflow fits.",
      "But when you need real application logic, deep integrations, AI features, full performance control, or freedom from platform lock-in and scaling fees, a custom build is the better long-term home. It does anything you can design, you own the code, and you're not renting your own website.",
      "If advanced functionality or independence is on your roadmap, custom is usually the smarter destination — even if Webflow could get you live sooner.",
    ],
    faqs: [
      {
        q: "Is Webflow good for SEO?",
        a: "Yes, it's solid — clean markup and decent speed. A custom build still gives you more control over performance and advanced structured data, which matters in competitive niches, but Webflow is far from a blocker for most sites.",
      },
      {
        q: "Can I add custom functionality or AI to a Webflow site?",
        a: "To a point, via embeds and third-party tools, but you'll hit limits. If advanced logic, AI features or deep integrations are central, a custom build handles them natively rather than as workarounds.",
      },
      {
        q: "Do I own my Webflow site?",
        a: "You can export static code, but dynamic CMS content and hosting are tied to the platform. A custom site is fully yours — code and hosting — with no lock-in.",
      },
    ],
  },
  {
    slug: "agency-vs-freelancer",
    optionA: "Agency / studio",
    optionB: "Freelancer",
    title: "Web Design Agency vs Freelancer: Which to Hire? | Flowdira",
    description:
      "Web design agency vs freelancer compared on skills, reliability, cost and scope. How to decide who should build your website — and where a studio fits.",
    h1: "Agency vs freelancer",
    lede: "Hiring help to build your site? The agency-vs-freelancer choice is really about risk, range and reliability. Here's the honest breakdown.",
    intro: [
      "A great freelancer can do excellent work and often costs less. But a website usually needs design, development and increasingly AI — rarely all the strengths of one person — and a solo contractor is a single point of failure if they get sick, busy or disappear. An agency brings range and reliability, at a higher price.",
      "A small studio like Flowdira sits in the middle: more than one specialist, no single point of failure, but leaner and more senior than a big agency. Here's how the options compare.",
    ],
    rows: [
      { aspect: "Skill range", a: "Design + dev + AI under one roof", b: "Strong in their specialty, gaps elsewhere" },
      { aspect: "Reliability", a: "No single point of failure", b: "Risk if they're unavailable" },
      { aspect: "Cost", a: "Higher", b: "Lower" },
      { aspect: "Speed", a: "Parallel work across skills", b: "Sequential; depends on one person" },
      { aspect: "Accountability", a: "Defined process & contract", b: "Varies by individual" },
      { aspect: "Best for", a: "Business-critical, multi-discipline builds", b: "Small, well-scoped, single-skill jobs" },
    ],
    verdict: [
      "For a small, clearly-scoped job in one discipline — a quick design tweak, a single landing page — a trusted freelancer is often the most cost-effective choice.",
      "For anything business-critical, multi-disciplinary, or where reliability matters, a studio is the safer bet: design, development and AI in one accountable team, with a process and no single point of failure. You move faster than hiring in-house and get more senior, joined-up work than coordinating several freelancers yourself.",
      "That middle ground — studio-level range without big-agency overhead — is exactly where Flowdira sits.",
    ],
    faqs: [
      {
        q: "Is a freelancer cheaper than an agency?",
        a: "Usually yes, upfront. But that can be a false economy if the project needs multiple skills or stalls when one person is unavailable. The right comparison is total value and risk, not just the hourly rate.",
      },
      {
        q: "What's the advantage of a studio over separate freelancers?",
        a: "One accountable team covering design, development and AI — no handoffs, no gaps, and no single point of failure. You coordinate one partner instead of stitching specialists together yourself.",
      },
      {
        q: "Is Flowdira an agency or a studio?",
        a: "A studio — deliberately lean and senior. You get multi-discipline coverage and reliability without big-agency overhead, account layers or markup.",
      },
    ],
  },
  {
    slug: "headless-cms-vs-traditional-cms",
    optionA: "Headless CMS",
    optionB: "Traditional CMS",
    title: "Headless CMS vs Traditional CMS: Which Is Better? | Flowdira",
    description:
      "Headless CMS vs traditional CMS compared on performance, flexibility, security and editing experience. When to go headless — and when a traditional CMS is fine.",
    h1: "Headless CMS vs traditional CMS",
    lede: "Headless is the modern default for serious sites — but it isn't automatically the right call. Here's the trade-off in plain terms.",
    intro: [
      "A traditional CMS (like WordPress) bundles your content and your front-end together. A headless CMS stores content and serves it via an API, leaving you free to build any front-end you like. Headless unlocks speed, flexibility and multi-channel publishing — at the cost of needing developers to build that front-end.",
      "Here's how the two approaches actually differ, and how we decide which to use.",
    ],
    rows: [
      { aspect: "Architecture", a: "Content via API, front-end separate", b: "Content + front-end coupled" },
      { aspect: "Performance", a: "Excellent — pair with a fast front-end", b: "Tied to the platform/theme" },
      { aspect: "Flexibility", a: "Any front-end, any channel", b: "One website, the CMS's way" },
      { aspect: "Security", a: "Smaller surface; content API only", b: "Larger surface (admin + plugins exposed)" },
      { aspect: "Editor experience", a: "Clean, tailored editing", b: "Familiar, all-in-one admin" },
      { aspect: "Setup effort", a: "Needs a developer to build the front-end", b: "Faster to stand up alone" },
    ],
    verdict: [
      "If you want to self-manage a simple site with no developer and minimal fuss, a traditional CMS is the path of least resistance.",
      "For performance, security, multi-channel publishing (web, app, kiosk) and long-term flexibility, headless wins — which is why it's our default for sites that matter. We pair a headless CMS with a fast Astro or Next.js front-end, so editors get a clean, tailored writing experience and visitors get a lightning-fast site.",
      "The trade-off is that headless needs a developer to build and connect the front-end — which is exactly the part we handle.",
    ],
    faqs: [
      {
        q: "Is a headless CMS harder to use for editors?",
        a: "No — done well it's often nicer. We tailor the editing fields to your content, so writers get a clean, focused experience without the clutter of a traditional all-in-one admin.",
      },
      {
        q: "Why is headless better for performance?",
        a: "Because the front-end is decoupled, we can build it on a fast, lightweight stack and serve pre-rendered pages — instead of being limited by a traditional CMS's theme and plugin overhead.",
      },
      {
        q: "Do I need a developer for a headless CMS?",
        a: "To build and connect the front-end, yes — that's the trade-off for the flexibility. Once it's set up, your team manages content independently. Building that front-end is exactly what we do.",
      },
    ],
  },
];

export const getComparison = (slug: string) =>
  comparisons.find((c) => c.slug === slug);
