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
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(null);

    // Require real coordinates from an actual Places selection -- a typed
    // string alone is not enough. "" (never selected, or invalidated by a
    // manual edit after selection -- see the place field's onChange below)
    // is checked directly rather than via truthiness, so a legitimate
    // latitude/longitude of 0 is never mistaken for "absent".
    if (form.lat === "" || form.lng === "") {
      setError("Please select your place of birth from the suggestions list.");
      return;
    }

    setLoading(true);

    try {
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
      if (!kundaliRes.ok) {
        throw new Error("Kundali generation failed. Please try again.");
      }
      const kundali = await kundaliRes.json();

      /* -------- 2) Transit API -------- */
      const transitRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/transit/current`
      );
      if (!transitRes.ok) {
        throw new Error("Could not fetch current planetary transits. Please try again.");
      }
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
    } catch (err: any) {
      setError(err?.message || "Something went wrong while generating the prompt. Please try again.");
    } finally {
      setLoading(false);
    }
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
            setForm((prev) => {
              // PlaceAutocompleteInput calls onPlaceSelected then onChange
              // with that same selected name right after -- prev.place
              // already equals v at that point (React 18 batches both
              // updates for the same place_changed event, applying them in
              // order), so this is a no-op that leaves the coordinates just
              // set intact. Any OTHER value here is a genuine keystroke --
              // typing a fresh search or editing previously-selected text --
              // and must invalidate any stale coordinates until a new real
              // suggestion is chosen.
              if (v === prev.place) return prev;
              return { ...prev, place: v, lat: "", lng: "" };
            })
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

        {error && (
          <p className="text-sm text-red-400">{error}</p>
        )}

        <button
          type="submit"
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          {loading ? "Generating..." : "Generate Prompt"}
        </button>
      </form>

      {prompt && (
        <div className="mt-6 max-w-4xl">
            {/* Header Bar */}
            <div className="flex justify-between items-center bg-gray-900 border border-indigo-500/40 rounded-t px-3 py-2">
            <span className="text-xs text-indigo-300 font-medium">
                Generated Prompt
            </span>

            <button
                type="button"
                onClick={() => {
                navigator.clipboard.writeText(prompt);
                }}
                className="
                flex items-center gap-1
                bg-indigo-600 hover:bg-indigo-700
                active:bg-indigo-800
                active:scale-95
                transition-all duration-150
                text-white text-xs px-3 py-1.5
                rounded shadow-md
                "
            >
                📋 Copy
            </button>
            </div>

            {/* Textarea */}
            <textarea
            value={prompt}
            readOnly
            rows={28}
            className="
                w-full
                bg-black text-green-400 font-mono
                p-4
                border border-t-0 border-indigo-500/40
                rounded-b
                overflow-auto
            "
            />
        </div>
        )}

    </section>
  );
}
