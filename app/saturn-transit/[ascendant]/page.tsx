// app/saturn-transit/[ascendant]/page.tsx
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

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB");
}

/* -------- CURRENT SATURN POSITION (from /current) -------- */
async function fetchSaturnCurrent() {
  const res = await fetch("https://jyotishasha-backend.onrender.com/api/transit/current", {
    next: { revalidate: 3600 },
  });
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
      title: "Saturn Transit Ascendant Effects | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }

  const ascName = titleCase(a);

  return {
    title: `Saturn Transit for ${ascName} Ascendant – House-wise Effects | Jyotishasha`,
    description: `Detailed house-wise effects of Saturn (Shani) transit for ${ascName} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/saturn-transit/${a}`,
    },
    openGraph: {
      title: `Saturn Transit for ${ascName} Ascendant`,
      description: `House-wise effects of Saturn transit for ${ascName} ascendant.`,
      url: `https://www.jyotishasha.com/saturn-transit/${a}`,
      siteName: "Jyotishasha",
      type: "article",
    },
  };
}

/* -------- PAGE -------- */
export default async function SaturnTransitAscendantPage({
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

  const current = await fetchSaturnCurrent();
  const saturnPos = current?.positions?.Saturn;

  const saturnFuture = current?.future_transits?.Saturn || [];
  const currentTransit = saturnFuture[0];
  const nextTransit = saturnFuture[1];

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "saturn",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Saturn Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>
          <Link href="/saturn-transit" className="text-sm text-slate-700 hover:underline">
            ← Back to Saturn Transit
          </Link>
        </div>

        <p className="text-gray-800 mb-8 leading-relaxed">
          This page explains the <strong>house-wise effects</strong> of <strong>Saturn (Shani)</strong> transit for{" "}
          <strong>{titleCase(ascendant)} Ascendant</strong>. Saturn influences discipline, responsibility,
          delays, endurance, karma, and long-term outcomes.
        </p>

        {/* Snapshot */}
        <section className="bg-slate-900 rounded-xl p-6 mb-10 text-white">
          <h2 className="text-xl font-semibold mb-4">Current Saturn Transit Snapshot</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Saturn (Shani)</div>
            <div><strong>Current Rashi:</strong> {saturnPos?.rashi || "-"}</div>
            <div><strong>Degree:</strong> {saturnPos?.degree ? `${saturnPos.degree}°` : "-"}</div>
            <div><strong>Motion:</strong> {saturnPos?.motion || "-"}</div>

            <div>
              <strong>Transit Period:</strong>{" "}
              {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
            </div>
            <div>
              <strong>Next Transit:</strong>{" "}
              {nextTransit?.to_rashi || "-"} on {formatDate(nextTransit?.entering_date)}
            </div>
          </div>
        </section>

        {/* Reused client */}
        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="saturn"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        {/* House links */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Saturn Transit in {titleCase(ascendant)} Ascendant – House-wise Effects
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/saturn-transit/${ascendant}/house-${h}`}
                className="border rounded-xl px-4 py-3 text-sm hover:border-slate-700 hover:bg-slate-50 transition"
              >
                <strong>House {h}</strong>
                <div className="text-gray-600 mt-1">Saturn transit effects in House {h}</div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
