"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MatchmakingCompatibilityDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // 🛡️ Crash Guard
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true); // Confirm browser load
    
    if (typeof window !== "undefined") {
      const s = sessionStorage.getItem("love_summary");
      if (!s) {
        router.replace(`/${locale}/love`);
        return;
      }

      try {
        const parsed = JSON.parse(s);
        // 🔥 Safety Check: API result usually has data.data
        const mainData = parsed?.data || parsed;
        setData(mainData);
      } catch (e) {
        console.error("Matchmaking Parse Error", e);
        router.replace(`/${locale}/love`);
      }
    }
  }, [router, locale]);

  // 🛑 Prevent Server-side Crash
  if (!mounted) return null;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Data structure mapping from your JSON
  const verdict = data.verdict || {};
  const kootaNotes = data.sections?.find((s: any) => s.id === "koota_notes")?.data?.koota_notes || [];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 bg-[#0f0a1e] min-h-screen text-white animate-in fade-in duration-500">
      
      {/* 🧿 Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
          🧿 {isHi ? "अष्टकूट मिलान" : "Matchmaking Compatibility"}
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          {isHi ? "वैदिक अष्टकूट विवाह विश्लेषण" : "Vedic Ashtakoot Marriage Analysis"}
        </p>
      </div>

      {/* 🏆 Score Card */}
      <div className="rounded-[2.5rem] border border-indigo-500/20 bg-indigo-500/5 p-10 text-center shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none text-9xl">🧿</div>
        <h2 className="text-gray-400 text-xs font-black uppercase mb-4 tracking-widest">
          {isHi ? "कुल अष्टकूट स्कोर" : "Total Ashtakoot Score"}
        </h2>
        <p className="text-7xl md:text-8xl font-black text-white drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
           {verdict.score} <span className="text-2xl opacity-30">/ {verdict.max_score}</span>
        </p>
        <p className="mt-6 text-gray-300 italic text-lg leading-relaxed">
           "{verdict.reason_line}"
        </p>
      </div>

      {/* 📊 Koota List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kootaNotes.map((k: any, i: number) => (
          <div key={i} className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all group">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest">{k.key.replace("_", " ")}</span>
              <span className="bg-indigo-500/20 px-3 py-1 rounded-lg text-xs font-bold">{k.score} / {k.max}</span>
            </div>
            <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors leading-relaxed">
              {k.note}
            </p>
          </div>
        ))}
      </div>

      {/* 🚀 Premium CTA */}
      <button
        onClick={() => router.push(`/${locale}/love/report/relationship_future_report`)}
        className="w-full py-6 bg-white text-indigo-900 font-black text-xl rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
      >
        {isHi ? "पूरी रिपोर्ट अनलॉक करें" : "Unlock Full Report"}
      </button>
      
    </div>
  );
}