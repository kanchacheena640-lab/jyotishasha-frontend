"use client";

import "@/i18n"; 
import { useRouter, useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { reportsData, Report } from "../data/reportsData";
import { useTranslation } from "react-i18next";  
import EEATTrustSnippet from "@/components/EEATTrustSnippet";

export default function ReportsPage() {
  const { i18n, ready } = useTranslation("reports");
  const router = useRouter();
  const params = useParams();

  // 🌍 Locale detection
  const currentLang = (params?.locale === 'hi' || i18n.language?.startsWith('hi')) ? 'hi' : 'en';
  const langKey = currentLang as 'en' | 'hi';

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalReport, setModalReport] = useState<null | Report>(null);

  if (!ready) return null;

  // 1. "All" label translation
  const allLabel = currentLang === 'hi' ? "सभी" : "All";

  // 2. Categories extraction (Logic English 'en' par based rahega)
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(reportsData.map((r) => r.category.en)))],
    []
  );

  // 3. Filter Logic
  const filteredReports = useMemo(() => {
    return selectedCategory === "All"
      ? reportsData
      : reportsData.filter((r) => r.category.en === selectedCategory);
  }, [selectedCategory]);

  const handleBuyNow = (slug: string) => {
    // Dual / partner-based reports (Redirecting with locale for better SEO)
    if (slug === "relationship_future_report") {
      router.push(`/${currentLang}/love/report/${slug}`);
      return;
    }
    // Single-user reports (Bhasha safe path)
    router.push(`/reports/${slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">
        {currentLang === 'hi' ? "व्यक्तिगत ज्योतिष रिपोर्ट" : "Personalized Reports"}
      </h1>

      {/* --- Category Filter --- */}
      <div className="sticky top-[72px] md:top-[80px] z-20 flex flex-wrap justify-center gap-3 mb-8 py-4 bg-black/10 backdrop-blur-md rounded-xl">
        {categories.map((cat) => {
          // Display label bhasha ke hisaab se
          const displayLabel = cat === "All" 
            ? allLabel 
            : reportsData.find(r => r.category.en === cat)?.category[langKey];

          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active ? "bg-purple-600 text-white shadow-lg" : "bg-white text-purple-600 hover:bg-purple-50"
              }`}
            >
              {displayLabel}
            </button>
          );
        })}
      </div>

      {/* --- Report Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {filteredReports.map((report, index) => (
          <div
            key={index}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl hover:scale-[1.02] transform transition duration-300 overflow-hidden border border-gray-100 flex flex-col"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={report.image}
                alt={report.title[langKey]}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            
            <div className="p-5 text-center flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                {report.title[langKey]}
              </h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                {report.description[langKey]}
              </p>

              <div className="mt-auto flex justify-center gap-3">
                <button
                  onClick={() => setModalReport(report)}
                  className="flex-1 border border-purple-600 text-purple-600 px-3 py-2 rounded-lg font-semibold hover:bg-purple-50 transition"
                >
                  {currentLang === 'hi' ? "विवरण" : "Details"}
                </button>

                <button
                  onClick={() => handleBuyNow(report.slug)}
                  className="flex-1 bg-purple-600 text-white px-3 py-2 rounded-lg font-semibold hover:bg-purple-700 shadow-md transition"
                >
                  {currentLang === 'hi' ? "अभी खरीदें" : "Buy Now"} ₹{report.price}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Popup Modal --- */}
      {modalReport && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white max-w-md w-full p-8 rounded-3xl shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setModalReport(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black transition-colors"
            >
              <span className="text-2xl">✕</span>
            </button>
            
            <h2 className="text-2xl font-extrabold mb-4 text-purple-800 pr-6">
              {modalReport.title[langKey]}
            </h2>
            
            <div className="bg-purple-50 p-4 rounded-xl mb-6">
              <p className="text-gray-700 leading-relaxed">
                {modalReport.fullDescription[langKey]}
              </p>
            </div>

            <button
              onClick={() => handleBuyNow(modalReport.slug)}
              className="bg-purple-600 text-white px-6 py-4 rounded-xl font-bold text-lg hover:bg-purple-700 w-full shadow-lg shadow-purple-200 transition-all active:scale-95"
            >
              {currentLang === 'hi' ? "पेमेंट के लिए आगे बढ़ें" : "Proceed to Buy"} ₹{modalReport.price}
            </button>
          </div>
        </div>
      )}
      
      <EEATTrustSnippet />
    </div>
  );
}