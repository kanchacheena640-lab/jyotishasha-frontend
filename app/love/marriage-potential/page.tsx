"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MarriagePotentialDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const tools = sessionStorage.getItem("love_tools");
    if (!tools) {
      router.replace("/love");
      return;
    }

    const parsed = JSON.parse(tools);
    setData(parsed?.marriage_potential);
  }, [router]);

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading marriage potential…
      </div>
    );
  }

  const user = data.user_result;
  const partner = data.partner_result;

  const bandColor = (band: string) => {
    if (band === "High" || band === "Positive") return "text-green-700";
    if (band === "Low" || band === "Negative") return "text-red-700";
    return "text-gray-700";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HEADER */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          💍 Marriage Potential
        </h1>
        <p className="text-gray-600">
          Long-term marriage outlook based on Vedic astrology
        </p>
      </div>

      {/* SCORES */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-emerald-50 p-6 text-center">
          <h2 className="font-semibold text-gray-900">{user.name}</h2>
          <p className="text-5xl font-extrabold text-gray-900">
            {user.pct}%
          </p>
          <p className={bandColor(user.band)}>{user.band}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-6 text-center">
          <h2 className="font-semibold text-gray-900">{partner.name}</h2>
          <p className="text-5xl font-extrabold text-gray-900">
            {partner.pct}%
          </p>
          <p className={bandColor(partner.band)}>{partner.band}</p>
        </div>
      </div>

      {/* OVERALL */}
      <div className="rounded-2xl bg-purple-50 p-6">
        <h2 className="font-semibold text-gray-900">
          Overall Interpretation
        </h2>
        <p className="mt-2 text-gray-800">{data.overall_line}</p>
      </div>

      {/* REASONS */}
      <div className="space-y-3">
        {user.reasons?.map((r: string, i: number) => (
          <div
            key={i}
            className="bg-gray-50 p-4 rounded-xl text-gray-800"
          >
            {r}
          </div>
        ))}
      </div>

      {/* PREMIUM REPORT HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>🔮</span>
          <span>Relationship Future Report</span>
        </h2>

        <p className="text-purple-100 leading-relaxed">
          Complete Love → Marriage Vedic analysis with clear verdict,
          risks, remedies & future direction.
        </p>

        <div className="flex items-center gap-3">
          <span className="line-through text-purple-200">₹399</span>
          <span className="text-3xl font-extrabold">₹199</span>
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
            Early Bird
          </span>
        </div>

        <button
          onClick={() =>
            router.push("/love/report/relationship_future_report")
          }
          className="w-full mt-4 bg-white text-purple-700 font-semibold py-3 rounded-xl"
        >
          Unlock Full Relationship Report
        </button>
      </div>
    </div>
  );
}
