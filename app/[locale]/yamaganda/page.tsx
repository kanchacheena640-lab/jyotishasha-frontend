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
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/yamaganda`;

  const title = isHi
    ? "आज का यमगंड | मुहूर्त और सावधानी | ज्योतिष आशा"
    : "Yamaganda Today | Inauspicious Period & Muhurat Guide | Jyotishasha";

  const description = isHi
    ? "आज का यमगंड समय देखें। जानें यमगंड का अर्थ, यमराज से इसका संबंध, वर्जित गतिविधियाँ और राहु काल व गुलिका काल से अंतर।"
    : "Check today's Yamaganda timings. Learn about its meaning, connection to Yama, activities to avoid, and how it differs from Rahu Kaal and Gulika Kaal.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/yamaganda`,
        hi: `${SITE_URL}/hi/yamaganda`,
        "x-default": `${SITE_URL}/yamaganda`,
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

/* ---------------- Page ---------------- */
export default async function YamagandaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const lang = isHi ? "hi" : "en";
  const langPath = isHi ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/yamaganda`;

  const p = await getTodayPanchang(lang);
  const yamaganda: { start: string; end: string } | undefined = p?.yamaganda;

  /* --- Schemas --- */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isHi ? "आज का यमगंड" : "Yamaganda Today",
    description: isHi
      ? "यमगंड — हिंदू पंचांग में यमराज से जुड़ा अशुभ काल।"
      : "Yamaganda — the inauspicious period associated with Yama in the Hindu Panchang.",
    url: canonicalUrl,
    inLanguage: isHi ? "hi-IN" : "en-US",
  };

  const faqItems = isHi
    ? [
        { q: "यमगंड क्या है?", a: "यमगंड हिंदू पंचांग का एक अशुभ काल है जो यमराज (मृत्यु के देवता) से संबंधित है। इस काल में यात्रा, नई शुरुआत और शुभ कार्यों से बचना चाहिए।" },
        { q: "यमगंड का अर्थ क्या है?", a: "'यम' मृत्यु के देवता हैं और 'गंड' का अर्थ अशुभ या दोषपूर्ण है। अतः यमगंड वह काल है जिसे यमराज का प्रभाव क्षेत्र माना जाता है।" },
        { q: "यमगंड की गणना कैसे होती है?", a: "यमगंड की गणना वार (सप्ताह के दिन) और सूर्योदय-सूर्यास्त के समय पर आधारित है। दिन को आठ भागों में विभाजित किया जाता है और प्रत्येक वार के लिए एक विशेष भाग यमगंड काल होता है।" },
        { q: "यमगंड में यात्रा क्यों नहीं करनी चाहिए?", a: "पारंपरिक मान्यता है कि यमगंड में आरंभ की गई यात्रा में दुर्घटना, बाधाएं और हानि की संभावना अधिक होती है। इसलिए इस काल में यात्रा वर्जित मानी जाती है।" },
        { q: "क्या यमगंड और राहु काल एक ही हैं?", a: "नहीं। राहु काल राहु ग्रह से जुड़ा है और दिन के अलग-अलग भाग में आता है। यमगंड यमराज से संबंधित है। दोनों अलग-अलग समय पर और अलग-अलग प्रकार के अशुभ प्रभाव देते हैं।" },
        { q: "यमगंड किसने बताया?", a: "यमगंड का उल्लेख प्राचीन ज्योतिष ग्रंथों में मिलता है, विशेषतः मुहूर्त-संबंधी ग्रंथों में जैसे मुहूर्तचिंतामणि। यह काल विशेषकर दक्षिण भारतीय पंचांग परंपरा में महत्वपूर्ण है।" },
        { q: "यमगंड में कौन से कार्य कर सकते हैं?", a: "यमगंड में नियमित दैनिक कार्य, ध्यान, पूजा-पाठ और आध्यात्मिक अभ्यास किए जा सकते हैं। यह काल केवल नई शुरुआत और महत्वपूर्ण शुभ कार्यों के लिए वर्जित है।" },
        { q: "यमगंड प्रतिदिन कितनी देर रहता है?", a: "यमगंड प्रतिदिन लगभग डेढ़ घंटे (1.5 घंटे) रहता है — यह दिन के आठवें भाग के समान है।" },
        { q: "गुलिका काल और यमगंड में क्या अंतर है?", a: "गुलिका काल शनि के पुत्र मंदी से जुड़ा है और पितृ दोष एवं बाधाओं का सूचक है। यमगंड यमराज से जुड़ा है और विशेषतः यात्रा एवं नई शुरुआत के लिए अशुभ है।" },
        { q: "क्या यमगंड में वाहन खरीदना उचित है?", a: "नहीं। वाहन खरीदना और नई यात्रा शुरू करना यमगंड में वर्जित है। वाहन मुहूर्त के लिए यमगंड, राहु काल और गुलिका काल तीनों से बचना चाहिए।" },
      ]
    : [
        { q: "What is Yamaganda?", a: "Yamaganda is an inauspicious period in the Hindu Panchang associated with Yama, the god of death. Travel, new beginnings and major auspicious activities are traditionally avoided during this time." },
        { q: "What does Yamaganda mean?", a: "'Yama' is the god of death and 'Ganda' means inauspicious or defective. Yamaganda therefore refers to the period that falls under Yama's sphere of influence." },
        { q: "How is Yamaganda calculated?", a: "Yamaganda is calculated based on the day of the week (Vara) and local sunrise-sunset timings. The day is divided into eight equal parts, and a specific part is designated as Yamaganda for each weekday." },
        { q: "Why should travel be avoided during Yamaganda?", a: "Traditional belief holds that journeys begun during Yamaganda are prone to accidents, obstacles and losses. The association with Yama — the lord of death — makes this period particularly unfavorable for travel." },
        { q: "Is Yamaganda the same as Rahu Kaal?", a: "No. Rahu Kaal is associated with the shadow planet Rahu and occurs at a different time of day. Yamaganda is associated with Yama and brings different types of inauspicious influences. Both are separate periods within the daily Panchang." },
        { q: "What is the scriptural origin of Yamaganda?", a: "Yamaganda is referenced in ancient Jyotish texts including Muhurta Chintamani. It is particularly significant in the South Indian Panchang tradition." },
        { q: "What activities are permissible during Yamaganda?", a: "Regular daily activities, meditation, prayers and spiritual practices can be performed during Yamaganda. It is specifically inauspicious for new ventures, travel and major auspicious ceremonies." },
        { q: "How long does Yamaganda last each day?", a: "Yamaganda lasts approximately 1.5 hours per day — equivalent to one-eighth of the daylight period, which varies slightly across seasons." },
        { q: "What is the difference between Gulika Kaal and Yamaganda?", a: "Gulika Kaal is associated with Mandi (Saturn's son) and signifies obstacles and Pitru Dosha. Yamaganda is associated with Yama and is particularly inauspicious for travel and new beginnings. They occur at different times and carry different astrological implications." },
        { q: "Is it auspicious to buy a vehicle during Yamaganda?", a: "No. Purchasing a vehicle and beginning new journeys are specifically avoided during Yamaganda. A complete vehicle muhurat should exclude Yamaganda, Rahu Kaal and Gulika Kaal." },
      ];

  const faqSchema = buildFAQPageSchema(faqItems.map((f) => ({ q: f.q, a: f.a })));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isHi ? "होम" : "Home", url: langPath || "/" },
    { name: isHi ? "यमगंड" : "Yamaganda", url: `${langPath}/yamaganda` },
  ]);

  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="mb-12 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
          {isHi ? "यमगंड" : "Yamaganda"}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {isHi
            ? "यमगंड हिंदू पंचांग का एक महत्वपूर्ण अशुभ काल है जो यमराज — मृत्यु के देवता — से संबंधित है। प्रतिदिन आने वाला यह काल विशेष रूप से यात्रा, नई शुरुआत और शुभ समारोहों के लिए वर्जित माना जाता है। राहु काल और गुलिका काल के साथ मिलकर यमगंड पंचांग के तीन प्रमुख अशुभ कालों में से एक है।"
            : "Yamaganda is a significant inauspicious period in the Hindu Panchang associated with Yama — the god of death. Occurring every day, it is considered especially unfavorable for travel, new ventures and auspicious ceremonies. Together with Rahu Kaal and Gulika Kaal, Yamaganda forms one of the three principal inauspicious periods within the daily Panchang."}
        </p>
      </section>

      {/* ── TODAY'S YAMAGANDA ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "आज का यमगंड" : "Today's Yamaganda"}
        </h2>
        {yamaganda ? (
          <div className="rounded-xl border border-violet-500/30 bg-violet-900/15 p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {isHi ? "आज का यमगंड समय" : "Today's Yamaganda Timing"}
            </p>
            <p className="text-3xl font-bold text-violet-300">
              {yamaganda.start} – {yamaganda.end}
            </p>
            <p className="text-sm text-gray-400 mt-3">
              {isHi
                ? "इस अवधि में यात्रा, नए कार्य और शुभ समारोहों से बचें।"
                : "Avoid travel, new ventures and auspicious events during this period."}
            </p>
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
              {isHi ? "यमगंड" : "Yamaganda"}
            </p>
            <p className="text-gray-400 text-sm">
              {isHi
                ? "लाइव यमगंड समय शीघ्र उपलब्ध होगा। सटीक मुहूर्त के लिए आज का पंचांग देखें।"
                : "Live Yamaganda timings coming soon. For accurate muhurat, check Today's Panchang."}
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

      {/* ── WHAT IS YAMAGANDA ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "यमगंड को समझें" : "Understanding Yamaganda"}
        </h2>
        <div className="space-y-5 text-gray-300 leading-8">
          {isHi ? (
            <>
              <p>
                <strong className="text-white">अर्थ:</strong> संस्कृत में 'यम' मृत्यु के देवता हैं और 'गंड' का अर्थ दोष या अशुभ संकेत है। यमगंड वह काल है जिसमें यमराज का प्रभाव पृथ्वी पर अधिक माना जाता है, जिससे नए कार्य और विशेषकर यात्राएं जोखिमपूर्ण हो जाती हैं।
              </p>
              <p>
                <strong className="text-white">ज्योतिषीय महत्व:</strong> पारंपरिक ज्योतिष में यमगंड को वह काल माना जाता है जिसमें किसी भी कार्य का शुभारंभ अत्यंत अशुभ होता है। विशेष रूप से यात्रा के लिए यह काल अत्यंत वर्जित है क्योंकि यम मृत्यु, न्याय और कर्म के देवता हैं।
              </p>
              <p>
                <strong className="text-white">अशुभता का कारण:</strong> यमगंड में मृत्यु और विनाश की शक्तियों का प्रभाव बढ़ जाता है। यह काल राहु काल की भाँति अनिष्टकारी प्रभाव रखता है परंतु इसका विशेष संबंध यात्रा, लंबी परियोजनाएं और नई जिम्मेदारियों के आरंभ से है।
              </p>
              <p>
                <strong className="text-white">दक्षिण भारतीय परंपरा:</strong> यमगंड का पालन विशेष रूप से दक्षिण भारत के पंचांग परंपरा में किया जाता है, जहाँ राहु काल, यमगंड और गुलिका काल तीनों को दैनिक पंचांग में समान महत्व दिया जाता है।
              </p>
            </>
          ) : (
            <>
              <p>
                <strong className="text-white">Meaning:</strong> In Sanskrit, 'Yama' is the god of death and 'Ganda' means defect or inauspicious mark. Yamaganda is the period during which Yama's influence is believed to be heightened on earth, making new activities — especially travel — particularly risky.
              </p>
              <p>
                <strong className="text-white">Astrological significance:</strong> In classical Jyotish, Yamaganda is considered one of the most unfavorable periods for starting any new activity. Travel is especially discouraged since Yama governs death, justice and the consequences of karma.
              </p>
              <p>
                <strong className="text-white">Why it is inauspicious:</strong> During Yamaganda, the forces associated with death, endings and decay are considered elevated. While similar to Rahu Kaal in its general inauspiciousness, Yamaganda has a specific association with travel, long-term projects and taking on new responsibilities.
              </p>
              <p>
                <strong className="text-white">South Indian tradition:</strong> Yamaganda is observed particularly strongly in the South Indian Panchang tradition, where Rahu Kaal, Yamaganda and Gulika Kaal are all accorded equal importance in the daily Panchang.
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          {isHi ? "यमगंड में क्या करें और क्या न करें" : "Do's and Don'ts During Yamaganda"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Avoid */}
          <div className="bg-red-900/15 border border-red-500/25 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-300 mb-4">
              {isHi ? "✗ इस दौरान बचें" : "✗ Avoid During Yamaganda"}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {(isHi ? [
                "यात्रा आरंभ करना — विशेषकर लंबी या हवाई यात्रा",
                "नया व्यापार या परियोजना शुरू करना",
                "विवाह और शुभ समारोह",
                "वाहन खरीदना या नया वाहन चलाना",
                "महत्वपूर्ण अनुबंध और समझौते",
                "गृहप्रवेश या नई संपत्ति का उपयोग",
                "नई दवा या उपचार आरंभ करना",
              ] : [
                "Beginning a journey — especially long-distance or air travel",
                "Starting a new business or project",
                "Weddings and auspicious ceremonies",
                "Buying a vehicle or driving for the first time",
                "Signing important contracts and agreements",
                "House warming or occupying a new property",
                "Starting new medicine or medical treatment",
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-red-400 mt-0.5 flex-shrink-0">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suitable */}
          <div className="bg-green-900/15 border border-green-500/25 rounded-xl p-6">
            <h3 className="text-lg font-bold text-green-300 mb-4">
              {isHi ? "✓ इस दौरान कर सकते हैं" : "✓ Suitable During Yamaganda"}
            </h3>
            <ul className="space-y-3 text-sm text-gray-300">
              {(isHi ? [
                "ध्यान और जप साधना",
                "शास्त्र पठन और आध्यात्मिक अध्ययन",
                "दान और सेवा कार्य",
                "पितृ तर्पण और श्राद्ध अनुष्ठान",
                "नियमित दैनिक कार्य",
                "यम के उपाय और यमराज से जुड़ी पूजा",
              ] : [
                "Meditation and Japa practice",
                "Scripture reading and spiritual study",
                "Charitable giving and service",
                "Pitru Tarpan and Shraddha rituals",
                "Routine daily activities",
                "Prayers and remedies related to Yama",
              ]).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-green-400 mt-0.5 flex-shrink-0">•</span>
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
          {isHi ? "यमगंड, राहु काल और गुलिका काल" : "Yamaganda, Rahu Kaal & Gulika Kaal"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-violet-900/20 border border-violet-500/25 rounded-xl p-5">
            <h3 className="font-bold text-violet-300 mb-3">{isHi ? "यमगंड" : "Yamaganda"}</h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित देव" : "Associated With"}</dt>
                <dd>{isHi ? "यमराज (मृत्यु के देवता)" : "Yama (god of death)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रमुख निषेध" : "Primary Avoidance"}</dt>
                <dd>{isHi ? "यात्रा और नई शुरुआत" : "Travel and new beginnings"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे" : "~1.5 hours"}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-red-900/15 border border-red-500/25 rounded-xl p-5">
            <h3 className="font-bold text-red-300 mb-3">{isHi ? "राहु काल" : "Rahu Kaal"}</h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित ग्रह" : "Associated With"}</dt>
                <dd>{isHi ? "राहु (उत्तर नोड)" : "Rahu (North Node)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रमुख निषेध" : "Primary Avoidance"}</dt>
                <dd>{isHi ? "सभी शुभ कार्य" : "All auspicious activities"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे" : "~1.5 hours"}</dd>
              </div>
            </dl>
          </div>

          <div className="bg-orange-900/15 border border-orange-500/25 rounded-xl p-5">
            <h3 className="font-bold text-orange-300 mb-3">{isHi ? "गुलिका काल" : "Gulika Kaal"}</h3>
            <dl className="space-y-2 text-sm text-gray-300">
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "संबंधित ग्रह" : "Associated With"}</dt>
                <dd>{isHi ? "मंदी (शनि पुत्र)" : "Mandi (son of Saturn)"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "प्रमुख निषेध" : "Primary Avoidance"}</dt>
                <dd>{isHi ? "नए उद्यम, पितृ दोष" : "New ventures, Pitru Dosha"}</dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs">{isHi ? "अवधि" : "Duration"}</dt>
                <dd>{isHi ? "~1.5 घंटे" : "~1.5 hours"}</dd>
              </div>
            </dl>
          </div>

        </div>
        <p className="mt-4 text-sm text-gray-400">
          {isHi
            ? "तीनों अशुभ काल एक ही दिन में अलग-अलग समय पर आते हैं और कभी एक-दूसरे के साथ अतिव्यापी नहीं होते।"
            : "All three inauspicious periods occur at different times within the same day and never overlap."}
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
            { href: `${langPath}/gulika-kaal`, label: { en: "Gulika Kaal", hi: "गुलिका काल" } },
            { href: `${langPath}/choghadiya`, label: { en: "Choghadiya", hi: "चौघड़िया" } },
            { href: `${langPath}/abhijit-muhurat`, label: { en: "Abhijit Muhurat", hi: "अभिजीत मुहूर्त" } },
            { href: `${langPath}/panchak`, label: { en: "Panchak", hi: "पंचक" } },
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
