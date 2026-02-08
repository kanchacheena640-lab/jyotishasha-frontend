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

/* -------- CURRENT VENUS POSITION -------- */
async function fetchVenusCurrent() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) return null;
  return res.json();
}

/* -------- TRANSIT CONTENT -------- */
async function fetchTransitContent(args: {
  ascendant: string;
  planet: string;
  house: number;
  lang: "en" | "hi";
}) {
  const { ascendant, planet, house, lang } = args;

  const url =
    "https://jyotishasha-backend.onrender.com/api/transit" +
    `?ascendant=${encodeURIComponent(ascendant)}` +
    `&planet=${encodeURIComponent(planet)}` +
    `&house=${house}` +
    `&lang=${lang}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) return null;
  return res.json();
}

/* -------- STATIC PARAMS -------- */
export async function generateStaticParams() {
  return ASCENDANTS.map((ascendant) => ({ ascendant }));
}

/* -------- SEO -------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string };
}): Promise<Metadata> {
  const a = params.ascendant?.toLowerCase();

  if (!a || !isValidAscendant(a)) {
    return {
      title: "Venus Transit Ascendant Effects | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }

  const ascName = titleCase(a);

  return {
    title: `Venus Transit for ${ascName} Ascendant – House-wise Effects | Jyotishasha`,
    description: `Detailed house-wise effects of Venus transit for ${ascName} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/venus-transit/${a}`,
    },
    openGraph: {
      title: `Venus Transit for ${ascName} Ascendant`,
      description: `House-wise effects of Venus transit for ${ascName} ascendant.`,
      url: `https://www.jyotishasha.com/venus-transit/${a}`,
      siteName: "Jyotishasha",
      type: "article",
    },
  };
}

/* -------- PAGE -------- */
export default async function VenusTransitAscendantPage({
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

  const current = await fetchVenusCurrent();
  const venusPos = current?.positions?.Venus;

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "venus",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-pink-900 to-rose-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Venus Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>
          <Link href="/venus-transit" className="text-sm text-pink-700 hover:underline">
            ← Back to Venus Transit
          </Link>
        </div>

        <p className="text-gray-800 mb-8 leading-relaxed">
          This page explains the <strong>house-wise effects</strong> of the Venus transit for{" "}
          <strong>{titleCase(ascendant)} Ascendant</strong>. Venus governs love, marriage,
          pleasure, beauty, finances and harmony.
        </p>

        {/* Snapshot */}
        <section className="bg-pink-900 rounded-xl p-6 mb-10 text-white">
          <h2 className="text-xl font-semibold mb-4">Current Venus Transit Snapshot</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Venus (Shukra)</div>
            <div><strong>Current Rashi:</strong> {venusPos?.rashi || "-"}</div>
            <div><strong>Degree:</strong> {venusPos?.degree ? `${venusPos.degree}°` : "-"}</div>
            <div><strong>Motion:</strong> {venusPos?.motion || "-"}</div>
          </div>
        </section>

        {/* Reused client */}
        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="venus"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        {/* House links */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Venus Transit in {titleCase(ascendant)} Ascendant – House-wise Effects
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/venus-transit/${ascendant}/house-${h}`}
                className="border rounded-xl px-4 py-3 text-sm hover:border-pink-700 hover:bg-pink-50 transition"
              >
                <strong>House {h}</strong>
                <div className="text-gray-600 mt-1">
                  Venus transit effects in House {h}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
