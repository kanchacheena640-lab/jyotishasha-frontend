import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;
const currentYear = new Date().getFullYear();

/* ---------------- Configuration & Logic ---------------- */
const SUN_HOUSE_TRAITS: Record<number, string> = {
  1: "confidence boost, physical vitality, leadership focus",
  2: "financial authority, family leadership, authoritative speech",
  3: "courageous initiatives, effective communication, short travels for work",
  4: "domestic leadership, focus on home and property, inner strength",
  5: "creative recognition, romantic confidence, focus on progeny",
  6: "victory over hurdles, disciplined health, professional authority",
  7: "focus on partnerships, social recognition, dynamic public image",
  8: "deep self-discovery, sudden transformations, occult research",
  9: "spiritual leadership, higher learning, travel for purpose",
  10: "career peak, public status, high-level professional authority",
  11: "social influence, networking with authority, gain fulfillment",
  12: "subconscious clarity, spiritual solitude, foreign recognition",
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
async function fetchSunCurrent() {
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
    title: `Sun Transit for ${ascName} Ascendant – Meaning & Effects`,
    description: `How will the Sun (Surya) transit affect ${ascName} Rising? Detailed Vedic house-wise analysis of confidence, career, and vitality shifts for ${currentYear}.`,
    alternates: { canonical: `https://www.jyotishasha.com/sun-transit/${a}` },
  };
}

/* ---------------- Page Component ---------------- */
export default async function SunTransitAscendantPage({ params, searchParams }: { params: { ascendant: string }; searchParams?: { lang?: string; house?: string }; }) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  // Safety check for searchParams to avoid TS error
  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;

  const current = await fetchSunCurrent();
  const sunPos = current?.positions?.Sun;
  const currentTransit = current?.future_transits?.Sun?.[0];

  const ascName = titleCase(ascendant);
  const currentRashi = sunPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);
  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi = currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];
  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({ ascendant, planet: "sun", house: initialHouse, lang });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", "name": `How does Sun transit affect ${ascName} Rising?`, "acceptedAnswer": { "@type": "Answer", "text": `For ${ascName} Ascendant, the Sun in ${currentRashi} activates the ${currentHouse} house of your chart, focusing on leadership and self-expression.` } }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100 overflow-hidden relative">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-950 tracking-tight">
            Sun Transit for <span className="text-amber-600">{ascName}</span> <span className="text-slate-300 font-light italic text-2xl md:text-3xl block md:inline">Rising</span>
          </h1>
          <Link href="/sun-transit" className="text-sm font-bold text-amber-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Global Hub
          </Link>
        </header>

        <VedicNote />

        {/* Visual Chart Integration */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart ascendant={ascendant} activePlanet="sun" house={currentHouse} size={340} />
        </div>

        {/* Intro Section with Dynamic Traits */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            The Sun transit (Surya Gochar) marks a powerful month of <strong>leadership and vital energy</strong> for {ascName} Ascendant.
          </p>

          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Solar Shift: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            The Sun moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>. 

            Your path of self-expression shifts from <strong>{SUN_HOUSE_TRAITS[previousHouse]}</strong> toward the core themes of <strong>{SUN_HOUSE_TRAITS[currentHouse]}</strong>. This is your time to shine and take responsibility.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Surya</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-amber-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            Solar Transit Snapshot
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Transit Sign</p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Impact House</p>
              <p className="text-lg text-amber-400 font-bold">House {currentHouse}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{sunPos?.degree ? `${sunPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Period</p>
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
            planet="sun"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Directory Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {ascName} Solar Path for Every House
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/sun-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-amber-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-amber-600 uppercase mb-1 tracking-tighter">Vitality Focus</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-amber-700 tracking-tight">House {h}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Authority Links */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-blue-700 font-bold text-sm uppercase tracking-wider">
           <Link href="/moon-transit" className="hover:underline">Moon Transit →</Link>
           <Link href="/mars-transit" className="hover:underline">Mars Transit →</Link>
           <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
        </footer>

      </article>
    </div>
  );
}