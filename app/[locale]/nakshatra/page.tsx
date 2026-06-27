import type { Metadata } from "next";
import Link from "next/link";
import { nakshatraList } from "@/lib/nakshatra";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/nakshatra`;

  const title = isHi
    ? "27 नक्षत्र - संपूर्ण सूची, स्वभाव और गुण | ज्योतिष आशा"
    : "27 Nakshatras - Complete List, Traits & Vedic Astrology Guide | Jyotishasha";
  const description = isHi
    ? "वैदिक ज्योतिष के सभी 27 नक्षत्रों की संपूर्ण जानकारी - स्वामी ग्रह, देवता, गण, स्वभाव, प्रेम, करियर और स्वास्थ्य के बारे में जानें।"
    : "Explore all 27 Nakshatras of Vedic astrology - ruling planets, deities, gana, personality traits, love, career and health insights for each birth star.";

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
  };
}

export default function NakshatraHubPage({
  params,
}: {
  params: { locale: string };
}) {
  const isHi = params.locale === "hi";
  const langPath = isHi ? "/hi" : "";

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4">
          {isHi ? "27 नक्षत्र" : "27 Nakshatras"}
        </h1>
        <p className="text-center text-indigo-200 max-w-2xl mx-auto mb-12">
          {isHi
            ? "अपना जन्म नक्षत्र चुनें और जानें इसका स्वभाव, स्वामी ग्रह, देवता, प्रेम, करियर और स्वास्थ्य पर प्रभाव।"
            : "Select your birth Nakshatra to discover its personality traits, ruling planet, deity, and influence on love, career and health."}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {nakshatraList.map((n) => (
            <Link
              key={n.slug}
              href={`${langPath}/nakshatra/${n.slug}`}
              className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-5 transition-all hover:scale-105"
            >
              <div className="text-xs text-indigo-400 font-bold mb-1">
                #{n.number}
              </div>
              <h2 className="text-lg font-bold text-white mb-1">
                {isHi ? n.name_hi : n.name}
              </h2>
              <p className="text-xs text-gray-400 mb-2">
                {isHi ? n.symbol_hi : n.symbol}
              </p>
              <p className="text-xs text-purple-300 font-semibold">
                {isHi ? "स्वामी:" : "Ruler:"} {isHi ? n.ruling_planet_hi : n.ruling_planet}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
