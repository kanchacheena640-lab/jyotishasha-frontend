// app/sun-transit/[ascendant]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const ASCENDANTS = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
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

async function fetchSunCurrent() {
  const res = await fetch("https://jyotishasha-backend.onrender.com/api/transit/current", {
    next: { revalidate: 3600 },
  });
  if (!res.ok) return null;
  return res.json();
}

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
    `&planet=${encodeURIComponent(planet.toLowerCase())}` +
    `&house=${house}` +
    `&lang=${lang}`;

  const res = await fetch(url, { next: { revalidate: 3600 } });

  // If content missing, return null (UI will show “not available”)
  if (!res.ok) return null;

  return res.json();
}

/** ✅ SEO: statically enumerate 12 ascendant pages */
export async function generateStaticParams() {
  return ASCENDANTS.map((ascendant) => ({ ascendant }));
}

/** ✅ SEO: per-ascendant metadata + canonical */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string };
}): Promise<Metadata> {
  const a = params.ascendant?.toLowerCase();

  if (!a || !isValidAscendant(a)) {
    return {
      title: "Sun Transit Ascendant Effects | Jyotishasha",
      description: "Ascendant-wise Sun transit effects as per Vedic astrology.",
      robots: { index: false, follow: false },
    };
  }

  const ascName = titleCase(a);

  return {
    title: `Sun Transit for ${ascName} Ascendant – House-wise Effects | Jyotishasha`,
    description: `Detailed house-wise effects of Sun transit for ${ascName} ascendant as per Vedic astrology. Includes themes, strengths, challenges and remedies.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/sun-transit/${a}`,
    },
    openGraph: {
      title: `Sun Transit for ${ascName} Ascendant`,
      description: `House-wise effects of Sun transit for ${ascName} ascendant.`,
      url: `https://www.jyotishasha.com/sun-transit/${a}`,
      siteName: "Jyotishasha",
      type: "article",
    },
  };
}

export default async function SunTransitAscendantPage({
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

  // ✅ For SEO: SSR snapshot + SSR initial house content
  const current = await fetchSunCurrent();
  const sunPos = current?.positions?.Sun;
  const sunFuture = current?.future_transits?.Sun || [];
  const currentTransit = sunFuture[0];
  const nextTransit = sunFuture[1];

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "sun",
    house: initialHouse,
    lang,
  });

  return (
    <div className="bg-gradient-to-b from-blue-900 to-blue-800 py-16">
      <article className="max-w-5xl mx-auto bg-white rounded-2xl px-6 md:px-10 py-14 shadow-xl text-black">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Sun Transit Effects for {titleCase(ascendant)} Ascendant
          </h1>

          <Link href="/sun-transit" className="text-sm text-blue-700 hover:underline">
            ← Back to Sun Transit
          </Link>
        </div>

        {/* SEO-friendly intro */}
        <p className="text-gray-800 mb-8 leading-relaxed">
          This page explains the <strong>house-wise effects</strong> of the Sun transit for{" "}
          <strong>{titleCase(ascendant)} Ascendant</strong> as per Vedic Gochar rules. Effects vary by house
          activation, dignity, and chart context.
        </p>

        {/* Snapshot (SSR) */}
        <section className="bg-blue-900 rounded-xl p-6 mb-10 text-white">
          <h2 className="text-xl font-semibold mb-4">Current Sun Transit Snapshot</h2>
          <div className="grid sm:grid-cols-2 gap-3 text-sm">
            <div>
              <strong>Planet:</strong> Sun (Surya)
            </div>
            <div>
              <strong>Current Rashi:</strong> {sunPos?.rashi || "-"}
            </div>
            <div>
              <strong>Degree:</strong> {sunPos?.degree ? `${sunPos.degree}°` : "-"}
            </div>
            <div>
              <strong>Motion:</strong> {sunPos?.motion || "-"}
            </div>
            <div>
              <strong>Transit Period:</strong> {formatDate(currentTransit?.entering_date)} –{" "}
              {formatDate(currentTransit?.exit_date)}
            </div>
            <div>
              <strong>Next Transit:</strong> {nextTransit?.to_rashi || "-"} on{" "}
              {formatDate(nextTransit?.entering_date)}
            </div>
          </div>
        </section>

        {/* ✅ Client component handles house tabs; SSR initial content prevents SEO thinness */}
        <AscendantSunTransitClient
          ascendant={ascendant}
          planet="sun"
          lang={lang}
          initialHouse={initialHouse}
          initialData={initialData}
        />

        {/* 🔗 House-wise Sun Transit Effects (SEO index) */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold mb-4">
            Sun Transit in {titleCase(ascendant)} Ascendant – House-wise Effects
          </h2>

          <p className="text-gray-700 mb-6 leading-relaxed">
            Explore how the Sun transit impacts each house for {titleCase(ascendant)} ascendant.
            Each house activates different life areas such as career, health, relationships,
            finances, authority and self-expression.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/sun-transit/${ascendant}/house-${h}`}   // ✅ FIXED
                className="border rounded-xl px-4 py-3 text-sm hover:border-blue-700 hover:bg-blue-50 transition"
              >
                <strong>House {h}</strong>
                <div className="text-gray-600 mt-1">
                  Sun transit effects in House {h}
                </div>
              </Link>
            ))}
          </div>
        </section>


        {/* Internal linking for SEO */}
        <section className="mt-12 border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Explore other Ascendants</h2>
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm">
            {ASCENDANTS.map((a) => (
              <Link
                key={a}
                href={`/sun-transit/${a}`}
                className={`hover:underline ${
                  a === ascendant ? "text-gray-400 pointer-events-none" : "text-blue-700"
                }`}
              >
                {titleCase(a)}
              </Link>
            ))}
          </div>
        </section>

        <p className="mt-10 text-sm text-gray-500 leading-relaxed">
          Calculations follow sidereal zodiac (Lahiri Ayanamsa) and classical Gochar principles. Content is
          delivered via Jyotishasha structured transit library.
        </p>

        <div className="mt-10">
          <Link
            href="/app-download"
            className="inline-block bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition"
          >
            Get the app for personalized transits →
          </Link>
        </div>
      </article>
    </div>
  );
}
