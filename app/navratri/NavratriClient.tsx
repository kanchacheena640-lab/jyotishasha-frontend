"use client"

import { useState } from "react"
import { fetchNavratri } from "@/lib/fetchNavratri"
import type { NavratriResponse, NavratriDay } from "@/lib/fetchNavratri"

interface Props {
  initialYear: number
  initialData: NavratriResponse
}

export default function NavratriClient({
  initialYear,
  initialData,
}: Props) {

const formatDate = (dateString?: string) => {
  if (!dateString) return ""
  const [year, month, day] = dateString.split("-")
  return `${day}-${month}-${year}`
}

  const baseYear = initialYear

  const [year, setYear] = useState<number>(initialYear)
  const [navType, setNavType] = useState<"chaitra" | "shardiya">(
    initialData.type === "shardiya" ? "shardiya" : "chaitra"
  )
  const [data, setData] = useState<NavratriResponse>(initialData)
  const [loading, setLoading] = useState(false)

  async function updateData(newYear: number, newType: "chaitra" | "shardiya") {
    try {
      setLoading(true)
      const res = await fetchNavratri({ year: newYear, type: newType })
      setData(res)
    } catch (err) {
      console.error("Navratri update error:", err)
    } finally {
      setLoading(false)
    }
  }

  function handleYearChange(newYear: number) {
    setYear(newYear)
    updateData(newYear, navType)
  }

  function handleTypeChange(type: "chaitra" | "shardiya") {
    setNavType(type)
    updateData(year, type)
  }

  const getMataImage = (name: string) =>
    `/images/navratri/${name.toLowerCase().replace(/\s+/g, "-")}.webp`

  return (
    <>
      {/* Year Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        {[baseYear, baseYear + 1, baseYear + 2].map((y) => (
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

      {/* 🔥 MASTER DYNAMIC PARAGRAPH */}
        <p className="mt-2 mb-10 text-gray-700 max-w-4xl mx-auto text-center leading-relaxed">
          Navratri {data.year} begins on{" "}
          {formatDate(data.start_date)}{" "}
          and concludes on{" "}
          {formatDate(data.end_date)}, spanning{" "}
          {data.total_days} sacred days dedicated to Maa Durga.{" "}
          Kalash Sthapana will be performed on{" "}
          {formatDate(data.kalash_sthapana?.date)}{" "}
          during the auspicious Abhijit Muhurat of{" "}
          {data.kalash_sthapana?.abhijit_muhurta
            ? `${data.kalash_sthapana.abhijit_muhurta.start} - ${data.kalash_sthapana.abhijit_muhurta.end}`
            : ""}.
        </p>

      {loading && (
        <p className="text-center text-gray-500 mb-6">Loading...</p>
      )}

      {/* 9 Devi Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data.days.map((day: NavratriDay) => (
          <div
            key={day.day_number}
            className="bg-gradient-to-b from-[#FFF7ED] to-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden border border-[#F3E5D8]"
          >
            {/* Image */}
            <img
              src={getMataImage(day.mata_name)}
              alt={day.mata_name}
              className="w-full h-44 object-cover"
              loading="lazy"
            />

            <div className="p-5">
              {/* Heading */}
              <h3 className="text-lg font-bold text-[#7A1C1C] mb-1">
                Day {day.day_number} – {day.mata_name}
              </h3>

              {/* Date */}
              <p className="text-sm text-gray-600 mb-2">
                {formatDate(day.date)}
              </p>

              {/* Subtle Tithi Info */}
              <p className="text-xs text-gray-400 mb-3">
                {day.tithi_window.name} ({day.tithi_window.paksha})
              </p>

              {/* Link */}
              <a
                href={`/navratri/maa-${day.mata_name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="inline-block text-sm font-medium text-[#B91C1C] hover:underline"
              >
                Explore →
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}