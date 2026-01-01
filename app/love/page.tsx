"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://jyotishasha-backend.onrender.com";

export default function LoveFormPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    language: "en",

    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
  });

  const update = (section: "boy" | "girl", field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
  };

  const submit = async () => {
    setLoading(true);

    const payload = {
      language: form.language,
      boy_is_user: true,

      user: { ...form.boy },
      partner: { ...form.girl },
    };

    const res = await fetch(
      `${BACKEND}/api/relationship/premium/analyze`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();
    sessionStorage.setItem("love_payload", JSON.stringify(payload));
    sessionStorage.setItem("love_summary", JSON.stringify(data));

    router.push("/love/result");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-gray-900">
        💍 Vedic Matchmaking Compatibility
      </h1>

      {/* BOY CARD */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 space-y-4">
        <h2 className="text-lg font-semibold text-blue-800 flex items-center gap-2">
          👨 Boy Details
        </h2>

        <input
          className={inputClass}
          placeholder="Boy Name"
          value={form.boy.name}
          onChange={(e) => update("boy", "name", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className={inputClass}
            value={form.boy.dob}
            onChange={(e) => update("boy", "dob", e.target.value)}
          />
          <input
            type="time"
            className={inputClass}
            value={form.boy.tob}
            onChange={(e) => update("boy", "tob", e.target.value)}
          />
        </div>

        <PlaceAutocompleteInput
          value={form.boy.pob}
          onChange={(val) => update("boy", "pob", val)}
          onPlaceSelected={(place) => {
            update("boy", "pob", place.name);
            update("boy", "lat", place.lat);
            update("boy", "lng", place.lng);
          }}
        />
      </div>

      {/* GIRL CARD */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-5 space-y-4">
        <h2 className="text-lg font-semibold text-pink-800 flex items-center gap-2">
          👩 Girl Details
        </h2>

        <input
          className={inputClass}
          placeholder="Girl Name"
          value={form.girl.name}
          onChange={(e) => update("girl", "name", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            className={inputClass}
            value={form.girl.dob}
            onChange={(e) => update("girl", "dob", e.target.value)}
          />
          <input
            type="time"
            className={inputClass}
            value={form.girl.tob}
            onChange={(e) => update("girl", "tob", e.target.value)}
          />
        </div>

        <PlaceAutocompleteInput
          value={form.girl.pob}
          onChange={(val) => update("girl", "pob", val)}
          onPlaceSelected={(place) => {
            update("girl", "pob", place.name);
            update("girl", "lat", place.lat);
            update("girl", "lng", place.lng);
          }}
        />
      </div>

      {/* SUBMIT */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg hover:opacity-95"
      >
        {loading ? "Analyzing Matchmaking…" : "Check Matchmaking"}
      </button>
    </div>
  );
}
