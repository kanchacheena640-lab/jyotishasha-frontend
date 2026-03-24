"use client";

import { getDignity } from "@/lib/astro/dignity";

interface Props {
  data: any;
  isHi: boolean;
  lagnaRashi: number;
}

export default function PlanetDataTable({ data, isHi, lagnaRashi }: Props) {
  const signNames = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];
  const signHiMap: any = { Aries: "मेष", Taurus: "वृषभ", Gemini: "मिथुन", Cancer: "कर्क", Leo: "सिंह", Virgo: "कन्या", Libra: "तुला", Scorpio: "वृश्चिक", Sagittarius: "धनु", Capricorn: "मकर", Aquarius: "कुंभ", Pisces: "मीन" };

  const formatDeg = (val: any) => {
    const num = parseFloat(val);
    if (isNaN(num)) return "—";
    const deg = Math.floor(num);
    const min = Math.round((num - deg) * 60);
    return `${deg}° ${String(min).padStart(2, "0")}′`;
  };

  return (
    <div className="mt-12 w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-lg">
      <table className="w-full min-w-[600px] text-sm text-gray-900">
        <thead className="bg-gray-100 uppercase text-[13px]">
          <tr>
            <th className="px-5 py-3 text-left">{isHi ? "भाव" : "House"}</th>
            <th className="px-5 py-3 text-left">{isHi ? "राशि" : "Sign"}</th>
            <th className="px-5 py-3 text-left">{isHi ? "ग्रह" : "Planet(s)"}</th>
            <th className="px-5 py-3 text-left">{isHi ? "डिग्री" : "Degree"}</th>
            <th className="px-5 py-3 text-left">{isHi ? "नक्षत्र (पद)" : "Nakshatra (Pada)"}</th>
          </tr>
        </thead>
        <tbody>
          {data.houses_overview.map((house: any, idx: number) => (
            <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50 border-t border-gray-100"}>
              <td className="px-5 py-3 font-bold">{isHi ? `${house.house} भाव` : house.house}</td>
              <td className="px-5 py-3">
                {isHi ? (signHiMap[signNames[(lagnaRashi - 1 + (house.house - 1)) % 12]]) : signNames[(lagnaRashi - 1 + (house.house - 1)) % 12]}
              </td>
              <td className="px-5 py-3">
                {house.notable_placements?.map((p: any, i: number) => (
                  <div key={i} className="font-medium text-indigo-700">
                    {isHi ? (p.planet_hi || p.planet) : p.planet} 
                    <span className="text-[10px] ml-1 opacity-70">
                        {getDignity(p.planet, p.sign, p.degree).status === "Exalted" ? "(E)" : ""}
                    </span>
                  </div>
                ))}
              </td>
              <td className="px-5 py-3">{house.notable_placements?.map((p: any) => formatDeg(p.degree)).join(", ") || "—"}</td>
              <td className="px-5 py-3">
                {house.notable_placements?.map((p: any) => `${isHi ? (p.nakshatra_hi || p.nakshatra) : p.nakshatra} (${p.pada})`).join(", ") || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}