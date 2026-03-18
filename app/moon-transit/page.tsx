import type { Metadata } from "next";
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

export async function generateMetadata(): Promise<Metadata> {
  // Global SEO: Focus on Emotions, Mindset, and Daily Transit
  return getTransitMetadata("Moon", "moon-transit");
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
async function fetchMoonTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Moon transit data");
  return res.json();
}

/* ---------------- Page ---------------- */
export default async function MoonTransitPage() {
  const data = await fetchMoonTransit();

  const moonPos = data.positions?.Moon;
  const moonFuture = data.future_transits?.Moon || [];
  const currentTransit = moonFuture[0];

  /* FAQ Schema for Moon (Chandra) */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `How does Moon Transit ${currentYear} affect my mood?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Moon governs the mind and emotions. Its transit through different zodiac signs triggers changes in your emotional responses, subconscious thoughts, and daily comfort levels."
        }
      },
      {
        "@type": "Question",
        "name": "Why is the Moon transit important in Vedic Astrology?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In Vedic Astrology, the Moon (Chandra) is the most significant planet for daily life. It sets the mental frequency for the day and determines the timing of events through the Nakshatra system."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-indigo-950/20 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative border border-slate-100">
        
        {/* H1 - Emotional & Serene Hook */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-slate-950 tracking-tight">
          Moon Transit {currentYear} in {moonPos?.rashi} – <span className="text-indigo-600">Mind & Intuition</span>
        </h1>

        <aside className="mb-10">
          <VedicNote />
          <div className="flex gap-6 text-[10px] font-black text-blue-700 uppercase tracking-[0.2em] border-b border-slate-100 pb-4 mt-6">
            <Link href="#signs" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Daily Influence
            </Link>
            <Link href="#remedies" className="hover:text-blue-900 transition underline underline-offset-8">
              ↓ Vedic Remedies
            </Link>
          </div>
        </aside>

        {/* Intro Section */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Moon transit {currentYear}</strong> (Chandra Gochar) is the swiftest cosmic influence on our <strong>emotional well-being</strong>. In <strong>Vedic astrology</strong>, the Moon is the significator of the mind (Manas), motherhood, and mental peace. Its transit through <strong>{moonPos?.rashi}</strong> every 2.25 days acts as the celestial clock for our daily moods.
          </p>
          <p>
            Unlike outer planets, Moon transits are deeply personal. They govern our <strong>intuition, subconscious habits, and domestic harmony</strong>. Staying aligned with the lunar cycle helps in managing stress and timing daily activities effectively.
          </p>
        </div>

        {/* SNAPSHOT CARD - Technical Data */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <div className="absolute top-0 right-0 p-4 opacity-5">
            <span className="text-9xl font-black italic">Chandra</span>
          </div>
          
          <h2 className="text-xl font-bold mb-8 text-indigo-400 flex items-center gap-3 uppercase tracking-tighter">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></span>
            Live Moon Status
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Lunar Sign</p>
              <p className="text-2xl font-black">{moonPos?.rashi} <span className="text-indigo-400 font-medium text-lg">({moonPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Transit Motion</p>
              <p className="text-2xl font-black text-white italic">{moonPos?.motion}</p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Window Duration</p>
              <p className="text-base font-bold">
                {formatDate(currentTransit?.entering_date)} – {formatDate(currentTransit?.exit_date)}
              </p>
            </div>
          </div>
        </section>

        {/* ASCENDANT CARDS */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Moon"
            planetRashi={moonPos?.rashi}
            planetSlug="moon-transit"
          />
        </section>

        {/* REMEDIES - Peace & Grounding */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-slate-950">Chandra Peace & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h3 className="font-black text-indigo-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Chandra Beej Mantra</strong>: <em>"Om Som Somaye Namah"</em> for mental peace.</span></li>
                <li className="flex gap-3">🥛 <span>Offer water or milk to a Shiva Lingam or donate white items on <strong>Mondays</strong>.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
              <h3 className="font-black text-slate-900 mb-4 uppercase tracking-widest text-xs">Modern Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">💧 <span><strong>Hydration:</strong> Moon governs fluids. Keep yourself well-hydrated during heavy lunar transits.</span></li>
                <li className="flex gap-3">🧘 <span><strong>Grounding:</strong> Practice Moon Salutations (Chandra Namaskar) or meditation to stabilize fluctuating moods.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Planetary Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Mars", "Mercury", "Jupiter", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/moon-transit/${moonPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-indigo-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-slate-900 transition shadow-2xl shadow-indigo-200 hover:scale-105 active:scale-95"
            >
              Check My Daily Moon Vibe →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}