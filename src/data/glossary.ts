/* ============================================================
   Glossary / "what is [term]" pages. Builds topical authority
   around our AI + web-performance niche and earns featured-
   snippet / AI-search visibility. Each definition is framed in
   our own words, not paraphrased from Wikipedia.
   ============================================================ */
import type { Faq } from "../lib/pseo";

export interface Term {
  slug: string;
  term: string;
  /** "AI" | "Web" — grouped on the hub. */
  category: "AI" | "Web";
  title: string;
  description: string;
  h1: string;
  /** One- to two-sentence definition — the featured-snippet target. */
  definition: string;
  body: string[];
  faqs: Faq[];
}

export const terms: Term[] = [
  {
    slug: "rag",
    term: "Retrieval-Augmented Generation (RAG)",
    category: "AI",
    title: "What is RAG (Retrieval-Augmented Generation)? | Flowdira",
    description:
      "RAG explained simply: how retrieval-augmented generation lets AI answer from your own data, why it reduces hallucinations, and where it's worth using.",
    h1: "What is RAG?",
    definition:
      "Retrieval-Augmented Generation (RAG) is an AI technique that retrieves relevant information from your own documents or database and feeds it to a large language model so it can answer from facts rather than memory.",
    body: [
      "A plain language model only knows what it was trained on — it can't see your product docs, help centre or internal data, and it will sometimes confidently make things up. RAG fixes this by adding a retrieval step: when a question comes in, the system searches your knowledge base for the most relevant passages and hands them to the model as context before it answers.",
      "The result is an assistant that answers from your actual content, stays current as your data changes, and cites where the answer came from — dramatically reducing hallucinations. It's the backbone of most useful AI support bots, internal search tools and 'chat with your docs' features.",
      "At Flowdira we build RAG features into client products — support assistants, documentation search and lead-qualification bots — using vector search over your content so the AI is genuinely grounded in your business.",
    ],
    faqs: [
      {
        q: "How is RAG different from just using ChatGPT?",
        a: "A standalone chatbot answers from its training data and can't see your private content. RAG retrieves your own documents at question time and feeds them to the model, so answers are grounded in your business and stay accurate as your data changes.",
      },
      {
        q: "Does RAG stop AI from hallucinating?",
        a: "It greatly reduces hallucination by grounding answers in retrieved facts and letting the system cite sources, but no technique eliminates it entirely. Good design — retrieval quality, prompting and guardrails — is what keeps it reliable.",
      },
    ],
  },
  {
    slug: "ai-agent",
    term: "AI agent",
    category: "AI",
    title: "What is an AI Agent? | Flowdira",
    description:
      "AI agents explained: how they differ from chatbots, what 'tools' and autonomy mean, and where agents add real value in a business.",
    h1: "What is an AI agent?",
    definition:
      "An AI agent is a system built on a large language model that can take actions — calling tools, APIs and data sources — to complete a multi-step goal, rather than just replying with text.",
    body: [
      "A chatbot answers a question. An agent pursues a goal. Given an objective like 'qualify this lead and book a call', an agent can decide what steps to take, call the tools it needs (look up a CRM record, check a calendar, send an email), observe the results, and keep going until the task is done.",
      "What makes something an agent is this loop of reason → act → observe, plus access to 'tools' (functions and APIs it's allowed to use). Done well, agents automate genuinely useful workflows; done badly, they're unpredictable, so guardrails and clear scope matter.",
      "We design and integrate agents where they remove real work — triaging enquiries, automating back-office steps, powering smart in-product assistants — using the latest models and a tight, well-tested set of tools.",
    ],
    faqs: [
      {
        q: "What's the difference between an AI agent and a chatbot?",
        a: "A chatbot mainly converses and answers questions. An agent can take actions toward a goal — calling tools and APIs, using the results, and continuing across multiple steps — so it can complete tasks, not just talk about them.",
      },
      {
        q: "Are AI agents safe to put in front of customers?",
        a: "They can be, with the right design: a limited, well-tested set of tools, clear scope, human-in-the-loop for sensitive actions, and guardrails. The risk comes from giving an agent too much autonomy without those controls.",
      },
    ],
  },
  {
    slug: "llm",
    term: "Large Language Model (LLM)",
    category: "AI",
    title: "What is an LLM (Large Language Model)? | Flowdira",
    description:
      "Large language models explained in plain English: what an LLM is, how it works at a high level, and what it can and can't do for your business.",
    h1: "What is an LLM?",
    definition:
      "A large language model (LLM) is an AI system trained on vast amounts of text to predict and generate language, enabling it to write, summarise, answer questions, translate and reason over natural language.",
    body: [
      "LLMs power tools like ChatGPT, Claude and the AI features increasingly built into software. At their core they predict the most likely next piece of text given everything so far — but trained at huge scale, that simple mechanism produces models that can draft, explain, classify and converse remarkably well.",
      "Their strengths are language tasks: generating and rewriting content, summarising, extracting structure from messy text, and answering questions. Their limits matter too — they can hallucinate, they only know their training data unless you give them more (see RAG), and output quality depends on how you prompt and constrain them.",
      "Flowdira integrates the latest LLMs into client products — choosing the right model for the task, grounding it in your data, and wrapping it in the guardrails that make AI features dependable rather than a gimmick.",
    ],
    faqs: [
      {
        q: "Which LLM is the best?",
        a: "There's no single winner — the frontier models from Anthropic (Claude), OpenAI and others trade places, and the right pick depends on the task, cost and latency. We choose per use case rather than defaulting to one.",
      },
      {
        q: "Can an LLM use my company's data?",
        a: "Not by default — it only knows its training data. To make it answer from your content you connect it to your data, usually via retrieval-augmented generation (RAG), so it stays grounded and current.",
      },
    ],
  },
  {
    slug: "headless-cms",
    term: "Headless CMS",
    category: "Web",
    title: "What is a Headless CMS? | Flowdira",
    description:
      "Headless CMS explained: how it differs from a traditional CMS like WordPress, why it's faster and more flexible, and when it's the right choice.",
    h1: "What is a headless CMS?",
    definition:
      "A headless CMS is a content management system that stores your content and serves it through an API, leaving the front-end (the website itself) to be built separately — decoupling content from presentation.",
    body: [
      "In a traditional CMS like WordPress, your content and your website's design are bundled together. A headless CMS splits them: editors manage content in a clean back-end, and that content is delivered via an API to whatever front-end you build — a website, a mobile app, a kiosk, or all three at once.",
      "The payoff is speed, flexibility and security. Because the front-end is independent, it can be built on a fast, modern stack for excellent Core Web Vitals, the same content can power multiple channels, and the attack surface is smaller. The trade-off is that you need developers to build the front-end.",
      "We pair headless CMS platforms with fast Astro or Next.js front-ends, giving clients a tailored, easy editing experience and visitors a lightning-fast site.",
    ],
    faqs: [
      {
        q: "Is a headless CMS better than WordPress?",
        a: "For performance, security and multi-channel flexibility, usually yes. WordPress is simpler to stand up alone, but a headless CMS with a modern front-end is faster and cleaner for sites that matter — at the cost of needing a developer to build the front-end.",
      },
      {
        q: "Is a headless CMS hard for editors to use?",
        a: "No — done well it's often nicer, because the editing fields are tailored to your content instead of buried in a general-purpose admin. Editors manage content independently once it's set up.",
      },
    ],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    category: "Web",
    title: "What are Core Web Vitals? | Flowdira",
    description:
      "Core Web Vitals explained: what LCP, INP and CLS measure, why Google uses them for ranking, and what 'good' scores look like.",
    h1: "What are Core Web Vitals?",
    definition:
      "Core Web Vitals are a set of Google metrics that measure real-world user experience — loading speed (LCP), interactivity (INP) and visual stability (CLS) — and they factor into search rankings.",
    body: [
      "Google uses three Core Web Vitals to quantify how a page feels to a real visitor. LCP (Largest Contentful Paint) measures how quickly the main content loads. INP (Interaction to Next Paint) measures how responsive the page is when you click or type. CLS (Cumulative Layout Shift) measures how much things jump around as the page loads.",
      "They matter for two reasons: they're a Google ranking signal, and they directly affect conversion — slow, janky pages lose visitors. 'Good' is roughly LCP under 2.5s, INP under 200ms, and CLS under 0.1, measured on real users.",
      "Every site we build is engineered for strong Core Web Vitals from the start — lean code, optimised images and fonts, and minimal JavaScript — which is why our builds routinely score 90+ in Lighthouse.",
    ],
    faqs: [
      {
        q: "Do Core Web Vitals really affect SEO?",
        a: "Yes — they're a confirmed Google ranking signal as part of page experience. They rarely outweigh great content, but between similar pages they can be the tiebreaker, and they strongly affect conversion regardless of rankings.",
      },
      {
        q: "What are good Core Web Vitals scores?",
        a: "As a rule of thumb: LCP under 2.5 seconds, INP under 200 milliseconds, and CLS under 0.1, measured on real-world visits. Tools like PageSpeed Insights and Search Console report your scores.",
      },
    ],
  },
  {
    slug: "jamstack",
    term: "Jamstack",
    category: "Web",
    title: "What is Jamstack? | Flowdira",
    description:
      "Jamstack explained: the modern web architecture built on pre-rendering and APIs, why it's fast and secure, and how it compares to traditional sites.",
    h1: "What is Jamstack?",
    definition:
      "Jamstack is a modern web architecture where pages are pre-built and served as static files, with dynamic features added through APIs — making sites fast, secure and easy to scale.",
    body: [
      "Traditional sites build each page on a server for every request, which is slower and exposes more to attack. Jamstack flips this: pages are pre-rendered ahead of time and served instantly from a global CDN, while anything dynamic (forms, search, commerce, AI) is handled by APIs and JavaScript in the browser.",
      "The benefits are speed (pre-built pages load fast), security (no live database or server to exploit on every request), and scalability (serving static files is cheap and effortless). It's the architecture behind modern frameworks like Astro and Next.js.",
      "Our builds follow these principles — pre-rendered pages, a fast CDN, and APIs for the dynamic parts — which is how we ship sites that are both quick and resilient.",
    ],
    faqs: [
      {
        q: "Is Jamstack the same as a static site?",
        a: "It's related but broader. A static site is just pre-built pages; Jamstack pre-renders pages too but layers in dynamic functionality through APIs and JavaScript, so you get static-site speed with modern, interactive features.",
      },
      {
        q: "Is Jamstack good for SEO?",
        a: "Very — pre-rendered pages load fast and are fully crawlable, which helps Core Web Vitals and indexing. It's a strong foundation for SEO as long as the content and structure are done well.",
      },
    ],
  },
  {
    slug: "structured-data",
    term: "Structured data (schema markup)",
    category: "Web",
    title: "What is Structured Data (Schema Markup)? | Flowdira",
    description:
      "Structured data explained: how schema markup helps search engines understand your pages, enables rich results, and supports AI search visibility.",
    h1: "What is structured data?",
    definition:
      "Structured data (schema markup) is standardised code added to a web page that describes its content to search engines — like marking up a recipe, product, FAQ or business — enabling richer search results.",
    body: [
      "Search engines read your page, but structured data tells them explicitly what things are: this is a product with this price, this is an FAQ, this is a local business with these hours. Usually written in JSON-LD using the schema.org vocabulary, it removes guesswork for crawlers.",
      "The payoff is rich results — star ratings, FAQ drop-downs, product prices and more directly in search — which improve visibility and click-through. It also increasingly helps AI search and assistants understand and cite your content accurately.",
      "Every Flowdira build ships with appropriate schema baked in — Organization, Product, FAQPage, BreadcrumbList and more — so search engines and AI tools understand your pages from day one. (This very page emits breadcrumb and FAQ schema.)",
    ],
    faqs: [
      {
        q: "Does structured data improve rankings?",
        a: "It doesn't directly boost rankings, but it enables rich results and clearer understanding, which improve click-through and visibility — and that often lifts traffic. It's also becoming important for how AI search cites sources.",
      },
      {
        q: "What format should structured data use?",
        a: "JSON-LD is Google's recommended format and what we use — it's a clean block of code in the page that's easy to maintain and keeps the markup separate from your visible content.",
      },
    ],
  },
  {
    slug: "static-site-generation",
    term: "Static site generation (SSG)",
    category: "Web",
    title: "What is Static Site Generation (SSG)? | Flowdira",
    description:
      "Static site generation explained: how SSG pre-builds pages for speed and security, how it differs from SSR, and when it's the right rendering choice.",
    h1: "What is static site generation?",
    definition:
      "Static site generation (SSG) is a technique where every page of a website is pre-built into ready-to-serve HTML at build time, so visitors are served fast, finished pages straight from a CDN.",
    body: [
      "Instead of assembling a page on a server each time someone visits (server-side rendering), SSG does the work once, ahead of time, producing plain HTML files. Those files are then served instantly from a global CDN — there's no database query or server render on each request.",
      "This makes static sites extremely fast, very secure (nothing to exploit at request time), and cheap to host and scale. The trade-off is that highly personalised or constantly-changing content needs extra techniques (incremental builds, on-demand rendering, or client-side data). For marketing sites, blogs and docs, SSG is close to ideal.",
      "We default to static generation for content sites — it's why our builds load fast and score highly on Core Web Vitals — and reach for on-demand or server rendering only where the content genuinely needs it.",
    ],
    faqs: [
      {
        q: "What's the difference between SSG and SSR?",
        a: "SSG builds pages ahead of time and serves the same fast HTML to everyone; SSR builds each page on the server per request, which suits highly dynamic or personalised content but is slower and heavier. Many sites mix both.",
      },
      {
        q: "Can a static site have dynamic features?",
        a: "Yes. Static pages can include dynamic functionality — forms, search, commerce, AI — handled through APIs and JavaScript in the browser. That combination is the basis of the Jamstack approach.",
      },
    ],
  },
  {
    slug: "conversion-rate-optimization",
    term: "Conversion rate optimization (CRO)",
    category: "Web",
    title: "What is Conversion Rate Optimization (CRO)? | Flowdira",
    description:
      "Conversion rate optimization explained: what CRO is, the levers that actually move it, and why it often beats buying more traffic.",
    h1: "What is conversion rate optimization?",
    definition:
      "Conversion rate optimization (CRO) is the practice of increasing the percentage of visitors who take a desired action — buying, booking, signing up — by improving the experience rather than just driving more traffic.",
    body: [
      "If 100 visitors arrive and 2 buy, your conversion rate is 2%. CRO is about lifting that number — to 3% or 4% — so the same traffic produces more revenue. Because you've already paid (in time or ad spend) for those visitors, improving conversion is often cheaper than buying more clicks.",
      "The real levers are unglamorous but powerful: faster page speed, clearer messaging and value proposition, stronger calls to action, visible social proof, and removing friction from forms and checkout. Good CRO is evidence-led — you measure, change one thing, and check the impact.",
      "We build conversion into the design from the start — fast pages, clear narrative and frictionless paths to action — so the sites we ship don't just look good, they perform.",
    ],
    faqs: [
      {
        q: "Is CRO better than spending on more ads?",
        a: "Often, yes — improving conversion lifts the return on all your traffic, paid and organic, at once. The two work best together: CRO makes every click you buy or earn worth more.",
      },
      {
        q: "What has the biggest impact on conversion rate?",
        a: "Usually page speed, a clear value proposition, strong calls to action, visible social proof, and removing friction from forms and checkout. The exact winner varies, which is why measuring beats guessing.",
      },
    ],
  },
  {
    slug: "vector-search",
    term: "Vector search (embeddings)",
    category: "AI",
    title: "What is Vector Search? | Flowdira",
    description:
      "Vector search and embeddings explained: how AI search finds results by meaning rather than keywords, and why it powers RAG and smart product search.",
    h1: "What is vector search?",
    definition:
      "Vector search is a technique that finds results by meaning rather than exact keywords, by converting text into numerical 'embeddings' and matching items that are closest in meaning.",
    body: [
      "Traditional search matches keywords — if the words don't appear, it misses the result. Vector search instead turns text into embeddings: long lists of numbers that capture meaning. Two pieces of text about the same idea end up 'close together' in this numeric space, so a search for 'cancel my plan' can find a page titled 'ending your subscription' even with no shared words.",
      "This semantic matching is what makes modern AI search feel smart, and it's the retrieval engine behind RAG — finding the most relevant passages of your content to feed an AI model. It also powers better product search and recommendations.",
      "We build vector search into client products — for AI assistants, documentation search and ecommerce discovery — so users find things by what they mean, not just the exact words they type.",
    ],
    faqs: [
      {
        q: "How is vector search different from keyword search?",
        a: "Keyword search matches exact words; vector search matches meaning. By comparing embeddings, it can surface relevant results even when the wording is completely different, which makes it far better for natural-language queries.",
      },
      {
        q: "What is vector search used for?",
        a: "It powers semantic site and product search, recommendations, and the retrieval step in RAG — finding the most relevant content to ground an AI's answers. Anywhere meaning matters more than exact wording, vector search helps.",
      },
    ],
  },
];

export const getTerm = (slug: string) => terms.find((t) => t.slug === slug);
