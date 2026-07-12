import { format } from "date-fns";

/**
 * Normalises any [date] route segment to yyyy-MM-dd before it reaches SEO
 * helpers or data fetchers. This is the single place that understands both
 * semantic panchang route values ("today") and every accepted calendar format.
 *
 * Must be called at the top of generateMetadata() and the page component —
 * never inside a shared SEO helper such as toISTDatePublished().
 *
 * Accepted inputs → output:
 *   "today"       → current date as yyyy-MM-dd
 *   yyyy-MM-dd    → unchanged
 *   dd-MM-yyyy    → reordered to yyyy-MM-dd
 *   anything else → current date as yyyy-MM-dd (safe fallback)
 */
export function resolveDate(raw: string): string {
  if (raw === "today") return format(new Date(), "yyyy-MM-dd");
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return raw;
  const m = raw.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return format(new Date(), "yyyy-MM-dd");
}
