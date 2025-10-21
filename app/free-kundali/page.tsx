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

// ✅ Schema.org JSON-LD
const schemaData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Free Kundali Generator",
  url: "https://www.jyotishasha.com/free-kundali",
  operatingSystem: "Web",
  applicationCategory: "Astrology Tool",
  offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", ratingCount: "1200" },
};

export default function FreeKundaliPage() {
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
    <section className="min-h-screen py-12 px-4 text-white bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* ✅ Structured Data */}
      <Script
        id="kundali-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-indigo-500/30">
        <h1 className="text-4xl font-bold text-center text-indigo-300 mb-3">
          🪐 Free Janma Kundali Online
        </h1>
        <p className="text-center text-gray-200 mb-8 leading-relaxed">
          Generate your <strong>Free Birth Chart</strong> instantly based on your{" "}
          <em>date, time</em> and <em>place of birth</em>. Powered by
          <strong> Jyotishasha Modern Astrology Engine</strong>.
        </p>

        {/* ✅ Kundali Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-indigo-200 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="e.g. Ravi Sharma"
              className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* DOB + TOB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-1">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                required
                className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-1">
                Time of Birth
              </label>
              <input
                type="time"
                name="tob"
                value={form.tob}
                onChange={handleChange}
                required
                className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              />
            </div>
          </div>

          {/* Place */}
          <div>
            <label className="block text-sm font-semibold text-indigo-200 mb-1">
              Place of Birth
            </label>
            <PlaceAutocompleteInput
              value={form.place}
              onChange={(val: string) =>
                setForm((prev) => ({
                  ...prev,
                  place: val,
                }))
              }
              onPlaceSelected={(place: { name: string; lat: number; lng: number }) => {
                console.log("📍 Selected place:", place);
                setForm((prev) => ({
                  ...prev,
                  place: place.name,
                  lat: place.lat.toString(),
                  lng: place.lng.toString(),
                }));
              }}
            />

          </div>

          {/* Gender + Language */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-1">
                Gender
              </label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option className="text-black" value="male">Male</option>
                <option className="text-black" value="female">Female</option>
                <option className="text-black" value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-indigo-200 mb-1">
                Language
              </label>
              <select
                name="language"
                value={form.language}
                onChange={handleChange}
                className="w-full border border-indigo-500/40 bg-transparent text-white rounded-xl px-4 py-2 focus:ring-2 focus:ring-indigo-400"
              >
                <option className="text-black" value="en">English</option>
                <option className="text-black" value="hi">Hindi</option>
              </select>
            </div>
          </div>

          {/* CTA */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-200"
          >
            🔮 Generate My Free Kundali
          </button>
        </form>

        {/* Footer Info */}
        <p className="text-center text-gray-300 mt-6 text-sm">
          100% Free | Accurate Janma Kundali | Modern Vedic Interpretation
        </p>
      </div>

      {/* ✅ SEO Footer Section */}
      <div className="max-w-3xl mx-auto mt-12 text-gray-200 text-sm leading-relaxed">
        <h2 className="text-lg font-semibold text-indigo-300 mb-2">
          Why Choose Jyotishasha Free Kundali?
        </h2>
        <p className="mb-3">
          Jyotishasha offers the most accurate and detailed{" "}
          <strong>Free Janma Kundali</strong> online. Using advanced algorithms and
          precise planetary data, it provides a comprehensive birth chart analysis
          including planetary positions, house strengths, yogas, and gemstone recommendations.
        </p>
        <p>
          Get instant insights into your personality, career, love life, and destiny —
          all based on your date, time, and place of birth. No login required, no hidden costs.
        </p>
      </div>
    </section>
  );
}
