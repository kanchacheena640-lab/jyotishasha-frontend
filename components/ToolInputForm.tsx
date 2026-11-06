'use client';

import React, { useState, useId } from 'react';
import PlaceAutocompleteInput from './PlaceAutocompleteInput';
import { useRouter } from 'next/navigation';
import DatePicker, { registerLocale } from 'react-datepicker';
import { hi as hiLocale } from 'date-fns/locale/hi';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { useUserCache } from "@/lib/useUserCache";
import { useEffect } from "react"; // 🆕 add this

// Hindi month/weekday names in the /hi calendar (display only; the field shows DD-MM-YYYY, state stays YYYY-MM-DD).
registerLocale('hi', hiLocale);

type ToolInputFormProps = {
  toolId?: string;
  onSubmit?: (data: any) => void;
  /** Route locale. Sets the labels and the default result language (/hi -> Hindi). */
  locale?: 'en' | 'hi';
  /** Optional tool-specific submit label (defaults to "Get Result"). */
  submitLabel?: string;
  /** True while the parent is calculating: the button is disabled and says so. */
  busy?: boolean;
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

const COPY = {
  en: {
    name: 'Name', namePh: 'Enter your name', dob: 'Date of Birth', tob: 'Time of Birth', pob: 'Place of Birth',
    pobPh: 'Type and pick your birth place', gender: 'Gender', language: 'Result language',
    genders: { Male: 'Male', Female: 'Female', Other: 'Other' }, submit: 'Get Result', busy: 'Calculating...',
    errName: 'Please enter your name.', errDob: 'Please enter your date of birth (DD-MM-YYYY).',
    errTob: 'Please enter your time of birth.', errPob: 'Please type your birth place and pick it from the list.',
  },
  hi: {
    name: 'नाम', namePh: 'अपना नाम लिखें', dob: 'जन्म तिथि', tob: 'जन्म समय', pob: 'जन्म स्थान',
    pobPh: 'जन्म स्थान लिखें और सूची से चुनें', gender: 'लिंग', language: 'परिणाम की भाषा',
    genders: { Male: 'पुरुष', Female: 'महिला', Other: 'अन्य' }, submit: 'परिणाम देखें', busy: 'गणना जारी है...',
    errName: 'कृपया अपना नाम लिखें।', errDob: 'कृपया अपनी जन्म तिथि (DD-MM-YYYY) डालें।',
    errTob: 'कृपया अपना जन्म समय डालें।', errPob: 'कृपया जन्म स्थान लिखें और सूची से चुनें।',
  },
} as const;

const ToolInputForm = ({ toolId = 'rashi-finder', onSubmit, locale, submitLabel, busy = false }: ToolInputFormProps) => {
  const { userData, saveUserData } = useUserCache();
  const t = COPY[locale === 'hi' ? 'hi' : 'en'];

  const [name, setName] = useState(userData.name || '');
  const [dob, setDob] = useState(userData.dob || '');
  const [tob, setTob] = useState(userData.tob || '');
  const [place, setPlace] = useState<{ lat: number; lng: number; name: string }>(
    userData.coords && userData.place
      ? { lat: userData.coords.lat, lng: userData.coords.lng, name: userData.place }
      : { lat: 0, lng: 0, name: '' }
  );
  const [gender, setGender] = useState(userData.gender || 'Male');
  // The route locale decides the default result language (a Hindi page asks the backend for Hindi);
  // the visitor can still switch it with the select. Without a locale the cached choice applies as before.
  const [language, setLanguage] = useState<'en' | 'hi'>(locale || userData.language || 'en');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userData) {
      if (userData.name) setName(userData.name);
      if (userData.dob) setDob(userData.dob);
      if (userData.tob) setTob(userData.tob);
      if (userData.gender) setGender(userData.gender);
      if (userData.language && !locale) setLanguage(userData.language);

      if (userData.coords && userData.place) {
        setPlace({ lat: userData.coords.lat, lng: userData.coords.lng, name: userData.place });
      }
    }
  }, [userData, locale]);

    const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (busy) return;

    // Same required fields as before; the first missing one is named inline (no blocking browser dialog).
    const missing = !name.trim() ? t.errName : !dob ? t.errDob : !tob ? t.errTob : !place.name || !place.lat || !place.lng ? t.errPob : null;
    if (missing || !gender || !language) {
      setError(missing || t.errPob);
      return;
    }
    setError(null);

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

  // Presentation: programmatic labels, navy text on the white card (>= 4.5:1), 16px text, 48px targets.
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;
  const labelClass = 'block mb-1.5 text-[15px] font-semibold text-[#1B2A4A]';
  const fieldClass =
    'block w-full min-h-[48px] px-4 rounded-xl bg-white text-[16px] text-[#1B2A4A] placeholder:text-[#6B7489] border border-[#B9AE9C] focus:border-[#1B2A4A] focus:outline-none focus:ring-2 focus:ring-[#1B2A4A]/30';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="max-w-xl mx-auto bg-white p-5 sm:p-6 rounded-2xl border border-[#E8DDC9] shadow-[0_1px_2px_rgba(27,42,74,0.06)] space-y-4 text-[#1B2A4A]"
    >
      <div>
        <label htmlFor={id('name')} className={labelClass}>{t.name}</label>
        <input
          id={id('name')}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePh}
          autoComplete="name"
          className={fieldClass}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 min-[380px]:grid-cols-2">
        <div className="min-w-0">
          <label htmlFor={id('dob')} className={labelClass}>{t.dob}</label>
          <DatePicker
            id={id('dob')}
            selected={dob ? new Date(`${dob}T00:00:00`) : null}
            onChange={(date: Date | null) => setDob(date ? toISODate(date) : '')}
            placeholderText="DD-MM-YYYY"
            dateFormat="dd-MM-yyyy"
            locale={locale === 'hi' ? 'hi' : undefined}
            isClearable
            withPortal
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            autoComplete="off"
            maxDate={new Date()}
            wrapperClassName="block w-full"
            className={fieldClass.replace('px-4', 'px-3')}
          />
        </div>

        {/* Time of Birth */}
        <div className="min-w-0">
          <label htmlFor={id('tob')} className={labelClass}>{t.tob}</label>
          <input
            id={id('tob')}
            type="time"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            className={fieldClass.replace('px-4', 'px-3')}
          />
        </div>
      </div>

      <div>
        <label htmlFor={id('pob')} className={labelClass}>{t.pob}</label>
        <PlaceAutocompleteInput
          id={id('pob')}
          placeholder={t.pobPh}
          className={fieldClass}
          value={place.name}
          onChange={(val) => setPlace((prev) => ({ ...prev, name: val }))}
          onPlaceSelected={(p) => setPlace(p)}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="min-w-0">
          <label htmlFor={id('gender')} className={labelClass}>{t.gender}</label>
          <select
            id={id('gender')}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={fieldClass}
          >
            <option value="Male">{t.genders.Male}</option>
            <option value="Female">{t.genders.Female}</option>
            <option value="Other">{t.genders.Other}</option>
          </select>
        </div>

        <div className="min-w-0">
          <label htmlFor={id('language')} className={labelClass}>{t.language}</label>
          <select
            id={id('language')}
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'en' | 'hi')}
            className={fieldClass}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
          </select>
        </div>
      </div>

      {error && (
        <p role="alert" data-testid="tool-form-error" className="rounded-xl border border-[#C0392B]/40 bg-[#FDF0EE] px-4 py-3 text-[15px] leading-snug text-[#8A2A1F]">
          {error}
        </p>
      )}

      <div className="pt-2">
        <button
          type="submit"
          disabled={busy}
          aria-busy={busy}
          className="flex w-full min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-6 text-[16px] font-bold text-white transition hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {busy ? t.busy : submitLabel || t.submit}
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
