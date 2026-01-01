"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MangalDoshPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace("/love");
      return;
    }

    const parsed = JSON.parse(s);
    setData(parsed?.data?.mangal_dosh);
  }, [router]);

  if (!data) {
    return <div className="p-6 text-center">Loading Mangal Dosh…</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">
        🔥 Mangal Dosh Analysis
      </h1>

      <p className="text-gray-700">{data.summary}</p>

      <div
        className={`rounded-xl p-4 text-white font-semibold ${
          data.signal === "GREEN"
            ? "bg-green-600"
            : data.signal === "RED"
            ? "bg-red-600"
            : "bg-gray-600"
        }`}
      >
        Overall Signal: {data.signal}
      </div>

      {/* BOY */}
      {data.boy && (
        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold text-lg">Boy’s Chart</h2>
          <p>{data.boy.status?.is_mangalic}</p>
          <ul className="list-disc pl-5 text-sm">
            {data.boy.summary_block?.points?.map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}

      {/* GIRL */}
      {data.girl && (
        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold text-lg">Girl’s Chart</h2>
          <p>{data.girl.status?.is_mangalic}</p>
          <ul className="list-disc pl-5 text-sm">
            {data.girl.summary_block?.points?.map((p: string, i: number) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
