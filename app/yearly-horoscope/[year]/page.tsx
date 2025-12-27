import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

// Allowed years (future-proof)
const VALID_YEARS = ["2025", "2026", "2027"];

const ZODIACS = [
  { sign: "aries", name: "Aries", emoji: "🐏" },
  { sign: "taurus", name: "Taurus", emoji: "🐂" },
  { sign: "gemini", name: "Gemini", emoji: "👬" },
  { sign: "cancer", name: "Cancer", emoji: "🦀" },
  { sign: "leo", name: "Leo", emoji: "🦁" },
  { sign: "virgo", name: "Virgo", emoji: "👧" },
  { sign: "libra", name: "Libra", emoji: "⚖️" },
  { sign: "scorpio", name: "Scorpio", emoji: "🦂" },
  { sign: "sagittarius", name: "Sagittarius", emoji: "🏹" },
  { sign: "capricorn", name: "Capricorn", emoji: "🐐" },
  { sign: "aquarius", name: "Aquarius", emoji: "🏺" },
  { sign: "pisces", name: "Pisces", emoji: "🐟" },
];

type PageProps = {
  params: { year: string };
};

// -----------------------------
// SEO
// -----------------------------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { year } = params;

  if (!VALID_YEARS.includes(year)) return {};

  return {
    title: `Yearly Horoscope ${year} | All Zodiac Signs – Jyotishasha`,
    description: `Read detailed yearly horoscope ${year} for all 12 zodiac signs. Career, money, love, health, and long-term predictions based on Vedic astrology.`,
    alternates: {
      canonical: `/yearly-horoscope/${year}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// -----------------------------
// Page
// -----------------------------
export default function YearlyHoroscopeLanding({ params }: PageProps) {
  const { year } = params;

  if (!VALID_YEARS.includes(year)) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 text-gray-900">

      {/* HERO */}
      <section className="mb-14 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-12 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Yearly Horoscope {year}
        </h1>
        <p className="max-w-3xl text-purple-100 text-lg leading-relaxed">
          Complete yearly horoscope predictions for {year}.  
          Career growth, money trends, love life, health guidance, and long-term
          astrological insights for all 12 zodiac signs.
        </p>
      </section>

      {/* DAILY + MONTHLY QUICK LINKS */}
      <section className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Daily Horoscope</h2>
          <p className="text-gray-700 mb-4">
            Get today’s zodiac prediction based on planetary movements and Moon
            transits.
          </p>
          <Link
            href="/daily-horoscope"
            className="inline-block rounded-xl bg-purple-700 px-5 py-3 font-semibold text-white hover:bg-purple-800"
          >
            🔮 View Daily Horoscope
          </Link>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-3">Monthly Horoscope</h2>
          <p className="text-gray-700 mb-4">
            Explore month-wise predictions for career, love, money, and health.
          </p>
          <Link
            href="/monthly-horoscope"
            className="inline-block rounded-xl bg-indigo-700 px-5 py-3 font-semibold text-white hover:bg-indigo-800"
          >
            📅 View Monthly Horoscope
          </Link>
        </div>
      </section>

      {/* ZODIAC GRID */}
      <section>
        <h2 className="text-3xl font-bold mb-6">
          Choose Your Zodiac Sign for {year}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {ZODIACS.map((z) => (
            <Link
              key={z.sign}
              href={`/yearly-horoscope/${year}/${z.sign}`}
              className="
                rounded-2xl
                bg-white
                border
                shadow-sm
                p-6
                flex
                flex-col
                items-center
                hover:shadow-lg
                hover:scale-105
                transition
              "
            >
              <div className="text-4xl mb-2">{z.emoji}</div>
              <div className="text-lg font-semibold">{z.name}</div>
              <div className="mt-1 text-sm text-gray-500">
                {year} Horoscope
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SEO CONTENT */}
      <section className="mt-16 rounded-2xl bg-gray-50 p-8 leading-relaxed">
        <h2 className="text-2xl font-semibold mb-4">
          About Yearly Horoscope {year}
        </h2>
        <p>
          The yearly horoscope {year} highlights major planetary transits and
          long-term astrological themes that influence each zodiac sign. These
          predictions focus on career direction, financial stability,
          relationships, health, and personal growth.
        </p>
        <p className="mt-4">
          Select your zodiac sign above to read a detailed sign-wise yearly
          horoscope with practical guidance and Vedic astrology insights for the
          entire year.
        </p>
      </section>

    </main>
  );
}
