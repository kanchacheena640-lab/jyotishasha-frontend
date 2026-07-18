import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo/articleSchema";

export const revalidate = 86400;

const TOPICS = [
  {
    href: "/planet-in-house",
    title: "Planet in House",
    title_hi: "भावों में ग्रह",
    desc: "How each of the 9 planets shapes personality, career and karma across all 12 houses of your birth chart.",
    desc_hi: "जन्म कुंडली के 12 भावों में 9 ग्रहों का व्यक्तित्व, करियर और कर्म पर विस्तृत प्रभाव।",
  },
  {
    href: "/retrograde-planets",
    title: "Retrograde Planets",
    title_hi: "वक्री ग्रह",
    desc: "What retrograde motion means in astronomy and Vedic astrology — and how natal or transit vakri affects your chart.",
    desc_hi: "वक्री ग्रह का खगोलीय और ज्योतिषीय अर्थ — जन्मकालीन और गोचर वक्री का आपकी कुंडली पर क्या असर पड़ता है।",
  },
  {
    href: "/nakshatra",
    title: "27 Nakshatras",
    title_hi: "27 नक्षत्र",
    desc: "The 27 lunar mansions of Vedic astrology — ruling planets, deities, personality traits and life themes for each birth star.",
    desc_hi: "वैदिक ज्योतिष के 27 नक्षत्र — स्वामी ग्रह, देवता, स्वभाव और जीवन के विषय।",
  },
  {
    href: "/vedic-panchang",
    title: "Vedic Panchang",
    title_hi: "वैदिक पंचांग",
    desc: "The five limbs of Vedic timekeeping — Tithi, Vara, Nakshatra, Yoga and Karana — and why they matter for muhurat.",
    desc_hi: "वैदिक पंचांग के पाँच अंग — तिथि, वार, नक्षत्र, योग और करण — और मुहूर्त के लिए उनका महत्व।",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const langPath = isHi ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}/learn-astrology`;

  const title = isHi
    ? "ज्योतिष सीखें — वैदिक ज्योतिष की संपूर्ण गाइड | ज्योतिष आशा"
    : "Learn Vedic Astrology — Planets, Houses, Nakshatras & Panchang Guide | Jyotishasha";
  const description = isHi
    ? "भावों में ग्रह, वक्री ग्रह, 27 नक्षत्र और वैदिक पंचांग — वैदिक ज्योतिष की संपूर्ण गाइड एक ही जगह।"
    : "Explore planets in houses, retrograde planets, 27 Nakshatras and Vedic Panchang — your complete Vedic astrology learning hub.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/learn-astrology`,
        hi: `${SITE_URL}/hi/learn-astrology`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      siteName: "Jyotishasha",
    },
  };
}

export default function LearnAstrologyPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale = params.locale === "hi" ? "hi" : "en";
  const isHi = locale === "hi";
  const t = (en: string, hi: string) => (isHi ? hi : en);

  return (
    <main className="min-h-screen bg-[#0b1120] text-white pt-12">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">

        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          {t("Learn Vedic Astrology", "ज्योतिष सीखें")}
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          {t(
            "Deep-dive guides on planets in houses, retrograde effects, the 27 Nakshatras, and the Vedic Panchang — all in one place.",
            "भावों में ग्रह, वक्री प्रभाव, 27 नक्षत्र और वैदिक पंचांग — हमारी संपूर्ण वैदिक ज्योतिष गाइड पढ़ें।"
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {TOPICS.map((topic) => (
            <Link
              key={topic.href}
              href={`/${locale}${topic.href}`}
              className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-purple-900/50 rounded-2xl p-6 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {t(topic.title, topic.title_hi)}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t(topic.desc, topic.desc_hi)}
              </p>
              <span className="text-purple-400 text-sm font-medium">
                {t("Explore", "देखें")} →
              </span>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
