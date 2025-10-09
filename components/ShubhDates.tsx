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
  params: { tool?: string };
}

export default function ShubhDates({ params }: ShubhDatesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔮 Mapping frontend slug → backend key
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
  const place = decodeURIComponent(searchParams.get("place") || "Lucknow");

  const [results, setResults] = useState<MuhurthaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPicker, setShowPicker] = useState(false);
  const [tempLoc, setTempLoc] = useState<{ lat: number; lng: number; name: string } | null>(null);
  const [tempName, setTempName] = useState(place);

  // 🪔 Fetch from backend
  useEffect(() => {
    async function fetchDates() {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/muhurth/list`, {
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

  // 📍 Called when user selects location from autocomplete
  const handleLocationSelect = (loc: { lat: number; lng: number; name: string }) => {
    setTempLoc(loc);
    setTempName(loc.name);
  };

  // 📍 Apply new location
  const handleApplyLocation = () => {
    if (!tempLoc) return;
    const newUrl = `/panchang/tools/${toolSlug}?lat=${tempLoc.lat}&lng=${tempLoc.lng}&place=${encodeURIComponent(
      tempLoc.name
    )}`;
    router.replace(newUrl);
    setTimeout(() => (window.location.href = newUrl), 100);
  };

  return (
    <div key={`${lat}-${lng}-${place}`} className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-600 text-sm">
          Showing results for{" "}
          <span className="font-medium text-purple-700">{place}</span>
        </p>
        <button
          onClick={() => setShowPicker(!showPicker)}
          className="px-4 py-2 rounded-lg text-sm bg-purple-600 text-white hover:bg-purple-700 transition"
        >
          {showPicker ? "Cancel" : "Change Location"}
        </button>
      </div>

      {/* Location Picker */}
      {showPicker && (
        <div className="mb-6 space-y-3">
          <PlaceAutocompleteInput
            key={place}
            value={tempName}
            onChange={(val) => setTempName(val)}
            onPlaceSelected={handleLocationSelect}
          />
          <button
            onClick={handleApplyLocation}
            disabled={!tempLoc}
            className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition ${
              tempLoc
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            ✅ Apply Location
          </button>
        </div>
      )}

      {/* Loader / Results */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading Shubh Muhurtha...</div>
      ) : results.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          No auspicious dates found for this location.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-gradient-to-b from-purple-50 to-pink-50 p-4 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-purple-800">
                  📅 {new Date(item.date).toLocaleDateString("en-GB")}
                </h3>
                <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                  {item.score}/10
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Day:</strong> {item.weekday}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                {item.reasons.map((r, i) => (
                  <li key={i}>🌸 {r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
