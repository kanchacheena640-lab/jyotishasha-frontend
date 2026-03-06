"use client";

import Link from "next/link";

export default function HomeFreeKundaliCompact() {
  return (
    <Link
      href="/free-kundali"
      className="
      w-full
      h-[48px]
      bg-gradient-to-r from-indigo-600 via-purple-700 to-blue-700
      text-white
      rounded-xl
      px-4
      flex items-center justify-between
      shadow-lg
      hover:scale-[1.02]
      transition
      "
    >

      {/* LEFT TEXT */}
      <div className="flex items-center gap-3">

        {/* Blinking FREE badge */}
        <span className="bg-yellow-400 text-black text-[10px] font-bold px-2 py-[2px] rounded animate-pulse">
          FREE
        </span>

        <div className="leading-tight">

          <div className="font-semibold text-sm">
            NASA-grade Vedic Kundali
          </div>

          <div className="text-[11px] text-indigo-200">
            Most accurate and easy to read
          </div>

        </div>

      </div>

      {/* CTA */}
      <span className="text-xs font-semibold whitespace-nowrap border border-white px-3 py-[3px] rounded-md hover:bg-white hover:text-indigo-700 transition">
        Generate
      </span>

    </Link>
  );
}