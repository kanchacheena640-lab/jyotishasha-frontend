"use client";
import { useState } from "react";

export default function HoliPujaVidhi({ isHi }: { isHi: boolean }) {
  const steps = [
    {
      id: 1,
      title: isHi ? "पूजा सामग्री (Puja Samagri)" : "Puja Essentials",
      content: isHi 
        ? "रोली, चावल, फूल, कच्चा सूत, साबुत हल्दी, मूंग, बताशे, गुलाल और एक लोटा जल।"
        : "Roli, Rice (Akshat), Flowers, Raw Cotton Thread, Whole Turmeric, Moong Dal, Batasha, Gulal, and a pot of Water."
    },
    {
      id: 2,
      title: isHi ? "होलिका पूजन विधि (Step-by-Step)" : "Step-by-Step Ritual",
      content: isHi
        ? "होलिका के पास जाकर पूर्व या उत्तर दिशा की ओर मुख करके बैठें। होलika पर जल छिड़कें और पूजन सामग्री अर्पित करें। प्रहलाद और नरसिंह भगवान का ध्यान करें।"
        : "Sit facing East or North near Holika. Sprinkle water and offer puja samagri. Meditate on Lord Narasimha and Bhakt Prahlad."
    },
    {
      id: 3,
      title: isHi ? "परिक्रमा और सूत (Circumambulation)" : "Parikrama Rules",
      content: isHi
        ? "कच्चे सूत को होलिका के चारों ओर 3 या 7 बार लपेटें (परिक्रमा करें)। इसके बाद जल अर्पित कर अग्नि प्रज्वलित की जाती है।"
        : "Wrap the raw cotton thread 3 or 7 times around the Holika (Parikrama). After this, offer water and light the bonfire."
    }
  ];

  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <section className="mb-24 px-2">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl md:text-4xl font-black text-slate-950 mb-8 tracking-tight">
          {isHi ? "होलिका दहन पूजन विधि" : "Holika Dahan Puja Vidhi"}
        </h3>
        
        <div className="space-y-4">
          {steps.map((step) => (
            <div 
              key={step.id} 
              className={`rounded-3xl border transition-all duration-300 ${openId === step.id ? 'border-purple-200 bg-purple-50/30' : 'border-slate-100 bg-white'}`}
            >
              <button
                onClick={() => setOpenId(openId === step.id ? null : step.id)}
                className="w-full flex items-center justify-between p-6 md:p-8 text-left"
              >
                <div className="flex items-center gap-4">
                  <span className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${openId === step.id ? 'bg-purple-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                    0{step.id}
                  </span>
                  <span className="text-lg md:text-xl font-bold text-slate-900">{step.title}</span>
                </div>
                <span className={`text-2xl transition-transform duration-300 ${openId === step.id ? 'rotate-180 text-purple-600' : 'text-slate-300'}`}>
                  ↓
                </span>
              </button>
              
              {openId === step.id && (
                <div className="px-6 md:px-20 pb-8 text-slate-600 leading-relaxed animate-in fade-in slide-in-from-top-2">
                  <p className="text-base md:text-lg border-l-2 border-purple-200 pl-4">
                    {step.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}