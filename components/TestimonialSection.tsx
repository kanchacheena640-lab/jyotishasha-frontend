"use client";
import { useState, useEffect } from "react";

export default function TestimonialSection() {
  const testimonials = [
    { text: "A deeply insightful daily horoscope! It guided me well.", img: "/testimonials/user1.png", name: "Anjali Sharma" },
    { text: "The personalized horoscope felt so accurate and useful!", img: "/testimonials/user2.png", name: "Rahul Verma" },
    { text: "Amazing insights, I love the way predictions are explained.", img: "/testimonials/user3.png", name: "Pooja Mehta" },
    { text: "This service is life-changing, very precise and helpful.", img: "/testimonials/user4.png", name: "Aman Singh" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const current = testimonials[currentIndex];

  return (
    <section className="max-w-3xl mx-auto px-6 py-10 text-center">
      <div className="bg-[#1e1b4b] p-6 rounded-lg shadow-md transition-all duration-500">
        <img
          src={current.img}
          alt={current.name}
          className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-purple-400"
        />
        <blockquote className="text-lg md:text-xl italic text-purple-200 mb-4">
          “{current.text}”
        </blockquote>
        <p className="text-sm text-gray-300 mb-6">- {current.name}</p>
        <button className="px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition">
          Subscribe for Personalized Horoscope
        </button>
      </div>
    </section>
  );
}
