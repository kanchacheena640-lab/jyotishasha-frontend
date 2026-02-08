import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";


const BACKEND = "https://jyotishasha-backend.onrender.com";

/* ---------- DATA ---------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=jupiter&house=${house}&lang=en`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------- SEO ---------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string };
}): Promise<Metadata> {
  const houseNum = Number(params.house);
  if (!houseNum || houseNum < 1 || houseNum > 12) {
    return { robots: { index: false, follow: false } };
  }

  const asc =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);

  return {
    title: `Jupiter Transit in ${asc} Ascendant – House ${houseNum} Effects | Jyotishasha`,
    description: `Jupiter transit effects in House ${houseNum} for ${asc} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/jupiter-transit/${params.ascendant}/house-${houseNum}`,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function JupiterTransitHousePage({
  params,
}: {
  params: { ascendant: string; house: string };
}) {
  const houseNum = Number(params.house);
  if (!houseNum || houseNum < 1 || houseNum > 12) notFound();

  const data = await fetchTransit(params.ascendant, houseNum);
  if (!data) notFound();

  const ascTitle =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);

  return (
    <div className="bg-gradient-to-b from-yellow-900 to-amber-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <h1 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
          {data.title}
        </h1>

        <p className="text-gray-800 mb-10 leading-relaxed text-lg">
          {data.summary}
        </p>

        <div className="space-y-10">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="border-l-4 border-amber-700 pl-6">
              <h2 className="text-2xl font-semibold mb-3">
                {sec.heading}
              </h2>

              <ul className="list-disc pl-6 space-y-1 text-gray-700 leading-relaxed">
                {sec.points.map((p: string, j: number) => (
                  <li key={j}>{p}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-14">
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-green-800">
              Strengths
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {data.strengths.map((s: string, i: number) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          <div className="bg-red-50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-red-800">
              Challenges
            </h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              {data.challenges.map((c: string, i: number) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t pt-6">
          <p className="text-gray-800 leading-relaxed text-lg">
            <strong>Closing Insight:</strong> {data.closing}
          </p>
        </div>

        <TransitInternalLinks
          planetName="Jupiter"
          planetSlug="jupiter-transit"
          ascendant={params.ascendant}
          currentHouse={houseNum}
        />

        {/* CTA – Personalized Jupiter Transit Report */}
        <div className="mt-10 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-2xl p-7 text-white shadow-lg">

          <h3 className="text-2xl font-bold mb-3">
            This Is a General Jupiter Transit — Want Your Real Growth & Fortune Timing?
          </h3>

          <p className="text-white/95 leading-relaxed mb-5">
            This page explains the <strong>Jupiter transit in House {houseNum}</strong> for a
            <strong> {ascTitle} Ascendant</strong>.
            <br /><br />
            But Jupiter’s blessings depend on:
          </p>

          <ul className="list-disc pl-6 space-y-1 text-white/95 mb-6">
            <li>Which houses Jupiter actually rules in your chart</li>
            <li>Strength, dignity & aspects</li>
            <li>Support or blockage from Saturn & Rahu</li>
            <li>Running Mahadasha & Antardasha</li>
            <li>Career, wealth, marriage & education timing</li>
          </ul>

          <p className="text-white/95 mb-6 leading-relaxed">
            That’s why the same Jupiter transit
            <em>uplifts some and delays others</em>.
          </p>

          <a
            href={`/personalized-transit-report?planet=jupiter&house=${houseNum}&ascendant=${params.ascendant}`}
            className="inline-block bg-white text-amber-700 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition"
          >
            Get My Personalized Jupiter Transit Report →
          </a>

        </div>

      </article>
    </div>
  );
}
