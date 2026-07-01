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

/* ---------------- Current Ayana (date-based approximation) ---------------- */
function getCurrentAyana(): "uttarayana" | "dakshinayana" {
  const now = new Date();
  const m = now.getMonth() + 1;
  const d = now.getDate();
  // Uttarayana: Makar Sankranti (~Jan 14) through Karka Sankranti (~Jul 16)
  if (m === 1 && d < 14) return "dakshinayana";
  if (m >= 2 && m <= 6) return "uttarayana";
  if (m === 7 && d < 16) return "uttarayana";
  return "dakshinayana";
}

/* ---------------- Metadata ---------------- */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/ayana`;

  const title = isHi
    ? "अयन | उत्तरायण और दक्षिणायन | ज्योतिष आशा"
    : "Ayana | Uttarayana & Dakshinayana | Jyotishasha";

  const description = isHi
    ? "हिंदू पंचांग में अयन का अर्थ, उत्तरायण और दक्षिणायन का महत्व, मकर संक्रांति, कर्क संक्रांति और वैदिक ज्योतिष में अयन की भूमिका जानें।"
    : "Understand Ayana in the Hindu Panchang — Uttarayana and Dakshinayana, their spiritual significance, connection to Makar Sankranti, Hindu months and Vedic astrology.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/ayana`,
        hi: `${SITE_URL}/hi/ayana`,
        "x-default": `${SITE_URL}/ayana`,
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
export default function AyanaPage({ params }: PageProps) {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/ayana`;
  const langPath = isHi ? "/hi" : "";

  const currentAyana = getCurrentAyana();

  /* --- Schemas --- */
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isHi ? "अयन | उत्तरायण और दक्षिणायन" : "Ayana | Uttarayana & Dakshinayana",
    description: isHi
      ? "हिंदू पंचांग में अयन — उत्तरायण और दक्षिणायन का विस्तृत विवरण।"
      : "Ayana in the Hindu Panchang — a detailed guide to Uttarayana and Dakshinayana.",
    url: canonicalUrl,
    inLanguage: isHi ? "hi-IN" : "en-US",
  };

  const faqItems = isHi
    ? [
        { q: "अयन क्या है?", a: "अयन सूर्य की उत्तर या दक्षिण दिशा में गति को कहते हैं। हिंदू पंचांग में एक वर्ष दो अयनों में विभाजित होता है — उत्तरायण और दक्षिणायन।" },
        { q: "उत्तरायण क्या है?", a: "उत्तरायण वह काल है जब सूर्य मकर राशि में प्रवेश करता है और उत्तर दिशा की ओर गति करता है। यह मकर संक्रांति (14 जनवरी के आसपास) से आरंभ होकर कर्क संक्रांति (16 जुलाई के आसपास) तक रहता है।" },
        { q: "दक्षिणायन क्या है?", a: "दक्षिणायन वह काल है जब सूर्य कर्क राशि में प्रवेश करता है और दक्षिण दिशा की ओर गति करता है। यह कर्क संक्रांति से आरंभ होकर मकर संक्रांति तक रहता है।" },
        { q: "मकर संक्रांति का अयन से क्या संबंध है?", a: "मकर संक्रांति वह दिन है जब सूर्य मकर राशि में प्रवेश करता है। यह उत्तरायण की शुरुआत का प्रतीक है और हिंदू पंचांग में अत्यंत शुभ माना जाता है।" },
        { q: "कर्क संक्रांति क्या है?", a: "कर्क संक्रांति वह दिन है जब सूर्य कर्क राशि में प्रवेश करता है — लगभग 16 जुलाई। यह दक्षिणायन की शुरुआत का प्रतीक है।" },
        { q: "उत्तरायण को शुभ क्यों माना जाता है?", a: "वेदों और पुराणों के अनुसार उत्तरायण देवताओं का दिन है। इस काल में धार्मिक अनुष्ठान, दान, तीर्थयात्रा और शुभ कार्य अत्यधिक पुण्यदायी माने जाते हैं।" },
        { q: "एक अयन में कितने हिंदू महीने होते हैं?", a: "प्रत्येक अयन में 6 हिंदू चंद्र महीने होते हैं। उत्तरायण में माघ से आषाढ़ तक और दक्षिणायन में श्रावण से पौष तक के महीने आते हैं।" },
        { q: "अयन और ऋतु में क्या संबंध है?", a: "छह ऋतुएं (वसंत, ग्रीष्म, वर्षा, शरद, हेमंत, शिशिर) अयन काल से जुड़ी हैं। प्रत्येक अयन में तीन ऋतुएं आती हैं।" },
        { q: "क्या दक्षिणायन में विवाह शुभ है?", a: "पारंपरिक रूप से दक्षिणायन में चातुर्मास के कारण विवाह, गृहप्रवेश जैसे शुभ संस्कार सीमित होते हैं। हालांकि देवोत्थान एकादशी (कार्तिक शुक्ल) के बाद से यह प्रतिबंध उठ जाता है।" },
        { q: "भीष्म पितामह और उत्तरायण का क्या संबंध है?", a: "महाभारत के अनुसार भीष्म पितामह ने उत्तरायण की प्रतीक्षा में शर-शैय्या पर प्राण धारण किए थे। उन्होंने उत्तरायण में देह त्याग की क्योंकि यह मोक्ष प्राप्ति के लिए सर्वश्रेष्ठ काल माना जाता है।" },
      ]
    : [
        { q: "What is Ayana?", a: "Ayana refers to the apparent northward or southward movement of the Sun during the year. The Hindu calendar divides the year into two Ayanas — Uttarayana (northward) and Dakshinayana (southward)." },
        { q: "What is Uttarayana?", a: "Uttarayana is the period when the Sun enters Capricorn (Makar Rashi) and moves northward. It begins on Makar Sankranti (around January 14) and lasts until Karka Sankranti (around July 16)." },
        { q: "What is Dakshinayana?", a: "Dakshinayana is the period when the Sun enters Cancer (Karka Rashi) and moves southward. It begins on Karka Sankranti (around July 16) and continues until the next Makar Sankranti." },
        { q: "What is the connection between Makar Sankranti and Ayana?", a: "Makar Sankranti is the day the Sun enters Capricorn, marking the beginning of Uttarayana. It is one of the most auspicious days in the Hindu calendar and is celebrated with holy baths, charity and traditional festivities." },
        { q: "What is Karka Sankranti?", a: "Karka Sankranti is the day the Sun enters Cancer, around July 16, marking the beginning of Dakshinayana — the Sun's southward journey." },
        { q: "Why is Uttarayana considered auspicious?", a: "According to the Vedas and Puranas, Uttarayana is the 'day of the gods'. Religious rites, charity, pilgrimage and major life ceremonies are considered especially meritorious during this period." },
        { q: "How many Hindu months are in each Ayana?", a: "Each Ayana contains 6 Hindu lunar months. Uttarayana spans Magha through Ashadha; Dakshinayana spans Shravana through Pausha." },
        { q: "How does Ayana relate to the Ritus (seasons)?", a: "The six Hindu seasons (Vasanta, Grishma, Varsha, Sharad, Hemanta, Shishira) align with the two Ayanas — three Ritus fall within each Ayana period." },
        { q: "Are weddings auspicious during Dakshinayana?", a: "Traditionally, Dakshinayana includes Chaturmas during which weddings and other major auspicious ceremonies are deferred. After Devutthana Ekadashi in Kartika, the restrictions are lifted even within Dakshinayana." },
        { q: "What is the story of Bhishma and Uttarayana?", a: "According to the Mahabharata, Bhishma Pitamah chose to wait on his arrow-bed and did not die until Uttarayana began. He believed that dying during Uttarayana grants liberation (moksha), making it the most sacred time for the soul to depart." },
      ];

  const faqSchema = buildFAQPageSchema(faqItems.map((f) => ({ q: f.q, a: f.a })));

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: isHi ? "होम" : "Home", url: langPath || "/" },
    { name: isHi ? "अयन" : "Ayana", url: `${langPath}/ayana` },
  ]);

  return (
    <main className="container mx-auto px-4 py-8 lg:px-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* ── HERO ── */}
      <section className="mb-12 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
          {isHi ? "अयन" : "Ayana"}
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">
          {isHi
            ? "अयन हिंदू पंचांग का वह महत्वपूर्ण काल-विभाजन है जो सूर्य की उत्तर या दक्षिण दिशा में गति पर आधारित है। प्रत्येक वर्ष दो अयनों में विभाजित होता है — उत्तरायण और दक्षिणायन। ये दो काल मिलकर धार्मिक, आध्यात्मिक और कृषि जीवन का आधार बनते हैं।"
            : "Ayana is the key time-division of the Hindu Panchang based on the Sun's apparent northward or southward movement. Each year is divided into two Ayanas — Uttarayana and Dakshinayana — forming the foundation of religious, spiritual and agricultural life in Hindu tradition."}
        </p>
      </section>

      {/* ── TODAY'S AYANA ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "वर्तमान अयन (अनुमानित)" : "Current Ayana (Approximate)"}
        </h2>
        <div className={`rounded-xl border p-6 text-center ${
          currentAyana === "uttarayana"
            ? "bg-amber-900/20 border-amber-500/30"
            : "bg-indigo-900/20 border-indigo-500/30"
        }`}>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            {isHi ? "सूर्य की वर्तमान दिशा" : "Current Solar Direction"}
          </p>
          <p className={`text-3xl font-bold mb-2 ${
            currentAyana === "uttarayana" ? "text-amber-300" : "text-indigo-300"
          }`}>
            {currentAyana === "uttarayana"
              ? isHi ? "उत्तरायण" : "Uttarayana"
              : isHi ? "दक्षिणायन" : "Dakshinayana"}
          </p>
          <p className="text-sm text-gray-400">
            {currentAyana === "uttarayana"
              ? isHi ? "सूर्य उत्तर की ओर गतिमान है (मकर संक्रांति से कर्क संक्रांति तक)" : "Sun is moving northward (Makar Sankranti to Karka Sankranti)"
              : isHi ? "सूर्य दक्षिण की ओर गतिमान है (कर्क संक्रांति से मकर संक्रांति तक)" : "Sun is moving southward (Karka Sankranti to Makar Sankranti)"}
          </p>
          <p className="text-xs text-gray-500 mt-3">
            {isHi ? "* यह सौर पंचांग पर आधारित अनुमानित गणना है।" : "* This is an approximate calculation based on the solar calendar."}
          </p>
        </div>
      </section>

      {/* ── TWO AYANAS ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-6">
          {isHi ? "दो अयन" : "The Two Ayanas"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Uttarayana */}
          <div className="bg-amber-900/15 border border-amber-500/25 rounded-xl p-6">
            <h3 className="text-xl font-bold text-amber-300 mb-3">
              {isHi ? "उत्तरायण" : "Uttarayana"}
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "अर्थ" : "Meaning"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "उत्तर (उत्तर) + अयन (गति) — सूर्य की उत्तर दिशा में यात्रा" : "Uttara (north) + Ayana (journey) — the Sun's northward journey"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "अवधि" : "Duration"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "मकर संक्रांति (~14 जनवरी) से कर्क संक्रांति (~16 जुलाई) तक — लगभग 6 मास" : "Makar Sankranti (~Jan 14) to Karka Sankranti (~Jul 16) — approximately 6 months"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "महत्व" : "Significance"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "देवताओं का दिन; दान, पुण्य और शुभ कार्यों के लिए सर्वश्रेष्ठ काल। भीष्म ने इसी काल में देह त्याग किया था।" : "Known as the 'day of the gods'; the most auspicious period for charity, religious rites and major life events. Bhishma chose to die during this period for moksha."}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "महीने" : "Months"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "माघ, फाल्गुन, चैत्र, वैशाख, ज्येष्ठ, आषाढ़" : "Magha, Phalguna, Chaitra, Vaishakha, Jyeshtha, Ashadha"}
                </dd>
              </div>
            </dl>
          </div>

          {/* Dakshinayana */}
          <div className="bg-indigo-900/15 border border-indigo-500/25 rounded-xl p-6">
            <h3 className="text-xl font-bold text-indigo-300 mb-3">
              {isHi ? "दक्षिणायन" : "Dakshinayana"}
            </h3>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "अर्थ" : "Meaning"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "दक्षिण (दक्षिण) + अयन (गति) — सूर्य की दक्षिण दिशा में यात्रा" : "Dakshina (south) + Ayana (journey) — the Sun's southward journey"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "अवधि" : "Duration"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "कर्क संक्रांति (~16 जुलाई) से मकर संक्रांति (~14 जनवरी) तक — लगभग 6 मास" : "Karka Sankranti (~Jul 16) to Makar Sankranti (~Jan 14) — approximately 6 months"}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "महत्व" : "Significance"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "पितरों (पूर्वजों) का काल; वर्षा ऋतु, फसल और आध्यात्मिक अंतर्दृष्टि से जुड़ा। चातुर्मास इसी काल में पड़ता है।" : "The period of the ancestors (Pitras); associated with monsoon, harvest and spiritual introspection. Chaturmas falls within this period."}
                </dd>
              </div>
              <div>
                <dt className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                  {isHi ? "महीने" : "Months"}
                </dt>
                <dd className="text-gray-200">
                  {isHi ? "श्रावण, भाद्रपद, आश्विन, कार्तिक, मार्गशीर्ष, पौष" : "Shravana, Bhadrapada, Ashwin, Kartika, Margashirsha, Pausha"}
                </dd>
              </div>
            </dl>
          </div>

        </div>
      </section>

      {/* ── AYANA IN PANCHANG ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "पंचांग में अयन का स्थान" : "Ayana in the Panchang"}
        </h2>
        <div className="space-y-5 text-gray-300 leading-8">
          {isHi ? (
            <>
              <p>
                हिंदू पंचांग के पाँच अंगों — तिथि, वार, नक्षत्र, योग और करण — में अयन का विशेष स्थान है। यद्यपि अयन पंचांग के पाँच मूल अंगों में से एक नहीं है, फिर भी यह पंचांग के समग्र ढाँचे का अभिन्न हिस्सा है।
              </p>
              <p>
                <strong className="text-white">ऋतु से संबंध:</strong> प्रत्येक अयन में तीन ऋतुएँ आती हैं। उत्तरायण में वसंत, ग्रीष्म और वर्षा की शुरुआत; दक्षिणायन में वर्षा, शरद, हेमंत और शिशिर की ऋतुएँ।
              </p>
              <p>
                <strong className="text-white">हिंदू महीनों से संबंध:</strong> 12 हिंदू चंद्र महीने दोनों अयनों में समान रूप से बँटे हैं — प्रत्येक अयन में 6 महीने।
              </p>
              <p>
                <strong className="text-white">संक्रांति से संबंध:</strong> अयन का परिवर्तन दो प्रमुख संक्रांतियों पर होता है —{" "}
                <Link href={`${langPath}/today-panchang`} className="text-purple-300 hover:underline">मकर संक्रांति</Link>{" "}
                (उत्तरायण आरंभ) और{" "}
                <Link href={`${langPath}/today-panchang`} className="text-purple-300 hover:underline">कर्क संक्रांति</Link>{" "}
                (दक्षिणायन आरंभ)।
              </p>
            </>
          ) : (
            <>
              <p>
                Ayana holds a pivotal role in the Panchang framework. While it is not one of the five primary Panchang elements (Tithi, Vara, Nakshatra, Yoga, Karana), it provides the broader temporal context within which all daily Panchang calculations are understood.
              </p>
              <p>
                <strong className="text-white">Connection to Ritu:</strong> Three seasons (Ritus) fall within each Ayana. Uttarayana encompasses Vasanta, Grishma and the onset of Varsha; Dakshinayana encompasses Varsha, Sharad, Hemanta and Shishira.
              </p>
              <p>
                <strong className="text-white">Connection to Hindu Months:</strong> The 12 Hindu lunar months are evenly divided between the two Ayanas — 6 months in each.
              </p>
              <p>
                <strong className="text-white">Connection to Sankranti:</strong> The transition between Ayanas occurs on two key solar events —{" "}
                <Link href={`${langPath}/today-panchang`} className="text-purple-300 hover:underline">Makar Sankranti</Link>{" "}
                (start of Uttarayana) and{" "}
                <Link href={`${langPath}/today-panchang`} className="text-purple-300 hover:underline">Karka Sankranti</Link>{" "}
                (start of Dakshinayana).
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── RELIGIOUS & SPIRITUAL IMPORTANCE ── */}
      <section className="mb-12 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-purple-300 mb-4">
          {isHi ? "धार्मिक और आध्यात्मिक महत्व" : "Religious & Spiritual Importance"}
        </h2>
        <div className="space-y-5 text-gray-300 leading-8">
          {isHi ? (
            <>
              <p>
                वेदों के अनुसार उत्तरायण को <em>देवयान</em> (देवताओं का मार्ग) और दक्षिणायन को <em>पितृयान</em> (पूर्वजों का मार्ग) कहा गया है। भगवद्गीता (8.24–8.25) में श्री कृष्ण ने उत्तरायण में देहत्याग करने वाले को मुक्ति की प्राप्ति और दक्षिणायन में देहत्याग करने वाले को पुनर्जन्म की संभावना बताई है।
              </p>
              <p>
                मकर संक्रांति के दिन गंगासागर, प्रयागराज और अन्य पवित्र तीर्थों पर करोड़ों भक्त स्नान करते हैं। कुंभ मेला भी उत्तरायण काल में आयोजित होता है।
              </p>
              <p>
                दक्षिणायन में चातुर्मास का विशेष महत्व है। इस काल में साधु-संत एक स्थान पर रुककर अध्ययन और साधना करते हैं। विवाह और गृहप्रवेश जैसे संस्कार इस काल में सीमित होते हैं।
              </p>
            </>
          ) : (
            <>
              <p>
                According to the Vedas, Uttarayana is called <em>Devayana</em> (the path of the gods) and Dakshinayana is called <em>Pitruyana</em> (the path of the ancestors). In the Bhagavad Gita (8.24–8.25), Lord Krishna describes that those who depart during Uttarayana reach liberation, while those who depart during Dakshinayana may be subject to rebirth.
              </p>
              <p>
                On Makar Sankranti, millions of devotees take holy baths at Ganga Sagar, Prayagraj and other sacred rivers. The Kumbh Mela is also held during the Uttarayana period.
              </p>
              <p>
                Dakshinayana includes Chaturmas — the four sacred months during which wandering monks settle in one place for study and spiritual practice. Major auspicious ceremonies like weddings are traditionally limited during this period.
              </p>
            </>
          )}
        </div>
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
            {
              href: `${langPath}/hindu-months`,
              label: { en: "Hindu Calendar Months", hi: "हिंदू कैलेंडर के महीने" },
            },
            {
              href: `${langPath}/today-panchang`,
              label: { en: "Today's Panchang", hi: "आज का पंचांग" },
            },
            {
              href: `${langPath}/paksha`,
              label: { en: "Paksha (Lunar Phase)", hi: "पक्ष" },
            },
            {
              href: `${langPath}/nakshatra`,
              label: { en: "Nakshatras", hi: "नक्षत्र" },
            },
            {
              href: `${langPath}/karana`,
              label: { en: "Karana", hi: "करण" },
            },
            {
              href: `${langPath}/yoga`,
              label: { en: "Yoga", hi: "योग" },
            },
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
