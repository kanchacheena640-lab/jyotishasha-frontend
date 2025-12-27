import { notFound } from "next/navigation";
import type { Metadata } from "next";

const ZODIAC_SIGNS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

export async function generateMetadata({
  params,
}: {
  params: { sign: string };
}): Promise<Metadata> {
  const sign = params.sign.toLowerCase();
  if (!ZODIAC_SIGNS.includes(sign)) return {};

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return {
    title: `${signName} Zodiac Sign – Traits, Love, Career & Compatibility`,
    description: `Complete guide to ${signName} zodiac sign. Personality traits, love life, career, finance, compatibility, lifestyle and lucky factors.`,
    alternates: {
      canonical: `https://jyotishasha.com/horoscope/${sign}`,
    },
  };
}

export default function ZodiacHubPage({
  params,
}: {
  params: { sign: string };
}) {
  const sign = params.sign.toLowerCase();

  if (!ZODIAC_SIGNS.includes(sign)) {
    notFound();
  }

  const signName = sign.charAt(0).toUpperCase() + sign.slice(1);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-14">

      {/* HERO */}
      <section className="rounded-3xl bg-gradient-to-r from-indigo-700 to-purple-800 p-10 text-white">
        <h1 className="text-3xl md:text-4xl font-bold">
          {signName} Zodiac Sign
        </h1>
        <p className="mt-3 text-indigo-100 text-lg">
          Personality, Love, Career, Compatibility & Lifestyle
        </p>
      </section>

      {/* QUICK ACTION TABS */}
      <section className="flex flex-wrap gap-3">
        <a href={`/daily-horoscope/${sign}`} className="zodiac-tab">Daily</a>
        <a href={`/weekly-horoscope/${sign}`} className="zodiac-tab">Weekly</a>
        <a href={`/monthly-horoscope/${sign}`} className="zodiac-tab">Monthly</a>
        <a href={`/yearly-horoscope/${sign}`} className="zodiac-tab">Yearly</a>
      </section>

      {/* OVERVIEW */}
      <section>
        <h2 className="zodiac-h2">{signName} Personality & Nature</h2>
        <p className="zodiac-p">
          {/* Static zodiac nature content */}
        </p>
      </section>

      {/* LOVE */}
      <section>
        <h2 className="zodiac-h2">{signName} Love & Relationships</h2>
        <p className="zodiac-p">
          {/* Love traits */}
        </p>
      </section>

      {/* CAREER & FINANCE */}
      <section>
        <h2 className="zodiac-h2">{signName} Career & Finance</h2>
        <p className="zodiac-p">
          {/* Career / finance content */}
        </p>
      </section>

      {/* COMPATIBILITY */}
      <section>
        <h2 className="zodiac-h2">{signName} Compatibility</h2>

        {/* Partner selector (future logic) */}
        <select className="border rounded-lg px-4 py-2 mt-3">
          <option>Select partner zodiac</option>
          {ZODIAC_SIGNS.map(z => (
            <option key={z} value={z}>
              {z.charAt(0).toUpperCase() + z.slice(1)}
            </option>
          ))}
        </select>

        <div className="mt-4 zodiac-p">
          {/* Compatibility result */}
        </div>
      </section>

      {/* LIFESTYLE */}
      <section>
        <h2 className="zodiac-h2">{signName} Lifestyle</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Hobbies & interests</li>
          <li>Dressing sense</li>
          <li>Behavioral strengths</li>
        </ul>
      </section>

      {/* LUCKY FACTORS */}
      <section>
        <h2 className="zodiac-h2">{signName} Lucky Factors</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Lucky color</li>
          <li>Lucky number</li>
          <li>Ruling planet</li>
          <li>Gemstone</li>
        </ul>
      </section>

      {/* CTA */}
      <section className="rounded-2xl bg-purple-50 p-8 text-center">
        <h3 className="text-2xl font-semibold mb-3">
          Get Personalized Astrology
        </h3>
        <p className="mb-4 text-gray-700">
          Kundali-based horoscope, Panchang & ask one question FREE
        </p>
        <a
          href="/app-download"
          className="inline-block px-8 py-3 rounded-xl bg-purple-600 text-white font-semibold"
        >
          Download Jyotishasha App
        </a>
      </section>

    </div>
  );
}
