"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function TruthOrDareDetailPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const payload = sessionStorage.getItem("love_payload");
    if (!payload) {
      router.replace("/love");
      return;
    }

    const run = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/love/truth-or-dare`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        });

        const json = await res.json();
        setData(json?.data);
      } catch {
        router.replace("/love");
      }
    };

    run();
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
      <div className="text-center">
        <h1 className="text-3xl font-bold">🔥 Truth or Dare</h1>
        <p className="text-gray-600">
          Relationship reality check based on Vedic astrology
        </p>
      </div>

      <div
        className={`rounded-3xl p-7 text-white text-center ${
          isTruth
            ? "bg-gradient-to-br from-green-600 to-emerald-700"
            : "bg-gradient-to-br from-red-600 to-rose-700"
        }`}
      >
        <p className="text-5xl font-extrabold">{data.verdict}</p>
        <p className="mt-4">{data.verdict_line}</p>
      </div>

      <div className="space-y-4">
        {data.blocks?.map((b: any) => (
          <div key={b.id} className="rounded-xl bg-gray-50 p-4">
            <h3 className="font-semibold">{b.title}</h3>
            <p className="mt-2 text-gray-800">{b.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white">
        <h2 className="text-2xl font-bold">🔮 Relationship Future Report</h2>
        <p className="text-purple-100 mt-2">
          This report explains why this signal is appearing and what to do next.
        </p>

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
