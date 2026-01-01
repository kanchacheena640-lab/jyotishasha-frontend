"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function LoveResultSummaryPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<any>(null);
  const [payload, setPayload] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    const p = sessionStorage.getItem("love_payload");

    if (!s || !p) {
      router.replace("/love");
      return;
    }

    setSummary(JSON.parse(s));
    setPayload(JSON.parse(p));
    setLoading(false);
  }, [router]);

  if (loading || !summary) {
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
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Matchmaking Result Summary
      </h1>

      {/* MATCHMAKING COMPATIBILITY */}
      <div
        onClick={() => go("/love/matchmaking-compatibility")}
        className="cursor-pointer border rounded p-4 hover:shadow"
      >
        <h2 className="font-medium">Matchmaking Compatibility</h2>
        <p className="text-lg mt-2">
          {score} / {maxScore}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Tap to view full Ashtakoot details
        </p>
      </div>

      {/* TRUTH OR DARE */}
      <div
        onClick={() => go("/love/truth-or-dare")}
        className="cursor-pointer border rounded p-4 hover:shadow"
      >
        <h2 className="font-medium">Truth or Dare</h2>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded text-white text-sm ${
            summary?.truth_or_dare?.verdict === "TRUTH"
              ? "bg-green-600"
              : "bg-red-600"
          }`}
        >
          {summary?.truth_or_dare?.verdict || "DARE"}
        </span>
        <p className="text-sm text-gray-500 mt-2">
          Tap to view detailed relationship signals
        </p>
      </div>

      {/* MARRIAGE POTENTIAL */}
      <div
        onClick={() => go("/love/marriage-potential")}
        className="cursor-pointer border rounded p-4 hover:shadow"
      >
        <h2 className="font-medium">Marriage Potential</h2>
        <span
          className={`inline-block mt-2 px-3 py-1 rounded text-white text-sm ${
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
        <p className="text-sm text-gray-500 mt-2">
          Tap to view marriage probability breakdown
        </p>
      </div>

      {/* PREMIUM REPORT CTA */}
      <div className="border rounded p-5 bg-purple-50">
        <h2 className="text-lg font-semibold">
          Relationship Future Report
        </h2>
        <p className="text-sm text-gray-700 mt-1">
          Complete Love → Marriage analysis (PDF on Email)
        </p>

        <p className="mt-3">
          <span className="line-through text-gray-500 mr-2">₹399</span>
          <span className="text-xl font-bold text-purple-700">
            ₹199 (Early Bird)
          </span>
        </p>

        <button
          onClick={() => router.push("/checkout/relationship_future_report")}
          className="mt-4 bg-purple-600 text-white px-6 py-2 rounded"
        >
          Unlock Full Report
        </button>
      </div>
    </div>
  );
}
