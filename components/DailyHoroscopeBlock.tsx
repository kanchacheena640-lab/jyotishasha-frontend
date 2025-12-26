"use client";

import { useEffect, useState } from "react";

interface Props {
  sign: string;
  lang?: "en" | "hi";
}

export default function DailyHoroscopeBlock({ sign, lang = "en" }: Props) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://jyotishasha-backend.onrender.com/api/daily-horoscope?sign=${sign}&lang=${lang}`
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sign, lang]);

  if (loading) return <p>Loading today’s horoscope…</p>;
  if (!data || data.error) return <p>Horoscope not available.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{data.heading}</h3>

      <p className="text-gray-800">{data.intro}</p>

      <p className="text-gray-800">{data.paragraph}</p>

      <div className="flex gap-6 text-sm text-gray-700">
        <span>🎨 Lucky Color: {data.lucky_color}</span>
        <span>🔢 Lucky Number: {data.lucky_number}</span>
      </div>

      <p className="italic text-gray-600">{data.tips}</p>
    </div>
  );
}
