import { notFound } from "next/navigation";
import type { Metadata } from "next";

/**
 * CONFIG
 * -----------------------------------
 * Backend API should return:
 * {
 *   title,
 *   theme,
 *   career_money,
 *   love_relationships,
 *   health_lifestyle,
 *   key_dates: string[],
 *   monthly_advice,
 *   cta
 * }
 */
const API_BASE = process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.jyotishasha.com";

const VALID_SIGNS = [
  "aries", "taurus", "gemini", "cancer",
  "leo", "virgo", "libra", "scorpio",
  "sagittarius", "capricorn", "aquarius", "pisces"
];

type PageProps = {
  params: { sign: string };
};

// -----------------------------
// SEO (Evergreen)
// -----------------------------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const sign = params.sign.toLowerCase();

  if (!VALID_SIGNS.includes(sign)) {
    return {};
  }

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return {
    title: `${signName} Monthly Horoscope | Jyotishasha`,
    description: `Read the monthly horoscope for ${signName}. Career, love, health, money and practical guidance based on Vedic astrology.`,
    alternates: {
      canonical: `/monthly-horoscope/${sign}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// -----------------------------
// Data Fetch
// -----------------------------
async function getMonthlyHoroscope(sign: string) {
  const res = await fetch(
    `${API_BASE}/api/monthly-horoscope?sign=${sign}`,
    {
      // monthly data → safe to cache
      next: { revalidate: 60 * 60 * 6 }, // 6 hours
    }
  );

  if (!res.ok) return null;
  return res.json();
}

// -----------------------------
// Page
// -----------------------------
export default async function MonthlyHoroscopePage({ params }: PageProps) {
  const sign = params.sign.toLowerCase();

  if (!VALID_SIGNS.includes(sign)) {
    notFound();
  }

  const data = await getMonthlyHoroscope(sign);

  if (!data) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-gray-900">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-purple-800">
        {data.title}
        </h1>

        {/* Card Wrapper */}
        <div className="space-y-6">

        {/* Theme */}
        <section className="rounded-2xl bg-white shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">
            Monthly Theme
            </h2>
            <p className="leading-relaxed text-gray-800">
            {data.theme}
            </p>
        </section>

        {/* Career & Money */}
        <section className="rounded-2xl bg-white shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">
            Career & Money
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.career_money}
            </p>
        </section>

        {/* Love */}
        <section className="rounded-2xl bg-white shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">
            Love & Relationships
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.love_relationships}
            </p>
        </section>

        {/* Health */}
        <section className="rounded-2xl bg-white shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">
            Health & Lifestyle
            </h2>
            <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.health_lifestyle}
            </p>
        </section>

        {/* Key Dates */}
        {data.key_dates?.length > 0 && (
            <section className="rounded-2xl bg-purple-50 border border-purple-200 p-6">
            <h2 className="text-xl font-semibold text-purple-800 mb-3">
                Important Dates
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
                {data.key_dates.map((d: string, i: number) => (
                <li key={i}>{d}</li>
                ))}
            </ul>
            </section>
        )}

        {/* Advice */}
        <section className="rounded-2xl bg-yellow-50 border border-yellow-200 p-6">
            <h2 className="text-xl font-semibold text-yellow-800 mb-3">
            Monthly Advice
            </h2>
            <p className="text-gray-900 font-medium">
            {data.monthly_advice}
            </p>
        </section>

        {/* STRONG CTA BLOCK */}
        <section className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-white">
            <p className="text-lg font-semibold mb-4">
            {data.cta}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
            <a
                href="/daily-horoscope"
                className="rounded-xl bg-white/20 px-4 py-2 text-center font-semibold hover:bg-white/30"
            >
                🔮 Read Daily Horoscope
            </a>

            <a
                href="/yearly-horoscope"
                className="rounded-xl bg-white/20 px-4 py-2 text-center font-semibold hover:bg-white/30"
            >
                📅 View Yearly Horoscope
            </a>

            <a
                href="/app"
                className="rounded-xl bg-yellow-400 text-purple-900 px-4 py-2 text-center font-bold hover:bg-yellow-300"
            >
                📱 Get Jyotishasha App
            </a>
            </div>
        </section>
        </div>
    </main>
    );

}
