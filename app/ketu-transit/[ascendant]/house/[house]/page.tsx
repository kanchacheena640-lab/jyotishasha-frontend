// app/ketu-transit/[ascendant]/house/[house]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TransitInternalLinks from "@/components/transit/TransitInternalLinks";

const BACKEND = "https://jyotishasha-backend.onrender.com";
const currentYear = new Date().getFullYear();

/* ---------------- DATA ---------------- */
async function fetchTransit(ascendant: string, house: number) {
  const res = await fetch(
    `${BACKEND}/api/transit?ascendant=${ascendant}&planet=ketu&house=${house}&lang=en`,
    { cache: "no-store" }
  );
  if (!res.ok) return null;
  return res.json();
}

/* ---------------- SEO (STEP 1) ---------------- */
export async function generateMetadata({
  params,
}: {
  params: { ascendant: string; house: string };
}): Promise<Metadata> {
  const houseNum = Number(params.house);
  const asc = params.ascendant.charAt(0).toUpperCase() + params.ascendant.slice(1);

  return {
    // ✅ STEP 1: Updated Title for Global CTR
    title: `Ketu Transit ${currentYear} (South Node) in ${asc} Ascendant – House ${houseNum} Effects & Meaning`,
    description: `Ketu transit ${currentYear} effects in House ${houseNum} for ${asc} ascendant in astrology. See how this South Node transit impacts your birth chart.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/ketu-transit/${params.ascendant}/house/${houseNum}`,
    },
  };
}

/* ---------------- PAGE ---------------- */
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

  // ✅ STEP 3: FAQ UPGRADE (Dynamic & Optimized)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        "name": `What does Ketu Transit ${currentYear} mean in astrology?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ketu transit, also known as South Node transit, represents karmic release, detachment, and spiritual transformation in astrology."
        }
      },
      {
        "@type": "Question",
        "name": `How does Ketu transit affect ${ascTitle} ascendant in House ${houseNum}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `For ${ascTitle} ascendant, Ketu transit in House ${houseNum} influences specific life areas by promoting detachment and inner growth.`
        }
      },
      {
        "@type": "Question",
        "name": "Is Ketu transit always negative?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, Ketu transit is not negative. It helps in spiritual growth, removing illusions, and breaking unhealthy patterns."
        }
      }
    ]
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 to-gray-900 py-16 px-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="max-w-5xl mx-auto bg-white rounded-3xl px-6 md:px-12 py-16 shadow-2xl text-slate-900">
        
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-400 mb-6 flex gap-2">
          <Link href="/ketu-transit" className="hover:text-blue-600">Ketu Transit</Link>
          <span>/</span>
          <Link href={`/ketu-transit/${params.ascendant}`} className="hover:text-blue-600">{ascTitle}</Link>
          <span>/</span>
          <span className="text-slate-600 font-medium">House {houseNum}</span>
        </nav>

        {/* H1 */}
        <h1 className="text-3xl md:text-5xl font-black mb-8 leading-tight text-blue-950">
          Ketu Transit {currentYear} in {ascTitle} Ascendant – House {houseNum} Effects & Meaning
        </h1>

        {/* ✅ STEP 2: Intro Replacement (Modern & Balanced Tone) */}
        <div className="mb-10">
          <p className="text-lg leading-relaxed text-slate-700">
            Ketu transit {currentYear} (South Node transit) in House {houseNum} for {ascTitle} ascendant brings karmic shifts, detachment, and inner transformation. In astrology, Ketu represents past-life patterns and spiritual growth, often influencing career, relationships, and mindset.
          </p>
        </div>

        {/* Vedic Disclaimer (For USA Traffic) */}
        <aside className="mb-12 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-sm italic shadow-sm">
          <strong>Global Note:</strong> This guide uses the Sidereal (Vedic) Zodiac. If you are familiar with Western Astrology, results may differ; ensure you are reading for your Vedic Ascendant (Lagna).
        </aside>

        {/* SECTIONS */}
        <div className="space-y-10">
          {data.sections.map((sec: any, i: number) => (
            <section key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 text-blue-900 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                {sec.heading}
              </h2>
              <ul className="grid md:grid-cols-1 gap-3">
                {sec.points.map((p: string, j: number) => (
                  <li key={j} className="flex gap-3 text-slate-700 leading-relaxed">
                    <span className="text-blue-500 font-bold">•</span>
                    {p}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* STRENGTHS / CHALLENGES */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8">
            <h3 className="text-xl font-black mb-4 text-emerald-800 uppercase tracking-widest text-sm">Opportunities</h3>
            <ul className="space-y-3 text-emerald-900/80 text-sm">
              {data.strengths.map((s: string, i: number) => (
                <li key={i} className="flex gap-2">✨ <span>{s}</span></li>
              ))}
            </ul>
          </div>

          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-8">
            <h3 className="text-xl font-black mb-4 text-rose-800 uppercase tracking-widest text-sm">Challenges</h3>
            <ul className="space-y-3 text-rose-900/80 text-sm">
              {data.challenges.map((c: string, i: number) => (
                <li key={i} className="flex gap-2">🚩 <span>{c}</span></li>
              ))}
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-slate-900 rounded-3xl p-10 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="text-7xl font-black">STARA</span>
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
            Get Your Deep Karmic Analysis
          </h3>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto relative z-10">
            Generic reports cover only 20%. Your personalized chart determines how Ketu will actually manifest in your life.
          </p>
          <Link
            href={`/personalized-transit-report?planet=ketu&house=${houseNum}&ascendant=${params.ascendant}`}
            className="inline-block bg-white text-slate-900 font-bold px-10 py-4 rounded-full hover:bg-slate-100 transition shadow-lg relative z-10"
          >
            Unlock My Full Personal Report →
          </Link>
        </div>

      </article>
    </div>
  );
}