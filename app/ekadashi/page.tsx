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

            // 1. NAME FIX: Key names ko dhyan se check karte hue
            // Agar backend me 'name' object hai {en: '...'}, toh wo use hoga
            const displayName = 
              (typeof item.name === 'object' ? item.name.en : item.name) || 
              item.name_en || 
              item.ekadashi_name || 
              "Ekadashi Vrat";
            
            // 2. PAKSHA & MONTH FIX
            const displayPaksha = item.paksha || "Ekadashi Tithi";
            const displayMonth = item.month || "Panchang";

            return (
              <div 
                key={idx} 
                className={`group relative bg-white border-t-4 rounded-[2rem] p-8 transition-all duration-500 hover:-translate-y-3 
                ${isPast 
                  ? "border-gray-200 opacity-60 grayscale-[0.5]" 
                  : "border-blue-600 shadow-[0_15px_45px_rgba(30,58,138,0.1)] hover:shadow-blue-200"
                }`}
              >
                {/* Badge & Name Section */}
                <div className="mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black bg-blue-50 text-blue-700 px-3 py-1 rounded-full uppercase tracking-widest">
                      {displayMonth} Month
                    </span>
                    {!isPast && (
                      <span className="flex h-2 w-2 rounded-full bg-blue-600 animate-pulse"></span>
                    )}
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-4 group-hover:text-blue-700 transition-colors leading-tight">
                    {displayName}
                  </h2>
                  
                  <p className="text-blue-500 font-bold text-xs mt-2 uppercase tracking-[0.1em]">
                    {displayPaksha}
                  </p>
                </div>
                
                {/* Details Box - Jyotishasha Blue Tints */}
                <div className="space-y-4 bg-slate-50 rounded-3xl p-6 border border-slate-100">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Vrat Date</span>
                    <span className="text-slate-900 font-black text-lg">{formatDate(item.vrat_date)}</span>
                  </div>
                  
                  <div className="h-px bg-slate-200 w-full" />
                  
                  <div className="flex justify-between items-start">
                    <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Parana Time</span>
                    <div className="text-right">
                      <p className="text-blue-800 font-black text-sm">
                        {item.parana?.start?.includes(' ') ? item.parana.start.split(' ')[1] : item.parana?.start} - 
                        {item.parana?.end?.includes(' ') ? item.parana.end.split(' ')[1] : item.parana?.end}
                      </p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1">
                        {formatDate(item.parana?.parana_date)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button - Jyotishasha Dark Blue */}
                <Link 
                  href={`/ekadashi/${item.slug}`} 
                  className="mt-8 flex items-center justify-center gap-2 w-full py-5 bg-slate-900 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.2em] transition-all hover:bg-blue-700 hover:shadow-lg active:scale-95"
                >
                  Explore Katha <span className="text-blue-400">→</span>
                </Link>

                {/* Background Decorative Element */}
                <div className="absolute -bottom-2 -right-2 text-slate-50 font-black text-6xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                  {idx + 1}
                </div>
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