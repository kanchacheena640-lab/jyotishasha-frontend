'use client';

import Image from 'next/image';
import KundaliChartNorth from '@/components/KundaliChartNorth';
import ToolSuggestions from '@/components/ToolSuggestions';
import { useState, useEffect } from 'react';
import { replaceIsoDates } from '@/utils/dateReplacer';



type DashaPeriod = {
  start: string;
  end: string;
  planet: string;
};

type GemstoneSuggestionResult = {
  paragraph: string;
  gemstone: string;
  substone: string;
  planet: string;
  cta: {
    heading: string;
    sections: {
      title: string;
      description: string;
      button_text: string;
    }[];
  };
};

type GrahDashaBlock = {
  grah_dasha_text: string;
  mahadasha_planet: string;
  antardasha_planet: string;
  mahadasha_house: number;
  antardasha_house: number;
};

type Props = {
  result: {
    title: string;
    toolId?: string | null;
    description?: string; 
  };
  kundaliData: {
    name: string;
    dob: string;
    tob: string;
    rashi: string;
    lagna_sign: string;
    latitude: number;
    longitude: number;
    lagna_trait?: string;
    moon_traits?: {
      title: string;
      personality: string;
      image?: string;
    };
    planets: {
      name: string;
      abbr?: string;
      house: number;
      sign: string;
    }[];
    current_mahadasha?: DashaPeriod;
    current_antardasha?: DashaPeriod;
    grah_dasha_block?: {
      grah_dasha_text: string;
      mahadasha_planet: string;
      antardasha_planet: string;
      mahadasha_house: number;
      antardasha_house: number;
    };
    planet_overview?: {
      planet: string;
      summary: string;
      text: string;
    }[];
    manglik_dosh?: {
      status?: {
        is_mangalic: string;
      };
      heading: string;
      report_paragraphs: string[];
      summary_block: {
        heading: string;
        points: string[];
      };
      general_explanation: string;
    };
  kaalsarp_dosh?: {
    heading: string;
    report_paragraphs: string[];
    summary_block: {
      heading: string;
      points: string[];
    };
    general_explanation: string;
  };
    sadhesati?: {
      moon_rashi: string;
      summary: string;
      explanation?: string;
      report_paragraphs?: string[];
      phase_details?: {
        phase: string;
        start_date: string;
        end_date: string;
        impact: string;
        is_current: boolean;
      }[];
      
      phase_dates?: {
        first_phase?: { start: string; end: string };
        second_phase?: { start: string; end: string };
        third_phase?: { start: string; end: string };
      };
      status?: string;
    };
      parashari_rajyog?: RajyogResult;
      neechbhang_rajyog?: RajyogResult;
      gajakesari_yog?: RajyogResult;
      panch_mahapurush_yog?: RajyogResult;
      chandra_mangal_yog?: RajyogResult;
      dhan_yog?: RajyogResult;
      rajya_sambandh_rajyog?: RajyogResult;
      dharma_karmadhipati_rajyog?: RajyogResult;
      vipreet_rajyog?: RajyogResult;
      lakshmi_yog?: RajyogResult;
      shubh_kartari_yog?: RajyogResult;
      adhi_rajyog?: RajyogResult;
      kuber_rajyog?: RajyogResult;
      gemstone_suggestion?: GemstoneSuggestionResult;
      career_path?: LifeToolResult;
      marriage_path?: LifeToolResult;
      foreign_travel?: LifeToolResult;
      business_path?: LifeToolResult;
      government_job?: LifeToolResult;
      love_life?: LifeToolResult;
  };
};

type RajyogResult = {
  id: string;
  name: string;
  heading?: string | { en: string; hi: string };
  description: string | { en: string; hi: string };
  strength: string;
  emoji: string;
  challenge: string | { en: string; hi: string };
  positives: string[] | { en: string[]; hi: string[] };
  reasons?: string[] | { en: string[]; hi: string[] };
  is_active?: boolean;
  upsell?: {
    products: {
      title: { en: string; hi: string };
      dropdown?: { en: string[]; hi: string[] };
      cta: { en: string; hi: string };
    }[];
  };
};
export type LifeToolResult = {
  tool_id: string;
  heading: string;
  dominant_influence: string;
  positive_points: string[];
  negative_points: string[];
  cta?: string;
  language: string;
  verdict: string;
};


const lagnaRashiMap: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4,
  Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8,
  Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
};

// 🔁 Format date to DD-MM-YYYY
function formatDate(isoDate?: string): string {
  if (!isoDate) return '';
  const [yyyy, mm, dd] = isoDate.split('-');
  return `${dd}-${mm}-${yyyy}`;
}

export default function ToolResult({ result, kundaliData }: Props) {
  const lang: 'en' | 'hi' = 'en';

  function pickText(v?: string | { en: string; hi: string }): string {
  if (!v) return '';
  return typeof v === 'string' ? v : v[lang] ?? '';
}

function pickList(v?: string[] | { en: string[]; hi: string[] }): string[] {
  if (!v) return [];
  return Array.isArray(v) ? v : (v[lang] ?? []);
}
  const keys = ['first_phase', 'second_phase', 'third_phase'] as const;
type PhaseKey = typeof keys[number];

  const phaseDetails = kundaliData.sadhesati?.phase_details || keys.map((key, i) => {
    const item = kundaliData.sadhesati?.phase_dates?.[key];
    return {
      phase: `${['1st', '2nd', '3rd'][i]} Phase`,
      start_date: item?.start || '',
      end_date: item?.end || '',
      impact: kundaliData.sadhesati?.status === 'Active' ? 'Moderate' : 'Upcoming',
      is_current: false,
    };
  });

  const safePlanets = Array.isArray(kundaliData.planets) ? kundaliData.planets : [];
  const safeLagna = lagnaRashiMap[kundaliData.lagna_sign] || 1;
  const planetOverview = kundaliData.planet_overview?.filter((p: { planet: string }) => p.planet !== 'Ascendant (Lagna)') || [];
  const [selectedPlanet, setSelectedPlanet] = useState(planetOverview[0] || null);

  useEffect(() => {
    if (
      planetOverview.length &&
      (!selectedPlanet || !planetOverview.find(p => p.planet === selectedPlanet.planet))
    ) {
      setSelectedPlanet(planetOverview[0]);
    }
  }, [planetOverview]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen bg-[#FEF9F4] px-4 py-10 sm:px-6 md:px-12">

      {/* 🌟 Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center text-primary mb-4">
        {result.title}
      </h1>

      {/* 📄 User Info */}
      <p className="text-sm text-center font-mono text-gray-700 mb-6">
        {kundaliData.name} | DOB: {kundaliData.dob} | TOB: {kundaliData.tob} | Rashi: {kundaliData.rashi} | Lagna: {kundaliData.lagna_sign}
      </p>

      {/* 🔗 Quick Tool Links */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <a href="/tools/rashi-finder" className="text-sm bg-primary text-white px-3 py-1 rounded-full shadow">Rashi Finder</a>
        <a href="/tools/lagna-finder" className="text-sm bg-primary text-white px-3 py-1 rounded-full shadow">Lagna Finder</a>
        <a href="/tools/Grahdashagrah-dasha-finder" className="text-sm bg-primary text-white px-3 py-1 rounded-full shadow">Grah-Dasha</a>
        <a href="/tools/planet-overview" className="text-sm bg-primary text-white px-3 py-1 rounded-full shadow">All Planets</a>
      </div>

      {/* 🧩 Result Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white rounded-lg shadow-md p-6 md:p-8">

        {/* 🪐 Kundali Chart (Left side on desktop) */}
        <div className="md:col-span-1 flex justify-center items-start">
          {safePlanets.length > 0 && (
            <div className="max-w-[360px] mx-auto">
              <KundaliChartNorth planets={safePlanets} lagnaRashi={safeLagna} size={320} />
            </div>
          )}
        </div>

        {/* 📜 Main Result Content (Center) */}
        <div className="md:col-span-2 space-y-4">
          {/* 🔎 Description */}
          {result.description && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded shadow-sm">
              <p className="text-base text-blue-900 font-medium mb-2">Description:</p>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{result.description}</p>
            </div>
          )}

          {/* 🌅 Lagna Traits */}
          {result.toolId === 'lagna-finder' && kundaliData.lagna_trait && (
            <div className="p-4 bg-green-50 border border-green-200 rounded shadow-sm">
              <p className="text-base text-green-900 font-medium mb-2">Lagna Trait:</p>
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{kundaliData.lagna_trait}</p>
            </div>
          )}

          {/* 🌙 Rashi Traits */}
          {result.toolId === 'rashi-finder' && kundaliData.moon_traits && (
            <div className="p-4 bg-pink-50 border border-pink-200 rounded shadow-sm">
              <p className="text-base text-pink-900 font-medium mb-2">{kundaliData.moon_traits.title}</p>
              {kundaliData.moon_traits.image && (
                <div className="flex justify-center mb-2">
                  <Image src={kundaliData.moon_traits.image} alt="Moon Sign" width={80} height={80} />
                </div>
              )}
              <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{kundaliData.moon_traits.personality}</p>
            </div>
          )}

          {/* 🪔 Grah Dasha Insights */}
          {result.toolId === 'grah-dasha-finder' && kundaliData.grah_dasha_block && (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mahadasha */}
                <div className="p-4 bg-purple-50 border border-purple-200 rounded shadow-sm">
                  <p className="text-sm text-purple-900 font-semibold mb-1">Mahadasha:</p>
                  <p className="text-sm text-gray-800">
                    <strong>{kundaliData.grah_dasha_block.mahadasha_planet}</strong> (
                    {formatDate(kundaliData.current_mahadasha?.start)} — {formatDate(kundaliData.current_mahadasha?.end)})
                  </p>
                </div>

                {/* Antardasha */}
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded shadow-sm">
                  <p className="text-sm text-indigo-900 font-semibold mb-1">Antardasha:</p>
                  <p className="text-sm text-gray-800">
                    <strong>{kundaliData.grah_dasha_block.antardasha_planet}</strong> (
                    {formatDate(kundaliData.current_antardasha?.start)} — {formatDate(kundaliData.current_antardasha?.end)})
                  </p>
                </div>
              </div>

              <div className="p-5 mt-4 bg-orange-50 border border-orange-200 rounded shadow-sm">
                <p className="text-base font-semibold text-orange-800 mb-2">Dasha Influence:</p>
                <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                  {kundaliData.grah_dasha_block.grah_dasha_text}
                </p>
              </div>
            </>
          )}

          {/* 🪐 Planet Overview Tool Block */}
          
          {result.toolId === 'planet-overview' && planetOverview.length > 0 && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded shadow-sm space-y-4">
              <p className="text-base font-semibold text-yellow-800">Choose a planet to view detailed overview:</p>
              
              {/* Button List */}
              <div className="flex flex-wrap gap-2">
                {planetOverview.map((planet: { planet: string; summary: string; text: string }, i: number) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPlanet(planet)}
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedPlanet?.planet === planet.planet
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {planet.planet}
                  </button>
                ))}
              </div>

              {/* Selected Planet Details */}
              {selectedPlanet && (
                <div className="mt-4 p-4 bg-white rounded border border-gray-300 space-y-2">
                  <p className="text-lg font-bold text-pink-700">{selectedPlanet.planet}</p>
                  <p className="text-sm text-gray-700 whitespace-pre-line">{selectedPlanet.summary}</p>
                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{selectedPlanet.text}</p>
                </div>
              )}
            </div>
          )}
          {result.toolId === 'mangal-dosh' && kundaliData.manglik_dosh && (
          <div className="p-4 bg-red-50 border border-red-200 rounded shadow-sm space-y-4">
            
            {/* 🔴 Manglik Status */}
            {kundaliData.manglik_dosh.status?.is_mangalic && (
              <div className="bg-red-100 border border-red-300 p-3 rounded text-sm text-red-900 font-semibold">
                Status: {kundaliData.manglik_dosh.status.is_mangalic}
              </div>
            )}

            {/* 🔖 Main Heading */}
            <p className="text-lg font-semibold text-red-700">
              {kundaliData.manglik_dosh.heading}
            </p>

            {/* 🔎 Report Paragraphs */}
            {kundaliData.manglik_dosh.report_paragraphs.map((para: string, idx: number) => (
              <p key={idx} className="text-sm text-gray-800 whitespace-pre-line">
                {para}
              </p>
            ))}

            {/* 📚 General Explanation */}
            {kundaliData.manglik_dosh.general_explanation && (
              <details className="text-sm text-gray-600 mt-2">
                <summary className="cursor-pointer text-blue-600 underline">Read about Mangal Dosh</summary>
                <p className="mt-2 whitespace-pre-line">{kundaliData.manglik_dosh.general_explanation}</p>
              </details>
            )}
          </div>
        )}
      {/* 📚 KAALSARP DOSH */}
      {result.toolId === 'kaalsarp-dosh' && kundaliData.kaalsarp_dosh && (
        <div className="p-4 bg-indigo-50 border border-indigo-200 rounded shadow-sm space-y-4">
          <p className="text-lg font-semibold text-indigo-700">
            {kundaliData.kaalsarp_dosh.heading}
          </p>
          {kundaliData.kaalsarp_dosh.report_paragraphs.map((para: string, idx: number) => (
            <p key={idx} className="text-sm text-gray-800 whitespace-pre-line">{para}</p>
          ))}
          <details className="text-sm text-gray-600 mt-2">
            <summary className="cursor-pointer text-blue-600 underline">Read More</summary>
            <p className="mt-2">{kundaliData.kaalsarp_dosh.general_explanation}</p>
          </details>
        </div>
      )}
      {/* SADHESATI CALCULALATOR */}
      {result.toolId === 'sadhesati-calculator' && kundaliData.sadhesati && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded shadow-sm space-y-4">
          <p className="text-lg font-semibold text-gray-800">
            Sade Sati Report for Moon Sign: {kundaliData.sadhesati.moon_rashi}
          </p>
              {kundaliData.sadhesati.report_paragraphs?.map((para: string, idx: number) => (
              <p key={idx} className="text-sm text-gray-700 whitespace-pre-line">
                {replaceIsoDates(para)}
              </p>
            ))}
    <p className="text-sm text-gray-700 whitespace-pre-line">
      {kundaliData.sadhesati.summary}
    </p>

    <div className="space-y-3">
      
      {phaseDetails.map((phase: any, idx: number) => (
        <div
          key={idx}
          className={`p-3 border rounded ${
            phase.is_current
              ? 'bg-yellow-100 border-yellow-300'
              : 'bg-white border-gray-300'
          }`}
        >
          <p className="font-medium text-sm text-gray-800">
            🔹 {phase.phase} ({formatDate(phase.start_date)} – {formatDate(phase.end_date)})
          </p>
          <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{phase.impact}</p>
        </div>
      ))}
          </div>
          </div>
        )}
      {/* 👇 Parashari Rajyog UI Block starts here*/}
      {result.toolId === 'parashari-rajyog' && kundaliData.parashari_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Heading */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.parashari_rajyog.heading) || kundaliData.parashari_rajyog.name}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.parashari_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.parashari_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.parashari_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.parashari_rajyog.description)}
            </p>
          )}

          {/* Strength */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.parashari_rajyog.emoji}</span>
            <span>Strength: {kundaliData.parashari_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.parashari_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.parashari_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.parashari_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.parashari_rajyog.challenge)}
            </div>
          )}

          {/* Upsell with Dropdown */}
          {Array.isArray(kundaliData.parashari_rajyog.upsell?.products) && kundaliData.parashari_rajyog.upsell!.products.length > 0 && (
            <details className="rounded border border-pink-300 bg-pink-50 p-4">
              <summary className="cursor-pointer font-medium text-gray-800 list-none">
                {kundaliData.parashari_rajyog.upsell!.products[0].title[lang]}
              </summary>

              <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                {/* First product bullets */}
                {Array.isArray(kundaliData.parashari_rajyog.upsell!.products[0].dropdown?.[lang]) && (
                  <ul className="list-disc pl-5 text-sm text-gray-700">
                    {kundaliData.parashari_rajyog.upsell!.products[0].dropdown![lang].map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                )}

                {/* First product CTA */}
                <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                  {kundaliData.parashari_rajyog.upsell!.products[0].cta[lang]}
                </button>

                {/* Second product (if exists) */}
                {kundaliData.parashari_rajyog.upsell!.products[1] && (
                  <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                    <p className="font-medium text-gray-800">
                      {kundaliData.parashari_rajyog.upsell!.products[1].title[lang]}
                    </p>
                    <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                      {kundaliData.parashari_rajyog.upsell!.products[1].cta[lang]}
                    </button>
                  </div>
                )}
              </div>
            </details>
          )}
        </div>
      )}
      {/* 👇 Neechbhang Rajyog UI Block starts here*/}
      {result.toolId === 'neechbhang-rajyog' && kundaliData.neechbhang_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">
          
          {/* Heading */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.neechbhang_rajyog.heading) || kundaliData.neechbhang_rajyog.name}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.neechbhang_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.neechbhang_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.neechbhang_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.neechbhang_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.neechbhang_rajyog.emoji}</span>
            <span>Strength: {kundaliData.neechbhang_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.neechbhang_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.neechbhang_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.neechbhang_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.neechbhang_rajyog.challenge)}
            </div>
          )}

          {/* Upsell Products */}
          {Array.isArray(kundaliData.neechbhang_rajyog.upsell?.products) &&
            kundaliData.neechbhang_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.neechbhang_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* First dropdown list */}
                  {pickList(kundaliData.neechbhang_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.neechbhang_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA button */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.neechbhang_rajyog.upsell.products[0].cta)}
                  </button>

                  {/* Second upsell (if exists) */}
                  {kundaliData.neechbhang_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.neechbhang_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.neechbhang_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 👆 Neechbhang Rajyog UI Block starts here*/}
      {/* 🐘 Gajakesari Yog UI Block */}
      {result.toolId === 'gajakesari-yog' && kundaliData.gajakesari_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">
          
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.gajakesari_yog.heading ?? kundaliData.gajakesari_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.gajakesari_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.gajakesari_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.gajakesari_yog.description ?? '') && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.gajakesari_yog.description ?? '')}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.gajakesari_yog.emoji}</span>
            <span>Strength: {kundaliData.gajakesari_yog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.gajakesari_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.gajakesari_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.gajakesari_yog.challenge ?? '') && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.gajakesari_yog.challenge ?? '')}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.gajakesari_yog.upsell?.products) &&
            kundaliData.gajakesari_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.gajakesari_yog.upsell.products[0].title ?? '')}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.gajakesari_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.gajakesari_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.gajakesari_yog.upsell.products[0].cta ?? '')}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.gajakesari_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.gajakesari_yog.upsell.products[1].title ?? '')}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.gajakesari_yog.upsell.products[1].cta ?? '')}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 🐘 Gajakesari Yog UI Block Finish */}
      {/* 🧘 Panch Mahapurush Rajyog UI Block */}
      {result.toolId === 'panch-mahapurush' && kundaliData.panch_mahapurush_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.panch_mahapurush_yog.heading ?? kundaliData.panch_mahapurush_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.panch_mahapurush_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.panch_mahapurush_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {pickText(kundaliData.panch_mahapurush_yog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.panch_mahapurush_yog.description)}
            </p>
          )}

          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.panch_mahapurush_yog.emoji}</span>
            <span>Strength: {kundaliData.panch_mahapurush_yog.strength}</span>
          </div>

          {pickList(kundaliData.panch_mahapurush_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.panch_mahapurush_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {pickText(kundaliData.panch_mahapurush_yog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.panch_mahapurush_yog.challenge)}
            </div>
          )}

          {Array.isArray(kundaliData.panch_mahapurush_yog.upsell?.products) &&
            kundaliData.panch_mahapurush_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.panch_mahapurush_yog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {pickList(kundaliData.panch_mahapurush_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.panch_mahapurush_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.panch_mahapurush_yog.upsell.products[0].cta)}
                  </button>

                  {kundaliData.panch_mahapurush_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.panch_mahapurush_yog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.panch_mahapurush_yog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 🧘 Panch Mahapurush Rajyog UI Block END */}
      {/* 🌙🔥 Chandra-Mangal Yog UI Block */}
      {result.toolId === 'chandra-mangal' && kundaliData.chandra_mangal_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.chandra_mangal_yog.heading ?? kundaliData.chandra_mangal_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.chandra_mangal_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.chandra_mangal_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.chandra_mangal_yog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.chandra_mangal_yog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.chandra_mangal_yog.emoji}</span>
            <span>Strength: {kundaliData.chandra_mangal_yog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.chandra_mangal_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.chandra_mangal_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.chandra_mangal_yog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.chandra_mangal_yog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.chandra_mangal_yog.upsell?.products) &&
            kundaliData.chandra_mangal_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.chandra_mangal_yog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.chandra_mangal_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.chandra_mangal_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.chandra_mangal_yog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.chandra_mangal_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.chandra_mangal_yog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.chandra_mangal_yog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
                {/* 🌙🔥 Chandra-Mangal Yog UI Block Finish*/}
      {/* 💰 Dhan Yog UI Block */}
      {result.toolId === 'dhan-yog' && kundaliData.dhan_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.dhan_yog.heading ?? kundaliData.dhan_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.dhan_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.dhan_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.dhan_yog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.dhan_yog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.dhan_yog.emoji}</span>
            <span>Strength: {kundaliData.dhan_yog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.dhan_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.dhan_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.dhan_yog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.dhan_yog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.dhan_yog.upsell?.products) &&
            kundaliData.dhan_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.dhan_yog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {pickList(kundaliData.dhan_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.dhan_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.dhan_yog.upsell.products[0].cta)}
                  </button>

                  {kundaliData.dhan_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.dhan_yog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.dhan_yog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 💰 Dhan Yog UI Block END */}
      {/* 🏛️ Rajya Sambandh Rajyog UI Block */}
      {result.toolId === 'rajya-sambandh' && kundaliData.rajya_sambandh_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.rajya_sambandh_rajyog.heading ?? kundaliData.rajya_sambandh_rajyog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.rajya_sambandh_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.rajya_sambandh_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.rajya_sambandh_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.rajya_sambandh_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.rajya_sambandh_rajyog.emoji}</span>
            <span>Strength: {kundaliData.rajya_sambandh_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.rajya_sambandh_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.rajya_sambandh_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.rajya_sambandh_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.rajya_sambandh_rajyog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.rajya_sambandh_rajyog.upsell?.products) &&
            kundaliData.rajya_sambandh_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.rajya_sambandh_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {pickList(kundaliData.rajya_sambandh_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.rajya_sambandh_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.rajya_sambandh_rajyog.upsell.products[0].cta)}
                  </button>

                  {kundaliData.rajya_sambandh_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.rajya_sambandh_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.rajya_sambandh_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 🏛️ Rajya Sambandh Rajyog UI Block END */}
      {/* 🪔 Dharma-Karmadhipati Rajyog UI Block */}
      {result.toolId === 'dharma-karmadhipati' && kundaliData.dharma_karmadhipati_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.dharma_karmadhipati_rajyog.heading ?? kundaliData.dharma_karmadhipati_rajyog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.dharma_karmadhipati_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.dharma_karmadhipati_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.dharma_karmadhipati_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.dharma_karmadhipati_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.dharma_karmadhipati_rajyog.emoji}</span>
            <span>Strength: {kundaliData.dharma_karmadhipati_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.dharma_karmadhipati_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.dharma_karmadhipati_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.dharma_karmadhipati_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.dharma_karmadhipati_rajyog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.dharma_karmadhipati_rajyog.upsell?.products) &&
            kundaliData.dharma_karmadhipati_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.dharma_karmadhipati_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {pickList(kundaliData.dharma_karmadhipati_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.dharma_karmadhipati_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.dharma_karmadhipati_rajyog.upsell.products[0].cta)}
                  </button>

                  {kundaliData.dharma_karmadhipati_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.dharma_karmadhipati_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.dharma_karmadhipati_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 🪔 Dharma-Karmadhipati Rajyog UI Block END */}
      {/* ⚡ Vipreet Rajyog UI Block */}
      {result.toolId === 'vipreet-rajyog' && kundaliData.vipreet_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">
          
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.vipreet_rajyog.heading ?? kundaliData.vipreet_rajyog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.vipreet_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.vipreet_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.vipreet_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.vipreet_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.vipreet_rajyog.emoji}</span>
            <span>Strength: {kundaliData.vipreet_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.vipreet_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.vipreet_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.vipreet_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.vipreet_rajyog.challenge)}
            </div>
          )}

          {/* Upsell */}
          {Array.isArray(kundaliData.vipreet_rajyog.upsell?.products) &&
            kundaliData.vipreet_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.vipreet_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown */}
                  {pickList(kundaliData.vipreet_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.vipreet_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.vipreet_rajyog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second CTA */}
                  {kundaliData.vipreet_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.vipreet_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.vipreet_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* ⚡ Vipreet Rajyog UI Block Finish*/}
      {/* 💰 Lakshmi Yog UI Block */}
      {result.toolId === 'lakshmi-yog' && kundaliData.lakshmi_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.lakshmi_yog.heading ?? kundaliData.lakshmi_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.lakshmi_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.lakshmi_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.lakshmi_yog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.lakshmi_yog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.lakshmi_yog.emoji}</span>
            <span>Strength: {kundaliData.lakshmi_yog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.lakshmi_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.lakshmi_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.lakshmi_yog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.lakshmi_yog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.lakshmi_yog.upsell?.products) &&
            kundaliData.lakshmi_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.lakshmi_yog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.lakshmi_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.lakshmi_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.lakshmi_yog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.lakshmi_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.lakshmi_yog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.lakshmi_yog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 💰 Lakshmi Yog UI Block Finish */}
      {/* 🌿 Shubh Kartari Yog UI Block */}
      {result.toolId === 'shubh-kartari' && kundaliData.shubh_kartari_yog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">

          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.shubh_kartari_yog.heading ?? kundaliData.shubh_kartari_yog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.shubh_kartari_yog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.shubh_kartari_yog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.shubh_kartari_yog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.shubh_kartari_yog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>{kundaliData.shubh_kartari_yog.emoji}</span>
            <span>Strength: {kundaliData.shubh_kartari_yog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.shubh_kartari_yog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.shubh_kartari_yog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.shubh_kartari_yog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.shubh_kartari_yog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.shubh_kartari_yog.upsell?.products) &&
            kundaliData.shubh_kartari_yog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.shubh_kartari_yog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.shubh_kartari_yog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.shubh_kartari_yog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.shubh_kartari_yog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.shubh_kartari_yog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.shubh_kartari_yog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.shubh_kartari_yog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
        {/* 🌿 Shubh Kartari Yog UI Block Finish*/}
      {/* 👑 Adhi Rajyog UI Block */}
      {result.toolId === 'adhi-rajyog' && kundaliData.adhi_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.adhi_rajyog.heading ?? kundaliData.adhi_rajyog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.adhi_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.adhi_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.adhi_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.adhi_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>👑</span>
            <span>Strength: {kundaliData.adhi_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.adhi_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.adhi_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.adhi_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.adhi_rajyog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.adhi_rajyog.upsell?.products) &&
            kundaliData.adhi_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.adhi_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.adhi_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.adhi_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.adhi_rajyog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.adhi_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.adhi_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.adhi_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 💰 Kuber Rajyog UI Block */}
      {result.toolId === 'kuber-rajyog' && kundaliData.kuber_rajyog && (
        <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200 space-y-4">
          {/* Title */}
          <h2 className="text-xl font-semibold text-gray-800">
            {pickText(kundaliData.kuber_rajyog.heading ?? kundaliData.kuber_rajyog.name)}
          </h2>

          {/* Reasons */}
          {pickList(kundaliData.kuber_rajyog.reasons).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Why this Yog is present:' : 'यह योग क्यों बना है:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.kuber_rajyog.reasons).map((reason, idx) => (
                  <li key={idx}>{reason}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Description */}
          {pickText(kundaliData.kuber_rajyog.description) && (
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {pickText(kundaliData.kuber_rajyog.description)}
            </p>
          )}

          {/* Strength + Emoji */}
          <div className="text-sm font-medium text-green-700 flex items-center gap-2">
            <span>💰</span>
            <span>Strength: {kundaliData.kuber_rajyog.strength}</span>
          </div>

          {/* Positives */}
          {pickList(kundaliData.kuber_rajyog.positives).length > 0 && (
            <div>
              <p className="font-medium text-sm text-gray-800 mb-1">
                {lang === 'en' ? 'Positive Impacts:' : 'सकारात्मक प्रभाव:'}
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                {pickList(kundaliData.kuber_rajyog.positives).map((point, idx) => (
                  <li key={idx}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Challenge */}
          {pickText(kundaliData.kuber_rajyog.challenge) && (
            <div className="text-sm text-red-600 italic">
              ⚠️ {pickText(kundaliData.kuber_rajyog.challenge)}
            </div>
          )}

          {/* Upsell Block */}
          {Array.isArray(kundaliData.kuber_rajyog.upsell?.products) &&
            kundaliData.kuber_rajyog.upsell.products.length > 0 && (
              <details className="rounded border border-pink-300 bg-pink-50 p-4">
                <summary className="cursor-pointer font-medium text-gray-800 list-none">
                  {pickText(kundaliData.kuber_rajyog.upsell.products[0].title)}
                </summary>

                <div className="mt-3 space-y-2 pl-2 border-l-2 border-pink-400 ml-2">
                  {/* Dropdown list */}
                  {pickList(kundaliData.kuber_rajyog.upsell.products[0].dropdown).length > 0 && (
                    <ul className="list-disc pl-5 text-sm text-gray-700">
                      {pickList(kundaliData.kuber_rajyog.upsell.products[0].dropdown).map((tip, i) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  )}

                  {/* First CTA */}
                  <button className="mt-2 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                    {pickText(kundaliData.kuber_rajyog.upsell.products[0].cta)}
                  </button>

                  {/* Optional Second Product */}
                  {kundaliData.kuber_rajyog.upsell.products[1] && (
                    <div className="mt-4 p-4 border border-pink-200 rounded-md bg-white space-y-2">
                      <p className="font-medium text-gray-800">
                        {pickText(kundaliData.kuber_rajyog.upsell.products[1].title)}
                      </p>
                      <button className="mt-1 px-4 py-1 bg-pink-600 text-white text-sm rounded hover:bg-pink-700">
                        {pickText(kundaliData.kuber_rajyog.upsell.products[1].cta)}
                      </button>
                    </div>
                  )}
                </div>
              </details>
          )}
        </div>
      )}
      {/* 💰 Kuber Rajyog UI Block Finish */}
      {/* GEMSTONE SUGGESTION */}
        {result.toolId === "gemstone-suggestion" && kundaliData.gemstone_suggestion && (
          <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              💎 Gemstone Suggestion
            </h2>

            {/* Paragraph */}
            {kundaliData.gemstone_suggestion.paragraph && (
              <p className="text-gray-700 leading-relaxed">
                {kundaliData.gemstone_suggestion.paragraph}
              </p>
            )}

            {/* Gemstone & Substone */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-pink-50 border border-pink-200 rounded-lg p-3">
              <div>
                <p className="font-semibold text-gray-900">
                  Main Gemstone:{" "}
                  <span className="text-pink-600">
                    {kundaliData.gemstone_suggestion.gemstone}
                  </span>
                </p>
                <p className="font-medium text-gray-700">
                  Substitute:{" "}
                  <span className="text-gray-600">
                    {kundaliData.gemstone_suggestion.substone}
                  </span>
                </p>
              </div>
            </div>

            {/* CTA */}
            <details className="group">
              <summary className="cursor-pointer text-blue-700 hover:underline font-semibold text-lg">
                {kundaliData.gemstone_suggestion.cta.heading}
              </summary>
              <div className="mt-3 space-y-3">
                {kundaliData.gemstone_suggestion.cta.sections.map((section, idx) => (
                  <div
                    key={idx}
                    className="p-4 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white"
                  >
                    <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
                    <p className="text-gray-700 text-sm mt-1">{section.description}</p>
                    <button
                      className="mt-2 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition"
                    >
                      {section.button_text}
                    </button>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
        {/* Gemstone & Substone Finish*/}
        {/* Career Path Start */}
          {result.toolId === 'career-path' && kundaliData.career_path && (
            <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">💼 Career Direction Report</h2>

              {/* Heading */}
              <p className="text-gray-700">{kundaliData.career_path.heading}</p>

              {/* Positive Points */}
              <div>
                <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {kundaliData.career_path.positive_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Negative Points */}
              <div>
                <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {kundaliData.career_path.negative_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Dominant Influence */}
              {kundaliData.career_path.dominant_influence && (
                <p className="text-gray-800 font-medium italic">
                  {kundaliData.career_path.dominant_influence}
                </p>
              )}

              {/* CTA */}
              {kundaliData.career_path.cta && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="text-gray-900 font-semibold">{kundaliData.career_path.cta}</p>
                </div>
              )}
            </div>
          )}
          {/* Career Path End */}
        {/* Marriage Path Start */}
          {result.toolId === 'marriage-path' && kundaliData.marriage_path && (
            <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
              <h2 className="text-xl font-bold text-gray-800">💖 Marriage Life Report</h2>

              {/* Heading */}
              <p className="text-gray-700">{kundaliData.marriage_path.heading}</p>

              {/* Positive Points */}
              <div>
                <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {kundaliData.marriage_path.positive_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Negative Points */}
              <div>
                <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                <ul className="list-disc list-inside text-gray-700">
                  {kundaliData.marriage_path.negative_points.map((point: string, index: number) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </div>

              {/* Dominant Influence */}
              {kundaliData.marriage_path.dominant_influence && (
                <p className="text-gray-800 font-medium italic">
                  {kundaliData.marriage_path.dominant_influence}
                </p>
              )}

              {/* CTA */}
              {kundaliData.marriage_path.cta && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                  <p className="text-gray-800">{kundaliData.marriage_path.cta}</p>
                  <button className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  suppressHydrationWarning
                  >
                    Buy Now
                  </button>
                </div>
              )}
            </div>
          )}
          {/* Marriage Path End */}
          {/* Foreign Travel Start */}
            {result.toolId === 'foreign-travel' && kundaliData.foreign_travel && (
              <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">🌍 Foreign Travel Insight</h2>

                {/* Heading */}
                <p className="text-gray-700">{kundaliData.foreign_travel.heading}</p>

                {/* Positive Points */}
                {kundaliData.foreign_travel.positive_points?.length > 0 && (
                  <div>
                    <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {kundaliData.foreign_travel.positive_points.map((point: any, index: number) => (
                        <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Negative Points */}
                {kundaliData.foreign_travel.negative_points?.length > 0 && (
                  <div>
                    <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {kundaliData.foreign_travel.negative_points.map((point: any, index: number) => (
                        <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dominant Influence */}
                {kundaliData.foreign_travel.dominant_influence && (
                  <p className="text-gray-800 font-medium italic">
                    {kundaliData.foreign_travel.dominant_influence}
                  </p>
                )}

                {/* CTA */}
                {kundaliData.foreign_travel.cta && (
                  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                    <p className="text-gray-900 font-semibold">{kundaliData.foreign_travel.cta}</p>
                  </div>
                )}
              </div>
            )}
            {/* Foreign Travel End */}
            {/* Business Path Start */}
            {result.toolId === 'business-path' && kundaliData.business_path && (
              <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800">📈 Business Favorability Report</h2>

                {/* Positive Points */}
                {kundaliData.business_path.positive_points?.length > 0 && (
                  <div>
                    <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {kundaliData.business_path.positive_points.map((point: any, index: number) => (
                        <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Negative Points */}
                {kundaliData.business_path.negative_points?.length > 0 && (
                  <div>
                    <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {kundaliData.business_path.negative_points.map((point: any, index: number) => (
                        <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Dominant Influence */}
                {kundaliData.business_path.dominant_influence && (
                  <p className="text-gray-800 font-medium italic">
                    {kundaliData.business_path.dominant_influence}
                  </p>
                )}

                {/* CTA */}
                {kundaliData.business_path.cta && (
                  <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                    <p className="text-gray-900 font-semibold">{kundaliData.business_path.cta}</p>
                  </div>
                )}
              </div>
            )}
            {/* Business Path End */}
            {/* Government Job Start */}
              {result.toolId === 'government-job' && kundaliData.government_job && (
                <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800">🏢 Government Job Potential</h2>

                  {/* Heading */}
                  <p className="text-gray-700">{kundaliData.government_job.heading}</p>

                  {/* Positive Points */}
                  {kundaliData.government_job.positive_points?.length > 0 && (
                    <div>
                      <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {kundaliData.government_job.positive_points.map((point: any, index: number) => (
                          <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Negative Points */}
                  {kundaliData.government_job.negative_points?.length > 0 && (
                    <div>
                      <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {kundaliData.government_job.negative_points.map((point: any, index: number) => (
                          <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verdict */}
                  {kundaliData.government_job.verdict && (
                    <p className="text-gray-800 font-medium italic">
                      {kundaliData.government_job.verdict}
                    </p>
                  )}

                  {/* CTA */}
                  {kundaliData.government_job.cta && (
                    <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                      <p className="text-gray-900 font-semibold">{kundaliData.government_job.cta}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Government Job End */}
              {/* Love Life Start */}
               {result.toolId === 'love-life' && kundaliData.love_life && (
                <div className="p-4 bg-white border rounded-lg space-y-4 shadow-sm">
                  <h2 className="text-xl font-bold text-gray-800">💖 Love Life Insight</h2>

                  {/* Heading */}
                  <p className="text-gray-700">{kundaliData.love_life.heading}</p>

                  {/* Positive Points */}
                  {kundaliData.love_life.positive_points?.length > 0 && (
                    <div>
                      <h3 className="text-green-700 font-semibold">Positive Points:</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {kundaliData.love_life.positive_points.map((point: any, index: number) => (
                          <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Negative Points */}
                  {kundaliData.love_life.negative_points?.length > 0 && (
                    <div>
                      <h3 className="text-red-700 font-semibold">Negative Points:</h3>
                      <ul className="list-disc list-inside text-gray-700">
                        {kundaliData.love_life.negative_points.map((point: any, index: number) => (
                          <li key={index}>{typeof point === 'string' ? point : point.en}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Verdict */}
                  {kundaliData.love_life.verdict && (
                    <p className="text-gray-800 font-medium italic">{kundaliData.love_life.verdict}</p>
                  )}

                  {/* CTA */}
                  {kundaliData.love_life.cta && (
                    <div className="mt-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
                      <p className="text-gray-900 font-semibold">{kundaliData.love_life.cta}</p>
                    </div>
                  )}
                </div>
              )}
              {/* Love Life End */}
      </div>
  </div>
      {/* 🔁 Suggested Tools at Bottom */}
        <div className="mt-10">
          <h3 className="text-xl font-bold mb-4">Discover More About Yourself</h3>
          <ToolSuggestions toolId={result.toolId} />
        </div>

      {/* 📢 Google Ad Area */}
      <div className="mt-10 flex justify-center">
        <a href="/ads/report-offer" target="_blank" rel="noopener noreferrer">
          <Image
            src="/ads/ad-offer.jpg"
            alt="Astrology Report Ad"
            width={728}
            height={90}
            className="rounded shadow border"
          />
        </a>
      </div>
    </div>
  );
}
