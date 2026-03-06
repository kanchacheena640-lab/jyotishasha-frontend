"use client";

import Link from "next/link";
import { reportsData } from "@/app/data/reportsData";

export default function HomeReports() {

  const previewReports = reportsData.slice(0, 6);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-12">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Astrology Reports
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Detailed personalized astrology reports
        </p>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

  {previewReports.map((report) => (
    <Link
      key={report.slug}
      href={`/reports/${report.slug}`}
      className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
      border border-purple-700 rounded-xl overflow-hidden
      hover:border-purple-500 transition"
    >

      {/* Square Image */}
      <div className="aspect-square w-full overflow-hidden">
        <img
          src={report.image}
          alt={report.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4 text-center">

        {/* Report Title */}
        <div className="text-white text-base md:text-lg font-semibold leading-snug">
          {report.title}
        </div>

        {/* Price */}
        <div className="text-yellow-400 text-sm md:text-base font-semibold mt-2">
          ₹{report.price}
        </div>

      </div>

    </Link>
  ))}

</div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          href="/reports"
          className="inline-block px-5 py-2 text-sm font-medium
          bg-purple-600 hover:bg-purple-500
          rounded-full transition"
        >
          Explore All Reports →
        </Link>
      </div>

    </div>
  );
}