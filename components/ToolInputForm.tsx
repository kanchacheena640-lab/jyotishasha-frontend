'use client';

import React, { useState } from 'react';
import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import { useRouter } from 'next/navigation';

type ToolInputFormProps = {
  toolId?: string;
  onSubmit?: (data: any) => void;
};

const ToolInputForm = ({ toolId = 'rashi-finder', onSubmit }: ToolInputFormProps) => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [place, setPlace] = useState<{ lat: number; lng: number; name: string }>({
    lat: 0,
    lng: 0,
    name: '',
  });
  const [gender, setGender] = useState('Male');
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    console.log("🔥 CLICKED HANDLE SUBMIT"); 
    e.preventDefault();

    if (!name || !dob || !tob || !place.name || !place.lat || !place.lng || !gender || !language) {
      alert('Please fill all fields correctly.');
      return;
    }

    const formData = {
      name,
      dob,
      tob,
      gender,
      language,
      pob: place.name,
      latitude: place.lat,
      longitude: place.lng,
      toolId,
    };

    if (onSubmit) {
      onSubmit(formData); // ✅ custom handler
    } else {
      // ✅ default redirect
      const queryParams = new URLSearchParams(
        Object.entries(formData).reduce((acc, [key, val]) => {
          acc[key] = String(val);
          return acc;
        }, {} as Record<string, string>)
      ).toString();
      router.push(`/tool-result?${queryParams}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Date of Birth</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Time of Birth</label>
        <input
          type="time"
          value={tob}
          onChange={(e) => setTob(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-white text-black placeholder-gray-500 border border-gray-300"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Place of Birth</label>
        <PlaceAutocompleteInput
          value={place.name}
          onChange={(val) => setPlace((prev) => ({ ...prev, name: val }))}
          onPlaceSelected={(p) => setPlace(p)}
        />
      </div>

      <div className="flex space-x-4">
        {/* Gender */}
        <div className="w-1/2">
          <label className="block mb-1 font-medium">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Language */}
        <div className="w-1/2">
          <label className="block mb-1 font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
            className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
          </select>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Get Result
        </button>
      </div>
    </form>
  );
};

export type FormData = {
    name: string;
    dob: string;
    tob: string;
    pob: string;
    latitude: number;
    longitude: number;
    gender: string;
    language: 'en' | 'hi';
  };
  
export default ToolInputForm;
