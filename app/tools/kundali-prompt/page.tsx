"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const PlaceAutocompleteInput = dynamic(
  () => import("@/components/PlaceAutocompleteInput"),
  { ssr: false }
);

/* ---------------- HELPERS ---------------- */

// Rashi order (sidereal)
const RASHIS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo",
  "Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

// Normalize rashi names (CRITICAL FIX)
function normalizeRashi(r: string) {
  if (!r) return "";
  return r.charAt(0).toUpperCase() + r.slice(1).toLowerCase();
}

// Transit rashi → house from Lagna
function getHouseFromLagna(lagnaRashi: string, transitRashi: string) {
  const l = RASHIS.indexOf(normalizeRashi(lagnaRashi));
  const t = RASHIS.indexOf(normalizeRashi(transitRashi));
  if (l === -1 || t === -1) return null;
  return ((t - l + 12) % 12) + 1; // 1–12
}

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

    /* -------- 1) Kundali API -------- */
    const kundaliPayload = {
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

    const kundaliRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/full-kundali-modern`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(kundaliPayload),
      }
    );
    const kundali = await kundaliRes.json();

    /* -------- 2) Transit API -------- */
    const transitRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transit/current`
    );
    const transit = await transitRes.json();

    /* -------- 3) Prompt Build -------- */
    const lines: string[] = [];

    /* NAME ONLY */
    lines.push(`Name: ${form.name}\n`);

    /* ASCENDANT */
    const lagnaRashi =
      kundali?.chart_data?.ascendant || kundali?.lagna_sign || "";
    lines.push(`This person is a ${lagnaRashi} Ascendant.\n`);

    /* MOON NAKSHATRA */
    const moon = kundali?.chart_data?.planets?.find(
      (p: any) => p.name === "Moon"
    );
    if (moon?.nakshatra) {
      lines.push(
        `Moon Nakshatra: ${moon.nakshatra}${
          moon.pada ? ` (Pada ${moon.pada})` : ""
        }\n`
      );
    }

    /* NATAL PLANETS */
    kundali?.chart_data?.planets?.forEach((p: any) => {
      if (!p?.name) return;
      if (p.name.toLowerCase().includes("ascendant")) return;
      lines.push(
        `${p.name} is placed in ${p.house} house in ${p.sign} sign.`
      );
    });

    /* CURRENT DASHA (NAME ONLY) */
    const dasha = kundali?.dasha_summary?.current_block;
    if (dasha) {
      lines.push(`\nCurrent Mahadasha: ${dasha.mahadasha || "—"}`);
      lines.push(`Current Antardasha: ${dasha.antardasha || "—"}`);
    }

    /* CURRENT TRANSITS (WITH HOUSE FROM LAGNA) */
    const positions = transit?.positions || {};
    const transitLines: string[] = [];

    Object.entries(positions).forEach(([planet, p]: any) => {
      if (!p?.rashi) return;
      const house = getHouseFromLagna(lagnaRashi, p.rashi);
      if (!house) return;
      transitLines.push(
        `${planet} is transiting through ${house} house in ${p.rashi} sign.`
      );
    });

    if (transitLines.length) {
      lines.push(`\nCurrent planetary transits:`);
      transitLines.forEach(l => lines.push(l));
    }

    /* RULES */
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
        🔮 Kundali → Prompt Generator (Kundali + Transit)
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
        <div className="relative mt-6 max-w-4xl">
            {/* Copy Button */}
            <button
            type="button"
            onClick={() => {
                navigator.clipboard.writeText(prompt);
            }}
            className="absolute top-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-3 py-1 rounded shadow"
            >
            Copy
            </button>

            {/* Prompt Textarea */}
            <textarea
            value={prompt}
            readOnly
            rows={28}
            className="w-full bg-black text-green-400 font-mono p-4 border border-indigo-500/40 rounded"
            />
        </div>
        )}

    </section>
  );
}
