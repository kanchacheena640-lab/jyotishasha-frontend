"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function MarriagePotentialDetailPage() {
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
      } catch {
        router.replace("/love");
      }
    };

    run();
  }, [router]);

  if (!data) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading marriage potential…
      </div>
    );
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
      <div className="text-center">
        <h1 className="text-3xl font-bold">💍 Marriage Potential</h1>
        <p className="text-gray-600">
          Long-term marriage outlook based on Vedic astrology
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="rounded-2xl bg-emerald-50 p-6 text-center">
          <h2 className="font-semibold">{user.name}</h2>
          <p className="text-5xl font-extrabold">{user.pct}%</p>
          <p className={bandColor(user.band)}>{user.band}</p>
        </div>

        <div className="rounded-2xl bg-blue-50 p-6 text-center">
          <h2 className="font-semibold">{partner.name}</h2>
          <p className="text-5xl font-extrabold">{partner.pct}%</p>
          <p className={bandColor(partner.band)}>{partner.band}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-purple-50 p-6">
        <h2 className="font-semibold">Overall Interpretation</h2>
        <p className="mt-2">{data.overall_line}</p>
      </div>

      <div className="space-y-3">
        {user.reasons?.map((r: string, i: number) => (
          <div key={i} className="bg-gray-50 p-4 rounded-xl">
            {r}
          </div>
        ))}
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white">
        <h2 className="text-2xl font-bold">
          🔮 Relationship Future Report
        </h2>
        <p className="text-purple-100 mt-2">
          Full Love → Marriage report with remedies & clear direction.
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
