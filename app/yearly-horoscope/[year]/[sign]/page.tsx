import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getYearlyHoroscope } from "@/lib/services/yearlyHoroscope";

export async function generateStaticParams() {
  const years = ["2025", "2026", "2027"];
  const signs = [
    "aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","agittarius","capricorn","aquarius","pisces"
  ];

  return years.flatMap(year =>
    signs.map(sign => ({ year, sign }))
  );
}

const VALID_SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

type PageProps = {
  params: {
    year: string;
    sign: string;
  };
};

// -----------------------------
// SEO
// -----------------------------
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const sign = params.sign.toLowerCase();
  const year = params.year;

  if (!VALID_SIGNS.includes(sign)) return {};

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return {
    title: `${signName} ${year} Yearly Horoscope | Career, Love, Finance & Health`,
    description: `Read ${signName} yearly horoscope ${year}. Detailed predictions for career, money, love, relationships and health based on Vedic astrology.`,
    alternates: {
      canonical: `/yearly-horoscope/${year}/${sign}`,
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
export default async function YearlySignPage({ params }: PageProps) {
  const sign = params.sign.toLowerCase();
  const year = params.year;

  if (!VALID_SIGNS.includes(sign)) notFound();

  // language (future ready)
  const lang = "en";

  // API call (CORRECT signature)
  const signData = await getYearlyHoroscope(year, sign, lang);
  if (!signData) notFound();

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-gray-900">

      {/* HERO */}
      <section className="mb-10 rounded-3xl bg-gradient-to-r from-purple-800 to-indigo-800 px-8 py-10 text-white flex items-center gap-6">
        
        <Image
          src={`/zodiac/${sign}.png`}
          alt={`${signName} zodiac sign`}
          width={72}
          height={72}
          className="bg-white rounded-full p-2"
          priority
        />

        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
            {signData.title}
          </h1>
          <p className="text-purple-100 text-lg leading-relaxed">
            Complete yearly horoscope {year} for {signName} — career, money,
            relationships, health and long-term guidance.
          </p>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="mb-8 rounded-2xl bg-white border shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-3">
          {signName} Yearly Overview {year}
        </h2>
        <p className="leading-relaxed text-gray-800">
          {signData.introduction?.content?.[0]}
        </p>
      </section>

      {/* CAREER */}
      <section className="mb-8 rounded-2xl bg-white border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-3">
          {signData.career_finance.heading}
        </h2>
        <p className="leading-relaxed text-gray-800">
          {signData.career_finance.content[0]}
        </p>
      </section>

      {/* LOVE */}
      <section className="mb-8 rounded-2xl bg-white border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-3">
          {signData.love_relationships.heading}
        </h2>
        <p className="leading-relaxed text-gray-800">
          {signData.love_relationships.content[0]}
        </p>
      </section>

      {/* HEALTH */}
      <section className="mb-8 rounded-2xl bg-white border shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-3">
          {signData.health_wellness.heading}
        </h2>
        <p className="leading-relaxed text-gray-800">
          {signData.health_wellness.content[0]}
        </p>
      </section>

      {/* SUMMARY */}
      <section className="mb-10 rounded-2xl bg-yellow-50 border border-yellow-200 p-6">
        <h2 className="text-xl font-semibold mb-3">
          Final Summary for {signName} {year}
        </h2>
        <p className="leading-relaxed font-medium text-gray-900">
          {signData.final_summary.content}
        </p>
      </section>

      {/* CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <Link
          href={`/daily-horoscope/${sign}`}
          className="rounded-xl bg-white border px-4 py-3 font-semibold shadow-sm hover:bg-purple-50"
        >
          🔮 Read Daily Horoscope
        </Link>

        <Link
          href={`/monthly-horoscope/${sign}`}
          className="rounded-xl bg-white border px-4 py-3 font-semibold shadow-sm hover:bg-indigo-50"
        >
          📅 View Monthly Horoscope
        </Link>

        <Link
          href="/app-download"
          className="rounded-xl bg-gradient-to-r from-purple-700 to-indigo-700 px-6 py-3 font-bold text-white text-center"
        >
          📱 Get Jyotishasha App
        </Link>
      </div>

    </main>
  );
}
