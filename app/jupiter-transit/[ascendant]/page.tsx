import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;
const currentYear = new Date().getFullYear();

/* ---------------- Configuration & Logic ---------------- */
const JUPITER_HOUSE_TRAITS: Record<number, string> = {
  1: "personal growth, optimism, physical vitality",
  2: "financial expansion, family harmony, improved speech",
  3: "skill development, short travels, courageous initiatives",
  4: "domestic happiness, property gains, emotional peace",
  5: "creative sparks, progeny luck, speculative gains",
  6: "victory over hurdles, health improvement, service growth",
  7: "marital bliss, partnership growth, social recognition",
  8: "sudden inheritance, occult wisdom, deep transformation",
  9: "spiritual awakening, higher learning, travel for wisdom",
  10: "career elevation, public status, professional authority",
  11: "monetary gains, social networking, desire fulfillment",
  12: "spiritual solitude, foreign opportunities, subconscious healing",
};

const ASCENDANTS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
const RASHI_INDEX: Record<string, number> = { Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12 };
const RASHIS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

type AscendantSlug = (typeof ASCENDANTS)[number];
function isValidAscendant(a: string): a is AscendantSlug { return (ASCENDANTS as readonly string[]).includes(a); }
function titleCase(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getHouse(asc: string, rashi: string) { return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1; }

/* ---------------- Data Fetching ---------------- */
async function fetchJupiterCurrent() {
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
    title: `Jupiter Transit ${currentYear} for ${ascName} Ascendant – Effects & Meaning`,
    description: `How will Jupiter (Guru) transit affect ${ascName} Rising? Detailed Vedic analysis of house shifts, financial growth, and spiritual opportunities for ${currentYear}.`,
    alternates: { canonical: `https://www.jyotishasha.com/jupiter-transit/${a}` },
  };
}

/* ---------------- Page Component ---------------- */
export default async function JupiterTransitAscendantPage({ params, searchParams }: { params: { ascendant: string }; searchParams?: { lang?: string; house?: string }; }) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  // Safety check for searchParams to avoid TS error
  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  
  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;
  const current = await fetchJupiterCurrent();
  const jupiterPos = current?.positions?.Jupiter;

  const ascName = titleCase(ascendant);
  const currentRashi = jupiterPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);
  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi = currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];
  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({ ascendant, planet: "jupiter", house: initialHouse, lang });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", "name": `What is the significance of Jupiter Transit for ${ascName}?`, "acceptedAnswer": { "@type": "Answer", "text": `For ${ascName} Rising, Jupiter's movement into ${currentRashi} triggers expansion and wisdom in the ${currentHouse} house of the birth chart.` } }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-blue-900 py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">
        
        {/* H1 & Header Upgraded */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-blue-950">
            Jupiter Transit {currentYear} for <span className="text-blue-600">{ascName}</span> <span className="text-slate-550 font-light italic text-2xl md:text-3xl block md:inline">Rising</span>
          </h1>
          <Link href="/jupiter-transit" className="text-sm font-bold text-blue-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Global Hub
          </Link>
        </header>

        <VedicNote />

        {/* Visual Chart Integration */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart ascendant={ascendant} activePlanet="jupiter" house={currentHouse} size={340} />
        </div>

        {/* Intro Boost with Dynamic Traits */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            Jupiter transit {currentYear} (Guru Gochar) for {ascName} ascendant represents a phase of <strong>wisdom and expansion</strong>.
          </p>

          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Jupiter Cycle: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            Jupiter, the Great Benefic, is moving from {previousRashi} to {currentRashi}, shifting its influence from your {previousHouse} house to the <strong>{currentHouse} house</strong>. 

            As this transition unfolds, focus shifts from <strong>{JUPITER_HOUSE_TRAITS[previousHouse]}</strong> toward new opportunities in <strong>{JUPITER_HOUSE_TRAITS[currentHouse]}</strong>. This is a powerful time for dharma, learning, and abundance.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic italic">Guru</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Jupiter Status for {ascName}
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Transit Sign</p>
              <p className="text-lg">{currentRashi}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Active House</p>
              <p className="text-lg text-blue-400">House {currentHouse}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-bold text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{jupiterPos?.degree ? `${jupiterPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Motion</p>
              <p className="text-lg text-amber-400">{jupiterPos?.motion || "Direct"}</p>
            </div>
          </div>
        </section>

        {/* Client Component for Tabs */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="jupiter"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Professional Directory Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-bold mb-8 text-blue-950">
            {ascName} House-by-House Forecast
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/jupiter-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-tighter">View Impact</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-blue-700">House {h}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Silos */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex gap-6 text-blue-700 font-bold text-sm">
           <Link href="/saturn-transit" className="hover:underline">Saturn Transit →</Link>
           <Link href="/rahu-transit" className="hover:underline">Rahu Transit →</Link>
        </footer>

      </article>
    </div>
  );
}