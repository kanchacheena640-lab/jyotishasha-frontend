import FreeKundaliClient from "./FreeKundaliClient";

export const revalidate = 86400; // SEO: static HTML + daily refresh

export default function FreeKundaliPage() {
  return (
    <section className="min-h-screen py-12 px-4 text-white bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">
      {/* ✅ SEO CONTENT (SERVER RENDERED) */}
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold text-indigo-300 mb-4">
          🪐 Free Janma Kundali Online
        </h1>

        <p className="text-gray-200 leading-relaxed">
          Generate your <strong>Free Janma Kundali</strong> using your date, time
          and place of birth. This free birth chart reveals planetary positions,
          houses, yogas and life insights based on authentic Vedic astrology.
        </p>

        <h2 className="text-xl font-semibold text-indigo-300 mt-6 mb-2">
          What You Get in Your Free Kundali
        </h2>
        <ul className="text-gray-200 text-sm space-y-1">
          <li>• Ascendant (Lagna) & Moon sign</li>
          <li>• Planetary placements with houses</li>
          <li>• Major yogas & doshas</li>
          <li>• Career, love and personality insights</li>
        </ul>
      </div>

      {/* ✅ CLIENT TOOL */}
      <FreeKundaliClient />
    </section>
  );
}
