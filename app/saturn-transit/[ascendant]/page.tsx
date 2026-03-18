import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;
const currentYear = new Date().getFullYear();

/* ---------------- Configuration & Logic ---------------- */
const SATURN_HOUSE_TRAITS: Record<number, string> = {
  1: "disciplined self-growth, heavy responsibilities, restructuring identity",
  2: "financial discipline, family duties, cautious speech and values",
  3: "focused efforts, skill mastery, serious communication with siblings",
  4: "domestic responsibilities, property restructuring, emotional maturity",
  5: "disciplined creativity, serious approach to romance, progeny duties",
  6: "victory through hard work, health discipline, organized service",
  7: "relationship testing, business restructuring, long-term contracts",
  8: "occult mastery, deep financial audit, transformative life lessons",
  9: "philosophical depth, religious discipline, travel for duty",
  10: "career peak, professional authority, massive social responsibility",
  11: "steady networking, focused gains, desire fulfillment through delay",
  12: "subconscious cleanup, isolation for growth, spiritual endurance",
};

const ASCENDANTS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
const RASHI_INDEX: Record<string, number> = { Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12 };
const RASHIS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

type AscendantSlug = (typeof ASCENDANTS)[number];
function isValidAscendant(a: string): a is AscendantSlug { return (ASCENDANTS as readonly string[]).includes(a); }
function titleCase(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getHouse(asc: string, rashi: string) { return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1; }

function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

/* ---------------- Data Fetching ---------------- */
async function fetchSaturnCurrent() {
  const res = await fetch("https://jyotishasha-backend.onrender.com/api/transit/current", { next: { revalidate: 3600 } });
  return res.ok ? res.json() : null;
}

async function fetchTransitContent(args: { ascendant: string; planet: string; house: number; lang: "en" | "hi"; }) {
  const url = `https://jyotishasha-backend.onrender.com/api/transit?ascendant=${encodeURIComponent(args.ascendant)}&planet=${encodeURIComponent(args.planet)}&house=${args.house}&lang=${args.lang}`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  return res.ok ? res.json() : null;
}

export async function generateStaticParams() { return ASCENDANTS.map((ascendant) => ({ ascendant })); }

/* ---------------- SEO ---------------- */
export async function generateMetadata({ params }: { params: { ascendant: string } }): Promise<Metadata> {
  const a = params.ascendant?.toLowerCase();
  if (!a || !isValidAscendant(a)) return { title: "Not Found", robots: { index: false } };
  const ascName = titleCase(a);
  return {
    title: `Saturn Transit for ${ascName} Ascendant – Karmic Effects & Meaning`,
    description: `How will Saturn (Shani) transit affect ${ascName} Rising? Detailed Vedic house-wise analysis of career shifts, Sade Sati impacts, and karmic discipline for ${currentYear}.`,
    alternates: { canonical: `https://www.jyotishasha.com/saturn-transit/${a}` },
  };
}

/* ---------------- Page Component ---------------- */
export default async function SaturnTransitAscendantPage({ params, searchParams }: { params: { ascendant: string }; searchParams?: { lang?: string; house?: string }; }) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;

  const current = await fetchSaturnCurrent();
  const saturnPos = current?.positions?.Saturn;
  const currentTransit = current?.future_transits?.Saturn?.[0];

  const ascName = titleCase(ascendant);
  const currentRashi = saturnPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);
  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi = currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];
  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({ ascendant, planet: "saturn", house: initialHouse, lang });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", "name": `How long does Saturn transit affect ${ascName}?`, "acceptedAnswer": { "@type": "Answer", "text": `Saturn stays in ${currentRashi} for approx 2.5 years, influencing the ${currentHouse} house of ${ascName} rising with karmic lessons.` } }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100 overflow-hidden relative">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-950 tracking-tight">
            Saturn Transit for <span className="text-slate-600">{ascName}</span> <span className="text-slate-300 font-light italic text-2xl md:text-3xl block md:inline">Rising</span>
          </h1>
          <Link href="/saturn-transit" className="text-sm font-bold text-slate-500 uppercase tracking-widest hover:text-blue-600 transition flex items-center gap-1">
            ← Global Shani Transit
          </Link>
        </header>

        <VedicNote />

        {/* Visual Chart Integration */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart ascendant={ascendant} activePlanet="saturn" house={currentHouse} size={340} />
        </div>

        {/* Intro Section with Dynamic Saturn Traits */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            Saturn transit (Shani Gochar) represents a profound <strong>cycle of maturity and mastery</strong> for {ascName} Ascendant.
          </p>

          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Karmic Restructuring: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            Saturn, the Lord of Karma, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>. 

            In this slow transition, your life focus shifts from <strong>{SATURN_HOUSE_TRAITS[previousHouse]}</strong> toward the long-term foundations of <strong>{SATURN_HOUSE_TRAITS[currentHouse]}</strong>. This phase demands patience and ethical action.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Shani</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-slate-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
            Saturn Audit Snapshot
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Transit Sign</p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Impact House</p>
              <p className="text-lg text-slate-400 font-bold">House {currentHouse}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{saturnPos?.degree ? `${saturnPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Current Period</p>
              <p className="text-[11px] font-bold text-slate-200">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="saturn"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Directory Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {ascName} Karmic Map for Every House
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/saturn-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-slate-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-tighter">Audit Scope</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-slate-900 tracking-tight">House {h}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Authority Links */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-blue-700 font-bold text-sm uppercase tracking-wider">
           <Link href="/rahu-transit" className="hover:underline">Rahu Transit →</Link>
           <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
           <Link href="/ketu-transit" className="hover:underline">Ketu Transit →</Link>
        </footer>

      </article>
    </div>
  );
}