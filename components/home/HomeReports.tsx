"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { reportsData } from "@/app/data/reportsData";

export default function HomeReports() {
  const params = useParams();
  
  // 🔹 Current Language set karo (Home Page ke text ke liye)
  const currentLang = (params?.locale === 'hi') ? 'hi' : 'en';
  const langKey = currentLang as 'en' | 'hi'; 

  // 🔹 Top 6 Reports
  const previewReports = reportsData.slice(0, 6);

  const labels = {
    heading: currentLang === 'hi' ? "ज्योतिष रिपोर्ट" : "Astrology Reports",
    subheading: currentLang === 'hi' ? "विस्तृत व्यक्तिगत ज्योतिष रिपोर्ट प्राप्त करें" : "Detailed personalized astrology reports",
    cta: currentLang === 'hi' ? "सभी रिपोर्ट देखें →" : "Explore All Reports →"
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">
          {labels.heading}
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          {labels.subheading}
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {previewReports.map((report) => (
          <Link
            key={report.slug}
            // 🚨 Sahi Link: Seedha /reports/[slug] par (Locale ke bahar)
            href={`/reports/${report.slug}`}
            className="group bg-gradient-to-br from-[#1e1b4b] to-[#312e81] 
            border border-purple-900/50 rounded-2xl overflow-hidden 
            hover:border-purple-500 transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image Section */}
            <div className="aspect-square w-full overflow-hidden">
              <img
                src={report.image}
                alt={report.title[langKey]} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="p-4 text-center">
              <div className="text-white text-base md:text-lg font-bold leading-snug min-h-[3rem] flex items-center justify-center">
                {report.title[langKey]}
              </div>

              {/* Price */}
              <div className="inline-block bg-yellow-400/10 border border-yellow-400/20 px-3 py-1 rounded-full mt-2">
                 <span className="text-yellow-400 text-sm md:text-base font-bold">
                   ₹{report.price}
                 </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Explore All CTA */}
      <div className="text-center mt-12">
        <Link
          // 🚨 CRITICAL FIX: Ise bhi ab seedha "/reports" par bhej diya hai
          href="/reports"
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