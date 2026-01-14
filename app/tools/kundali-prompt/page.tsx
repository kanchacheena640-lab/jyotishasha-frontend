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

    // 🔁 1) Kundali hit
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/full-kundali-modern`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    // 🔁 2) Prompt build (INLINE – no reuse elsewhere)
    const lines: string[] = [];

    lines.push(`CLIENT DETAILS`);
    lines.push(`Name: ${form.name}`);
    lines.push(`Date of Birth: ${form.dob}`);
    lines.push(`Time of Birth: ${form.tob}`);
    lines.push(`Place of Birth: ${form.place}\n`);

    const asc =
      data?.chart_data?.ascendant || data?.lagna_sign || "";
    lines.push(`This person is a ${asc} Ascendant.\n`);

    data?.chart_data?.planets?.forEach((p: any) => {
      if (!p?.name || p.name.includes("Ascendant")) return;
      lines.push(
        `${p.name} is placed in ${p.house} house in ${p.sign} sign in ${p.dignity || "neutral"} state.`
      );
    });

    const d = data?.dasha_summary?.current_block;
    if (d) {
      lines.push(
        `\nCurrent Mahadasha: ${d.mahadasha} (${d.period})`
      );
      lines.push(
        `Current Antardasha: ${d.antardasha} (${d.period})`
      );
    }

    if (Array.isArray(data?.current_transits)) {
      lines.push(`\nCurrent planetary transits:`);
      data.current_transits.forEach((t: any) => {
        lines.push(
          `${t.planet} is transiting through ${t.house} house in ${t.sign} sign.`
        );
      });
    }

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
        🔮 Kundali → Prompt Generator (Internal)
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
          rows={24}
          className="mt-6 w-full max-w-4xl bg-black text-green-400 font-mono p-4 border"
        />
      )}
    </section>
  );
}
