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
    <main className="mx-auto max-w-3xl px-4 py-8">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        {data.title}
      </h1>

      {/* Theme */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Monthly Theme</h2>
        <p className="text-gray-700 leading-relaxed">{data.theme}</p>
      </section>

      {/* Career & Money */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Career & Money</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {data.career_money}
        </p>
      </section>

      {/* Love & Relationships */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Love & Relationships</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {data.love_relationships}
        </p>
      </section>

      {/* Health & Lifestyle */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Health & Lifestyle</h2>
        <p className="text-gray-700 whitespace-pre-line leading-relaxed">
          {data.health_lifestyle}
        </p>
      </section>

      {/* Key Dates */}
      {Array.isArray(data.key_dates) && data.key_dates.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Key Dates</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {data.key_dates.map((item: string, i: number) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Monthly Advice */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Monthly Advice</h2>
        <p className="text-gray-700 leading-relaxed">
          {data.monthly_advice}
        </p>
      </section>

      {/* CTA */}
      <section className="rounded-xl border p-4 bg-gray-50">
        <p className="text-sm text-gray-800">{data.cta}</p>
      </section>
    </main>
  );
}
