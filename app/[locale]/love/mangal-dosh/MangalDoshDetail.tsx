"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MangalDoshDetail({ locale }: { locale: string }) {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false); // 🛡️ Server crash se bachane ke liye
  const isHi = locale === "hi";

  useEffect(() => {
    setMounted(true); // Pehle confirm karo ki hum browser par hain
    
    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace(`/${locale}/love`);
      return;
    }

    try {
      const parsed = JSON.parse(s);
      // 🔥 Safety Check: API response agar data.data.mangal_dosh mein hai
      const mangalData = parsed?.data?.mangal_dosh || parsed?.mangal_dosh;
      setData(mangalData);
    } catch (e) {
      console.error("Mangal Dosh Parse Error", e);
      router.replace(`/${locale}/love`);
    }
  }, [router, locale]);

  // 🛑 Server-side par render nahi hone dega (No Mismatch Crash)
  if (!mounted) return null;

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f0a1e]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-red-500/30 border-t-red-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-400 animate-pulse font-medium">
            {isHi ? "मंगल दोष विश्लेषण लोड हो रहा है…" : "Analyzing Mangal Dosh…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-10 bg-[#0f0a1e] min-h-screen text-white">
      
      {/* 🏁 Header & Signal Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-5xl font-black text-red-500 uppercase">
          🔥 {isHi ? "मंगल दोष विश्लेषण" : "Mangal Dosh Analysis"}
        </h1>
        <div className={`inline-block px-8 py-3 rounded-full border-2 font-black tracking-widest ${
          data?.signal === "GREEN" ? "bg-green-500/10 border-green-500/50 text-green-400" : "bg-red-500/10 border-red-500/50 text-red-400"
        }`}>
          {isHi ? "संकेत" : "SIGNAL"}: {data?.signal}
        </div>
      </div>

      {/* 📊 Profiles (Boy & Girl) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Boy Card */}
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <h2 className="text-xl font-bold text-blue-400 mb-4">{isHi ? "लड़के की कुंडली" : "Boy's Chart"}</h2>
          <p className="text-sm font-semibold mb-4 text-gray-200 border-l-4 border-blue-500 pl-3">
             {data?.boy?.status?.is_mangalic}
          </p>
          <ul className="space-y-2">
            {data?.boy?.summary_block?.points?.map((p: string, i: number) => (
              <li key={i} className="text-xs text-gray-400">• {p}</li>
            ))}
          </ul>
        </div>

        {/* Girl Card */}
        <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
          <h2 className="text-xl font-bold text-pink-400 mb-4">{isHi ? "लड़की की कुंडली" : "Girl's Chart"}</h2>
          <p className="text-sm font-semibold mb-4 text-gray-200 border-l-4 border-pink-500 pl-3">
             {data?.girl?.status?.is_mangalic}
          </p>
          <ul className="space-y-2">
            {data?.girl?.summary_block?.points?.map((p: string, i: number) => (
              <li key={i} className="text-xs text-gray-400">• {p}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-full md:w-auto text-center mt-12">
        <button
          onClick={() => router.push(`/${locale}/love/report/relationship_future_report`)}
          className="w-full md:w-auto px-10 py-5 bg-white text-indigo-900 font-black text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl"
        >
          {isHi ? "अभी पूरी रिपोर्ट प्राप्त करें" : "Unlock Full Report"}
        </button>
      </div>
    </div>
  );
}