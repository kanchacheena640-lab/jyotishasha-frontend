import Link from "next/link";
import { Metadata } from "next";

const BACKEND = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar for 2026 with accurate Vrat dates, Parana timings, and detailed Katha videos.",
  alternates: { canonical: "https://www.jyotishasha.com/ekadashi" },
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;

  const datePart = `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  
  const hasTime = dateStr.includes(':') || dateStr.includes('T');
  if (hasTime) {
    const timePart = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    return `${datePart} | ${timePart}`;
  }
  return datePart;
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
  const allData = await getAllEkadashiData(currentYear);
  
  const now = new Date();
  const upcomingData = allData.filter((item: any) => new Date(item.vrat_date) >= now);
  const nextEkadashi = upcomingData.length > 0 ? upcomingData[0] : allData[allData.length - 1];

  // SEO Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Ekadashi Calendar 2026",
    "itemListElement": allData.map((item: any, index: number) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Event",
        "name": `${item.name} Ekadashi`,
        "startDate": item.vrat_date,
        "url": `https://www.jyotishasha.com/ekadashi/${item.slug}`
      }
    }))
  };

  return (
    <main className="min-h-screen bg-gray-50/50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* --- HEADER SECTION --- */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ekadashi <span className="text-orange-600">Vrat Calendar 2026</span>
          </h1>
          {nextEkadashi && (
            <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-100 px-5 py-2.5 rounded-full shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-600 animate-ping"></span>
              <p className="text-sm font-bold text-gray-800 uppercase tracking-tight">
                Next: {nextEkadashi.name} — <span className="text-orange-700">{formatDate(nextEkadashi.vrat_date)}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* --- GRID SECTION (SATURN TRANSIT STYLE) --- */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allData.map((item: any, index: number) => {
            const isPast = new Date(item.vrat_date) < now;
            const isNext = item.slug === nextEkadashi?.slug;

            return (
              <div key={index} className={`bg-white border rounded-2xl p-7 transition-all shadow-sm hover:shadow-md 
                ${isPast ? "opacity-50 grayscale-[0.5]" : "border-gray-200 hover:border-orange-300"}
                ${isNext ? "ring-2 ring-orange-500 ring-offset-2" : ""}`}>
                
                <div className="flex justify-between items-start mb-5">
                  <h2 className="text-xl font-bold text-gray-900">{item.name}</h2>
                  <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded uppercase tracking-widest">
                    {item.month}
                  </span>
                </div>

                <div className="space-y-3.5 border-t border-gray-50 pt-5 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 font-medium italic">Vrat Date</span>
                    <span className="text-gray-900 font-bold">{formatDate(item.vrat_date)}</span>
                  </div>
                  <div className="flex justify-between items-start">
                    <span className="text-gray-400 font-medium italic">Parana Window</span>
                    <div className="text-right">
                      <p className="text-orange-700 font-black">{item.parana.start} - {item.parana.end}</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">{formatDate(item.parana.parana_date)}</p>
                    </div>
                  </div>
                </div>

                <Link href={`/ekadashi/${item.slug}`} className="mt-8 block w-full text-center py-3 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-xl text-[11px] uppercase tracking-[0.15em] transition-all">
                  Full Details & Katha →
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- VIDEO & INFO SECTION --- */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Significance of Ekadashi</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Fasting on Ekadashi is believed to cleanse the soul and bring spiritual growth. 
              Our 2026 directory provides precise timings and dates based on Vedic astronomical calculations.
            </p>
            <ul className="space-y-2 text-sm font-medium text-gray-700">
              <li className="flex items-center gap-2">✨ Real-time Tithi Calculation</li>
              <li className="flex items-center gap-2">✨ Authentic Vrat Stories</li>
              <li className="flex items-center gap-2">✨ Scientific Parana Windows</li>
            </ul>
          </div>
          <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-inner border-4 border-white">
            <iframe 
               className="w-full h-full"
               src="https://www.youtube.com/embed/O-M6D606Q9o" 
               title="Ekadashi Mahatmya"
               allowFullScreen
            />
          </div>
        </div>
      </section>
    </main>
  );
}