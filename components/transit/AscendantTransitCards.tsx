"use client";
import React from "react";
import Link from "next/link";
import { ASCENDANTS } from "./ascendants";

const RASHI_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
};

const currentYear = new Date().getFullYear();

function getHouse(asc: string, rashi: string) {
  return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1;
}

export default function AscendantTransitCards({
  planet,
  planetRashi,
  planetSlug,
}: {
  planet: string;
  planetRashi: string;
  planetSlug: string;
}) {
  const isKetu = planet.toLowerCase() === "ketu";
  const planetDisplayName = isKetu ? "Ketu (South Node)" : planet;

  return (
    <section className="mt-20 scroll-mt-24" id="signs">
      {/* 1. Optimized Section Header for SEO */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 leading-tight">
          {planet} Transit {currentYear} Effects by <span className="text-blue-600">Lagna</span>
        </h2>
        <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
          Select your <strong>Vedic Ascendant</strong> to see how the {planetDisplayName} transit through {planetRashi} activates specific karmic houses in your birth chart.
        </p>
      </div>

      {/* 2. Responsive Grid with Professional Spacing */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ASCENDANTS.map((asc) => {
          const house = getHouse(asc, planetRashi);
          const slug = asc.toLowerCase();

          return (
            <article
              key={asc}
              className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-500 flex flex-col justify-between overflow-hidden"
            >
              {/* Background Glow Effect on Hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* House Badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className="bg-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-blue-200">
                    House {house} Activated
                  </div>
                  <span className="text-2xl grayscale group-hover:grayscale-0 transition-all duration-300">
                    ✨
                  </span>
                </div>

                {/* Title with Semantic Lagna Keyword */}
                <h3 className="font-black text-2xl mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                  {asc} <span className="text-slate-300 font-medium italic">Lagna</span>
                </h3>

                {/* SEO Optimized Snippet */}
                <p className="text-[13px] md:text-sm text-slate-600 mb-8 leading-relaxed font-medium">
                  For <strong>{asc} ascendant</strong>, the {planetDisplayName} transit moves into the <strong>{house} house</strong>. In Vedic astrology, this phase triggers significant {isKetu ? "karmic release and detachment" : "shifts and growth"} in this life area.
                </p>
              </div>

              {/* High-Conversion CTA Button */}
              <Link
                href={`/${planetSlug}/${slug}/house/${house}`}
                className="w-full text-center py-4 bg-slate-900 text-white text-[11px] font-black rounded-2xl hover:bg-blue-600 transition-all duration-300 uppercase tracking-[0.2em] shadow-xl shadow-slate-200 group-hover:shadow-blue-200 relative z-10"
              >
                Read {asc} Analysis →
              </Link>
            </article>
          );
        })}
      </div>

      {/* 3. Global Context Footer (Small SEO Boost) */}
      <p className="mt-12 text-center text-[10px] uppercase tracking-widest text-slate-400 font-bold">
        Calculated using High-Precision Ephemeris • Sidereal (Lahiri) Zodiac
      </p>
    </section>
  );
}