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
    return <div className="p-6 text-center text-gray-700">Loading analysis…</div>;
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
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          💍 Marriage Potential
        </h1>
        <p className="text-gray-600">
          Long-term marriage outlook based on Vedic kundali indicators
        </p>
      </div>

      {/* SCORE CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* USER */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center">
          <h2 className="font-semibold text-emerald-900 text-lg">
            {user.name}
          </h2>
          <p className="text-5xl font-extrabold mt-3 text-emerald-800">
            {user.pct}%
          </p>
          <p className={`mt-2 font-semibold ${bandColor(user.band)}`}>
            {user.band}
          </p>
        </div>

        {/* PARTNER */}
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 text-center">
          <h2 className="font-semibold text-blue-900 text-lg">
            {partner.name}
          </h2>
          <p className="text-5xl font-extrabold mt-3 text-blue-800">
            {partner.pct}%
          </p>
          <p className={`mt-2 font-semibold ${bandColor(partner.band)}`}>
            {partner.band}
          </p>
        </div>
      </div>

      {/* OVERALL INTERPRETATION */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6">
        <h2 className="text-lg font-semibold text-purple-900">
          Overall Interpretation
        </h2>
        <p className="mt-3 text-gray-800 leading-relaxed">
          {data.overall_line}
        </p>
      </div>

      {/* KEY INDICATORS */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Key Marriage Indicators
        </h2>

        {user.reasons?.map((r: string, i: number) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-gray-800"
          >
            {r}
          </div>
        ))}
      </div>

      {/* PREMIUM REPORT CTA */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>

        <p className="text-purple-100">
          Want clarity beyond percentages? Get a complete Love → Marriage
          report with verdict, risks, remedies and future direction.
        </p>

        <ul className="text-sm text-purple-100 space-y-1">
          <li>✔ Marriage timing & stability insights</li>
          <li>✔ Dosha impact & cancellation analysis</li>
          <li>✔ Practical Vedic remedies</li>
        </ul>

        <div className="flex items-center gap-3">
          <span className="line-through text-purple-200">₹399</span>
          <span className="text-3xl font-extrabold">₹199</span>
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
            Early Bird Offer
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
        Marriage potential is derived from 5th–7th house linkage indicators
        and dasha sensitivity. This is guidance, not a guarantee.
      </div>
    </div>
  );
}
