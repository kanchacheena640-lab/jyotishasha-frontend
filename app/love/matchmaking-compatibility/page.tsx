"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function MatchmakingCompatibilityPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const payload = sessionStorage.getItem("love_payload");
    if (!payload) {
      router.replace("/love");
      return;
    }

    const run = async () => {
      const res = await fetch(`${BACKEND}/api/love/report`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      });

      const json = await res.json();
      setData(json?.data);
      setLoading(false);
    };

    run();
  }, [router]);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading detailed analysis…</div>;
  }

  const verdict = data.verdict;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🧿 Matchmaking Compatibility
        </h1>
        <p className="text-gray-600">
          Complete Vedic Ashtakoot analysis
        </p>
      </div>

      {/* TOP SCORE */}
      <div className="rounded-2xl border bg-indigo-50 p-5">
        <h2 className="text-lg font-semibold text-indigo-800">
          Ashtakoot Score
        </h2>
        <p className="text-3xl font-bold mt-2 text-indigo-700">
          {verdict.score}/{verdict.max_score}
        </p>
        <p className="mt-2 text-gray-700">
          {verdict.reason_line}
        </p>
      </div>

      {/* KOOTA NOTES */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Koota-wise Breakdown
        </h2>

        {data.sections
          .find((s: any) => s.id === "koota_notes")
          ?.data?.koota_notes?.map((k: any) => (
            <div
              key={k.key}
              className="rounded-xl border p-4 bg-white"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold capitalize">
                  {k.key.replace("_", " ")}
                </h3>
                <span className="text-sm font-medium">
                  {k.score}/{k.max}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {k.note}
              </p>
            </div>
          ))}
      </div>

      {/* FLOW */}
      {data.sections.find((s: any) => s.id === "love_to_marriage_flow") && (
        <div className="rounded-2xl bg-purple-50 p-5">
          <h2 className="text-lg font-semibold text-purple-800">
            Love → Marriage Flow
          </h2>
          <p className="mt-2 text-gray-700">
            {
              data.sections.find(
                (s: any) => s.id === "love_to_marriage_flow"
              )?.data?.flow?.line
            }
          </p>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="text-xs text-gray-500">
        This analysis is based on Vedic astrology principles and
        should be treated as guidance, not absolute prediction.
      </div>
    </div>
  );
}
