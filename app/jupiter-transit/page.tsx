import type { Metadata } from "next"; // No "use client" at the top
import Link from "next/link";
import AscendantTransitCards from "@/components/transit/AscendantTransitCards";
import { getTransitMetadata } from "@/lib/seo/transitSeo";
import VedicNote from "@/components/VedicNote";

export const revalidate = 3600;

const currentYear = new Date().getFullYear();

// ✅ Now this will work perfectly for SEO
export async function generateMetadata(): Promise<Metadata> {
  return getTransitMetadata("Jupiter", "jupiter-transit");
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
async function fetchJupiterTransit() {
  const res = await fetch(
    "https://jyotishasha-backend.onrender.com/api/transit/current",
    { next: { revalidate: 3600 } }
  );
  if (!res.ok) throw new Error("Failed to fetch Jupiter transit data");
  return res.json();
}

/* ---------------- Page (Server Component) ---------------- */
export default async function JupiterTransitPage() {
  const data = await fetchJupiterTransit();
  const jupiterPos = data.positions?.Jupiter;
  const jupiterFuture = data.future_transits?.Jupiter || [];
  const currentTransit = jupiterFuture[0];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What is the significance of Jupiter Transit ${currentYear}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Jupiter transit ${currentYear}, known as Guru Gochar, represents expansion, financial growth, and spiritual wisdom in Vedic astrology.`
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-blue-900 py-16 px-4">
      {/* JSON-LD Schema (Good for SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-12 py-16 shadow-2xl text-slate-900 overflow-hidden relative">
        
        {/* H1 */}
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight text-blue-950 tracking-tight">
          Jupiter Transit {currentYear} in {jupiterPos?.rashi} – <span className="text-blue-600">Growth & Fortune</span>
        </h1>

        <aside className="mb-10">
          {/* ✅ This child component can be a Client Component */}
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

        {/* Intro */}
        <div className="prose prose-slate max-w-none text-lg text-slate-700 leading-relaxed mb-12 font-medium">
          <p>
            The <strong>Jupiter transit {currentYear}</strong> (Guru Gochar) is the most auspicious event in <strong>Vedic astrology</strong>.
          </p>
        </div>

        {/* Snapshot Section */}
        <section className="bg-slate-900 rounded-[2rem] p-8 mb-16 text-white shadow-2xl relative overflow-hidden border border-white/5">
          <h2 className="text-xl font-bold mb-8 text-blue-400 flex items-center gap-3 uppercase tracking-tighter">
            Current Jupiter Position
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 text-sm relative z-10">
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Current Sign</p>
              <p className="text-2xl font-black">{jupiterPos?.rashi} <span className="text-blue-400 font-medium text-lg">({jupiterPos?.degree}°)</span></p>
            </div>
            <div>
              <p className="text-slate-500 uppercase font-black text-[10px] tracking-widest mb-2">Motion</p>
              <p className="text-2xl font-black text-amber-400">{jupiterPos?.motion}</p>
            </div>
          </div>
        </section>

        {/* ✅ Interactive Component */}
        <section id="signs" className="mb-20">
          <AscendantTransitCards
            planet="Jupiter"
            planetRashi={jupiterPos?.rashi}
            planetSlug="jupiter-transit"
          />
        </section>

        {/* REMEDIES - Modern Vedic Layout */}
        <section id="remedies" className="mb-20 scroll-mt-20">
          <h2 className="text-3xl font-black mb-8 text-blue-950">Spiritual Growth & Remedies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-blue-50 rounded-3xl border border-blue-100">
              <h3 className="font-black text-blue-900 mb-4 uppercase tracking-widest text-xs">Vedic Propitiation</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">📿 <span>Chant the <strong>Guru Beej Mantra</strong>: <em>"Om Brim Brihaspataye Namah"</em> for abundance.</span></li>
                <li className="flex gap-3">💛 <span>Donate yellow items (chana dal, turmeric) or honey on <strong>Thursdays</strong>.</span></li>
              </ul>
            </div>
            <div className="p-8 bg-indigo-50 rounded-3xl border border-indigo-100">
              <h3 className="font-black text-indigo-900 mb-4 uppercase tracking-widest text-xs">Modern Alignment</h3>
              <ul className="space-y-4 text-slate-700 text-sm font-medium">
                <li className="flex gap-3">🎓 <span><strong>Upskilling:</strong> Jupiter thrives in learning. Start a new course or certification.</span></li>
                <li className="flex gap-3">🧘 <span><strong>Ethical Living:</strong> Focus on gratitude and honesty to align with Guru&apos;s energy.</span></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Footer Authority & Silo Linking */}
        <footer className="mt-20 pt-12 border-t border-slate-100">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Explore Other Transits</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-black text-blue-700">
            {["Sun", "Moon", "Mars", "Mercury", "Venus", "Saturn", "Rahu", "Ketu"].map((p) => (
              <Link key={p} href={`/${p.toLowerCase()}-transit`} className="hover:text-blue-900 hover:underline">
                {p} Transit →
              </Link>
            ))}
          </div>
          
          <div className="mt-12 text-center md:text-left">
            <Link
              href={`/jupiter-transit/${jupiterPos?.rashi?.toLowerCase()}`}
              className="inline-block bg-blue-600 text-white px-12 py-5 rounded-full font-black text-lg hover:bg-blue-700 transition shadow-2xl shadow-blue-200 hover:scale-105 active:scale-95"
            >
              Get Your {currentYear} Fortune Forecast →
            </Link>
          </div>
        </footer>

      </article>
    </div>
  );
}