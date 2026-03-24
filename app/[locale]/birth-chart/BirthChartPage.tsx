'use client';
import React, { useEffect, useState } from 'react';
import KundaliChartNorth from '@/components/KundaliChartNorth';

// 🔥 Hindi Short Names: Professional Vedic Chart style
const planetMap: Record<string, string> = {
  Sun: "सू", Moon: "चं", Mars: "मं", Mercury: "बु",
  Jupiter: "गु", Venus: "शु", Saturn: "श", Rahu: "रा", Ketu: "के"
};

const rashiMap: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6, 
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
};

export default function BirthChartPage({ params }: { params: { locale: string } }) {
  const [planets, setPlanets] = useState<{ name: string; house: number }[]>([]);
  const [lagnaRashi, setLagnaRashi] = useState<number>(1);
  const [err, setErr] = useState('');
  const isHi = params.locale === 'hi';

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/full-kundali', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Ravi', // Dynamic handling future mein kar sakte ho
            dob: '1985-03-31',
            tob: '19:45',
            latitude: 26.8466937,
            longitude: 80.946166,
          }),
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        setLagnaRashi(rashiMap[data?.lagna_sign] || 1);

        const arr = Array.isArray(data?.Planets) ? data.Planets : [];
        const cleaned = arr
          .filter((p: any) => p?.name && !/ascendant/i.test(p.name))
          .map((p: any) => ({
            // UI ke liye short names, par logic wahi house alignment ka
            name: isHi ? (planetMap[p.name] || p.name) : String(p.name),
            house: typeof p.house === 'string' ? parseInt(p.house, 10) : Number(p.house),
          }))
          .filter((p: any) => Number.isFinite(p.house) && p.house >= 1 && p.house <= 12);
        
        setPlanets(cleaned);
      } catch (e: any) {
        setErr(isHi ? 'कुंडली लोड करने में विफल' : 'Failed to load chart');
      }
    })();
  }, [isHi]);

  return (
    <div className="p-4 md:p-8 bg-[#0f0a1e] min-h-screen text-white">
      {/* 🚀 SEO Strategy: Crawlers ke liye important keywords */}
      <h1 className="sr-only">
        {isHi ? "निशुल्क जन्म कुंडली और वैदिक चार्ट ऑनलाइन" : "Free Birth Chart and Vedic Kundali Online"}
      </h1>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-4xl font-black text-indigo-400">
            {isHi ? 'आपकी जन्म कुंडली' : 'Your Birth Chart'}
          </h2>
          <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mt-2">
            {isHi ? "उत्तर भारतीय शैली (लहिरी अयनांश)" : "North Indian Style (Lahiri Ayanamsa)"}
          </p>
        </div>

        {err && <p className="text-red-500 text-center bg-red-500/5 p-3 rounded-xl border border-red-500/20">{err}</p>}

        {/* 🎨 Chart Container with extra glow for Premium look */}
        <div className="flex justify-center bg-white/[0.03] p-6 rounded-[2.5rem] border border-white/10 shadow-[0_0_40px_rgba(79,70,229,0.05)] transition-all hover:border-indigo-500/30">
          <KundaliChartNorth 
              planets={planets} 
              lagnaRashi={lagnaRashi} 
              size={400} 
          />
        </div>

        {/* 📝 SEO & Trust Section */}
        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-400 text-sm leading-relaxed max-w-md mx-auto">
            {isHi 
              ? "यह वैदिक चार्ट उच्च-सटीक खगोलीय गणनाओं (Swiss Ephemeris) और वास्तविक अक्षांश-देशांतर के आधार पर तैयार किया गया है।" 
              : "This Vedic chart is computed using high-precision astronomical data and real-time geographic coordinates."}
          </p>
          
          <div className="flex justify-center gap-4 text-[10px] font-bold text-indigo-300 uppercase">
             <span>● {isHi ? "सटीक गणना" : "Accurate Math"}</span>
             <span>● {isHi ? "वैदिक नियम" : "Vedic Rules"}</span>
             <span>● {isHi ? "लहिरी मानक" : "Lahiri Standard"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}