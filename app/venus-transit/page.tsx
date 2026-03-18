import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Love, Wealth, and Creative Expression
  return getTransitMetadata("Venus", "venus-transit");
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
async function fetchVenusTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Venus transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function VenusTransitPage() {
  const data = await fetchVenusTransit();

  const venusPos = data.positions?.Venus;
  const venusFuture = data.future_transits?.Venus || [];
  const currentTransit = venusFuture[0];

  /* FAQ Schema for Venus (Shukra) - SEO Optimized */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `How does Venus transit ${currentYear} influence love and marriage?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Venus is the primary significator of relationships. Its transit determines the period of harmony, attraction, and potential for new romantic beginnings or marital stability."
        }
      },
      {
        "@type": "Question",
        "name": "What is the impact of Shukra Gochar on wealth and luxury?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Vedic astrology, Venus governs material comforts. A favorable Venus transit can bring financial gains, luxury purchases, and an increased desire for creative and artistic pursuits."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-pink-950/10 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Elegant & Aesthetic Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Venus Transit {currentYear} in {venusPos?.rashi} – <span className="text-pink-600">Love & Abundance</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Relationship Forecast
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Shukra Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Venus transit {currentYear}</strong> (Shukra Gochar) acts as a celestial invitation toward <strong>harmony and material pleasure</strong>. In <strong>Vedic astrology</strong>, Venus is the planet of beauty, romance, art, and the finer things in life. Its passage through <strong>{venusPos?.rashi}</strong> colors our social interactions and financial appetite.
          </p>
          <p>
            As the significator of <strong>marital bliss and creativity</strong>, Venus’s movement helps us understand when to focus on building bridges in relationships and when to invest in personal comfort and artistic growth.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical Aesthetic UI */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Shukra</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-pink-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></span>
            Current Venus (Shukra) Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Sign</p>
              <p className="text-2xl font-black">{venusPos?.rashi} <span className="text-pink-400 font-medium text-lg">({venusPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-white italic">{venusPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Active Cycle</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Venus"
            planetRashi={venusPos?.rashi}
            planetSlug="venus-transit"
          />
        </section>

        {/* REMEDIES - Beauty & Balance */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Venus Harmony & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-pink-50 rounded-3xl border border-pink-100">
              <h3 className="font-black text-pink-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Shukra Beej Mantra</strong>: <em>"Om Shum Shukraye Namah"</em> for attraction.</span></li>
                <li className="flex gap-3">🤍 <span>Donate white items (rice, white sweets, or silk) on <strong>Fridays</strong> to boost prosperity.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Modern Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🎨 <span><strong>Creative Flow:</strong> Use this transit to start an artistic project or redecorate your space.</span></li>
                <li className="flex gap-3">🕊️ <span><strong>Relationship Hygiene:</strong> Practice active listening and empathy to clear past relationship blocks.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100 pb-10">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/venus-transit/${venusPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-pink-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-900 transition shadow-2xl shadow-pink-200 hover:scale-105 active:scale-95"
            >
              Unlock Your Romance Forecast →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}