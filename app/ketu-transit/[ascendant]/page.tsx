// app/ketu-transit/[ascendant]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

const ASCENDANTS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
] as const;

type AscendantSlug = (typeof ASCENDANTS)[number];

function isValidAscendant(a: string): a is AscendantSlug {
  return (ASCENDANTS as readonly string[]).includes(a);
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/* -------- CURRENT KETU POSITION -------- */
async function fetchKetuCurrent() {
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
      title: "Ketu Transit Analysis | Jyotishasha",
      robots: { index: false, follow: false },
    };
  }
  const ascName = titleCase(a);

  return {
    title: `Ketu Transit ${currentYear} (South Node) for ${ascName} Ascendant – Meaning & Effects`,
    description: `Detailed house-wise effects of Ketu Transit ${currentYear} (South Node) for ${ascName} ascendant. Expert Vedic astrology predictions, karmic shifts, and remedies.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/ketu-transit/${a}`,
    },
  };
}

/* -------- PAGE -------- */
export default async function KetuTransitAscendantPage({
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

  const current = await fetchKetuCurrent();
  const ketuPos = current?.positions?.Ketu;

  const initialData = await fetchTransitContent({
    ascendant,
    planet: "ketu",
    house: initialHouse,
    lang,
  });

  /* ✅ STEP 3: FAQ UPGRADE (Rich Results Boost) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What does Ketu Transit ${currentYear} mean in astrology?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ketu transit, also known as South Node transit, represents karmic release, detachment, and spiritual transformation in astrology."
        }
      },
      {
        "@type": "Question",
        "name": `How will Ketu Transit ${currentYear} affect ${titleCase(ascendant)} Ascendant?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${titleCase(ascendant)} ascendant, Ketu transit influences life areas based on its house placement, bringing detachment and inner growth.`
        }
      },
      {
        "@type": "Question",
        "name": "Is Ketu transit always negative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Ketu transit is not negative. It helps in spiritual growth, removing illusions, and breaking unhealthy patterns."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          {/* ✅ STEP 1: H1 UPGRADE (Title & H1 Parity) */}
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-blue-950">
            Ketu Transit {currentYear} (South Node) for <span className="text-blue-600">{titleCase(ascendant)}</span> Ascendant
          </h1>
          <Link href="/ketu-transit" className="text-sm font-bold text-blue-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Global Transit
          </Link>
        </header>

        {/* Global Trust Box */}
        <aside className="mb-10 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-sm italic shadow-sm">
          <strong>Important Note:</strong> This analysis uses <strong>Vedic Astrology</strong>. If you follow Western Sun signs, results may vary. For accuracy, please read for your <strong>Vedic Ascendant (Lagna)</strong>.
        </aside>

        {/* ✅ STEP 2: INTRO REPLACEMENT (Keyword Density Boost) */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            Ketu transit {currentYear} (South Node transit) for {titleCase(ascendant)} ascendant brings karmic shifts, detachment, and inner transformation. In astrology, Ketu represents past-life patterns and spiritual growth, influencing career, relationships, and mindset through its house placement.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Jyotish</span>
          </div>
          <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            South Node Transit Position
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Transit Planet</p>
              <p className="text-lg">Ketu (South Node)</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Current Sign</p>
              <p className="text-lg">{ketuPos?.rashi || "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{ketuPos?.degree ? `${ketuPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Motion</p>
              <p className="text-lg text-amber-400">Retrograde</p>
            </div>
          </div>
          {/* 🟡 MINOR ADDITION: Context Caption */}
          <p className="text-[10px] text-slate-500 mt-4 italic">
            Current Ketu transit position based on Vedic astrology calculations.
          </p>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="ketu"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Navigation */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-blue-950">
            {titleCase(ascendant)} Forecast for Every House
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/ketu-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-tighter">View Impact in</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-blue-700">House {h}</p>
                <p className="text-[10px] text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Detailed Meaning →</p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-20 text-center">
          <Link
            href="/personalized-transit-report"
            className="inline-block bg-blue-700 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-800 transition-all shadow-lg hover:scale-105 active:scale-95"
          >
            Unlock Your Karma Map for {currentYear} →
          </Link>
        </div>

      </article>
    </div>
  );
}