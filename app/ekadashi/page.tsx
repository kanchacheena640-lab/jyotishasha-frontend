import Link from "next/link";
import { getEkadashiContent } from "@/app/data/ekadashi";
import { Metadata } from "next";

const BACKEND = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar for 2026 with accurate Vrat dates, Parana timings, and detailed Katha videos. Follow the Vedic Panchang.",
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

async function getAllEkadashiData(year: number) {
  try {
    const res = await fetch(`${BACKEND}/api/ekadashi/all?year=${year}`, { next: { revalidate: 86400 } });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch (error) { return []; }
}

export default async function EkadashiDirectoryPage() {
  const currentYear = 2026; 
  let allData = await getAllEkadashiData(currentYear);

  // Backup agar data na aaye (Empty box issue solve karne ke liye)
  if (!allData || allData.length === 0) {
    allData = [
      { name: "Saphala Ekadashi", slug: "saphala-ekadashi", vrat_date: "2026-01-14", month: "Pausha", parana: { start: "07:15 AM", end: "09:21 AM", parana_date: "2026-01-15" } },
      { name: "Pausha Putrada Ekadashi", slug: "pausha-putrada-ekadashi", vrat_date: "2026-01-30", month: "Pausha", parana: { start: "07:10 AM", end: "09:20 AM", parana_date: "2026-01-31" } }
    ];
  }

  const now = new Date();
  const nextEkadashi = allData.find((item: any) => new Date(item.vrat_date) >= now) || allData[0];

  // --- 1. SEO SCHEMA (Event + FAQ) ---
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ItemList",
        "name": `Ekadashi Vrat Calendar ${currentYear}`,
        "itemListElement": allData.map((item: any, index: number) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Event",
            "name": `${item.name} Ekadashi Vrat`,
            "startDate": item.vrat_date,
            "url": `https://www.jyotishasha.com/ekadashi/${item.slug}`,
            "location": { "@type": "Place", "name": "Online/Vedic Panchang" }
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [{
          "@type": "Question",
          "name": "How to break Ekadashi fast?",
          "acceptedAnswer": { "@type": "Answer", "text": "Break the fast during Parana timing on Dwadashi." }
        }]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      {/* Schema Injection */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />

      {/* --- SEO Header (Brand Colors) --- */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <span className="text-orange-600 font-bold uppercase tracking-widest text-xs">Panchang Guide</span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mt-2 mb-6">
          Ekadashi <span className="text-orange-600">Vrat Calendar 2026</span>
        </h1>
        
        {nextEkadashi && (
          <div className="inline-flex items-center gap-3 bg-white border-2 border-orange-100 p-2 pr-6 rounded-full shadow-sm">
            <span className="bg-orange-600 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase">Next Vrat</span>
            <p className="text-sm font-bold text-gray-800">
              {nextEkadashi.name}: <span className="text-orange-600">{formatDate(nextEkadashi.vrat_date)}</span>
            </p>
          </div>
        )}
      </section>

      {/* --- Boxes Section (Light & Clean) --- */}
      <section className="bg-orange-50/50 py-16 px-4 border-y border-orange-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allData.map((item: any, index: number) => {
             const isPast = new Date(item.vrat_date) < now;
             return (
               <div key={index} className={`bg-white rounded-3xl p-8 border-2 transition-all shadow-sm hover:shadow-xl
                 ${isPast ? "opacity-60 border-gray-100" : "border-white hover:border-orange-200"}`}>
                 
                 <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
                    <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-3 py-1 rounded-full uppercase tracking-tighter">{item.month}</span>
                 </div>

                 <div className="space-y-4 mb-8 text-sm border-t border-gray-50 pt-6">
                   <div className="flex justify-between items-center">
                     <span className="text-gray-400 font-medium tracking-tight">Vrat Date</span>
                     <span className="text-gray-900 font-bold">{formatDate(item.vrat_date)}</span>
                   </div>
                   <div className="flex justify-between items-center">
                     <span className="text-gray-400 font-medium tracking-tight">Parana Window</span>
                     <div className="text-right">
                        <p className="text-orange-600 font-bold">{item.parana.start} - {item.parana.end}</p>
                        <p className="text-[10px] text-gray-400 italic">{formatDate(item.parana.parana_date)}</p>
                     </div>
                   </div>
                 </div>

                 <Link href={`/ekadashi/${item.slug}`} className="block w-full text-center py-4 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs transition-colors shadow-lg uppercase tracking-widest">
                   Read Full Katha
                 </Link>
               </div>
             );
          })}
        </div>
      </section>

      {/* --- Video Section --- */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
          <div className="aspect-video">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/O-M6D606Q9o" title="Ekadashi Video" allowFullScreen />
          </div>
        </div>
      </section>
    </main>
  );
}