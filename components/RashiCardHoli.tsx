"use client";

import React from "react";

type Tip = {
  en: string;
  hi: string;
};

interface Props {
  sign: string;
  tip: Tip;
  isHi: boolean;
  year: number;
}

export default function RashiCardHoli({ sign, tip, isHi, year }: Props) {
  const text = isHi ? tip.hi : tip.en;

  const handleShare = async () => {
    const shareText = `🔥 ${sign} ${
      isHi ? "राशि के लिए होली संदेश" : "Holi Message"
    }

${text}

🌈 ${
      isHi ? "अपना भी देखें:" : "Check yours:"
    } https://jyotishasha.com/holi-${year}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Holi Rashi Wishes",
          text: shareText,
        });
      } else {
        await navigator.clipboard.writeText(shareText);
        alert(isHi ? "कॉपी हो गया!" : "Copied!");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-pink-500 via-yellow-400 to-purple-600 hover:scale-[1.02] transition">

      {/* INNER CARD */}
      <div className="bg-white rounded-2xl p-5 flex flex-col justify-between h-full shadow-sm">

        {/* CONTENT */}
        <div>
          <div className="text-xl font-extrabold tracking-wide text-slate-900 mb-2 flex items-center gap-2">
            <span className="flex items-center gap-2">
              {/* Holika Icon */}
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0"
              >
                {/* Wood */}
                <path
                  d="M4 18 L20 18 L16 14 L8 14 Z"
                  fill="#8B5E3C"
                />
                <path
                  d="M7 14 L17 14 L14 10 L10 10 Z"
                  fill="#A47148"
                />

                {/* Fire */}
                <path
                  d="M12 4 
                    C10 7, 14 8, 12 11 
                    C11 9, 9 10, 10 13 
                    C10.5 15, 13.5 15, 14 13 
                    C15 10, 13 9, 14 7 
                    C13 6, 12.5 5, 12 4 Z"
                  fill="url(#fireGradient)"
                />

                <defs>
                  <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FFD54F" />
                    <stop offset="50%" stopColor="#FF8F00" />
                    <stop offset="100%" stopColor="#E65100" />
                  </linearGradient>
                </defs>
              </svg>

              {sign}
            </span>
          </div>

          <p className="text-[15px] text-slate-700 leading-7 font-medium">
            {text}
          </p>
        </div>

        {/* SHARE BUTTON */}
        <button
          onClick={handleShare}
          className="mt-5 w-full bg-gradient-to-r from-pink-500 via-orange-400 to-purple-500 text-white py-2 rounded-xl text-sm font-semibold shadow-md hover:opacity-90 transition"
        >
          🎉 {isHi ? "शेयर करें" : "Share as Wish"}
        </button>
      </div>
    </div>
  );
}