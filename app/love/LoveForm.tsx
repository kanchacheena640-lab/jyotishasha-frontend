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
    if (loading) return;
    setLoading(true);

     if (
        !form.boy.dob ||
        !form.girl.dob ||
        form.boy.lat === 0 ||
        form.girl.lat === 0
    ) {
        alert("Please fill birth date and select place properly");
        setLoading(false);
        return;
    }

    const payload = {
        language: form.language,
        boy_is_user: true,
        user: form.boy,
        partner: form.girl,
    };

    try {
        // 1️⃣ MAIN REPORT (Ashtakoot + Mangal Dosh)
        const reportRes = await fetch(`${BACKEND}/api/love/report`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!reportRes.ok) throw new Error("Report API failed");
        const reportJson = await reportRes.json();

        // 2️⃣ TOOLS (Truth / Marriage)
        const [truthRes, marriageRes] = await Promise.all([
            fetch(`${BACKEND}/api/love/truth-or-dare`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            }),
            fetch(`${BACKEND}/api/love/love-marriage-probability`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            }),
        ]);

        if (!truthRes.ok || !marriageRes.ok) {
            throw new Error("Tool API failed");
        }

        const truthJson = await truthRes.json();
        const marriageJson = await marriageRes.json();

        // 3️⃣ STORAGE (ORDER IMPORTANT)
        sessionStorage.setItem("love_payload", JSON.stringify(payload));
        sessionStorage.setItem("love_summary", JSON.stringify(reportJson));
        sessionStorage.setItem(
            "love_tools",
            JSON.stringify({
            truth_or_dare: truthJson.data,
            marriage_potential: marriageJson.data,
            })
        );

        // 4️⃣ RESULT PAGE
        router.push("/love/result");
        } catch (e) {
        alert("Calculation failed. Please try again.");
        setLoading(false);
        }

    };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500";

  const labelClass = "block text-xs font-medium text-gray-600 mb-1";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-center text-white shadow-xl">
        <h1 className="text-3xl font-extrabold">💍 Vedic Matchmaking</h1>
        <p className="mt-3 text-purple-100">
          Enter birth details to check love & marriage compatibility
        </p>
      </div>

      {/* BOY */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-blue-900">👨 Boy Details</h2>

        <div>
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            value={form.boy.name}
            onChange={(e) => update("boy", "name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              className={inputClass}
              value={form.boy.dob}
              onChange={(e) => update("boy", "dob", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Time of Birth</label>
            <input
              type="time"
              className={inputClass}
              value={form.boy.tob}
              onChange={(e) => update("boy", "tob", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Place of Birth</label>
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
      </div>

      {/* GIRL */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-pink-900">👩 Girl Details</h2>

        <div>
          <label className={labelClass}>Full Name</label>
          <input
            className={inputClass}
            value={form.girl.name}
            onChange={(e) => update("girl", "name", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              className={inputClass}
              value={form.girl.dob}
              onChange={(e) => update("girl", "dob", e.target.value)}
            />
          </div>

          <div>
            <label className={labelClass}>Time of Birth</label>
            <input
              type="time"
              className={inputClass}
              value={form.girl.tob}
              onChange={(e) => update("girl", "tob", e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Place of Birth</label>
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
      </div>

      {/* SUBMIT */}
      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white disabled:opacity-60"
      >
        {loading ? "Analyzing Matchmaking…" : "Check Matchmaking"}
      </button>

      {loading && (
        <p className="text-xs text-gray-500 text-center">
          Calculating kundali, dosh & compatibility…
        </p>
      )}
    </div>
  );
}
