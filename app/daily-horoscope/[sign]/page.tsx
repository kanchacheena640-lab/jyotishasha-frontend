import { notFound } from "next/navigation";
import { zodiacData, type ZodiacSign } from "@/lib/zodiac";
import DailyHoroscopeBlock from "@/components/DailyHoroscopeBlock";

interface Props {
  params: { sign: string };
}

export default function DailyHoroscopePage({ params }: Props) {
  const sign = params.sign.toLowerCase() as ZodiacSign;

  if (!zodiacData[sign]) {
    notFound();
  }

  const data = zodiacData[sign];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* H1 – SEO */}
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      {/* Intro */}
      <p className="text-lg mb-6">{data.nature}</p>

      {/* Daily Horoscope (API se baad me inject hoga) */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Today’s Horoscope</h2>

        <DailyHoroscopeBlock sign={sign} lang="en" />
        </section>

      {/* Fixed SEO Content */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Love</h2>
          <p>{data.love}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Finance</h2>
          <p>{data.finance}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">Compatibility</h2>
          <p>{data.compatibility}</p>
        </div>

        <div>
          <h2 className="text-xl font-semibold">More About {sign}</h2>
          <p>{data.essentials}</p>
        </div>
      </section>

      {/* CTA */}
      <div className="mt-10 p-6 rounded-xl bg-purple-100 text-center">
        <h3 className="text-xl font-semibold mb-2">
          Get Personalized Horoscope Daily
        </h3>
        <p className="mb-4">
          Based on your exact birth details, dasha & transits.
        </p>
        <a
          href="/app-download"
          className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold"
        >
          Download App
        </a>
      </div>
    </div>
  );
}
