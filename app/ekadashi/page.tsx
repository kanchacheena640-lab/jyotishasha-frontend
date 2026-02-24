import Link from "next/link";
import { Metadata } from "next";
import { getAllEkadashiSlugs } from "@/app/data/ekadashi";

const BACKEND_URL = "https://jyotishasha-backend.onrender.com";

export const metadata: Metadata = {
  title: "Ekadashi Vrat Calendar 2026-2027: Dates, Parana Time & Katha",
  description: "Complete Ekadashi calendar with accurate Vrat dates, Parana timings, and detailed Katha videos for 2026 and 2027.",
  alternates: { canonical: "https://yourdomain.com/ekadashi" } // Change to your actual domain
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
  now.setHours(0, 0, 0, 0);

  const allLocalSlugs = getAllEkadashiSlugs();

  const [data2026, data2027] = await Promise.all([
    getAllEkadashiData(2026),
    getAllEkadashiData(2027)
  ]);

  const upcoming2026 = data2026.filter((item: any) => new Date(item.vrat_date) >= now);
  const upcoming2027 = data2027.filter((item: any) => new Date(item.vrat_date) >= now);

  const combinedData = [...upcoming2026, ...upcoming2027].slice(0, 24);
  const nextEkadashi = combinedData[0];

  // --- SCHEMA MARKUP DATA GENERATION ---
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yourdomain.com" },
      { "@type": "ListItem", "position": 2, "name": "Ekadashi Calendar", "item": "https://yourdomain.com/ekadashi" }
    ]
  };

  const eventSchema = combinedData.slice(0, 5).map(item => ({
    "@context": "https://schema.org",
    "@type": "Event",
    "name": `${item.name || item.ekadashi_name} Ekadashi Vrat`,
    "startDate": item.vrat_date,
    "location": { "@type": "Place", "name": "Worldwide/Online" },
    "description": `Fast and Parana timings for ${item.name || item.ekadashi_name} Ekadashi.`
  }));

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "When is the next Ekadashi?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": nextEkadashi ? `The next Ekadashi is ${nextEkadashi.name || nextEkadashi.ekadashi_name} on ${formatDate(nextEkadashi.vrat_date)}.` : "Please check our calendar for upcoming dates."
        }
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#FDFCFE] pb-20 text-gray-900">
      {/* Inject Schemas */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* 1. HERO HEADER */}
      <section className="bg-white border-b border-[#EDE9FE] py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-7xl font-black text-[#2E1065] mb-4 tracking-tight">
            Ekadashi <span className="text-[#6D28D9]">Vrat</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-lg mb-8 uppercase tracking-[0.2em]">
            Calendar 2026 — 2027
          </p>
          
          {nextEkadashi && (
            <div className="inline-flex items-center gap-3 bg-[#6D28D9] text-white px-6 py-3 md:px-10 md:py-5 rounded-2xl md:rounded-3xl shadow-xl shadow-purple-200">
              <div className="relative flex h-2 w-2 md:h-3 md:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 bg-white"></span>
              </div>
              <p className="text-[10px] md:text-lg font-black uppercase tracking-wider">
                 {new Date(nextEkadashi.vrat_date).getTime() === now.getTime() ? "TODAY" : "NEXT"}: {nextEkadashi.name || nextEkadashi.ekadashi_name} — {formatDate(nextEkadashi.vrat_date)}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 2. DYNAMIC GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {combinedData.map((item: any, idx: number) => {

            // --- SMART SLUG & MAPPING LOGIC ---
            const backendSlugRaw = (item.slug || "").toLowerCase().replace("-ekadashi", "");
            
            // Manual Mapping for known mismatches
            const slugMap: { [key: string]: string } = {
              "papmochini": "papamochani",
              "padmini": "padmini",
              "shattila": "shattila",
              "shravan-putrada": "shravana-putrada",
              "paush-putrada": "pausha-putrada"
            };

            const correctedBase = slugMap[backendSlugRaw] || backendSlugRaw;
            
            // Local files se match karna
            const matchedSlug = allLocalSlugs.find(s => 
              s.toLowerCase().includes(correctedBase) || 
              correctedBase.includes(s.toLowerCase().replace("-ekadashi", ""))
            ) || backendSlugRaw;
            
            const finalURL = matchedSlug.includes("ekadashi") ? matchedSlug : `${matchedSlug}-ekadashi`;

            const itemDate = new Date(item.vrat_date);
            itemDate.setHours(0, 0, 0, 0);
            const isToday = itemDate.getTime() === now.getTime();
            const isNextYear = itemDate.getFullYear() === 2027;
            
            const rawName = (typeof item.name === "object" ? item.name.en : item.name) || item.name_en || item.ekadashi_name || "Ekadashi";
            const displayName = rawName.toLowerCase().includes("ekadashi") ? rawName : `${rawName} Ekadashi`;

            return (
              <div
                key={idx}
                className={`group relative rounded-[32px] p-8 transition-all duration-500 hover:-translate-y-3 border 
                ${isToday 
                  ? "bg-gradient-to-br from-orange-50 via-white to-orange-100 border-orange-400 shadow-[0_20px_50px_rgba(234,88,12,0.15)]" 
                  : "bg-gradient-to-br from-[#F5EAFE] via-white to-[#EDE9FE] border-[#DDD6FE] shadow-[0_15px_50px_rgba(109,40,217,0.08)] hover:shadow-[0_25px_60px_rgba(109,40,217,0.18)]"
                }`}
              >
                <div className="flex justify-between items-center mb-8">
                  <span className={`text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${isNextYear ? 'bg-blue-600 text-white' : 'bg-[#EDE9FE] text-[#6D28D9]'}`}>
                    {item.month || "Panchang"} {itemDate.getFullYear()}
                  </span>
                  
                  {isToday ? (
                    <span className="text-[10px] font-black bg-orange-600 text-white px-3 py-1 rounded-lg animate-pulse ring-4 ring-orange-100">TODAY</span>
                  ) : idx === 0 ? (
                    <span className="text-[10px] font-black bg-green-500 text-white px-3 py-1 rounded-lg">UPCOMING</span>
                  ) : null}
                </div>

                <div className="mb-8">
                  <h2 className={`text-2xl md:text-3xl font-black leading-tight transition-colors ${isToday ? 'text-orange-900' : 'text-[#2E1065] group-hover:text-[#6D28D9]'}`}>
                    {displayName}
                  </h2>
                  <p className={`${isToday ? 'text-orange-600' : 'text-[#7C3AED]'} font-bold text-[10px] mt-2 uppercase tracking-[0.2em]`}>
                    {item.paksha || "Tithi"}
                  </p>
                </div>

                <div className={`space-y-5 rounded-[24px] p-6 border ${isToday ? 'bg-white border-orange-200' : 'bg-white/80 border-[#E9D5FF]'}`}>
                  <div className="flex justify-between items-center">
                    <span className="text-[#A78BFA] font-bold text-[10px] uppercase tracking-widest">Date</span>
                    <span className={`font-black text-lg ${isToday ? 'text-orange-700' : 'text-[#2E1065]'}`}>{formatDate(item.vrat_date)}</span>
                  </div>
                  <div className={`h-px w-full ${isToday ? 'bg-orange-100' : 'bg-[#E9D5FF]'}`} />
                  <div className="flex justify-between items-start">
                    <span className="text-[#A78BFA] font-bold text-[10px] uppercase tracking-widest mt-1">Parana</span>
                    <div className="text-right">
                      <p className={`font-black text-sm ${isToday ? 'text-orange-800' : 'text-[#6D28D9]'}`}>
                        {item.parana?.start?.split(" ")[1] || item.parana?.start} - {item.parana?.end?.split(" ")[1] || item.parana?.end}
                      </p>
                      <p className="text-[10px] text-[#A78BFA] font-bold mt-1">On {formatDate(item.parana?.parana_date)}</p>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/ekadashi/${finalURL}`}
                  className={`mt-8 flex items-center justify-center gap-2 w-full py-5 font-black rounded-2xl text-[11px] uppercase tracking-[0.25em] transition-all active:scale-95 ${
                    isToday ? 'bg-orange-600 hover:bg-orange-700' : 'bg-[#4C1D95] hover:bg-[#6D28D9]'
                  } text-white shadow-lg`}
                >
                  Vrat Vidhi & Details →
                </Link>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}