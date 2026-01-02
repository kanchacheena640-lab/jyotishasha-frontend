"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function TruthOrDareDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const tools = sessionStorage.getItem("love_tools");

    if (!tools) {
      router.replace("/love");
      return;
    }

    try {
      const parsed = JSON.parse(tools);
      setData(parsed.truth_or_dare);
    } catch {
      router.replace("/love");
    }
  }, [router]);

  if (!data) {
    return (
      <div className="p-8 text-center text-gray-600">
        Loading Truth or Dare…
      </div>
    );
  }

  const isTruth = data.verdict === "TRUTH";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HEADER */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">🔥 Truth or Dare</h1>
        <p className="text-gray-600">
          Relationship reality check based on Vedic astrology
        </p>
      </div>

      {/* VERDICT */}
      <div
        className={`rounded-3xl p-7 text-center text-white shadow-xl ${
          isTruth
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        }`}
      >
        <p className="text-5xl font-extrabold">{data.verdict}</p>
        <p className="mt-4 text-white/90">{data.verdict_line}</p>
      </div>

      {/* BLOCKS */}
      <div className="space-y-4">
        {data.blocks?.map((b: any) => (
          <div
            key={b.id}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4"
          >
            <h3 className="font-semibold text-gray-900">{b.title}</h3>
            <p className="mt-2 text-gray-800">{b.text}</p>
          </div>
        ))}
      </div>

      {/* PREMIUM CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-3">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>

        <p className="text-purple-100">
          This report explains <b>why</b> this signal is appearing and
          <b> what to do next</b>.
        </p>

        <button
          onClick={() =>
            router.push("/love/report/relationship_future_report")
          }
          className="w-full bg-white text-purple-700 font-semibold py-3 rounded-xl hover:bg-gray-100"
        >
          Unlock Full Relationship Report
        </button>
      </div>
    </div>
  );
}
