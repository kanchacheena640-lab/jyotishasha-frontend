import Link from "next/link";
import Image from "next/image";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


const YEAR = "2026";

const ZODIACS = [
  { sign: "aries", name: "Aries", img: "/zodiac/aries.png" },
  { sign: "taurus", name: "Taurus", img: "/zodiac/taurus.png" },
  { sign: "gemini", name: "Gemini", img: "/zodiac/gemini.png" },
  { sign: "cancer", name: "Cancer", img: "/zodiac/cancer.png" },
  { sign: "leo", name: "Leo", img: "/zodiac/leo.png" },
  { sign: "virgo", name: "Virgo", img: "/zodiac/virgo.png" },
  { sign: "libra", name: "Libra", img: "/zodiac/libra.png" },
  { sign: "scorpio", name: "Scorpio", img: "/zodiac/scorpio.png" },
  { sign: "sagittarius", name: "Sagittarius", img: "/zodiac/sagittarius.png" },
  { sign: "capricorn", name: "Capricorn", img: "/zodiac/capricorn.png" },
  { sign: "aquarius", name: "Aquarius", img: "/zodiac/aquarius.png" },
  { sign: "pisces", name: "Pisces", img: "/zodiac/pisces.png" },
];

const DEFAULT_SIGN = ZODIACS[0].sign; // dynamic-safe default

export const metadata = {
  title: "Yearly Horoscope 2026 | Jyotishasha",
  description:
    "Read 2026 yearly horoscope for all zodiac signs. Career, love, finance and health predictions based on Vedic astrology.",
};

export default function YearlyHoroscopePage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      {/* HERO */}
      <section className="mb-12 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-12 text-white">
        <h1 className="text-4xl font-extrabold mb-4">
          Yearly Horoscope {YEAR}
        </h1>
        <p className="text-purple-100 text-lg">
          Select your zodiac sign to read detailed yearly horoscope for {YEAR}.
        </p>
      </section>

      {/* ZODIAC GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ZODIACS.map((z) => (
          <Link
            key={z.sign}
            href={`/yearly-horoscope/${z.sign}`}
            className="rounded-2xl bg-white border p-6 text-center shadow-sm hover:shadow-lg hover:scale-105 transition"
          >
            <Image
              src={z.img}
              alt={z.name}
              width={64}
              height={64}
              className="mx-auto mb-3"
            />
            <div className="font-bold text-gray-900">{z.name}</div>
            <div className="text-sm text-gray-500">
              {YEAR} Horoscope
            </div>
          </Link>
        ))}
      </div>
      
      {/* CTA SECTION (AFTER RASHI TABS) */}
      <section className="mt-14 grid gap-6 md:grid-cols-3">

        {/* DAILY CTA */}
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Daily Horoscope
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get today’s horoscope with love, finance and planetary guidance.
          </p>
          <Link
            href={`/daily-horoscope/${DEFAULT_SIGN}`}
            className="rounded-xl border border-purple-300 px-4 py-2 font-semibold text-gray-900 hover:bg-purple-50 transition"
          >
            🔮 Read Daily Horoscope
          </Link>
        </div>

        {/* MONTHLY CTA */}
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Monthly Horoscope
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            See how this month shapes your career, love and health.
          </p>
          <Link
            href={`/monthly-horoscope/${DEFAULT_SIGN}`}
            className="rounded-xl border border-indigo-300 px-4 py-2 font-semibold text-gray-900 hover:bg-indigo-50 transition"
          >
            📅 View Monthly Horoscope
          </Link>
        </div>

        {/* APP CTA */}
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Jyotishasha App
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Personalized horoscope, Panchang & Ask One Question — free.
          </p>
          <Link
            href="/app"
            className="rounded-xl border border-yellow-300 px-4 py-2 font-semibold text-gray-900 hover:bg-yellow-50 transition"
          >
            📱 Download App
          </Link>
        </div>

      </section>
    </main>
  );
}
