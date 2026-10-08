// lib/tithiDisplay.test.ts

/**
 * TITHI-04 -- Tithi landing page display polish: Hindi category labels,
 * DD-MM-YYYY / hh:mm AM/PM IST formatting, single H1.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/tithiDisplay.test.ts
 *   node .ts-test-out/lib/tithiDisplay.test.js
 */

import * as fs from "fs";
import * as path from "path";
import { TITHI_CATEGORY_LABELS, formatIstDateTime, tithiCategoryLabel } from "./tithi/tithiDisplay";
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
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");

// ===========================================================================
console.log("1. Category labels");
// ===========================================================================
const EXPECTED_HI: Record<string, string> = {
  Nanda: "नंदा", Bhadra: "भद्रा", Jaya: "जया", Rikta: "रिक्ता", Poorna: "पूर्णा",
};
for (const [en, hi] of Object.entries(EXPECTED_HI)) {
  check(`${en}: EN unchanged, HI ${hi}`, tithiCategoryLabel(en, false) === en && tithiCategoryLabel(en, true) === hi);
}
const dataCategories = [...new Set(tithiData.map((t) => t.category))];
check(`every tithiData category has a label (${dataCategories.join(", ")})`,
  dataCategories.every((c) => !!TITHI_CATEGORY_LABELS[c]));
check("every tithiData entry gets a Devanagari Hindi category",
  tithiData.every((t) => /^[ऀ-ॿ]+$/.test(tithiCategoryLabel(t.category, true))));
check("no Latin category left in Hindi output",
  tithiData.every((t) => !/[A-Za-z]/.test(tithiCategoryLabel(t.category, true))));
check("English output equals the stored category", tithiData.every((t) => tithiCategoryLabel(t.category, false) === t.category));
check("unknown category shown unchanged", tithiCategoryLabel("Other", true) === "Other");
check("non-string category -> empty", tithiCategoryLabel(undefined, true) === "" && tithiCategoryLabel(5, false) === "");

// ===========================================================================
console.log("2. DD-MM-YYYY, hh:mm AM/PM IST (backend IST wall clock)");
// ===========================================================================
const CASES: [unknown, string][] = [
  ["2026-10-08 22:16", "08-10-2026, 10:16 PM IST"],   // production value seen live
  ["2026-10-09 00:00", "09-10-2026, 12:00 AM IST"],   // midnight
  ["2026-10-09 00:05", "09-10-2026, 12:05 AM IST"],
  ["2026-10-09 12:00", "09-10-2026, 12:00 PM IST"],   // noon
  ["2026-10-09 11:59", "09-10-2026, 11:59 AM IST"],
  ["2026-10-09 12:01", "09-10-2026, 12:01 PM IST"],
  ["2026-12-31 23:59", "31-12-2026, 11:59 PM IST"],   // year boundary
  ["2027-01-01 00:00", "01-01-2027, 12:00 AM IST"],
  ["2026-02-28 06:07", "28-02-2026, 06:07 AM IST"],
  ["2028-02-29 13:30", "29-02-2028, 01:30 PM IST"],   // leap day
  ["2026-10-08T22:16", "08-10-2026, 10:16 PM IST"],   // ISO separator
  ["2026-10-08 22:16:45", "08-10-2026, 10:16 PM IST"],// seconds ignored
];
for (const [input, expected] of CASES) {
  check(`${JSON.stringify(input)} -> ${expected}`, formatIstDateTime(input) === expected);
}

// ===========================================================================
console.log("3. Explicit offsets converted to Asia/Kolkata (date boundaries)");
// ===========================================================================
const OFFSET_CASES: [string, string][] = [
  ["2026-10-08T18:30:00Z", "09-10-2026, 12:00 AM IST"],      // UTC -> IST crosses midnight
  ["2026-10-08T18:29:00Z", "08-10-2026, 11:59 PM IST"],
  ["2026-12-31T18:30:00Z", "01-01-2027, 12:00 AM IST"],      // crosses year
  ["2026-10-08T06:30:00Z", "08-10-2026, 12:00 PM IST"],      // noon IST
  ["2026-10-08T22:16:00+05:30", "08-10-2026, 10:16 PM IST"], // already IST
  ["2026-10-08T12:00:00-04:00", "08-10-2026, 09:30 PM IST"],
  ["2026-10-08T01:00:00+0900", "07-10-2026, 09:30 PM IST"],  // back across midnight
];
for (const [input, expected] of OFFSET_CASES) {
  check(`${input} -> ${expected}`, formatIstDateTime(input) === expected);
}

// ===========================================================================
console.log("4. Invalid input -> '-'");
// ===========================================================================
for (const bad of [undefined, null, "", "-", "08/10/2026 22:16", "2026-13-01 10:00", "2026-02-30 10:00",
  "2026-10-08 24:00", "2026-10-08 10:60", "2026-10-08", "not a date", 1730000000000, {}]) {
  check(`invalid ${JSON.stringify(bad)} -> "-"`, formatIstDateTime(bad) === "-");
}
check("formatting is independent of the process timezone (no Date parsing of IST wall time)",
  !read("lib/tithi/tithiDisplay.ts").includes("toLocale") && !/new Date\(\s*value/.test(read("lib/tithi/tithiDisplay.ts")));

// ===========================================================================
console.log("5. Components and heading hierarchy");
// ===========================================================================
const hero = read("components/TodayTithiHero.tsx");
const card = read("components/TithiCard.tsx");
const page = read("app/[locale]/panchang/tithi/page.tsx");
check("hero uses formatIstDateTime and no en-GB toLocaleString", hero.includes("formatIstDateTime(data?.tithi?.end_ist)") && !hero.includes("toLocaleString"));
check("hero and card use the localized category", hero.includes("tithiCategoryLabel(currentTithi.category, isHi)") && card.includes("tithiCategoryLabel(tithi.category, isHi)"));
check("hero has no <h1>; title is an <h2> with the original classes",
  !/<h1[\s>]/.test(hero) && hero.includes('<h2 className="text-3xl md:text-5xl font-black mt-2">'));
const tithiComponents = [
  "components/TodayTithiHero.tsx", "components/TithiCard.tsx", "components/tithi/TithiOverview.tsx",
  "components/tithi/PakshaSection.tsx", "components/tithi/TithiActivities.tsx", "components/tithi/ImportantTithis.tsx",
  "components/tithi/TithiMuhuratSection.tsx", "components/tithi/TithiTools.tsx", "components/tithi/TithiFaq.tsx",
];
const h1Count = (page.match(/<h1[\s>]/g) || []).length +
  tithiComponents.reduce((n, f) => n + (read(f).match(/<h1[\s>]/g) || []).length, 0);
check("exactly one <h1> across the Tithi landing page and its components", h1Count === 1);
check("page keeps its main H1 text", page.includes('"हिंदू पंचांग की 16 तिथियाँ"') && page.includes('"16 Tithis of Hindu Panchang"'));
check("page still uses the number-based tithi lookup", page.includes("tithiIndexFromNumber("));

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
