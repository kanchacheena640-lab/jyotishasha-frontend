import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { zodiacData, type ZodiacSign } from "@/lib/zodiac";
import DailyHoroscopeBlock from "@/components/DailyHoroscopeBlock";
import Link from "next/link";

interface Props {
  params: { locale: string; sign: string };
}

// 🌐 Metadata logic for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const isHi = params.locale === "hi";
  const sign = params.sign.toLowerCase() as ZodiacSign;
  const data = zodiacData[sign];

  if (!data) {
    return { title: isHi ? "दैनिक राशिफल | ज्‍योतिष आशा" : "Daily Horoscope | Jyotishasha" };
  }

  // Use Hindi Name if available in your zodiacData, else fallback
  const signName = isHi ? (data.name_hi || data.name) : data.name;
  
  const today = new Date().toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const title = isHi 
    ? `${signName} दैनिक राशिफल – ${today} | स्वभाव, प्रेम और करियर`
    : `${signName} Daily Horoscope – ${today} | Traits, Love & Compatibility`;

  return {
    title,
    description: isHi ? `${signName} के लिए आज का राशिफल। जानें अपना स्वभाव, प्रेम जीवन और भाग्य।` : `Read ${signName} daily horoscope for ${today}.`,
    alternates: {
      canonical: `https://jyotishasha.com${isHi ? '/hi' : ''}/daily-horoscope/${sign}`,
    },
  };
}

export default function DailyHoroscopePage({ params }: Props) {
  const { locale, sign: rawSign } = params;
  const isHi = locale === "hi";
  const sign = rawSign.toLowerCase() as ZodiacSign;

  if (!zodiacData[sign]) notFound();

  const data = zodiacData[sign];
  const langPath = isHi ? "/hi" : "";
  
  const today = new Date().toLocaleDateString(isHi ? "hi-IN" : "en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const signName = isHi ? (data.name_hi || data.name) : data.name;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* 🔵 HERO SECTION */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-800 to-indigo-900 p-8 md:p-12 mb-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
            {signName} {isHi ? "दैनिक राशिफल" : "Daily Horoscope"}
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium opacity-90">
            {today}
          </p>
        </div>
        {/* Subtle background icon/glow */}
        <div className="absolute -right-10 -top-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      </div>

      <section className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Horoscope Content Block */}
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8">
            <DailyHoroscopeBlock 
              sign={sign} 
              lang={params.locale as "en" | "hi"} // Ye "as" lagane se error chala jayega
            />
          </div>
          
          <p className="text-xs text-gray-400 italic px-2">
            {isHi 
              ? "यह राशिफल वैदिक ज्योतिष के सिद्धांतों और ग्रहों के गोचर पर आधारित है।" 
              : "This daily horoscope is prepared using classical Vedic astrology principles."}
          </p>
        </div>

        {/* SIDEBAR CTA */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-200">
            <h3 className="text-xl font-bold mb-3">{isHi ? "ज्‍योतिष आशा ऐप" : "Jyotishasha App"}</h3>
            <p className="text-sm text-indigo-100 mb-6 leading-relaxed">
              {isHi ? "अपना व्यक्तिगत राशिफल और पंचांग मोबाइल पर पाएं। पहला प्रश्न मुफ्त!" : "Get personalized insights on mobile. First question is FREE!"}
            </p>
            <Link href={`${langPath}/app-download`} className="block text-center py-3 rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition">
              {isHi ? "📱 ऐप डाउनलोड करें" : "📱 Download App"}
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-4">{isHi ? "और पढ़ें" : "Explore More"}</h3>
            <div className="flex flex-col gap-3">
              <Link href={`${langPath}/monthly-horoscope/${sign}`} className="w-full text-center py-3 rounded-xl border border-indigo-100 font-bold text-gray-700 hover:bg-indigo-50 transition">
                {isHi ? "📅 मासिक राशिफल" : "📅 Monthly Horoscope"}
              </Link>
              <Link href={`${langPath}/yearly-horoscope/${sign}`} className="w-full text-center py-3 rounded-xl border border-indigo-100 font-bold text-gray-700 hover:bg-indigo-50 transition">
                {isHi ? "🗓️ वार्षिक राशिफल" : "🗓️ Yearly Horoscope"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 📚 STATIC ZODIAC INFO (Hybrid) */}
      <section className="bg-gray-50 rounded-3xl p-8 md:p-12 space-y-12 text-gray-800 shadow-inner">
        {[
          { title: isHi ? "स्वभाव" : "Nature", content: isHi ? data.nature_hi : data.nature },
          { title: isHi ? "प्रेम संबंध" : "Love", content: isHi ? data.love_hi : data.love },
          { title: isHi ? "आर्थिक स्थिति" : "Finance", content: isHi ? data.finance_hi : data.finance },
          { title: isHi ? "अनुकूलता" : "Compatibility", content: isHi ? data.compatibility_hi : data.compatibility }
        ].map((item, idx) => (
          <div key={idx} className="border-b border-gray-200 pb-8 last:border-0">
            <h2 className="text-2xl font-black text-indigo-900 mb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-indigo-500 rounded-full"></span>
              {signName} {item.title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700">{item.content}</p>
          </div>
        ))}
      </section>
    </div>
  );
}