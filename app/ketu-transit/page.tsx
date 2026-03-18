// app/ketu-transit/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";


export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Ensure your SEO lib includes "South Node" & "Vedic Astrology" in description
  return getTransitMetadata("Ketu", "ketu-transit");
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

/* ---------------- Data Fetch ---------------- */
async function fetchKetuTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function KetuTransitPage() {
  const data = await fetchKetuTransit();

  const ketuPos = data.positions?.Ketu;
  const ketuFuture = data.future_transits?.Ketu || [];
  const currentTransit = ketuFuture[0];
  const nextTransit = ketuFuture[1];

  /* FAQ Schema for Google Rich Snippets (Dynamic + SEO Optimized) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `What is the meaning of Ketu Transit ${currentYear} in astrology?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: `Ketu transit ${currentYear}, also known as South Node transit, represents a phase of detachment, karmic release, and spiritual transformation in astrology.`,
        },
      },
      {
        "@type": "Question",
        name: "What are the effects of Ketu transit in astrology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ketu transit effects include detachment, sudden changes, emotional shifts, and inner transformation depending on its placement in the birth chart.",
        },
      },
      {
        "@type": "Question",
        name: "What is Ketu gochar in Vedic astrology?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ketu gochar refers to the movement of Ketu through zodiac signs, influencing karmic patterns, detachment, and spiritual awareness in Vedic astrology.",
        },
      },
      {
        "@type": "Question",
        name: "Is Ketu (South Node) transit always negative?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ketu transit is not always negative. While it brings detachment, it is also a powerful period for healing, meditation, and breaking unhealthy patterns.",
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-blue-900 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">
        
        {/* H1 - Targeted Keywords */}
        <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight text-blue-950">
          Ketu Transit {currentYear} in {ketuPos?.rashi} (South Node) – Meaning, Effects & Remedies
        </h1>

        <aside className="mb-10">
          {/* Vedic Note Component */}
          <VedicNote />

          {/* Navigation Links */}
          <div className="flex gap-6 text-xs font-bold text-blue-700 uppercase tracking-widest border-b pb-4 mt-4">
            <Link
              href="#signs"
              className="hover:text-blue-900 transition underline underline-offset-4"
            >
              ↓ Results for All Signs
            </Link>

            <Link
              href="#remedies"
              className="hover:text-blue-900 transition underline underline-offset-4"
            >
              ↓ Vedic Remedies
            </Link>
          </div>
        </aside>

        {/* Hook & Intro */}
        <div className="space-y-6 text-lg text-slate-700 leading-relaxed mb-12">
          <p>
            The <strong>Ketu transit {currentYear}</strong> in <strong>{ketuPos?.rashi}</strong> is a cosmic reset button. In <strong>Vedic astrology</strong>, Ketu (South Node) is the planet of <strong>Moksha</strong> and detachment. Its movement through the zodiac highlights <strong>karmic patterns</strong> and forces us to release what no longer serves our growth.
          </p>
          <p>
            Often called <strong>Ketu Gochar</strong>, this phase brings a deeply introspective energy, encouraging <strong>spiritual awakening</strong> and clarity by stripping away material illusions.
          </p>
          <p>
            In astrology, Ketu transit meaning is linked with detachment, karmic release, and inner transformation.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical SEO Data */}
        <section className="bg-slate-900 rounded-2xl p-8 mb-16 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black">2026</span>
          </div>
          <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
            Current South Node Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-sm relative z-10">
            <div>
              <p className="text-slate-400 uppercase font-bold text-[10px] tracking-widest mb-1">Transit Planet</p>
              <p className="text-xl font-semibold">Ketu (South Node)</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase font-bold text-[10px] tracking-widest mb-1">Current Sign</p>
              <p className="text-xl font-semibold">{ketuPos?.rashi} ({ketuPos?.degree}°)</p>
            </div>
            <div>
              <p className="text-slate-400 uppercase font-bold text-[10px] tracking-widest mb-1">Motion Type</p>
              <p className="text-xl font-semibold text-amber-400">{ketuPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-3 border-t border-slate-700 pt-4">
              <p className="text-slate-400 uppercase font-bold text-[10px] tracking-widest mb-1">Transit Period</p>
              <p className="text-lg">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>
        <p className="text-sm text-slate-500 mt-4 mb-12">
          This page explains Ketu transit in {ketuPos?.rashi}, including its meaning, effects, and remedies in astrology.
        </p>

        {/* EFFECTS SECTION */}
        <section id="signs" className="mb-20 scroll-mt-10">
          <AscendantTransitCards
            planet="Ketu"
            planetRashi={ketuPos?.rashi}
            planetSlug="ketu-transit"
          />
        </section>

        {/* WHY IT MATTERS - Deep Insight */}
        <section className="mb-16 p-8 bg-slate-50 rounded-3xl border border-slate-100">
          <h2 className="text-2xl font-bold mb-4">Why the South Node Transit Matters</h2>
          <p className="text-slate-700 leading-relaxed mb-4">
            In astrology, <strong>Ketu transit effects</strong> are linked to <strong>subconscious healing</strong>. While it may create temporary confusion in material goals, it excels in bringing hidden strengths to the surface. Depending on your <strong>birth chart</strong>, this transit is the perfect time for research, therapy, and solitude.
          </p>
        </section>

        {/* REMEDIES - Hybrid Style (Ancient + Modern) */}
        <section id="remedies" className="mb-16 scroll-mt-10">
          <h2 className="text-3xl font-bold mb-8">Vedic Remedies & Mindfulness Practices</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 bg-blue-50 rounded-2xl">
              <h3 className="font-bold text-blue-900 mb-4 uppercase tracking-wider text-sm">Ancient Vedic Logic</h3>
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">🕉️ <span>Chant the <strong>Ketu Mantra</strong>: <em>"Om Kem Ketave Namah"</em> for mental stability.</span></li>
                <li className="flex gap-3">🦴 <span>Feed street dogs or donate grey blankets to balance karmic debt.</span></li>
              </ul>
            </div>
            <div className="p-6 bg-indigo-50 rounded-2xl">
              <h3 className="font-bold text-indigo-900 mb-4 uppercase tracking-wider text-sm">Modern Intuitive Approach</h3>
              <ul className="space-y-4 text-slate-700">
                <li className="flex gap-3">📵 <span>Practice <strong>Digital Detox</strong>: Ketu thrives in silence, away from screen noise.</span></li>
                <li className="flex gap-3">🧘 <span><strong>Vipassana Meditation:</strong> Use this energy for deep subconscious healing.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* AUTHORITY & INTERNAL LINKS */}
        <footer className="mt-20 pt-10 border-t border-slate-100">
          <div className="flex flex-wrap gap-4 text-sm font-bold text-blue-700 mb-8 uppercase tracking-tighter">
            {["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:underline opacity-60 hover:opacity-100">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <p className="text-xs text-slate-400 italic">
            Prepared using high-precision ephemeris data (Lahiri Ayanamsa). Astrology is a tool for personal strategy; results depend on your <strong>Mahadasha</strong> and planetary dignity.
          </p>

          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/ketu-transit/${ketuPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-blue-700 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-800 transition shadow-[0_10px_30px_rgba(29,78,216,0.3)] hover:scale-105 active:scale-95"
            >
              Get Your Detailed Ketu Analysis →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}