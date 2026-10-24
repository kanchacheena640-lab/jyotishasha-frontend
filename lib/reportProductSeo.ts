/**
 * Paid-report product SEO helpers (F10-P03): product URLs, the visible product
 * name, and safe JSON-LD serialization.
 *
 * Every catalog report lives at /reports/<slug> EXCEPT the ₹199 Relationship
 * Future Report, whose real, locale-aware product page is
 * /love/report/relationship_future_report (+ /hi/...). The old
 * /reports/relationship_future_report URL is a server-side 301 to the English
 * product page (next.config.js), so internal links must point at the real page
 * directly -- that keeps Hindi visitors on the Hindi page instead of the
 * redirect's English default.
 */
export const RELATIONSHIP_REPORT_SLUG = "relationship_future_report";
export const RELATIONSHIP_REPORT_PATH = "/love/report/relationship_future_report";

export function getReportProductPath(slug: string, locale?: string | null): string {
  if (slug === RELATIONSHIP_REPORT_SLUG) {
    return `${locale === "hi" ? "/hi" : ""}${RELATIONSHIP_REPORT_PATH}`;
  }
  return `/reports/${slug}`;
}

type Localized = { en?: string; hi?: string };

/** The standard report page's visible H1 text -- also the Product schema
 * `name`, so the markup always matches what the page shows. */
export function getReportDisplayName(
  report: { title: Localized },
  seo: { seoTitle?: Localized } | undefined,
  lang: "en" | "hi",
): string {
  return (seo?.seoTitle?.[lang]?.split("|")[0] || report.title[lang] || "").trim();
}

// U+2028 / U+2029 built from char codes so no raw separator sits in this source.
const LINE_SEPARATOR = new RegExp(String.fromCharCode(0x2028), "g");
const PARAGRAPH_SEPARATOR = new RegExp(String.fromCharCode(0x2029), "g");

/** JSON for an inline <script type="application/ld+json">, escaped so no value
 * can close the script element or open an HTML comment (</script>, <!--). */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_SEPARATOR, "\\u2028")
    .replace(PARAGRAPH_SEPARATOR, "\\u2029");
}
