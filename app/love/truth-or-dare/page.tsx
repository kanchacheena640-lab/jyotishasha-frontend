"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TruthOrDareDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace("/love");
      return;
    }

    const parsed = JSON.parse(s);
    setData(parsed?.truth_or_dare || parsed?.data?.truth_or_dare);
  }, [router]);

  // 🔒 IMPORTANT FIX: no loading screen
  if (!data) {
    router.replace("/love");
    return null;
  }

  const isTruth = data.verdict === "TRUTH";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🔥 Truth or Dare
        </h1>
        <p className="text-gray-600">
          Relationship reality check based on Vedic kundali indicators
        </p>
      </div>

      {/* VERDICT */}
      <div
        className={`rounded-3xl p-7 text-white shadow-xl text-center ${
          isTruth
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        }`}
      >
        <h2 className="text-lg font-semibold tracking-wide">
          Final Verdict
        </h2>
        <p className="text-5xl font-extrabold mt-3">
          {data.verdict}
        </p>
        <p className="mt-4 text-white/90 leading-relaxed">
          {data.verdict_line}
        </p>
      </div>

      {/* ANALYSIS BLOCKS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          What this means for your relationship
        </h2>

        {data.blocks?.map((block: any) => (
          <div
            key={block.id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
          >
            <h3 className="font-semibold text-gray-900">
              {block.title}
            </h3>
            <p className="text-gray-800 mt-2 leading-relaxed">
              {block.text}
            </p>
          </div>
        ))}
      </div>

      {/* CONFIDENCE */}
      {data.confidence && (
        <div className="text-sm text-gray-700">
          Confidence level:{" "}
          <span className="font-semibold capitalize">
            {data.confidence}
          </span>
        </div>
      )}

      {/* PREMIUM REPORT CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>

        <p className="text-purple-100">
          Truth or Dare shows the signal.  
          This report explains <b>why</b> it is happening and
          <b> what to do next</b>.
        </p>

        <ul className="text-sm text-purple-100 space-y-1">
          <li>✔ Root cause of emotional risk or strength</li>
          <li>✔ Love → Marriage direction clarity</li>
          <li>✔ Remedies to stabilize or protect relationship</li>
        </ul>

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

        <p className="text-xs text-purple-200 text-center">
          Secure payment • PDF delivered on email
        </p>
      </div>

      {/* DISCLAIMER */}
      <div className="text-xs text-gray-500 border-t pt-4">
        This tool highlights emotional and commitment risks using
        Vedic astrology indicators. It is guidance, not fear-based
        prediction.
      </div>
    </div>
  );
}
