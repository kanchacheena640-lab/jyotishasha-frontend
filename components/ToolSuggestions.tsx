// components/ToolSuggestions.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const suggestionsMap: Record<string, { title: string; href: string; type: 'tool' | 'report'; emoji?: string }[]> = {
  'rashi-finder': [
    { title: 'Check Lagna (Ascendant)', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Full Kundali Generator', href: '/tools/kundali-generator', type: 'tool', emoji: '🌠' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Grah Dasha', href: '/tools/grah-dasha', type: 'tool', emoji: '🌀' },
    { title: 'Personalized Rashi Report', href: '/reports/rashi-personal', type: 'report', emoji: '📖' },
    { title: 'Love Life Prediction', href: '/reports/love-life', type: 'report', emoji: '❤️' },
  ],
  'lagna-finder': [
    { title: 'Rashi Finder', href: '/tools/rashi-finder', type: 'tool', emoji: '🔱' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Live Transit', href: '/tools/live-transit', type: 'tool', emoji: '🌠' },
    { title: 'Yog-Dosh Finder', href: '/tools/yog-dosh-finder', type: 'tool', emoji: '👍👎' },
    { title: 'Monthly Horoscope', href: '/reports/monthly-horoscope', type: 'report', emoji: '🗓️' },
    { title: 'Sadhesati Report', href: '/reports/sadhesati-report', type: 'report', emoji: '🪐' },
  ],
  'grah-dasha-finder': [
    { title: 'Your Career', href: '/tools/your-career', type: 'tool', emoji: '📖' },
    { title: 'Your Love Life', href: '/tools/your-love-life', type: 'tool', emoji: '❤️' },
    { title: 'Foreign Travel', href: '/tools/foreign-travel', type: 'tool', emoji: '✈️' },
    { title: 'Lagna Finder', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Career Report', href: '/reports/career-dasha', type: 'report', emoji: '💼' },
    { title: 'Planetary Report', href: '/reports/remedies', type: 'report', emoji: '🌿' },
  ],
  default: [
    { title: 'Rashi Finder', href: '/tools/rashi-finder', type: 'tool', emoji: '🔱' },
    { title: 'Lagna Finder', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Live Transit', href: '/tools/live-transit', type: 'tool', emoji: '🌠' },
    { title: 'Sadhesati Report', href: '/reports/sadhesati-report', type: 'report', emoji: '🪐' },
    { title: 'B. Timing Report', href: '/reports/best-time-start', type: 'report', emoji: '📈' },
  ],
};

function SuggestionCard({
  title,
  href,
  type,
  emoji,
}: {
  title: string;
  href: string;
  type: 'tool' | 'report';
  emoji?: string;
}) {
  return (
    <Link
      href={href}
      className="w-full bg-[#f1f0ff] rounded-xl p-4 shadow-sm hover:shadow-md hover:scale-105 transition transform duration-300 flex flex-col items-center justify-center"
    >
      <div className="text-3xl mb-2">{emoji}</div>
      <span className="block text-base font-semibold text-gray-900">{title}</span>
      <span
        className={`mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm ring-1 ring-inset ${
          type === 'tool'
            ? 'text-green-700 bg-green-100 ring-green-200'
            : 'text-yellow-800 bg-yellow-100 ring-yellow-200'
        }`}
      >
        {type === 'tool' ? 'Free' : 'Premium'}
      </span>
    </Link>
  );
}


export default function ToolSuggestions({ toolId }: { toolId?: string | null }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fullList = suggestionsMap[toolId || ''] || suggestionsMap['default'];
  const tools = fullList.filter((item) => item.type === 'tool').slice(0, 4);
  const reports = fullList.filter((item) => item.type === 'report').slice(0, 2);
  const suggestions = [...tools, ...reports];

  return (
    <>
      {/* ✅ Desktop Card Layout */}
      <div className="hidden md:flex flex-col gap-3 pr-2 pl-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-1 tracking-wide">More About You</h2>
        <div className="grid grid-cols-6 gap-4">
          {suggestions.map((sug, i) => (
            <SuggestionCard key={i} {...sug} />
          ))}
        </div>
      </div>

      {/* ✅ Suggestions Visible on All Screens */}
      <div className="flex flex-col gap-3 pr-2 pl-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-1 tracking-wide">More About You</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {suggestions.map((sug, i) => (
            <SuggestionCard key={i} {...sug} />
          ))}
        </div>
      </div>
    </>
  );
}
