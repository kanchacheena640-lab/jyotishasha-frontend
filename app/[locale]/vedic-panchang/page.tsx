import PanchangHero from "@/components/panchang/PanchangHero";
import TodayPanchangSnapshot from "@/components/panchang/TodayPanchangSnapshot";
import PanchangBenefits from "@/components/panchang/PanchangBenefits";
import PanchangFiveAng from "@/components/panchang/PanchangFiveAng";
import ShubhYogaSection from "@/components/panchang/ShubhYogaSection";
import AshubhDoshSection from "@/components/panchang/AshubhDoshSection";
import MuhuratCategoriesGrid from "@/components/panchang/MuhuratCategoriesGrid";
import ImportantEvents from "@/components/panchang/ImportantEvents";
import PanchangTools from "@/components/panchang/PanchangTools";
import PanchangFaq from "@/components/panchang/PanchangFaq";
import PanchangSchema from "@/components/panchang/PanchangSchema";

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}) {
  const isHi = params.locale === "hi";

  return {
    title: isHi
      ? "वैदिक पंचांग - आज की तिथि, नक्षत्र, योग, राहु काल"
      : "Vedic Panchang - Today's Tithi, Nakshatra, Yoga & Rahu Kaal",

    description: isHi
      ? "आज की तिथि, नक्षत्र, योग, करण, राहु काल, पंचक और शुभ मुहूर्त की जानकारी प्राप्त करें।"
      : "Check today's Tithi, Nakshatra, Yoga, Karana, Rahu Kaal, Panchak and auspicious Muhurat details.",

    alternates: {
      canonical: isHi
        ? "https://www.jyotishasha.com/hi/vedic-panchang"
        : "https://www.jyotishasha.com/vedic-panchang",
    },
  };
}

interface Props {
  params: {
    locale: string;
  };
}

export default function VedicPanchangPage({
  params,
}: Props) {
  const { locale } = params;

  return (
    <main className="max-w-6xl mx-auto px-4 py-10 text-white">
      <PanchangSchema locale={locale} />

      <PanchangHero locale={locale} />

      <PanchangBenefits locale={locale} />

      <TodayPanchangSnapshot locale={locale} />

      <PanchangFiveAng locale={locale} />
      

      <ShubhYogaSection locale={locale} />

      <AshubhDoshSection locale={locale} />

      <MuhuratCategoriesGrid locale={locale} />

      <ImportantEvents locale={locale} />

      <PanchangTools locale={locale} />

      <PanchangFaq locale={locale} />

    </main>
  );
}