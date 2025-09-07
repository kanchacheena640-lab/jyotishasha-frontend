import HoroscopeTabs from "@/app/horoscope/[zodiac]/HoroscopeTabs";
import HoroscopeComparison from "@/components/HoroscopeComparison";
import { Metadata } from "next";

type PageProps = {
  params: {
    zodiac: string;
  };
};

export function generateMetadata({ params }: PageProps): Metadata {
  const zodiacName = params.zodiac.charAt(0).toUpperCase() + params.zodiac.slice(1);
  return {
    title: `${zodiacName} Horoscope | Jyotishasha`,
    description: `Get your ${zodiacName} daily, monthly, and yearly horoscope insights.`,
  };
}

export default function HoroscopeDetailPage({ params }: PageProps) {
  const { zodiac } = params;
  const zodiacName = zodiac.charAt(0).toUpperCase() + zodiac.slice(1);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center">
      {/* Hero Section */}
      <div className="flex flex-col items-center mb-10">
        <img src={`/zodiac/${zodiac}.png`} alt={zodiacName} className="w-28 h-28 mb-4" />
        <h1 className="text-4xl font-bold text-white capitalize">{zodiacName} Horoscope</h1>
      </div>

      {/* Tabs Section */}
      <HoroscopeTabs zodiacName={zodiacName} />
      <HoroscopeComparison />
    </div>
  );
}
