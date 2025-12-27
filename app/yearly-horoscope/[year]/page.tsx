import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

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

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { year } = params;

  if (!VALID_YEARS.includes(year)) return {};

  return {
    title: `Yearly Horoscope ${year} | Jyotishasha`,
    description: `Read detailed yearly horoscope ${year} for all 12 zodiac signs.`,
    alternates: { canonical: `/yearly-horoscope/${year}` },
    robots: { index: true, follow: true },
  };
}

export default function YearlyHoroscopeLanding({ params }: PageProps) {
  const { year } = params;

  if (!VALID_YEARS.includes(year)) notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">

      <section className="mb-12 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-12 text-white">
        <h1 className="text-4xl font-extrabold mb-4">
          Yearly Horoscope {year}
        </h1>
        <p className="text-purple-100 text-lg">
          Complete yearly horoscope predictions for all zodiac signs.
        </p>
      </section>

      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {ZODIACS.map((z) => (
          <Link
            key={z.sign}
            href={`/yearly-horoscope/${year}/${z.sign}`}
            className="rounded-2xl bg-white border p-6 text-center shadow-sm hover:shadow-lg"
          >
            <div className="text-4xl mb-2">{z.emoji}</div>
            <div className="font-semibold">{z.name}</div>
          </Link>
        ))}
      </section>

    </main>
  );
}
