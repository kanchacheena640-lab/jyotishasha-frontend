/**
 * Muhurat SEO fixes (G4, V5/G5, V4, X1-X4): localized month names, month-aware descriptions, rolling-page labels,
 * IST past-date exclusion for the Top 3, breadcrumb parent, FAQ heading, per-render month navigation.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/muhuratSeo.test.ts && node <compiled muhuratSeo.test.js>
 */
import * as fs from "fs";
import * as path from "path";
import {
  datesInMonth,
  hindiHeroSubject,
  hindiMuhuratSubject,
  istToday,
  localizedMonthName,
  muhuratMetaDescription,
  topicShortName,
  upcomingDates,
} from "./muhuratSeo";
import { muhurthTopics } from "../app/[locale]/panchang/muhurat/muhurth_topics";
import { getMonthNumber, getTargetYear, MONTH_MAP } from "./months";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");
const code = (rel: string) => src(rel).split("\n").filter((l) => !/^\s*\/\//.test(l)).join("\n");

// Month names
check("Hindi month names", localizedMonthName(11, true) === "नवंबर" && localizedMonthName(2, true) === "फ़रवरी" &&
  localizedMonthName(1, true) === "जनवरी" && localizedMonthName(12, true) === "दिसंबर");
check("English month names are capitalized", localizedMonthName(11, false) === "November" && localizedMonthName(5, false) === "May");

// IST date
check("IST today rolls over at 18:30 UTC", istToday(new Date("2026-11-11T18:29:00Z")).iso === "2026-11-11" &&
  istToday(new Date("2026-11-11T18:30:00Z")).iso === "2026-11-12");
check("IST month boundary (Nov 30 19:00 UTC = Dec 1 IST)", (() => {
  const t = istToday(new Date("2026-11-30T19:00:00Z")); return t.month === 12 && t.year === 2026 && t.iso === "2026-12-01";
})());

// Top 3 past-date exclusion + month restriction
const sample = [{ date: "2026-11-11" }, { date: "2026-11-16" }, { date: "2026-12-14" }, { date: "2026-11-05" }, { date: "2026-11-12" }];
check("upcomingDates keeps today and later, drops past, keeps ranking order",
  JSON.stringify(upcomingDates(sample, "2026-11-12").map((d) => d.date)) === JSON.stringify(["2026-11-16", "2026-12-14", "2026-11-12"]));
check("datesInMonth restricts to the page's month",
  JSON.stringify(datesInMonth(sample, 2026, 11).map((d) => d.date)) === JSON.stringify(["2026-11-11", "2026-11-16", "2026-11-05", "2026-11-12"]) &&
  datesInMonth(sample, 2027, 11).length === 0);

// Descriptions: concise, month-aware, unique across topics x months x scope (per language)
const descs: string[] = [];
let maxLen = 0;
for (const isHi of [true, false]) {
  for (const t of Object.values(muhurthTopics)) {
    const shortName = topicShortName(isHi ? t.title_hi : t.title);
    for (let m = 1; m <= 12; m++) {
      for (const scope of ["month", "upcoming"] as const) {
        const d = muhuratMetaDescription({ shortName, monthLabel: localizedMonthName(m, isHi), year: 2026, isHi, scope });
        descs.push(d); maxLen = Math.max(maxLen, d.length);
      }
    }
  }
}
check(`descriptions unique (${descs.length})`, new Set(descs).size === descs.length);
check(`descriptions concise (max ${maxLen} chars <= 160)`, maxLen <= 160);
const hiNov = muhuratMetaDescription({ shortName: "गृह प्रवेश मुहूर्त", monthLabel: "नवंबर", year: 2026, isHi: true, scope: "month" });
check("Hindi month description names the Hindi month and year", hiNov.startsWith("गृह प्रवेश मुहूर्त नवंबर 2026:") && !/november/i.test(hiNov));

// FAQ heading
check("Hindi FAQ subject never doubles मुहूर्त (all topics)", Object.values(muhurthTopics).every((t) => {
  const s = hindiMuhuratSubject(topicShortName(t.title_hi)); return !/मुहूर्त\s+मुहूर्त/.test(s) && s.endsWith("मुहूर्त");
}));

// Hero intro: no doubled "मुहूर्त" (or "शुभ") for any topic
check("Hindi hero phrase never doubles मुहूर्त or शुभ (all topics)", Object.values(muhurthTopics).every((t) => {
  const s = hindiHeroSubject(topicShortName(t.title_hi));
  return (s.match(/मुहूर्त/g) || []).length === 1 && (s.match(/शुभ/g) || []).length === 1 && s.endsWith("मुहूर्त");
}));
check("Hindi hero phrase examples", hindiHeroSubject("वाहन मुहूर्त") === "शुभ वाहन मुहूर्त" &&
  hindiHeroSubject("सोना खरीदने का शुभ मुहूर्त") === "सोना खरीदने का शुभ मुहूर्त");
check("DynamicHero uses the de-duplicated Hindi phrase",
  /hindiHeroSubject\(cleanTitle\)/.test(code("components/muhurat/DynamicHero.tsx")) &&
  !/शुभ \{cleanTitle\} मुहूर्त/.test(code("components/muhurat/DynamicHero.tsx")));

// getTargetYear: unchanged semantics, Asia/Kolkata month/year boundaries
const at = (iso: string) => new Date(iso);
check("getTargetYear semantics unchanged mid-month (12 Nov 2026 IST)",
  getTargetYear(11, at("2026-11-12T06:00:00Z")) === 2026 && getTargetYear(12, at("2026-11-12T06:00:00Z")) === 2026 &&
  getTargetYear(10, at("2026-11-12T06:00:00Z")) === 2027 && getTargetYear(1, at("2026-11-12T06:00:00Z")) === 2027);
check("getTargetYear: 30 Nov 23:59 IST still November", getTargetYear(11, at("2026-11-30T18:29:00Z")) === 2026);
check("getTargetYear: 1 Dec 00:00 IST (still 30 Nov UTC) treats November as past",
  getTargetYear(11, at("2026-11-30T18:30:00Z")) === 2027 && getTargetYear(12, at("2026-11-30T18:30:00Z")) === 2026);
check("getTargetYear: 1 Jan 2027 00:00 IST (still 31 Dec 2026 UTC) uses 2027",
  getTargetYear(1, at("2026-12-31T18:30:00Z")) === 2027 && getTargetYear(12, at("2026-12-31T18:30:00Z")) === 2027 &&
  getTargetYear(12, at("2026-12-31T18:29:00Z")) === 2026);
check("getTargetYear still works without an explicit clock", Number.isInteger(getTargetYear(6)));
check("month slugs unchanged (MONTH_MAP / getMonthNumber)",
  Object.keys(MONTH_MAP).length === 12 && getMonthNumber("November") === 11 && getMonthNumber("november") === 11 && getMonthNumber("nov") === null);

// Source-level wiring
const hub = code("app/[locale]/panchang/muhurat/[slug]/page.tsx");
const month = code("app/[locale]/panchang/muhurat/[slug]/[period]/page.tsx");
const annual = code("components/muhurat/AnnualMuhuratSchemas.tsx");
const upcoming = code("components/muhurat/UpcomingMonths.tsx");
const prime = code("components/muhurat/PrimeDates.tsx");
check("no breadcrumb item points at the bare /panchang/muhurat URL",
  ![hub, month, annual].some((s) => /\/panchang\/muhurat`/.test(s)));
check("month page title/H1 use the localized month, not the raw URL segment",
  /const month = localizedMonthName\(monthNumber, isHi\);/.test(month) && /localizedMonthName\(monthNumber, isHi\)/.test(month) &&
  !/const month = params\.period;/.test(month) && !/period\.charAt\(0\)\.toUpperCase\(\)/.test(month));
check("month page restricts dates to its own month", /datesInMonth\(/.test(month));
check("rolling page passes rolling labels and IST today to PrimeDates and ExpandableDates",
  (hub.match(/\brolling\b/g) || []).length >= 2 && /todayIso=\{today\.iso\}/.test(hub) && /todayIso=\{today\.iso\}/.test(month));
check("rolling page lists only upcoming dates (IST)", /upcomingDates\(await getMuhurth\(topic\.activity, locale\), today\.iso\)/.test(hub));
check("PrimeDates Top 3 excludes past dates",/upcomingDates\(dates, todayIso\)\.slice\(0, 3\)/.test(prime));
check("UpcomingMonths computes the current month per render (no module-level date)",
  !/^const currentMonthSlug|^const currentYear/m.test(upcoming) && /const today = istToday\(\);/.test(upcoming));
check("canonical and hreflang templates unchanged",
  hub.includes("}/panchang/muhurat/${params.slug}`;") && hub.includes('"x-default": `${SITE_URL}/panchang/muhurat/${params.slug}`') &&
  month.includes("}/panchang/muhurat/${params.slug}/${params.period}`;") &&
  month.includes('"x-default": `${SITE_URL}/panchang/muhurat/${params.slug}/${params.period}`'));
check("X5 untouched: datePublished still toISTDatePublished()",
  hub.includes("datePublished: toISTDatePublished(),") && month.includes("datePublished: toISTDatePublished(),"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
