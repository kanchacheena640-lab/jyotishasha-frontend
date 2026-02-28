"use client"

import { useState } from "react"
import { fetchNavratri } from "../../lib/fetchNavratri"
import type { NavratriResponse, NavratriDay } from "../../lib/fetchNavratri"

interface Props {
  initialYear: number
  initialData: NavratriResponse
}

export default function NavratriClient({
  initialYear,
  initialData,
}: Props) {

  const [year, setYear] = useState<number>(initialYear)
  const [navType, setNavType] = useState<"chaitra" | "shardiya">(initialData.type)
  const [data, setData] = useState<NavratriResponse>(initialData)

  async function updateData(newYear: number, newType: "chaitra" | "shardiya") {
    const res = await fetchNavratri({ year: newYear, type: newType })
    setData(res)
  }

  function handleYearChange(newYear: number) {
    setYear(newYear)
    updateData(newYear, navType)
  }

  function handleTypeChange(type: "chaitra" | "shardiya") {
    setNavType(type)
    updateData(year, type)
  }

  return (
    <>
      {/* Year Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        {[year, year + 1, year + 2].map((y) => (
          <button
            key={y}
            onClick={() => handleYearChange(y)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition
              ${y === year
                ? "bg-[#7A1C1C] text-white"
                : "bg-white border-[#7A1C1C] text-[#7A1C1C] hover:bg-[#FDE8D7]"}
            `}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Navratri Type Toggle */}
      <div className="flex justify-center gap-6 mb-12">
        <button
          onClick={() => handleTypeChange("chaitra")}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition
            ${navType === "chaitra"
              ? "bg-[#B91C1C] text-white shadow-md"
              : "bg-white border border-[#B91C1C] text-[#B91C1C] hover:bg-[#FDE8D7]"}
          `}
        >
          Chaitra Navratri
        </button>

        <button
          onClick={() => handleTypeChange("shardiya")}
          className={`px-8 py-3 rounded-lg text-lg font-semibold transition
            ${navType === "shardiya"
              ? "bg-[#C58F00] text-white shadow-md"
              : "bg-white border border-[#C58F00] text-[#C58F00] hover:bg-[#FFF3D6]"}
          `}
        >
          Shardiya Navratri
        </button>
      </div>

      {/* 9 Devi Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.days.map((day: NavratriDay) => (
          <div
            key={day.day_number}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition p-6 border border-[#F3E5D8]"
          >
            <h3 className="text-xl font-semibold text-[#7A1C1C] mb-2">
              {day.mata_name}
            </h3>

            <p className="text-sm text-gray-600 mb-1">
              {day.date}
            </p>

            <p className="text-sm text-gray-500 mb-4">
              Tithi: {day.tithi}
            </p>

            <a
              href={`/navratri/maa-${day.mata_name
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="inline-block text-sm font-medium text-[#B91C1C] hover:underline"
            >
              Explore →
            </a>
          </div>
        ))}
      </div>
    </>
  )
}