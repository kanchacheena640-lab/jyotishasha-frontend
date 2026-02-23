import Link from "next/link";
import { getEkadashiContent } from "@/app/data/ekadashi";
import { Metadata } from "next";

const BACKEND = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar for 2026 with accurate Vrat dates, Parana timings, and detailed Katha videos. Follow the Vedic Panchang for all 24 Ekadashis.",
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
}

async function getAllEkadashiData(year: number) {
  try {
    const res = await fetch(`${BACKEND}/api/ekadashi/all?year=${year}`, {
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data;
  } catch (error) { return []; }
}

export default async function EkadashiDirectoryPage() {
  const currentYear = 2026; 
  const allData = await getAllEkadashiData(currentYear);
  const now = new Date();
  const nextEkadashi = allData.find((item: any) => new Date(item.vrat_date) >= now) || allData[0];

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
            "url": `https://www.jyotishasha.com/ekadashi/${item.slug}`
          }
        }))
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#fffdfa]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />

      {/* --- SEO Header (Brand Colors) --- */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="mb-4 inline-block px-4 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold uppercase tracking-widest">
          🔱 Vedic Panchang 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Ekadashi <span className="text-orange-600">Vrat Calendar</span>
        </h1>
        
        {nextEkadashi && (
          <div className="inline-flex items-center gap-4 bg-white border-2 border-orange-100 p-2 pr-6 rounded-full shadow-sm">
            <span className="bg-orange-600 text-white text-[10px] font-bold px-4 py-2 rounded-full uppercase animate-pulse">Next Upcoming</span>
            <p className="text-sm font-bold text-gray-800">
              {nextEkadashi.name}: <span className="text-orange-600 font-black">{formatDate(nextEkadashi.vrat_date)}</span>
            </p>
          </div>
        )}
      </section>

      {/* --- Boxes Section (Light & Clean) --- */}
      <section className="bg-orange-50/50 py-16 px-4 border-y border-orange-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allData.map((item: any, index: number) => {
             const isNext = item.slug === nextEkadashi?.slug;
             const isPast = new Date(item.vrat_date) < now;
             return (
               <div key={index} className={`relative bg-white rounded-2xl p-6 border-2 transition-all duration-300 shadow-sm hover:shadow-xl
                 ${isPast ? "opacity-60 border-gray-100" : "border-white hover:border-orange-200"} 
                 ${isNext ? "ring-2 ring-orange-500 scale-[1.02]" : ""}`}>
                 
                 <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded tracking-tighter uppercase">{item.month}</span>
                 </div>

                 <div className="space-y-3 mb-6 text-sm border-t border-orange-50 pt-4">
                   <div className="flex justify-between font-medium">
                     <span className="text-gray-500">Vrat Date:</span>
                     <span className="text-gray-900 font-bold">{formatDate(item.vrat_date)}</span>
                   </div>
                   <div className="flex justify-between font-medium">
                     <span className="text-gray-500">Parana:</span>
                     <div className="text-right">
                        <p className="text-orange-700 font-bold">{item.parana.start} - {item.parana.end}</p>
                        <p className="text-[10px] text-gray-400 font-medium italic">{formatDate(item.parana.parana_date)}</p>
                     </div>
                   </div>
                 </div>

                 <Link href={`/ekadashi/${item.slug}`} className="block w-full text-center py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl text-xs transition-colors uppercase tracking-wider">
                   Read Full Katha
                 </Link>
               </div>
             );
          })}
        </div>
      </section>

      {/* --- Video Section (Lord Vishnu Video) --- */}
      <section className="max-w-4xl mx-auto px-4 py-20">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Why Observe Ekadashi?</h2>
            <div className="h-1 w-20 bg-orange-500 mx-auto mt-2"></div>
        </div>
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border-8 border-white">
          <div className="aspect-video bg-gray-100">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/O-M6D606Q9o" // Krishna/Vishnu Bhajan/Katha Placeholder
              title="Ekadashi Importance Video"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* --- FAQ Section --- */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
                <h3 className="font-bold text-orange-700 mb-2">How to break Ekadashi fast?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Fast must be broken during the Parana window (shown above) on Dwadashi day for full spiritual benefits.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-orange-50">
                <h3 className="font-bold text-orange-700 mb-2">What to eat during Vrat?</h3>
                <p className="text-gray-600 text-sm leading-relaxed">Stick to fruits, milk, and root vegetables. Strictly avoid grains, pulses, and onions.</p>
            </div>
        </div>
      </section>
    </main>
  );
}