"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

async function fetchHoroscope(sign: string, type: string = "daily") {
  const res = await fetch(`/api/${type}-horoscope?sign=${sign}`);
  const data = await res.json();
  return data;
}

export default function HoroscopeTabs({ zodiacName }: { zodiacName: string }) {
  const searchParams = useSearchParams();
  const year = searchParams.get("year") || new Date().getFullYear().toString();
  const initialTab = searchParams.get("year") ? "yearly" : "daily";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [horoscope, setHoroscope] = useState<any>(null);
  const [yearlyData, setYearlyData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Load Daily or Monthly Horoscope
  useEffect(() => {
    if (activeTab === "daily" || activeTab === "monthly") {
      setLoading(true);
      fetchHoroscope(zodiacName.toLowerCase(), activeTab).then((data) => {
        setHoroscope(data);
        setLoading(false);
      });
    }
  }, [zodiacName, activeTab]);

  // Load Yearly Horoscope
  useEffect(() => {
    async function loadYearly() {
      try {
        const res = await fetch(`/data/horoscopes/yearly_${year}.json`);
        const json = await res.json();
        const matched = json.horoscopes.find(
          (h: any) => h.sign.toLowerCase() === zodiacName.toLowerCase()
        );
        setYearlyData(matched);
      } catch (err) {
        console.error("Yearly data fetch error:", err);
        setYearlyData(null);
      }
    }

    if (activeTab === "yearly") {
      loadYearly();
    }
  }, [zodiacName, activeTab, year]);

  return (
    <>
      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8">
        {["daily", "monthly", "yearly"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg font-semibold ${
              activeTab === tab
                ? "bg-purple-600 text-white"
                : "bg-white text-purple-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)} Horoscope
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[#1e1b4b] text-white rounded-xl p-6 shadow-md transition-all duration-300 text-left">
        {activeTab === "daily" && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : horoscope ? (
              <div className="space-y-2">
                <p>
                  <strong>Career:</strong> {horoscope.career}
                </p>
                <p>
                  <strong>Love:</strong> {horoscope.love}
                </p>
                <p>
                  <strong>Health:</strong> {horoscope.health}
                </p>
                <p>
                  <strong>Tips:</strong> {horoscope.tips}
                </p>
              </div>
            ) : (
              <p>No horoscope found for {zodiacName}.</p>
            )}
          </>
        )}

        {activeTab === "monthly" && (
          <>
            {loading ? (
              <p>Loading...</p>
            ) : horoscope ? (
              <div className="space-y-3">
                <p>{horoscope.paragraph1}</p>
                <p>{horoscope.paragraph2}</p>
                <p>{horoscope.paragraph3}</p>
                <p>
                  <strong>Tip of the Month:</strong> {horoscope.tip}
                </p>
              </div>
            ) : (
              <p>No monthly horoscope found for {zodiacName}.</p>
            )}
          </>
        )}

        {activeTab === "yearly" && (
          <>
            {!yearlyData ? (
              <p>Loading Yearly Horoscope for {zodiacName}...</p>
            ) : (
              <div className="space-y-4">
                {/* Optional: Year Switch */}
                <div className="flex gap-3 mb-4">
                  {[2025, 2026].map((yr) => (
                    <a
                      key={yr}
                      href={`?year=${yr}`}
                      className={`px-3 py-1 rounded-full text-sm ${
                        year === yr.toString()
                          ? "bg-purple-600 text-white"
                          : "bg-white text-purple-600 border"
                      }`}
                    >
                      {yr}
                    </a>
                  ))}
                </div>

                <h2 className="text-2xl font-bold text-purple-200">{yearlyData.title}</h2>
                <p className="text-gray-300">{yearlyData.overview}</p>

                {Object.values(yearlyData.sections).map((section: any, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-lg font-semibold text-purple-100">{section.title}</h3>
                    <p>{section.content}</p>
                  </div>
                ))}

                {yearlyData.tips?.general?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-purple-100">Tips</h3>
                    <ul className="list-disc pl-5">
                      {yearlyData.tips.general.map((tip: string, i: number) => (
                        <li key={i}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {yearlyData.summary && (
                  <div>
                    <h3 className="font-semibold text-purple-100">Summary</h3>
                    <p>{yearlyData.summary}</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
