"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type HoroscopeItem = {
  preview: string;
  lucky_color: string;
  lucky_number: string;
};

type Props = {
  data: {
    date: string;
    data: Record<string, HoroscopeItem>;
  } | null;
  dict: any;   // ✅ Added
  lang: string; // ✅ Added
};

const zodiacImages: Record<string, string> = {
  aries: "/zodiac/aries.png", taurus: "/zodiac/taurus.png", gemini: "/zodiac/gemini.png",
  cancer: "/zodiac/cancer.png", leo: "/zodiac/leo.png", virgo: "/zodiac/virgo.png",
  libra: "/zodiac/libra.png", scorpio: "/zodiac/scorpio.png", sagittarius: "/zodiac/sagittarius.png",
  capricorn: "/zodiac/capricorn.png", aquarius: "/zodiac/aquarius.png", pisces: "/zodiac/pisces.png",
};

const zodiacOrder = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

export default function HomeDailyHoroscope({ data, dict, lang }: Props) {
  if (!data || !dict) return null;

  const { date, data: signs } = data;
  const [activeSign, setActiveSign] = useState("aries");
  const activeData = signs[activeSign];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          {dict.horoscope.heading}
        </h2>
      </div>

      <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">
        {/* Preview Card */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-2xl p-6 border border-purple-700 shadow-xl flex flex-col justify-between min-h-[260px]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src={zodiacImages[activeSign]} alt={activeSign} width={36} height={36} />
              <h3 className="text-base text-white font-semibold">
                {dict.horoscope.zodiacNames[activeSign]}
              </h3>
            </div>
            <p className="text-sm text-purple-200 leading-relaxed mb-4 line-clamp-4">
              {activeData.preview}
            </p>
            <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
              <li>{dict.horoscope.luckyColor}: {activeData.lucky_color}</li>
              <li>{dict.horoscope.luckyNumber}: {activeData.lucky_number}</li>
            </ul>
          </div>
          <div className="mt-6 text-right">
            <Link href={`/${lang}/daily-horoscope/${activeSign}`} className="text-purple-300 hover:text-white underline text-sm">
              {dict.horoscope.readMore} →
            </Link>
          </div>
        </div>

        {/* Zodiac Grid */}
        <div>
          <div className="grid grid-cols-6 sm:grid-cols-4 gap-3">
            {zodiacOrder.map((sign) => (
              <button
                key={sign}
                onClick={() => setActiveSign(sign)}
                className={`bg-[#1e1b4b] rounded-xl p-2 border transition w-full ${
                  activeSign === sign ? "border-purple-500 bg-[#2a2565]" : "border-transparent hover:border-purple-600"
                }`}
              >
                <Image src={zodiacImages[sign]} alt={sign} width={40} height={40} className="mx-auto mb-1 w-8 h-8 md:w-10 md:h-10" />
                <div className="text-white text-[9px] md:text-xs text-center">
                  {dict.horoscope.zodiacNames[sign]}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}