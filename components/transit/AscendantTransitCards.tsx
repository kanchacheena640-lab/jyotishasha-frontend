"use client";

import { ASCENDANTS } from "./ascendants";

const RASHI_INDEX: Record<string, number> = {
  Aries: 1, Taurus: 2, Gemini: 3, Cancer: 4, Leo: 5, Virgo: 6,
  Libra: 7, Scorpio: 8, Sagittarius: 9, Capricorn: 10, Aquarius: 11, Pisces: 12
};

function getHouse(asc: string, rashi: string) {
  return ((RASHI_INDEX[rashi] - RASHI_INDEX[asc] + 12) % 12) + 1;
}

export default function AscendantTransitCards({
  planet,
  planetRashi,
}: {
  planet: string;
  planetRashi: string;
}) {
  return (
    <section className="mt-16">
      <h2 className="text-2xl font-semibold mb-8 text-center text-black">
        Ascendant-wise Effects of {planet} Transit
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {ASCENDANTS.map((asc) => {
          const house = getHouse(asc, planetRashi);

          return (
            <div
              key={asc}
              className="bg-blue-900 rounded-xl p-5 shadow-lg text-white"
            >
              <h3 className="font-semibold text-lg mb-2 text-white">
                {asc} Ascendant
              </h3>

              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                For {asc} ascendant, {planet} transits the {house} house,
                activating themes connected with this area of life. The results
                depend on dignity, strength and personal effort.
              </p>

              {/* Bottom info */}
              <div className="text-sm text-blue-200 mb-2">
                Activated House: {house}
              </div>

              {/* CTA – new line */}
              <a
                href="/app-download"
                className="inline-block text-sm font-semibold text-white underline hover:text-yellow-300 transition"
              >
                Get the app for personalized guidance  →
              </a>
            </div>
          );
        })}
      </div>
    </section>
  );
}
