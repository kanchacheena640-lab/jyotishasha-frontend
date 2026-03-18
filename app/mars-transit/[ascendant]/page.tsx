import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;
const currentYear = new Date().getFullYear();

/* ---------------- Configuration & Logic ---------------- */
const MARS_HOUSE_TRAITS: Record<number, string> = {
  1: "intense energy, physical drive, impulsive decisions",
  2: "financial initiative, sharp speech, wealth-building action",
  3: "unstoppable courage, short travels, competitive edge",
  4: "domestic friction, property initiatives, inner restlessness",
  5: "creative passion, dynamic romance, speculative risks",
  6: "victory over rivals, health discipline, work-life intensity",
  7: "partnership dynamics, intense social interactions, business drive",
  8: "sudden transformations, hidden strengths, occult research",
  9: "religious passion, adventurous travel, pursuit of truth",
  10: "career ambition, professional leadership, social authority",
  11: "social influence, networking for gains, desire fulfillment",
  12: "subconscious battles, foreign initiatives, spiritual discipline",
};

const ASCENDANTS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
const RASHI_INDEX: Record<string, number> = { Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12 };
const RASHIS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

type AscendantSlug = (typeof ASCENDANTS)[number];
function isValidAscendant(a: string): a is AscendantSlug { return (ASCENDANTS as readonly string[]).includes(a); }
function titleCase(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getHouse(asc: string, rashi: string) { return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1; }

/* ---------------- Data Fetching ---------------- */
async function fetchMarsCurrent() {
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
    title: `Mars Transit ${currentYear} for ${ascName} Ascendant – Energy & Forecast`,
    description: `Detailed Mars (Mangal) transit analysis for ${ascName} Rising. Discover house-wise effects on career, courage, and health according to Vedic Astrology.`,
    alternates: { canonical: `https://www.jyotishasha.com/mars-transit/${a}` },
  };
}

/* ---------------- Page Component ---------------- */
export default async function MarsTransitAscendantPage({ params, searchParams }: { params: { ascendant: string }; searchParams?: { lang?: string; house?: string }; }) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  // TypeScript Safe Params
  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;

  const current = await fetchMarsCurrent();
  const marsPos = current?.positions?.Mars;

  const ascName = titleCase(ascendant);
  const currentRashi = marsPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);
  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi = currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];
  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({ ascendant, planet: "mars", house: initialHouse, lang });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", "name": `How will Mars Transit affect ${ascName} Ascendant?`, "acceptedAnswer": { "@type": "Answer", "text": `For ${ascName} Rising, Mars in ${currentRashi} activates the ${currentHouse} house, influencing ambition and daily energy levels.` } }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-red-950/20 py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-950 tracking-tight">
            Mars Transit {currentYear} for <span className="text-red-600">{ascName}</span> <span className="text-slate-550 font-light italic text-2xl md:text-3xl block md:inline">Rising</span>
          </h1>
          <Link href="/mars-transit" className="text-sm font-bold text-red-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Back to Mars Hub
          </Link>
        </header>

        <VedicNote />

        {/* Visual Chart Integration */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart ascendant={ascendant} activePlanet="mars" house={currentHouse} size={340} />
        </div>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            The Mars transit (Mangal Gochar) through {currentRashi} represents a powerful shift in <strong>willpower and initiative</strong> for {ascName} Ascendant.
          </p>

          <h2 className="text-2xl font-bold text-red-900 mb-4">
            Mars Shift: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            In this phase, Mars moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>. 

            Your focus transitions from <strong>{MARS_HOUSE_TRAITS[previousHouse]}</strong> toward the themes of <strong>{MARS_HOUSE_TRAITS[currentHouse]}</strong>. This is the time to channel your inner drive strategically and avoid burnout.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Mangal</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-red-500 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Mars Transit Status
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Current Sign</p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Impact House</p>
              <p className="text-lg text-red-400 font-bold">House {currentHouse}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{marsPos?.degree ? `${marsPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Motion</p>
              <p className="text-lg text-amber-400 italic">{marsPos?.motion || "Direct"}</p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="mars"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Directory */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {ascName} Transit Map for Every House
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/mars-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-red-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-red-600 uppercase mb-1 tracking-tighter">View Impact</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-red-700 tracking-tight">House {h}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-blue-700 font-bold text-sm uppercase tracking-wider">
           <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
           <Link href="/saturn-transit" className="hover:underline">Saturn Transit →</Link>
           <Link href="/rahu-transit" className="hover:underline">Rahu Transit →</Link>
        </footer>

      </article>
    </div>
  );
}