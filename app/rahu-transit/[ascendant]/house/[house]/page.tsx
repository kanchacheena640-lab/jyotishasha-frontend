// app/rahu-transit/[ascendant]/house/[house]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";


const BACKEND = "https://jyotishasha-backend.onrender.com";

/* ---------- DATA ---------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=rahu&house=${house}&lang=en`,
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
    title: `Rahu Transit in ${asc} Ascendant – House ${houseNum} Effects | Jyotishasha`,
    description: `Rahu transit effects in House ${houseNum} for ${asc} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/rahu-transit/${params.ascendant}/house-${houseNum}`,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function RahuTransitHousePage({
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
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {data.title}
        </h1>

        <p className="text-gray-800 mb-10 leading-relaxed text-lg">
          {data.summary}
        </p>

        <div className="space-y-10">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="border-l-4 border-purple-700 pl-6">
              <h2 className="text-2xl font-semibold mb-3">
                {sec.heading}
              </h2>
              <ul className="list-disc pl-6 space-y-1 text-gray-700">
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
          <p className="text-gray-800 text-lg">
            <strong>Closing Insight:</strong> {data.closing}
          </p>
        </div>
        <TransitInternalLinks
          planetName="Rahu"
          planetSlug="rahu-transit"
          ascendant={params.ascendant}
          currentHouse={houseNum}
        />

        {/* CTA */}
        <div className="mt-10 bg-gradient-to-r from-purple-700 to-indigo-700 rounded-2xl p-7 text-white">
          <h3 className="text-2xl font-bold mb-3">
            Rahu Creates Illusions — Want the Truth for Your Chart?
          </h3>

          <p className="text-white/95 mb-6">
            Rahu’s results depend on sign placement, aspects, dispositor strength,
            and your running Mahadasha–Antardasha.
          </p>

          <a
            href={`/personalized-transit-report?planet=rahu&house=${houseNum}&ascendant=${params.ascendant}`}
            className="inline-block bg-white text-indigo-800 font-bold px-8 py-4 rounded-xl"
          >
            Get My Personalized Rahu Transit Report →
          </a>
        </div>

      </article>
    </div>
  );
}
