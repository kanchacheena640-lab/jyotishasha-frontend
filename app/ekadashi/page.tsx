import Link from "next/link";
import { Metadata } from "next";

const BACKEND = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar for 2026 with accurate Vrat dates, Parana timings, and detailed Katha videos.",
  alternates: { canonical: "https://www.jyotishasha.com/ekadashi" },
};

/* --- Formatter: Single Page wale code jaisa --- */
function formatDate(dateStr: string | undefined) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatTimeOnly(timeStr: string | undefined) {
  if (!timeStr) return "TBA";
  return timeStr.replace(/\d{4}-\d{2}-\d{2}/g, '').trim();
}

async function getAllEkadashiData(year: number) {
  try {
    // Yahan hum cache: 'no-store' hi rakhenge taaki debugging ho sake
    const res = await fetch(`${BACKEND}/api/ekadashi/all?year=${year}`, { 
      method: "GET",
      cache: 'no-store' 
    });
    
    if (!res.ok) {
        console.error("API Error Status:", res.status);
        return [];
    }

    const result = await res.json();
    // Result check karne ke liye console
    console.log("Full API Response:", result); 
    
    return result.data || [];
  } catch (error) { 
    console.error("Fetch Connection Error:", error);
    return []; 
  }
}

export default async function EkadashiDirectoryPage() {
  const currentYear = 2026; 
  const allData = await getAllEkadashiData(currentYear);
  const now = new Date();
  
  // Filtering Logic
  const upcomingData = allData.length > 0 
    ? allData.filter((item: any) => new Date(item.vrat_date) >= now)
    : [];
    
  const nextEkadashi = upcomingData.length > 0 ? upcomingData[0] : allData[0];

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* 1. HEADER */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Ekadashi <span className="text-orange-600">Vrat Calendar 2026</span>
          </h1>
          {nextEkadashi ? (
            <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-100 px-6 py-3 rounded-full shadow-sm">
              <span className="flex h-2.5 w-2.5 rounded-full bg-orange-600 animate-ping"></span>
              <p className="text-sm font-bold text-gray-800 uppercase">
                Next: {nextEkadashi.name} — <span className="text-orange-700">{formatDate(nextEkadashi.vrat_date)}</span>
              </p>
            </div>
          ) : (
            <div className="text-orange-800 bg-orange-100 px-4 py-2 rounded-lg inline-block text-sm font-bold">
              Fetching 2026 Calendar Data...
            </div>
          )}
        </div>
      </section>

      {/* 2. GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12 min-h-[400px]">
        {allData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allData.map((item: any, index: number) => {
              const isPast = new Date(item.vrat_date) < now;
              return (
                <div key={index} className={`bg-white border border-gray-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all ${isPast ? "opacity-60" : "opacity-100"}`}>
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                    <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">{item.month}</span>
                  </div>
                  
                  <div className="space-y-3 border-t pt-4 text-sm font-medium">
                    <div className="flex justify-between text-gray-600">
                      <span>Vrat Date:</span>
                      <span className="text-gray-900 font-bold">{formatDate(item.vrat_date)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Parana:</span>
                      <div className="text-right">
                        <p className="text-orange-700 font-bold">{formatTimeOnly(item.parana?.start)} - {formatTimeOnly(item.parana?.end)}</p>
                        <p className="text-[10px] text-gray-400">{formatDate(item.parana?.parana_date)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Link href={`/ekadashi/${item.slug}`} className="mt-8 block w-full text-center py-4 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all">
                    View Katha & Details
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
             <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mb-4"></div>
             <p className="text-gray-500 font-medium">Loading 2026 Ekadashi Dates...</p>
             <p className="text-xs text-gray-400 mt-2">Agar ye box nahi ja raha, toh please backend check karein.</p>
          </div>
        )}
      </section>

      {/* 3. VIDEO SECTION (Aapka Best Section) */}
      <section className="max-w-7xl mx-auto px-4 mt-10">
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden bg-white rounded-3xl border border-gray-200 shadow-sm">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900">Significance of Ekadashi</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Fasting on Ekadashi is believed to cleanse the soul and bring spiritual growth. 
              Our 2026 directory provides precise timings and dates based on Vedic astronomical calculations.
            </p>
            <div className="flex flex-col gap-3">
               <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                 <span className="text-orange-600 text-xl">✨</span> Real-time Tithi Calculation
               </div>
               <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                 <span className="text-orange-600 text-xl">✨</span> Authentic Vrat Stories
               </div>
            </div>
          </div>
          <div className="aspect-video bg-gray-100 relative">
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