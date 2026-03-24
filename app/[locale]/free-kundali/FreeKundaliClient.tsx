"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import dynamic from "next/dynamic";

const PlaceAutocompleteInput = dynamic(
  () => import("@/components/PlaceAutocompleteInput"),
  { ssr: false }
);

export default function FreeKundaliClient() {
  const router = useRouter();
  const { locale } = useParams();
  const isHi = locale === 'hi';

  const [form, setForm] = useState({
    name: "",
    gender: "male",
    dob: "",
    tob: "",
    place: "",
    lat: "",
    lng: "",
    language: Array.isArray(locale) ? locale[0] : (locale || "en"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData: Record<string, string> = {
      ...form,
      language: Array.isArray(locale) ? locale[0] : (locale || "en"),
    };

    const queryParams = new URLSearchParams(formData).toString();
    const pathPrefix = isHi ? '/hi' : '';
    router.push(`${pathPrefix}/free-kundali/free-birthchart-result/?${queryParams}`);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-indigo-500/30">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Name Input */}
        <input
          name="name"
          type="text"
          placeholder={isHi ? "पूरा नाम *" : "Full Name *"}
          value={form.name}
          onChange={handleChange}
          className="w-full bg-transparent border border-indigo-500/40 rounded-xl px-4 py-2 text-white outline-none focus:border-indigo-400"
          required
        />

        {/* DOB + TOB: Styled Version (Duplicate removed) */}
        <div className="grid grid-cols-2 gap-4">
          <input 
            type="date" 
            name="dob" 
            value={form.dob}
            onChange={handleChange} 
            required 
            className="w-full bg-[#1e293b] border border-indigo-500/40 text-white p-2 rounded-xl outline-none focus:border-indigo-400" 
          />
          <input 
            type="time" 
            name="tob" 
            value={form.tob}
            onChange={handleChange} 
            required 
            className="w-full bg-[#1e293b] border border-indigo-500/40 text-white p-2 rounded-xl outline-none focus:border-indigo-400" 
          />
        </div>

        {/* Place Input */}
        <PlaceAutocompleteInput
          value={form.place}
          onChange={(val: string) => setForm((prev) => ({ ...prev, place: val }))}
          onPlaceSelected={(place: any) =>
            setForm((prev) => ({
              ...prev,
              place: place.name,
              lat: place.lat.toString(),
              lng: place.lng.toString(),
            }))
          }
        />

        {/* Gender + Language Selection */}
        <div className="grid grid-cols-2 gap-4">
          <select 
            name="gender" 
            value={form.gender}
            onChange={handleChange} 
            className="bg-[#1e293b] p-2 rounded-xl text-white border border-indigo-500/40 outline-none cursor-pointer"
          >
            <option value="male" className="bg-[#1e293b] text-white">{isHi ? "पुरुष" : "Male"}</option>
            <option value="female" className="bg-[#1e293b] text-white">{isHi ? "महिला" : "Female"}</option>
          </select>

          <select 
            name="language" 
            value={form.language} 
            onChange={handleChange} 
            className="bg-[#1e293b] p-2 rounded-xl text-white border border-indigo-500/40 outline-none cursor-pointer"
          >
            <option value="en" className="bg-[#1e293b] text-white">English</option>
            <option value="hi" className="bg-[#1e293b] text-white">हिंदी</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 py-4 rounded-xl font-bold text-white transition-all transform active:scale-95">
          {isHi ? "🔮 फ्री कुंडली प्राप्त करें" : "🔮 Generate Free Kundali"}
        </button>
      </form>
    </div>
  );
}