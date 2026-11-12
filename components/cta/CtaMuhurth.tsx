import { MUHURAT_TOPIC_TO_TOOL } from "@/lib/panchangToolsMap";
import TrackedLink from "@/components/muhurat/TrackedLink";
import { muhuratCtaIds, topicShortName } from "@/lib/muhuratSeo";

export default function CtaMuhurth({
  slug,
  isHi,
  topicName,
}: {
  slug: string;
  isHi?: boolean;
  // Localized topic title ("Marriage Muhurat – …" / "विवाह मुहूर्त – …"); the slug is the fallback.
  topicName?: string;
}) {
  const tool = MUHURAT_TOPIC_TO_TOOL[slug];

  // No legitimate Panchang Tool exists for this Muhurat topic (e.g.
  // property-purchase-muhurat) -- hide the CTA rather than link to an
  // unrelated tool or a 404.
  if (!tool) return null;

  // The topic name already ends in "Muhurat" / "मुहूर्त", so the copy must not add it again
  // (previously "Check Your Marriage Muhurat Muhurat Dates").
  const fallback = slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
  const name = topicShortName(topicName || fallback);
  const ids = muhuratCtaIds(slug);

  return (
    <TrackedLink
      href={`${isHi ? "/hi" : ""}/panchang/tools/${tool}`}
      ctaId={ids.tool}
      screenName={ids.screenName}
      className="block my-6 p-4 text-center rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-semibold shadow-lg hover:scale-[1.02] transition"
    >
      {isHi ? `🪔 ${name}: अपनी तिथियां देखें` : `🪔 Check Your ${name} Dates`}
    </TrackedLink>
  );
}
