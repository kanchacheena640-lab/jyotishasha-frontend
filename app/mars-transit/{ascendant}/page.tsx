import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const ASCENDANTS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces",
] as const;

type AscendantSlug = (typeof ASCENDANTS)[number];

function isValidAscendant(a: string): a is AscendantSlug {
  return (ASCENDANTS as readonly string[]).includes(a);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

async function fetchTransitContent(args: {
  ascendant: string;
  planet: string;
  house: number;
  lang: "en" | "hi";
}) {
  const url =
    "https://jyotishasha-backend.onrender.com/api/transit" +
    `?ascendant=${args.ascendant}` +
    `&planet=${args.planet}` +
    `&house=${args.house}` +
    `&lang=${args.lang}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

/* ---------- SEO ---------- */
export async function generateStaticParams() {
  return ASCENDANTS.map((ascendant) => ({ ascendant }));
}

export async function generateMetadata({
  params,
}: {
  params: { ascendant: string };
}): Promise<Metadata> {
  const a = params.ascendant?.toLowerCase();
  if (!a || !isValidAscendant(a)) {
    return { robots: { index: false, follow: false } };
  }

  const asc = titleCase(a);

  return {
    title: `Mars Transit for ${asc} Ascendant – House-wise Effects | Jyotishasha`,
    description: `House-wise effects of Mars transit for ${asc} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/mars-transit/${a}`,
    },
  };
}

/* ---------- PAGE ---------- */
export default async function MarsTransitAscendantPage({
  params,
  searchParams,
}: {
  params: { ascendant: string };
  searchParams?: { lang?: string; house?: string };
}) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const initialHouse =
    searchParams?.house && Number(searchParams.house) >= 1 && Number(searchParams.house) <= 12
      ? Number(searchParams.house)
      : 1;

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "mars",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-red-900 to-red-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Mars Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>

          <Link href="/mars-transit" className="text-sm text-red-700 hover:underline">
            ← Back to Mars Transit
          </Link>
        </div>

        <p className="text-gray-800 mb-8">
          This page explains <strong>house-wise Mars transit effects</strong> for
          <strong> {titleCase(ascendant)} Ascendant</strong> based on classical Vedic Gochar.
        </p>

        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="mars"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        <section className="mt-12 border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Explore other Ascendants</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {ASCENDANTS.map((a) => (
              <Link
                key={a}
                href={`/mars-transit/${a}`}
                className={`hover:underline ${
                  a === ascendant ? "text-gray-400 pointer-events-none" : "text-red-700"
                }`}
              >
                {titleCase(a)}
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
