import TrackedLink from "@/components/muhurat/TrackedLink";
import { muhuratCtaIds } from "@/lib/muhuratSeo";

export default function CtaKundali({ slug, isHi }: { slug?: string; isHi?: boolean }) {
  const ids = muhuratCtaIds(slug || "general");
  return (
    <TrackedLink
      href={`${isHi ? "/hi" : ""}/free-kundali`}
      ctaId={ids.kundali}
      screenName={ids.screenName}
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      {isHi ? "🔮 अपनी मुफ़्त कुंडली बनाएं" : "🔮 Generate Your Free Kundali Now"}
    </TrackedLink>
  );
}
