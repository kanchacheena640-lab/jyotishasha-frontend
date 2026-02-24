import Link from "next/link";
import { Metadata } from "next";

// APNE BACKEND KA SAHI URL YAHA CHECK KAREIN
const BACKEND_URL = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar for 2026 with accurate Vrat dates, Parana timings, and detailed Katha videos.",
};

function formatDate(dateStr: string | undefined) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  try {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth() + 1).padStart(2, "0")}-${d.getFullYear()}`;
  } catch (e) { return dateStr; }
}

async function getAllEkadashiData(year: number) {
  const apiUrl = `${BACKEND_URL}/api/ekadashi/all?year=${year}`;
  console.log("Fetching from:", apiUrl); // Browser/Terminal me check karein

  try {
    const res = await fetch(apiUrl, { 
      method: "GET",
      cache: 'no-store', // Data fresh aana chahiye
      headers: { 'Content-Type': 'application/json' }
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const result = await res.json();
    return result.data || [];
  } catch (error) {
    console.error("Critical Fetch Error:", error);
    return [];
  }
}

export default async function EkadashiDirectoryPage() {
  const currentYear = 2026;
  const allData = await getAllEkadashiData(currentYear);
  const now = new Date();

  // Next Ekadashi calculate karna
  const upcoming = allData.filter((d: any) => new Date(d.vrat_date) >= now);
  const nextEkadashi = upcoming.length > 0 ? upcoming[0] : allData[0];

  return (
    <main className="min-h-screen bg-gray-50/50 pb-20">
      
      {/* 1. HEADER SECTION (Always Visible) */}
      <section className="bg-white border-b border-gray-200 py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6">
            Ekadashi <span className="text-orange-600">2026 Calendar</span>
          </h1>
          
          {nextEkadashi ? (
            <div className="inline-flex items-center gap-3 bg-orange-50 border border-orange-200 px-6 py-3 rounded-full shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-orange-600 animate-ping"></span>
              <p className="text-sm font-bold text-gray-800 uppercase">
                Up Next: {nextEkadashi.name} — {formatDate(nextEkadashi.vrat_date)}
              </p>
            </div>
          ) : (
             <div className="text-gray-400 animate-pulse font-medium">Connecting to Vedic Server...</div>
          )}
        </div>
      </section>

      {/* 2. GRID SECTION (The Problem Area) */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        {allData && allData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allData.map((item: any, idx: number) => {
              const isPast = new Date(item.vrat_date) < now;
              return (
                <div key={idx} className={`bg-white border border-gray-200 rounded-3xl p-8 shadow-sm transition-all hover:shadow-md ${isPast ? "opacity-50 grayscale-[0.3]" : "ring-1 ring-gray-100"}`}>
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                    <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-2.5 py-1 rounded uppercase">{item.month}</span>
                  </div>
                  
                  <div className="space-y-4 border-t border-gray-50 pt-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 italic">Vrat Date</span>
                      <span className="text-gray-900 font-bold">{formatDate(item.vrat_date)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400 italic">Parana Time</span>
                      <span className="text-orange-700 font-black">{item.parana?.start} - {item.parana?.end}</span>
                    </div>
                  </div>

                  <Link href={`/ekadashi/${item.slug}`} className="mt-8 block w-full text-center py-4 bg-gray-900 hover:bg-orange-600 text-white font-bold rounded-2xl text-[11px] uppercase tracking-widest transition-all">
                    Full Details & Katha →
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          /* Agar data nahi aaya toh ye box dikhega */
          <div className="bg-white border-2 border-dashed border-gray-200 rounded-3xl p-20 text-center">
            <p className="text-xl font-bold text-gray-400 mb-2">Data Load Nahi Ho Raha!</p>
            <p className="text-gray-500 text-sm">Please check agar backend me <code className="bg-gray-100 px-1">/api/ekadashi/all</code> route active hai.</p>
          </div>
        )}
      </section>

      {/* 3. INFO SECTION (Aapka Best Section) */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden bg-white rounded-3xl border border-gray-200 shadow-sm">
          <div className="p-10 md:p-16 flex flex-col justify-center">
            <h2 className="text-3xl font-extrabold mb-6 text-gray-900 leading-tight">Spiritual Importance</h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              Ekadashi fasting is a way to align your body and soul with the lunar cycles. 
              Our 2026 directory offers precise Vrat calculations for spiritual seekers.
            </p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 font-bold text-gray-800 text-sm">✨ Precise Parana Windows</li>
              <li className="flex items-center gap-3 font-bold text-gray-800 text-sm">✨ Ancient Vrat Katha Videos</li>
            </ul>
          </div>
          <div className="aspect-video">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/O-M6D606Q9o" title="Ekadashi" allowFullScreen />
          </div>
        </div>
      </section>
    </main>
  );
}