"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function MatchmakingCompatibilityPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace("/love");
      return;
    }

    const parsed = JSON.parse(s);
    setData(parsed?.data);
  }, [router]);

  // 🔒 IMPORTANT FIX: no loading screen, no backend call
  if (!data) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading compatibility…
      </div>
    );
  }

  const verdict = data.verdict;
  const kootaNotes =
    data.sections?.find((s: any) => s.id === "koota_notes")?.data
      ?.koota_notes || [];

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🧿 Matchmaking Compatibility
        </h1>
        <p className="text-gray-600">
          Complete Vedic Ashtakoot analysis for marriage compatibility
        </p>
      </div>

      {/* TOP SCORE */}
      <div className="rounded-3xl border border-indigo-200 bg-indigo-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-indigo-900">
          Ashtakoot Score
        </h2>
        <p className="text-5xl font-extrabold mt-3 text-indigo-800">
          {verdict.score}/{verdict.max_score}
        </p>
        <p className="mt-4 text-gray-800 leading-relaxed">
          {verdict.reason_line}
        </p>
      </div>

      {/* KOOTA NOTES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Koota-wise Breakdown
        </h2>

        {kootaNotes.map((k: any) => (
          <div
            key={k.key}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold capitalize text-gray-900">
                {k.key.replace("_", " ")}
              </h3>
              <span className="text-sm font-semibold text-gray-700">
                {k.score}/{k.max}
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-2">
              {k.note}
            </p>
          </div>
        ))}
      </div>

      {/* LOVE → MARRIAGE FLOW */}
      {data.sections?.find((s: any) => s.id === "love_to_marriage_flow") && (
        <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
          <h2 className="text-lg font-semibold text-purple-900">
            Love → Marriage Flow
          </h2>
          <p className="mt-3 text-gray-800">
            {
              data.sections.find(
                (s: any) => s.id === "love_to_marriage_flow"
              )?.data?.flow?.line
            }
          </p>
        </div>
      )}

      {/* PREMIUM REPORT CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>

        <p className="text-purple-100">
          Want clarity beyond just score? Get a complete Love → Marriage
          report with verdict, dosha impact, remedies and future direction.
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
          className="w-full bg-white text-purple-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Unlock Full Relationship Report
        </button>
      </div>
     

      {/* DISCLAIMER */}
      <div className="text-xs text-gray-500 border-t pt-4">
        This analysis is based on classical Vedic astrology principles.
        It is meant for guidance, not absolute certainty.
      </div>
    </div>
  );
}
