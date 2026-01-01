"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

export default function RelationshipFutureReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    language: "en",
    boy: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
    girl: { name: "", dob: "", tob: "", pob: "", lat: 0, lng: 0 },
  });

  const update = (side: "boy" | "girl", key: string, value: any) => {
    setForm((p) => ({
      ...p,
      [side]: { ...p[side], [key]: value },
    }));
  };

  const submit = () => {
    if (!form.email) {
      alert("Email is required to send your report.");
      return;
    }

    setLoading(true);

    const payload = {
      product_slug: "relationship_future_report",
      email: form.email,              // ✅ mandatory
      language: form.language,
      boy_is_user: true,
      user: form.boy,
      partner: form.girl,
    };

    sessionStorage.setItem(
      "relationship_report_payload",
      JSON.stringify(payload)
    );

    router.push("/checkout/relationship_future_report");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-10 bg-white">
      {/* HERO */}
      <div className="rounded-3xl bg-gradient-to-br from-purple-600 to-indigo-700 p-8 text-center text-white shadow-xl">
        <h1 className="text-3xl font-extrabold">
          💞 Relationship Future Report
        </h1>
        <p className="mt-3 text-purple-100">
          Enter both partners’ birth details. Report will be sent on email.
        </p>
      </div>

      {/* CONTACT */}
      <div className="rounded-2xl border border-purple-200 bg-purple-50 p-6 space-y-3">
        <h2 className="text-lg font-semibold text-purple-900">
          📧 Contact Email (Required)
        </h2>
        <input
          type="email"
          className={inputClass}
          placeholder="Enter your email address"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <p className="text-xs text-gray-600">
          Your premium report will be delivered on this email.
        </p>
      </div>

      {/* BOY */}
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-blue-900">👨 Boy Details</h2>

        <input
          className={inputClass}
          placeholder="Boy Name"
          onChange={(e) => update("boy", "name", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="date" className={inputClass} onChange={(e) => update("boy", "dob", e.target.value)} />
          <input type="time" className={inputClass} onChange={(e) => update("boy", "tob", e.target.value)} />
        </div>

        <PlaceAutocompleteInput
          value={form.boy.pob}
          onChange={(v) => update("boy", "pob", v)}
          onPlaceSelected={(p) => {
            update("boy", "pob", p.name);
            update("boy", "lat", p.lat);
            update("boy", "lng", p.lng);
          }}
        />
      </div>

      {/* GIRL */}
      <div className="rounded-2xl border border-pink-200 bg-pink-50 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-pink-900">👩 Girl Details</h2>

        <input
          className={inputClass}
          placeholder="Girl Name"
          onChange={(e) => update("girl", "name", e.target.value)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input type="date" className={inputClass} onChange={(e) => update("girl", "dob", e.target.value)} />
          <input type="time" className={inputClass} onChange={(e) => update("girl", "tob", e.target.value)} />
        </div>

        <PlaceAutocompleteInput
          value={form.girl.pob}
          onChange={(v) => update("girl", "pob", v)}
          onPlaceSelected={(p) => {
            update("girl", "pob", p.name);
            update("girl", "lat", p.lat);
            update("girl", "lng", p.lng);
          }}
        />
      </div>

      <button
        onClick={submit}
        disabled={loading}
        className="w-full rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 py-4 text-lg font-semibold text-white shadow-lg"
      >
        {loading ? "Preparing Checkout…" : "Continue to Payment"}
      </button>
    </div>
  );
}
