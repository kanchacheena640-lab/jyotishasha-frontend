'use client';

import React, { useEffect, useState } from 'react';
import KundaliChartNorth from './KundaliChartNorth';
import { fetchFullKundali } from "@/utils/fetchFullKundali";
import { fetchCurrentTransits } from "@/utils/fetchCurrentTransits";

type Props = {
  name: string;
  dob: string;
  tob: string;
  latitude: number;
  longitude: number;
  language: 'en' | 'hi';
  kundaliData: any;
};

export default function KundaliWithTransit({ name, dob, tob, latitude, longitude, language }: Props) {
  const [lagnaRashi, setLagnaRashi] = useState<number | null>(null);
  const [planets, setPlanets] = useState<any[]>([]);
  const [transits, setTransits] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kundaliData = await fetchFullKundali({ toolId: 'kundali-generator', name, dob, tob, latitude, longitude, language });
        const transitData = await fetchCurrentTransits();

        setLagnaRashi(kundaliData?.lagna_number || 1); // fallback to 1
        const natal = kundaliData?.planets || [];
            const transiting = (transitData?.planets || []).map((info: any) => ({
            name: info.name,
            ...info
            }));
        setPlanets([...natal, ...transiting]);
      } catch (error) {
        console.error("Error loading kundali or transits", error);
      }
    };

    fetchData();
  }, [name, dob, tob, latitude, longitude, language]);

  if (lagnaRashi === null || planets.length === 0) {
    return <div className="text-center text-white p-4">Loading Kundali & Transits...</div>;
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4 text-white">Your Kundali + Transit View</h2>
      <KundaliChartNorth planets={planets} lagnaRashi={lagnaRashi} size={400} />
    </div>
  );
}
