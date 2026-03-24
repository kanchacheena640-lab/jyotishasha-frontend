"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Link from "next/link";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";
import AppDownloadCTA from "@/components/AppDownloadCTA";

/* ===================== TYPES ===================== */
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
  panchak?: { active: boolean; message: string; nakshatra?: string };
  chaughadiya?: ChaughadiyaData;
}

interface ChaughadiyaSlot {
  name: string;
  name_en: string;
  nature_en: string;
  start: string;
  end: string;
}

interface ChaughadiyaData {
  day: ChaughadiyaSlot[];
  night: ChaughadiyaSlot[];
}

interface SummaryItem {
  label: string;
  value: string | React.ReactNode;
  sub?: string;
}

/* ===================== COMPONENT ===================== */
export default function PanchangClient({
  params,
}: {
  params: { date: string; locale?: string };
}) {
  const router = useRouter();
  const { date, locale } = params;
  const lang = locale === "hi" ? "hi" : "en";

  const [panchang, setPanchang] = useState<PanchangData | null>(null);
  const [location, setLocation] = useState("Lucknow");
  const [coordinates, setCoordinates] = useState({ lat: 26.8467, lng: 80.9462 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "https://jyotishasha-backend.onrender.com";

  // Today & Tomorrow (ISO format for routing)
  const today = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const tomorrow = useMemo(() => format(new Date(Date.now() + 86400000), "yyyy-MM-dd"), []);

  // Display date in dd-MM-yyyy (exactly as you wanted)
  const displayDate = useMemo(() => {
    try {
      const parsed = new Date(date);
      return isNaN(parsed.getTime()) ? date : format(parsed, "dd-MM-yyyy");
    } catch {
      return date;
    }
  }, [date]);

  /* ===================== REDIRECT INVALID DATE ===================== */
  useEffect(() => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      router.replace(`${lang === "hi" ? "/hi" : ""}/panchang/${today}`);
    }
  }, [date, lang, router, today]);

  /* ===================== DATE HANDLER ===================== */
  const handleDateChange = useCallback(
    (newDate: string) => {
      if (/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
        router.push(`${lang === "hi" ? "/hi" : ""}/panchang/${newDate}`);
      }
    },
    [lang, router]
  );

  /* ===================== FETCH PANCHANG (Industry Standard) ===================== */
  useEffect(() => {
    setLoading(true);
    setError(null);

    const controller = new AbortController();

    fetch(`${BACKEND_URL}/api/panchang`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang, // Ensures Hindi names come back
      },
      body: JSON.stringify({
        date,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
        language: lang,
      }),
      signal: controller.signal,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("Failed to fetch"))))
      .then((data) => setPanchang(data?.selected_date || {}))
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error(err);
          setError(lang === "hi" ? "डेटा लोड करने में समस्या हुई" : "Failed to load Panchang");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [date, coordinates, lang, BACKEND_URL]);

  /* ===================== LOADING SKELETON (Classy) ===================== */
  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-14 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-xl text-purple-300">
            {lang === "hi" ? "🔮 पंचांग तैयार हो रहा है..." : "🔮 Preparing Panchang..."}
          </p>
        </div>
      </main>
    );
  }

  /* ===================== ERROR STATE ===================== */
  if (error || !panchang) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-14 flex items-center justify-center">
        <div className="text-center max-w-md">
          <p className="text-6xl mb-4">⚠️</p>
          <p className="text-xl text-red-400 mb-6">{error || "Something went wrong"}</p>
          <button
            onClick={() => router.push(`${lang === "hi" ? "/hi" : ""}/panchang/${today}`)}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-full text-sm font-medium transition"
          >
            {lang === "hi" ? "आज का पंचांग देखें" : "View Today's Panchang"}
          </button>
        </div>
      </main>
    );
  }

  /* ===================== SUMMARY (Clean & Reusable) ===================== */
  const summary: SummaryItem[] = [
    { label: lang === "hi" ? "🌅 सूर्योदय" : "🌅 Sunrise", value: panchang.sunrise || "—", },
    { label: lang === "hi" ? "🌇 सूर्यास्त" : "🌇 Sunset", value: panchang.sunset || "—", },
    {
      label: lang === "hi" ? "📅 तिथि" : "📅 Tithi",
      value: `${panchang.tithi?.name} (${panchang.tithi?.paksha})`,
      sub: `${panchang.tithi?.start_ist} → ${panchang.tithi?.end_ist}`,
    },
    {
      label: lang === "hi" ? "🌙 नक्षत्र" : "🌙 Nakshatra",
      value: `${panchang.nakshatra?.name} (Pada ${panchang.nakshatra?.pada})`,
    },
    { label: lang === "hi" ? "🌀 योग" : "🌀 Yoga", value: panchang.yoga?.name || "—" },
    { label: lang === "hi" ? "🪔 करण" : "🪔 Karan", value: panchang.karan?.name || "—" },
    { label: lang === "hi" ? "🧭 अयनांश" : "🧭 Ayanamsa", value: panchang.ayanamsa || "—" },
    { label: lang === "hi" ? "📆 वार" : "📆 Weekday", value: panchang.weekday || "—" },
    {
      label: lang === "hi" ? "🔥 पंचक" : "🔥 Panchak",
      value: panchang.panchak?.active
        ? (lang === "hi" ? "सक्रिय" : "Active")
        : (lang === "hi" ? "निष्क्रिय" : "Inactive"),
      sub: panchang.panchak?.message,
    },
  ];

  const tools = [
    { icon: "👶", label: lang === "hi" ? "नामकरण" : "Naamkaran", slug: "naamkaran" },
    { icon: "💍", label: lang === "hi" ? "विवाह" : "Marriage", slug: "marriage" },
    { icon: "🏡", label: lang === "hi" ? "गृह प्रवेश" : "Grah Pravesh", slug: "grahpravesh" },
    { icon: "🚗", label: lang === "hi" ? "वाहन" : "Vehicle", slug: "vehicle" },
    { icon: "🍼", label: lang === "hi" ? "संतान जन्म" : "Child Birth", slug: "childbirth" },
    { icon: "💰", label: lang === "hi" ? "सोना खरीद" : "Gold Purchase", slug: "gold" },
    { icon: "✈️", label: lang === "hi" ? "विदेश यात्रा" : "Foreign Travel", slug: "travel" },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-12 md:py-16">
      {/* HEADER - Classy */}
      <section className="max-w-5xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-purple-200">
          {lang === "hi" ? `${displayDate} का पंचांग` : `Panchang • ${displayDate}`}
        </h1>
        <p className="mt-3 text-lg text-gray-400 flex items-center justify-center gap-2">
          📍 <span className="font-medium">{location}</span>
        </p>

        {/* Controls */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleDateChange(today)}
            className={`px-6 py-2.5 rounded-full border text-sm font-medium transition ${date === today ? "bg-purple-600 border-purple-600" : "border-white/20 hover:border-white/40"}`}
          >
            {lang === "hi" ? "आज" : "Today"}
          </button>
          <button
            onClick={() => handleDateChange(tomorrow)}
            className={`px-6 py-2.5 rounded-full border text-sm font-medium transition ${date === tomorrow ? "bg-purple-600 border-purple-600" : "border-white/20 hover:border-white/40"}`}
          >
            {lang === "hi" ? "कल" : "Tomorrow"}
          </button>

          <input
            type="date"
            value={date}
            max={format(new Date(Date.now() + 60 * 86400000), "yyyy-MM-dd")}
            onChange={(e) => handleDateChange(e.target.value)}
            className="px-5 py-2.5 bg-white/10 border border-purple-400/50 rounded-xl text-sm focus:outline-none focus:border-purple-500"
          />

          <div className="w-56">
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

      {/* AUSPICIOUS / INAUSPICIOUS TIMINGS */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6 mb-14">
        <div className="bg-white/5 backdrop-blur-xl border border-purple-400/30 rounded-3xl p-8">
          <p className="uppercase tracking-widest text-xs text-purple-400 mb-2">शुभ समय • Auspicious</p>
          <h3 className="text-2xl font-semibold">अभिजीत मुहूर्त</h3>
          <p className="mt-4 text-3xl font-light text-purple-200">
            {panchang.abhijit_muhurta?.start} – {panchang.abhijit_muhurta?.end}
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-red-400/30 rounded-3xl p-8">
          <p className="uppercase tracking-widest text-xs text-red-400 mb-2">अशुभ समय • Inauspicious</p>
          <h3 className="text-2xl font-semibold">राहु काल</h3>
          <p className="mt-4 text-3xl font-light text-red-200">
            {panchang.rahu_kaal?.start} – {panchang.rahu_kaal?.end}
          </p>
        </div>
      </div>

      <AppDownloadCTA utm={{ source: "daily_panchang", medium: "primary_cta", campaign: "hero" }} />

      {/* PANCHANG SUMMARY - Premium Cards */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {summary.map((item, i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-[#1f183f] to-[#2d2452] border border-purple-500/20 rounded-3xl p-7 hover:border-purple-400/40 transition-all duration-300"
            >
              <div className="text-purple-300 text-sm font-medium tracking-wider mb-2">{item.label}</div>
              <div className="text-2xl font-semibold text-white">{item.value}</div>
              {item.sub && <div className="mt-3 text-xs text-gray-400">{item.sub}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* CHAUGHADIYA - Clean & Mobile Friendly */}
      {panchang.chaughadiya && (
        <section className="max-w-7xl mx-auto mt-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-semibold text-purple-200">🕰️ चौघड़िया</h2>
            <div className="mt-3 inline-flex items-center gap-8 text-sm">
              <span className="flex items-center gap-2"><span className="text-3xl text-green-400">●</span> शुभ</span>
              <span className="flex items-center gap-2"><span className="text-3xl text-red-400">●</span> अशुभ</span>
            </div>
          </div>

          <div className="bg-[#18122f] border border-purple-500/30 rounded-3xl p-8 md:p-10">
            {/* Day */}
            <div className="mb-12">
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="text-green-300 text-2xl font-medium">दिन का चौघड़िया</h3>
                <span className="text-gray-400 text-sm">{panchang.sunrise} – {panchang.sunset}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {panchang.chaughadiya.day.map((slot, i) => {
                  const isShubh = slot.nature_en === "shubh";
                  return (
                    <div key={i} className={`rounded-2xl p-6 border ${isShubh ? "border-green-400/40 bg-green-500/10" : "border-red-400/40 bg-red-500/10"}`}>
                      <div className="text-white text-xl font-medium">{lang === "hi" ? slot.name : slot.name_en}</div>
                      <div className="mt-6 flex items-center justify-between text-2xl font-light text-white">
                        {slot.start} – {slot.end}
                        <span className={`text-5xl ${isShubh ? "text-green-400" : "text-red-400"}`}>●</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Night */}
            <div>
              <div className="flex justify-between items-baseline mb-6">
                <h3 className="text-blue-300 text-2xl font-medium">रात्रि का चौघड़िया</h3>
                <span className="text-gray-400 text-sm">{panchang.sunset} – अगला सूर्योदय</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {panchang.chaughadiya.night.map((slot, i) => {
                  const isShubh = slot.nature_en === "shubh";
                  return (
                    <div key={i} className={`rounded-2xl p-6 border ${isShubh ? "border-green-400/40 bg-green-500/10" : "border-red-400/40 bg-red-500/10"}`}>
                      <div className="text-white text-xl font-medium">{lang === "hi" ? slot.name : slot.name_en}</div>
                      <div className="mt-6 flex items-center justify-between text-2xl font-light text-white">
                        {slot.start} – {slot.end}
                        <span className={`text-5xl ${isShubh ? "text-green-400" : "text-red-400"}`}>●</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      <AppDownloadCTA utm={{ source: "daily_panchang", medium: "secondary_cta", campaign: "chaughadiya" }} />

      {/* SHUBH MUHURTHA TOOLS - Premium Grid */}
      <div className="max-w-6xl mx-auto mt-20">
        <h2 className="text-3xl font-semibold text-center text-purple-200 mb-10">🔮 शुभ मुहूर्त टूल्स</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              href={`${lang === "hi" ? "/hi" : ""}/panchang/tools/${tool.slug}?lat=${coordinates.lat}&lng=${coordinates.lng}&place=${encodeURIComponent(location)}`}
              className="group"
            >
              <div className="bg-purple-700/80 hover:bg-purple-600 transition-all duration-300 rounded-3xl py-9 flex flex-col items-center justify-center border border-purple-400/20 hover:border-purple-400">
                <span className="text-5xl mb-4 transition-transform group-hover:scale-110">{tool.icon}</span>
                <span className="font-medium text-lg">{tool.label}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-24 text-center text-xs text-gray-500 tracking-widest">
        POWERED BY JYOTISHASHA API • LAHIRI AYANAMSA
      </div>
    </main>
  );
}