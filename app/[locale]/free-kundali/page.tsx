import type { Metadata } from "next";
import FreeKundaliClient from "./FreeKundaliClient";
import { DEFAULT_OG_IMAGE, SITE_URL } from "@/lib/seo/articleSchema";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isHi = locale === "hi";

  const title = isHi
    ? "मुफ्त कुंडली - अपनी वैदिक जन्म कुंडली बनाएं | ज्योतिष आशा"
    : "Free Kundali - Generate Your Vedic Birth Chart | Jyotishasha";
  const description = isHi
    ? "तुरंत अपनी मुफ्त वैदिक कुंडली बनाएं। ग्रह स्थिति, भाव और भविष्यवाणी के साथ विस्तृत जन्म चार्ट।"
    : "Generate your free Vedic kundali instantly. Get detailed birth chart with planetary positions, houses and predictions.";
  const canonicalUrl = `${SITE_URL}${isHi ? "/hi" : ""}/free-kundali`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Jyotishasha",
      images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: title }],
    },
  };
}

export default async function FreeKundaliPage({ params }: { params: any }) {
  const { locale } = await params;
  const isHi = locale === 'hi';

  return (
    <section className="min-h-screen py-12 px-4 text-white bg-[#0b1120]">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-300 mb-4">
          {isHi ? "🪐 फ्री ऑनलाइन जन्म कुंडली" : "🪐 Free Janma Kundali Online"}
        </h1>
        <p className="text-gray-200 leading-relaxed">
          {isHi 
            ? "अपने सटीक जन्म विवरण के साथ अपनी विस्तृत वैदिक कुंडली प्राप्त करें। इसमें ग्रहों की स्थिति, योग और जीवन के अंतर्दृष्टि शामिल हैं।"
            : "Generate your accurate Vedic Birth Chart (Janma Kundali). This free report reveals planetary positions, houses, and life insights based on authentic Vedic astrology."}
        </p>
      </div>

      {/* Client Side Tool */}
      <FreeKundaliClient />
    </section>
  );
}