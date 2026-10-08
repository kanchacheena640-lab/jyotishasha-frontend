// lib/tithi/tithiIndexFromNumber.ts
//
// Maps the Panchang API's tithi number (selected_date.tithi.number, 1-30)
// to an index in app/data/tithiData.ts, whose order is:
//   0-13 Pratipada..Chaturdashi, 14 Purnima, 15 Amavasya.
//
// The number is language-independent, unlike tithi.name (English
// "Dvitiya" vs Hindi "द्वितीया"), so the same lookup works for /panchang/tithi
// and /hi/panchang/tithi. Anything that is not an integer 1-30 returns null
// (no fallback tithi is ever guessed).

export function tithiIndexFromNumber(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 1 || value > 30) {
    return null;
  }
  if (value <= 15) return value - 1; // Shukla Pratipada..Chaturdashi -> 0-13, Purnima -> 14
  if (value <= 29) return value - 16; // Krishna Pratipada..Chaturdashi -> 0-13
  return 15; // 30 = Amavasya
}
