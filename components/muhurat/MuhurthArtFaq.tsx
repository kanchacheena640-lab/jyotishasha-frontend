"use client";

import React, { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

interface MuhurthArtFaqProps {
  faqs: FAQItem[];
  isHi: boolean;
  activityName: string;
}

export const MuhurthArtFaq = ({ faqs, isHi, activityName }: MuhurthArtFaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Pehla sawal hamesha khula rahega SEO ke liye

  if (!faqs || faqs.length === 0) return null;

  // 📝 JSON-LD Schema for Google Rich Snippets (SEO Magic)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a
      }
    }))
  };

  return (
    <section className="mb-10 px-1">
      {/* 🛠️ Schema Injection: Isse Google Search mein FAQ dikhenge */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <h2 className="text-xl font-bold text-purple-200 mb-6 flex items-center gap-2">
        ❓ {isHi ? `${activityName} मुहूर्त: अक्सर पूछे जाने वाले प्रश्न` : `${activityName} FAQ: Common Questions`}
      </h2>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div 
            key={index}
            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all shadow-sm"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full p-4 flex justify-between items-center text-left hover:bg-white/5 transition-colors focus:outline-none"
            >
              <span className="text-sm font-bold text-gray-100 pr-4 leading-tight">
                {index + 1}. {faq.q}
              </span>
              <span className={`text-purple-400 text-xs transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 pt-0 text-[13px] text-gray-400 leading-relaxed border-t border-white/5 mt-2">
                {faq.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};