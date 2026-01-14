"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PlaceAutocompleteInput = dynamic(
  () => import("@/components/PlaceAutocompleteInput"),
  { ssr: false }
);

export default function KundaliPromptPage() {
  const [form, setForm] = useState({
    name: "",
    dob: "",
    tob: "",
    place: "",
    lat: "",
    lng: "",
    language: "en",
  });

  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      name: form.name,
      dob: form.dob,
      tob: form.tob,
      place_name: form.place,
      lat: Number(form.lat),
      lng: Number(form.lng),
      timezone: "+05:30",
      ayanamsa: "Lahiri",
      language: form.language,
    };

    /* 1️⃣ Kundali API hit */
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/full-kundali-modern`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    /* 2️⃣ Prompt Build */
    const lines: string[] = [];

    /* ===== NAME ONLY ===== */
    lines.push(`Name: ${form.name}\n`);

    /* ===== ASCENDANT ===== */
    const ascendant =
      data?.chart_data?.ascendant || data?.lagna_sign || "";
    lines.push(`This person is a ${ascendant} Ascendant.\n`);

    /* ===== MOON NAKSHATRA ===== */
    const moon = data?.chart_data?.planets?.find(
      (p: any) => p.name === "Moon"
    );

    if (moon?.nakshatra) {
      lines.push(
        `Moon Nakshatra: ${moon.nakshatra}${
          moon.pada ? ` (Pada ${moon.pada})` : ""
        }\n`
      );
    }

    /* ===== NATAL PLANETS (NO DIGNITY) ===== */
    data?.chart_data?.planets?.forEach((p: any) => {
      if (!p?.name) return;
      if (p.name.toLowerCase().includes("ascendant")) return;

      lines.push(
        `${p.name} is placed in ${p.house} house in ${p.sign} sign.`
      );
    });

    /* ===== CURRENT DASHA (NAME ONLY) ===== */
    const dasha = data?.dasha_summary?.current_block;
    if (dasha) {
      lines.push(`\nCurrent Mahadasha: ${dasha.mahadasha || "—"}`);
      lines.push(`Current Antardasha: ${dasha.antardasha || "—"}`);
    }

    /* ===== CURRENT TRANSITS ===== */
    const transits = data?.current_transits || data?.transits;
    if (Array.isArray(transits) && transits.length > 0) {
      lines.push(`\nCurrent planetary transits:`);
      transits.forEach((t: any) => {
        if (!t?.planet || !t?.house || !t?.sign) return;
        lines.push(
          `${t.planet} is transiting through ${t.house} house in ${t.sign} sign.`
        );
      });
    }

    /* ===== RULES ===== */
    lines.push(`
Analyze the above kundali strictly using Vedic astrology.
Do not mention houses where no planet is present.
Answer clearly and confidently.
`);

    setPrompt(lines.join("\n"));
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-black text-white p-6">
      <h1 className="text-xl font-semibold mb-4">
        🔮 Kundali → Prompt Generator (Isolated Tool)
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <input
          name="name"
          placeholder="Name"
          onChange={handleChange}
          required
          className="w-full p-2 text-black"
        />

        <input
          type="date"
          name="dob"
          onChange={handleChange}
          required
          className="w-full p-2 text-black"
        />

        <input
          type="time"
          name="tob"
          onChange={handleChange}
          required
          className="w-full p-2 text-black"
        />

        <PlaceAutocompleteInput
          value={form.place}
          onChange={(v: string) =>
            setForm((p) => ({ ...p, place: v }))
          }
          onPlaceSelected={(p: any) =>
            setForm((prev) => ({
              ...prev,
              place: p.name,
              lat: String(p.lat),
              lng: String(p.lng),
            }))
          }
        />

        <button
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Prompt"}
        </button>
      </form>

      {prompt && (
        <textarea
          value={prompt}
          readOnly
          rows={26}
          className="mt-6 w-full max-w-4xl bg-black text-green-400 font-mono p-4 border"
        />
      )}
    </section>
  );
}
