// components/ToolSuggestions.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { X } from 'lucide-react';

// hrefs are locale-neutral: free pages get the /hi prefix at render time (localizeHref below);
// /reports/* stays unprefixed because the paid report catalog is English-only.
const suggestionsMap: Record<string, { title: string; title_hi?: string; href: string; type: 'tool' | 'report'; emoji?: string }[]> = {
  // Mangal Dosh: marriage-related free next steps only -- its single paid next step is the Marriage Report card
  // in the result (components/tools/mangal-dosh/MangalDoshReportCta.tsx), so no unrelated report here.
  'mangal-dosh': [
    { title: 'Kundli Matching', title_hi: 'कुंडली मिलान', href: '/kundli-matching', type: 'tool', emoji: '💍' },
    { title: 'Marriage Path', title_hi: 'विवाह मार्ग', href: '/tools/marriage-path', type: 'tool', emoji: '💞' },
    { title: 'Chandra-Mangal Yog', title_hi: 'चंद्र-मंगल योग', href: '/tools/chandra-mangal', type: 'tool', emoji: '🌙' },
    { title: 'Full Kundali', title_hi: 'पूरी कुंडली', href: '/free-kundali', type: 'tool', emoji: '🌠' },
  ],
  'rashi-finder': [
    { title: 'Check Lagna (Ascendant)', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Full Kundali Generator', href: '/free-kundali', type: 'tool', emoji: '🌠' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Grah Dasha', href: '/tools/grah-dasha-finder', type: 'tool', emoji: '🌀' },
    { title: 'Love Life Prediction', href: '/reports/love_relationship_report', type: 'report', emoji: '❤️' },
  ],
  'lagna-finder': [
    { title: 'Rashi Finder', href: '/tools/rashi-finder', type: 'tool', emoji: '🔱' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Yog-Dosh Finder', href: '/tools', type: 'tool', emoji: '👍👎' },
    // Free page, not a paid report -- typed 'tool' so it carries the "Free" badge.
    { title: 'Monthly Horoscope', href: '/monthly-horoscope', type: 'tool', emoji: '🗓️' },
    { title: 'Sadhesati Report', href: '/reports/sadhesati_report', type: 'report', emoji: '🪐' },
  ],
  'grah-dasha-finder': [
    { title: 'Your Career', href: '/tools/career-path', type: 'tool', emoji: '📖' },
    { title: 'Your Love Life', href: '/tools/love-life', type: 'tool', emoji: '❤️' },
    { title: 'Foreign Travel', href: '/tools/foreign-travel', type: 'tool', emoji: '✈️' },
    { title: 'Lagna Finder', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Career Report', href: '/reports/career_report', type: 'report', emoji: '💼' },
  ],
  default: [
    { title: 'Rashi Finder', href: '/tools/rashi-finder', type: 'tool', emoji: '🔱' },
    { title: 'Lagna Finder', href: '/tools/lagna-finder', type: 'tool', emoji: '📜' },
    { title: 'Planet Overview', href: '/tools/planet-overview', type: 'tool', emoji: '🪐' },
    { title: 'Sadhesati Report', href: '/reports/sadhesati_report', type: 'report', emoji: '🪐' },
  ],
};

/** Free pages exist under both locales; the paid /reports catalog is English-only. */
function localizeHref(href: string, isHi: boolean): string {
  return isHi && !href.startsWith('/reports/') ? `/hi${href}` : href;
}

function SuggestionCard({
  title,
  href,
  type,
  emoji,
  isHi,
}: {
  title: string;
  href: string;
  type: 'tool' | 'report';
  emoji?: string;
  isHi?: boolean;
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
        {type === 'tool' ? (isHi ? 'फ्री' : 'Free') : (isHi ? 'प्रीमियम' : 'Premium')}
      </span>
    </Link>
  );
}


export default function ToolSuggestions({ toolId }: { toolId?: string | null }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const params = useParams();
  const isHi = params?.locale === 'hi';
  const fullList = suggestionsMap[toolId || ''] || suggestionsMap['default'];
  const tools = fullList.filter((item) => item.type === 'tool').slice(0, 4);
  const reports = fullList.filter((item) => item.type === 'report').slice(0, 2);
  const suggestions = [...tools, ...reports];

  return (
    <>
      {/* ✅ Suggestions Visible on All Screens */}
      <div className="flex flex-col gap-3 pr-2 pl-6">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-1 tracking-wide">{isHi ? 'आपके बारे में और जानें' : 'More About You'}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {suggestions.map((sug, i) => (
            <SuggestionCard key={i} title={isHi && sug.title_hi ? sug.title_hi : sug.title} type={sug.type} emoji={sug.emoji} isHi={isHi} href={localizeHref(sug.href, isHi)} />
          ))}
        </div>
      </div>
    </>
  );
}
