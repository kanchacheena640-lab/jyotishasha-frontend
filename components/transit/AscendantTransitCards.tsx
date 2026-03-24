  "use client";
  import React from "react";
  import Link from "next/link";
  import { ASCENDANTS } from "./ascendants";

  const RASHI_INDEX: Record<string, number> = {
    Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
    Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
  };

  const ASC_HI: Record<string, string> = {
    Aries: "मेष",
    Taurus: "वृषभ",
    Gemini: "मिथुन",
    Cancer: "कर्क",
    Leo: "सिंह",
    Virgo: "कन्या",
    Libra: "तुला",
    Scorpio: "वृश्चिक",
    Sagittarius: "धनु",
    Capricorn: "मकर",
    Aquarius: "कुंभ",
    Pisces: "मीन",
  };

  const RASHI_EN: Record<string, string> = {
    मेष: "Aries",
    वृषभ: "Taurus",
    मिथुन: "Gemini",
    कर्क: "Cancer",
    सिंह: "Leo",
    कन्या: "Virgo",
    तुला: "Libra",
    वृश्चिक: "Scorpio",
    धनु: "Sagittarius",
    मकर: "Capricorn",
    कुंभ: "Aquarius",
    मीन: "Pisces",
  };

  const currentYear = new Date().getFullYear();

  function getHouse(asc: string, rashi: string) {
    return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1;
  }

  export default function AscendantTransitCards({
    planet,
    planetRashi,
    planetSlug,
    lang,
  }: {
    planet: string;
    planetRashi: string;
    planetSlug: string;
    lang: "en" | "hi";
  }) {
    const isKetu = planet.toLowerCase() === "ketu";
    const planetDisplayName = isKetu ? "Ketu (South Node)" : planet;

    return (
      <section className="mt-20 scroll-mt-24" id="signs">
        {/* 1. Global Header */}
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 leading-tight tracking-tight text-balance">
            {lang === "hi"
          ? `${planet} गोचर ${currentYear} का प्रभाव लग्न अनुसार`
          : <>{planet} Transit {currentYear} Effects by <span className="text-blue-600">Ascendant</span></>
        }
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-sm md:text-lg font-medium leading-relaxed">
            {lang === "hi" ? (
            <>अपना <strong>लग्न (Rising Sign)</strong> चुनें और जानें कि {planetDisplayName} का {planetRashi} में गोचर आपकी कुंडली को कैसे प्रभावित करता है।</>
          ) : (
            <>Select your <strong>Rising Sign (Ascendant)</strong> to understand how the {planetDisplayName} transit through {planetRashi} influences your personal astrology chart.</>
          )}
          </p>
        </div>

        {/* 2. Global Professional Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 px-2">
          {ASCENDANTS.map((asc) => {
            const safeRashi = RASHI_INDEX[planetRashi] 
              ? planetRashi 
              : RASHI_EN[planetRashi];

            const house = getHouse(asc, safeRashi);
            const slug = asc.toLowerCase();

            return (
              <article
                key={asc}
                className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-500 flex flex-col justify-between overflow-hidden"
              >
                <div className="relative z-10">
                  {/* Visual House Badge */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="bg-slate-900 text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.15em] shadow-lg shadow-slate-200 group-hover:bg-blue-600 transition-colors">
                      {lang === "hi" ? `${house} भाव प्रभाव` : `${house} House Impact`}
                    </div>
                    <span className="text-xl opacity-40 group-hover:opacity-100 transition-all duration-300">
                      ⚛️
                    </span>
                  </div>

                  {/* Visible Rising Text Fix */}
                  <h3 className="font-black text-2xl mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">
                    {lang === "hi" ? ASC_HI[asc] : asc}{" "}
                    <span className="text-slate-500 font-medium italic">
                      {lang === "hi" ? "लग्न" : "Rising (Lagna)"}
                    </span>
                  </h3>

                  {/* Pure English Content */}
                  <p className="text-[13px] md:text-sm text-slate-600 mb-8 leading-relaxed font-medium">
                    {lang === "hi" ? (
                    <>
                      <strong>{ASC_HI[asc]} लग्न</strong> के लिए {planetDisplayName} का गोचर आपके{" "}
                      <strong>{house} भाव</strong> को सक्रिय करता है। यह समय{" "}
                      {isKetu ? "कर्मिक बदलाव और भावनात्मक मुक्ति" : "परिवर्तन और दिशा बदलाव"} का संकेत देता है।
                    </>
                  ) : (
                    <>
                      For <strong>{asc} Ascendant</strong>, the {planetDisplayName} transit activates your{" "}
                      <strong>{house} house</strong>. In professional astrology, this phase represents a period of{" "}
                      {isKetu ? "karmic shifts and emotional release" : "transition and redirection"} in this domain.
                    </>
                  )}
                  </p>
                </div>

                {/* Modern Dynamic CTA - User ko uske specific House ke liye attract karne ke liye */}
                <Link
                  href={`/${lang === "hi" ? "hi/" : ""}${planetSlug}/${slug}/house/${house}`}
                  className="w-full text-center py-4 bg-white border-2 border-slate-900 text-slate-900 text-[11px] font-black rounded-2xl hover:bg-slate-900 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] relative z-10"
                >
                  {lang === "hi" ? `भाव ${house} का प्रभाव देखें →` : `Check House ${house} Impact →`}
                </Link>
              </article>
            );
          })}
        </div>

        {/* 3. Global Footer Note */}
        <p className="mt-12 text-center text-[9px] uppercase tracking-[0.2em] text-slate-400 font-bold">
          Calculated using High-Precision Astronomy • Sidereal Zodiac System
        </p>
      </section>
    );
  }