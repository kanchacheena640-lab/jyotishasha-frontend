import type { Metadata } from "next";
import { notFound } from "next/navigation";

const BACKEND = "https://jyotishasha-backend.onrender.com";

/* ---------- DATA ---------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=sun&house=${house}&lang=en`,
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
    title: `Sun Transit in ${asc} Ascendant – House ${houseNum} Effects | Jyotishasha`,
    description: `Sun transit effects in House ${houseNum} for ${asc} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/sun-transit/${params.ascendant}/house-${houseNum}`,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function SunTransitHousePage({
  params,
}: {
  params: { ascendant: string; house: string };
}) {
  const houseNum = Number(params.house);
  if (!houseNum || houseNum < 1 || houseNum > 12) notFound();

  const data = await fetchTransit(params.ascendant, houseNum);
  if (!data) notFound();

  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-black">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>

      <p className="text-gray-700 mb-8">{data.summary}</p>

      {data.sections.map((sec: any, i: number) => (
        <section key={i} className="mb-8">
          <h2 className="text-xl font-semibold mb-2">{sec.heading}</h2>
          <ul className="list-disc pl-6 text-gray-700">
            {sec.points.map((p: string, j: number) => (
              <li key={j}>{p}</li>
            ))}
          </ul>
        </section>
      ))}

      <h3 className="font-semibold mt-10">Strengths</h3>
      <ul className="list-disc pl-6 mb-6">
        {data.strengths.map((s: string, i: number) => (
          <li key={i}>{s}</li>
        ))}
      </ul>

      <h3 className="font-semibold">Challenges</h3>
      <ul className="list-disc pl-6 mb-6">
        {data.challenges.map((c: string, i: number) => (
          <li key={i}>{c}</li>
        ))}
      </ul>

      <p className="text-gray-800">
        <strong>Closing:</strong> {data.closing}
      </p>
    </main>
  );
}
