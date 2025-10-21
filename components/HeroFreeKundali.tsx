"use client";
import Link from "next/link";
import Image from "next/image";

export default function HeroFreeKundali() {
  return (
    <section className="relative bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 text-white py-20 px-4 text-center rounded-3xl shadow-2xl overflow-hidden my-10">
      <div className="absolute inset-0 bg-[url('/stars-bg.svg')] opacity-20 bg-cover bg-center"></div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight">
          🪐 Free Janma Kundali Online – Get Your Personalized Birth Chart
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-100">
          Discover your planetary positions, houses, yogas, and doshas with
          Jyotishasha’s <strong>Free Kundali</strong> generator. Based on date,
          time, and place of birth.
        </p>

        <Link
          href="/free-kundali"
          prefetch
          className="inline-block bg-white text-indigo-700 font-semibold px-8 py-3 rounded-xl shadow-md hover:bg-indigo-100 hover:scale-105 transition-all duration-200"
        >
          Generate Your Free Kundali →
        </Link>

        <p className="text-sm mt-4 text-gray-200">
          100% Free | Accurate | Based on Vedic Astrology
        </p>
      </div>
    </section>
  );
}
