"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

export default function RelationshipFutureReportForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
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
    setLoading(true);

    const payload = {
      product_slug: "relationship_future_report",
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

  const input =
    "w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-purple-500";

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8 bg-white">
      <h1 className="text-3xl font-bold text-center">
        Relationship Future Report
      </h1>

      {/* BOY */}
      <div className="rounded-xl border p-5 space-y-3">
        <h2 className="font-semibold text-lg">Boy Details</h2>
        <input
          className={input}
          placeholder="Name"
          onChange={(e) => update("boy", "name", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <input type="date" className={input} onChange={(e) => update("boy", "dob", e.target.value)} />
          <input type="time" className={input} onChange={(e) => update("boy", "tob", e.target.value)} />
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
      <div className="rounded-xl border p-5 space-y-3">
        <h2 className="font-semibold text-lg">Girl Details</h2>
        <input
          className={input}
          placeholder="Name"
          onChange={(e) => update("girl", "name", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <input type="date" className={input} onChange={(e) => update("girl", "dob", e.target.value)} />
          <input type="time" className={input} onChange={(e) => update("girl", "tob", e.target.value)} />
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
        className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold"
      >
        {loading ? "Processing…" : "Continue to Payment"}
      </button>
    </div>
  );
}
