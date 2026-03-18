import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AscendantSunTransitClient from "@/components/transit/AscendantSunTransitClient";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

export const revalidate = 3600;
const currentYear = new Date().getFullYear();

/* ---------------- Configuration & Logic ---------------- */
const VENUS_HOUSE_TRAITS: Record<number, string> = {
  1: "charming personality, physical beauty, self-love and magnetism",
  2: "financial gains, sweet speech, family celebrations and luxury",
  3: "creative hobbies, pleasant short travels, harmonious siblings bond",
  4: "domestic comfort, luxury vehicle or home décor, emotional peace",
  5: "romantic bliss, creative sparks, joyful bond with progeny",
  6: "pleasant workplace, healing through art, balanced daily routine",
  7: "marital harmony, social grace, prosperous business partnerships",
  8: "hidden financial gains, deep intimacy, interest in occult beauty",
  9: "philosophical travel, grace in higher learning, spiritual abundance",
  10: "professional charm, career in arts or luxury, social status boost",
  11: "monetary gains, influential social circle, fulfillment of desires",
  12: "luxury in isolation, foreign pleasures, subconscious healing and dreams",
};

const ASCENDANTS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"] as const;
const RASHI_INDEX: Record<string, number> = { Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12 };
const RASHIS = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];

type AscendantSlug = (typeof ASCENDANTS)[number];
function isValidAscendant(a: string): a is AscendantSlug { return (ASCENDANTS as readonly string[]).includes(a); }
function titleCase(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
function getHouse(asc: string, rashi: string) { return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1; }

/* ---------------- Data Fetching ---------------- */
async function fetchVenusCurrent() {
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
    title: `Venus Transit ${currentYear} for ${ascName} Ascendant – Love & Wealth`,
    description: `Detailed Venus (Shukra) transit effects for ${ascName} Rising. Discover house-wise impacts on relationships, finances, and luxury in ${currentYear}.`,
    alternates: { canonical: `https://www.jyotishasha.com/venus-transit/${a}` },
  };
}

/* ---------------- Page Component ---------------- */
export default async function VenusTransitAscendantPage({ params, searchParams }: { params: { ascendant: string }; searchParams?: { lang?: string; house?: string }; }) {
  const ascendant = params.ascendant?.toLowerCase();
  if (!ascendant || !isValidAscendant(ascendant)) notFound();

  // Safety check for searchParams to avoid TS error
  const lang: "en" | "hi" = searchParams?.lang === "hi" ? "hi" : "en";
  const rawHouse = searchParams?.house ? Number(searchParams.house) : 1;
  const initialHouse = rawHouse >= 1 && rawHouse <= 12 ? rawHouse : 1;

  const current = await fetchVenusCurrent();
  const venusPos = current?.positions?.Venus;

  const ascName = titleCase(ascendant);
  const currentRashi = venusPos?.rashi || "Aries";
  const currentHouse = getHouse(ascName, currentRashi);
  const currentIndex = Math.max(0, RASHIS.indexOf(currentRashi));
  const previousRashi = currentIndex === 0 ? RASHIS[11] : RASHIS[currentIndex - 1];
  const previousHouse = getHouse(ascName, previousRashi);

  const initialData = await fetchTransitContent({ ascendant, planet: "venus", house: initialHouse, lang });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", "name": `How will Venus transit affect ${ascName} Rising?`, "acceptedAnswer": { "@type": "Answer", "text": `For ${ascName} Ascendant, Venus moves into ${currentRashi}, activating the ${currentHouse} house of love and material abundance.` } }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-rose-950/20 py-16 px-4">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 border border-slate-100 overflow-hidden relative">
        
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b pb-6">
          <h1 className="text-3xl md:text-5xl font-black leading-tight text-slate-950 tracking-tight">
            Venus Transit {currentYear} for <span className="text-rose-600">{ascName}</span> <span className="text-slate-550 font-light italic text-2xl md:text-3xl block md:inline">Rising</span>
          </h1>
          <Link href="/venus-transit" className="text-sm font-bold text-rose-700 uppercase tracking-widest hover:underline flex items-center gap-1">
            ← Back to Venus Hub
          </Link>
        </header>

        <VedicNote />

        {/* Visual Chart Integration */}
        <div className="my-12 flex justify-center">
          <DynamicTransitChart ascendant={ascendant} activePlanet="venus" house={currentHouse} size={340} />
        </div>

        {/* Intro Section with Dynamic Venus Traits */}
        <div className="prose prose-slate max-w-none mb-10">
          <p className="text-lg text-slate-700 leading-relaxed font-medium mb-4">
            The Venus transit (Shukra Gochar) brings a phase of <strong>harmony and material attraction</strong> for {ascName} Ascendant.
          </p>

          <h2 className="text-2xl font-bold text-rose-900 mb-4">
            Relationship & Wealth Shift: {previousRashi} → {currentRashi}
          </h2>

          <p className="text-lg text-slate-700 leading-relaxed font-medium">
            Venus, the planet of beauty, moves from your {previousHouse} house to the <strong>{currentHouse} house</strong>. 

            Your path of pleasure and abundance shifts from <strong>{VENUS_HOUSE_TRAITS[previousHouse]}</strong> toward the core themes of <strong>{VENUS_HOUSE_TRAITS[currentHouse]}</strong>. This is a time to cultivate grace and focus on luxury.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-8xl font-black italic">Shukra</span>
          </div>

          <h2 className="text-xl font-bold mb-6 text-rose-400 flex items-center gap-2 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></span>
            Venus Status Snapshot
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm relative z-10 font-medium">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Transit Sign</p>
              <p className="text-lg font-bold">{currentRashi}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Impact House</p>
              <p className="text-lg text-rose-400 font-bold">House {currentHouse}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Exact Degree</p>
              <p className="text-lg">{venusPos?.degree ? `${venusPos.degree}°` : "-"}</p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-1">Motion</p>
              <p className="text-[11px] font-bold text-slate-200">{venusPos?.motion || "Direct"}</p>
            </div>
          </div>
        </section>

        {/* Client Component */}
        <div className="mb-20">
          <AscendantSunTransitClient
            ascendant={ascendant}
            planet="venus"
            lang={lang}
            initialHouse={initialHouse}
            initialData={initialData}
          />
        </div>

        {/* Silo Directory Grid */}
        <section className="mt-20 border-t pt-12">
          <h2 className="text-3xl font-black mb-8 text-slate-950">
            {ascName} Abundance Map for Every House
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 12 }, (_, i) => i + 1).map((h) => (
              <Link
                key={h}
                href={`/venus-transit/${ascendant}/house/${h}`}
                className="group p-5 bg-slate-50 border border-slate-100 rounded-2xl hover:border-rose-500 hover:bg-white transition-all shadow-sm"
              >
                <p className="text-[10px] font-black text-rose-600 uppercase mb-1 tracking-tighter">View Pleasure</p>
                <p className="text-xl font-black text-slate-800 group-hover:text-rose-700 tracking-tight">House {h}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer Authority Links */}
        <footer className="mt-16 pt-8 border-t border-slate-100 flex flex-wrap gap-6 text-blue-700 font-bold text-sm uppercase tracking-wider">
           <Link href="/jupiter-transit" className="hover:underline">Jupiter Transit →</Link>
           <Link href="/mars-transit" className="hover:underline">Mars Transit →</Link>
           <Link href="/mercury-transit" className="hover:underline">Mercury Transit →</Link>
        </footer>

      </article>
    </div>
  );
}