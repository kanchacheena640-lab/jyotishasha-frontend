import TrackedLink from "@/components/muhurat/TrackedLink";
import { muhuratCtaIds } from "@/lib/muhuratSeo";

// Topic-specific report products (verified live catalogue pages, ₹99 base reports).
// Topics without an entry keep the generic catalogue link.
const TOPIC_REPORTS: Record<string, { href: string; en: string; hi: string }> = {
  "marriage-muhurat": {
    href: "/reports/marriage_report",
    en: "📘 Get Your Personalized Marriage Report – Only ₹99",
    hi: "📘 अपनी व्यक्तिगत विवाह रिपोर्ट पाएं – केवल ₹99",
  },
};

export default function CtaReport({ slug, isHi }: { slug?: string; isHi?: boolean }) {
  const topic = slug ? TOPIC_REPORTS[slug] : undefined;
  const href = topic?.href ?? "/reports";
  const label = topic
    ? (isHi ? topic.hi : topic.en)
    : (isHi ? "📘 अपनी व्यक्तिगत ज्योतिष रिपोर्ट पाएं – केवल ₹99" : "📘 Get Your Personalized Astrology Report – Only ₹99");
  const ids = muhuratCtaIds(slug || "general");

  return (
    <TrackedLink
      href={href}
      ctaId={ids.report}
      screenName={ids.screenName}
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-amber-500 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      {label}
    </TrackedLink>
  );
}
