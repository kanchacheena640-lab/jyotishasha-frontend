// app/rahu-transit/[ascendant]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const ASCENDANTS = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libbra","scorpio","sagittarius","capricorn","aquarius","pisces",
] as const;

type AscendantSlug = (typeof ASCENDANTS)[number];

function isValidAscendant(a: string): a is AscendantSlug {
  return (ASCENDANTS as readonly string[]).includes(a);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------- CURRENT RAHU POSITION -------- */
async function fetchRahuCurrent() {
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
      title: "Rahu Transit Ascendant Effects | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }

  const ascName = titleCase(a);

  return {
    title: `Rahu Transit for ${ascName} Ascendant – House-wise Effects | Jyotishasha`,
    description: `Detailed house-wise effects of Rahu transit for ${ascName} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/rahu-transit/${a}`,
    },
    openGraph: {
      title: `Rahu Transit for ${ascName} Ascendant`,
      description: `House-wise effects of Rahu transit for ${ascName} ascendant.`,
      url: `https://www.jyotishasha.com/rahu-transit/${a}`,
      siteName: "Jyotishasha",
      type: "article",
    },
  };
}

/* -------- PAGE -------- */
export default async function RahuTransitAscendantPage({
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

  const current = await fetchRahuCurrent();
  const rahuPos = current?.positions?.Rahu;

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "rahu",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-purple-900 to-indigo-900 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Rahu Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>
          <Link href="/rahu-transit" className="text-sm text-purple-700 hover:underline">
            ← Back to Rahu Transit
          </Link>
        </div>

        <p className="text-gray-800 mb-8 leading-relaxed">
          This page explains the <strong>house-wise effects</strong> of Rahu transit for{" "}
          <strong>{titleCase(ascendant)} Ascendant</strong>. Rahu amplifies desires,
          ambitions, confusion, obsession and sudden events.
        </p>

        {/* Snapshot */}
        <section className="bg-purple-900 rounded-xl p-6 mb-10 text-white">
          <h2 className="text-xl font-semibold mb-4">Current Rahu Transit Snapshot</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Rahu</div>
            <div><strong>Current Rashi:</strong> {rahuPos?.rashi || "-"}</div>
            <div><strong>Degree:</strong> {rahuPos?.degree ? `${rahuPos.degree}°` : "-"}</div>
            <div><strong>Motion:</strong> Retrograde</div>
          </div>
        </section>

        {/* Reused client */}
        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="rahu"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        {/* House links */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Rahu Transit in {titleCase(ascendant)} Ascendant – House-wise Effects
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/rahu-transit/${ascendant}/house-${h}`}
                className="border rounded-xl px-4 py-3 text-sm hover:border-purple-700 hover:bg-purple-50 transition"
              >
                <strong>House {h}</strong>
                <div className="text-gray-600 mt-1">
                  Rahu transit effects in House {h}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
