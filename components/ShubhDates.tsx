"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlaceAutocompleteInput from "@/components/PlaceAutocompleteInput";

interface MuhurthaItem {
  date: string;
  weekday: string;
  score: number;
  reasons: string[];
}

interface ShubhDatesProps {
  params: { 
    tool?: string;
    locale?: string; // ✅ TypeScript error fix
  };
}

export default function ShubhDates({ params }: ShubhDatesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 🌍 Locale Check
  const isHi = params?.locale === "hi";
  const langPath = isHi ? "/hi" : "";

  const TOOL_MAP: Record<string, string> = {
    naamkaran: "naamkaran",
    marriage: "marriage",
    grahpravesh: "grah_pravesh",
    vehicle: "vehicle",
    childbirth: "childbirth",
    gold: "gold",
    travel: "travel",
  };

  const toolSlug = params?.tool || "naamkaran";
  const activity = TOOL_MAP[toolSlug] || "naamkaran";

  const lat = parseFloat(searchParams.get("lat") || "26.8467");
  const lng = parseFloat(searchParams.get("lng") || "80.9462");
  const place = decodeURIComponent(searchParams.get("place") || (isHi ? "लखनऊ" : "Lucknow"));

  const [results, setResults] = useState<MuhurthaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [tempLoc, setTempLoc] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [tempName, setTempName] = useState(place);

  useEffect(() => {
    async function fetchDates() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/muhurth/list`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            activity,
            latitude: lat,
            longitude: lng,
            days: 30,
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        setResults(json?.results || []);
      } catch (err) {
        console.error("❌ Error fetching Shubh Muhurtha:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchDates();
  }, [activity, lat, lng]);

  const handleLocationSelect = (loc: { lat: number; lng: number; name: string }) => {
    setTempLoc(loc);
    setTempName(loc.name);
  };

  const handleApplyLocation = () => {
    if (!tempLoc) return;
    // ✅ Keep the user in the same language after redirect
    const newUrl = `${langPath}/panchang/tools/${toolSlug}?lat=${tempLoc.lat}&lng=${tempLoc.lng}&place=${encodeURIComponent(
      tempLoc.name
    )}`;
    router.replace(newUrl);
    setTimeout(() => (window.location.href = newUrl), 100);
  };

  // 📝 Translation Helper
  const t = {
    showing: isHi ? "परिणाम देख रहे हैं: " : "Showing results for ",
    changeLoc: isHi ? "स्थान बदलें" : "Change Location",
    cancel: isHi ? "रद्द करें" : "Cancel",
    apply: isHi ? "✅ स्थान लागू करें" : "✅ Apply Location",
    loading: isHi ? "शुभ मुहूर्त लोड हो रहा है..." : "Loading Shubh Muhurtha...",
    noDates: isHi ? "इस स्थान के लिए कोई शुभ तिथि नहीं मिली।" : "No auspicious dates found for this location.",
    day: isHi ? "दिन:" : "Day:",
    score: isHi ? "स्कोर:" : "Score:"
  };

  return (
    <div key={`${lat}-${lng}-${place}`} className="bg-white rounded-2xl p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <p className="text-gray-600 text-sm">
          {t.showing}
          <span className="font-bold text-indigo-700">{place}</span>
        </p>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="w-full sm:w-auto px-5 py-2 rounded-xl text-sm font-bold bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all"
        >
          {showPicker ? t.cancel : t.changeLoc}
        </button>
      </div>

      {/* Location Picker */}
      {showPicker && (
        <div className="mb-6 p-4 bg-indigo-50/50 rounded-2xl space-y-3 border border-indigo-100">
          <PlaceAutocompleteInput
            key={place}
            value={tempName}
            onChange={(val) => setTempName(val)}
            onPlaceSelected={handleLocationSelect}
          />
          <button
            onClick={handleApplyLocation}
            disabled={!tempLoc}
            className={`w-full px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-md ${
              tempLoc
                ? "bg-indigo-600 text-white hover:bg-indigo-700"
                : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
            }`}
          >
            {t.apply}
          </button>
        </div>
      )}

      {/* Loader / Results */}
      {loading ? (
        <div className="text-center py-16">
           <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600 mx-auto mb-4"></div>
           <p className="text-gray-500 font-medium">{t.loading}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <p className="text-gray-400">{t.noDates}</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <div
              key={index}
              className="group rounded-3xl bg-white border border-gray-100 p-5 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="bg-indigo-50 text-indigo-700 p-2 rounded-2xl">
                   <h3 className="text-sm font-bold">
                    📅 {new Date(item.date).toLocaleDateString(isHi ? "hi-IN" : "en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                  </h3>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-black uppercase text-gray-400 block mb-1">{t.score}</span>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${item.score >= 7 ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                    {item.score}/10
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                <strong>{t.day}</strong> {item.weekday}
              </p>

              <div className="space-y-2">
                {item.reasons.map((r, i) => (
                  <div key={i} className="flex gap-2 text-xs text-gray-600 leading-relaxed bg-gray-50 p-2 rounded-lg group-hover:bg-indigo-50/30 transition-colors">
                    <span>✨</span>
                    <p>{r}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}