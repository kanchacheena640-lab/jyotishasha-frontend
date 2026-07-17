import type { Metadata } from "next";
import Link from "next/link";
import { getPlanetHouseByPlanet, planetInHouseList } from "@/lib/planetInHouse";
import { planetInHouseHubFaqs } from "@/lib/planetInHouse/hubFaqData";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";

/* ------------------------------------------------------------------ */
/* Planet metadata used only for hub presentation                       */
/* ------------------------------------------------------------------ */
const PLANET_SLUGS = [
  "sun", "moon", "mars", "mercury", "jupiter",
  "venus", "saturn", "rahu", "ketu",
] as const;

const PLANET_INTROS: Record<string, { desc: string; desc_hi: string }> = {
  sun:     { desc: "Soul, identity, ego and authority — the Sun reveals how you express yourself in the world.", desc_hi: "आत्मा, पहचान और अहंकार — सूर्य आपकी संसार में अभिव्यक्ति दर्शाता है।" },
  moon:    { desc: "Mind, emotions, mother and habits — the Moon shapes your inner emotional world.", desc_hi: "मन, भावनाएं और माता — चंद्रमा आपकी आंतरिक भावनात्मक दुनिया को आकार देता है।" },
  mars:    { desc: "Energy, courage, ambition and conflict — Mars shows where you direct your drive.", desc_hi: "ऊर्जा, साहस और महत्वाकांक्षा — मंगल दर्शाता है कि आप अपनी शक्ति कहाँ लगाते हैं।" },
  mercury: { desc: "Intellect, communication, business and learning — Mercury governs how you think and speak.", desc_hi: "बुद्धि, संचार और व्यापार — बुध आपकी सोच और बोलने की शैली को नियंत्रित करता है।" },
  jupiter: { desc: "Wisdom, fortune, dharma and growth — Jupiter is the great benefic that expands what it touches.", desc_hi: "ज्ञान, भाग्य और धर्म — बृहस्पति महान शुभ ग्रह है जो जहाँ भी हो विस्तार देता है।" },
  venus:   { desc: "Love, beauty, wealth and creativity — Venus governs pleasure, art and relationships.", desc_hi: "प्रेम, सुंदरता और धन — शुक्र आनंद, कला और रिश्तों का स्वामी है।" },
  saturn:  { desc: "Discipline, karma, delays and hard work — Saturn restricts, but rewards those who persist.", desc_hi: "अनुशासन, कर्म और विलंब — शनि बाधाएं देता है पर दृढ़ता का पुरस्कार भी देता है।" },
  rahu:    { desc: "Ambition, illusion, obsession and foreign matters — Rahu amplifies wherever it sits.", desc_hi: "महत्वाकांक्षा, भ्रम और जुनून — राहु जहाँ हो वहाँ इच्छाओं को बढ़ाता और भटकाता है।" },
  ketu:    { desc: "Spirituality, detachment, past karma and liberation — Ketu brings focus and moksha.", desc_hi: "आध्यात्मिकता, वैराग्य और मोक्ष — केतु एकाग्रता, अंतर्दृष्टि और विमुक्ति देता है।" },
};

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/planet-in-house`;

  const title = isHi
    ? "भावों में ग्रह — वैदिक जन्म कुंडली मार्गदर्शिका | ज्योतिष आशा"
    : "Planets in Houses — Vedic Birth Chart Guide | Jyotishasha";
  const description = isHi
    ? "वैदिक ज्योतिष में सभी 9 ग्रहों की 12 भावों में स्थिति का विस्तृत विश्लेषण। जानें कि सूर्य, चंद्र, मंगल और अन्य ग्रह आपके जीवन के विभिन्न क्षेत्रों को कैसे प्रभावित करते हैं।"
    : "In-depth guide to all 9 planets across all 12 houses in Vedic astrology. Discover how the Sun, Moon, Mars and every planet shapes your personality, career, relationships and spiritual path.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/planet-in-house`,
        hi: `${SITE_URL}/hi/planet-in-house`,
        "x-default": `${SITE_URL}/planet-in-house`,
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

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default function PlanetInHouseHubPage({
  params,
}: {
  params: { locale: string };
}) {
  const isHi = params.locale === "hi";
  const langPath = isHi ? "/hi" : "";
  const t = (en: string, hi: string) => (isHi ? hi : en);

  const canonicalUrl = `${SITE_URL}${langPath}/planet-in-house`;

  /* ---------- Planet groups (all 12 houses per planet) ---------- */
  const planetGroups = PLANET_SLUGS.map((planetSlug) => ({
    planetSlug,
    intro: PLANET_INTROS[planetSlug],
    houses: getPlanetHouseByPlanet(planetSlug),
  }));

  /* ---------- Schemas ---------- */
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: t("Home", "होम"),
        item: `${SITE_URL}${langPath}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: t("Planets in Houses", "भावों में ग्रह"),
        item: canonicalUrl,
      },
    ],
  };

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t(
      "Planets in Houses — Vedic Birth Chart Guide",
      "भावों में ग्रह — वैदिक जन्म कुंडली मार्गदर्शिका"
    ),
    description: t(
      "In-depth guide to all 9 planets across all 12 houses in Vedic astrology.",
      "वैदिक ज्योतिष में सभी 9 ग्रहों की 12 भावों में स्थिति का विस्तृत विश्लेषण।"
    ),
    url: canonicalUrl,
    inLanguage: isHi ? "hi" : "en",
    publisher: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t("Planets in Houses — All 108 Combinations", "भावों में ग्रह — सभी 108 संयोजन"),
    itemListElement: planetInHouseList.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t(
        `${item.planet} in ${item.houseLabel}`,
        `${item.planet_hi} ${item.houseLabel_hi} में`
      ),
      url: `${SITE_URL}${langPath}/planet-in-house/${item.slug}`,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: planetInHouseHubFaqs.map((f) => ({
      "@type": "Question",
      name: t(f.q, f.q_hi),
      acceptedAnswer: { "@type": "Answer", text: t(f.a, f.a_hi) },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 py-12 px-4">
      {/* Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="max-w-6xl mx-auto">

        {/* H1 */}
        <h1 className="text-3xl md:text-5xl font-extrabold text-center text-white mb-4">
          {t(
            "Planets in Houses — Vedic Birth Chart Guide",
            "भावों में ग्रह — वैदिक जन्म कुंडली मार्गदर्शिका"
          )}
        </h1>

        {/* Subtitle */}
        <p className="text-center text-indigo-200 max-w-2xl mx-auto mb-4">
          {t(
            "Explore how each planet shapes a different area of your life based on its position in your birth chart.",
            "जानें कि जन्म कुंडली में प्रत्येक ग्रह की स्थिति आपके जीवन के विभिन्न क्षेत्रों को कैसे आकार देती है।"
          )}
        </p>

        {/* Editorial intro */}
        <p className="text-center text-indigo-300 max-w-3xl mx-auto mb-10 text-sm md:text-base leading-relaxed">
          {t(
            "In Vedic astrology, the house a planet occupies at the moment of your birth is one of the most telling features of your chart. Unlike the zodiac sign — which describes the planet's style — the house reveals which life area that energy is actively directed toward. The Sun in the 10th house points ambition and identity toward career; the Moon in the 4th house roots emotion deep in family and home. Each of the nine Jyotish planets across twelve houses produces 108 distinct natal placements — every one of them meaningful.",
            "वैदिक ज्योतिष में जन्म के समय ग्रह जिस भाव में होता है वह आपकी कुंडली की सबसे महत्वपूर्ण विशेषताओं में से एक है। राशि ग्रह की शैली बताती है, लेकिन भाव बताता है कि वह ऊर्जा जीवन के किस क्षेत्र में निर्देशित होती है। दशम भाव में सूर्य महत्वाकांक्षा और पहचान को करियर की ओर ले जाता है; चतुर्थ भाव में चंद्रमा भावनाओं को परिवार और घर में गहरा करता है। नौ ज्योतिष ग्रह बारह भावों में 108 विशिष्ट जन्म स्थितियाँ बनाते हैं — हर एक अर्थपूर्ण।"
          )}
        </p>

        {/* What is Planet in House */}
        <section className="max-w-3xl mx-auto mb-10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {t("What Is a Planet in House?", "भाव में ग्रह क्या होता है?")}
          </h2>
          <p className="text-indigo-200 leading-relaxed text-sm md:text-base">
            {t(
              "Your birth chart has 12 houses, each governing a distinct area of life: self, wealth, siblings, home, children, health, partnerships, transformation, fortune, career, gains and liberation. When a planet falls in a house, it acts as a permanent tenant — influencing the themes of that house throughout your life. The planet brings its qualities, desires and karmas into that life domain. Mars in the 2nd house, for example, makes a person direct and sometimes combative in matters of money and speech; Jupiter in the same position expands wealth and gives a generous, teaching-oriented approach to finances.",
              "आपकी जन्म कुंडली में 12 भाव हैं जो जीवन के विशिष्ट क्षेत्रों को दर्शाते हैं: स्वयं, धन, भाई-बहन, घर, संतान, स्वास्थ्य, साझेदारी, परिवर्तन, भाग्य, करियर, लाभ और मोक्ष। जब कोई ग्रह किसी भाव में होता है तो वह एक स्थायी किरायेदार की तरह काम करता है — जीवन भर उस भाव के विषयों को प्रभावित करता है। ग्रह अपने गुण, इच्छाएं और कर्म उस जीवन-क्षेत्र में लाता है। उदाहरण के लिए, द्वितीय भाव में मंगल व्यक्ति को धन और वाणी में सीधा और कभी-कभी आक्रामक बनाता है; उसी भाव में बृहस्पति धन का विस्तार करता है और वित्त के प्रति उदार शिक्षकीय दृष्टिकोण देता है।"
            )}
          </p>
        </section>

        {/* Why it matters */}
        <section className="max-w-3xl mx-auto mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
            {t("Why Your Planetary Placements Matter", "आपकी ग्रह स्थितियाँ क्यों महत्वपूर्ण हैं")}
          </h2>
          <p className="text-indigo-200 leading-relaxed text-sm md:text-base">
            {t(
              "House placements are among the first things a Vedic astrologer examines because they are highly personal — unlike planetary signs which shift slowly over months or years, the houses are set by your exact birth time and place. Two people born on the same day in different cities will have completely different house placements for the same planet. Understanding your natal placements reveals the specific areas of life each planet energises, the recurring patterns in your chart, and the karmic lessons you are here to work through.",
              "भाव स्थितियाँ उन पहली चीजों में से हैं जो एक वैदिक ज्योतिषी जांचता है क्योंकि ये अत्यंत व्यक्तिगत हैं — राशि स्थितियाँ महीनों या वर्षों में धीरे-धीरे बदलती हैं, लेकिन भाव आपके सटीक जन्म समय और स्थान से तय होते हैं। एक ही दिन अलग-अलग शहरों में पैदा हुए दो लोगों के ग्रहों की भाव स्थितियाँ पूरी तरह अलग होंगी। अपनी जन्म स्थितियों को समझने से यह पता चलता है कि प्रत्येक ग्रह जीवन के किन क्षेत्रों को ऊर्जा देता है, आपकी कुंडली में आवर्ती पैटर्न क्या हैं और आप किन कार्मिक पाठों को सीखने आए हैं।"
            )}
          </p>
        </section>

        {/* Find Your Lagna CTA */}
        <section className="bg-indigo-700/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8 text-center mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {t(
              "Don't know which house your planets are in?",
              "नहीं जानते आपके ग्रह किस भाव में हैं?"
            )}
          </h2>
          <p className="text-indigo-200 mb-5 text-sm md:text-base">
            {t(
              "Generate your free Kundali to find your Lagna, house placements and complete birth chart.",
              "मुफ्त कुंडली बनाएं — अपना लग्न, भाव स्थितियाँ और पूरी जन्म कुंडली जानें।"
            )}
          </p>
          <Link
            href={`${langPath}/free-kundali`}
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            {t("Generate Free Kundali →", "मुफ्त कुंडली बनाएं →")}
          </Link>
        </section>

        {/* Quick Navigation — anchor pills per planet */}
        <nav className="flex flex-wrap justify-center gap-2 mb-10" aria-label={t("Jump to planet", "ग्रह पर जाएं")}>
          {planetGroups.map(({ planetSlug, houses }) => (
            <a
              key={planetSlug}
              href={`#${planetSlug}`}
              className="text-xs font-bold px-4 py-2 rounded-full bg-white/10 text-indigo-200 hover:bg-white/20 transition"
            >
              {t(houses[0].planet, houses[0].planet_hi)}
            </a>
          ))}
        </nav>

        {/* 9 Planet sections — each with 12 house links */}
        <div className="space-y-12 mb-16">
          {planetGroups.map(({ planetSlug, intro, houses }) => {
            const planetName = t(houses[0].planet, houses[0].planet_hi);
            const transitSlug = `${planetSlug}-transit`;

            return (
              <section key={planetSlug} id={planetSlug}>
                <div className="flex items-start justify-between flex-wrap gap-3 mb-3">
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {t(
                      `${houses[0].planet} in All 12 Houses`,
                      `${houses[0].planet_hi} — सभी 12 भाव`
                    )}
                  </h2>
                  <Link
                    href={`${langPath}/${transitSlug}`}
                    className="text-xs font-bold px-3 py-1.5 rounded-full bg-purple-700/40 text-purple-200 border border-purple-500/30 hover:bg-purple-700/60 transition shrink-0"
                  >
                    {t(`${houses[0].planet} Transit →`, `${houses[0].planet_hi} गोचर →`)}
                  </Link>
                </div>

                <p className="text-indigo-300 text-sm mb-5">
                  {t(intro.desc, intro.desc_hi)}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {houses.map((h) => (
                    <Link
                      key={h.slug}
                      href={`${langPath}/planet-in-house/${h.slug}`}
                      className="group bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-4 transition-all hover:scale-[1.02]"
                    >
                      <p className="text-xs text-indigo-400 font-bold mb-1">
                        {t(`House ${h.house}`, `भाव ${h.house}`)}
                      </p>
                      <p className="text-sm font-semibold text-white leading-snug">
                        {t(
                          `${h.planet} in ${h.houseLabel}`,
                          `${h.planet_hi} ${h.houseLabel_hi} में`
                        )}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8">
            {t("Frequently Asked Questions", "अक्सर पूछे जाने वाले सवाल")}
          </h2>
          <div className="space-y-3 max-w-3xl mx-auto">
            {planetInHouseHubFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white/5 border border-white/10 rounded-2xl p-5"
              >
                <summary className="cursor-pointer font-bold text-white flex justify-between items-center">
                  {t(faq.q, faq.q_hi)}
                  <span className="ml-4 flex-shrink-0 text-indigo-400 group-open:rotate-180 transition-transform">↓</span>
                </summary>
                <p className="mt-3 text-indigo-200 text-sm leading-relaxed">
                  {t(faq.a, faq.a_hi)}
                </p>
              </details>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
