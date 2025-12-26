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
        <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 flex flex-col justify-center text-white">
            <h3 className="text-xl font-semibold mb-2">
                Jyotishasha Mobile App
            </h3>

            <p className="text-sm text-purple-100 mb-4 leading-relaxed">
                Personalized Horoscope • Daily Panchang •  
                Ask One Question to Our Astrologer – <span className="font-semibold">FREE</span>
            </p>

            <a
                href="/app-download"
                className="mt-2 inline-block text-center px-6 py-3 rounded-lg bg-white text-purple-700 font-semibold hover:bg-purple-100 transition"
            >
                Download Now
            </a>
            </div>
      </section>

      {/* 📚 FIXED SEO CONTENT */}
      <section className="bg-gray-50 rounded-2xl p-8 space-y-10 text-gray-900 leading-relaxed">
        <div>
            <h2 className="text-2xl font-semibold mb-3">{signName} Nature</h2>
            <p>{data.nature}</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-3">{signName} Love</h2>
            <p>{data.love}</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-3">{signName} Finance</h2>
            <p>{data.finance}</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-3">
            {signName} Compatibility
            </h2>
            <p>{data.compatibility}</p>
        </div>

        <div>
            <h2 className="text-2xl font-semibold mb-3">
            More About {signName}
            </h2>

            <p className="mb-4">
            Aries Essentials
            </p>

            <ul className="list-disc pl-6 space-y-2 text-gray-800">
            <li><b>Element:</b> Fire</li>
            <li><b>Ruling Planet:</b> Mars</li>
            <li><b>Zodiac Quality:</b> Cardinal</li>
            <li><b>Power Colors:</b> Red, Crimson, Gold</li>
            <li><b>Lucky Numbers:</b> 1, 9</li>
            <li><b>Strengths:</b> Courage, leadership, enthusiasm, initiative</li>
            <li><b>Challenges:</b> Impulsiveness, impatience, quick reactions</li>
            </ul>

            <p className="mt-4">
            {signName} season (March 21 – April 19) marks the beginning of the zodiac cycle,
            symbolizing rebirth, drive, and fearless action. {signName} natives inspire
            others by transforming ideas into reality through bold execution.
            </p>
        </div>
        </section>
    </div>
  );
}
