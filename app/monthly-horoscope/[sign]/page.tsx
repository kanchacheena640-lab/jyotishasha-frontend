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
const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL || "https://api.jyotishasha.com";

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

  if (!VALID_SIGNS.includes(sign)) return {};

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

  if (!VALID_SIGNS.includes(sign)) notFound();

  const data = await getMonthlyHoroscope(sign);
  if (!data) notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-10 text-gray-900">

      {/* Title */}
      <div className="mb-8 rounded-2xl bg-gradient-to-r from-purple-800 to-indigo-800 px-6 py-6">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
            {data.title}
        </h1>
        </div>

      <div className="space-y-6">

        {/* Monthly Theme */}
        <section className="rounded-2xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Monthly Theme
          </h2>
          <p className="leading-relaxed text-gray-800">
            {data.theme}
          </p>
        </section>

        {/* Career & Money */}
        <section className="rounded-2xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Career & Money
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.career_money}
          </p>
        </section>

        {/* Love & Relationships */}
        <section className="rounded-2xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Love & Relationships
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.love_relationships}
          </p>
        </section>

        {/* Health & Lifestyle */}
        <section className="rounded-2xl bg-white border shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Health & Lifestyle
          </h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-800">
            {data.health_lifestyle}
          </p>
        </section>

        {/* Key Dates */}
        {Array.isArray(data.key_dates) && data.key_dates.length > 0 && (
          <section className="rounded-2xl bg-purple-50 border border-purple-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Important Dates
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-800">
              {data.key_dates.map((d: string, i: number) => (
                <li key={i}>{d}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Monthly Advice */}
        <section className="rounded-2xl bg-yellow-50 border border-yellow-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Monthly Advice
          </h2>
          <p className="font-medium text-gray-900">
            {data.monthly_advice}
          </p>
        </section>

       {/* TOP CTA ROW */}
        <div className="flex items-center justify-between gap-4">

        <a
            href={`/daily-horoscope/${sign}`}
            className="
            rounded-xl
            bg-white
            border border-purple-300
            px-4 py-2
            font-semibold
            text-gray-900
            shadow-sm
            hover:bg-purple-100
            hover:text-purple-900
            "
        >
            🔮 Daily Horoscope
        </a>

        <a
            href={`/yearly-horoscope/${sign}`}
            className="
            rounded-xl
            bg-white
            border border-indigo-300
            px-4 py-2
            font-semibold
            text-gray-900
            shadow-sm
            hover:bg-indigo-100
            hover:text-indigo-900
            "
        >
            📅 Yearly Horoscope
        </a>

        </div>

        {/* CENTER APP CTA */}
        <section className="rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-700 p-6 text-center text-white">
          <p className="text-lg font-semibold mb-4">
            {data.cta}
          </p>

          <a
            href="/app"
            className="inline-block rounded-xl bg-yellow-400 px-6 py-3 font-bold text-purple-900 hover:bg-yellow-300"
          >
            📱 Get Jyotishasha App
          </a>
        </section>

      </div>
    </main>
  );
}
