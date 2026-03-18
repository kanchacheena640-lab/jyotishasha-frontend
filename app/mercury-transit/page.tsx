import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Intellect, Business, and Communication
  return getTransitMetadata("Mercury", "mercury-transit");
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
async function fetchMercuryTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Mercury transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MercuryTransitPage() {
  const data = await fetchMercuryTransit();

  const mercuryPos = data.positions?.Mercury;
  const mercuryFuture = data.future_transits?.Mercury || [];
  const currentTransit = mercuryFuture[0];

  /* FAQ Schema for Mercury (Budh) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `How does Mercury Transit ${currentYear} affect business?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mercury is the significator of commerce. Its transit influences market trends, negotiation skills, and the success of new contracts or business ventures."
        }
      },
      {
        "@type": "Question",
        "name": "What is the impact of Mercury Gochar on communication?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Mercury transit shapes how we express ideas. A positive transit enhances clarity and logic, while a retrograde or weak Mercury can cause technological glitches or misunderstandings."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-emerald-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Intellectual & Sharp Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Mercury Transit {currentYear} in {mercuryPos?.rashi} – <span className="text-emerald-600">Speech & Logic</span>
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
            The <strong>Mercury transit {currentYear}</strong> (Budh Gochar) acts as the cosmic filter for our <strong>intellect and commerce</strong>. In <strong>Vedic astrology</strong>, Mercury governs the nervous system, speech, logic, and analytical abilities. Its transit through <strong>{mercuryPos?.rashi}</strong> dictates the efficiency of our daily transactions and mental clarity.
          </p>
          <p>
            Known as the "Messenger of the Gods," Mercury’s influence is vital for <strong>students, traders, and communicators</strong>. Understanding its movement helps in timing important meetings, signing contracts, and navigating technological shifts.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical Data */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Budh</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-emerald-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Current Mercury (Budh) Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Current Sign</p>
              <p className="text-2xl font-black">{mercuryPos?.rashi} <span className="text-emerald-400 font-medium text-lg">({mercuryPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-amber-400">{mercuryPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Cycle Period</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Mercury"
            planetRashi={mercuryPos?.rashi}
            planetSlug="mercury-transit"
          />
        </section>

        {/* REMEDIES - Focus & Communication */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Mercury Clarity & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-emerald-50 rounded-3xl border border-emerald-100">
              <h3 className="font-black text-emerald-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Budh Beej Mantra</strong>: <em>"Om Braam Breem Braum Sah Budhaye Namah"</em>.</span></li>
                <li className="flex gap-3">🌱 <span>Donate <strong>Green Moong Dal</strong> or support a student&apos;s education on <strong>Wednesdays</strong>.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Practical Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📝 <span><strong>Documentation:</strong> Double-check all emails and legal papers during Mercury transits.</span></li>
                <li className="flex gap-3">🤐 <span><strong>Mindful Speech:</strong> Practice silence or "Maun" to conserve mental energy and improve focus.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mars", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/mercury-transit/${mercuryPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-slate-900 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-emerald-600 transition shadow-2xl shadow-slate-200 hover:scale-105 active:scale-95"
            >
              Unlock Your Mental Map →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}