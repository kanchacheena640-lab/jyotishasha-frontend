"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


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

  // 🔒 IMPORTANT FIX: no loading screen
  if (!data) {
    return (
      <div className="p-8 text-center text-gray-600">
        {lang === "hi" ? "मंगल दोष लोड हो रहा है…" : "Loading Mangal Dosh…"}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-6 text-white shadow-lg">
        <h1 className="text-3xl font-bold">
          🔥 {lang === "hi" ? "मंगल दोष विश्लेषण" : "Mangal Dosh Analysis"}
        </h1>
        <p className="mt-2 text-orange-100">
          {data.summary}
        </p>
      </div>

      {/* SIGNAL CARD */}
      <div
        className={`rounded-2xl p-5 text-center font-semibold shadow ${
          data.signal === "GREEN"
            ? "bg-green-100 text-green-800"
            : data.signal === "RED"
            ? "bg-red-100 text-red-800"
            : "bg-gray-200 text-gray-800"
        }`}
      >
        {lang === "hi" ? "कुल संकेत" : "Overall Signal"}:{" "}
        <span className="font-bold">{data.signal}</span>
      </div>

      {/* BOY CARD */}
      {data.boy && (
        <div className="rounded-2xl bg-white p-6 shadow space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            👨 {lang === "hi" ? "लड़के की कुंडली" : "Boy’s Chart"}
          </h2>

          <p className="text-gray-700 font-medium">
            {data.boy.status?.is_mangalic}
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {data.boy.summary_block?.points?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )}
          </ul>
        </div>
      )}

      {/* GIRL CARD */}
      {data.girl && (
        <div className="rounded-2xl bg-white p-6 shadow space-y-3">
          <h2 className="text-xl font-semibold text-gray-900">
            👩 {lang === "hi" ? "लड़की की कुंडली" : "Girl’s Chart"}
          </h2>

          <p className="text-gray-700 font-medium">
            {data.girl.status?.is_mangalic}
          </p>

          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            {data.girl.summary_block?.points?.map(
              (p: string, i: number) => (
                <li key={i}>{p}</li>
              )
            )}
          </ul>
        </div>
      )}

      {/* PREMIUM REPORT HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-7 text-white shadow-xl space-y-4">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <span>🔮</span>
          <span>Relationship Future Report</span>
        </h2>

        <p className="text-purple-100 leading-relaxed">
          Complete Love → Marriage Vedic analysis with clear verdict,
          risks, remedies & future direction.
        </p>

        <div className="flex items-center gap-3">
          <span className="line-through text-purple-200">₹399</span>
          <span className="text-3xl font-extrabold">₹199</span>
          <span className="bg-yellow-400 text-black text-xs px-3 py-1 rounded-full">
            Early Bird
          </span>
        </div>

        <button
          onClick={() =>
            router.push("/love/report/relationship_future_report")
          }
          className="w-full bg-white text-purple-700 font-semibold py-3 rounded-xl hover:bg-gray-100 transition"
        >
          Unlock Full Report
        </button>
      </div>
       {/* 🔐 EEAT TRUST */}
      <section className="mt-16">
        <EEATTrustSnippet />
      </section>
    </div>
  );
}
