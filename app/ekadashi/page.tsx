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
  // 1. Pehle ye line add karo (Isse error chali jayegi)
  const currentYear = 2026; 

  // 2. Phir data fetch karo
  const allData = await getAllEkadashiData(currentYear);
  
  const now = new Date();
  const nextEkadashi = allData.find((item: any) => new Date(item.vrat_date) >= now) || allData[0];

  // --- Combined JSON-LD (Events + FAQ) ---
  // --- JSON-LD Schema (Strict Event + FAQ) ---
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
            "startDate": item.vrat_date, // Proper ISO Date format (YYYY-MM-DD)
            "location": {
              "@type": "Place",
              "name": "Jyotishasha - Online Vedic Panchang",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            },
            "description": `${item.name} Ekadashi Vrat date, Parana timings: ${item.parana.start} - ${item.parana.end}`,
            "url": `https://www.jyotishasha.com/ekadashi/${item.slug}`,
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
          }
        }))
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the Ekadashi dates in 2026?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `In 2026, there are 24 Ekadashis. The next upcoming one is ${nextEkadashi?.name} on ${formatDate(nextEkadashi?.vrat_date)}.`
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(combinedSchema) }} />

      {/* --- SEO Header --- */}
      <section className="max-w-7xl mx-auto px-4 py-12 text-center">
        <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">Spiritual Guide 2026</span>
        <h1 className="text-4xl md:text-6xl font-black text-gray-900 mt-2 mb-6">
          Ekadashi <span className="text-blue-700">Calendar 2026</span>
        </h1>
        
        {nextEkadashi && (
          <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-100 p-2 pr-5 rounded-full mb-8">
            <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">Next Vrat</span>
            <p className="text-sm font-bold text-blue-900">
              {nextEkadashi.name}: <span className="text-orange-600">{formatDate(nextEkadashi.vrat_date)}</span>
            </p>
          </div>
        )}
      </section>

      {/* --- Blue Section with Cards --- */}
      <section className="bg-[#0f172a] py-16 px-4 rounded-t-[40px] md:rounded-t-[80px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allData.map((item: any, index: number) => {
             const isNext = item.slug === nextEkadashi?.slug;
             const isPast = new Date(item.vrat_date) < now;
             return (
               <div key={index} className={`bg-white rounded-3xl p-8 transition-all ${isPast ? "opacity-50 grayscale" : "hover:-translate-y-2 shadow-2xl"} ${isNext ? "ring-4 ring-orange-500 ring-offset-4 ring-offset-[#0f172a]" : ""}`}>
                 <h2 className="text-2xl font-black text-gray-900">{item.name}</h2>
                 <p className="text-blue-600 font-bold text-[10px] uppercase mb-4">{item.month} Month</p>
                 <div className="space-y-2 border-t pt-4 mb-6 text-sm">
                   <div className="flex justify-between"><span className="text-gray-400 font-medium">Date</span><span className="font-bold">{formatDate(item.vrat_date)}</span></div>
                   <div className="text-right">
                        <p>{item.parana.start} - {item.parana.end}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{formatDate(item.parana.parana_date)}</p>
                        </div>
                 </div>
                 <Link href={`/ekadashi/${item.slug}`} className="block w-full text-center py-3 bg-gray-900 text-white font-black rounded-xl text-xs hover:bg-blue-700 transition-all">VIEW FULL DETAILS</Link>
               </div>
             );
          })}
        </div>
      </section>

      {/* --- Video Section (Newly Added) --- */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="bg-gray-900 rounded-[32px] overflow-hidden shadow-2xl">
          <div className="p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-black text-white mb-2">Watch Ekadashi Mahatmya</h2>
            <p className="text-gray-400 text-sm">Learn the significance of all Ekadashi Vrats in one video</p>
          </div>
          <div className="aspect-video bg-black">
            <iframe 
              className="w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Bhai yahan apna channel/video link daal dena
              title="Ekadashi Katha Video"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* --- FAQ / SEO Content --- */}
      <section className="max-w-4xl mx-auto px-6 pb-20">
        <h2 className="text-3xl font-black mb-8 text-gray-900 border-b-4 border-blue-100 pb-2 inline-block">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-lg text-blue-900">What is the best way to keep Ekadashi fast?</h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
              The best way is to maintain a 'Sattvic' diet. Most devotees prefer a waterless (Nirjala) fast or a fruit-based (Phalahar) diet, avoiding grains and beans completely.
            </p>
          </div>
          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <h3 className="font-bold text-lg text-blue-900">Why is Parana timing so important?</h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base leading-relaxed">
              Breaking the fast (Parana) within the calculated Muhurat is crucial. Doing it after the Tithi ends or during Hari Vasara is considered incomplete according to Shastras.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}