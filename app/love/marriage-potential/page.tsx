"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function MarriagePotentialDetailPage() {
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
      const res = await fetch(
        `${BACKEND}/api/love/love-marriage-probability`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: payload,
        }
      );

      const json = await res.json();
      setData(json?.data);
      setLoading(false);
    };

    run();
  }, [router]);

  if (loading || !data) {
    return <div className="p-6 text-center">Loading analysis…</div>;
  }

  const user = data.user_result;
  const partner = data.partner_result;

  const bandColor = (band: string) => {
    if (band === "High" || band === "Positive") return "text-green-600";
    if (band === "Low" || band === "Negative") return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      {/* HEADER */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          💍 Marriage Potential
        </h1>
        <p className="text-gray-600">
          Long-term marriage outlook based on kundali indicators
        </p>
      </div>

      {/* PERCENTAGE CARDS */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl border p-5 bg-emerald-50">
          <h2 className="font-semibold text-emerald-800">
            {user.name}
          </h2>
          <p className="text-4xl font-bold mt-2 text-emerald-700">
            {user.pct}%
          </p>
          <p className={`mt-1 font-medium ${bandColor(user.band)}`}>
            {user.band}
          </p>
        </div>

        <div className="rounded-2xl border p-5 bg-blue-50">
          <h2 className="font-semibold text-blue-800">
            {partner.name}
          </h2>
          <p className="text-4xl font-bold mt-2 text-blue-700">
            {partner.pct}%
          </p>
          <p className={`mt-1 font-medium ${bandColor(partner.band)}`}>
            {partner.band}
          </p>
        </div>
      </div>

      {/* OVERALL */}
      <div className="rounded-2xl bg-purple-50 p-5">
        <h2 className="font-semibold text-purple-800">
          Overall Interpretation
        </h2>
        <p className="mt-2 text-gray-700">
          {data.overall_line}
        </p>
      </div>

      {/* REASONS */}
      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Key Indicators
        </h2>

        {user.reasons?.map((r: string, i: number) => (
          <div
            key={i}
            className="rounded-xl border p-4 bg-white"
          >
            {r}
          </div>
        ))}
      </div>

      {/* DISCLAIMER */}
      <div className="text-xs text-gray-500 border-t pt-4">
        Marriage potential is derived from 5th–7th house linkage
        indicators and dasha sensitivity. Treat as guidance.
      </div>
    </div>
  );
}
