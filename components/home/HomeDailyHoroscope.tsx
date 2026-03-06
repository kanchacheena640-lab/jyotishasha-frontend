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
};

const zodiacImages: Record<string, string> = {
  aries: "/zodiac/aries.png",
  taurus: "/zodiac/taurus.png",
  gemini: "/zodiac/gemini.png",
  cancer: "/zodiac/cancer.png",
  leo: "/zodiac/leo.png",
  virgo: "/zodiac/virgo.png",
  libra: "/zodiac/libra.png",
  scorpio: "/zodiac/scorpio.png",
  sagittarius: "/zodiac/sagittarius.png",
  capricorn: "/zodiac/capricorn.png",
  aquarius: "/zodiac/aquarius.png",
  pisces: "/zodiac/pisces.png",
};

const zodiacShortNames: Record<string,string> = {
  aries: "Aries",
  taurus: "Taurus",
  gemini: "Gemini",
  cancer: "Cancer",
  leo: "Leo",
  virgo: "Virgo",
  libra: "Libra",
  scorpio: "Scorpi",
  sagittarius: "Sagitt",
  capricorn: "Capric",
  aquarius: "Aquari",
  pisces: "Pisces",
};

const zodiacOrder = [
  "aries","taurus","gemini","cancer","leo","virgo",
  "libra","scorpio","sagittarius","capricorn","aquarius","pisces"
];

export default function HomeDailyHoroscope({ data }: Props) {

  if (!data) return null;

  const { date, data: signs } = data;
  const [activeSign, setActiveSign] = useState("aries");

  const activeData = signs[activeSign];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-12">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          Today’s Horoscope
        </h2>
      </div>

      <h2 className="sr-only">
        Today's Horoscope {new Date(date).toLocaleDateString("en-GB")}
      </h2>

      <div className="grid md:grid-cols-[1fr_2fr] gap-10 items-start">

        {/* Preview Card */}
        <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
        rounded-2xl p-6 border border-purple-700 shadow-xl
        flex flex-col justify-between min-h-[260px]">

          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={zodiacImages[activeSign]}
                alt={activeSign}
                width={36}
                height={36}
              />
              <h3 className="text-base capitalize text-white font-semibold">
                {zodiacShortNames[activeSign]}
              </h3>
            </div>

            <p className="text-sm text-purple-200 leading-relaxed mb-4 line-clamp-4">
              {activeData.preview}
            </p>

            <ul className="text-xs text-gray-300 list-disc list-inside space-y-1">
              <li>Lucky Color: {activeData.lucky_color}</li>
              <li>Lucky Number: {activeData.lucky_number}</li>
            </ul>
          </div>

          <div className="mt-6 text-right">
            <Link
              href={`/daily-horoscope/${activeSign}`}
              className="text-purple-300 hover:text-white underline text-sm"
            >
              Read More →
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
                className={`bg-[#1e1b4b] rounded-xl p-2 border transition w-full
                  ${activeSign === sign
                    ? "border-purple-500 bg-[#2a2565]"
                    : "border-transparent hover:border-purple-600"}
                `}
              >
                <Image
                  src={zodiacImages[sign]}
                  alt={sign}
                  width={40}
                  height={40}
                  className="mx-auto mb-1 w-8 h-8 md:w-10 md:h-10"
                />

                <div className="text-white text-[9px] md:text-xs text-center">
                  {zodiacShortNames[sign]}
                </div>
              </button>
            ))}

          </div>

        </div>

      </div>

    </section>
  );
}