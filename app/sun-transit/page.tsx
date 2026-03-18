import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Confidence, Vitality, and Soul Direction
  return getTransitMetadata("Sun", "sun-transit");
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
async function fetchSunTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Sun transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function SunTransitPage() {
  const data = await fetchSunTransit();

  const sunPos = data.positions?.Sun;
  const sunFuture = data.future_transits?.Sun || [];
  const currentTransit = sunFuture[0];

  /* FAQ Schema for Sun (Surya) - SEO Optimized */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `How does the Sun transit ${currentYear} affect my career?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Sun represents authority and leadership. Its transit influences your professional recognition, relationship with superiors, and overall confidence in making executive decisions."
        }
      },
      {
        "@type": "Question",
        "name": "What is the spiritual meaning of Sun Transit (Surya Gochar)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Spiritually, the Sun represents the Atma (Soul). Its transit indicates where you need to shine your light, take responsibility, and align with your higher purpose."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-amber-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Radiant & Confident Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Sun Transit {currentYear} in {sunPos?.rashi} – <span className="text-amber-600">Vitality & Power</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Forecast by Sign
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Surya Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Sun transit {currentYear}</strong> (Surya Gochar) marks a monthly recalibration of our <strong>inner light and authority</strong>. In <strong>Vedic astrology</strong>, the Sun is the King of the celestial cabinet, representing the Soul, leadership, and physical health. Its movement through <strong>{sunPos?.rashi}</strong> sets the seasonal tone for our ambitions.
          </p>
          <p>
            As the source of all energy, the Sun’s transit dictates our <strong>self-expression and social status</strong>. Understanding this cycle allows you to harness personal power, improve vitality, and navigate life with greater confidence.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical Authority UI */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Surya</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-amber-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></span>
            Current Sun (Surya) Position
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Sign</p>
              <p className="text-2xl font-black">{sunPos?.rashi} <span className="text-amber-400 font-medium text-lg">({sunPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-white italic">{sunPos?.motion}</p>
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
            planet="Sun"
            planetRashi={sunPos?.rashi}
            planetSlug="sun-transit"
          />
        </section>

        {/* REMEDIES - Energy & Leadership */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Sun Empowerment & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-amber-50 rounded-3xl border border-amber-100">
              <h3 className="font-black text-amber-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🪔 <span>Offer <strong>Arghya</strong> (Water) to the rising Sun daily to improve health and clarity.</span></li>
                <li className="flex gap-3">☀️ <span>Chant the <strong>Aditya Hridayam</strong> or Surya Beej Mantra: <em>"Om Hram Hreem Hroum Sah Suryaye Namah"</em>.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Modern Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">👔 <span><strong>Leadership:</strong> Focus on taking responsibility and leading by example during this month.</span></li>
                <li className="flex gap-3">🧘 <span><strong>Self-Care:</strong> Prioritize "Sun-gazing" or outdoor activities to boost natural Vitamin D and solar energy.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/sun-transit/${sunPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-amber-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-950 transition shadow-2xl shadow-amber-200 hover:scale-105 active:scale-95"
            >
              Check My Solar Alignment →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}