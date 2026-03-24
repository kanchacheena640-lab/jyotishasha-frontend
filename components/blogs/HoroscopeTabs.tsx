"use client";

import Link from "next/link";
import { useState } from "react";
import { useParams } from "next/navigation";

const RASHIS = [
  { key: "aries", name: { en: "Aries", hi: "मेष" }, icon: "/zodiac/aries.png" },
  { key: "taurus", name: { en: "Taurus", hi: "वृषभ" }, icon: "/zodiac/taurus.png" },
  { key: "gemini", name: { en: "Gemini", hi: "मिथुन" }, icon: "/zodiac/gemini.png" },
  { key: "cancer", name: { en: "Cancer", hi: "कर्क" }, icon: "/zodiac/cancer.png" },
  { key: "leo", name: { en: "Leo", hi: "सिंह" }, icon: "/zodiac/leo.png" },
  { key: "virgo", name: { en: "Virgo", hi: "कन्या" }, icon: "/zodiac/virgo.png" },
  { key: "libra", name: { en: "Libra", hi: "तुला" }, icon: "/zodiac/libra.png" },
  { key: "scorpio", name: { en: "Scorpio", hi: "वृश्चिक" }, icon: "/zodiac/scorpio.png" },
  { key: "sagittarius", name: { en: "Sagittarius", hi: "धनु" }, icon: "/zodiac/sagittarius.png" },
  { key: "capricorn", name: { en: "Capricorn", hi: "मकर" }, icon: "/zodiac/capricorn.png" },
  { key: "aquarius", name: { en: "Aquarius", hi: "कुंभ" }, icon: "/zodiac/aquarius.png" },
  { key: "pisces", name: { en: "Pisces", hi: "मीन" }, icon: "/zodiac/pisces.png" },
];

const TABS = [
  { key: "daily-horoscope", label: { en: "Daily", hi: "दैनिक" } },
  { key: "monthly-horoscope", label: { en: "Monthly", hi: "मासिक" } },
  { key: "yearly-horoscope", label: { en: "Yearly", hi: "वार्षिक" } },
];

export default function HoroscopeTabs() {
  const params = useParams();
  const isHi = params?.locale === "hi";
  const langPath = isHi ? "/hi" : "";
  
  const [active, setActive] = useState("daily-horoscope");

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
        {isHi ? "राशिफल अपडेट" : "Horoscope Updates"}
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-2 md:gap-3 mb-8 overflow-x-auto pb-2">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-300 shadow-sm ${
              active === tab.key
                ? "bg-indigo-600 text-white shadow-indigo-200"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {isHi ? tab.label.hi : tab.label.en}
          </button>
        ))}
      </div>

      {/* Zodiac Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
        {RASHIS.map((r) => (
          <Link
            key={r.key}
            // ✅ Dynamic locale-aware path
            href={`${langPath}/${active}/${r.key}`}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all p-4 text-center"
          >
            <div className="relative h-14 w-14 mx-auto mb-3 transform group-hover:scale-110 transition-transform duration-300">
              <img
                src={r.icon}
                alt={isHi ? r.name.hi : r.name.en}
                className="object-contain"
              />
            </div>
            
            <p className="font-bold text-sm text-gray-900 mb-1">
              {isHi ? r.name.hi : r.name.en}
            </p>
            
            {active === "daily-horoscope" && (
              <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                {isHi ? "आज अपडेटेड" : "Updated Today"}
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}