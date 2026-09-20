/**
 * Static sample PDFs for the paid report pages.
 *
 * The 50 files live in public/report-samples/ as `<slug>_<en|hi>.pdf`, so a sample URL is derived
 * from the report slug and language alone -- no per-product table, no backend call, no analytics.
 * Deliberately independent of every purchase/order/payment path.
 */
export type SampleLanguage = "en" | "hi";

/** Any language starting with "hi" (e.g. "hi", "hi-IN") is Hindi; everything else is English. */
export function normalizeSampleLanguage(language?: string | null): SampleLanguage {
  return language?.toLowerCase().startsWith("hi") ? "hi" : "en";
}

export function getReportSampleUrl(slug: string, language?: string | null): string {
  return `/report-samples/${slug}_${normalizeSampleLanguage(language)}.pdf`;
}

export function getReportSampleLabel(language?: string | null): string {
  return normalizeSampleLanguage(language) === "hi" ? "सैंपल रिपोर्ट देखें" : "View Sample Report";
}
