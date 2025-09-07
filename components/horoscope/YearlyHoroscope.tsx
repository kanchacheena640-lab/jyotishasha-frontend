"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface HoroscopeSection {
  title: string;
  content: string;
}

interface YearlyData {
  sign: string;
  title: string;
  overview: string;
  sections: {
    career_business: HoroscopeSection;
    money_finance: HoroscopeSection;
    love_relationships: HoroscopeSection;
    health_energy: HoroscopeSection;
  };
  tips: {
    general: string[];
  };
  summary: string;
}

export default function YearlyHoroscope({ zodiac }: { zodiac: string }) {
  const [data, setData] = useState<YearlyData | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const searchParams = useSearchParams();
  const year = searchParams.get("year") || new Date().getFullYear().toString();

  function updateYear(newYear: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("year", newYear);
    router.replace(`?${params.toString()}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/data/horoscopes/yearly_${year}.json`);
        const json = await res.json();
        const matched = json.horoscopes.find(
          (h: any) => h.sign.toLowerCase() === zodiac.toLowerCase()
        );
        setData(matched);
      } catch (err) {
        console.error("Error loading yearly data:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [zodiac, year]);

  if (loading) return <p className="text-center">Loading Yearly Horoscope...</p>;

  if (!data)
    return (
      <div className="text-center text-red-400">
        <div className="flex gap-3 mb-4 justify-center">
          {[2025, 2026].map((yr) => (
            <button
              key={yr}
              onClick={() => updateYear(yr.toString())}
              className={`px-4 py-1 rounded-full text-sm ${
                year === yr.toString()
                  ? "bg-purple-600 text-white"
                  : "bg-white text-purple-600 border"
              }`}
            >
              {yr}
            </button>
          ))}
        </div>
        <p>Coming soon for {zodiac} in {year}.</p>
      </div>
    );

  return (
    <div className="text-left space-y-6">
      <div className="flex gap-3 mb-4">
        {[2025, 2026].map((yr) => (
          <button
            key={yr}
            onClick={() => updateYear(yr.toString())}
            className={`px-4 py-1 rounded-full text-sm ${
              year === yr.toString()
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600 border"
            }`}
          >
            {yr}
          </button>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-purple-200">{data.title}</h2>
      <p className="text-gray-300">{data.overview}</p>

      {Object.values(data.sections).map((section, idx) => (
        <div key={idx}>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-purple-100">
            {section.title}
          </h3>
          <p className="text-gray-300">{section.content}</p>
        </div>
      ))}

      {data.tips?.general?.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-purple-100">Tips</h3>
          <ul className="list-disc pl-6 text-gray-300">
            {data.tips.general.map((tip, i) => (
              <li key={i}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {data.summary && (
        <div>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-purple-100">Summary</h3>
          <p className="text-gray-300">{data.summary}</p>
        </div>
      )}
    </div>
  );
}
