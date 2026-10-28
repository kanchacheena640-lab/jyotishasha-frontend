import type { ReviewSummary } from "@/lib/reportReviews";

const COPY = {
  heading: { en: "Verified buyer reviews", hi: "सत्यापित खरीदारों की समीक्षाएँ" },
  empty: {
    en: "No reviews yet. Only customers who bought and received this report can review it.",
    hi: "अभी कोई समीक्षा नहीं है। केवल वे ग्राहक समीक्षा कर सकते हैं जिन्होंने यह रिपोर्ट खरीदी और प्राप्त की है।",
  },
  outOf: { en: "out of 5", hi: "5 में से" },
  basedOn: { en: (n: number) => `Based on ${n} verified buyer review${n === 1 ? "" : "s"}`, hi: (n: number) => `${n} सत्यापित खरीदार समीक्षाओं पर आधारित` },
  verified: { en: "Verified buyer", hi: "सत्यापित खरीदार" },
  howItWorks: {
    en: "Reviews come only from buyers who received this report. We do not remove reviews for being negative.",
    hi: "समीक्षाएँ केवल उन्हीं खरीदारों की हैं जिन्हें यह रिपोर्ट मिली है। नकारात्मक होने के कारण हम कोई समीक्षा नहीं हटाते।",
  },
  rules: { en: "How reviews work", hi: "समीक्षाएँ कैसे काम करती हैं (अंग्रेज़ी में)" },
} as const;

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span aria-hidden="true" className="text-amber-400 tracking-tight">
      {"★".repeat(full)}<span className="text-slate-600">{"★".repeat(5 - full)}</span>
    </span>
  );
}

/** Published verified-buyer reviews, rendered as plain (React-escaped) text.
 * The Product JSON-LD rating comes from this SAME summary, so markup always
 * matches what is visible here. */
export default function ProductReviews({ summary, lang = "en" }: { summary: ReviewSummary | null; lang?: "en" | "hi" }) {
  if (!summary) return null; // reviews service unavailable: show nothing rather than a false "no reviews"
  return (
    <section id="reviews" aria-labelledby="reviews-heading" className="max-w-3xl mx-auto my-12 px-4 text-left">
      <h2 id="reviews-heading" className="text-xl md:text-2xl font-semibold text-white mb-4">{COPY.heading[lang]}</h2>
      {summary.review_count === 0 || summary.average_rating === null ? (
        <p className="text-slate-400 text-sm">{COPY.empty[lang]}</p>
      ) : (
        <>
          <p className="mb-6 text-slate-200">
            <Stars rating={summary.average_rating} />{" "}
            <strong className="text-white">{summary.average_rating.toFixed(1)}</strong> {COPY.outOf[lang]} ·{" "}
            <span className="text-slate-400">{COPY.basedOn[lang](summary.review_count)}</span>
          </p>
          <ul className="space-y-4">
            {summary.reviews.map((r) => (
              <li key={r.id} className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-4">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <Stars rating={r.rating} />
                  <span className="sr-only">{`${r.rating} ${COPY.outOf[lang]}`}</span>
                  <span className="font-medium text-white">{r.display_name}</span>
                  <span className="text-xs text-emerald-400">✓ {COPY.verified[lang]}</span>
                  <time dateTime={r.date} className="text-xs text-slate-500">{r.date}</time>
                </div>
                <p className="mt-2 whitespace-pre-line break-words text-slate-300 text-sm">{r.body}</p>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-4 text-xs text-slate-500">
        {COPY.howItWorks[lang]}{" "}
        <a href="/terms#reviews" className="underline hover:text-slate-300">{COPY.rules[lang]}</a>
      </p>
    </section>
  );
}
