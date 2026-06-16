"use client";

import Link from "next/link";

type Props = {
  month: string;
  year: number;
  auspiciousDates: number[];
  slug: string;
  locale: string;
};

export default function AnnualMonthCalendar({
  month,
  year,
  auspiciousDates,
  slug,
  locale,
}: Props) {

  const totalDays = 31;

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">

      <h2 className="text-2xl font-bold mb-6 capitalize">
        Auspicious Muhurth In {month} {year}
      </h2>

      <div className="grid grid-cols-7 gap-2">

        {Array.from(
          { length: totalDays },
          (_, i) => i + 1
        ).map((day) => {

          const isAuspicious =
            auspiciousDates.includes(day);

          return (
            <div
              key={day}
              className={`h-12 rounded-lg flex items-center justify-center text-sm font-semibold
              ${
                isAuspicious
                  ? "bg-green-600 animate-pulse"
                  : "bg-white/10"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="mt-6">

        <Link
          href={`/${locale}/panchang/muhurat/${slug}/${month}`}
          className="inline-block bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-xl font-semibold"
        >
          View Full Details →
        </Link>

      </div>

    </div>
  );
}