"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function MangalDoshPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [lang, setLang] = useState<"en" | "hi">("en");

  useEffect(() => {
    const s = sessionStorage.getItem("love_summary");
    if (!s) {
      router.replace("/love");
      return;
    }

    const parsed = JSON.parse(s);
    setLang(parsed?.data?.language === "hi" ? "hi" : "en");
    setData(parsed?.data?.mangal_dosh);
  }, [router]);

  if (!data) {
    return (
      <div className="p-6 text-center">
        {lang === "hi" ? "मंगल दोष लोड हो रहा है…" : "Loading Mangal Dosh…"}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white">
      <h1 className="text-3xl font-bold text-gray-900">
        🔥 {lang === "hi" ? "मंगल दोष विश्लेषण" : "Mangal Dosh Analysis"}
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
        {lang === "hi" ? "कुल संकेत" : "Overall Signal"}: {data.signal}
      </div>

      {/* BOY */}
      {data.boy && (
        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold text-lg">
            {lang === "hi" ? "लड़के की कुंडली" : "Boy’s Chart"}
          </h2>
          <p>{data.boy.status?.is_mangalic}</p>
          <ul className="list-disc pl-5 text-sm">
            {data.boy.summary_block?.points?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )}
          </ul>
        </div>
      )}

      {/* GIRL */}
      {data.girl && (
        <div className="rounded-xl border p-4 space-y-2">
          <h2 className="font-semibold text-lg">
            {lang === "hi" ? "लड़की की कुंडली" : "Girl’s Chart"}
          </h2>
          <p>{data.girl.status?.is_mangalic}</p>
          <ul className="list-disc pl-5 text-sm">
            {data.girl.summary_block?.points?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
