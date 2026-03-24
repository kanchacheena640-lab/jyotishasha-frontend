import Link from "next/link";
import React from "react";

interface QuickActionProps {
  activity: string;
  locale: string;
  isHi: boolean;
}

export const QuickActionGrid = ({ activity, locale, isHi }: QuickActionProps) => {
  
  // 🎯 Intent-Based Content Logic
  const getContent = () => {
    switch (activity) {
      case "naamkaran":
        return {
          title: isHi ? "बच्चे की कुंडली में देखें सारे शुभ योग और दोष" : "Check all Yogas & Doshas in Baby's Kundali",
          desc: isHi ? "नामकरण से पहले जानें ग्रहों का आपके बच्चे के भाग्य पर क्या असर है।" : "Before naming, understand the impact of planets on destiny.",
          link: `/${locale}/kundali`,
          icon: "✨",
          color: "from-purple-900/60 to-indigo-900/60",
          border: "border-purple-400/30"
        };
      case "marriage":
        return {
          title: isHi ? "बेस्ट मैच मेकिंग: अष्टकूट मिलान के 36 गुणों की जांच" : "Best Match Making: Check 8 Factors of Compatibility",
          desc: isHi ? "मुहूर्त के साथ-साथ आपसी तालमेल और मांगलिक दोष की जानकारी बहुत जरूरी है।" : "Compatibility and Manglik Dosha analysis is crucial.",
          link: `/${locale}/love`,
          icon: "❤️",
          color: "from-rose-900/60 to-pink-900/60",
          border: "border-pink-400/30"
        };
      case "grah_pravesh":
        return {
          title: isHi ? "कुंडली से जानें: नए घर में सुख और कर्ज मुक्ति के योग" : "Know via Kundali: Home Comforts & Debt Freedom",
          desc: isHi ? "प्रवेश से पहले अपनी कुंडली के चतुर्थ भाव (सुख स्थान) का विश्लेषण करें।" : "Analyze your 4th house (house of happiness) before moving in.",
          link: `/${locale}/kundali`,
          icon: "🏠",
          color: "from-blue-900/60 to-cyan-900/60",
          border: "border-blue-400/30"
        };
      case "vehicle":
        return {
          title: isHi ? "कुंडली से जानें वाहन सुख और सुरक्षा के योग" : "Know Vehicle Comfort & Safety Yogas via Kundali",
          desc: isHi ? "नया वाहन आपके भाग्य को कैसे प्रभावित करेगा? अभी चेक करें।" : "How will a new vehicle affect your destiny? Check now.",
          link: `/${locale}/kundali`,
          icon: "🚗",
          color: "from-slate-800 to-slate-900",
          border: "border-slate-500/40"
        };
      default:
        return {
          title: isHi ? "आपकी कुंडली का पूर्ण व्यक्तिगत विश्लेषण" : "Your Full Personalized Kundali Analysis",
          desc: isHi ? "मुहूर्त के साथ अपने व्यक्तिगत शुभ ग्रहों की स्थिति भी जानें।" : "Know your personal auspicious planetary positions.",
          link: `/${locale}/kundali`,
          icon: "🔮",
          color: "from-purple-800 to-indigo-900",
          border: "border-purple-500/30"
        };
    }
  };

  const data = getContent();

  return (
    <section className="mb-10 px-1">
      {/* ⚡ High-Intent Personalized Card */}
      <Link 
        href={data.link} 
        className={`group block p-5 bg-gradient-to-br ${data.color} ${data.border} border rounded-3xl shadow-2xl active:scale-95 transition-all mb-4`}
      >
        <div className="flex items-start gap-4">
          <div className="text-3xl filter drop-shadow-md group-hover:scale-110 transition-transform">
            {data.icon}
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-white mb-1 group-hover:underline decoration-yellow-400 underline-offset-4">
              {data.title}
            </h3>
            <p className="text-[11px] text-gray-200 leading-snug opacity-90">
              {data.desc}
            </p>
          </div>
        </div>
        
        {/* Subtle Button-like feel */}
        <div className="mt-4 flex justify-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-white bg-white/10 px-3 py-1 rounded-full border border-white/20">
            {isHi ? "अभी चेक करें →" : "Check Now →"}
          </span>
        </div>
      </Link>

      {/* 📊 Static Quick Links Grid (Sober look) */}
      <div className="grid grid-cols-2 gap-3">
        <Link href={`/${locale}/panchang`} className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center active:bg-white/10 transition-all">
          <span className="block text-[10px] text-purple-300 mb-1 uppercase font-bold tracking-tighter">
            {isHi ? "आज का शुभ समय" : "Today's Time"}
          </span>
          <span className="text-xs font-bold text-white">
            {isHi ? "चौघड़िया" : "Choghadiya"} →
          </span>
        </Link>
        <Link href={`/${locale}/panchang`} className="bg-white/5 border border-white/10 p-3 rounded-2xl text-center active:bg-white/10 transition-all">
          <span className="block text-[10px] text-orange-300 mb-1 uppercase font-bold tracking-tighter">
            {isHi ? "ग्रहों की स्थिति" : "Planetary Status"}
          </span>
          <span className="text-xs font-bold text-white">
            {isHi ? "आज का पंचांग" : "Panchang"} →
          </span>
        </Link>
      </div>
    </section>
  );
};