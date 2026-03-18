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
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=saturn&house=${house}&lang=en`,
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
    title: `Saturn Transit in ${houseNum} House for ${asc} Ascendant – Karma & Discipline`,
    description: `Expert Vedic analysis of Saturn (Shani) transit ${currentYear} in House ${houseNum} for ${asc} rising. Understand the karmic shifts, responsibilities, and long-term mastery.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/saturn-transit/${params.ascendant}/house/${houseNum}`,
    },
  };
}

/* ---------------- PAGE COMPONENT ---------------- */
export default async function SaturnTransitHousePage({
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
        "name": `What are the effects of Saturn transit in ${houseNum} house for ${ascTitle}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${ascTitle} ascendant, Saturn in the ${houseNum} house brings a period of restructuring, hard work, and long-term stabilization in the life sectors governed by this house.`
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-950 py-12 md:py-20 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-[2.5rem] px-6 md:px-16 py-16 shadow-2xl text-slate-900 relative border border-slate-100">
        
        {/* Modern Breadcrumb Silo */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-10 border-b border-slate-50 pb-6">
          <Link href="/saturn-transit" className="hover:text-slate-600 transition">Saturn Hub</Link>
          <span className="text-slate-200">/</span>
          <Link href={`/saturn-transit/${params.ascendant}`} className="hover:text-slate-600 transition">{ascTitle}</Link>
          <span className="text-slate-200">/</span>
          <span className="text-slate-600">House {houseNum}</span>
        </nav>

        {/* H1 - Architectural Authority */}
        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-[1.1] text-slate-950 tracking-tight">
          Saturn in <span className="text-slate-600">{houseNum} House</span> for {ascTitle} <span className="text-slate-550 font-light italic text-2xl md:text-4xl block md:inline">Rising</span>
        </h1>

        <VedicNote />

        {/* Visual Engine Section */}
        <div className="my-16 flex flex-col md:flex-row items-center gap-12 bg-slate-50 p-8 rounded-[2rem] border border-slate-200 shadow-inner">
           <div className="shrink-0">
             <DynamicTransitChart 
                ascendant={params.ascendant} 
                activePlanet="saturn" 
                house={houseNum} 
                size={300}
              />
           </div>
           <div className="space-y-4">
              <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Structural Audit</h2>
              <p className="text-slate-600 leading-relaxed font-medium text-lg">
                In Vedic astrology, <strong>Saturn (Shani)</strong> is the Taskmaster. Its transit in your {houseNum} house initiates a <strong>cycle of discipline, heavy responsibility, and the building of permanent foundations</strong>.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-200 text-slate-700 rounded-full text-xs font-black uppercase tracking-widest border border-slate-300">
                 Status: Karmic Mastery Phase
              </div>
           </div>
        </div>

        {/* Executive Summary */}
        <div className="mb-12 prose prose-slate max-w-none">
           <p className="text-xl text-slate-700 leading-relaxed font-medium border-l-4 border-slate-900 pl-6 italic">
             &quot;{data.summary}&quot;
           </p>
        </div>

        {/* Detailed Insights Grid */}
        <div className="space-y-8 mb-20">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="group p-8 md:p-10 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300">
              <h3 className="text-2xl font-black mb-6 text-slate-900 flex items-center gap-3">
                <span className="w-1.5 h-6 bg-slate-900 rounded-full group-hover:h-10 transition-all"></span>
                {sec.heading}
              </h3>
              <ul className="space-y-5">
                {sec.points.map((p: string, j: number) => (
                  <li key={j} className="flex gap-4 text-slate-700 text-lg leading-relaxed">
                    <span className="text-slate-900 mt-1.5 shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Foundations vs Pressure - Strategic Contrast */}
        <div className="grid md:grid-cols-2 gap-8 mt-16 pb-20 border-b border-slate-100">
          <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-slate-200 rounded-2xl flex items-center justify-center mb-6 text-slate-600 text-3xl">🏛️</div>
            <h4 className="text-xl font-black mb-4 text-slate-900 uppercase tracking-widest text-sm font-serif italic">Lasting Mastery</h4>
            <ul className="space-y-4">
              {data.strengths.map((s: string, i: number) => (
                <li key={i} className="text-slate-800 font-bold leading-relaxed flex gap-3">
                  <span className="text-slate-400">▣</span> {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50/30 border border-rose-100 rounded-[2.5rem] p-10">
            <div className="w-14 h-14 bg-rose-100 rounded-2xl flex items-center justify-center mb-6 text-rose-600 text-3xl">⚖️</div>
            <h4 className="text-xl font-black mb-4 text-rose-900 uppercase tracking-widest text-sm">Heavy Responsibility</h4>
            <ul className="space-y-4">
              {data.challenges.map((c: string, i: number) => (
                <li key={i} className="text-rose-800/80 font-bold leading-relaxed flex gap-3">
                  <span className="text-rose-400">▣</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Internal Navigation Directory */}
        <div className="mt-12">
            <TransitInternalLinks
                planetName="Saturn"
                planetSlug="saturn-transit"
                ascendant={params.ascendant}
                currentHouse={houseNum}
            />
        </div>

        {/* High-Impact Global CTA */}
        <div className="mt-20 bg-slate-950 rounded-[3.5rem] p-8 md:p-16 text-white text-center shadow-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-slate-600/20 via-transparent to-transparent opacity-50"></div>
          
          <h3 className="text-3xl md:text-5xl font-black mb-6 relative z-10 leading-tight">
            Karma Doesn&apos;t Negotiate. <br/><span className="text-slate-400">Master Your Foundations.</span>
          </h3>
          <p className="text-slate-400 mb-10 max-w-2xl mx-auto text-lg md:text-xl font-medium relative z-10">
            Saturn stays for 2.5 years. Without knowing your natal <strong>Shani strength</strong>, its aspects, and your <strong>Mahadasha</strong> cycle, you might be fighting a battle you aren&apos;t meant to win yet. Get your long-term mastery audit.
          </p>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
            <Link
              href={`/personalized-transit-report?planet=saturn&house=${houseNum}&ascendant=${params.ascendant}`}
              className="w-full md:w-auto bg-white text-slate-950 font-black px-12 py-5 rounded-full hover:bg-slate-200 transition-all shadow-2xl hover:scale-105 active:scale-95 text-lg"
            >
              Get My Karmic Audit Report →
            </Link>
            <Link
              href="/app-download"
              className="w-full md:w-auto bg-white/5 backdrop-blur-md text-white font-bold px-12 py-5 rounded-full hover:bg-white/10 transition-all border border-white/10"
            >
              Daily Shani Remedies
            </Link>
          </div>
        </div>

      </article>
    </div>
  );
}