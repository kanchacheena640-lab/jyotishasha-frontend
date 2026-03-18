// components/VedicNote.tsx

import Link from "next/link";

export default function VedicNote() {
  return (
    <aside className="mb-10 p-5 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-sm italic shadow-sm">
      <strong>Note:</strong> We use <strong>Vedic (Sidereal) Astrology</strong>, so your results may differ if you follow other systems like Western Astrology or Numerology.

      <br /><br />

      For accurate predictions, it’s essential to know your <strong>Ascendant (Lagna)</strong>.

      <br /><br />

      👉{" "}
      <Link
        href="/tools/lagna-finder"
        className="underline font-semibold hover:text-amber-700"
      >
        Use Ascendant Finder Tool
      </Link>
    </aside>
  );
}