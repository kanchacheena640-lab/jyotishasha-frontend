"use client";

import Image from "next/image";

interface Props {
  profile: any;
  moonTraits: any;
  language: string;
}

export default function KundaliProfileHeader({ profile, moonTraits, language }: Props) {
  const isHi = language === "hi";

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-6">
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold drop-shadow-sm bg-gradient-to-r from-purple-300 to-yellow-300 bg-clip-text text-transparent">
          {isHi ? "🪐 ऑनलाइन जन्म कुंडली रिपोर्ट" : "🪐 Janma Kundali Report"}
        </h1>
        <div className="mt-2">
          <p className="text-lg">
            {isHi ? "नाम:" : "Prepared for"} <strong className="text-white font-bold">{profile?.name}</strong>
          </p>
          <p className="text-sm text-purple-300/70">
            {profile?.dob} | {profile?.tob}
          </p>
          <p className="text-sm text-purple-300/70 italic">
            {profile?.place}
          </p>
        </div>
      </div>

      {/* 🌙 Moon Sign / Zodiac Image (Original Logic) */}
      {moonTraits?.image && (
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
          <Image
            src={moonTraits.image}
            alt={moonTraits.title || "Zodiac"}
            width={90}
            height={90}
            className="relative rounded-full shadow-2xl border border-white/10"
          />
        </div>
      )}
    </div>
  );
}