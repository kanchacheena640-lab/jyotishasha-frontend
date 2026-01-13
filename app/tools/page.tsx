"use client";
import "@/i18n"; 
import { useMemo, useState } from "react";
import Link from "next/link";
import { toolsData } from "../data/toolsData";
import { useTranslation } from "react-i18next";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export default function ToolsPage() {
  const { t, ready } = useTranslation("tools");
  if (!ready) return null;

  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(toolsData.map((t) => t.category)))],
    []
  );

  const filteredTools = useMemo(
    () =>
      selectedCategory === "All"
        ? toolsData
        : toolsData.filter((t) => t.category === selectedCategory),
    [selectedCategory]
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-white drop-shadow-lg">
        {t("tools_page.heading", { defaultValue: "Free Astrology Tools" })}
      </h1>

      <div className="sticky top-[72px] md:top-[80px] z-20 flex flex-wrap justify-center gap-3 mb-8 py-4">
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const translationKey = `tools_page.categories.${cat.toLowerCase()}`;
            const translatedCat = t(translationKey, { defaultValue: cat });
            const active = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  active ? "bg-purple-600 text-white" : "bg-white text-purple-600"
                }`}
                aria-pressed={active}
              >
                {translatedCat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {filteredTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            title={`Explore ${tool.title}`}
            className="relative bg-white rounded-xl shadow hover:shadow-xl hover:scale-105 transform transition duration-300 border border-gray-200 text-center p-4 min-h-[180px] flex flex-col justify-between"
          >
            <div className="text-4xl mb-2">{tool.emoji}</div>
            <div className="mb-2">
              <h3 className="text-base sm:text-lg font-bold text-blue-800">
                {t(`${tool.slug}.title`, { defaultValue: tool.title })}
              </h3>
              {tool.badge?.trim() && (
                <span className="inline-block mt-1 bg-gray-100 text-gray-600 text-[10px] px-2 py-[2px] rounded-full border border-gray-300">
                  {t(`${tool.slug}.badge`, { defaultValue: tool.badge })}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600">
              {t(`${tool.slug}.desc`, { defaultValue: tool.description })}
            </p>
          </Link>
        ))}
      </div>
      {/* 🔐 EEAT TRUST */}
      <section className="mt-16">
        <EEATTrustSnippet />
      </section>
    </div>
  );
}
