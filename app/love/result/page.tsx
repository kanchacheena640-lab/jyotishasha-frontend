"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoveResultSummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    const p = sessionStorage.getItem("love_payload");

    if (!s || !p) {
      router.replace("/love");
      return;
    }

    setSummary(JSON.parse(s));
    setPayload(JSON.parse(p));
  }, [router]);

  if (!summary) {
    return <div className="p-6 text-center">Loading result…</div>;
  }

  const ashtakoot = summary?.data?.ashtakoot;
  const score = ashtakoot?.total_score;
  const maxScore = ashtakoot?.max_score;

  const go = (path: string) => {
    sessionStorage.setItem("love_payload", JSON.stringify(payload));
    router.push(path);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          💑 Matchmaking Result
        </h1>
        <p className="text-gray-600">
          Summary of your Vedic compatibility analysis
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="space-y-4">

        {/* COMPATIBILITY */}
        <div
          onClick={() => go("/love/matchmaking-compatibility")}
          className="cursor-pointer rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 to-white p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-indigo-800">
                🧿 Matchmaking Compatibility
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Ashtakoot score overview
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-700">
                {score}/{maxScore}
              </p>
              <p className="text-xs text-gray-500">Tap to view</p>
            </div>
          </div>
        </div>

        {/* TRUTH OR DARE */}
        <div
          onClick={() => go("/love/truth-or-dare")}
          className="cursor-pointer rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-white p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-rose-800">
                🔥 Truth or Dare
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Relationship risk signal
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                summary?.truth_or_dare?.verdict === "TRUTH"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {summary?.truth_or_dare?.verdict || "DARE"}
            </span>
          </div>
        </div>

        {/* MARRIAGE POTENTIAL */}
        <div
          onClick={() => go("/love/marriage-potential")}
          className="cursor-pointer rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-5 shadow-sm hover:shadow-md transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-emerald-800">
                💍 Marriage Potential
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Long-term marriage outlook
              </p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-white font-semibold ${
                summary?.marriage_potential?.band === "High" ||
                summary?.marriage_potential?.band === "Positive"
                  ? "bg-green-600"
                  : summary?.marriage_potential?.band === "Low" ||
                    summary?.marriage_potential?.band === "Negative"
                  ? "bg-red-600"
                  : "bg-gray-500"
              }`}
            >
              {summary?.marriage_potential?.band || "Medium"}
            </span>
          </div>
        </div>
      </div>

      {/* PREMIUM REPORT — HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-6 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>

        <p className="text-purple-100">
          Complete Love → Marriage Vedic analysis with clear verdict,
          risks, remedies & future direction.
        </p>

        <ul className="text-sm text-purple-100 space-y-1">
          <li>✔ Dosha impact & cancellations</li>
          <li>✔ Love vs Marriage direction</li>
          <li>✔ Practical remedies & guidance</li>
        </ul>

        <div className="flex items-center gap-3">
          <span className="line-through text-purple-200">₹399</span>
          <span className="text-3xl font-extrabold">₹199</span>
          <span className="bg-yellow-400 text-black text-xs px-2 py-1 rounded-full">
            Early Bird
          </span>
        </div>

        <button
          onClick={() =>
            router.push("/checkout/relationship_future_report")
          }
          className="w-full bg-white text-purple-700 font-semibold py-3 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Unlock Full Report
        </button>

        <p className="text-xs text-purple-200 text-center">
          Secure payment • PDF delivered on email
        </p>
      </div>
    </div>
  );
}
