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

    boy: {
      name: "",
      dob: "",
      tob: "",
      pob: "",
      lat: 0,
      lng: 0,
    },

    girl: {
      name: "",
      dob: "",
      tob: "",
      pob: "",
      lat: 0,
      lng: 0,
    },
  });

  const update = (section: "boy" | "girl", field: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const submit = async () => {
    setLoading(true);

    const payload = {
      language: form.language,
      boy_is_user: true, // 🔒 LOCKED

      user: {
        name: form.boy.name,
        dob: form.boy.dob,
        tob: form.boy.tob,
        pob: form.boy.pob,
        lat: form.boy.lat,
        lng: form.boy.lng,
      },

      partner: {
        name: form.girl.name,
        dob: form.girl.dob,
        tob: form.girl.tob,
        pob: form.girl.pob,
        lat: form.girl.lat,
        lng: form.girl.lng,
      },
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

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">
        Vedic Matchmaking Compatibility
      </h1>

      {/* BOY DETAILS */}
      <div className="border rounded p-4 space-y-3">
        <h2 className="font-medium">Boy Details</h2>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          value={form.boy.name}
          onChange={(e) => update("boy", "name", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={form.boy.dob}
            onChange={(e) => update("boy", "dob", e.target.value)}
          />

          <input
            type="time"
            className="w-full border rounded px-3 py-2"
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

      {/* GIRL DETAILS */}
      <div className="border rounded p-4 space-y-3">
        <h2 className="font-medium">Girl Details</h2>

        <input
          className="w-full border rounded px-3 py-2"
          placeholder="Name"
          value={form.girl.name}
          onChange={(e) => update("girl", "name", e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={form.girl.dob}
            onChange={(e) => update("girl", "dob", e.target.value)}
          />

          <input
            type="time"
            className="w-full border rounded px-3 py-2"
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

      <button
        onClick={submit}
        disabled={loading}
        className="w-full bg-purple-600 text-white py-3 rounded text-lg"
      >
        {loading ? "Analyzing…" : "Check Matchmaking"}
      </button>
    </div>
  );
}
