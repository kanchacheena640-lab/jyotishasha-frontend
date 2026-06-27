"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const KundaliChartNorth = dynamic(() => import("@/components/KundaliChartNorth"), {
  ssr: false,
});

interface Props {
  data: any;
  lagnaRashi: number;
  isHi: boolean;
}

export default function KundaliChartPanel({ data, lagnaRashi, isHi }: Props) {
  const [chartSize, setChartSize] = useState(300);

  useEffect(() => {
    const update = () => setChartSize(Math.min(window.innerWidth * 0.85, 300));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className="max-w-[300px] w-full mx-auto aspect-square rounded-2xl overflow-hidden border-2 border-purple-500/30 shadow-[0_0_40px_rgba(124,58,237,0.4)] bg-white flex items-center justify-center">
      {data.chart_data?.planets ? (
        <KundaliChartNorth
          planets={data.chart_data.planets}
          lagnaRashi={lagnaRashi}
          size={chartSize}
        />
      ) : data.chart_image ? (
        <Image
          src={data.chart_image}
          alt="Kundali Chart"
          width={300}
          height={300}
          className="w-full h-full object-contain"
        />
      ) : (
        <p className="text-indigo-900 text-center px-4">
          {isHi ? "चार्ट उपलब्ध नहीं है" : "Chart unavailable"}
        </p>
      )}
    </div>
  );
}
