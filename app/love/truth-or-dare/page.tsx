"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function TruthOrDareDetailPage() {
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
      const res = await fetch(`${BACKEND}/api/love/truth-or-dare`, {
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
    return <div className="p-6 text-center">Loading analysis…</div>;
  }

  const isTruth = data.verdict === "TRUTH";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          🔥 Truth or Dare
        </h1>
        <p className="text-gray-600">
          Relationship reality check based on kundali
        </p>
      </div>

      {/* VERDICT */}
      <div
        className={`rounded-3xl p-6 text-white shadow-lg ${
          isTruth
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        }`}
      >
        <h2 className="text-xl font-semibold">Final Verdict</h2>
        <p className="text-4xl font-extrabold mt-2">
          {data.verdict}
        </p>
        <p className="mt-3 text-white/90">
          {data.verdict_line}
        </p>
      </div>

      {/* BLOCKS */}
      <div className="space-y-4">
        {data.blocks?.map((block: any) => (
          <div
            key={block.id}
            className="rounded-xl border p-4 bg-white shadow-sm"
          >
            <h3 className="font-semibold text-gray-900">
              {block.title}
            </h3>
            <p className="text-gray-700 mt-1">
              {block.text}
            </p>
          </div>
        ))}
      </div>

      {/* CONFIDENCE */}
      {data.confidence && (
        <div className="text-sm text-gray-600">
          Confidence level:{" "}
          <span className="font-semibold capitalize">
            {data.confidence}
          </span>
        </div>
      )}

      {/* DISCLAIMER */}
      <div className="text-xs text-gray-500 border-t pt-4">
        This tool highlights emotional and commitment risks using
        Vedic astrology indicators. Use it as guidance, not fear.
      </div>
    </div>
  );
}
