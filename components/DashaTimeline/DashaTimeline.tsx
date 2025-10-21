"use client";

import React, { useState } from "react";
import DashaCard from "./DashaCard";

interface Antardasha {
  planet: string;
  start: string;
  end: string;
}

interface Mahadasha {
  mahadasha: string;
  start: string;
  end: string;
  antardashas: Antardasha[];
}

interface CurrentBlock {
  mahadasha: string;
  antardasha: string;
}

interface Props {
  mahadashas: Mahadasha[];
  current?: CurrentBlock;
}

export default function DashaTimeline({ mahadashas, current }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  console.log("📊 DashaTimeline data:", mahadashas);

  if (!mahadashas?.length)
    return (
      <p className="text-gray-400 text-center italic py-4">
        No Mahadasha data found.
      </p>
    );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {mahadashas.map((item, i) => (
        <DashaCard
          key={i}
          data={item}
          index={i}
          openIndex={openIndex}
          setOpenIndex={setOpenIndex}
          current={current}
        />
      ))}
    </div>
  );
}
