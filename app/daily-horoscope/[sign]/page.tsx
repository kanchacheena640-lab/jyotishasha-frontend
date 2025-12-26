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
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 🔵 HERO HEADER */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug">
          {sign.charAt(0).toUpperCase() + sign.slice(1)} Daily Horoscope – {today}
        </h1>
        <p className="mt-3 text-blue-100 text-lg">
          Traits, Love, Finance & Compatibility
        </p>
      </div>

      {/* 🔮 DAILY HOROSCOPE + CTA */}
      <section className="grid md:grid-cols-3 gap-6 mb-10">
        {/* Horoscope Card */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 text-gray-900">
          <h2 className="text-2xl font-semibold mb-4">
            Today’s Horoscope for {sign}
          </h2>

          <DailyHoroscopeBlock sign={sign} lang="en" />
        </div>

        {/* CTA */}
        <div className="bg-purple-50 rounded-2xl p-6 flex flex-col justify-center text-center">
          <h3 className="text-xl font-semibold mb-2">
            Get Personalized Horoscope
          </h3>
          <p className="text-gray-700 mb-4">
            Based on your exact birth details, dasha & transits.
          </p>
          <a
            href="/app-download"
            className="inline-block px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            📲 Download App
          </a>
        </div>
      </section>

      {/* 📚 FIXED SEO CONTENT */}
      <section className="bg-gray-50 rounded-2xl p-8 space-y-8 text-gray-900">
        <div>
          <h2 className="text-2xl font-semibold mb-2">Aries Nature</h2>
          <p>{data.nature}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Aries Love</h2>
          <p>{data.love}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Aries Finance</h2>
          <p>{data.finance}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            Aries Compatibility
          </h2>
          <p>{data.compatibility}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            More About Aries
          </h2>
          <p>{data.essentials}</p>
        </div>
      </section>
    </div>
  );
}
