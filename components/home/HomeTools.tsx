"use client";

import Link from "next/link";
import { useParams } from "next/navigation"; // ✅ URL se locale lene ke liye
import { toolsData } from "@/app/data/toolsData";

export default function HomeTools() {
  const params = useParams();
  
  // 🔹 Hook ke bajaye URL param se current language fix karo
  // Isse rendering ekdam instant hogi, koi lag nahi aayega
  const currentLang = (params?.locale === 'hi') ? 'hi' : 'en';

  const previewTools = toolsData.slice(1, 7);

  // 🔹 Static labels (Inhe i18n file mein daalne ki zaroorat nahi, yahan fast hain)
  const labels = {
    heading: currentLang === 'hi' ? 'फ्री ज्योतिष टूल्स' : 'Free Astrology Tools',
    subheading: currentLang === 'hi' ? 'अपनी जन्म कुंडली से तुरंत जानकारी प्राप्त करें' : 'Quick insights from your birth chart',
    cta: currentLang === 'hi' ? 'सभी टूल्स देखें →' : 'Explore All Tools →'
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {labels.heading}
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          {labels.subheading}
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {previewTools.map((tool) => (
          <Link
            key={tool.slug}
            // ✅ Link mein currentLang add karna zaroori hai
            href={`/${currentLang}/tools/${tool.slug}`}
            className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
            border border-purple-900/50 rounded-2xl p-6
            hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10 
            transition-all duration-300 flex flex-col justify-between min-h-[160px]"
          >
            <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
              {tool.emoji}
            </div>

            <div>
              <div className="text-white font-bold text-base md:text-lg mb-1">
                {tool.title[currentLang as 'en' | 'hi']} 
              </div>

              {tool.badge && tool.badge[currentLang as 'en' | 'hi'] && (
                <div className="text-[10px] uppercase tracking-wider font-bold text-yellow-400 opacity-80">
                  {tool.badge[currentLang as 'en' | 'hi']}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link
          href={`/${currentLang}/tools`}
          className="inline-block px-8 py-3 text-sm font-bold text-white
          bg-purple-600 hover:bg-purple-500 shadow-lg shadow-purple-600/30
          rounded-full transition-all active:scale-95"
        >
          {labels.cta}
        </Link>
      </div>

    </div>
  );
}