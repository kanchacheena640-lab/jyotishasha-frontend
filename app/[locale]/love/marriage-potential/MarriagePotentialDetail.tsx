"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadLoveTools } from "@/lib/loveTools";

export default function MarriagePotentialDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [mounted, setMounted] = useState(false);
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true);
    let cancelled = false;
    let payload: any = null;
    try {
      payload = JSON.parse(sessionStorage.getItem("love_payload") || "null");
    } catch {
      payload = null;
    }
    if (!payload || !sessionStorage.getItem("love_summary")) {
      router.replace(`${isHi ? "/hi" : ""}/love`);
      return;
    }
    // Loaded after the main result (lib/loveTools.ts): reuses the load in flight, or loads it again after a reload.
    loadLoveTools(payload).then((state) => {
      if (cancelled) return;
      if (state.status === "ready" && state.marriagePotential) setData(state.marriagePotential);
      else setUnavailable(true);
    });
    return () => { cancelled = true; };
  }, [locale, router]);

  if (!mounted) return null;

  if (unavailable) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e] px-4">
        <div className="max-w-md text-center space-y-5 text-white">
          <p className="text-gray-300">{isHi ? "यह हिस्सा अभी नहीं निकल सका। कृपया थोड़ी देर बाद फिर से देखें।" : "This part couldn't be calculated right now. Please try again in a little while."}</p>
          <button onClick={() => router.push(`${isHi ? "/hi" : ""}/love/result`)} className="px-6 py-3 rounded-xl bg-white text-emerald-900 font-bold">
            {isHi ? "परिणाम पर वापस जाएँ" : "Back to result"}
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      <h2 className="text-3xl md:text-5xl font-black text-center text-emerald-400">
        💍 {isHi ? "विवाह संभावना" : "Marriage Potential"}
      </h2>
      
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
        onClick={() => router.push(`${isHi ? "/hi" : ""}/love/report/relationship_future_report`)}
        className="w-full py-6 bg-white text-indigo-900 font-black text-xl rounded-2xl shadow-2xl transition-transform hover:scale-[1.01] active:scale-95"
      >
        {isHi ? "पूरी रिपोर्ट अनलॉक करें" : "Unlock Full Report"}
      </button>
    </div>
  );
}