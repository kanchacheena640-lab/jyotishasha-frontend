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

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* 🔵 HERO */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-700 to-indigo-800 p-8 mb-10 text-white">
        <h1 className="text-3xl md:text-4xl font-bold leading-snug">
          {signName} Daily Horoscope – {today}
        </h1>
        <p className="mt-3 text-blue-100 text-lg">
          {signName} traits, love, finance & compatibility
        </p>
      </div>

      {/* 🔮 DAILY HOROSCOPE + CTA */}
      <section className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Horoscope */}
        <div className="md:col-span-2 bg-white rounded-2xl shadow-md p-6 text-gray-900">
          <DailyHoroscopeBlock sign={sign} lang="en" />
        </div>

        {/* CTA */}
        <div className="bg-white border border-purple-200 rounded-2xl p-6 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Your Personal Astrology App
          </h3>
          <p className="text-gray-700 text-sm mb-4">
            Personalized Horoscope • Daily Panchang •  
            Ask One Question to Our Astrologer – <b>FREE</b>
          </p>
          <a
            href="/app-download"
            className="inline-block text-center px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
          >
            Download Now
          </a>
        </div>
      </section>

      {/* 📚 FIXED SEO CONTENT */}
      <section className="bg-gray-50 rounded-2xl p-8 space-y-10 text-gray-900">
        <div>
          <h2 className="text-2xl font-semibold mb-2">{signName} Nature</h2>
          <p>{data.nature}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">{signName} Love</h2>
          <p>{data.love}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">{signName} Finance</h2>
          <p>{data.finance}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            {signName} Compatibility
          </h2>
          <p>{data.compatibility}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">
            More About {signName}
          </h2>
          <pre className="whitespace-pre-line text-gray-800">
            {data.essentials}
          </pre>
        </div>
      </section>
    </div>
  );
}
