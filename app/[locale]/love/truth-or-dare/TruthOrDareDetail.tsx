"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TruthOrDareDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true);
    const tools = sessionStorage.getItem("love_tools");
    if (!tools) {
      router.replace(`/${locale}/love`);
      return;
    }

    try {
      const parsed = JSON.parse(tools);
      // 🔥 DYNAMIC MAPPING: Postman JSON structure ke hisab se data dhoondo
      let td = parsed.truth_or_dare;
      
      // Agar API response mein 'data' key nested hai
      if (td && td.data) {
        td = td.data;
      }
      
      setData(td);
    } catch (e) {
      console.error("Truth or Dare Parse Error");
      router.replace(`/${locale}/love`);
    }
  }, [router, locale]);

  if (!mounted) return null;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Verdict logic based on API (TRUTH or DARE)
  const isTruth = data.verdict === "TRUTH";

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      
      {/* 🔮 Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-300 uppercase tracking-tighter">
          {isHi ? "ट्रुथ या डेयर" : "Truth or Dare"}
        </h1>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
          {isHi ? "रिलेशनशिप रियलिटी चेक" : "Relationship Reality Check"}
        </p>
      </div>

      {/* 🚥 Verdict Card (Dynamic Color & Text) */}
      <div className={`rounded-[2.5rem] p-10 text-center border-4 shadow-2xl transition-all duration-700 ${
        isTruth 
          ? "bg-emerald-600/10 border-emerald-500/30 shadow-emerald-500/10" 
          : "bg-rose-600/10 border-rose-500/30 shadow-rose-500/10"
      }`}>
        <p className={`text-7xl md:text-9xl font-black italic mb-4 drop-shadow-2xl ${isTruth ? 'text-emerald-400' : 'text-rose-500'}`}>
          {data.verdict}
        </p>
        <p className="text-lg md:text-2xl font-medium text-gray-200">
          {data.verdict_line}
        </p>
      </div>

      {/* 📊 Analysis Blocks (Looping through API blocks) */}
      <div className="grid gap-4">
        {data.blocks?.map((block: any, i: number) => (
          <div 
            key={block.id || i} 
            className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/[0.08] transition-all group"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-2 h-2 rounded-full ${isTruth ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
              <h3 className="font-black text-white uppercase text-xs tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                {block.title}
              </h3>
            </div>
            <p className="text-sm md:text-lg text-gray-300 leading-relaxed font-medium">
              {block.text}
            </p>
          </div>
        ))}
      </div>

      {/* 🛡️ Disclaimer Footer */}
      <div className="text-center">
        <p className="text-[10px] text-gray-600 uppercase tracking-widest mb-10">
          {data.disclaimers?.[0]}
        </p>
        
        {/* 🚀 Premium CTA */}
        <button
          onClick={() => router.push(`/${locale}/love/report/relationship_future_report`)}
          className="w-full py-6 bg-white text-rose-900 font-black text-xl rounded-2xl shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
        >
          {isHi ? "पूरी रिपोर्ट अनलॉक करें" : "Unlock Full Report"}
        </button>
      </div>

    </div>
  );
}