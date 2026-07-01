import { format } from "date-fns";
import type { Metadata } from "next";
import Link from "next/link";
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  buildFAQPageSchema,
  buildBreadcrumbSchema,
} from "@/lib/seo/articleSchema";

export const revalidate = 3600;

type PageProps = { params: { locale: string } };

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

/* ---------------- Data Fetch ---------------- */
async function getTodayPanchang(lang: "en" | "hi") {
  const today = format(new Date(), "yyyy-MM-dd");

  const res = await fetch(`${BACKEND_URL}/api/panchang`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      date: today,
      latitude: 26.8467,
      longitude: 80.9462,
      language: lang,
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  const data = await res.json();
  return data.selected_date;
}

/* ---------------- Metadata ---------------- */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/gulika-kaal`;

  const title = isHi
    ? "आज का गुलिका काल | मुहूर्त और सावधानी | ज्योतिष आशा"
    : "Gulika Kaal Today | Inauspicious Period & Muhurat Guide | Jyotishasha";

  const description = isHi
    ? "आज का गुलिका काल समय देखें। जानें गुलिका काल का अर्थ, शनि पुत्र मंदी से इसका संबंध, वर्जित गतिविधियाँ और राहु काल व यमगंड से अंतर।"
    : "Check today's Gulika Kaal timings. Learn about its meaning, connection to Saturn's son Mandi, activities to avoid, and how it compares to Rahu Kaal and Yamaganda.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/gulika-kaal`,
        hi: `${SITE_URL}/hi/gulika-kaal`,
        "x-default": `${SITE_URL}/gulika-kaal`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}

/* ---------------- Page ---------------- */
export default async function GulikaKaalPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const langPath = isHi ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/gulika-kaal`;

  const p = await getTodayPanchang(lang);
  const gulikaKaal: { start: string; end: string } | undefined = p?.gulika_kaal;

  /* --- Schemas --- */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isHi ? "आज का गुलिका काल" : "Gulika Kaal Today",
    description: isHi
      ? "गुलिका काल — हिंदू पंचांग में शनि पुत्र मंदी से जुड़ा अशुभ काल।"
      : "Gulika Kaal — the inauspicious period associated with Saturn's son Mandi in the Hindu Panchang.",
    url: canonicalUrl,
    inLanguage: isHi ? "hi-IN" : "en-US",
  };

  const faqItems = isHi
    ? [
        { q: "गुलिका काल क्या है?", a: "गुलिका काल हिंदू पंचांग का एक अशुभ काल है जो शनि पुत्र मंदी (गुलिका) से जुड़ा होता है। इस काल में नए और शुभ कार्य आरंभ करने से बचना चाहिए।" },
        { q: "गुलिका काल की उत्पत्ति क्या है?", a: "गुलिका काल का उल्लेख प्राचीन ज्योतिष ग्रंथों में मिलता है। 'गुलिका' शनि का पुत्र या उप-ग्रह (मंदी) माना जाता है, जो पितृ दोष और अशुभ परिणामों का कारक है।" },
        { q: "गुलिका काल की गणना कैसे होती है?", a: "गुलिका काल की गणना वार (सप्ताह के दिन) और सूर्योदय-सूर्यास्त के आधार पर होती है। दिन को आठ समान भागों में विभाजित किया जाता है और प्रत्येक वार के लिए एक निश्चित भाग गुलिका काल होता है।" },
        { q: "गुलिका काल में कौन से कार्य नहीं करने चाहिए?", a: "गुलिका काल में नया व्यापार, विवाह, गृहप्रवेश, यात्रा आरंभ, अनुबंध हस्ताक्षर, दवा लेना और अन्य महत्वपूर्ण शुभ कार्य नहीं करने चाहिए।" },
        { q: "क्या गुलिका काल और राहु काल एक ही हैं?", a: "नहीं, गुलिका काल और राहु काल अलग-अलग अशुभ काल हैं। राहु काल राहु (उत्तर नोड) से जुड़ा है, जबकि गुलिका काल शनि के उप-ग्रह मंदी से। दोनों एक दिन में अलग-अलग समय पर आते हैं।" },
        { q: "मंदी (गुलिका) क्या है?", a: "मंदी शनि का पुत्र या उप-बिंदु माना जाता है जो जन्म कुंडली में पितृ दोष, बाधाएं और अशुभ फल देता है। कुंडली में इसकी स्थिति जीवन की चुनौतियों का संकेत देती है।" },
        { q: "यमगंड क्या है?", a: "यमगंड भी एक अशुभ काल है जो यमराज (मृत्यु के देवता) से जुड़ा है। यह यात्रा और नई शुरुआत के लिए विशेष रूप से वर्जित माना जाता है।" },
        { q: "गुलिका काल प्रतिदिन आता है क्या?", a: "हाँ, गुलिका काल प्रतिदिन आता है। इसकी अवधि और समय वार के अनुसार बदलता है, परंतु प्रत्येक दिन यह काल अवश्य होता है।" },
        { q: "गुलिका काल की अवधि कितनी होती है?", a: "गुलिका काल की अवधि लगभग डेढ़ घंटे (1.5 घंटे) होती है। यह दिन के आठवें भाग के बराबर है।" },
        { q: "क्या गुलिका काल में कोई कार्य शुभ है?", a: "गुलिका काल में शनि से संबंधित उपाय, पितृ तर्पण, ध्यान, जप और आध्यात्मिक साधना अनुकूल मानी जाती हैं।" },
      ]
    : [
        { q: "What is Gulika Kaal?", a: "Gulika Kaal is an inauspicious period in the Hindu Panchang associated with Mandi, the son of Saturn (Shani). It is a period during which starting new or auspicious activities is traditionally avoided." },
        { q: "What is the origin of Gulika Kaal?", a: "Gulika Kaal is referenced in ancient Jyotish texts. 'Gulika' (also called Mandi) is considered a sub-planet or the son of Saturn, associated with obstacles, ancestral debts (Pitru Dosha) and inauspicious outcomes." },
        { q: "How is Gulika Kaal calculated?", a: "Gulika Kaal is calculated based on the day of the week (Vara) and local sunrise-sunset timings. The day is divided into eight equal parts, and a specific part is assigned as Gulika Kaal for each weekday." },
        { q: "What activities should be avoided during Gulika Kaal?", a: "Starting a new business, weddings, house warming, beginning a journey, signing contracts, taking new medicines and other major auspicious activities should be avoided during Gulika Kaal." },
        { q: "Is Gulika Kaal the same as Rahu Kaal?", a: "No, Gulika Kaal and Rahu Kaal are separate inauspicious periods. Rahu Kaal is associated with the shadow planet Rahu (North Node), while Gulika Kaal is associated with Mandi, a sub-point of Saturn. They occur at different times on the same day." },
        { q: "What is Mandi (Gulika) in astrology?", a: "Mandi is considered the son or sub-point of Saturn in Jyotish. Its placement in a birth chart indicates ancestral debts (Pitru Dosha), obstacles and challenging karmic influences that need to be addressed." },
        { q: "What is Yamaganda?", a: "Yamaganda is another inauspicious period associated with Yama, the god of death. It is considered especially inauspicious for travel, new ventures and any activity related to new beginnings." },
        { q: "Does Gulika Kaal occur every day?", a: "Yes, Gulika Kaal occurs every single day. Its timing and specific window change depending on the day of the week, but it is always present within the daily Panchang." },
        { q: "How long does Gulika Kaal last?", a: "Gulika Kaal lasts approximately 1.5 hours per day — equivalent to one-eighth of the daylight duration, which varies slightly across seasons." },
        { q: "Are any activities auspicious during Gulika Kaal?", a: "Saturn-related remedies, Pitru Tarpan (ancestral rites), meditation, Japa and other spiritual practices are considered suitable and even beneficial during Gulika Kaal." },
      ];

  const faqSchema = buildFAQPageSchema(faqItems.map((f) => ({ q: f.q, a: f.a })));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isHi ? "होम" : "Home", url: langPath || "/" },
    { name: isHi ? "गुलिका काल" : "Gulika Kaal", url: `${langPath}/gulika-kaal` },
  ]);

  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="mb-12 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
          {isHi ? "गुलिका काल" : "Gulika Kaal"}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {isHi
            ? "गुलिका काल हिंदू पंचांग का एक विशेष अशुभ काल है जो शनि के पुत्र मंदी (गुलिका) से संबंधित है। प्रतिदिन आने वाला यह काल नए और शुभ कार्यों के लिए वर्जित माना जाता है। राहु काल और यमगंड की तरह, गुलिका काल भी एक महत्वपूर्ण पंचांग तत्व है जो मुहूर्त निर्धारण में अहम भूमिका निभाता है।"
            : "Gulika Kaal is a significant inauspicious period in the Hindu Panchang, linked to Mandi — the son of Saturn (Shani). Occurring daily, it is traditionally considered unfavorable for starting new or auspicious activities. Like Rahu Kaal and Yamaganda, Gulika Kaal is an important Panchang element that plays a crucial role in muhurat selection."}
        </p>
      </section>

      {/* ── TODAY'S GULIKA KAAL ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "आज का गुलिका काल" : "Today's Gulika Kaal"}
        </h2>
        {gulikaKaal ? (
          <div className="rounded-xl border border-orange-500/30 bg-orange-900/15 p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {isHi ? "आज का गुलिका काल समय" : "Today's Gulika Kaal Timing"}
            </p>
            <p className="text-3xl font-bold text-orange-300">
              {gulikaKaal.start} – {gulikaKaal.end}
            </p>
            <p className="text-sm text-gray-400 mt-3">
              {isHi
                ? "इस अवधि में शुभ कार्य, नई शुरुआत और महत्वपूर्ण निर्णयों से बचें।"
                : "Avoid auspicious events, new beginnings and important decisions during this period."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {isHi ? "गुलिका काल" : "Gulika Kaal"}
            </p>
            <p className="text-gray-400 text-sm">
              {isHi
                ? "लाइव गुलिका काल समय शीघ्र उपलब्ध होगा। सटीक मुहूर्त के लिए आज का पंचांग देखें।"
                : "Live Gulika Kaal timings coming soon. For accurate muhurat, check Today's Panchang."}
            </p>
            <Link
              href={`${langPath}/today-panchang`}
              className="inline-block mt-3 text-sm text-purple-300 hover:underline"
            >
              {isHi ? "आज का पंचांग देखें →" : "View Today's Panchang →"}
            </Link>
          </div>
        )}
      </section>

      {/* ── GULIKA KAAL EXPLAINED ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "गुलिका काल को समझें" : "Gulika Kaal Explained"}
        </h2>
        <div className="space-y-5 text-gray-300 leading-8">
          {isHi ? (
            <>
              <p>
                <strong className="text-white">अर्थ:</strong> 'गुलिका' शनि के पुत्र मंदी का दूसरा नाम है। ज्योतिष में मंदी को एक उप-ग्रह (काल्पनिक बिंदु) माना जाता है जो पितृ दोष, कर्मिक बाधाएं और अशुभ परिणामों का सूचक है।
              </p>
              <p>
                <strong className="text-white">उत्पत्ति:</strong> गुलिका काल का उल्लेख प्राचीन ज्योतिष ग्रंथों — विशेषकर <em>बृहत्पाराशरहोराशास्त्र</em> और <em>मुहूर्तचिंतामणि</em> में मिलता है। यह काल दक्षिण भारतीय पंचांग परंपरा में विशेष महत्व रखता है।
              </p>
              <p>
                <strong className="text-white">शनि से संबंध:</strong> मंदी/गुलिका शनि का प्रतिनिधित्व करता है। शनि जहाँ कर्म, अनुशासन और दीर्घकालिक परिणामों का कारक है, वहीं मंदी उसके नकारात्मक पक्ष — देरी, बाधाएं और पितृ ऋण — को दर्शाता है।
              </p>
              <p>
                <strong className="text-white">महत्व:</strong> गुलिका काल में आरंभ किए गए कार्यों में बाधाएं, विफलता और अनावश्यक जटिलताएं आने की संभावना मानी जाती है। यही कारण है कि परंपरागत मुहूर्त चयन में गुलिका काल को टाला जाता है।
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-white">Meaning:</strong> 'Gulika' is the alternate name of Mandi — the son of Saturn in Jyotish. Mandi is considered a sub-planet or sensitive mathematical point that indicates ancestral debts (Pitru Dosha), karmic obstacles and inauspicious influences.
              </p>
              <p>
                <strong className="text-white">Origin:</strong> Gulika Kaal is referenced in ancient Jyotish texts including the <em>Brihat Parashara Hora Shastra</em> and <em>Muhurta Chintamani</em>. It holds particular importance in South Indian Panchang tradition.
              </p>
              <p>
                <strong className="text-white">Relation with Saturn:</strong> Mandi/Gulika represents Saturn's influence. While Saturn governs karma, discipline and long-term outcomes, Mandi reflects its shadow side — delays, obstacles and unresolved ancestral karma.
              </p>
              <p>
                <strong className="text-white">Why it matters:</strong> Activities started during Gulika Kaal are traditionally believed to encounter obstacles, complications and delays. This is why classical muhurat selection systematically excludes this period.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── GOOD & BAD ACTIVITIES ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          {isHi ? "गुलिका काल में क्या करें और क्या न करें" : "Do's and Don'ts During Gulika Kaal"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Suitable */}
          <div className="bg-green-900/15 border border-green-500/25 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-300 mb-4">
              {isHi ? "✓ इस दौरान कर सकते हैं" : "✓ Suitable During Gulika Kaal"}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {(isHi ? [
                "शनि से संबंधित उपाय और जप",
                "पितृ तर्पण और श्राद्ध अनुष्ठान",
                "ध्यान और आत्मचिंतन",
                "आध्यात्मिक अध्ययन और ग्रंथ पाठ",
                "दान और सेवा कार्य",
              ] : [
                "Saturn-related remedies and Japa",
                "Pitru Tarpan and Shraddha rituals",
                "Meditation and self-reflection",
                "Spiritual study and scripture reading",
                "Charitable activities and service",
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Avoid */}
          <div className="bg-red-900/15 border border-red-500/25 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-300 mb-4">
              {isHi ? "✗ इस दौरान बचें" : "✗ Avoid During Gulika Kaal"}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {(isHi ? [
                "नया व्यापार या उद्यम आरंभ करना",
                "विवाह और गृह प्रवेश समारोह",
                "यात्रा की शुरुआत",
                "अनुबंध और समझौते पर हस्ताक्षर",
                "नई दवा या उपचार आरंभ करना",
                "बड़ी खरीदारी या निवेश",
              ] : [
                "Starting a new business or venture",
                "Weddings and house warming ceremonies",
                "Beginning a journey",
                "Signing contracts and agreements",
                "Starting new medicine or treatment",
                "Major purchases or investments",
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          {isHi ? "गुलिका काल, राहु काल और यमगंड" : "Gulika Kaal, Rahu Kaal & Yamaganda"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* Gulika Kaal */}
          <div className="bg-orange-900/15 border border-orange-500/25 rounded-xl p-5">
            <h3 className="font-bold text-orange-300 mb-3">
              {isHi ? "गुलिका काल" : "Gulika Kaal"}
            </h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित ग्रह" : "Associated With"}</dt>
                <dd>{isHi ? "मंदी (शनि पुत्र)" : "Mandi (son of Saturn)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रभाव" : "Effect"}</dt>
                <dd>{isHi ? "बाधाएं, पितृ दोष, देरी" : "Obstacles, Pitru Dosha, delays"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे (दिन का 1/8वाँ भाग)" : "~1.5 hours (1/8th of daylight)"}</dd>
              </div>
            </dl>
          </div>

          {/* Rahu Kaal */}
          <div className="bg-red-900/15 border border-red-500/25 rounded-xl p-5">
            <h3 className="font-bold text-red-300 mb-3">
              {isHi ? "राहु काल" : "Rahu Kaal"}
            </h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित ग्रह" : "Associated With"}</dt>
                <dd>{isHi ? "राहु (उत्तर नोड)" : "Rahu (North Node)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रभाव" : "Effect"}</dt>
                <dd>{isHi ? "अशुभ, भ्रम, अचानक नुकसान" : "Inauspicious, confusion, sudden loss"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे (दिन का 1/8वाँ भाग)" : "~1.5 hours (1/8th of daylight)"}</dd>
              </div>
            </dl>
          </div>

          {/* Yamaganda */}
          <div className="bg-purple-900/20 border border-purple-500/25 rounded-xl p-5">
            <h3 className="font-bold text-purple-300 mb-3">
              {isHi ? "यमगंड" : "Yamaganda"}
            </h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित देव" : "Associated With"}</dt>
                <dd>{isHi ? "यमराज (मृत्यु के देव)" : "Yama (god of death)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रभाव" : "Effect"}</dt>
                <dd>{isHi ? "यात्रा और नई शुरुआत के लिए विशेष रूप से अशुभ" : "Especially inauspicious for travel and new beginnings"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे (दिन का 1/8वाँ भाग)" : "~1.5 hours (1/8th of daylight)"}</dd>
              </div>
            </dl>
          </div>

        </div>
        <p className="mt-4 text-sm text-gray-400">
          {isHi
            ? "तीनों अशुभ काल एक ही दिन में अलग-अलग समय पर आते हैं और किसी भी दिन एक दूसरे के साथ अतिव्यापी नहीं होते।"
            : "All three inauspicious periods occur at different times on the same day and never overlap with each other."}
        </p>
      </section>

      {/* ── FAQ ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
        </h2>
        <div className="space-y-4">
          {faqItems.map((faq, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
              <h3 className="font-semibold text-white mb-2">{faq.q}</h3>
              <p className="text-sm text-gray-300 leading-7">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RELATED PAGES ── */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "संबंधित पृष्ठ" : "Related Pages"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { href: `${langPath}/today-panchang`, label: { en: "Today's Panchang", hi: "आज का पंचांग" } },
            { href: `${langPath}/rahu-kaal`, label: { en: "Rahu Kaal", hi: "राहु काल" } },
            { href: `${langPath}/choghadiya`, label: { en: "Choghadiya", hi: "चौघड़िया" } },
            { href: `${langPath}/abhijit-muhurat`, label: { en: "Abhijit Muhurat", hi: "अभिजीत मुहूर्त" } },
            { href: `${langPath}/panchak`, label: { en: "Panchak", hi: "पंचक" } },
            { href: `${langPath}/bhadra`, label: { en: "Bhadra (Vishti Karana)", hi: "भद्रा (विष्टि करण)" } },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-purple-300 hover:bg-white/10 hover:border-purple-500/40 transition-all font-medium"
            >
              {isHi ? link.label.hi : link.label.en}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
