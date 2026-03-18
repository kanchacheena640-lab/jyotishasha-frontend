import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import VedicNote from "@/components/VedicNote";
import DynamicTransitChart from "@/components/DynamicTransitChart";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";

const BACKEND = "https://jyotishasha-backend.onrender.com";
const currentYear = new Date().getFullYear();

/* ---------------- DATA FETCHING ---------------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=venus&house=${house}&lang=en`,
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
    title: `Venus Transit in ${houseNum} House for ${asc} Ascendant – Love & Luxury`,
    description: `Expert Vedic analysis of Venus (Shukra) transit ${currentYear} in House ${houseNum} for ${asc} rising. Discover shifts in relationships, wealth, and creative harmony.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/venus-transit/${params.ascendant}/house/${houseNum}`,
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */
export default async function VenusTransitHousePage({
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
        "name": `How does the Venus transit in ${houseNum} house affect ${ascTitle} rising?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${ascTitle} ascendant, Venus in the ${houseNum} house brings harmony, attraction, and financial comfort to the specific life domains governed by this house.`
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-rose-950/20 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100 overflow-hidden font-sans">
        
        {/* Modern Breadcrumb Silo */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href="/venus-transit" className="hover:text-rose-600 transition">Venus Hub</Link>
          <span className="text-slate-200">/</span>
          <Link href={`/venus-transit/${params.ascendant}`} className="hover:text-rose-600 transition">{ascTitle}</Link>
          <span className="text-slate-200">/</span>
          <span className="text-rose-600">House {houseNum}</span>
        </nav>

        {/* H1 - Aesthetic Authority */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight text-balance">
          Venus in <span className="text-rose-600">{houseNum} House</span> for {ascTitle} <span className="text-slate-300 font-light italic text-2xl md:text-4xl block md:inline">Rising</span>
        </h1>

        <VedicNote />

        {/* Visual Engine Section */}
        <div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-rose-50/40 p-8 rounded-[2rem] border border-rose-100 shadow-inner">
           <div className="shrink-0">
             <DynamicTransitChart 
                ascendant={params.ascendant} 
                activePlanet="venus" 
                house={houseNum} 
                size={300}
              />
           </div>
           <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Venusian Activation</h2>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                In Vedic astrology, <strong>Venus (Shukra)</strong> is the planet of pleasure and prosperity. Its transit in your {houseNum} house acts as a magnet for <strong>attraction, creative flow, and material comfort</strong>.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-xs font-black uppercase tracking-widest border border-rose-200">
                 Status: Abundance Frequency Phase
              </div>
           </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-12 prose prose-slate max-w-none">
           <p className="text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-rose-400 pl-6 italic">
             &quot;{data.summary}&quot;
           </p>
        </div>

        {/* Detailed Insights Grid */}
        <div className="space-y-8 mb-20">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-rose-100 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-rose-400 rounded-full group-hover:h-10 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-rose-500 mt-1.5 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Abundance vs Excess - Strategic Contrast */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-rose-50/50 border border-rose-100 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-3xl">💎</div>
            <h4 className="text-xl font-black mb-4 text-rose-900 uppercase tracking-widest text-sm font-serif italic">Magnetic Gains</h4>
            <ul className="space-y-4">
              {data.strengths.map((s: string, i: number) => (
                <li key={i} className="text-rose-800 font-bold leading-relaxed flex gap-3">
                  <span className="text-rose-400">♥</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50/30 border border-amber-100 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mb-6 text-amber-600 text-3xl">☁️</div>
            <h4 className="text-xl font-black mb-4 text-amber-900 uppercase tracking-widest text-sm">Indulgence Risks</h4>
            <ul className="space-y-4">
              {data.challenges.map((c: string, i: number) => (
                <li key={i} className="text-amber-800/80 font-bold leading-relaxed flex gap-3">
                  <span className="text-amber-400">♥</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Navigation Directory */}
        <div className="mt-12">
            <TransitInternalLinks
                planetName="Venus"
                planetSlug="venus-transit"
                ascendant={params.ascendant}
                currentHouse={houseNum}
            />
        </div>

        {/* High-Elegance Global CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-rose-600/30 via-transparent to-transparent opacity-50"></div>
          
          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight text-balance">
            Deserve the Best. <br/><span className="text-rose-400">Align Your Heart & Wealth.</span>
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            Venus transits determine the quality of your experiences. Without knowing your natal <strong>Shukra strength</strong>, its lordship, and your <strong>Mahadasha</strong> cycle, you might settle for less than your soul deserves. Get your precision love & wealth audit.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/personalized-transit-report?planet=venus&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-rose-600 text-white font-black px-12 py-5 rounded-full hover:bg-rose-500 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg"
            >
              Get My Relationship & Wealth Report →
            </Link>
            <Link
              href="/app-download"
              className="w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10"
            >
              Daily Beauty & Bliss Tips
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}