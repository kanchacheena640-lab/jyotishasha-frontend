import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Ambition, Karma, and North Node
  return getTransitMetadata("Rahu", "rahu-transit");
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
async function fetchRahuTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Rahu transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function RahuTransitPage() {
  const data = await fetchRahuTransit();

  const rahuPos = data.positions?.Rahu;
  const rahuFuture = data.future_transits?.Rahu || [];
  const currentTransit = rahuFuture[0];

  /* FAQ Schema for Rahu (North Node) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What is the significance of Rahu Transit ${currentYear}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Rahu transit ${currentYear}, also known as the North Node transit, represents a period of material ambition, sudden changes, and unconventional growth in Vedic astrology.`
        }
      },
      {
        "@type": "Question",
        "name": "How does Rahu affect career and desires?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rahu is the planet of obsession and innovation. Its transit can bring unexpected professional opportunities, foreign travels, or intense material desires depending on its house placement."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Powerful & Ambitious Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-indigo-950 tracking-tight">
          Rahu Transit {currentYear} in {rahuPos?.rashi} – <span className="text-indigo-600">Ambition & Karma</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Global Forecast
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Vedic Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Rahu transit {currentYear}</strong> (North Node transit) acts as a cosmic catalyst for <strong>material ambition and innovation</strong>. In <strong>Vedic astrology</strong>, Rahu represents the head of the dragon—focused on obsession, foreign influences, and sudden breakthroughs in the sign of <strong>{rahuPos?.rashi}</strong>.
          </p>
          <p>
            Often misunderstood as purely chaotic, Rahu’s movement is actually about <strong>karmic evolution</strong>. It pushes you beyond traditional boundaries, forcing a rethink of your worldly desires and life direction.
          </p>
        </div>

        {/* SNAPSHOT CARD - 10/10 Technical Data UI */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Rahu</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-indigo-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            Current North Node (Rahu) Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Current Sign</p>
              <p className="text-2xl font-black">{rahuPos?.rashi} <span className="text-indigo-400 font-medium text-lg">({rahuPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-amber-400">{rahuPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Cycle Window</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS - Detailed Results Grid */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Rahu"
            planetRashi={rahuPos?.rashi}
            planetSlug="rahu-transit"
          />
        </section>

        {/* REMEDIES - Focus & Balance */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-indigo-950">Rahu Discipline & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h3 className="font-black text-indigo-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Rahu Beej Mantra</strong>: <em>"Om Raam Rahave Namah"</em> to clear illusions.</span></li>
                <li className="flex gap-3">🌑 <span>Donate <strong>Black Cloth or Mustard Oil</strong> to balance material obsession.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Practical Grounding</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🧘 <span><strong>Meditation:</strong> Rahu creates smoke; meditation provides the clarity needed to see through it.</span></li>
                <li className="flex gap-3">🚫 <span><strong>Avoid Shortcuts:</strong> Stay away from impulsive risks or unethical gain during this cycle.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/rahu-transit/${rahuPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-900 transition shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              Unlock Your Rahu Karma Map →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}