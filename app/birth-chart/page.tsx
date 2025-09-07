'use client';
import React, { useEffect, useState } from 'react';
import KundaliChartNorth from '@/components/KundaliChartNorth';

export default function BirthChartPage() {
  const [planets, setPlanets] = useState<{ name: string; house: number }[]>([]);
  const [lagnaRashi, setLagnaRashi] = useState<number>(1);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/api/full-kundali', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'Ravi',
            dob: '1985-03-31',
            tob: '19:45',
            latitude: 26.8466937,
            longitude: 80.946166,
          }),
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();

        // lagna_sign -> number
        const map: Record<string, number> = {
          Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4,
          Leo: 5, Virgo: 6, Libra: 7, Scorpio: 8,
          Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12,
        };
        setLagnaRashi(map[data?.lagna_sign] || 1);

        // 🔥 KEY: make flat clean array expected by chart
        const arr = Array.isArray(data?.Planets) ? data.Planets : [];
        const cleaned = arr
          .filter((p: any) => p?.name && !/ascendant/i.test(p.name))
          .map((p: any) => ({
            name: String(p.name),
            house: typeof p.house === 'string' ? parseInt(p.house, 10) : Number(p.house),
          }))
          .filter((p: any) => Number.isFinite(p.house) && p.house >= 1 && p.house <= 12);
        setPlanets(cleaned);
      } catch (e: any) {
        console.error(e);
        setErr('Failed to fetch');
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Birth Chart</h1>
      {err && <p className="text-red-500">{err}</p>}
      <KundaliChartNorth planets={planets} lagnaRashi={lagnaRashi} size={400} />
    </div>
  );
}
