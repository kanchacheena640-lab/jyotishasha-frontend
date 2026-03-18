import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";

const BACKEND = "https://jyotishasha-backend.onrender.com";
const currentYear = new Date().getFullYear();

/* ---------------- DATA FETCHING ---------------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=ketu&house=${house}&lang=en`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------------- SEO & METADATA ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string };
}): Promise<Metadata> {
  const houseNum = Number(params.house);
  const asc = params.ascendant.charAt(0).toUpperCase() + params.ascendant.slice(1);

  return {
    title: `Ketu Transit in ${houseNum} House for ${asc} Ascendant – Meaning & Effects`,
    description: `Detailed analysis of Ketu transit ${currentYear} in House ${houseNum} for ${asc} rising. Understand the karmic effects, spiritual shifts, and remedies as per Vedic Astrology.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/ketu-transit/${params.ascendant}/house/${houseNum}`,
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */
export default async function KetuTransitHousePage({
  params,
}: {
  params: { ascendant: string; house: string };
}) {
  const houseNum = Number(params.house);
  if (!houseNum || houseNum < 1 || houseNum > 12) notFound();

  const data = await fetchTransit(params.ascendant, houseNum);
  if (!data) notFound();

  const ascTitle = params.ascendant.charAt(0).toUpperCase() + params.ascendant.slice(1);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What are the effects of Ketu in ${houseNum} house for ${ascTitle}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${ascTitle} ascendant, Ketu transit in House ${houseNum} triggers a phase of karmic detachment, intuitive growth, and internal shifts in areas governed by this house.`
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-gray-950 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">
        
        {/* Modern Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href="/ketu-transit" className="hover:text-blue-600 transition">Ketu Hub</Link>
          <span className="text-slate-200">/</span>
          <Link href={`/ketu-transit/${params.ascendant}`} className="hover:text-blue-600 transition">{ascTitle}</Link>
          <span className="text-slate-200">/</span>
          <span className="text-blue-600">House {houseNum}</span>
        </nav>

        {/* H1 - Authority & Target Keyword */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          Ketu in <span className="text-blue-600">{houseNum} House</span> for {ascTitle} <span className="text-slate-550 font-light italic">Rising (Lagna)</span>
        </h1>

        <VedicNote />

        {/* Transit Visualizer */}
        <div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-100">
           <div className="shrink-0">
             <DynamicTransitChart 
                ascendant={params.ascendant} 
                activePlanet="ketu" 
                house={houseNum} 
                size={300}
              />
           </div>
           <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-800">Current House Activation</h2>
              <p className="text-slate-600 leading-relaxed font-medium">
                In Vedic astrology, House {houseNum} represents critical life themes. With Ketu transiting here, the focus shifts toward <strong>subconscious clearing</strong> and finding truth beyond material desires.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest">
                 Status: Karmic Activation
              </div>
           </div>
        </div>

        {/* Detailed Sections Grid */}
        <div className="space-y-8 mb-20">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 text-blue-950 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-blue-600 rounded-full group-hover:h-8 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-4">
                {sec.points.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-blue-500 mt-1.5 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Opportunities vs Challenges - High Contrast */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-emerald-50/50 border border-emerald-100 rounded-[2rem] p-10">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 text-emerald-600 text-2xl">✨</div>
            <h4 className="text-xl font-black mb-4 text-emerald-900 uppercase tracking-widest text-sm">Divine Growth</h4>
            <ul className="space-y-4">
              {data.strengths.map((s: string, i: number) => (
                <li key={i} className="text-emerald-800/80 font-medium leading-relaxed flex gap-2">
                  <span>•</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/50 border border-rose-100 rounded-[2rem] p-10">
            <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-2xl">🚩</div>
            <h4 className="text-xl font-black mb-4 text-rose-900 uppercase tracking-widest text-sm">Karmic Tests</h4>
            <ul className="space-y-4">
              {data.challenges.map((c: string, i: number) => (
                <li key={i} className="text-rose-800/80 font-medium leading-relaxed flex gap-2">
                  <span>•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Global Conversion Footer CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent opacity-50"></div>
          
          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            How will Ketu manifest in <span className="text-blue-400">Your</span> Chart?
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            Ketu transits are highly individual. Depending on your <strong>Mahadasha</strong> and natal placements, these effects can range from spiritual bliss to deep confusion.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/personalized-transit-report?planet=ketu&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-blue-600 text-white font-black px-12 py-5 rounded-full hover:bg-blue-700 transition-all shadow-2xl hover:scale-105 active:scale-95"
            >
              Unlock Your Karma Map →
            </Link>
            <Link
              href="/app-download"
              className="w-full md:w-auto bg-white/10 backdrop-blur-md text-white font-black px-12 py-5 rounded-full hover:bg-white/20 transition-all border border-white/10"
            >
              Get Daily Transit Alerts
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}