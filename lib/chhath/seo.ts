// lib/chhath/seo.ts
//
// Pure builders for the Chhath page's metadata and JSON-LD. FAQ answers
// that need festival dates use the API response; without data they fall
// back to date-free text (dates are never invented).

import type { ChhathLanguage, ChhathView } from "./api";
import { CHHATH_FAQS, CHHATH_FAQ_REVIEW_SUFFIX, CHHATH_PATH, CHHATH_SEO, fill } from "./content";
import { formatChhathDate, to12Hour } from "./format";

export const CHHATH_SITE_URL = "https://www.jyotishasha.com";

export function chhathPath(lang: ChhathLanguage): string {
  return `${lang === "hi" ? "/hi" : ""}${CHHATH_PATH}`;
}

export function chhathCanonical(lang: ChhathLanguage): string {
  return `${CHHATH_SITE_URL}${chhathPath(lang)}`;
}

export function chhathAlternates(lang: ChhathLanguage) {
  return {
    canonical: chhathCanonical(lang),
    languages: {
      en: chhathCanonical("en"),
      hi: chhathCanonical("hi"),
      "x-default": chhathCanonical("en"),
    },
  };
}

export function chhathTitle(lang: ChhathLanguage, year: number): string {
  return fill(CHHATH_SEO.title[lang], { year });
}

export function chhathDescription(lang: ChhathLanguage, year: number): string {
  return fill(CHHATH_SEO.description[lang], { year });
}

/** Placeholder values for FAQ answers, from Patna-reference API data. */
export function chhathFaqValues(data: ChhathView, lang: ChhathLanguage): Record<string, string | number> {
  const [nahay, kharna, sandhya, usha] = data.days;
  return {
    year: data.year,
    nahay: formatChhathDate(nahay.date, lang),
    kharna: formatChhathDate(kharna.date, lang),
    sandhya: formatChhathDate(sandhya.date, lang),
    usha: formatChhathDate(usha.date, lang),
    sandhyaTime: to12Hour(sandhya.arghya_time),
    ushaTime: to12Hour(usha.arghya_time),
  };
}

/**
 * FAQ list for display and schema. `data` must be the Patna-reference
 * response (the page's server data), or null when the API failed.
 */
export function buildChhathFaqs(
  lang: ChhathLanguage,
  year: number,
  data: ChhathView | null
): { q: string; a: string }[] {
  const usable = data && data.year === year && data.location.city === "patna" ? data : null;
  const values = usable ? chhathFaqValues(usable, lang) : { year };
  return CHHATH_FAQS.map((faq) => {
    const answer = faq.needsData && !usable && faq.fallback ? faq.fallback[lang] : faq.a[lang];
    const suffix =
      usable && faq.reviewSensitive && usable.status === "needs_review" ? CHHATH_FAQ_REVIEW_SUFFIX[lang] : "";
    return { q: fill(faq.q[lang], values), a: fill(answer, values) + suffix };
  });
}

export function buildChhathFaqSchema(lang: ChhathLanguage, faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function buildChhathArticleSchema(lang: ChhathLanguage, year: number, datePublished: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: chhathTitle(lang, year),
    description: chhathDescription(lang, year),
    inLanguage: lang === "hi" ? "hi-IN" : "en-IN",
    image: `${CHHATH_SITE_URL}/og/jyotishasha-og-banner.jpg`,
    datePublished,
    author: { "@type": "Organization", name: "Jyotishasha", url: CHHATH_SITE_URL },
    publisher: { "@type": "Organization", name: "Jyotishasha" },
    mainEntityOfPage: { "@type": "WebPage", "@id": chhathCanonical(lang) },
  };
}

export function buildChhathBreadcrumbSchema(lang: ChhathLanguage) {
  const prefix = lang === "hi" ? "/hi" : "";
  const items = [
    { name: lang === "hi" ? "होम" : "Home", url: prefix || "/" },
    { name: lang === "hi" ? "व्रत और त्योहार" : "Vrat & Tyohar", url: `${prefix}/vrat-tyohar` },
    { name: lang === "hi" ? "छठ पूजा" : "Chhath Puja", url: chhathPath(lang) },
  ];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${CHHATH_SITE_URL}${item.url}`,
    })),
  };
}
