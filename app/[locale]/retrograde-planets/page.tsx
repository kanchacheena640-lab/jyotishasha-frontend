import type { Metadata } from "next"
import Link from "next/link"
import { retrogradeHubData } from "@/lib/retrograde/hubData"
import { retrogradePlanetList } from "@/lib/retrograde"
import RetrogradePlanetCard from "@/components/retrograde/RetrogradePlanetCard"
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildBreadcrumbSchema,
  buildFAQPageSchema,
} from "@/lib/seo/articleSchema"

export const revalidate = 86400

const COMPARISON_ROWS = [
  {
    id: "motion",
    en: "Apparent motion",
    hi: "आभासी गति",
    direct: "Eastward through zodiac signs (prograde)",
    direct_hi: "राशियों में पूर्वमुखी (अनुलोम)",
    vakri: "Westward — apparent reversal of normal direction",
    vakri_hi: "पश्चिममुखी — सामान्य दिशा की आभासी पलटी",
  },
  {
    id: "visibility",
    en: "Night sky brightness (outer planets)",
    hi: "रात्रि चमक — बाह्य ग्रह",
    direct: "Moving away from opposition; brightness declining",
    direct_hi: "प्रतियोग से दूर; चमक धीरे-धीरे घटती",
    vakri: "Near opposition; at their brightest and largest",
    vakri_hi: "प्रतियोग के निकट; रात्रि आकाश में चरम चमक पर",
  },
  {
    id: "quality",
    en: "Astrological orientation",
    hi: "ज्योतिषीय अभिविन्यास",
    direct: "External expression; initiating in the planet's domain",
    direct_hi: "बाह्य अभिव्यक्ति; ग्रह के क्षेत्र में नई शुरुआत",
    vakri: "Inward focus; reviewing and deepening in the planet's domain",
    vakri_hi: "आंतरिक ध्यान; ग्रह के क्षेत्र में समीक्षा और गहराई",
  },
  {
    id: "classical",
    en: "Vedic classical strength",
    hi: "वैदिक शास्त्रीय शक्ति",
    direct: "Standard; assessed by sign dignity, house, and aspects",
    direct_hi: "सामान्य; राशि गरिमा, भाव और दृष्टि से आकलित",
    vakri: "Balavan (strong) per Parashara; results may arrive delayed or unconventionally",
    vakri_hi: "पराशर अनुसार बलवान; परिणाम विलंब से या असामान्य रूप में",
  },
]

const DISCOVER_MORE = [
  { en: "Planets in Houses", hi: "भावों में ग्रह", slug: "planet-in-house", external: false },
  { en: "Free Kundali", hi: "मुफ्त कुंडली", slug: "free-kundali", external: false },
  { en: "Lagna Finder", hi: "लग्न खोजें", slug: "tools/lagna-finder", external: false },
]

/* ---------- Metadata ---------- */
export async function generateMetadata({
  params,
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const isHi = params.locale === "hi"
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/retrograde-planets`
  const title = isHi
    ? "वैदिक ज्योतिष में वक्री ग्रह — सम्पूर्ण मार्गदर्शिका | ज्योतिष आशा"
    : "Retrograde Planets in Vedic Astrology — Complete Guide | Jyotishasha"
  const description = isHi
    ? "वैदिक ज्योतिष में वक्री ग्रहों का अर्थ, खगोल विज्ञान और प्रभाव — बुध, शुक्र, मंगल, बृहस्पति और शनि के लिए विस्तृत मार्गदर्शिका।"
    : "Retrograde planets in Vedic astrology — astronomy, vakri graha meaning, and effects of Mercury, Venus, Mars, Jupiter and Saturn retrograde."
  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/retrograde-planets`,
        hi: `${SITE_URL}/hi/retrograde-planets`,
        "x-default": `${SITE_URL}/retrograde-planets`,
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
  }
}

/* ---------- Page ---------- */
export default function RetrogradeHubPage({
  params,
}: {
  params: { locale: string }
}) {
  const isHi = params.locale === "hi"
  const langPath = isHi ? "/hi" : ""
  const t = (en: string, hi: string) => (isHi ? hi : en)

  const canonicalUrl = `${SITE_URL}${langPath}/retrograde-planets`

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: t("Home", "होम"), url: `${langPath}/` },
    { name: t("Retrograde Planets", "वक्री ग्रह"), url: `${langPath}/retrograde-planets` },
  ])

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t(
      "Retrograde Planets in Vedic Astrology",
      "वैदिक ज्योतिष में वक्री ग्रह"
    ),
    description: t(
      "Complete guide to retrograde planets in Vedic astrology — Mercury, Venus, Mars, Jupiter and Saturn.",
      "वैदिक ज्योतिष में वक्री ग्रहों की सम्पूर्ण मार्गदर्शिका — बुध, शुक्र, मंगल, बृहस्पति और शनि।"
    ),
    url: canonicalUrl,
    inLanguage: isHi ? "hi" : "en",
    publisher: { "@type": "Organization", name: "Jyotishasha", url: SITE_URL },
  }

  const faqSchema =
    retrogradeHubData.faqs.length > 0
      ? buildFAQPageSchema(
          retrogradeHubData.faqs.map((f) => ({
            q: t(f.q, f.q_hi),
            a: t(f.a, f.a_hi),
          })),
        )
      : null

  const tocItems = [
    { id: "section-what", label: t("What is Retrograde Motion?", "वक्री गति क्या है?") },
    { id: "section-astronomy", label: t("The Astronomy", "खगोल विज्ञान") },
    { id: "section-vedic", label: t("Vedic Interpretation", "वैदिक व्याख्या") },
    { id: "section-compare", label: t("Direct vs Retrograde", "मार्गी बनाम वक्री") },
    { id: "section-myths", label: t("Myths vs Facts", "भ्रांतियाँ बनाम तथ्य") },
    { id: "section-sun-moon", label: t("Why Sun & Moon Never Retrograde", "सूर्य-चंद्र वक्री क्यों नहीं") },
    { id: "section-rahu-ketu", label: t("Why Rahu & Ketu Always Retrograde", "राहु-केतु सदा वक्री क्यों") },
    { id: "section-planets", label: t("All Nine Planets", "सभी नौ ग्रह") },
    { id: "section-faq", label: t("FAQs", "प्रश्नोत्तर") },
    { id: "section-cta", label: t("Get Your Kundali", "कुंडली बनाएं") },
    { id: "section-discover", label: t("Discover More", "और जानें") },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-950 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
        />
        {faqSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
          />
        )}

        {/* Breadcrumb */}
        <nav
          aria-label={t("Breadcrumb", "ब्रेडक्रम्ब")}
          className="text-xs text-indigo-400 mb-6 flex items-center gap-2"
        >
          <Link
            href={`${langPath}/`}
            className="hover:text-indigo-200 transition-colors"
          >
            {t("Home", "होम")}
          </Link>
          <span aria-hidden="true">›</span>
          <span className="text-indigo-200">
            {t("Retrograde Planets", "वक्री ग्रह")}
          </span>
        </nav>

        {/* Hero */}
        <header className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 text-balance">
            {t(
              "Retrograde Planets in Vedic Astrology",
              "वैदिक ज्योतिष में वक्री ग्रह"
            )}
          </h1>
          <p className="text-indigo-200 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            {t(
              "Five planets in the Vedic system appear to reverse course in the sky. This apparent backward motion — called vakri in Sanskrit — has been tracked, interpreted, and integrated into Jyotisha for over two millennia. Here is the astronomy behind it, the classical Vedic interpretation, and what it means for each planet.",
              "वैदिक ग्रह मण्डल के पाँच ग्रह आकाश में गति पलटते प्रतीत हो सकते हैं। संस्कृत में इसे 'वक्री' कहते हैं — दो सहस्राब्दियों से ज्योतिष में रेखांकित और व्याख्यायित। यहाँ इसके पीछे का विज्ञान, शास्त्रीय वैदिक व्याख्या और प्रत्येक ग्रह का अर्थ है।"
            )}
          </p>
        </header>

        {/* Quick Links — Planet Guides */}
        <section id="section-quicklinks" className="max-w-3xl mx-auto mb-8" aria-labelledby="ql-heading">
          <h2
            id="ql-heading"
            className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-3"
          >
            {t("Retrograde Planet Guides", "वक्री ग्रह गाइड")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {retrogradePlanetList.map((planet) => (
              <Link
                key={planet.planetSlug}
                href={`${langPath}/${planet.routeSlug}`}
                className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-4 py-2 text-sm font-semibold text-indigo-200 hover:text-white transition-colors"
              >
                {t(planet.planet, planet.planet_hi)}
                {t(" Retrograde", " वक्री")} →
              </Link>
            ))}
          </div>
        </section>

        {/* Table of Contents */}
        <nav
          aria-label={t("Table of Contents", "विषय सूची")}
          className="max-w-3xl mx-auto mb-12 bg-white/5 border border-white/10 rounded-xl p-5"
        >
          <h2 className="text-xs font-bold text-indigo-400 uppercase tracking-widest mb-4">
            {t("On This Page", "इस पृष्ठ पर")}
          </h2>
          <ol className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5">
            {tocItems.map((item, i) => (
              <li key={item.id} className="flex gap-2 items-baseline">
                <span className="text-xs text-indigo-500 font-mono w-5 shrink-0 text-right">
                  {i + 1}.
                </span>
                <a
                  href={`#${item.id}`}
                  className="text-sm text-indigo-300 hover:text-indigo-100 hover:underline transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* What is Retrograde Motion? */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-what">
          <h2
            id="section-what"
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            {t("What is Retrograde Motion?", "वक्री गति क्या है?")}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm leading-relaxed space-y-4">
            <p>
              {t(
                "Retrograde motion describes the apparent backward movement of a planet as observed from Earth. No planet actually reverses its orbit. The effect is entirely geometrical: as Earth and another planet travel their respective paths around the Sun at different speeds, there are periods when one appears — from the other's vantage point — to be moving in reverse. The analogy is exact: a faster train overtaking a slower one makes the slower train appear to travel backward to passengers on the faster vehicle.",
                "वक्री गति पृथ्वी से देखे जाने पर किसी ग्रह की आभासी पश्चगामी गति का वर्णन करती है। कोई भी ग्रह वास्तव में अपनी कक्षा नहीं पलटता। यह प्रभाव शुद्ध ज्यामितीय है — जब पृथ्वी और कोई अन्य ग्रह विभिन्न गतियों से सूर्य की परिक्रमा करते हैं, तो ऐसे काल आते हैं जब एक दूसरे से पीछे जाता प्रतीत होता है। उपमा सटीक है: तेज़ ट्रेन जब धीमी ट्रेन को पार करती है, तो तेज़ ट्रेन के यात्रियों को धीमी ट्रेन पीछे जाती हुई दिखती है।"
              )}
            </p>
            <p>
              {t(
                "Vedic astronomers documented this phenomenon in precise astronomical tables centuries before modern planetary science. The Sanskrit term vakri — meaning curved or crooked — describes the arc a planet traces against the fixed stars during its apparent retrograde. It is a technical astronomical term, not a metaphor for danger or disruption.",
                "वैदिक खगोलविदों ने आधुनिक ग्रहीय विज्ञान से शताब्दियों पूर्व सटीक खगोलीय तालिकाओं में इस घटना को प्रलेखित किया। संस्कृत शब्द 'वक्री' — अर्थात् टेढ़ा या वक्र — उस चाप का वर्णन करता है जो एक ग्रह आभासी वक्री के दौरान स्थिर तारों के सापेक्ष बनाता है। यह एक तकनीकी खगोलीय शब्द है, खतरे या व्यवधान का रूपक नहीं।"
              )}
            </p>
            <p>
              {t(
                "Not all planets retrograde under the same conditions. Inner planets — Mercury and Venus — retrograde when they pass between Earth and the Sun (inferior conjunction). Outer planets — Mars, Jupiter, Saturn — retrograde when Earth passes between them and the Sun (opposition). The Sun and Moon never retrograde. Rahu and Ketu are always retrograde by convention.",
                "सभी ग्रह एक समान परिस्थितियों में वक्री नहीं होते। आंतरिक ग्रह — बुध और शुक्र — तब वक्री होते हैं जब वे पृथ्वी और सूर्य के बीच से गुज़रते हैं (अवर संयुति)। बाह्य ग्रह — मंगल, बृहस्पति, शनि — तब वक्री होते हैं जब पृथ्वी उनके और सूर्य के बीच से गुज़रती है (प्रतियोग)। सूर्य और चंद्रमा कभी वक्री नहीं होते। राहु और केतु परिपाटी के अनुसार सदा वक्री रहते हैं।"
              )}
            </p>
          </div>
        </section>

        {/* The Astronomy */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-astronomy">
          <h2
            id="section-astronomy"
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            {t("The Astronomy", "खगोल विज्ञान")}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm leading-relaxed space-y-4">
            <p>
              {t(
                "Retrograde frequency and duration vary by planet because orbital mechanics differ. Inner planets orbit the Sun faster than Earth: Mercury completes its orbit in 88 days, Venus in 225 days. When an inner planet overtakes Earth by passing between Earth and the Sun (inferior conjunction), the rapid change in relative geometry produces the retrograde effect. Mercury retrogrades 3–4 times per year for approximately 21 days each time. Venus retrogrades once every 18 months for approximately 40 days.",
                "वक्री आवृत्ति और अवधि ग्रह के अनुसार भिन्न होती है। आंतरिक ग्रह पृथ्वी से तेज़ गति से सूर्य की परिक्रमा करते हैं: बुध 88 दिनों में, शुक्र 225 दिनों में। जब कोई आंतरिक ग्रह पृथ्वी और सूर्य के बीच से गुज़रता है (अवर संयुति), तो सापेक्ष ज्यामिति में तीव्र बदलाव वक्री प्रभाव उत्पन्न करता है। बुध वर्ष में 3–4 बार, प्रत्येक बार ~21 दिन; शुक्र ~18 माह में एक बार, ~40 दिन।"
              )}
            </p>
            <p>
              {t(
                "Outer planets orbit the Sun more slowly than Earth. When Earth passes between an outer planet and the Sun (opposition), the change in geometry produces the apparent backward motion. Mars retrogrades once every 26 months for 60–80 days. Jupiter retrogrades once per year for about 120 days. Saturn retrogrades once per year for about 135 days. During these retrograde periods, the outer planets are at their closest approach to Earth and appear at their brightest in the night sky.",
                "बाह्य ग्रह पृथ्वी से धीमी गति से सूर्य की परिक्रमा करते हैं। जब पृथ्वी किसी बाह्य ग्रह और सूर्य के बीच से गुज़रती है (प्रतियोग), तो वक्री प्रभाव उत्पन्न होता है। मंगल ~26 माह में एक बार, 60–80 दिन; बृहस्पति वर्ष में एक बार, ~120 दिन; शनि वर्ष में एक बार, ~135 दिन। इन काल में, बाह्य ग्रह पृथ्वी के सबसे निकट होते हैं और रात्रि आकाश में सर्वाधिक चमकीले दिखते हैं।"
              )}
            </p>
            <p>
              {t(
                "Science ends here. Retrograde motion is a geometrical observation — no physical mechanism has been identified by which a planet's apparent position in the sky influences events on Earth. What follows is Jyotisha's interpretation of these cycles, which belongs to the domain of astrological correlation, not physics.",
                "विज्ञान यहीं समाप्त होता है। वक्री एक ज्यामितीय प्रेक्षण है — कोई भौतिक तंत्र नहीं है जिससे आकाश में ग्रह की आभासी स्थिति पृथ्वी पर घटनाओं को प्रभावित करे। आगे क्या है — ज्योतिष की इन चक्रों की व्याख्या — भौतिकी नहीं, ज्योतिषीय सहसंबंध का क्षेत्र है।"
              )}
            </p>
          </div>
        </section>

        {/* Vedic Interpretation */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-vedic">
          <h2
            id="section-vedic"
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            {t(
              "The Vedic Interpretation — Vakri Graha",
              "वैदिक व्याख्या — वक्री ग्रह"
            )}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm leading-relaxed space-y-4">
            <p>
              {t(
                "Vedic astrology absorbed the astronomical observation of retrograde motion and built an interpretive framework around it. The term vakri graha appears across foundational texts — Parashara's Brihat Parashara Hora Shastra, Varahamihira's Brihat Jataka, and Mantreshwara's Phaladeepika. Its treatment in those texts differs from Western popular retrograde interpretation in two fundamental ways.",
                "वैदिक ज्योतिष ने वक्री गति के खगोलीय प्रेक्षण को आत्मसात किया और उसके चारों ओर एक व्याख्यात्मक ढाँचा बनाया। 'वक्री ग्रह' शब्द मूलभूत ग्रंथों में प्रकट होता है — पराशर का बृहत् पाराशर होरा शास्त्र, वराहमिहिर की बृहत् जातक, और मंत्रेश्वर की फलदीपिका। उन ग्रंथों में इसका उपचार पाश्चात्य वक्री कथा से दो मूलभूत पहलुओं में भिन्न है।"
              )}
            </p>
            <p>
              {t(
                "First, classical Jyotisha treats retrograde planets as balavan — strong in their significations. Parashara lists vakri as a condition that increases a planet's strength. Mantreshwara adds that retrograde planets deliver their results in delayed or unconventional form. The Vedic tradition does not ask you to protect yourself from a retrograde planet's energy; it asks you to engage with it more deliberately, because its expression is concentrated and turned inward.",
                "पहला, शास्त्रीय ज्योतिष वक्री ग्रहों को बलवान — अपने कारकत्व में शक्तिशाली — मानता है। पराशर वक्री को ग्रह की शक्ति बढ़ाने वाली अवस्थाओं में सूचीबद्ध करते हैं। मंत्रेश्वर जोड़ते हैं कि वक्री ग्रह अपने परिणाम विलंब से या असामान्य रूप में देते हैं। वैदिक परंपरा आपसे वक्री ग्रह की ऊर्जा से बचने के लिए नहीं, बल्कि उसके साथ अधिक सचेत रूप से संलग्न होने के लिए कहती है।"
              )}
            </p>
            <p>
              {t(
                "Second, the impact of any retrograde transit is personal, not universal. A transit Mercury retrograde touches everyone collectively, but how it lands in a specific life depends on which house it occupies in the natal chart, which houses Mercury rules, whether a Mercury dasha period is active, and whether other planets aspect it. Two people in the same room during Mercury retrograde may have entirely different experiences — this is the basis of Vedic personal chart analysis.",
                "दूसरा, किसी भी वक्री गोचर का प्रभाव व्यक्तिगत है, सार्वभौमिक नहीं। गोचर वक्री बुध सामूहिक रूप से सभी को प्रभावित करता है, परंतु यह किसी विशेष जीवन में कैसे उतरता है यह जन्मकुंडली में उसके भाव, बुध के भाव स्वामित्व, किसी बुध दशाकाल की सक्रियता और अन्य ग्रहों की दृष्टि पर निर्भर करता है — यही वैदिक व्यक्तिगत कुंडली विश्लेषण का आधार है।"
              )}
            </p>
          </div>
        </section>

        {/* Comparison Table — Direct vs Retrograde */}
        <section className="max-w-3xl mx-auto mb-14" aria-labelledby="section-compare">
          <h2
            id="section-compare"
            className="text-xl md:text-2xl font-bold text-white mb-4"
          >
            {t(
              "Direct vs Retrograde: Key Differences",
              "मार्गी बनाम वक्री: प्रमुख अंतर"
            )}
          </h2>
          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">
              <thead className="bg-indigo-900/60">
                <tr>
                  <th className="px-4 py-3 text-indigo-200 font-bold w-1/3">
                    {t("Aspect", "पहलू")}
                  </th>
                  <th className="px-4 py-3 text-indigo-200 font-bold">
                    {t("Direct (Margi)", "मार्गी")}
                  </th>
                  <th className="px-4 py-3 text-indigo-200 font-bold">
                    {t("Retrograde (Vakri)", "वक्री")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.id} className="bg-white/5">
                    <td className="px-4 py-3 text-indigo-300 font-medium">
                      {t(row.en, row.hi)}
                    </td>
                    <td className="px-4 py-3 text-indigo-300 text-xs">
                      {t(row.direct, row.direct_hi)}
                    </td>
                    <td className="px-4 py-3 text-indigo-300 text-xs">
                      {t(row.vakri, row.vakri_hi)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Myths vs Facts — moved before Sun/Moon and Rahu/Ketu sections */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-myths">
          <h2
            id="section-myths"
            className="text-xl md:text-2xl font-bold text-white mb-4"
          >
            {t("Myths vs Facts", "भ्रांतियाँ बनाम तथ्य")}
          </h2>
          <div className="space-y-4">
            {[
              {
                myth_en: "Planets physically reverse direction when retrograde.",
                myth_hi: "वक्री काल में ग्रह वास्तव में अपनी दिशा पलटते हैं।",
                fact_en: "No planet changes its orbit. The backward motion is an illusion produced by the difference in orbital speeds between Earth and the planet. The planet continues moving in its fixed orbital path throughout.",
                fact_hi: "कोई भी ग्रह अपनी कक्षा नहीं बदलता। पश्चगामी गति पृथ्वी और उस ग्रह की कक्षीय गतियों के अंतर से उत्पन्न एक आभास है। ग्रह अपने नियत कक्षीय पथ पर चलता रहता है।",
              },
              {
                myth_en: "Retrograde planets are always weak or malefic in Vedic astrology.",
                myth_hi: "वैदिक ज्योतिष में वक्री ग्रह सदा कमज़ोर या पापी होते हैं।",
                fact_en: "Classical texts including Parashara's Brihat Parashara Hora Shastra explicitly classify retrograde planets as balavan — strong. Mantreshwara's Phaladeepika elaborates that results come in delayed or unconventional form, but strength itself is increased, not reduced.",
                fact_hi: "पराशर के बृहत् पाराशर होरा शास्त्र सहित शास्त्रीय ग्रंथ स्पष्ट रूप से वक्री ग्रहों को बलवान वर्गीकृत करते हैं। मंत्रेश्वर की फलदीपिका बताती है कि परिणाम विलंब से या असामान्य रूप में आते हैं, परंतु शक्ति बढ़ती है, घटती नहीं।",
              },
              {
                myth_en: "The Sun goes retrograde twice a year.",
                myth_hi: "सूर्य वर्ष में दो बार वक्री होता है।",
                fact_en: "The Sun never retrogrades. It is not an orbiting planet but the gravitational center of the solar system. From Earth's perspective it moves steadily eastward through the zodiac all year. No classical Vedic text treats Surya as capable of being vakri.",
                fact_hi: "सूर्य कभी वक्री नहीं होता। यह परिक्रमा करने वाला ग्रह नहीं, सौरमण्डल का गुरुत्वाकर्षण केंद्र है। पृथ्वी के दृष्टिकोण से यह वर्ष भर राशिचक्र में पूर्वमुखी चलता है। कोई भी शास्त्रीय वैदिक ग्रंथ सूर्य को वक्री-सक्षम नहीं मानता।",
              },
              {
                myth_en: "Rahu and Ketu sometimes go direct, creating special astrological events.",
                myth_hi: "राहु और केतु कभी-कभी मार्गी हो जाते हैं, जिससे विशेष ज्योतिषीय घटनाएँ होती हैं।",
                fact_en: "Vedic astrology uses mean nodes, which precess westward continuously and are always retrograde by convention. Some Western software shows true nodes, which can briefly appear direct — but that calculation is not used in classical Jyotisha and does not appear in standard Vedic chart software.",
                fact_hi: "वैदिक ज्योतिष मध्यम पात (mean nodes) का उपयोग करता है, जो निरंतर पश्चिम की ओर बढ़ते हैं और परिपाटी के अनुसार सदा वक्री हैं। कुछ पाश्चात्य सॉफ्टवेयर सत्य पात (true nodes) दिखाते हैं जो संक्षिप्त रूप से मार्गी दिख सकते हैं — परंतु यह गणना शास्त्रीय ज्योतिष में उपयोग नहीं होती।",
              },
              {
                myth_en: "Retrograde transits affect every person equally.",
                myth_hi: "वक्री गोचर सभी को समान रूप से प्रभावित करता है।",
                fact_en: "The personal impact of any retrograde transit depends on the individual natal chart — which house the transiting planet occupies, which houses it rules, the active Vimshottari dasha, and planetary aspects. A transit Mercury retrograde over someone's natal Mercury will manifest very differently from the same transit through an unrelated house.",
                fact_hi: "किसी भी वक्री गोचर का व्यक्तिगत प्रभाव जन्मकुंडली पर निर्भर करता है — गोचरी ग्रह किस भाव में है, किन भावों का स्वामी है, सक्रिय विंशोत्तरी दशा और ग्रहीय दृष्टियाँ। किसी के जन्मकालीन बुध पर वक्री बुध का गोचर उसी गोचर से एक असंबद्ध भाव में बिल्कुल भिन्न रूप में प्रकट होगा।",
              },
              {
                myth_en: "A person born during Mercury retrograde will always have communication problems.",
                myth_hi: "वक्री बुध में जन्मे व्यक्ति को हमेशा संचार समस्याएँ होती हैं।",
                fact_en: "Natal retrograde Mercury (vakri Budha) is classified as balavan by Parashara and is associated with deep, unconventional intelligence — not with permanent deficits. Many accomplished writers, scientists, and communicators are born with natal retrograde Mercury. The full picture — sign, house, aspects, and dasha sequence — determines how the planet expresses itself.",
                fact_hi: "जन्मकालीन वक्री बुध को पराशर बलवान वर्गीकृत करते हैं और यह गहरी, अपरंपरागत बुद्धि से जुड़ा है — स्थायी कमियों से नहीं। कई निपुण लेखक, वैज्ञानिक और संचारक जन्मकालीन वक्री बुध के साथ जन्मे हैं। राशि, भाव, दृष्टियाँ और दशाक्रम — यही निर्धारित करते हैं कि ग्रह कैसे अभिव्यक्त होता है।",
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl overflow-hidden border border-white/10">
                <div className="bg-rose-950/40 px-5 py-4">
                  <p className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-1">
                    {t("Myth", "भ्रांति")}
                  </p>
                  <p className="text-white text-sm font-medium">
                    {t(item.myth_en, item.myth_hi)}
                  </p>
                </div>
                <div className="bg-white/5 px-5 py-4">
                  <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
                    {t("Fact", "तथ्य")}
                  </p>
                  <p className="text-indigo-200 text-sm leading-relaxed">
                    {t(item.fact_en, item.fact_hi)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Sun & Moon Never Retrograde */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-sun-moon">
          <h2
            id="section-sun-moon"
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            {t("Why the Sun and Moon Never Retrograde", "सूर्य और चंद्रमा वक्री क्यों नहीं होते")}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm leading-relaxed space-y-4">
            <p>
              {t(
                "The Sun and Moon are the only two among the nine Vedic grahas that never turn retrograde — and the reason for each is different.",
                "सूर्य और चंद्रमा नौ वैदिक ग्रहों में वे दो हैं जो कभी वक्री नहीं होते — और प्रत्येक का कारण अलग है।"
              )}
            </p>
            <p>
              {t(
                "The Sun is not a planet in astronomical terms; it is the star at the center of the solar system. Every other planet's orbit — including Earth's — is measured in relation to the Sun. From Earth's perspective, the Sun appears to move steadily eastward through the zodiac over the course of a year as Earth completes its own orbit. Because the retrograde effect requires two orbiting bodies to compare — one appearing to fall behind the other — the Sun, as the fixed reference point for all planetary orbits, never produces the relative-orbit geometry that generates apparent backward motion.",
                "सूर्य खगोलशास्त्र में कोई ग्रह नहीं है — यह सौरमण्डल के केंद्र का तारा है। पृथ्वी सहित अन्य सभी ग्रहों की कक्षाएँ सूर्य के संदर्भ में मापी जाती हैं। पृथ्वी के दृष्टिकोण से, सूर्य वर्ष भर राशिचक्र में स्थिर पूर्वमुखी गति से चलता प्रतीत होता है। वक्री प्रभाव के लिए दो परिक्रमा करने वाले पिंडों की तुलना आवश्यक है — सूर्य, सभी ग्रहीय कक्षाओं का स्थिर संदर्भ बिंदु होने के कारण, वह सापेक्ष-कक्षा ज्यामिति कभी नहीं बनाता जो आभासी पश्चगामी गति उत्पन्न करे।"
              )}
            </p>
            <p>
              {t(
                "The Moon orbits Earth directly, not the Sun, completing a full orbit in approximately 27.3 days. The Moon moves continuously and steadily eastward through the zodiac from Earth's perspective. It is not competing with Earth in a solar orbit where either could appear to fall behind the other. In classical Jyotisha, the Moon may be waning, waxing, combust, or placed in a particular nakshatra — but vakri is simply not part of its astronomical or astrological profile.",
                "चंद्रमा सूर्य की नहीं, सीधे पृथ्वी की परिक्रमा करता है — लगभग 27.3 दिनों में एक पूर्ण कक्षा। पृथ्वी के दृष्टिकोण से चंद्रमा निरंतर और स्थिर रूप से राशिचक्र में पूर्व की ओर चलता है। यह सौर कक्षा में पृथ्वी के साथ प्रतिस्पर्धा नहीं करता। शास्त्रीय ज्योतिष में चंद्रमा घटता, बढ़ता, मार्तण्ड-सन्निधि-ग्रस्त या विशेष नक्षत्र में हो सकता है — परंतु वक्री उसके खगोलीय या ज्योतिषीय प्रोफाइल का हिस्सा ही नहीं है।"
              )}
            </p>
          </div>
        </section>

        {/* Why Rahu & Ketu Always Retrograde */}
        <section className="max-w-3xl mx-auto mb-12" aria-labelledby="section-rahu-ketu">
          <h2
            id="section-rahu-ketu"
            className="text-xl md:text-2xl font-bold text-white mb-3"
          >
            {t("Why Rahu and Ketu Are Always Retrograde", "राहु और केतु सदा वक्री क्यों रहते हैं")}
          </h2>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm leading-relaxed space-y-4">
            <p>
              {t(
                "Rahu and Ketu are not physical bodies. They are the two points where the Moon's orbital plane intersects the Earth's orbital plane around the Sun (the ecliptic). Astronomers call these the North and South Lunar Nodes. Their significance in Vedic astrology — as shadow planets (chhaya graha) — is established in classical texts, including their association with eclipses, past-life karma, and the unconventional expression of desire and liberation.",
                "राहु और केतु भौतिक पिंड नहीं हैं। ये वे दो बिंदु हैं जहाँ चंद्रमा का कक्षीय तल सूर्य के चारों ओर पृथ्वी के कक्षीय तल (क्रांतिवृत्त) को काटता है। खगोलशास्त्री इन्हें उत्तर और दक्षिण चंद्र पात कहते हैं। वैदिक ज्योतिष में उनका महत्त्व — छाया ग्रह के रूप में — शास्त्रीय ग्रंथों में सुस्थापित है, जिसमें ग्रहण, पूर्वजन्म कर्म और इच्छा-मोक्ष की अपरंपरागत अभिव्यक्ति से उनका संबंध शामिल है।"
              )}
            </p>
            <p>
              {t(
                "As the gravitational interaction between Earth, Moon, and Sun evolves over time, the line where the Moon's orbit and the ecliptic intersect slowly shifts westward — a motion called nodal precession. This precession moves steadily through the zodiac at approximately 19 degrees per year westward, completing one full cycle in about 18.6 years. Because the nodes move continuously westward — opposite to the standard eastward motion of most planets — they are always retrograde by convention.",
                "जैसे-जैसे पृथ्वी, चंद्रमा और सूर्य के बीच गुरुत्वाकर्षण परस्पर-क्रिया बदलती है, चंद्रमा की कक्षा और क्रांतिवृत्त का प्रतिच्छेदन बिंदु धीरे-धीरे पश्चिम की ओर सरकता है — इसे पात-अग्रगमन (nodal precession) कहते हैं। यह अग्रगमन राशिचक्र में प्रति वर्ष लगभग 19 अंश पश्चिम की ओर होता है, ~18.6 वर्षों में एक पूर्ण चक्र। क्योंकि पात बिंदु निरंतर पश्चिम की ओर चलते हैं — अधिकांश ग्रहों की पूर्वमुखी गति के विपरीत — वे परिपाटी के अनुसार सदा वक्री हैं।"
              )}
            </p>
            <p>
              {t(
                "Calling Rahu and Ketu retrograde is a convention — an expression of their mathematical motion — rather than an orbital phenomenon like Saturn retrograde. They have no physical mass. Classical Jyotisha fully incorporates this convention: all standard texts treat the nodes as perpetually vakri, and this characteristic is factored into every natal and transit interpretation involving them. The nodal retrograde motion also governs the 18.6-year Nodal Return cycle and determines the timing of solar and lunar eclipses.",
                "राहु-केतु को 'वक्री' कहना एक परिपाटी है — उनकी गणितीय गति की अभिव्यक्ति — न कि शनि जैसी कक्षीय घटना। उनका कोई भौतिक द्रव्यमान नहीं है। शास्त्रीय ज्योतिष इस परिपाटी को पूर्णतः सम्मिलित करता है: सभी मानक ग्रंथ राहु-केतु को सदा वक्री मानते हैं। पात बिंदुओं की वक्री गति 18.6 वर्षीय पात-चक्र और सूर्य-चंद्र ग्रहणों का समय भी निर्धारित करती है।"
              )}
            </p>
          </div>
        </section>

        {/* Planet Cards — All 9 */}
        <section className="mb-14" aria-labelledby="section-planets">
          <h2
            id="section-planets"
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
          >
            {t("All Nine Planets", "सभी नौ ग्रह")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {retrogradeHubData.planetCards.map((card) => (
              <RetrogradePlanetCard
                key={card.planetSlug}
                card={card}
                isHi={isHi}
                langPath={langPath}
              />
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-14" aria-labelledby="section-faq">
          <h2
            id="section-faq"
            className="text-2xl md:text-3xl font-bold text-white text-center mb-8"
          >
            {t(
              "Frequently Asked Questions",
              "अक्सर पूछे जाने वाले सवाल"
            )}
          </h2>
          {retrogradeHubData.faqs.length > 0 ? (
            <div className="space-y-3 max-w-3xl mx-auto">
              {retrogradeHubData.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group bg-white/5 border border-white/10 rounded-2xl p-5"
                >
                  <summary className="cursor-pointer font-bold text-white flex justify-between items-center">
                    {t(faq.q, faq.q_hi)}
                    <span className="ml-4 flex-shrink-0 text-indigo-400 group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-3 text-indigo-200 text-sm leading-relaxed">
                    {t(faq.a, faq.a_hi)}
                  </p>
                </details>
              ))}
            </div>
          ) : (
            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-xl p-6 text-indigo-300 text-sm text-center">
              {t(
                "FAQs coming soon — minimum eight questions on retrograde motion, planet status, natal vs transit, and Vedic interpretation.",
                "प्रश्नोत्तर शीघ्र आएंगे — वक्री गति, ग्रह स्थिति, जन्मकालीन बनाम गोचर और वैदिक व्याख्या पर कम से कम आठ प्रश्न।"
              )}
            </div>
          )}
        </section>

        {/* CTA Block */}
        <section id="section-cta" className="bg-indigo-700/30 border border-indigo-500/30 rounded-2xl p-6 md:p-8 text-center mb-14">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
            {t(
              "Which planets are retrograde in your birth chart?",
              "आपकी जन्म कुंडली में कौन से ग्रह वक्री हैं?"
            )}
          </h2>
          <p className="text-indigo-200 mb-5 text-sm md:text-base">
            {t(
              "Generate your free Kundali to see which planets were retrograde at the time of your birth.",
              "मुफ्त कुंडली बनाएं और जानें — जन्म के समय कौन से ग्रह वक्री थे।"
            )}
          </p>
          <Link
            href={`${langPath}/free-kundali`}
            className="inline-block bg-indigo-500 hover:bg-indigo-400 text-white font-bold px-8 py-3 rounded-full transition-all hover:scale-105"
          >
            {t("Generate Free Kundali →", "मुफ्त कुंडली बनाएं →")}
          </Link>
        </section>

        {/* Discover More — cross-cluster tools */}
        <section id="section-discover" className="mb-8">
          <h2 className="text-lg font-bold text-white mb-4">
            {t("Discover More", "और जानें")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {DISCOVER_MORE.map((item) => (
              <Link
                key={item.slug}
                href={
                  item.external
                    ? `/${item.slug}`
                    : `${langPath}/${item.slug}`
                }
                className="text-xs font-bold px-4 py-2 rounded-full bg-amber-50 text-amber-700 border border-amber-100 hover:bg-amber-100 transition-colors"
              >
                {t(item.en, item.hi)} →
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
