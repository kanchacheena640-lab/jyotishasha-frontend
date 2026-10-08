// lib/tithiIndexFromNumber.test.ts

/**
 * TITHI-02 -- Today's Tithi hero lookup on /panchang/tithi and /hi/panchang/tithi.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/tithiIndexFromNumber.test.ts
 *   node .ts-test-out/lib/tithiIndexFromNumber.test.js
 */

import * as fs from "fs";
import * as path from "path";
import { tithiIndexFromNumber } from "./tithi/tithiIndexFromNumber";
import { tithiData } from "../app/data/tithiData";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean) {
  if (condition) {
    passed += 1;
    console.log(`  PASS: ${label}`);
  } else {
    failed += 1;
    console.log(`  FAIL: ${label}`);
  }
}

const ROOT = path.resolve(__dirname, "..", "..");

// Expected tithi for every API number (Shukla 1-15, Krishna 16-30).
const EXPECTED_SLUGS = [
  "pratipada", "dwitiya", "tritiya", "chaturthi", "panchami", "shashthi", "saptami",
  "ashtami", "navami", "dashami", "ekadashi", "dwadashi", "trayodashi", "chaturdashi",
  "purnima",
  "pratipada", "dwitiya", "tritiya", "chaturthi", "panchami", "shashthi", "saptami",
  "ashtami", "navami", "dashami", "ekadashi", "dwadashi", "trayodashi", "chaturdashi",
  "amavasya",
];

// ===========================================================================
console.log("1. tithiData order assumed by the mapping");
// ===========================================================================
check("tithiData has 16 entries", tithiData.length === 16);
check("tithiData order: Pratipada..Chaturdashi, Purnima, Amavasya",
  JSON.stringify(tithiData.map((t) => t.slug)) === JSON.stringify(EXPECTED_SLUGS.slice(0, 15).concat("amavasya")));

// ===========================================================================
console.log("2. All 30 API tithi numbers");
// ===========================================================================
for (let n = 1; n <= 30; n++) {
  const idx = tithiIndexFromNumber(n);
  const slug = idx === null ? null : tithiData[idx]?.slug;
  check(`number ${n} -> ${EXPECTED_SLUGS[n - 1]}`, slug === EXPECTED_SLUGS[n - 1]);
}
check("15 -> Purnima index 14", tithiIndexFromNumber(15) === 14);
check("30 -> Amavasya index 15", tithiIndexFromNumber(30) === 15);
check("16 -> Krishna Pratipada index 0", tithiIndexFromNumber(16) === 0);
check("29 -> Krishna Chaturdashi index 13", tithiIndexFromNumber(29) === 13);

// ===========================================================================
console.log("3. Language independence (Hindi names, Dvitiya spelling)");
// ===========================================================================
// Production API today: en name "Trayodashi", hi name "त्रयोदशी", both number 28.
const t28 = tithiData[tithiIndexFromNumber(28)!];
check("28 (Krishna Trayodashi) -> name 'Trayodashi' / name_hi 'त्रयोदशी'",
  t28.name === "Trayodashi" && t28.name_hi === "त्रयोदशी");
// Backend English spelling is "Dvitiya"; the old English-keyed map expected "Dwitiya".
for (const n of [2, 17]) {
  const t = tithiData[tithiIndexFromNumber(n)!];
  check(`${n} (API name "Dvitiya" / "द्वितीया") -> dwitiya / द्वितीया`, t.slug === "dwitiya" && t.name_hi === "द्वितीया");
}
const t12 = tithiData[tithiIndexFromNumber(12)!];
check("12 (API name 'Dvadashi') -> dwadashi / द्वादशी", t12.slug === "dwadashi" && t12.name_hi === "द्वादशी");
check("every number resolves to an entry with English and Hindi names",
  Array.from({ length: 30 }, (_, i) => tithiData[tithiIndexFromNumber(i + 1)!])
    .every((t) => !!t && t.name.length > 0 && /[ऀ-ॿ]/.test(t.name_hi)));

const backendEngine = path.resolve(ROOT, "..", "Jyotishasha_Backend", "services", "panchang_engine.py");
if (fs.existsSync(backendEngine)) {
  const src = fs.readFileSync(backendEngine, "utf8");
  const block = (name: string) => {
    const start = src.indexOf(`${name} = [`);
    const body = src.slice(start, src.indexOf("]", start));
    return [...body.matchAll(/"([^"]+)"/g)].map((m) => m[1]);
  };
  const en = block("TITHI_NAMES");
  const hi = block("TITHI_NAMES_HI");
  check(`backend TITHI_NAMES / TITHI_NAMES_HI have 30 entries (${en.length}/${hi.length})`, en.length === 30 && hi.length === 30);
  check("backend Hindi name at each number equals tithiData name_hi at the mapped index",
    hi.every((name, i) => tithiData[tithiIndexFromNumber(i + 1)!].name_hi === name));
  const enMismatch = en
    .map((name, i) => [i + 1, name, tithiData[tithiIndexFromNumber(i + 1)!].name] as const)
    .filter(([, a, b]) => a !== b);
  console.log(`  (info) backend vs tithiData English spelling differences (handled by number lookup): ${JSON.stringify(enMismatch)}`);
} else {
  console.log("  (info) backend repo not found next to frontend; name parity check skipped");
}

// ===========================================================================
console.log("4. Invalid input never yields a tithi");
// ===========================================================================
const invalid: unknown[] = [undefined, null, 0, 31, -1, 2.5, 15.0000001, NaN, Infinity, -Infinity,
  "28", "", "Trayodashi", "त्रयोदशी", true, false, {}, [28]];
for (const v of invalid) {
  check(`invalid ${typeof v === "number" ? String(v) : JSON.stringify(v)} -> null`, tithiIndexFromNumber(v) === null);
}

// ===========================================================================
console.log("5. Page uses the number lookup (no localized-name map)");
// ===========================================================================
const page = fs.readFileSync(path.join(ROOT, "app", "[locale]", "panchang", "tithi", "page.tsx"), "utf8");
check("page imports tithiIndexFromNumber and reads tithi.number",
  page.includes("tithiIndexFromNumber") && page.includes("selected_date?.tithi?.number"));
check("page no longer keys a slug map by tithi.name", !page.includes("slugMap") && !page.includes("tithi?.name"));
check("page still requests the localized Panchang (hi/en)", page.includes('getTodayPanchang(\n      isHi ? "hi" : "en"\n    )') || /getTodayPanchang\(\s*isHi \? "hi" : "en"\s*\)/.test(page));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
