import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getEkadashiContent,
  getAllEkadashiSlugs,
} from "@/app/data/ekadashi";
import LocationText from "@/components/location/LocationText";

const BACKEND = "https://jyotishasha-backend.onrender.com";

/* --- Helper: Date Formatter (DD-MM-YYYY) --- */
function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr; // Fallback if already formatted
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

/* ---------------- FETCH DYNAMIC DATA ---------------- */
async function getEkadashiDynamicData(slug: string, year: number) {
  try {
    const res = await fetch(
      `${BACKEND}/api/ekadashi/find-by-slug/${slug}?year=${year}`,
      {
        method: "GET",
        next: { revalidate: 86400 }, // Cache for 24 hours
      }
    );
    if (!res.ok) return null;
    const result = await res.json();
    return result.data; 
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

export async function generateStaticParams() {
  const slugs = getAllEkadashiSlugs();
  return slugs.map((slug) => ({ slug }));
}

/* ---------------- PAGE ---------------- */
export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { year?: string };
}) {
  const content = getEkadashiContent(params.slug);
  if (!content) notFound();

  const currentYear = new Date().getFullYear();
  const selectedYear = searchParams.year ? parseInt(searchParams.year) : currentYear;
  const dynamic = await getEkadashiDynamicData(params.slug, selectedYear);

  const currentUrl = `https://www.jyotishasha.com/ekadashi/${params.slug}`;
  const displayDate = formatDate(dynamic?.vrat_date);
  const displayParana = dynamic ? `${dynamic.parana.start} - ${dynamic.parana.end}` : "TBA";

  /* --- SEO SCHEMAS --- */
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": `${content.name.en} ${selectedYear} Date & Muhurat`,
    "description": content.intro.en.slice(0, 160),
    "author": { "@type": "Organization", "name": "Jyotishasha" },
    "mainEntityOfPage": { "@type": "WebPage", "@id": currentUrl },
  };

  const eventSchema = dynamic && {
    "@context": "https://schema.org",
    "@type": "ReligiousEvent",
    "name": `${content.name.en} Vrat`,
    "startDate": dynamic.vrat_date,
    "location": { "@type": "Place", "name": "India" },
  };

  return (
    <div className="bg-gradient-to-b from-orange-900 to-orange-800 py-6 md:py-16 min-h-screen">
      
      {/* JSON-LD Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {eventSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />}

      <article className="max-w-5xl mx-auto bg-white rounded-2xl md:rounded-3xl px-4 md:px-10 py-8 md:py-14 shadow-2xl text-black">
        
        {/* Breadcrumbs */}
        <nav className="flex text-[10px] md:text-sm text-gray-500 mb-6 gap-2 uppercase tracking-wide">
          <Link href="/" className="hover:text-orange-600">Home</Link> <span>/</span>
          <Link href="/ekadashi" className="hover:text-orange-600">Ekadashi</Link> <span>/</span>
          <span className="text-orange-700 font-bold">{content.name.en}</span>
        </nav>

        {/* Heading */}
        <h1 className="text-2xl md:text-4xl font-extrabold mb-6 leading-tight text-gray-900">
          {content.name.en} {selectedYear} <LocationText />: Vrat Date, Parana Time & Katha
        </h1>

        {/* Year Tabs */}
        <div className="flex gap-4 mb-8 text-sm font-semibold border-b pb-2 overflow-x-auto whitespace-nowrap">
          {[2026, 2027].map((y) => (
            <Link 
              key={y}
              href={`/ekadashi/${params.slug}?year=${y}`}
              className={`${selectedYear === y ? "text-orange-700 border-b-4 border-orange-700 pb-2" : "text-gray-400 hover:text-orange-600 pb-2"}`}
            >
              {y} Details
            </Link>
          ))}
        </div>

        {/* Top Cards (Mobile Responsive) */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-orange-700 text-white rounded-xl p-6 shadow-md border-b-4 border-orange-900">
            <p className="text-[10px] uppercase opacity-80 font-bold">Vrat Date (Ekadashi)</p>
            <p className="text-2xl md:text-3xl font-black mt-1">{displayDate}</p>
            <p className="text-xs mt-2 opacity-90">{content.month} Month, {content.paksha} Paksha</p>
          </div>
          <div className="bg-zinc-900 text-white rounded-xl p-6 shadow-md border-b-4 border-zinc-700">
            <p className="text-[10px] uppercase opacity-80 font-bold">Parana Time (Fast Break)</p>
            <p className="text-2xl md:text-3xl font-black mt-1 text-orange-400">{displayParana}</p>
            <p className="text-xs mt-2 opacity-90">On Dwadashi, {formatDate(dynamic?.parana?.parana_date)}</p>
          </div>
        </section>

        {/* Dynamic Summary & Share Bar */}
        {dynamic && (
          <div className="mb-12">
            <div className="bg-orange-50 border-x border-t border-orange-100 p-5 rounded-t-xl text-sm md:text-base text-gray-700 leading-relaxed italic shadow-sm">
              <p>
                In <strong>{selectedYear}</strong>, the auspicious <strong>{content.name.en}</strong> will be observed on <strong>{displayDate}</strong>. 
                According to Vedic Panchang, the Ekadashi Tithi begins at {dynamic.tithi.start} and ends at {dynamic.tithi.end}. 
                Devotees should break their fast during the Parana window of <strong>{displayParana}</strong> on the next day for successful completion of the Vrat.
              </p>
            </div>
            <div className="bg-zinc-100 border border-orange-100 p-3 rounded-b-xl flex items-center justify-between gap-4">
               <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase">Share Timing with Family:</span>
               <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`✨ *${content.name.en} ${selectedYear}* ✨\n\n📅 Date: ${displayDate}\n⏳ Parana: ${displayParana}\n\nCheck full Vidhi & Katha here:\n🔗 ${currentUrl}`)}`}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 transition-transform active:scale-95 shadow-md"
               >
                 WhatsApp Share
               </a>
            </div>
          </div>
        )}

        {/* Detailed Muhurat Table */}
        {dynamic && (
          <section className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">📅 Detailed Muhurat for {selectedYear}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
               {[
                 { label: "Tithi Starts", value: dynamic.tithi.start },
                 { label: "Tithi Ends", value: dynamic.tithi.end },
                 { label: "Hari Vasara End", value: dynamic.parana.hari_vasara_end }
               ].map((item, idx) => (
                 <div key={idx} className="bg-white border border-gray-100 p-4 rounded-lg text-center shadow-sm">
                   <p className="text-[10px] uppercase text-gray-400 font-bold">{item.label}</p>
                   <p className="text-orange-800 font-bold text-sm mt-1">{item.value}</p>
                 </div>
               ))}
            </div>
          </section>
        )}

        {/* Static Content Sections */}
        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-orange-900 border-l-4 border-orange-600 pl-3 mb-4">About {content.name.en}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">{content.intro.en}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-orange-900 border-l-4 border-orange-600 pl-3 mb-4">Pooja Vidhi (Rituals)</h2>
            <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
              {content.vidhi.en.map((step: string, i: number) => (
                <div key={i} className="flex gap-4">
                  <div className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs font-bold">{i+1}</div>
                  <p className="text-gray-700 text-sm md:text-base">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {content.videoUrl && (
            <section className="rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="bg-orange-600 p-4 text-white font-bold text-center">📺 Watch Vrat Katha Video</div>
              <div className="aspect-video">
                <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${content.videoUrl.split('v=')[1]}`} allowFullScreen />
              </div>
            </section>
          )}

          <section className="bg-zinc-900 text-white p-6 md:p-8 rounded-2xl shadow-xl">
             <h2 className="text-xl md:text-2xl font-bold mb-4 text-orange-400">Benefits of this Fast</h2>
             <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {content.benefits.en.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm md:text-base">
                    <span className="text-orange-500 text-xl">✓</span> {b}
                  </li>
                ))}
             </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {content.faq.en.map((item: any, i: number) => (
                <div key={i} className="border border-gray-100 p-4 rounded-xl hover:bg-orange-50 transition-colors">
                  <h3 className="font-bold text-gray-900 text-sm md:text-base">Q: {item.q}</h3>
                  <p className="text-gray-600 mt-2 text-sm md:text-base pl-4 border-l-2 border-orange-200">{item.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="mt-16 pt-8 border-t border-gray-100 text-[10px] md:text-xs text-gray-400 text-center">
           <p>© Jyotishasha - Vedic Astrology & Panchang Research. Calculations based on Lahiri Ayanamsa.</p>
        </footer>

      </article>
    </div>
  );
}