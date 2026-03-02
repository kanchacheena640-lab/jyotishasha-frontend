"use client"

import { useState } from "react"
import { fetchNavratri } from "@/lib/fetchNavratri"
import type { NavratriResponse, NavratriDay } from "@/lib/fetchNavratri"
import { NAVDURGA_LIST } from "@/lib/navratri"

interface Props {
  mata: any
  initialYear: number
  initialData: NavratriResponse
}

export default function NavdurgaDetailClient({
  mata,
  initialYear,
  initialData,
}: Props) {

  const formatDate = (dateString?: string) => {
    if (!dateString) return ""
    const [year, month, day] = dateString.split("-")
    return `${day}-${month}-${year}`
  }

  const goddessName = mata.en.title
    .split(":")[0]       // "Maa Brahmacharini"
    .replace("Maa ", "")
    
  const baseYear = initialYear

  const [year, setYear] = useState(initialYear)
  const [navType, setNavType] = useState<"chaitra" | "shardiya">(
    initialData.type === "shardiya" ? "shardiya" : "chaitra"
  )
  const [data, setData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  async function updateData(newYear: number, newType: "chaitra" | "shardiya") {
    try {
      setLoading(true)
      const res = await fetchNavratri({ year: newYear, type: newType })
      setData(res)
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

  const dayData = data.days.find(
    (d: NavratriDay) => d.day_number === mata.day
  )

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">

      {/* H1 */}
      <h1 className="text-4xl font-bold text-[#7A1C1C] mb-4 text-center">
        {mata.en.title.replace("{year}", String(year))}
      </h1>

      {/* Year Switcher */}
      <div className="flex justify-center gap-4 mb-8">
        {[baseYear, baseYear + 1, baseYear + 2].map((y) => (
          <button
            key={y}
            onClick={() => handleYearChange(y)}
            className={`px-5 py-2 rounded-full border text-sm font-medium transition
              ${y === year
                ? "bg-[#7A1C1C] text-white"
                : "bg-white border-[#7A1C1C] text-[#7A1C1C]"}`}
          >
            {y}
          </button>
        ))}
      </div>

      {/* Type Toggle */}
      <div className="flex justify-center gap-6 mb-10">
        <button
          onClick={() => handleTypeChange("chaitra")}
          className={`px-6 py-2 rounded-lg font-semibold
            ${navType === "chaitra"
              ? "bg-[#B91C1C] text-white"
              : "border border-[#B91C1C] text-[#B91C1C]"}`}
        >
          Chaitra
        </button>

        <button
          onClick={() => handleTypeChange("shardiya")}
          className={`px-6 py-2 rounded-lg font-semibold
            ${navType === "shardiya"
              ? "bg-[#C58F00] text-white"
              : "border border-[#C58F00] text-[#C58F00]"}`}
        >
          Shardiya
        </button>
      </div>

      {/* Dynamic Paragraph */}
      <p className="mt-4 mb-10 text-gray-700 max-w-4xl mx-auto text-center leading-relaxed">

        During {navType === "chaitra" ? "Chaitra" : "Shardiya"} Navratri {year}, 
        Maa {goddessName} is worshipped on {formatDate(dayData?.date)} as the divine embodiment of strength, purity and spiritual awakening.

        {/* Only Day 1 Extra Line */}
        {mata.day === 1 && data.kalash_sthapana && (
            <>
            {" "}Navratri formally begins with Kalash Sthapana on{" "}
            {formatDate(data.kalash_sthapana.date)} during the auspicious 
            Abhijit Muhurat of{" "}
            {data.kalash_sthapana.abhijit_muhurta?.start} -{" "}
            {data.kalash_sthapana.abhijit_muhurta?.end}.
            </>
        )}

        {" "}Below you will find detailed information about her mythology, 
        symbolism, mantra, puja vidhi and spiritual significance.

        </p>

      {loading && (
        <p className="text-center text-gray-500 mb-6">Loading...</p>
      )}

      {/* Image */}
      <img
        src={`/images/navratri/${mata.slug.replace("maa-", "")}.webp`}
        alt={mata.en.title}
        className="w-full rounded-xl shadow-lg mb-12"
      />

      {/* Other 8 Navdurga Links */}
        <div className="mt-6 mb-16 text-center">

        <h2 className="text-xl font-semibold text-[#7A1C1C] mb-6">
            Explore Other Forms of Maa Durga
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
            {NAVDURGA_LIST
            .filter((m) => m.slug !== mata.slug)
            .map((m) => (
                <a
                key={m.slug}
                href={`/navratri/${m.slug}`}
                className="px-4 py-2 bg-white border border-[#7A1C1C] text-[#7A1C1C] rounded-full text-sm hover:bg-[#7A1C1C] hover:text-white transition"
                >
                Day {m.day} – {m.en.title.replace("{year}", String(year))}
                </a>
            ))}
        </div>
        </div>

      {/* Static Sections */}
      {mata.en.sections.map((section: any) => (
        <div key={section.id} className="mb-10">

            <h2 className="text-2xl font-semibold text-[#7A1C1C] mb-3">
            {section.title}
            </h2>

            {section.content && (
            <p className="text-gray-700 leading-relaxed mb-4">
                {section.content
                .replace("{year}", String(year))
                .replace("{date}", formatDate(dayData?.date))
                .replace("{navType}", navType === "chaitra" ? "Chaitra" : "Shardiya")}
            </p>
            )}

            {section.list && (
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
                {section.list.map((item: string, i: number) => (
                <li key={i} className="font-medium">
                    {item}
                </li>
                ))}
            </ul>
            )}

        </div>
        ))}

    </section>
  )
}