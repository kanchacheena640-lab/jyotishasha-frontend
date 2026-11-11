/**
 * F10-P15 -- live product availability and verified-buyer reviews for paid
 * report pages, read from the backend's authoritative sources:
 *   GET /api/report-products/availability  (report_products.active -- the same
 *       flag order creation enforces, so schema can never contradict checkout)
 *   GET /api/reviews/product/<slug>         (PUBLISHED reviews only)
 * Any failure returns null, and callers then make NO availability or rating
 * claim at all -- never a guessed one.
 */
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";
const REVALIDATE_SECONDS = 300;
/** Cache tag on every review-summary fetch; the admin moderation BFF
 * invalidates it so a deleted/rejected review leaves product pages on their
 * next view instead of lingering in a stale ISR copy. */
export const REVIEWS_CACHE_TAG = "report-reviews";

export interface PublicReview {
  id: number;
  rating: number;
  body: string;
  display_name: string;
  language: string;
  date: string;
}

export interface ReviewSummary {
  product: string;
  review_count: number;
  average_rating: number | null;
  distribution: Record<string, number>;
  reviews: PublicReview[];
}

/** One attempt per entry of `timeoutsMs` (ms); the default is the original single 4s attempt. */
async function getJson<T>(path: string, tags?: string[], timeoutsMs: readonly number[] = [4000]): Promise<T | null> {
  for (const timeoutMs of timeoutsMs) {
    try {
      // `next` is Next.js's fetch extension (ISR); cast keeps plain-tsc test builds happy.
      const res = await fetch(`${BACKEND_URL}${path}`, {
        next: { revalidate: REVALIDATE_SECONDS, ...(tags ? { tags } : {}) },
        signal: AbortSignal.timeout(timeoutMs),
      } as RequestInit);
      if (res.ok) return (await res.json()) as T;
    } catch {
      // timeout / network error: try again if attempts remain
    }
  }
  return null;
}

/** Availability attempts: 3s, then a 1s retry (4s worst case, same as the original single attempt). */
export const AVAILABILITY_TIMEOUTS_MS = [3000, 1000] as const;

/** true = active/purchasable, false = disabled, null = unknown (make no claim). */
// GSC "offers.availability missing": a single 4s attempt sometimes timed out on a page's first render, and that
// render was then cached without availability (reproduced locally: 2 of 153 product pages on a cold server).
// One shared, small response: a 3s first attempt (fresh-connection latency measured 0.4-1.8s) and a 1s retry for fast
// failures. Worst case stays at the previous 4s total, so a hanging backend never holds a render longer than before.
// Still null (no claim) when both attempts fail.
export async function fetchProductActive(slug: string): Promise<boolean | null> {
  const data = await getJson<{ products?: Record<string, unknown> }>("/api/report-products/availability", undefined, AVAILABILITY_TIMEOUTS_MS);
  const value = data?.products?.[slug];
  return typeof value === "boolean" ? value : null;
}

export async function fetchReviewSummary(slug: string): Promise<ReviewSummary | null> {
  const data = await getJson<ReviewSummary>(`/api/reviews/product/${encodeURIComponent(slug)}`, [REVIEWS_CACHE_TAG]);
  if (!data || typeof data.review_count !== "number" || !Array.isArray(data.reviews)) return null;
  return data;
}

/** schema.org availability only from a known registry state. An active report is a personalised PDF that can only
 * be bought online (emailed, nothing shipped), so OnlineOnly is the accurate value; inactive -> OutOfStock. */
export function offerAvailability(active: boolean | null): string | undefined {
  if (active === true) return "https://schema.org/OnlineOnly";
  if (active === false) return "https://schema.org/OutOfStock";
  return undefined;
}

/**
 * Product review markup, ONLY from genuine published reviews, matching what
 * ProductReviews shows on the page: the same average/count and the same
 * listed reviews. Empty object when there are none (no stars without reviews).
 */
export function reviewSchemaFields(summary: ReviewSummary | null) {
  if (!summary || summary.review_count < 1 || summary.average_rating === null || summary.reviews.length === 0) return {};
  return {
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: summary.average_rating,
      reviewCount: summary.review_count,
      bestRating: 5,
      worstRating: 1,
    },
    review: summary.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.display_name },
      datePublished: r.date,
      reviewBody: r.body,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
    })),
  };
}
