'use client';

import React, { useState } from 'react';
import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useUserCache } from "@/lib/useUserCache";

type ToolInputFormProps = {
  toolId?: string;
  onSubmit?: (data: any) => void;
};

const toISODate = (d: Date) =>
  new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
    .toISOString()
    .slice(0, 10);

const toHHmm = (d: Date) => {
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  return `${hh}:${mm}`; // HH:mm format
};

const ToolInputForm = ({ toolId = 'rashi-finder', onSubmit }: ToolInputFormProps) => {
  const { userData, saveUserData } = useUserCache();

  const [name, setName] = useState(userData.name || '');
  const [dob, setDob] = useState(userData.dob || '');
  const [tob, setTob] = useState(userData.tob || '');
  const [place, setPlace] = useState<{ lat: number; lng: number; name: string }>(
    userData.coords && userData.place
      ? { lat: userData.coords.lat, lng: userData.coords.lng, name: userData.place }
      : { lat: 0, lng: 0, name: '' }
  );
  const [gender, setGender] = useState(userData.gender || 'Male');
  const [language, setLanguage] = useState<'en' | 'hi'>(userData.language || 'en');

    const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
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

    saveUserData({
      name,
      dob,
      tob,
      gender,
      language,
      place: place.name,
      coords: { lat: place.lat, lng: place.lng },
    });

    if (onSubmit) {
      onSubmit(formData);
    } else {
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
        <DatePicker
          selected={dob ? new Date(`${dob}T00:00:00`) : null}
          onChange={(date: Date | null) => setDob(date ? toISODate(date) : '')}
          placeholderText="Select your date of birth"
          dateFormat="dd-MM-yyyy"
          isClearable
          withPortal
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className="w-full px-4 py-2 rounded-lg bg-white text-black border border-gray-300"
        />
      </div>

      {/* Time of Birth */}
      <div>
        <label className="block mb-1 font-medium">Time of Birth</label>
        <div className="relative">
          {/* Left side static text like placeholder */}
          {!tob && (
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
              Time of Birth
            </span>
          )}
          <input
            type="time"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            className="w-full pl-28 pr-4 py-2 rounded-lg bg-white text-black border border-gray-300"
            required
          />
        </div>
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
