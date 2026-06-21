/* ============================================================
   Programmatic SEO — shared helpers & types
   Drives the data-templated pages under src/data/* and the
   dynamic routes in src/pages/{web-design-for,compare,glossary,
   web-design}/. Keep this framework-light: pure data + helpers.
   ============================================================ */

export const SITE = "https://flowdira.com";

/** A short Q&A pair — rendered as an accordion AND FAQPage schema. */
export interface Faq {
  q: string;
  a: string;
}

/** A titled block of body copy (pain point, feature, section…). */
export interface Block {
  title: string;
  body: string;
}

/** One internal link surfaced in the "Related" / cross-link grid. */
export interface RelatedLink {
  label: string;
  href: string;
  note?: string;
}

/** A breadcrumb trail item. The last item is the current page. */
export interface Crumb {
  label: string;
  href: string;
}

/** Lowercase, hyphenated, URL-safe slug. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Absolute URL on the canonical origin (for schema/canonicals). */
export function absUrl(path: string): string {
  return new URL(path, SITE).href;
}

/** BreadcrumbList structured data from a crumb trail. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: absUrl(c.href),
    })),
  };
}

/** FAQPage structured data from a list of Q&As. */
export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** Merge several schema objects into one @graph script payload. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
