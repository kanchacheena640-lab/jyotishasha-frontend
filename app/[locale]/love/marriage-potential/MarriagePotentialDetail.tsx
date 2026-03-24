"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MarriagePotentialDetail({ locale }: { locale: string }) {
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
      
      // 🔥 EXACT FIX: Tumhare JSON mein structure 'data.data.user_result' hai
      // Isliye hum deep check kar rahe hain taaki crash zero ho jaye
      let mp = parsed.marriage_potential;
      
      // Agar 'mp' ke andar fir se 'data' key hai (jaise tumhare Postman result mein hai)
      if (mp && mp.data) {
        mp = mp.data;
      }
      
      setData(mp);
    } catch (e) {
      console.error("Data Parse Error");
      router.replace(`/${locale}/love`);
    }
  }, [locale, router]);

  if (!mounted) return null;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      <h1 className="text-3xl md:text-5xl font-black text-center text-emerald-400">
        💍 {isHi ? "विवाह संभावना" : "Marriage Potential"}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Card: Ravi */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center shadow-xl hover:bg-white/[0.07] transition-all">
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {data.user_result?.name || (isHi ? "यूज़र" : "User")}
          </h3>
          <p className="text-7xl font-black text-white">{data.user_result?.pct ?? 0}%</p>
          <p className="mt-2 text-emerald-400 font-bold text-sm uppercase">
            Band: {data.user_result?.band || "N/A"}
          </p>
          <div className="mt-6 text-left space-y-2 border-t border-white/10 pt-4">
            {data.user_result?.reasons?.map((r: string, i: number) => (
              <p key={i} className="text-[12px] text-gray-400 leading-snug flex gap-2">
                <span className="text-emerald-500">•</span> {r}
              </p>
            ))}
          </div>
        </div>

        {/* Partner Card: Rita */}
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8 text-center shadow-xl hover:bg-white/[0.07] transition-all">
          <h3 className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-4">
            {data.partner_result?.name || (isHi ? "पार्टनर" : "Partner")}
          </h3>
          <p className="text-7xl font-black text-white">{data.partner_result?.pct ?? 0}%</p>
          <p className="mt-2 text-emerald-400 font-bold text-sm uppercase">
            Band: {data.partner_result?.band || "N/A"}
          </p>
          <div className="mt-6 text-left space-y-2 border-t border-white/10 pt-4">
            {data.partner_result?.reasons?.map((r: string, i: number) => (
              <p key={i} className="text-[12px] text-gray-400 leading-snug flex gap-2">
                <span className="text-emerald-500">•</span> {r}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Overall Summary Line */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[2rem] text-center italic text-lg leading-relaxed shadow-2xl text-emerald-100">
        "{data.overall_line || (isHi ? "विश्लेषण उपलब्ध नहीं है" : "Analysis not available")}"
      </div>

      <button
        onClick={() => router.push(`/${locale}/love/report/relationship_future_report`)}
        className="w-full py-6 bg-white text-indigo-900 font-black text-xl rounded-2xl shadow-2xl transition-transform hover:scale-[1.01] active:scale-95"
      >
        {isHi ? "पूरी रिपोर्ट अनलॉक करें" : "Unlock Full Report"}
      </button>
    </div>
  );
}