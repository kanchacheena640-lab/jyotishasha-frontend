import type { Metadata } from "next";
import Link from "next/link";
import { nakshatraList } from "@/lib/nakshatra";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";
import NakshatraSchema from "@/components/nakshatra/NakshatraSchema";
import { nakshatraHubFaqs } from "@/lib/nakshatra/hubFaqData";

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
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/nakshatra`,
        hi: `${SITE_URL}/hi/nakshatra`,
        "x-default": `${SITE_URL}/nakshatra`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1730, height: 909, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
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
      <NakshatraSchema locale={params.locale} />
      <div className="max-w-6xl mx-auto">

        {/* H1 */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4">
          {isHi
            ? "27 नक्षत्र – अपना जन्म नक्षत्र जानें"
            : "27 Nakshatras – Find Your Birth Star"}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-indigo-200 max-w-2xl mx-auto mb-4">
          {isHi
            ? "अपना जन्म नक्षत्र चुनें और जानें इसका स्वभाव, स्वामी ग्रह, देवता, प्रेम, करियर और स्वास्थ्य पर प्रभाव।"
            : "Select your birth Nakshatra to discover its personality traits, ruling planet, deity, and influence on love, career and health."}
        </p>

        {/* Editorial intro */}
        <p className="text-center text-indigo-300 max-w-3xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          {isHi
            ? "वैदिक ज्योतिष में नक्षत्र जन्म के समय चंद्रमा की सटीक आकाशीय स्थिति को दर्शाता है। आपकी राशि के विपरीत, जन्म नक्षत्र आपके भावनात्मक स्वभाव, सहज प्रतिक्रियाओं और जीवन की प्रमुख दशाओं का अधिक गहरा और सटीक विवरण देता है। प्रत्येक नक्षत्र का अपना देवता, स्वामी ग्रह, प्रतीक और विशिष्ट व्यक्तित्व लक्षण होता है। नीचे दिए गए 27 नक्षत्रों में से अपना नक्षत्र चुनें — या अपनी मुफ्त जन्म कुंडली बनाकर पता लगाएँ कि आपका जन्म नक्षत्र कौन सा है।"
            : "In Vedic astrology, a Nakshatra is the lunar mansion occupied by the Moon at your exact moment of birth. Unlike your zodiac sign, your birth Nakshatra captures the Moon's precise position — revealing your emotional nature, instinctive responses, and the planetary period you begin life with. Each of the 27 Nakshatras carries a distinct deity, ruling planet, symbol, and personality profile that offers a finer lens than the zodiac sign alone. Select yours from the grid below, or generate your free Kundali to discover which Nakshatra is yours."}
        </p>

        {/* Find Your Nakshatra CTA */}
        <section className="bg-indigo-700/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8 text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {isHi
              ? "अपना जन्म नक्षत्र नहीं जानते?"
              : "Don't know your birth Nakshatra?"}
          </h2>
          <p className="text-indigo-200 mb-5 text-sm md:text-base">
            {isHi
              ? "अपनी जन्मतिथि, समय और स्थान से तुरंत जानें।"
              : "Find it instantly from your birth date, time, and place."}
          </p>
          <Link
            href={`${langPath}/free-kundali`}
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            {isHi ? "मुफ्त कुंडली बनाएं →" : "Generate Free Kundali →"}
          </Link>
        </section>

        {/* 27 Nakshatra cards */}
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

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {isHi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {nakshatraHubFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <summary className="cursor-pointer font-bold text-white flex justify-between items-center">
                  {isHi ? faq.q_hi : faq.q}
                  <span className="ml-4 flex-shrink-0 text-indigo-400 group-open:rotate-180 transition-transform">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-indigo-200 text-sm leading-relaxed">
                  {isHi ? faq.a_hi : faq.a}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
