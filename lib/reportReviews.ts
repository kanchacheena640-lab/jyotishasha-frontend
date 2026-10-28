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

async function getJson<T>(path: string, tags?: string[]): Promise<T | null> {
  try {
    // `next` is Next.js's fetch extension (ISR); cast keeps plain-tsc test builds happy.
    const res = await fetch(`${BACKEND_URL}${path}`, {
      next: { revalidate: REVALIDATE_SECONDS, ...(tags ? { tags } : {}) },
      signal: AbortSignal.timeout(4000),
    } as RequestInit);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** true = active/purchasable, false = disabled, null = unknown (make no claim). */
export async function fetchProductActive(slug: string): Promise<boolean | null> {
  const data = await getJson<{ products?: Record<string, unknown> }>("/api/report-products/availability");
  const value = data?.products?.[slug];
  return typeof value === "boolean" ? value : null;
}

export async function fetchReviewSummary(slug: string): Promise<ReviewSummary | null> {
  const data = await getJson<ReviewSummary>(`/api/reviews/product/${encodeURIComponent(slug)}`, [REVIEWS_CACHE_TAG]);
  if (!data || typeof data.review_count !== "number" || !Array.isArray(data.reviews)) return null;
  return data;
}

/** schema.org availability only from a known registry state. */
export function offerAvailability(active: boolean | null): string | undefined {
  if (active === true) return "https://schema.org/InStock";
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
