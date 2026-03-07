"use client";

import { useState } from "react";
import Link from "next/link";


type EventItem = {
  name: string;
  date: string;
  slug: string;
};

type Props = {
  data: any;
  events?: EventItem[];
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default function HomePanchang({ data, events }: Props) {

  if (!data) return null;

  const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "upcoming">("today");

  const p =
    activeTab === "today"
      ? data.selected_date
      : activeTab === "tomorrow"
      ? data.next_date
      : null;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 md:py-12">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white tracking-wide">
          Today’s Panchang
        </h2>
      </div>

      <div className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81] rounded-2xl p-6 shadow-xl border border-purple-700 flex flex-col justify-between min-h-[320px]">

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex gap-5 text-sm font-medium">

            <button
              onClick={() => setActiveTab("today")}
              className={`pb-1 ${
                activeTab === "today"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400"
              }`}
            >
              Today
            </button>

            <button
              onClick={() => setActiveTab("tomorrow")}
              className={`pb-1 ${
                activeTab === "tomorrow"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400"
              }`}
            >
              Tomorrow
            </button>

            <button
              onClick={() => setActiveTab("upcoming")}
              className={`pb-1 ${
                activeTab === "upcoming"
                  ? "text-green-400 border-b-2 border-green-400"
                  : "text-gray-400"
              }`}
            >
              Upcoming
            </button>

          </div>
        </div>

        {/* UPCOMING EVENTS */}
{activeTab === "upcoming" && events && (

  <div className="grid grid-cols-2 gap-3 text-sm">

    {events
      .filter((event) => event.name !== "Maha Shivratri")
      .slice(0, 6)
      .map((event) => {

        const isEkadashi = event.slug.includes("ekadashi");

        return (
          <div
            key={event.slug}
            className="bg-[#1a1740] px-4 py-4 rounded-xl border border-purple-800 text-center flex flex-col gap-2"
          >

            {/* Date */}
            <div className="text-xs text-purple-400">
              {formatDate(event.date)}
            </div>

            {/* Panchang style sentence */}
            <div className="text-white text-sm leading-relaxed">
              ✨ The upcoming festival is{" "}
              <span className="font-semibold">
                {event.name}{isEkadashi ? " Ekadashi" : ""}
              </span>.
            </div>

            {/* Link only for Ekadashi */}
            {isEkadashi && (
              <Link
                href={`/ekadashi/${event.slug.replace(/^ekadashi\//, "").replace(/-?ekadashi$/, "")}-ekadashi`}
                className="text-green-400 text-xs hover:underline"
              >
                Know Details →
              </Link>
            )}

          </div>
        );
      })}

  </div>

)}

        {/* TODAY / TOMORROW PANCHANG */}
{activeTab !== "upcoming" && (

  <div className="space-y-4 text-center">

    <ul className="space-y-3 text-sm md:text-base text-gray-200 leading-relaxed">

      <li>
        🌙 The Month is <span className="font-semibold">{p.month_name.name}</span> and the
        Tithi is <span className="font-semibold">{p.tithi.name}</span>.
      </li>

      <li>
        🌗 The Moon is in its dark phase, so the Paksha is{" "}
        <span className="font-semibold">{p.tithi.paksha}</span>.
      </li>

      <li>
        ✨ The Nakshatra is <span className="font-semibold">{p.nakshatra.name}</span>{" "}
        (Pada {p.nakshatra.pada}).
      </li>

      <li>
        🔮 Today’s Yoga is <span className="font-semibold">{p.yoga.name}</span> and
        the Karan is <span className="font-semibold">{p.karan.name}</span>.
      </li>

    </ul>

    <ul className="space-y-3 text-sm md:text-base text-gray-200 leading-relaxed">

      <li>
        🕉 Abhijit Muhurta:{" "}
        <span className="font-semibold">
          {p.abhijit_muhurta.start} – {p.abhijit_muhurta.end}
        </span>
      </li>

      <li>
        ⏳ Rahu Kaal:{" "}
        <span className="font-semibold">
          {p.rahu_kaal.start} – {p.rahu_kaal.end}
        </span>
      </li>

    </ul>

    {/* CTA */}
    <div className="mt-8 pt-4 border-t border-purple-800">

      <a
        href="/panchang"
        className="inline-block px-5 py-2 text-sm font-medium
        bg-purple-600 hover:bg-purple-500
        rounded-full transition"
      >
        View Detailed Panchang →
      </a>

    </div>

  </div>

)}

      </div>

    </div>
  );
}