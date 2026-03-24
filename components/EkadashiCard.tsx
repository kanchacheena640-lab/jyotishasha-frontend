"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ✅ Date Formatter (e.g., 30 March 2026)
function formatWesternDate(dateStr: string | undefined, locale: string) {
  if (!dateStr || dateStr === "TBA") return "TBA";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const monthsHi = ["जनवरी", "फरवरी", "मार्च", "अप्रैल", "मई", "जून", "जुलाई", "अगस्त", "सितंबर", "अक्टूबर", "नवंबर", "दिसंबर"];
    const monthsEn = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    if (locale === "hi") return `${day} ${monthsHi[month - 1]} ${year}`;
    return `${monthsEn[month - 1]} ${day}, ${year}`;
  } catch { return dateStr; }
}

// ✅ Time Extractor (Sirf "06:00" nikalne ke liye)
function extractTime(dateTimeStr: string | undefined) {
  if (!dateTimeStr) return "";
  // String mein se HH:MM dhoondne ke liye (e.g. 06:00)
  const match = dateTimeStr.match(/(\d{2}:\d{2})/);
  return match ? match[0] : dateTimeStr;
}

export default function EkadashiCard({ item, idx, locale, isToday }: any) {
  const isHi = locale === "hi";
  const isUpcoming = !isToday && idx === 0;

  // Name & Date Logic
    // 1. Name nikaalne ka sabse majboot tarika
    const rawName = 
        (typeof item.name === "object" ? (item.name[locale] || item.name.en) : null) || 
        (isHi ? item.name_hi : item.name_en) || 
        item.name || 
        item.ekadashi_name || 
        "";

    // 2. Agar rawName abhi bhi khali hai, toh fallback "Ekadashi" par jao
    const baseName = rawName || (isHi ? "एकादशी" : "Ekadashi");

    // 3. Display Name logic (Check if "Ekadashi" already exists)
    const displayName = baseName.toLowerCase().includes("ekadashi") || baseName.includes("एकादशी")
        ? baseName
        : `${baseName} ${isHi ? "एकादशी" : "Ekadashi"}`;
  
  // PARANA BOX DATA (The Fix)
  // Hum pehle time string se date nikalenge (e.g. 2026-03-30)
  const paranaRawDate = item.parana?.start?.split(" ")[0] || item.vrat_date; 
  const paranaFormattedDate = formatWesternDate(paranaRawDate, locale);
  const startTime = extractTime(item.parana?.start);
  const endTime = extractTime(item.parana?.end);

  // 🔥 FIX: Agar locale 'en' hai toh khali string rakho, varna /hi ya /te lagao
const langPath = locale === 'en' ? '' : `/${locale}`;
const slugPath = item.slug?.includes("ekadashi") ? item.slug : `${item.slug}-ekadashi`;

const href = `${langPath}/ekadashi/${slugPath}`;

  return (
    <Link href={href} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        className={`relative overflow-hidden rounded-[3rem] border p-8 transition-all duration-500 ${
          isUpcoming ? "border-purple-200 bg-white shadow-2xl shadow-purple-100" : "border-gray-100 bg-white"
        }`}
      >
        <div className="relative z-10 space-y-6">
          {/* Badge & Arrow */}
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-purple-600 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-purple-200">
              {isHi ? "अगली एकादशी" : "Next Up"}
            </span>
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center text-white shadow-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </div>
          </div>

          {/* Title Section */}
          <div className="space-y-1">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest">
              {formatWesternDate(item.vrat_date, locale)}
            </p>
            <h2 className="text-3xl font-black tracking-tight text-gray-950">
              {displayName}
            </h2>
          </div>

          {/* 🕒 THE FIXED PARANA BOX (Matching your requirement) */}
          <div className="rounded-[2rem] bg-gray-50/50 border border-gray-100 p-6 flex items-center gap-5">
            <div className="h-14 w-14 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-purple-600 border border-purple-50">
              <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                {isHi ? "पारण का समय" : "Parana Details"}
              </p>
              {/* Step 1: Date dikhao */}
              <p className="text-sm font-bold text-gray-900 tracking-tight">
                {paranaFormattedDate}
              </p>
              {/* Step 2: Time to Time dikhao */}
              <p className="text-lg font-black text-purple-600 leading-none">
                {startTime} — {endTime}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-2 text-xs font-black uppercase tracking-widest text-gray-400 group-hover:text-purple-600 transition-colors">
            {isHi ? "पूरी जानकारी" : "View Full Details"}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}