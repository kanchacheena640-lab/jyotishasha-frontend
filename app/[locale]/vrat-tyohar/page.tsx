import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/seo/articleSchema";

export const revalidate = 86400;

const CURRENT_YEAR = new Date().getFullYear();

const FESTIVALS = [
  {
    href: "/ekadashi",
    title: "Ekadashi",
    title_hi: "एकादशी",
    desc: "The sacred 11th lunar day observed twice each month — dates, fasting rules and the spiritual significance of Ekadashi vrat.",
    desc_hi: "प्रत्येक माह में दो बार मनाई जाने वाली पवित्र एकादशी — तिथि, व्रत नियम और आध्यात्मिक महत्व।",
  },
  {
    href: "/navratri",
    title: "Navratri",
    title_hi: "नवरात्रि",
    desc: "Nine nights of Devi worship — Chaitra and Sharada Navratri dates, daily rituals, Devi mantras and Kanya Puja.",
    desc_hi: "नौ दिन की देवी उपासना — चैत्र और शारदीय नवरात्रि तिथि, पूजा विधि और देवी मंत्र।",
  },
  {
    href: `/holi/${CURRENT_YEAR}`,
    title: "Holi",
    title_hi: "होली",
    desc: "The festival of colours — Holika Dahan date, Rangwali Holi significance, rituals and the Holi calendar.",
    desc_hi: "रंगों का त्योहार — होलिका दहन तिथि, रंगवाली होली का महत्व, पूजा विधि और होली कैलेंडर।",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const langPath = isHi ? "/hi" : "";
  const canonicalUrl = `${SITE_URL}${langPath}/vrat-tyohar`;

  const title = isHi
    ? "व्रत और त्योहार — एकादशी, नवरात्रि, होली | ज्योतिष आशा"
    : "Hindu Vrat & Tyohar — Ekadashi, Navratri & Holi Festival Guide | Jyotishasha";
  const description = isHi
    ? "एकादशी, नवरात्रि और होली सहित प्रमुख हिंदू व्रत और त्योहारों की संपूर्ण जानकारी — तिथि, पूजा विधि और महत्व।"
    : "Complete guide to Hindu vrats and festivals — Ekadashi, Navratri and Holi with dates, puja vidhi and spiritual significance.";

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/vrat-tyohar`,
        hi: `${SITE_URL}/hi/vrat-tyohar`,
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

export default function VratTyoharPage({
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
          {t("Hindu Vrat & Tyohar", "व्रत और त्योहार")}
        </h1>
        <p className="text-gray-400 text-lg mb-10 max-w-2xl">
          {t(
            "Dates, fasting rules, rituals and significance for major Hindu sacred days and festivals.",
            "प्रमुख हिंदू व्रत और त्योहारों की तिथि, व्रत नियम, पूजा विधि और आध्यात्मिक महत्व।"
          )}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FESTIVALS.map((festival) => (
            <Link
              key={festival.href}
              href={`/${locale}${festival.href}`}
              className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] border border-purple-900/50 rounded-2xl p-6 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300"
            >
              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {t(festival.title, festival.title_hi)}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {t(festival.desc, festival.desc_hi)}
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
