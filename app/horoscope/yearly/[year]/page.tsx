// ✅ Import type and function properly
import { Metadata } from "next";
import YearlySignSection from "@/components/YearlySignSection";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

// ✅ Add correct type to params
interface PageProps {
  params: { year: string };
}

// ✅ (optional) Metadata dynamic title
export function generateMetadata({ params }: PageProps): Metadata {
  return {
    title: `Yearly Horoscope ${params.year} | Jyotishasha`,
    description: `Explore detailed yearly horoscopes for all 12 zodiac signs for the year ${params.year}.`,
  };
}

export default async function YearlyHoroscopePage({ params }: PageProps) {
  const { year } = params;
  const data = await getYearlyHoroscope(year);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-10 text-center text-white">
        Yearly Horoscope {year}
      </h1>

      <div className="grid gap-10">
        {data.horoscopes.map((sign: any) => (
          <YearlySignSection key={sign.sign} signData={sign} />
        ))}
      </div>
    </div>
  );
}
