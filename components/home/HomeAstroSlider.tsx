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
  dict: any;   // 👈 New Prop
  lang: string; // 👈 New Prop
}

export default function HomeAstroSlider({
  summary,
  panchang,
  transitData,
  events,
  dict,
  lang,
}: Props) {
  const [slide, setSlide] = useState(0);

  // ✅ Wiring: Saare sub-components ko dict aur lang pass kiya
  const slides = [
    <HomeDailyHoroscope key="horoscope" data={summary} dict={dict} lang={lang} />,
    <HomePanchang key="panchang" data={panchang} events={events} dict={dict} lang={lang} />,
    <HomeTransit key="transit" data={transitData} dict={dict} lang={lang} />,
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
        aria-label="Previous Slide"
        className="absolute left-2 top-1/2 -translate-y-1/2
        bg-[#1e1b4b]/80 border border-purple-700
        text-white w-8 h-8 rounded-full
        flex items-center justify-center
        hover:bg-[#2a2565] z-10 transition-colors"
      >
        ‹
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        aria-label="Next Slide"
        className="absolute right-2 top-1/2 -translate-y-1/2
        bg-[#1e1b4b]/80 border border-purple-700
        text-white w-8 h-8 rounded-full
        flex items-center justify-center
        hover:bg-[#2a2565] z-10 transition-colors"
      >
        ›
      </button>

      {/* DOTS */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setSlide(i)}
            className={`h-2 w-2 rounded-full transition-all ${
              slide === i ? "bg-yellow-400 w-4" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
}