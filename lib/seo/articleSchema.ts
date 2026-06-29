export const SITE_URL = "https://www.jyotishasha.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og/jyotishasha-og-banner.jpg`;

export type BreadcrumbItem = {
  name: string;
  url: string;
};

/**
 * Generates Schema.org BreadcrumbList JSON-LD.
 * Reusable across all SEO pages.
 */
export function buildBreadcrumbSchema(
  items: BreadcrumbItem[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.url}`,
    })),
  };
}

export function toISTDatePublished(date: Date | string = new Date()): string {
  if (typeof date === "string") {
    const ddmmyyyy = date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (ddmmyyyy) {
      const [, dd, mm, yyyy] = ddmmyyyy;
      return `${yyyy}-${mm}-${dd}T00:00:00+05:30`;
    }
  }
  const d = typeof date === "string" ? new Date(date) : date;
  const datePart = d.toISOString().split("T")[0];
  return `${datePart}T00:00:00+05:30`;
}

export function buildFAQPageSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
