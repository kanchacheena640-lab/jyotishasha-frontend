"use client";

import React from "react";

interface Antardasha {
  planet: string;
  start: string;
  end: string;
}

interface Mahadasha {
  mahadasha: string;
  start: string;
  end: string;
  antardashas: Antardasha[];
}

interface CurrentBlock {
  mahadasha: string;
  antardasha: string;
}

interface Props {
  data?: Mahadasha; // ✅ optional to prevent undefined crash
  index: number;
  openIndex: number | null;
  setOpenIndex: React.Dispatch<React.SetStateAction<number | null>>;
  current?: CurrentBlock;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  const d = new Date(dateStr);
  return isNaN(d.getTime())
    ? "—"
    : d.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
}

export default function DashaCard({
  data,
  index,
  openIndex,
  setOpenIndex,
  current,
}: Props) {
  if (!data) return null;

  const isOpen = openIndex === index;
  const isCurrent =
    (current?.mahadasha || "").toLowerCase() ===
    (data?.mahadasha || "").toLowerCase();

  return (
    <div
      className={`rounded-xl border p-3 sm:p-4 transition-all duration-300 cursor-pointer
      ${
        isCurrent
          ? "border-purple-400 bg-gradient-to-r from-purple-700 to-indigo-700 shadow-lg shadow-purple-500/30"
          : "border-purple-800/50 bg-purple-950/50 hover:bg-purple-900/50"
      }`}
      onClick={() => setOpenIndex(isOpen ? null : index)}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 min-h-[48px]">
        <div className="flex flex-col">
          <h4 className="text-base sm:text-lg font-bold text-white">
            {data.mahadasha || "—"}
          </h4>
          <p className="text-xs sm:text-sm text-purple-300">
            {formatDate(data.start)} → {formatDate(data.end)}
          </p>
        </div>

        <span
          className={`transform transition-transform text-purple-300 text-sm sm:text-base ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          ▶
        </span>
      </div>

      {/* Antardasha List */}
      <div
        className={`overflow-hidden transition-all duration-500 ${
          isOpen ? "max-h-[800px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <div className="pl-4 border-l-2 border-purple-400/50 space-y-1.5 ml-1">
          {(data.antardashas ?? []).length > 0 ? (
            data.antardashas.map((a, j) => {
              const isActive =
                isCurrent &&
                (current?.antardasha || "").toLowerCase() ===
                  (a.planet || "").toLowerCase();

              return (
                <div
                  key={j}
                  className={`py-1 px-2 rounded-md flex items-center justify-between text-xs sm:text-sm ${
                    isActive
                      ? "bg-green-500/15 text-green-300 font-semibold"
                      : "bg-purple-900/30 text-purple-200"
                  } antardasha-hover`}
                >
                  <span>• {a.planet}</span>
                  <span className="text-indigo-200/90 text-[13px] sm:text-[14px] font-medium drop-shadow-[0_0_4px_rgba(167,139,250,0.6)] tracking-wide">
                    {formatDate(a.start)} – {formatDate(a.end)}
                  </span>
                </div>
              );
            })
          ) : (
            <p className="text-purple-300/70 text-xs italic">
              No Antardasha data available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
