"use client";

import Link from "next/link";
import { useState } from "react";

const RASHIS = [
  { key: "aries", name: "Aries", icon: "/zodiac/aries.png" },
  { key: "taurus", name: "Taurus", icon: "/zodiac/taurus.png" },
  { key: "gemini", name: "Gemini", icon: "/zodiac/gemini.png" },
  { key: "cancer", name: "Cancer", icon: "/zodiac/cancer.png" },
  { key: "leo", name: "Leo", icon: "/zodiac/leo.png" },
  { key: "virgo", name: "Virgo", icon: "/zodiac/virgo.png" },
  { key: "libra", name: "Libra", icon: "/zodiac/libra.png" },
  { key: "scorpio", name: "Scorpio", icon: "/zodiac/scorpio.png" },
  { key: "sagittarius", name: "Sagittarius", icon: "/zodiac/sagittarius.png" },
  { key: "capricorn", name: "Capricorn", icon: "/zodiac/capricorn.png" },
  { key: "aquarius", name: "Aquarius", icon: "/zodiac/aquarius.png" },
  { key: "pisces", name: "Pisces", icon: "/zodiac/pisces.png" },
];

const TABS = [
  { key: "daily-horoscope", label: "Daily" },
  { key: "monthly-horoscope", label: "Monthly" },
  { key: "yearly-horoscope", label: "Yearly" },
];

export default function HoroscopeTabs() {
  const [active, setActive] = useState("daily-horoscope");

  return (
    <section className="mb-20">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Horoscope Updates
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-3 mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              active === tab.key
                ? "bg-purple-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Zodiac Cards */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {RASHIS.map((r) => (
          <Link
            key={r.key}
            href={`/${active}/${r.key}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center text-gray-800"
          >
            <img
              src={r.icon}
              alt={`${r.name} ${active}`}
              className="h-12 w-12 mx-auto mb-2"
            />
            <p className="font-semibold text-sm text-gray-900">
                {r.name}
            </p>
            {active === "daily-horoscope" && (
              <span className="text-[11px] text-green-600">
                Updated Today
              </span>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
