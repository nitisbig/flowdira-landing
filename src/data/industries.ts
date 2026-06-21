/* ============================================================
   Industry / persona pages — "Website design for [audience]".
   Each entry is genuinely differentiated: real pains, real
   features we'd build, a page-specific FAQ. No find-and-replace.
   ============================================================ */
import type { Faq, Block } from "../lib/pseo";

export interface Industry {
  slug: string;
  /** Plural noun used in the URL/keyword, e.g. "dentists". */
  audience: string;
  /** Display name for the segment, e.g. "Dental practices". */
  name: string;
  title: string;
  description: string;
  h1Lead: string;
  h1Accent: string;
  lede: string;
  intro: string[];
  pains: Block[];
  builds: Block[];
  faqs: Faq[];
}

export const industries: Industry[] = [
  {
    slug: "dentists",
    audience: "dentists",
    name: "Dental practices",
    title: "Website Design for Dentists | Flowdira",
    description:
      "Conversion-focused website design and development for dental practices — online booking, fast load times and HIPAA-aware forms that turn searches into booked chairs.",
    h1Lead: "Website design for",
    h1Accent: "dentists.",
    lede: "A dental website's only job is to turn a nervous searcher into a booked appointment. We design and build sites that do exactly that — fast, trustworthy, and easy to book.",
    intro: [
      "When someone searches \"dentist near me\" they decide in seconds whether to trust you. A slow, dated, hard-to-book site sends them to the practice down the road. We build dental websites engineered for that first impression — quick to load, calm to read, and obvious to book.",
      "Flowdira designs and develops the whole thing in-house: brand-driven UI, an Astro/Next.js front-end that scores 90+ on Lighthouse, and the booking and forms wired up properly. No template bloat, no plugin sprawl.",
    ],
    pains: [
      {
        title: "Booking friction loses patients",
        body: "If booking means a phone call during office hours, you lose the after-hours searcher. We integrate online scheduling so a new patient can book in under a minute.",
      },
      {
        title: "Nervous patients need reassurance",
        body: "Dental anxiety is real. Clear photography, gentle copy, and visible reviews and credentials lower the barrier to that first visit.",
      },
      {
        title: "Forms must handle sensitive data carefully",
        body: "Patient intake and contact forms should be encrypted, consent-aware and routed securely — not dumped into a generic inbox.",
      },
    ],
    builds: [
      {
        title: "One-minute online booking",
        body: "Embedded scheduling or an integration with your practice-management software, front and centre on every page.",
      },
      {
        title: "Service + treatment pages",
        body: "Dedicated, search-optimised pages for implants, whitening, Invisalign and more — each ranking for its own treatment query.",
      },
      {
        title: "Local SEO foundation",
        body: "LocalBusiness/Dentist schema, Google Business Profile alignment and fast Core Web Vitals so you show up in the local pack.",
      },
      {
        title: "AI front-desk assistant",
        body: "An optional chatbot that answers hours, insurance and pricing questions 24/7 and hands qualified leads to your team.",
      },
    ],
    faqs: [
      {
        q: "Can you integrate our existing dental booking software?",
        a: "Yes. We integrate common practice-management and scheduling tools, or embed a booking widget, so patients book without leaving your site and your front desk keeps one source of truth.",
      },
      {
        q: "Will the website help us rank for treatments like implants or Invisalign?",
        a: "That's the plan. We build a dedicated, search-optimised page per treatment with proper structure and schema, so each one can rank for its own query rather than burying everything on one services page.",
      },
      {
        q: "How long until a new dental website is live?",
        a: "A focused practice site typically goes from kickoff to launch in around two weeks. Larger multi-location or membership sites take longer, and you'll have a milestone timeline on day one.",
      },
    ],
  },
  {
    slug: "law-firms",
    audience: "law firms",
    name: "Law firms",
    title: "Website Design for Law Firms | Flowdira",
    description:
      "Authoritative, fast website design and development for law firms and attorneys — practice-area pages, secure intake and credibility that converts visitors into consultations.",
    h1Lead: "Website design for",
    h1Accent: "law firms.",
    lede: "Legal clients hire confidence. We design law-firm websites that read as authoritative, load instantly, and turn a quiet visitor into a booked consultation.",
    intro: [
      "Choosing a lawyer is a high-stakes, high-trust decision, and most of that judgement happens on your website before anyone calls. We build law-firm sites that look established, communicate expertise clearly, and make the next step — a consultation — obvious.",
      "Every site ships with clean practice-area structure, secure intake, and the technical SEO foundation that helps you rank for the specific cases you actually want.",
    ],
    pains: [
      {
        title: "Generic sites read as untrustworthy",
        body: "A template that looks like every other firm undermines authority. Distinct brand-driven design signals that you take the work — and yourself — seriously.",
      },
      {
        title: "Visitors can't find their specific case",
        body: "Someone with a DUI charge and someone in a custody dispute need different pages. A single 'Practice Areas' list buries both.",
      },
      {
        title: "Intake leaks confidential detail",
        body: "Contact and case-evaluation forms must be secure and handled with care, not sent in plain text to a shared inbox.",
      },
    ],
    builds: [
      {
        title: "Practice-area pages that rank",
        body: "A focused, optimised page per practice area and jurisdiction, so each ranks and speaks directly to that client's situation.",
      },
      {
        title: "Secure case-evaluation intake",
        body: "Encrypted, consent-aware intake forms with clear next steps and routing to the right attorney.",
      },
      {
        title: "Authority & credibility design",
        body: "Attorney profiles, results, accreditations and reviews structured to build trust fast — with Attorney/LegalService schema.",
      },
      {
        title: "AI intake qualifier",
        body: "An optional assistant that triages enquiries, answers common questions and books consultations around the clock.",
      },
    ],
    faqs: [
      {
        q: "Do you build separate pages for each practice area?",
        a: "Yes — that's central to ranking. We give each practice area (and key jurisdiction) its own optimised page so it can rank for those specific queries and speak directly to that client's needs.",
      },
      {
        q: "Are the intake forms secure and confidential?",
        a: "They are. Case-evaluation and contact forms are encrypted in transit, consent-aware, and routed securely to the right person rather than emailed in plain text.",
      },
      {
        q: "Can you keep our existing search rankings during a redesign?",
        a: "Yes. We audit your current pages, preserve what's already ranking, map redirects carefully and rebuild on a faster stack so a redesign protects your SEO instead of resetting it.",
      },
    ],
  },
  {
    slug: "restaurants",
    audience: "restaurants",
    name: "Restaurants",
    title: "Website Design for Restaurants | Flowdira",
    description:
      "Mouth-watering, fast website design for restaurants and cafés — mobile menus, online reservations and ordering that fill tables instead of frustrating hungry visitors.",
    h1Lead: "Website design for",
    h1Accent: "restaurants.",
    lede: "Hungry people are impatient and on their phones. We build restaurant sites that load fast, show the menu instantly, and make booking a table or ordering effortless.",
    intro: [
      "Most restaurant searches happen on a phone, minutes before a decision. If your menu is a slow PDF and reservations mean a phone call, you lose the table. We build restaurant websites that put the menu, the vibe and the booking one tap away.",
      "Beautiful food photography, a genuinely fast mobile experience, and reservations or ordering wired in — that's the whole point of the site, so that's what we optimise for.",
    ],
    pains: [
      {
        title: "PDF menus kill the mobile experience",
        body: "A menu trapped in a slow-loading PDF is the single most common restaurant-site mistake. We build menus as fast, readable web pages.",
      },
      {
        title: "Reservations stuck on the phone",
        body: "Diners want to book in the moment, not call during service. Online reservations capture bookings 24/7.",
      },
      {
        title: "No appetite appeal",
        body: "Stock photos and cramped layouts don't sell food. The design has to make people hungry.",
      },
    ],
    builds: [
      {
        title: "Fast, structured web menus",
        body: "Menus as real, searchable pages with Menu schema — quick to load and easy to update yourself.",
      },
      {
        title: "Reservations & online ordering",
        body: "Integrated booking and ordering so visitors convert without leaving your site.",
      },
      {
        title: "Local discovery SEO",
        body: "Restaurant/LocalBusiness schema, location pages and Google Business alignment so you surface in local and map searches.",
      },
      {
        title: "Events & private dining",
        body: "Dedicated pages and enquiry forms for functions, set menus and private hire.",
      },
    ],
    faqs: [
      {
        q: "Can I update the menu myself?",
        a: "Yes. We connect a lightweight headless CMS so you can change dishes, prices and specials in minutes — no developer and no slow PDF re-uploads.",
      },
      {
        q: "Do you integrate reservations and online ordering?",
        a: "We do. We integrate the booking or ordering platform you prefer (or recommend one) and embed it so guests reserve or order without bouncing to a third-party site.",
      },
      {
        q: "Will the site work well on phones?",
        a: "It's built mobile-first, because that's where almost all restaurant traffic is. Expect fast load times, tap-friendly menus and one-tap calling, directions and booking.",
      },
    ],
  },
  {
    slug: "real-estate",
    audience: "real estate agents",
    name: "Real estate & property",
    title: "Website Design for Real Estate Agents | Flowdira",
    description:
      "High-performance website design for real estate agents and agencies — fast listings, lead capture and IDX/portal integration that turns browsers into valuations and viewings.",
    h1Lead: "Website design for",
    h1Accent: "real estate.",
    lede: "Property buyers browse with their eyes and decide fast. We build real-estate sites with quick, beautiful listings and lead capture that books valuations and viewings.",
    intro: [
      "Real estate is a visual, fast-moving market. Buyers swipe through listings on their phones and sellers judge your agency by how polished your site looks. We build property sites that load listings instantly, look premium, and capture leads at every step.",
      "From listing feeds and search to valuation lead-magnets and area guides, we build the functionality that actually drives enquiries — not just a brochure.",
    ],
    pains: [
      {
        title: "Slow, clunky listing search",
        body: "If filtering and loading listings is sluggish, buyers leave. Search has to be instant and effortless.",
      },
      {
        title: "No reason for sellers to enquire",
        body: "Sellers need a hook — an instant valuation request or area report — not just a contact form.",
      },
      {
        title: "Listings look like everyone else's",
        body: "Portal-style sameness doesn't differentiate your brand or justify your fee.",
      },
    ],
    builds: [
      {
        title: "Fast listing search & detail pages",
        body: "Snappy filtering, image-forward galleries and RealEstateListing schema on every property.",
      },
      {
        title: "Valuation & seller lead capture",
        body: "Instant-valuation and 'what's my home worth' lead magnets that turn sellers into appointments.",
      },
      {
        title: "Area & neighbourhood guides",
        body: "Local guide pages that rank for area searches and position you as the local expert.",
      },
      {
        title: "Portal / IDX integration",
        body: "We connect your listing feed or CRM so properties sync automatically and stay current.",
      },
    ],
    faqs: [
      {
        q: "Can you connect our property feed or CRM?",
        a: "Yes. We integrate your listing feed, portal or CRM so properties publish and update automatically, keeping the site current without manual re-entry.",
      },
      {
        q: "How do you help capture seller leads, not just buyers?",
        a: "We build seller-focused lead magnets — instant valuation requests and area reports — with their own optimised pages, so the site generates listing appointments as well as buyer enquiries.",
      },
      {
        q: "Can the site rank for specific neighbourhoods?",
        a: "It can. We create area and neighbourhood guide pages structured to rank for local searches and establish you as the go-to expert for those streets.",
      },
    ],
  },
  {
    slug: "saas-startups",
    audience: "SaaS startups",
    name: "SaaS & startups",
    title: "Website Design for SaaS Startups | Flowdira",
    description:
      "Conversion-focused website and marketing-site design for SaaS startups — fast, on-brand pages, clear product storytelling and the technical SEO to fuel growth.",
    h1Lead: "Website design for",
    h1Accent: "SaaS startups.",
    lede: "Your marketing site is your highest-leverage growth asset. We design and build SaaS sites that explain the product clearly, convert trials, and scale with you.",
    intro: [
      "SaaS buyers are sophisticated and skeptical. Your marketing site has to explain a sometimes-complex product in seconds, prove it works, and get the visitor to a trial or demo — all while loading fast and feeling premium. We build exactly that.",
      "We work natively in the modern SaaS stack (Astro, Next.js, React, headless CMS) so your marketing team can ship new pages fast and your site stays fast as it grows.",
    ],
    pains: [
      {
        title: "The product is hard to explain",
        body: "Feature lists don't sell. Clear narrative, the right visuals and concrete outcomes do.",
      },
      {
        title: "Marketing can't ship without engineering",
        body: "If every landing page needs a developer, growth stalls. Marketing needs to move on its own.",
      },
      {
        title: "Slow sites tank conversion and SEO",
        body: "Heavy page builders hurt Core Web Vitals — and both Google and your conversion rate notice.",
      },
    ],
    builds: [
      {
        title: "Conversion-led marketing site",
        body: "Homepage, product, pricing and use-case pages crafted to move visitors toward trial or demo.",
      },
      {
        title: "Headless CMS for the marketing team",
        body: "A clean CMS so marketing ships landing pages and blog posts without touching code.",
      },
      {
        title: "Programmatic SEO foundation",
        body: "Templated, data-driven pages (use cases, integrations, comparisons) built to scale — exactly like this page.",
      },
      {
        title: "AI features that demo well",
        body: "If your product leans on AI, we help design and integrate it so the experience sells itself.",
      },
    ],
    faqs: [
      {
        q: "Can our marketing team publish pages without a developer?",
        a: "Yes. We wire up a headless CMS and reusable section components so marketing can build and publish landing pages and posts independently, while the site stays fast and on-brand.",
      },
      {
        q: "Do you build in Next.js / React?",
        a: "We do — Next.js, React and Astro are our daily stack. We pick the right one for your needs and integrate your existing tools, analytics and product app cleanly.",
      },
      {
        q: "Can you help us scale content with programmatic SEO?",
        a: "Absolutely — it's a core service. We design templated, data-driven page systems (use cases, integrations, comparisons) so you can rank across the long tail without hand-building every page.",
      },
    ],
  },
  {
    slug: "ecommerce-brands",
    audience: "ecommerce brands",
    name: "Ecommerce & DTC brands",
    title: "Website Design for Ecommerce Brands | Flowdira",
    description:
      "High-converting ecommerce website design and development for DTC brands — fast storefronts, clean product pages and checkout flows engineered to lift conversion rate.",
    h1Lead: "Website design for",
    h1Accent: "ecommerce brands.",
    lede: "In ecommerce, speed and trust are revenue. We design and build storefronts that load fast, look premium, and convert more of the traffic you already pay for.",
    intro: [
      "Every second of load time and every point of friction in checkout costs you sales. We build ecommerce experiences — on a modern headless stack or a well-tuned platform — that are fast, beautiful and engineered around conversion.",
      "From product pages that sell to checkout flows that don't leak, we treat the storefront as a conversion machine, not just a catalogue.",
    ],
    pains: [
      {
        title: "Slow stores lose paid traffic",
        body: "You pay for the click; a sluggish storefront wastes it. Speed is directly tied to conversion.",
      },
      {
        title: "Weak product pages don't sell",
        body: "Poor imagery, thin copy and buried reviews leave buyers hesitant at the most important moment.",
      },
      {
        title: "Checkout friction kills carts",
        body: "Every extra field and surprise cost is a reason to abandon. Checkout has to be ruthless about simplicity.",
      },
    ],
    builds: [
      {
        title: "Fast headless or tuned storefronts",
        body: "A modern, fast front-end on your commerce backend — with Product/Offer schema on every item.",
      },
      {
        title: "Conversion-optimised product pages",
        body: "Strong imagery, persuasive copy, visible reviews and clear CTAs designed to close the sale.",
      },
      {
        title: "Streamlined checkout",
        body: "A lean, trustworthy checkout flow that removes friction and recovers more carts.",
      },
      {
        title: "AI product discovery & support",
        body: "Optional AI search, recommendations and support chat that help shoppers find and buy faster.",
      },
    ],
    faqs: [
      {
        q: "Do you work with Shopify or build headless storefronts?",
        a: "Both. We can craft a fast, custom theme on your existing platform or build a headless storefront on a modern front-end — whichever gives you the speed, flexibility and cost profile that fits.",
      },
      {
        q: "How do you actually improve conversion rate?",
        a: "We attack the proven levers: page speed, clearer product storytelling, visible social proof, and a friction-free checkout — then measure the impact so improvements are real, not guesswork.",
      },
      {
        q: "Can you add AI search or recommendations?",
        a: "Yes. We integrate AI-powered product search, recommendations and support chat where they measurably help shoppers find and buy — not as a gimmick.",
      },
    ],
  },
  {
    slug: "accountants",
    audience: "accountants",
    name: "Accountants & bookkeepers",
    title: "Website Design for Accountants | Flowdira",
    description:
      "Professional website design for accountants and bookkeeping firms — clear service pages, secure document intake and lead capture that wins higher-value clients.",
    h1Lead: "Website design for",
    h1Accent: "accountants.",
    lede: "Accounting clients buy trust and clarity. We build accountancy sites that look credible, explain your services plainly, and turn visitors into booked consultations.",
    intro: [
      "Prospective clients judge an accountant on credibility and clarity long before the first call. We build accountancy and bookkeeping sites that communicate expertise, make services easy to understand, and capture qualified leads — without the dated, dense look that plagues the industry.",
      "Clean service pages, secure document handling, and a fast, modern build give your firm an edge over competitors still running tired template sites.",
    ],
    pains: [
      {
        title: "Dense, dated sites erode trust",
        body: "Walls of jargon and old design make a firm feel behind the times. Clarity and polish signal competence.",
      },
      {
        title: "Services are hard to understand",
        body: "Prospects don't know which package fits them. Clear, outcome-led service pages remove that confusion.",
      },
      {
        title: "Sensitive documents need safe handling",
        body: "Tax and financial documents can't be emailed around casually — intake needs to be secure.",
      },
    ],
    builds: [
      {
        title: "Clear, outcome-led service pages",
        body: "Pages for tax, bookkeeping, payroll and advisory — each optimised to rank and easy to understand.",
      },
      {
        title: "Secure document & enquiry intake",
        body: "Encrypted forms and secure upload so clients share documents safely from day one.",
      },
      {
        title: "Credibility & niche positioning",
        body: "Design and content that position you for the industries and client size you actually want.",
      },
      {
        title: "AI assistant for common questions",
        body: "An optional chatbot to handle deadline, pricing and process questions and book calls automatically.",
      },
    ],
    faqs: [
      {
        q: "Can clients securely upload documents through the site?",
        a: "Yes. We set up encrypted intake and secure upload so clients can share tax and financial documents safely, rather than emailing sensitive files back and forth.",
      },
      {
        q: "Can you help us target a specific niche or industry?",
        a: "We can. We position your design and content around the industries and client size you want — e.g. contractors, ecommerce sellers or medical practices — so you attract better-fit, higher-value clients.",
      },
      {
        q: "Will the site be easy for non-technical staff to update?",
        a: "Yes. We connect a simple headless CMS so your team can update services, fees and articles without code, while the site stays fast and secure.",
      },
    ],
  },
  {
    slug: "fitness-studios",
    audience: "fitness studios",
    name: "Fitness studios & gyms",
    title: "Website Design for Fitness Studios & Gyms | Flowdira",
    description:
      "Energetic, fast website design for gyms, studios and personal trainers — class booking, membership sign-up and lead capture that fills classes and grows membership.",
    h1Lead: "Website design for",
    h1Accent: "fitness studios.",
    lede: "Fitness is bought on energy and convenience. We build gym and studio sites that feel alive, load fast, and make joining or booking a class effortless.",
    intro: [
      "People decide to join a gym in a moment of motivation — and that moment is fragile. If your site is slow, the schedule is buried, or signing up takes too many steps, the impulse fades. We build fitness sites that capture that energy and convert it into bookings and memberships.",
      "Class schedules, membership sign-up, trainer profiles and lead capture, all wired into a fast, vibrant site that matches your brand's intensity.",
    ],
    pains: [
      {
        title: "Hidden or stale schedules",
        body: "If class times are hard to find or out of date, motivated visitors give up before they book.",
      },
      {
        title: "Too many steps to join",
        body: "Every extra click between 'I want to join' and 'I'm in' loses members. Sign-up has to be quick.",
      },
      {
        title: "Generic design with no energy",
        body: "A flat, templated site doesn't convey the experience or community that actually sells memberships.",
      },
    ],
    builds: [
      {
        title: "Live class schedule & booking",
        body: "An always-current schedule with one-tap booking, integrated with your management software.",
      },
      {
        title: "Fast membership sign-up",
        body: "A short, frictionless join flow and lead capture for free-trial and intro offers.",
      },
      {
        title: "Trainer & class pages",
        body: "Profiles and class-type pages that build trust and rank for specific searches.",
      },
      {
        title: "AI assistant & lead nurture",
        body: "An optional assistant to answer membership and class questions and follow up with leads automatically.",
      },
    ],
    faqs: [
      {
        q: "Can you integrate our class booking and membership system?",
        a: "Yes. We integrate popular gym and studio management platforms so your schedule, bookings and memberships sync automatically and members manage everything in one place.",
      },
      {
        q: "Can the site run intro offers and capture trial leads?",
        a: "It can. We build dedicated offer pages and quick lead-capture flows for free trials and intro deals, then connect them to your follow-up so leads don't go cold.",
      },
      {
        q: "Will the schedule always be up to date?",
        a: "Yes — by integrating with your booking software the schedule updates automatically, so visitors always see accurate class times without anyone editing the site manually.",
      },
    ],
  },
];

export const getIndustry = (slug: string) =>
  industries.find((i) => i.slug === slug);
