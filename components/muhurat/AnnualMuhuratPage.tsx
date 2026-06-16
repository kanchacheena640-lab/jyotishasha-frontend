"use client";

import {
  useState,
  useEffect,
} from "react";

import {
  MONTH_MAP,
  getTargetYear,
} from "@/lib/months";

import AnnualMonthCalendar from "./AnnualMonthCalendar";


type Props = {
  slug: string;
  locale: string;
  year: number;
  topic: any;
};

export default function AnnualMuhuratPage({
  slug,
  locale,
  year,
  topic,
}: Props) {

  const [selectedMonth, setSelectedMonth] =
    useState<string | null>(null);

  const [isMobile, setIsMobile] =
    useState(false);

  const [auspiciousDates, setAuspiciousDates] =
    useState<number[]>([]);

  const currentMonth =
  new Date().getMonth() + 1;

    const currentYear =
    new Date().getFullYear();

    const monthEntries =
    Object.entries(MONTH_MAP);

    const months = [

    ...monthEntries
        .filter(([_, num]) =>
        num >= currentMonth
        )
        .map(([month, num]) => ({
        month,
        year: currentYear,
        monthNumber: num,
        })),

    ...monthEntries
        .filter(([_, num]) =>
        num < currentMonth
        )
        .map(([month, num]) => ({
        month,
        year: currentYear + 1,
        monthNumber: num,
        })),

    ];

  useEffect(() => {

    const check = () =>
        setIsMobile(
        window.innerWidth < 768
        );

    check();

    window.addEventListener(
        "resize",
        check
    );

    return () =>
        window.removeEventListener(
        "resize",
        check
        );

    }, []);

    useEffect(() => {

  if (!selectedMonth) return;

  const selected =
    months.find(
      (m) => m.month === selectedMonth
    );

  if (!selected) return;

  const loadMuhurat = async () => {

    try {

      const res = await fetch(
        "https://jyotishasha-backend.onrender.com/api/muhurth/month",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            activity: topic.activity,
            month: selected.monthNumber,
            year: selected.year,
            latitude: 26.8467,
            longitude: 80.9462,
            language: locale,
          }),
        }
      );

      const data =
        await res.json();

      const dates =
        (data.results || []).map(
          (item: any) =>
            Number(
              item.date.split("-")[2]
            )
        );

      setAuspiciousDates(
        dates
      );

    } catch (err) {

      console.error(err);

      setAuspiciousDates([]);

    }

  };

  loadMuhurat();

}, [selectedMonth, locale, topic.activity]);

  const monthRows = isMobile
    ? months.map((month) => [month])
    : Array.from(
        {
            length: Math.ceil(
            months.length / 3
            ),
        },
        (_, i) =>
            months.slice(
            i * 3,
            i * 3 + 3
            )
        );

  return (
    <article className="max-w-6xl mx-auto px-4 py-10 text-white">

      <h1 className="text-4xl font-bold mb-3">
        {topic.title} {year}
      </h1>

      <p className="text-gray-400 mb-8">
        Select a month to view auspicious dates
      </p>

      <div className="space-y-6">

  {monthRows.map((row, rowIndex) => {

    const selectedInRow =
      row.find(
        (m) => m.month === selectedMonth
      );

    return (

      <div key={rowIndex}>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {row.map((item) => (

            <button
              key={item.month}
              onClick={() =>
                setSelectedMonth(
                  selectedMonth === item.month
                    ? null
                    : item.month
                )
              }
              className={`w-full rounded-xl p-5 border transition-all ${
                selectedMonth === item.month
                  ? "border-purple-500 bg-purple-900/30"
                  : "border-white/10 bg-white/5"
              }`}
            >

              <div className="font-semibold capitalize">
                {item.month}
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {item.year}
              </div>

            </button>

          ))}

        </div>

        {selectedInRow && (

          <AnnualMonthCalendar
            month={selectedInRow.month}
            year={selectedInRow.year}
            slug={slug}
            locale={locale}
            auspiciousDates={auspiciousDates}
          />

        )}

      </div>

    );

  })}

</div>

    </article>
  );
}