import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const BACKEND = "https://jyotishasha-backend.onrender.com";

async function fetchTransit({
  ascendant,
  house,
  lang,
}: {
  ascendant: string;
  house: number;
  lang: "en" | "hi";
}) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=sun&house=${house}&lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------- SEO METADATA ---------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string };
}): Promise<Metadata> {
    const houseNum = Number(params.house);

    if (!houseNum || houseNum < 1 || houseNum > 12) {
    return {
        title: "Sun Transit House Effects | Jyotishasha",
        robots: { index: false, follow: false },
    };
    }
  const asc =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);

  return {
    title: `Sun Transit in ${asc} Ascendant – House ${houseNum} Effects | Jyotishasha`,
    description: `Sun transit effects for ${asc} ascendant in the ${houseNum} house as per Vedic astrology. Career, health, authority and remedies explained.`,
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
  const ascendant =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);
  const houseNum = Number(params.house);

  if (!houseNum || houseNum < 1 || houseNum > 12) {
    notFound(); // ✅ correct place
  }

  const dataEn = await fetchTransit({
    ascendant: params.ascendant, // "pisces"
    house: houseNum,
    lang: "en",
    });

  if (!dataEn) {
    notFound(); // ✅ backend missing content
  }

  return (
    <article className="max-w-5xl mx-auto px-6 py-14 bg-white rounded-2xl shadow">
      <nav className="text-sm mb-6 text-gray-600">
        <Link href="/sun-transit">Sun Transit</Link> ›{" "}
        <Link href={`/sun-transit/${params.ascendant}`}>
          {ascendant} Ascendant
        </Link>{" "}
        › House {houseNum}
      </nav>

      <h1 className="text-3xl font-bold mb-6">
        Sun Transit in {ascendant} Ascendant – House {houseNum}
      </h1>

      <AscendantSunTransitClient
        ascendant={ascendant}
        planet="sun"
        lang="en"
        initialHouse={houseNum}
        initialData={dataEn}
      />
    </article>
  );
}
