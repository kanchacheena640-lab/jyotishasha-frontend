"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoveResultSummaryDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const isHi = locale === "hi";

  const [summary, setSummary] = useState<any>(null);
  const [tools, setTools] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const s = sessionStorage.getItem("love_summary");
    const t = sessionStorage.getItem("love_tools");

    if (!s) {
      router.replace(`/${locale}/love`);
      return;
    }

    try {
      const parsedSummary = JSON.parse(s);
      const parsedTools = t ? JSON.parse(t) : {};

      // 🔥 POSTMAN FIX: Tumhare JSON mein asli data 'data' key ke andar hai
      // Isliye hum summary.data ko set kar rahe hain
      setSummary(parsedSummary.data || parsedSummary);
      setTools(parsedTools);
    } catch (e) {
      console.error("Dashboard Parsing Error", e);
      router.replace(`/${locale}/love`);
    }
  }, [router, locale]);

  // 🛡️ Blank Screen Guard
  if (!mounted || !summary) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Data Extraction with Safety (Matches your Postman structure)
  const ashtakoot = summary.ashtakoot || {};
  const mangal = summary.mangal_dosh || {};
  
  // Tools safety (Marriage & Truth/Dare)
  const marriage = tools.marriage_potential?.data || tools.marriage_potential;
  const truthDare = tools.truth_or_dare?.data || tools.truth_or_dare;

  const go = (path: string) => router.push(`/${locale}${path}`);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8 bg-[#0f0a1e] min-h-screen text-white animate-in fade-in duration-500">
      
      {/* 💑 Header */}
      <div className="text-center space-y-3 pt-6">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-orange-300">
          {isHi ? "मिलान परिणाम" : "Matchmaking Result"}
        </h1>
        <p className="text-gray-500 text-sm italic">
          {isHi ? "आपके वैदिक विश्लेषण का सारांश" : "Summary of your Vedic analysis"}
        </p>
      </div>

      {/* 📊 Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. Ashtakoot Tile */}
        <div onClick={() => go("/love/matchmaking-compatibility")} className="cursor-pointer rounded-[2.5rem] border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-indigo-300">🧿 {isHi ? "अष्टकूट" : "Compatibility"}</h2>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-1">{isHi ? "रिपोर्ट देखें →" : "View Report →"}</p>
            </div>
            <p className="text-4xl font-black">{ashtakoot.total_score || 0}<span className="text-sm opacity-30">/36</span></p>
          </div>
        </div>

        {/* 2. Mangal Dosh Tile */}
        <div onClick={() => go("/love/mangal-dosh")} className="cursor-pointer rounded-[2.5rem] border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-orange-400">🔥 {isHi ? "मंगल दोष" : "Mangal Dosh"}</h2>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-1">{isHi ? "विवरण →" : "Details →"}</p>
            </div>
            <span className={`px-4 py-1 rounded-xl text-[10px] font-black border ${mangal.signal === "GREEN" ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"}`}>
              {mangal.signal || "CHECK"}
            </span>
          </div>
        </div>

        {/* 3. Truth or Dare Tile */}
        <div onClick={() => go("/love/truth-or-dare")} className="cursor-pointer rounded-[2.5rem] border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-rose-400">⚡ {isHi ? "ट्रुथ या डेयर" : "Truth or Dare"}</h2>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-1">{isHi ? "रिस्क चेक →" : "Risk Check →"}</p>
            </div>
            <span className={`px-4 py-1 rounded-xl text-[10px] font-black border ${truthDare?.verdict === "TRUTH" ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30"}`}>
              {truthDare?.verdict || "PENDING"}
            </span>
          </div>
        </div>

        {/* 4. Marriage Potential Tile */}
        <div onClick={() => go("/love/marriage-potential")} className="cursor-pointer rounded-[2.5rem] border border-white/10 bg-white/5 p-8 hover:bg-white/10 transition-all shadow-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-emerald-400">💍 {isHi ? "विवाह संभावना" : "Marriage"}</h2>
              <p className="text-[10px] text-gray-500 font-black tracking-widest uppercase mt-1">{isHi ? "भविष्य →" : "Future →"}</p>
            </div>
            <span className="text-2xl font-black text-white">{marriage?.user_result?.pct || 0}%</span>
          </div>
        </div>
      </div>

      {/* 🔮 Premium CTA */}
      <div className="rounded-[3rem] bg-gradient-to-tr from-indigo-700 via-purple-700 to-rose-700 p-10 text-center shadow-2xl border border-white/20">
        <h2 className="text-2xl md:text-3xl font-black italic mb-4">{isHi ? "पूरी रिपोर्ट प्राप्त करें" : "Get Full Future Report"}</h2>
        <button onClick={() => go("/love/report/relationship_future_report")} className="px-12 py-5 bg-white text-indigo-900 font-black text-lg rounded-2xl hover:scale-105 transition-all shadow-xl">
          {isHi ? "अनलॉक करें" : "Unlock Now"}
        </button>
      </div>

    </div>
  );
}