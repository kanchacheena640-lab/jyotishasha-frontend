import Link from "next/link";
import { Metadata } from "next";

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
  try {
    const res = await fetch(`${BACKEND_URL}/api/ekadashi/all?year=${year}`, { 
      method: "GET",
      cache: 'no-store' 
    });
    if (!res.ok) return [];
    const result = await res.json();
    return result.data || [];
  } catch (error) {
    return [];
  }
}

export default async function EkadashiDirectoryPage() {
  const currentYear = 2026;
  const allData = await getAllEkadashiData(currentYear);
  const now = new Date();

  const upcoming = allData.filter((d: any) => new Date(d.vrat_date) >= now);
  const nextEkadashi = upcoming.length > 0 ? upcoming[0] : allData[0];

  return (
    <main className="min-h-screen bg-[#faf9f6] pb-20 text-gray-900">
      
      {/* 1. PREMIUM HEADER */}
      <section className="bg-white border-b-4 border-orange-500/10 py-20 px-4 shadow-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">
            Ekadashi <span className="text-orange-600">2026</span> Vrat
          </h1>
          
          {nextEkadashi && (
            <div className="inline-flex items-center gap-4 bg-orange-600 text-white px-8 py-4 rounded-2xl shadow-xl shadow-orange-200 animate-in fade-in zoom-in duration-500">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </div>
              <p className="text-sm md:text-base font-black uppercase tracking-wider">
                Next: {nextEkadashi.name || nextEkadashi.ekadashi_name} — {formatDate(nextEkadashi.vrat_date)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. VIBRANT GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {allData.map((item: any, idx: number) => {
            const isPast = new Date(item.vrat_date) < now;
            // Agar 'name' nahi mil raha toh alternative keys check karein
            const displayName = item.name || item.ekadashi_name || "Ekadashi Vrat";
            
            return (
              <div 
                key={idx} 
                className={`group relative bg-white border-2 rounded-[2rem] p-8 transition-all duration-300 hover:-translate-y-2 
                ${isPast 
                  ? "border-gray-100 opacity-60 grayscale-[0.5]" 
                  : "border-orange-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:shadow-orange-200/50 hover:border-orange-300"
                }`}
              >
                {/* Name & Badge */}
                <div className="mb-6">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                      {displayName}
                    </h2>
                    <span className="text-[10px] font-black bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full uppercase tracking-tighter">
                      {item.month}
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs font-bold mt-1 tracking-widest uppercase">{item.paksha || 'Shukla'} Paksha</p>
                </div>
                
                {/* Details Table-style */}
                <div className="space-y-4 bg-gray-50 rounded-2xl p-5 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-xs uppercase">Vrat Date</span>
                    <span className="text-gray-900 font-black">{formatDate(item.vrat_date)}</span>
                  </div>
                  <div className="h-px bg-gray-200 w-full" />
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500 font-bold text-xs uppercase">Parana</span>
                    <div className="text-right">
                      <p className="text-orange-700 font-black">{item.parana?.start} - {item.parana?.end}</p>
                      <p className="text-[10px] text-gray-400 font-bold">{formatDate(item.parana?.parana_date)}</p>
                    </div>
                  </div>
                </div>

                <Link 
                  href={`/ekadashi/${item.slug}`} 
                  className="flex items-center justify-center w-full py-4 bg-gray-900 text-white font-black rounded-2xl text-xs uppercase tracking-[0.2em] transition-all group-hover:bg-orange-600 group-hover:shadow-lg active:scale-95"
                >
                  View Details & Katha
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. INFO SECTION (Aapka Favorite) */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-0 overflow-hidden bg-white rounded-[3rem] border-2 border-orange-100 shadow-2xl shadow-orange-100/20">
          <div className="p-12 md:p-20 flex flex-col justify-center">
            <h2 className="text-4xl font-black mb-8 text-gray-900 leading-none">
              Vedic <span className="text-orange-600 text-stroke">Wisdom</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-10 font-medium">
              Join millions in the sacred fast of Ekadashi. Our directory ensures you never miss the precise 
              <span className="text-gray-900 font-bold"> Tithi </span> and 
              <span className="text-gray-900 font-bold"> Parana </span> timings.
            </p>
            <div className="space-y-4">
               {["Precise Muhurat", "Authentic Kathas", "Scientific Fasting"].map((feat) => (
                 <div key={feat} className="flex items-center gap-4 text-gray-800 font-black uppercase text-xs tracking-widest">
                   <div className="h-2 w-2 rounded-full bg-orange-600" /> {feat}
                 </div>
               ))}
            </div>
          </div>
          <div className="aspect-video bg-gray-900 relative">
            <iframe 
              className="w-full h-full opacity-90 hover:opacity-100 transition-opacity" 
              src="https://www.youtube.com/embed/O-M6D606Q9o" 
              title="Ekadashi" 
              allowFullScreen 
            />
          </div>
        </div>
      </section>
    </main>
  );
}