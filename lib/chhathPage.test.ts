// lib/chhathPage.test.ts

/**
 * CHHATH-03 -- Chhath Puja page data layer, display policy and SEO.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/chhathPage.test.ts
 *   node .ts-test-out/chhathPage.test.js
 *
 * lib/fixtures/chhath-api-responses.json holds REAL responses recorded from
 * the backend CHHATH-02C engine (POST /api/festivals/chhath): 2025 Patna
 * (needs_review), 2026 Patna EN/HI (confirmed) and 2026 Kolkata.
 */

import * as fs from "fs";
import * as path from "path";
import fixtures from "./fixtures/chhath-api-responses.json";
import {
  CHHATH_DAY_KEYS,
  CHHATH_MAX_YEAR,
  ChhathApiError,
  ChhathResponse,
  FetchChhathParams,
  parseChhathResponse,
  toChhathView,
} from "./chhath/api";
import { CHHATH_CITIES, CHHATH_DEFAULT_CITY, chhathCityName, isChhathCity } from "./chhath/cities";
import {
  CHHATH_DAY_COPY,
  CHHATH_FAQS,
  CHHATH_FAQ_REVIEW_SUFFIX,
  CHHATH_HERO,
  CHHATH_RELATED_LINKS,
  CHHATH_SECTIONS,
  CHHATH_SEO,
  CHHATH_UI,
  fill,
} from "./chhath/content";
import {
  alternativeSandhyaDates,
  formatChhathDate,
  formatChhathDateTime,
  isChhathOver,
  istToday,
  istYear,
  showVariationNote,
  to12Hour,
} from "./chhath/format";
import { resolveInitialChhath } from "./chhath/resolveYear";
import {
  buildChhathArticleSchema,
  buildChhathBreadcrumbSchema,
  buildChhathFaqSchema,
  buildChhathFaqs,
  chhathAlternates,
  chhathCanonical,
  chhathTitle,
} from "./chhath/seo";
import { hinduMonthsData } from "./data/hinduMonthsData";
import { tithiSeoContent } from "../app/data/tithiSeoContent";

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

function throwsCode(fn: () => unknown, code: string): boolean {
  try {
    fn();
    return false;
  } catch (e) {
    return e instanceof ChhathApiError && e.code === code;
  }
}

const ROOT = path.resolve(__dirname, "..", "..");
const read = (rel: string) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

const raw = fixtures as Record<string, unknown>;
const r2025 = parseChhathResponse(raw["2025_patna_en"]);
const r2026 = parseChhathResponse(raw["2026_patna_en"]);
const r2026hi = parseChhathResponse(raw["2026_patna_hi"]);
const r2026kol = parseChhathResponse(raw["2026_kolkata_en"]);
const v2025 = toChhathView(r2025);
const v2026 = toChhathView(r2026);
const v2026hi = toChhathView(r2026hi);
const v2026kol = toChhathView(r2026kol);
const datesOf = (v: { days: { date: string }[] } | null) => (v ? v.days.map((d) => d.date).join() : "");

// ===========================================================================
console.log("1. Formatting (deterministic, IST)");
// ===========================================================================
check("to12Hour 17:00 -> 5:00 PM", to12Hour("17:00") === "5:00 PM");
check("to12Hour 06:07 -> 6:07 AM", to12Hour("06:07") === "6:07 AM");
check("to12Hour 00:05 -> 12:05 AM", to12Hour("00:05") === "12:05 AM");
check("to12Hour 12:30 -> 12:30 PM", to12Hour("12:30") === "12:30 PM");
check("to12Hour invalid -> ''", to12Hour("25:00") === "" && to12Hour(undefined) === "" && to12Hour("5pm") === "");
check("formatChhathDate en", formatChhathDate("2026-11-15", "en") === "15 November 2026");
check("formatChhathDate hi", formatChhathDate("2026-11-15", "hi") === "15 नवंबर 2026");
check("formatChhathDate invalid -> ''", formatChhathDate("2026-13-01", "en") === "" && formatChhathDate(null, "en") === "");
check("formatChhathDateTime", formatChhathDateTime("2026-11-14T23:24", "en") === "14 November 2026, 11:24 PM");
check("istToday rolls over at IST midnight", istToday(new Date("2026-11-16T19:00:00Z")) === "2026-11-17");
check("istYear uses IST (Dec 31 20:00 UTC = Jan 1 IST)", istYear(new Date("2026-12-31T20:00:00Z")) === 2027);

// ===========================================================================
console.log("2. Response contract (real backend fixtures)");
// ===========================================================================
check("2026 fixture parses with four ordered days",
  r2026.days.map((d) => d.key).join() === CHHATH_DAY_KEYS.join());
check("2026 Patna dates Nov 13-16",
  r2026.days.map((d) => d.date).join() === "2026-11-13,2026-11-14,2026-11-15,2026-11-16");
check("2026 Patna Arghya 17:00 / 06:07", r2026.days[2].arghya_time === "17:00" && r2026.days[3].arghya_time === "06:07");
check("2026 lunar month Kartik Shukla, not Adhik",
  r2026.lunar_month.amanta === "Kartik" && r2026.lunar_month.paksha === "Shukla" && !r2026.lunar_month.is_adhik);
check("Kolkata: same dates, different Arghya times",
  r2026kol.days.map((d) => d.date).join() === r2026.days.map((d) => d.date).join() &&
  r2026kol.days[2].arghya_time !== r2026.days[2].arghya_time && r2026kol.location.city === "kolkata");
check("Hindi fixture carries Hindi names", r2026hi.days[2].name === "संध्या अर्घ्य" && r2026hi.language === "hi");

const bad = (mut: (j: any) => void) => {
  const j = clone(raw["2026_patna_en"]) as any;
  mut(j);
  return () => parseChhathResponse(j);
};
check("malformed: not chhath", throwsCode(bad((j) => (j.festival = "holi")), "MALFORMED_RESPONSE"));
check("malformed: three days", throwsCode(bad((j) => j.days.pop()), "MALFORMED_RESPONSE"));
check("malformed: day order", throwsCode(bad((j) => j.days.reverse()), "MALFORMED_RESPONSE"));
check("malformed: bad date", throwsCode(bad((j) => (j.days[2].date = "15/11/2026")), "MALFORMED_RESPONSE"));
check("malformed: missing Arghya time", throwsCode(bad((j) => delete j.days[3].arghya_time), "MALFORMED_RESPONSE"));
check("malformed: unknown status", throwsCode(bad((j) => (j.status = "ok")), "MALFORMED_RESPONSE"));
check("malformed: error body", throwsCode(() => parseChhathResponse({ error: "x", code: "INVALID_CITY" }), "MALFORMED_RESPONSE"));
check("malformed: null", throwsCode(() => parseChhathResponse(null), "MALFORMED_RESPONSE"));
const viewJson = JSON.stringify(v2025);
check("public view drops backend internals",
  !/diagnostics|review_reasons|policy_unapproved|reference_disagreement|verification|rule_version|"flags"|"label"|matching_days/.test(viewJson));
check("public view keeps rendered fields",
  datesOf(v2025) === datesOf(r2025) && v2025.days[2].arghya_time === r2025.days[2].arghya_time &&
  v2025.candidates.length === r2025.candidates.length && v2025.shashthi.start_ist === r2025.shashthi.start_ist &&
  v2025.days[0].tithi_at_sunrise.name_hi === r2025.days[0].tithi_at_sunrise.name_hi);

// ===========================================================================
console.log("3. Display policy: needs_review keeps dates visible");
// ===========================================================================
check("2025 is needs_review with its calculated dates intact",
  r2025.status === "needs_review" &&
  r2025.days.map((d) => d.date).join() === "2025-10-26,2025-10-27,2025-10-28,2025-10-29");
check("2025 shows the variation note", showVariationNote(v2025));
check("2025 alternative Sandhya Arghya = Oct 27 (from candidates)",
  JSON.stringify(alternativeSandhyaDates(v2025)) === JSON.stringify(["2025-10-27"]));
check("2026 confirmed: no variation note, no alternatives",
  !showVariationNote(v2026) && alternativeSandhyaDates(v2026).length === 0);
const confirmedWithSunsetDiff = clone(r2026) as ChhathResponse;
confirmedWithSunsetDiff.candidates = confirmedWithSunsetDiff.candidates.map((c) =>
  c.rule_id === "patna_sunset_shashthi" ? { ...c, sandhya_arghya: "2026-11-14" } : c
);
check("confirmed year with a differing sunset candidate shows NO note (2021/2023 pattern)",
  !showVariationNote(confirmedWithSunsetDiff) && alternativeSandhyaDates(confirmedWithSunsetDiff).length === 0);
check("isChhathOver: before / after Usha Arghya",
  !isChhathOver(r2026, "2026-11-16") && isChhathOver(r2026, "2026-11-17"));

// ===========================================================================
console.log("4. Default year resolution (IST, current/upcoming)");
// ===========================================================================
function fakeFetcher(byYear: Record<number, ChhathResponse | "fail">, calls: FetchChhathParams[]) {
  return async (p: FetchChhathParams) => {
    calls.push(p);
    const v = byYear[p.year];
    if (!v || v === "fail") throw new ChhathApiError(404, null);
    return v;
  };
}
const as2027 = { ...clone(r2026), year: 2027 } as ChhathResponse;
(async () => {
  let calls: FetchChhathParams[] = [];
  let res = await resolveInitialChhath("en", new Date("2026-10-08T06:00:00Z"), fakeFetcher({ 2026: r2026 }, calls));
  check("before Chhath 2026 -> 2026 Patna (public view)", res.year === 2026 && datesOf(res.data) === datesOf(r2026) &&
    !("diagnostics" in (res.data as object)) &&
    calls.length === 1 && calls[0].city === CHHATH_DEFAULT_CITY && calls[0].server === true);

  calls = [];
  res = await resolveInitialChhath("en", new Date("2026-11-16T23:00:00Z"), fakeFetcher({ 2026: r2026, 2027: as2027 }, calls));
  check("after Usha Arghya (IST Nov 17) -> 2027", res.year === 2027 && res.data?.year === 2027 && calls.length === 2);

  calls = [];
  res = await resolveInitialChhath("en", new Date("2026-11-16T12:00:00Z"), fakeFetcher({ 2026: r2026 }, calls));
  check("on Usha Arghya day (IST Nov 16) stays 2026", res.year === 2026 && calls.length === 1);

  res = await resolveInitialChhath("en", new Date("2026-10-08T06:00:00Z"), fakeFetcher({ 2026: "fail" }, []));
  check("API failure -> data null (no fabricated dates)", res.year === 2026 && res.data === null);

  res = await resolveInitialChhath("en", new Date("2026-12-01T06:00:00Z"), fakeFetcher({ 2026: r2026, 2027: "fail" }, []));
  check("next-year failure -> 2027 with data null", res.year === 2027 && res.data === null);

  const at2100 = { ...clone(r2026), year: 2100 } as ChhathResponse;
  res = await resolveInitialChhath("en", new Date("2100-12-15T06:00:00Z"), fakeFetcher({ 2100: at2100 }, []));
  check(`never requests beyond ${CHHATH_MAX_YEAR}`, res.year === 2100 && res.data?.year === 2100);

  // =========================================================================
  console.log("5. SEO: metadata, FAQ, schema");
  // =========================================================================
  check("canonical EN/HI evergreen",
    chhathCanonical("en") === "https://www.jyotishasha.com/chhath-puja" &&
    chhathCanonical("hi") === "https://www.jyotishasha.com/hi/chhath-puja");
  const alt = chhathAlternates("hi");
  check("hreflang en/hi/x-default",
    alt.canonical.endsWith("/hi/chhath-puja") && alt.languages.en.endsWith("/chhath-puja") &&
    alt.languages.hi.endsWith("/hi/chhath-puja") && alt.languages["x-default"] === alt.languages.en);
  check("title carries dynamic year", chhathTitle("en", 2026).startsWith("Chhath Puja 2026") &&
    chhathTitle("hi", 2027).includes("2027"));

  const faqEn = buildChhathFaqs("en", 2026, v2026);
  check("FAQ count matches content", faqEn.length === CHHATH_FAQS.length);
  check("dated FAQ uses API dates",
    faqEn[0].a.includes("13 November 2026") && faqEn[0].a.includes("15 November 2026") && faqEn[0].a.includes("16 November 2026"));
  check("Arghya FAQ uses Patna times", faqEn[2].a.includes("5:00 PM") && faqEn[2].a.includes("6:07 AM"));
  const faqHi = buildChhathFaqs("hi", 2026, v2026hi);
  check("Hindi FAQ uses Hindi dates", faqHi[0].a.includes("15 नवंबर 2026") && faqHi[0].q.includes("2026"));
  const faqNone = buildChhathFaqs("en", 2026, null);
  check("no data: fallback answers, no dates or times invented",
    faqNone.every((f) => !/November|October|\d{1,2}:\d{2}/.test(f.a)) && faqNone[0].q.includes("2026"));
  check("no unresolved placeholders", [...faqEn, ...faqHi, ...faqNone].every((f) => !/\{\w+\}/.test(f.q + f.a)));
  check("mismatched year data is not used for FAQ dates (fallback answer)",
    buildChhathFaqs("en", 2027, v2026)[0].a === CHHATH_FAQS[0].fallback!.en);
  check("Kolkata data is not used for Patna FAQ times", !buildChhathFaqs("en", 2026, v2026kol)[2].a.includes(":"));
  const faq2025 = buildChhathFaqs("en", 2025, v2025);
  check("needs_review FAQ keeps dates and adds the Panchang caveat",
    faq2025[0].a.includes("28 October 2025") && faq2025[0].a.endsWith(CHHATH_FAQ_REVIEW_SUFFIX.en));
  check("confirmed FAQ has no caveat", !faqEn[0].a.includes(CHHATH_FAQ_REVIEW_SUFFIX.en.trim()));

  const faqSchema = buildChhathFaqSchema("hi", faqHi);
  check("FAQPage schema", faqSchema["@type"] === "FAQPage" && faqSchema.inLanguage === "hi-IN" &&
    faqSchema.mainEntity.length === faqHi.length && faqSchema.mainEntity[0].acceptedAnswer.text === faqHi[0].a);
  const article = buildChhathArticleSchema("en", 2026, "2026-10-08T00:00:00+05:30");
  check("Article schema", article["@type"] === "Article" && article.headline === chhathTitle("en", 2026) &&
    article.mainEntityOfPage["@id"] === chhathCanonical("en"));
  const crumbs = buildChhathBreadcrumbSchema("hi");
  check("BreadcrumbList Home > Vrat & Tyohar > Chhath (hi)",
    crumbs.itemListElement.length === 3 &&
    crumbs.itemListElement[1].item === "https://www.jyotishasha.com/hi/vrat-tyohar" &&
    crumbs.itemListElement[2].item === "https://www.jyotishasha.com/hi/chhath-puja");

  // =========================================================================
  console.log("6. Static content: bilingual, no hard-coded dates");
  // =========================================================================
  const bilingual: { en: string; hi: string }[] = [
    CHHATH_SEO.title, CHHATH_SEO.description, CHHATH_HERO.h1, CHHATH_HERO.intro,
    ...Object.values(CHHATH_UI),
    ...Object.values(CHHATH_DAY_COPY).flatMap((d) => [d.step, d.summary]),
    ...CHHATH_SECTIONS.flatMap((s) => [s.title, ...s.paragraphs]),
    ...CHHATH_FAQS.flatMap((f) => [f.q, f.a, ...(f.fallback ? [f.fallback] : [])]),
    ...CHHATH_RELATED_LINKS.map((l) => l.label),
    CHHATH_FAQ_REVIEW_SUFFIX,
  ];
  check("every copy entry has EN and Devanagari HI",
    bilingual.every((c) => c.en.trim().length > 0 && /[ऀ-ॿ]/.test(c.hi)));
  check("no hard-coded years or calendar dates in static copy",
    bilingual.every((c) => !/\b(19|20)\d{2}\b/.test(c.en + c.hi) &&
      !/\b\d{1,2} (January|February|March|April|May|June|July|August|September|October|November|December)\b/.test(c.en)));
  check("fill keeps unknown placeholders", fill("{a} {b}", { a: 1 }) === "1 {b}");

  // =========================================================================
  console.log("7. Cities (backend parity)");
  // =========================================================================
  const keys = CHHATH_CITIES.map((c) => c.key);
  check("20 unique cities, Patna default first", keys.length === 20 && new Set(keys).size === 20 &&
    keys[0] === CHHATH_DEFAULT_CITY && isChhathCity("patna") && !isChhathCity("london"));
  check("city names bilingual", chhathCityName("delhi", "en") === "New Delhi" && chhathCityName("delhi", "hi") === "नई दिल्ली");
  const backendEngine = path.resolve(ROOT, "..", "Jyotishasha_Backend", "services", "festivals", "chhath_engine.py");
  if (fs.existsSync(backendEngine)) {
    const src = fs.readFileSync(backendEngine, "utf8");
    const block = src.slice(src.indexOf("CITIES = {"), src.indexOf("}\n\nRITUAL_DAYS"));
    const backendKeys = [...block.matchAll(/^\s{4}"([a-z]+)":/gm)].map((m) => m[1]);
    check(`city keys equal backend CITIES (${backendKeys.length})`, JSON.stringify(backendKeys) === JSON.stringify(keys));
  } else {
    console.log("  (info) backend repo not found next to frontend; parity check skipped");
  }

  // =========================================================================
  console.log("8. Site integrations");
  // =========================================================================
  check("Vrat & Tyohar hub links /chhath-puja", read("app/[locale]/vrat-tyohar/page.tsx").includes('href: "/chhath-puja"'));
  const sitemap = read("app/sitemap.ts");
  check("sitemap lists /chhath-puja and /hi/chhath-puja and spreads them",
    sitemap.includes("${baseUrl}/chhath-puja`") && sitemap.includes("${baseUrl}/hi/chhath-puja`") &&
    sitemap.includes("...chhathUrls,"));
  const kartikaChhath = hinduMonthsData.kartika.festivals.find((f) => f.slug === "chhath-puja");
  check("Kartika month lists Chhath with an opt-in page link",
    !!kartikaChhath && kartikaChhath.existingPageUrl === "/chhath-puja" && kartikaChhath.linkToPage === true);
  const otherLinked = Object.values(hinduMonthsData).flatMap((m) => m.festivals)
    .filter((f) => f.linkToPage && f.slug !== "chhath-puja");
  check("no other month festival changed to a link", otherLinked.length === 0);
  const shashthi = tithiSeoContent.shashthi;
  check("Shashthi tithi links Chhath Puja (EN + HI)",
    shashthi.festivalLinks["Chhath Puja"] === "/chhath-puja" && shashthi.festivalLinks["छठ पूजा"] === "/chhath-puja" &&
    shashthi.majorFestivals.includes("Chhath Puja") && shashthi.majorFestivals_hi.includes("छठ पूजा"));
  const withLinks = Object.entries(tithiSeoContent).filter(([, v]) => "festivalLinks" in v).map(([k]) => k);
  check("only Shashthi defines festival links", JSON.stringify(withLinks) === JSON.stringify(["shashthi"]));
  check("page file never renders backend diagnostics/review_reasons",
    !/diagnostics|review_reasons/.test(read("app/[locale]/chhath-puja/page.tsx") + read("app/[locale]/chhath-puja/ChhathClient.tsx")));

  console.log(`\n${passed} passed, ${failed} failed`);
  if (failed > 0) process.exit(1);
})();
