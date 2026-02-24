import Link from "next/link";
import { Metadata } from "next";

const BACKEND_URL = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026-2027: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar with accurate Vrat dates, Parana timings, and detailed Katha videos for 2026 and 2027.",
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
  } catch (error) { return []; }
}

export default async function EkadashiDirectoryPage() {
  const now = new Date();
  now.setHours(0, 0, 0, 0); // Precise date comparison ke liye

  // 1. Fetching both years
  const [data2026, data2027] = await Promise.all([
    getAllEkadashiData(2026),
    getAllEkadashiData(2027)
  ]);

  // 2. Filter: Only Upcoming and Today
  const upcoming2026 = data2026.filter((item: any) => new Date(item.vrat_date) >= now);
  const upcoming2027 = data2027.filter((item: any) => new Date(item.vrat_date) >= now);

  // 3. Logic: Total 24 cards (Rolling System)
  // Pehle 2026 ke bache hue, fir 2027 ke cards utne hi jitne 24 pure karne ke liye chahiye
  const combinedData = [...upcoming2026, ...upcoming2027].slice(0, 24);
  
  const nextEkadashi = combinedData[0];

  return (
    <main className="min-h-screen bg-[#FDFCFE] pb-20 text-gray-900">
      
      {/* 1. HERO HEADER */}
      <section className="bg-white border-b border-[#EDE9FE] py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-[#2E1065] mb-6 tracking-tight">
            Ekadashi <span className="text-[#6D28D9]">Vrat</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg mb-10 uppercase tracking-widest">Rolling 24 Calendar (2026-27)</p>
          
          {nextEkadashi && (
            <div className="inline-flex items-center gap-4 bg-[#6D28D9] text-white px-10 py-5 rounded-3xl shadow-2xl shadow-purple-200">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </div>
              <p className="text-sm md:text-lg font-black uppercase tracking-wider">
                 {new Date(nextEkadashi.vrat_date).getTime() === now.getTime() ? "TODAY" : "UP NEXT"}: {nextEkadashi.name || nextEkadashi.ekadashi_name} — {formatDate(nextEkadashi.vrat_date)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. DYNAMIC GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {combinedData.map((item: any, idx: number) => {
            const itemDate = new Date(item.vrat_date);
            itemDate.setHours(0, 0, 0, 0);
            
            const isToday = itemDate.getTime() === now.getTime();
            const isNextYear = itemDate.getFullYear() === 2027;
            
            const displayName =
              (typeof item.name === "object" ? item.name.en : item.name) ||
              item.name_en ||
              item.ekadashi_name ||
              "Ekadashi Vrat";

            return (
              <div
                key={idx}
                className={`group relative rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-3 border 
                ${isToday 
                  ? "bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-400 shadow-[0_20px_50px_rgba(234,88,12,0.15)]" 
                  : "bg-gradient-to-br from-[#F5EAFE] via-white to-[#EDE9FE] border-[#DDD6FE] shadow-[0_15px_50px_rgba(109,40,217,0.1)] hover:shadow-[0_25px_60px_rgba(109,40,217,0.2)]"
                }`}
              >
                {/* Badge Row */}
                <div className="flex justify-between items-center mb-8">
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${isNextYear ? 'bg-blue-600 text-white' : 'bg-[#EDE9FE] text-[#6D28D9]'}`}>
                    {item.month || "Month"} {itemDate.getFullYear()}
                  </span>
                  
                  {isToday ? (
                    <span className="text-[10px] font-black bg-orange-600 text-white px-3 py-1 rounded-lg animate-pulse ring-4 ring-orange-100">
                      TODAY
                    </span>
                  ) : idx === 0 ? (
                    <span className="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-lg tracking-tighter">
                      UPCOMING
                    </span>
                  ) : null}
                </div>

                {/* Title & Paksha */}
                <div className="mb-8">
                  <h2 className={`text-3xl font-black leading-tight transition-colors ${isToday ? 'text-orange-900' : 'text-[#2E1065] group-hover:text-[#6D28D9]'}`}>
                    {displayName}
                  </h2>
                  <p className={`${isToday ? 'text-orange-600' : 'text-[#7C3AED]'} font-bold text-xs mt-2 uppercase tracking-[0.2em]`}>
                    {item.paksha || "Shukla Paksha"}
                  </p>
                </div>

                {/* Info Card */}
                <div className={`space-y-5 rounded-[24px] p-6 border ${isToday ? 'bg-white border-orange-200 shadow-inner' : 'bg-white/80 border-[#E9D5FF] backdrop-blur-sm'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[#A78BFA] font-bold text-[10px] uppercase tracking-widest">Vrat Date</span>
                    <span className={`font-black text-lg ${isToday ? 'text-orange-700' : 'text-[#2E1065]'}`}>
                      {formatDate(item.vrat_date)}
                    </span>
                  </div>
                  <div className={`h-px w-full ${isToday ? 'bg-orange-100' : 'bg-[#E9D5FF]'}`} />
                  <div className="flex justify-between items-start">
                    <span className="text-[#A78BFA] font-bold text-[10px] uppercase tracking-widest mt-1">Parana Time</span>
                    <div className="text-right">
                      <p className={`font-black text-sm ${isToday ? 'text-orange-800' : 'text-[#6D28D9]'}`}>
                        {item.parana?.start?.includes(" ") ? item.parana.start.split(" ")[1] : item.parana?.start} - {item.parana?.end?.includes(" ") ? item.parana.end.split(" ")[1] : item.parana?.end}
                      </p>
                      <p className="text-[10px] text-[#A78BFA] font-bold mt-1">On {formatDate(item.parana?.parana_date)}</p>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  href={`/ekadashi/${item.slug}`}
                  className={`mt-8 flex items-center justify-center gap-2 w-full py-5 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] transition-all active:scale-95 ${isToday ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#4C1D95] hover:bg-[#6D28D9]'} text-white`}
                >
                  Explore Katha →
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}