import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Energy, Ambition, and Action
  return getTransitMetadata("Mars", "mars-transit");
}

/* ---------------- Helpers ---------------- */
function formatDate(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ---------------- Data Fetch (Server Side) ---------------- */
async function fetchMarsTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Mars transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MarsTransitPage() {
  const data = await fetchMarsTransit();

  const marsPos = data.positions?.Mars;
  const marsFuture = data.future_transits?.Mars || [];
  const currentTransit = marsFuture[0];

  /* FAQ Schema for Mars (Mangal) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What are the effects of Mars Transit ${currentYear}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Mars transit, or Mangal Gochar, influences your energy levels, willpower, and ability to take action. It can trigger professional breakthroughs or conflicts depending on its house placement.`
        }
      },
      {
        "@type": "Question",
        "name": "How to handle Mars transit energy?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best way to channel Mars energy is through physical discipline, strategic planning, and avoiding impulsive reactions during heated situations."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-red-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Dynamic Action Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Mars Transit {currentYear} in {marsPos?.rashi} – <span className="text-red-600">Action & Courage</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Forecast by Sign
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Vedic Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Mars transit {currentYear}</strong> (Mangal Gochar) serves as a cosmic engine for <strong>ambition and drive</strong>. In <strong>Vedic astrology</strong>, Mars is the planet of willpower, physical vitality, and strategic action. Its movement through <strong>{marsPos?.rashi}</strong> shapes how we confront challenges and pursue our desires.
          </p>
          <p>
            As a planet of initiative, Mars governs our <strong>ability to compete and win</strong>. Understanding this transit helps in channeling raw energy into productive outcomes while avoiding burnout or unnecessary friction.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical Data */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Mangal</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-red-500 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Current Mars (Mangal) Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Active Sign</p>
              <p className="text-2xl font-black">{marsPos?.rashi} <span className="text-red-400 font-medium text-lg">({marsPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-amber-400">{marsPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Duration</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Mars"
            planetRashi={marsPos?.rashi}
            planetSlug="mars-transit"
          />
        </section>

        {/* REMEDIES - Strength & Balance */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Mars Discipline & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-red-50 rounded-3xl border border-red-100">
              <h3 className="font-black text-red-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🪔 <span>Chant the <strong>Mangal Beej Mantra</strong>: <em>"Om Kraam Kreem Kraum Sah Bhaumaye Namah"</em>.</span></li>
                <li className="flex gap-3">🔴 <span>Donate red lentils (Masoor Dal) or copper on <strong>Tuesdays</strong> to balance energy.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Practical Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🏃‍♂️ <span><strong>Physical Outlets:</strong> Channel Mars through intense exercise or sport to avoid irritability.</span></li>
                <li className="flex gap-3">⚔️ <span><strong>Conflict Control:</strong> Practice "pause before reacting" during heated discussions.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/mars-transit/${marsPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-slate-900 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-red-600 transition shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95"
            >
              Unlock Your Energy Map →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}