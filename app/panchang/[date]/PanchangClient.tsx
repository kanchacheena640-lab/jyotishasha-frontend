"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

interface PanchangData {
  sunrise?: string;
  sunset?: string;
  tithi?: { name: string; paksha: string; start_ist: string; end_ist: string };
  nakshatra?: { name: string; pada: number };
  yoga?: { name: string };
  karan?: { name: string };
  abhijit_muhurta?: { start: string; end: string };
  rahu_kaal?: { start: string; end: string };
  ayanamsa?: string;
  weekday?: string;
  date?: string;
  panchak?: { active: boolean; message: string; nakshatra?: string };
  chaughadiya?: ChaughadiyaData;
}

interface ChaughadiyaSlot {
  name: string;
  name_en: string;
  nature: string;
  nature_en: string;
  start: string;
  end: string;
}

interface ChaughadiyaData {
  day: ChaughadiyaSlot[];
  night: ChaughadiyaSlot[];
}

export default function PanchangClient({ params }: { params: { date: string } }) {
  const router = useRouter();
  const { date } = params;

  const [p, setP] = useState<PanchangData | null>(null);
  const [location, setLocation] = useState("Lucknow");
  const [coordinates, setCoordinates] = useState({ lat: 26.8467, lng: 80.9462 });

  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(new Date(Date.now() + 86400000), "yyyy-MM-dd");

  // ✅ Fix: use fallback backend URL for mobile
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

  // ✅ Safe date formatting
  let formattedDate = date;
  try {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      formattedDate = format(parsed, "dd-MM-yyyy");
    }
  } catch {
    formattedDate = date;
  }

  // ✅ Redirect invalid date → today
  useEffect(() => {
    const isIsoDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (!isIsoDate) router.replace(`/panchang/${today}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // ✅ Handle date change
  const handleChange = (d: string) => {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(d);
    if (isValidDate) router.push(`/panchang/${d}`);
  };

  // 🪔 Fetch Panchang Data
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/panchang`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            latitude: coordinates.lat,
            longitude: coordinates.lng,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setP(data?.selected_date || {});
      } catch (e) {
        console.error("Error fetching panchang:", e);
        setP({});
      }
    })();
  }, [date, coordinates]);

  // ✅ Loader fallback (important for mobile)
  if (!p) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-[#0f0c29] text-gray-300">
        <p>🔮 Loading Panchang...</p>
      </main>
    );
  }

  // ✅ Panchang summary
  const summary = [
    { label: "🌅 Sunrise", value: p?.sunrise },
    { label: "🌇 Sunset", value: p?.sunset },
    {
      label: "📅 Tithi",
      value: `${p?.tithi?.name} (${p?.tithi?.paksha})`,
      sub: `${p?.tithi?.start_ist} → ${p?.tithi?.end_ist}`,
    },
    { label: "🌙 Nakshatra", value: `${p?.nakshatra?.name} (Pada ${p?.nakshatra?.pada})` },
    { label: "🌀 Yoga", value: p?.yoga?.name },
    { label: "🪔 Karan", value: p?.karan?.name },
    { label: "🧭 Ayanamsa", value: p?.ayanamsa },
    { label: "📆 Weekday", value: p?.weekday },
    {
      label: "🔥 Panchak",
      value: p?.panchak?.active ? "Active" : "Not Active",
      sub: p?.panchak?.message || `Nakshatra: ${p?.panchak?.nakshatra || ""}`,
    },
  ];

  // ✅ Muhurtha Tools
  const tools = [
    { icon: "👶", label: "Naamkaran", slug: "naamkaran" },
    { icon: "💍", label: "Marriage", slug: "marriage" },
    { icon: "🏡", label: "Grah Pravesh", slug: "grahpravesh" },
    { icon: "🚗", label: "Vehicle", slug: "vehicle" },
    { icon: "🍼", label: "Child Birth", slug: "childbirth" },
    { icon: "💰", label: "Gold Purchase", slug: "gold" },
    { icon: "✈️", label: "Foreign Travel", slug: "travel" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-10 md:py-14">
      {/* Header */}
      <section className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold text-purple-300 mb-1">
          Panchang for {formattedDate}
        </h1>
        <div className="text-sm text-gray-400 mb-3">📍 {location}</div>

        {/* Date & Location Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            onClick={() => handleChange(today)}
            className={`px-4 py-1 rounded-full text-sm border ${
              date === today ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => handleChange(tomorrow)}
            className={`px-4 py-1 rounded-full text-sm border ${
              date === tomorrow ? "bg-purple-600 text-white" : "bg-white/10 text-gray-300"
            }`}
          >
            Tomorrow
          </button>
          <input
            type="date"
            value={date}
            max={format(new Date(Date.now() + 60 * 86400000), "yyyy-MM-dd")}
            onChange={(e) => handleChange(e.target.value)}
            className="px-3 py-1 rounded-md bg-white/10 text-sm text-gray-200 border border-purple-400"
          />
          <div className="w-48">
            <PlaceAutocompleteInput
              value={location}
              onChange={setLocation}
              onPlaceSelected={(place) => {
                setLocation(place.name);
                setCoordinates({ lat: place.lat, lng: place.lng });
              }}
            />
          </div>
        </div>
      </section>
  
  {/* 🕰️ Chaughadiya Section */}
  {p?.chaughadiya && (
    <div className="max-w-5xl mx-auto mb-10">
      <h2 className="text-xl md:text-2xl font-semibold text-purple-200 mb-4 text-center">
        🕰️ Chaughadiya
      </h2>

      {/* Day */}
      <div className="mb-6">
        <h3 className="text-lg font-medium text-green-300 mb-2">Day Chaughadiya</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {p.chaughadiya.day.map((c: any, i: number) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-center text-sm border
                ${
                  c.nature_en === "shubh"
                    ? "bg-green-500/10 border-green-400/40"
                    : "bg-red-500/10 border-red-400/30"
                }`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-300">
                {c.start} – {c.end}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Night */}
      <div>
        <h3 className="text-lg font-medium text-blue-300 mb-2">Night Chaughadiya</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {p.chaughadiya.night.map((c: any, i: number) => (
            <div
              key={i}
              className={`rounded-xl p-3 text-center text-sm border
                ${
                  c.nature_en === "shubh"
                    ? "bg-green-500/10 border-green-400/40"
                    : "bg-red-500/10 border-red-400/30"
                }`}
            >
              <div className="font-semibold">{c.name}</div>
              <div className="text-xs text-gray-300">
                {c.start} – {c.end}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}

      {/* Timing Boxes */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white/10 border border-purple-400/20 rounded-xl p-4">
          <p className="text-sm text-purple-300 font-medium">Auspicious Timing</p>
          <h3 className="text-lg font-semibold text-white">Abhijit Muhurtha</h3>
          <p className="text-purple-200 mt-1">
            {p?.abhijit_muhurta?.start} – {p?.abhijit_muhurta?.end}
          </p>
        </div>
        <div className="bg-white/10 border border-red-400/30 rounded-xl p-4">
          <p className="text-sm text-red-300 font-medium">Inauspicious Timing</p>
          <h3 className="text-lg font-semibold text-white">Rahu Kaal</h3>
          <p className="text-red-200 mt-1">
            {p?.rahu_kaal?.start} – {p?.rahu_kaal?.end}
          </p>
        </div>
      </div>

      {/* Panchang Details */}
      <div className="max-w-7xl mx-auto bg-white/10 rounded-2xl border border-white/10 shadow-md p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.map((item, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-gradient-to-br from-[#2d2452] to-[#3b2a78] border border-purple-500/30 text-left p-4"
            >
              <div className="text-sm text-purple-200 font-semibold mb-1">{item.label}</div>
              <div className="text-lg font-bold text-white leading-snug">{item.value}</div>
              {item.sub && <div className="text-xs text-gray-300 mt-1">{item.sub}</div>}
            </div>
          ))}
        </div>

        {/* 🔮 Shubh Muhurtha Tools Section */}
        <div className="mt-10">
          <h2 className="text-xl md:text-2xl font-semibold text-purple-200 mb-3">
            🔮 Shubh Muhurtha Tools
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {tools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/panchang/tools/${tool.slug}?lat=${coordinates.lat}&lng=${coordinates.lng}&place=${encodeURIComponent(location)}`}
              >
                <div className="cursor-pointer bg-purple-700 hover:bg-purple-600 transition-colors text-white text-sm font-medium px-3 py-4 rounded-xl text-center shadow-md flex flex-col items-center justify-center gap-1">
                  <span className="text-lg">{tool.icon}</span>
                  <span>{tool.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 mt-10">
        Data powered by Jyotishasha API • Based on Lahiri Ayanamsa
      </div>
    </main>
  );
}
