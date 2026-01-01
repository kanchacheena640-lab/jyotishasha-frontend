"use client";

import { ASCENDANTS } from "./ascendants";

const RASHI_INDEX: Record<string, number> = {
  Aries:1, Taurus:2, Gemini:3, Cancer:4, Leo:5, Virgo:6,
  Libra:7, Scorpio:8, Sagittarius:9, Capricorn:10, Aquarius:11, Pisces:12
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
    <section className="mt-14">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Ascendant-wise Effects of {planet} Transit
      </h2>

      <div className="grid sm:grid-cols-2 gap-6">
        {ASCENDANTS.map((asc, i) => {
          const house = getHouse(asc, planetRashi);

          return (
            <div key={asc} className="bg-white rounded-xl p-5 shadow">
              <h3 className="font-semibold text-lg mb-1">
                {asc} Ascendant
              </h3>

              <p className="text-sm text-gray-700 mb-3">
                For {asc} ascendant, {planet} transits the {house} house,
                activating matters related to this house theme.
              </p>

              {/* 🔮 Future backend hook */}
              {/* effect_json[planet][asc][house] */}

              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">House {house}</span>
                <a
                  href="/app-download"
                  className="text-purple-600 font-medium"
                >
                  Get personal report →
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
