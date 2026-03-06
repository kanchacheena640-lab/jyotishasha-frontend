"use client";

import { useState } from "react";
import HomePanchang from "@/components/home/HomePanchang";
import HomeDailyHoroscope from "@/components/home/HomeDailyHoroscope";
import HomeTransit from "@/components/home/HomeTransits";

interface Props {
  summary: any;
  panchang: any;
  transitData: any;
  events: any;
}

export default function HomeAstroSlider({
  summary,
  panchang,
  transitData,
  events,
}: Props) {

  const [slide, setSlide] = useState(0);

  const slides = [
    <HomeDailyHoroscope key="horoscope" data={summary} />,
    <HomePanchang key="panchang" data={panchang} events={events} />,
    <HomeTransit key="transit" data={transitData} />,
  ];

  const nextSlide = () => {
    setSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="w-full relative">

      {/* Slider */}
      <div className="overflow-hidden rounded-xl">
        <div
          className="transition-all duration-500 flex"
          style={{ transform: `translateX(-${slide * 100}%)` }}
        >
          {slides.map((component, index) => (
            <div key={index} className="min-w-full">
              {component}
            </div>
          ))}
        </div>
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="absolute left-2 top-1/2 -translate-y-1/2
        bg-[#1e1b4b] border border-purple-700
        text-white w-8 h-8 rounded-full
        flex items-center justify-center
        hover:bg-[#2a2565]"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="absolute right-2 top-1/2 -translate-y-1/2
        bg-[#1e1b4b] border border-purple-700
        text-white w-8 h-8 rounded-full
        flex items-center justify-center
        hover:bg-[#2a2565]"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 w-2 rounded-full ${
              slide === i ? "bg-yellow-400" : "bg-gray-500"
            }`}
          />
        ))}
      </div>

    </div>
  );
}