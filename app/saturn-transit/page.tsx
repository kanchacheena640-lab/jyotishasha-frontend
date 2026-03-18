import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Karma, Discipline, and Long-term Restructuring
  return getTransitMetadata("Saturn", "saturn-transit");
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
async function fetchSaturnTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Saturn transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SaturnTransitPage() {
  const data = await fetchSaturnTransit();

  const saturnPos = data.positions?.Saturn;
  const saturnFuture = data.future_transits?.Saturn || [];
  const currentTransit = saturnFuture[0];

  /* FAQ Schema for Saturn (Shani) - SEO Optimized */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `How long does Saturn transit ${currentYear} last?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Saturn is the slowest moving planet, staying in one zodiac sign for approximately 2.5 years. This transit focuses on long-term discipline and karmic rewards."
        }
      },
      {
        "@type": "Question",
        "name": "What are the effects of Shani Gochar (Saturn Transit)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Saturn transit triggers periods of hard work, restructuring, and maturity. It tests your patience but ultimately provides lasting stability and growth."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-950 to-slate-900 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Grounded & Authoritative Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Saturn Transit {currentYear} in {saturnPos?.rashi} – <span className="text-slate-600">Karma & Mastery</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Saturn Forecast
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Shani Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Saturn transit {currentYear}</strong> (Shani Gochar) is a profound phase of <strong>karmic evaluation and restructuring</strong>. In <strong>Vedic astrology</strong>, Saturn is the planet of justice, time, and endurance. Its slow transit through <strong>{saturnPos?.rashi}</strong> represents a rigorous audit of our life’s foundations.
          </p>
          <p>
            Often feared, Saturn is actually the "Great Teacher." This transit isn't about punishment, but about <strong>mastery through discipline</strong>. It forces us to slow down, take responsibility, and build something that lasts.
          </p>
        </div>

        {/* SNAPSHOT CARD - Professional Technical Data */}
        <section className="bg-slate-950 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Shani</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-slate-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></span>
            Current Saturn (Shani) Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Sign</p>
              <p className="text-2xl font-black">{saturnPos?.rashi} <span className="text-slate-400 font-medium text-lg">({saturnPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-amber-500">{saturnPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Window</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Saturn"
            planetRashi={saturnPos?.rashi}
            planetSlug="saturn-transit"
          />
        </section>

        {/* REMEDIES - Discipline & Service */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Vedic Mastery & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-slate-100 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Shani Beej Mantra</strong>: <em>"Om Sham Shanicharaya Namah"</em> for patience.</span></li>
                <li className="flex gap-3">⚖️ <span>Practice <strong>Seva</strong>: Serving the elderly or underprivileged aligns you with Shani&apos;s grace.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100">
              <h3 className="font-black text-blue-900 mb-4 uppercase tracking-widest text-xs">Practical Strategy</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🏗️ <span><strong>Foundation Building:</strong> Focus on long-term projects rather than quick results.</span></li>
                <li className="flex gap-3">🐢 <span><strong>Patience:</strong> Accept delays as opportunities for refinement rather than obstacles.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Explore Planetary Cycles</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/saturn-transit/${saturnPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-slate-950 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-600 transition shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95"
            >
              Master Your Karma Map →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}