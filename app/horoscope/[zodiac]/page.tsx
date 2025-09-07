// ✅ FINAL CORRECT VERSION for Next.js 15.5.2 App Router

import React from "react";
import HoroscopeTabs from "./HoroscopeTabs";

// ✅ No Promise — directly typed params
type PageProps = {
  params: {
    zodiac: string;
  };
};

// ✅ Metadata function
export async function generateMetadata({
  params,
}: {
  params: { zodiac: string };
}) {
  const { zodiac } = params;
  return {
    title: `${zodiac.charAt(0).toUpperCase() + zodiac.slice(1)} Horoscope | Jyotishasha`,
    description: `Read your personalized ${zodiac} daily, monthly, and yearly horoscope.`,
  };
}

export default async function HoroscopeDetailPage({
  params,
}: {
  params: { zodiac: string };
}) {
  const { zodiac } = params;
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-4">{zodiac} Horoscope</h1>
      <HoroscopeTabs zodiacName={zodiac} />
    </div>
  );
}
