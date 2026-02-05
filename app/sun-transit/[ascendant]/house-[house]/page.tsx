import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const BACKEND = "https://jyotishasha-backend.onrender.com";

export async function generateStaticParams() {
  const ascendants = [
    "aries","taurus","gemini","cancer","leo","virgo",
    "libra","scorpio","sagittarius","capricorn","aquarius","pisces",
  ];

  const params: { ascendant: string; house: string }[] = [];

  for (const ascendant of ascendants) {
    for (let i = 1; i <= 12; i++) {
      params.push({
        ascendant,
        house: `house-${i}`,
      });
    }
  }

  return params;
}

/* ---------- DATA ---------- */
async function fetchTransit({
  ascendant,
  house,
  lang,
}: {
  ascendant: string; // "pisces"
  house: number;     // 1–12
  lang: "en" | "hi";
}) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=sun&house=${house}&lang=${lang}`,
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------- SEO ---------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string }; // "house-1"
}): Promise<Metadata> {

  const houseNum = Number(params.house.replace("house-", ""));

  if (!Number.isInteger(houseNum) || houseNum < 1 || houseNum > 12) {
    return {
      title: "Sun Transit House Effects | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }

  const ascTitle =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);

  return {
    title: `Sun Transit in ${ascTitle} Ascendant – House ${houseNum} Effects | Jyotishasha`,
    description: `Sun transit effects for ${ascTitle} ascendant in House ${houseNum} as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/sun-transit/${params.ascendant}/house-${houseNum}`,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function SunTransitHousePage({
  params,
}: {
  params: { ascendant: string; house: string }; // "house-1"
}) {

  const houseNum = Number(params.house.replace("house-", ""));

  if (!houseNum || houseNum < 1 || houseNum > 12) {
    notFound();
  }

  const ascTitle =
    params.ascendant.charAt(0).toUpperCase() +
    params.ascendant.slice(1);

  const dataEn = await fetchTransit({
    ascendant: params.ascendant, // slug only
    house: houseNum,
    lang: "en",
  });

  if (!dataEn) notFound();

  return (
    <article>
      <h1>
        Sun Transit in {ascTitle} Ascendant – House {houseNum}
      </h1>

      <AscendantSunTransitClient
        ascendant={params.ascendant}
        planet="sun"
        lang="en"
        initialHouse={houseNum}
        initialData={dataEn}
      />
    </article>
  );
}

