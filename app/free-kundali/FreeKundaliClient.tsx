"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Script from "next/script";

// ✅ Dynamic import for Google Places Autocomplete
const PlaceAutocompleteInput = dynamic(
  () => import("@/components/PlaceAutocompleteInput"),
  { ssr: false }
);

// ✅ Schema.org JSON-LD (tool-specific)
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Kundali Generator",
  url: "https://www.jyotishasha.com/free-kundali",
  operatingSystem: "Web",
  applicationCategory: "Astrology Tool",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "1200",
  },
};

export default function FreeKundaliClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    gender: "male",
    dob: "",
    tob: "",
    place: "",
    lat: "",
    lng: "",
    language: "en",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(form).toString();
    router.push(`/free-kundali/free-birthchart-result/?${params}`);
  };

  return (
    <>
      {/* ✅ Structured Data */}
      <Script
        id="kundali-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-indigo-500/30">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
            className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2"
          />

          {/* DOB + TOB */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              required
              className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2"
            />
            <input
              type="time"
              name="tob"
              value={form.tob}
              onChange={handleChange}
              required
              className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2"
            />
          </div>

          {/* Place */}
          <PlaceAutocompleteInput
            value={form.place}
            onChange={(val: string) =>
              setForm((prev) => ({ ...prev, place: val }))
            }
            onPlaceSelected={(place: {
              name: string;
              lat: number;
              lng: number;
            }) =>
              setForm((prev) => ({
                ...prev,
                place: place.name,
                lat: place.lat.toString(),
                lng: place.lng.toString(),
              }))
            }
          />

          {/* Gender + Language */}
          <div className="grid grid-cols-2 gap-4">
            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2"
            >
              <option className="text-black" value="male">Male</option>
              <option className="text-black" value="female">Female</option>
              <option className="text-black" value="other">Other</option>
            </select>

            <select
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2"
            >
              <option className="text-black" value="en">English</option>
              <option className="text-black" value="hi">Hindi</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
          >
            🔮 Generate My Free Kundali
          </button>
        </form>
      </div>
    </>
  );
}
