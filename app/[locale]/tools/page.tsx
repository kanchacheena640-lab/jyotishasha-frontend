"use client";

import "@/i18n";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { toolsData } from "../../data/toolsData";
import { useTranslation } from "react-i18next";

// 🔹 TypeScript ko batana padega ki tool ka structure kya hai
interface Tool {
  slug: string;
  emoji: string;
  category: { en: string; hi: string };
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  badge?: { en: string; hi: string } | null;
}

export default function ToolsPage() {
  const { t, ready, i18n } = useTranslation("tools");
  const params = useParams();
  
  const currentLang = (params?.locale === 'hi' || i18n.language?.startsWith('hi')) ? 'hi' : 'en';
  const langKey = currentLang as 'en' | 'hi'; // ✅ Type safety fix

  const [selectedCategory, setSelectedCategory] = useState("All");

  if (!ready) return null;

  // 🔹 Category List (English 'en' key se logic chalega)
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(toolsData.map((t: any) => t.category.en)));
    return ["All", ...uniqueCats];
  }, []);

  // 🔹 Filter Logic
  const filteredTools = useMemo(() => {
    return selectedCategory === "All"
      ? (toolsData as Tool[])
      : (toolsData as Tool[]).filter((t) => t.category.en === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-4 text-white">
        {currentLang === 'hi' ? "फ्री ज्योतिष टूल्स" : "Free Astrology Tools"}
      </h1>

      {/* --- Filter Buttons --- */}
      <div className="sticky top-[72px] md:top-[80px] z-20 flex flex-wrap justify-center gap-3 mb-8 py-4 bg-black/10 backdrop-blur-sm rounded-lg">
        {categories.map((cat) => {
          // Display label nikalne ka sahi tarika
          const displayLabel = cat === "All" 
            ? (currentLang === 'hi' ? "सभी" : "All") 
            : (toolsData as Tool[]).find(t => t.category.en === cat)?.category[langKey];

          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                active ? "bg-purple-600 text-white shadow-lg" : "bg-white text-purple-600 hover:bg-purple-50"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* --- Grid --- */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/${currentLang}/tools/${tool.slug}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all p-6 flex flex-col justify-between border border-gray-100"
          >
            <div className="text-5xl mb-4">{tool.emoji}</div>
            <div className="mb-3">
              <h3 className="text-lg font-bold text-slate-800">
                {tool.title[langKey]}
              </h3>
              {tool.badge && tool.badge[langKey] && (
                <span className="inline-block mt-1 bg-purple-50 text-purple-600 text-[10px] font-bold px-2 py-1 rounded border border-purple-100">
                  {tool.badge[langKey]}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 line-clamp-2">
              {tool.description[langKey]}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}