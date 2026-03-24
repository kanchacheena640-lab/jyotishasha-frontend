// app/[locale]/panchang/[date]/page.tsx

import PanchangClient from "./PanchangClient";
import { format } from "date-fns";

/* ---------------- LANGUAGE ---------------- */
function getLang(locale?: string) {
  return locale === "hi" ? "hi" : "en";
}

export const revalidate = 3600;

/* ---------------- METADATA (SEO Optimized) ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { date: string; locale?: string };
}) {
  const { date, locale } = params;
  const lang = getLang(locale);

  // Convert to dd-MM-yyyy for display
  let displayDate = date;
  try {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      displayDate = format(parsed, "dd-MM-yyyy");
    }
  } catch {}

  return {
    title:
      lang === "hi"
        ? `${displayDate} का पंचांग | तिथि, नक्षत्र, योग, राहु काल | ज्‍योतिष आशा`
        : `Panchang for ${displayDate} | Tithi, Nakshatra, Yoga, Rahu Kaal | Jyotishasha`,

    description:
      lang === "hi"
        ? `${displayDate} का सम्पूर्ण हिन्दू पंचांग - सूर्योदय, सूर्यास्त, तिथि, नक्षत्र, योग, करण, राहु काल, अभिजीत मुहूर्त और चौघड़िया सहित। लाहिड़ी अयनांश पर आधारित।`
        : `Complete Hindu Panchang for ${displayDate} with Tithi, Nakshatra, Yoga, Karan, Sunrise, Sunset, Rahu Kaal, Abhijit Muhurta and Chaughadiya. Based on Lahiri Ayanamsa.`,

    alternates: {
      canonical:
        lang === "hi"
          ? `https://www.jyotishasha.com/hi/panchang/${date}`
          : `https://www.jyotishasha.com/panchang/${date}`,
      languages: {
        "en-US": `/panchang/${date}`,
        "hi-IN": `/hi/panchang/${date}`,
      },
    },
    openGraph: {
      title: lang === "hi" ? `${displayDate} का पंचांग` : `Panchang for ${displayDate}`,
      description: lang === "hi"
        ? `${displayDate} का दैनिक पंचांग देखें`
        : `Daily Hindu Panchang for ${displayDate}`,
      url: lang === "hi" ? `/hi/panchang/${date}` : `/panchang/${date}`,
      siteName: "Jyotishasha",
    },
  };
}

/* ---------------- SERVER PAGE (Industry Standard) ---------------- */
export default function PanchangPage({
  params,
}: {
  params: { date: string; locale?: string };
}) {
  const { date, locale } = params;
  const lang = getLang(locale);

  // Convert date to dd-MM-yyyy for display
  let displayDate = date;
  try {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      displayDate = format(parsed, "dd-MM-yyyy");
    }
  } catch {}

  const isHindi = lang === "hi";

  return (
    <section className="max-w-5xl mx-auto px-4 py-10">
      {/* H1 - SEO Friendly */}
      <h1 className="text-3xl md:text-4xl font-semibold text-center mb-6">
        {isHindi ? `${displayDate} का पंचांग` : `Hindu Panchang for ${displayDate}`}
      </h1>

      {/* Intro Content */}
      <div className="prose prose-gray dark:prose-invert max-w-none text-center mb-10">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {isHindi
            ? `${displayDate} का सम्पूर्ण वैदिक पंचांग लाहिड़ी अयनांश के आधार पर। इसमें तिथि, नक्षत्र, योग, करण, सूर्योदय, सूर्यास्त, राहु काल, अभिजीत मुहूर्त और चौघड़िया शामिल हैं।`
            : `Complete Vedic Panchang for ${displayDate} based on Lahiri Ayanamsa. Includes Tithi, Nakshatra, Yoga, Karan, Sunrise, Sunset, Rahu Kaal, Abhijit Muhurta and Chaughadiya.`}
        </p>
      </div>

      {/* Client Component */}
      <PanchangClient params={params} />

      {/* FAQ Section - SEO Gold */}
      <div className="mt-20 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          {isHindi ? "अक्सर पूछे जाने वाले सवाल" : "Frequently Asked Questions"}
        </h2>

        <div className="space-y-8">
          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "पंचांग क्या होता है?" : "What is Panchang?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "पंचांग हिन्दू ज्योतिष का दैनिक कैलेंडर है जिसमें तिथि, नक्षत्र, योग, करण, वार, सूर्योदय-सूर्यास्त, राहु काल आदि की जानकारी होती है।"
                : "Panchang is the daily Hindu almanac that shows Tithi, Nakshatra, Yoga, Karan, weekday, sunrise-sunset, Rahu Kaal and other astrological timings."}
            </p>
          </details>

          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "राहु काल क्यों महत्वपूर्ण है?" : "Why is Rahu Kaal important?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "राहु काल को अशुभ माना जाता है। इस समय किसी भी शुभ कार्य जैसे विवाह, गृह प्रवेश, नया काम शुरू करना वर्जित है।"
                : "Rahu Kaal is considered inauspicious. It is advised to avoid starting any important or auspicious work during this period."}
            </p>
          </details>

          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "अभिजीत मुहूर्त क्या है?" : "What is Abhijit Muhurta?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "अभिजीत मुहूर्त दिन का सबसे शुभ समय होता है। इस दौरान कोई भी शुभ कार्य शुरू करना अत्यंत फलदायी माना जाता है।"
                : "Abhijit Muhurta is the most auspicious time of the day. Any important work started during this period is considered highly beneficial."}
            </p>
          </details>

          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "यह पंचांग किस अयनांश पर आधारित है?" : "Which Ayanamsa is used?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "यह पंचांग लाहिड़ी अयनांश (Lahiri Ayanamsa) पर आधारित है, जो भारत सरकार द्वारा मान्यता प्राप्त है।"
                : "This Panchang is calculated using Lahiri Ayanamsa, which is the most widely accepted and government-recognized in India."}
            </p>
          </details>

          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "चौघड़िया कैसे पढ़ें?" : "How to read Chaughadiya?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "हरे रंग/ग्रीन डॉट = शुभ समय, लाल रंग/रेड डॉट = अशुभ समय। शुभ चौघड़िया में महत्वपूर्ण कार्य शुरू करें।"
                : "Green dot = Auspicious time, Red dot = Inauspicious time. Start important work during Shubh Chaughadiya."}
            </p>
          </details>

          <details className="group">
            <summary className="text-lg font-medium cursor-pointer list-none flex justify-between items-center">
              {isHindi ? "क्या मैं किसी भी शहर का पंचांग देख सकता हूँ?" : "Can I see Panchang for any city?"}
              <span className="text-xl group-open:rotate-180 transition">↓</span>
            </summary>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {isHindi
                ? "हाँ, सर्च बार में अपना शहर चुनें। पंचांग आपके चुने हुए स्थान के अक्षांश-देशांतर के अनुसार अपडेट हो जाएगा।"
                : "Yes, you can select any city from the search bar. The Panchang will update according to the latitude and longitude of the selected place."}
            </p>
          </details>
        </div>
      </div>

      {/* JSON-LD Schema (Article + FAQPage) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: isHindi
              ? `${displayDate} का पंचांग`
              : `Hindu Panchang for ${displayDate}`,
            datePublished: date,
            author: {
              "@type": "Organization",
              name: "Jyotishasha",
            },
            publisher: {
              "@type": "Organization",
              name: "Jyotishasha",
              logo: {
                "@type": "ImageObject",
                url: "https://www.jyotishasha.com/logo.png",
              },
            },
            description: isHindi
              ? `${displayDate} का सम्पूर्ण हिन्दू पंचांग`
              : `Complete Hindu Panchang for ${displayDate}`,
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": isHindi
                ? `https://www.jyotishasha.com/hi/panchang/${date}`
                : `https://www.jyotishasha.com/panchang/${date}`,
            },
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: isHindi ? "पंचांग क्या होता है?" : "What is Panchang?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: isHindi
                    ? "पंचांग हिन्दू ज्योतिष का दैनिक कैलेंडर है जिसमें तिथि, नक्षत्र, योग आदि की जानकारी होती है।"
                    : "Panchang is the daily Hindu almanac containing Tithi, Nakshatra, Yoga and other astrological details.",
                },
              },
              // You can add more FAQ items here if needed
            ],
          }),
        }}
      />
    </section>
  );
}