"use client";

import Link from "next/link";
import { toolsData } from "@/app/data/toolsData";

export default function HomeTools() {

  const previewTools = toolsData.slice(1, 7);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-10">

      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold text-white">
          Free Astrology Tools
        </h2>
        <p className="text-gray-400 text-sm mt-2">
          Quick insights from your birth chart
        </p>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

        {previewTools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className="bg-gradient-to-br from-[#1e1b4b] to-[#312e81]
            border border-purple-700 rounded-xl p-4
            hover:border-purple-500 transition
            flex flex-col justify-between"
          >

            <div className="text-2xl mb-2">
              {tool.emoji}
            </div>

            <div className="text-white font-semibold text-sm">
              {tool.title}
            </div>

            {tool.badge && (
              <div className="text-xs text-yellow-400 mt-1">
                {tool.badge}
              </div>
            )}

          </Link>
        ))}

      </div>

      {/* CTA */}
      <div className="text-center mt-8">
        <Link
          href="/tools"
          className="inline-block px-5 py-2 text-sm font-medium
          bg-purple-600 hover:bg-purple-500
          rounded-full transition"
        >
          Explore All Tools →
        </Link>
      </div>

    </div>
  );
}