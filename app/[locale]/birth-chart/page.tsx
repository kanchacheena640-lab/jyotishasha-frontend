// app/[locale]/birth-chart/page.tsx
import BirthChartPage from "./BirthChartPage";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/seo/articleSchema";

// 🚀 SEO STRATEGY: Dynamic Metadata for Hindi & English
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/birth-chart`;

  return {
    title: isHi
      ? "निशुल्क जन्म कुंडली | वैदिक चार्ट ऑनलाइन | ज्योतिष आशा"
      : "Free Birth Chart | Online Vedic Kundali | Jyotishasha",
    description: isHi
      ? "सटीक गणनाओं (Swiss Ephemeris) और लहिरी अयनांश के साथ अपनी विस्तृत जन्म कुंडली प्राप्त करें।"
      : "Get your detailed birth chart with accurate astronomical calculations and Lahiri Ayanamsa.",
    keywords: isHi
      ? ["जन्म कुंडली", "वैदिक ज्योतिष", "निशुल्क कुंडली", "ग्रहों की स्थिति"]
      : ["Birth Chart", "Vedic Astrology", "Free Kundali", "Planetary Positions"],
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${SITE_URL}/birth-chart`,
        hi: `${SITE_URL}/hi/birth-chart`,
        "x-default": `${SITE_URL}/birth-chart`,
      },
    },
    openGraph: {
      title: isHi ? "आपकी जन्म कुंडली" : "Your Birth Chart",
      description: isHi ? "सटीक वैदिक विश्लेषण" : "Precise Vedic Analysis",
      type: "website",
    }
  };
}

export default function Page({ params }: { params: { locale: string } }) {
  // Locale ko direct Client Component mein bhej rahe hain
  return <BirthChartPage params={params} />;
}