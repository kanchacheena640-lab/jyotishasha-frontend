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

/* -------- CURRENT MERCURY POSITION -------- */
async function fetchMercuryCurrent() {
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
      title: "Mercury Transit Ascendant Effects | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }

  const ascName = titleCase(a);

  return {
    title: `Mercury Transit for ${ascName} Ascendant – House-wise Effects | Jyotishasha`,
    description: `House-wise effects of Mercury transit for ${ascName} ascendant as per Vedic astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/mercury-transit/${a}`,
    },
  };
}

/* -------- PAGE -------- */
export default async function MercuryTransitAscendantPage({
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

  const current = await fetchMercuryCurrent();
  const mercuryPos = current?.positions?.Mercury;

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "mercury",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-emerald-900 to-emerald-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">

        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Mercury Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>
          <Link href="/mercury-transit" className="text-sm text-emerald-700 hover:underline">
            ← Back to Mercury Transit
          </Link>
        </div>

        <p className="text-gray-800 mb-8 leading-relaxed">
          This page explains the <strong>house-wise effects</strong> of Mercury transit for{" "}
          <strong>{titleCase(ascendant)} Ascendant</strong>. Mercury governs intellect,
          communication, business skills, analysis and decision-making.
        </p>

        {/* Snapshot */}
        <section className="bg-emerald-900 rounded-xl p-6 mb-10 text-white">
          <h2 className="text-xl font-semibold mb-4">Current Mercury Transit Snapshot</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div><strong>Planet:</strong> Mercury (Budh)</div>
            <div><strong>Current Rashi:</strong> {mercuryPos?.rashi || "-"}</div>
            <div><strong>Degree:</strong> {mercuryPos?.degree ? `${mercuryPos.degree}°` : "-"}</div>
            <div><strong>Motion:</strong> {mercuryPos?.motion || "-"}</div>
          </div>
        </section>

        {/* Reusable client */}
        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="mercury"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        {/* House links */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Mercury Transit in {titleCase(ascendant)} Ascendant – House-wise Effects
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/mercury-transit/${ascendant}/house-${h}`}
                className="border rounded-xl px-4 py-3 text-sm hover:border-emerald-700 hover:bg-emerald-50 transition"
              >
                <strong>House {h}</strong>
                <div className="text-gray-600 mt-1">
                  Mercury transit effects in House {h}
                </div>
              </Link>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
}
