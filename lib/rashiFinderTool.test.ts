/**
 * Rashi Finder (/tools/rashi-finder, EN + HI) and the shared tool template's FAQ. Source-level, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --outDir .ts-test-out lib/rashiFinderTool.test.ts && node <compiled rashiFinderTool.test.js>
 */
import * as fs from "fs";
import * as path from "path";
import { rashiFinderContent } from "../app/data/toolContent/rashiFinder";
import {
  ALL_NAKSHATRA_NAMES, ALL_SIGN_NAMES, horoscopeHref, isNearSignBoundary, nakshatraHref, nakshatraName, nakshatraSlug, signName, signSlug,
} from "./rashi";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const page = src("app/[locale]/tools/[toolId]/page.tsx");
const landing = src("components/tools/rashi-finder/RashiFinderLanding.tsx");
const result = src("components/tools/rashi-finder/RashiResult.tsx");
const trs = src("components/ToolResultSection.tsx");
const parser = src("utils/parseToolResponse.ts");

console.log("=== A. URLs and server rendering ===");
check("canonical + hreflang generator unchanged", page.includes("canonical: `https://www.jyotishasha.com/${lang === 'hi' ? 'hi/' : ''}tools/${params.toolId}`") &&
  page.includes("hi: `${SITE_URL}/hi/tools/${params.toolId}`"));
check("page.tsx and the landing stay server components", !/^['"]use client['"]/m.test(page) && !/^['"]use client['"]/m.test(landing) &&
  page.includes('if (params.toolId === "rashi-finder") {') && page.includes("<RashiFinderLanding locale={lang} />"));
check("title tags unchanged (EN + HI)", rashiFinderContent.en.seo.title === "Rashi Finder – Find Your Moon Rashi by Date, Time & Place | Jyotishasha" &&
  rashiFinderContent.hi.seo.title === "राशि कैलकुलेटर – जन्म तिथि और समय से अपनी चंद्र राशि जानें | ज्‍योतिष आशा");
check("H1 (no brand / pipe) and intro come before the calculator island",
  landing.indexOf("<h1") > 0 && landing.indexOf("<h1") < landing.indexOf("<ToolDynamicPage submitLabel") && !/[|]/.test(rashiFinderContent.en.landing.h1 + rashiFinderContent.hi.landing.h1));
check("visible FAQ and FAQPage come from one array; 6-7 questions per language",
  landing.includes("c.faq.map((f) => (") && landing.includes("mainEntity: c.faq.map(") &&
  [rashiFinderContent.en.faq.length, rashiFinderContent.hi.faq.length].every((n) => n >= 6 && n <= 7));
check("valid schema category, no ratings, Hindi marked", landing.includes("applicationCategory: 'LifestyleApplication'") && !/aggregateRating/.test(landing) && landing.includes("lang={isHi ? 'hi' : undefined}"));

console.log("\n=== B. Claims ===");
const text = JSON.stringify(rashiFinderContent);
check("no unsupported Rashi claims (EN + HI)", !/100%|micro-second|guarantee|गारंटी|accurate prediction|सटीक भविष्यवाणी|lucky gemstone|भाग्यशाली रत्न|remed|उपाय/i.test(text));
check("no paid report link on the Rashi page or result", !/\/reports\//.test(text) && !/\/reports\//.test(result) && !/\/reports\//.test(landing));
const suggestions = src("components/ToolSuggestions.tsx");
check("Rashi Finder suggestions hold no report; other tools keep theirs",
  !/\/reports\//.test((suggestions.match(/'rashi-finder': \[[\s\S]*?\],/) || [""])[0]) &&
  suggestions.includes("'lagna-finder': [") && suggestions.includes("href: '/reports/career_report'") && suggestions.includes("href: '/reports/sadhesati_report'"));

console.log("\n=== C. Frontend maps match real routes ===");
const nakFiles = fs.readdirSync(path.join(root, "lib/nakshatra")).filter((f) => !["index.ts", "types.ts", "hubFaqData.ts"].includes(f)).map((f) => f.replace(".ts", ""));
check("27 nakshatras, every slug has a guide", ALL_NAKSHATRA_NAMES.length === 27 && nakFiles.length === 27 && ALL_NAKSHATRA_NAMES.every((n) => nakFiles.includes(String(nakshatraSlug(n)))));
check("backend 'Dhanishta' links to /nakshatra/dhanishtha", nakshatraHref("Dhanishta", false) === "/nakshatra/dhanishtha");
const backend = path.join(root, "../../Python/Jyotishasha_Backend-main/full_kundali_api.py");
if (fs.existsSync(backend)) {
  const block = (fs.readFileSync(backend, "utf8").match(/NAKSHATRAS = \[([\s\S]*?)\]/) || [])[1] || "";
  const names = (block.match(/"([^"]+)"/g) || []).map((s) => s.replace(/"/g, ""));
  check("every backend nakshatra name is mapped", names.length === 27 && names.every((n) => ALL_NAKSHATRA_NAMES.includes(n)));
}
const monthly = src("app/[locale]/monthly-horoscope/[sign]/page.tsx");
check("12 signs, every slug is a valid horoscope sign", ALL_SIGN_NAMES.length === 12 && ALL_SIGN_NAMES.every((s) => monthly.includes(`"${signSlug(s)}"`) || monthly.includes(`'${signSlug(s)}'`)));
check("horoscope links are locale-aware", horoscopeHref("daily", "Sagittarius", false) === "/daily-horoscope/sagittarius" &&
  horoscopeHref("yearly", "Leo", true) === "/hi/yearly-horoscope/leo" && horoscopeHref("monthly", "Unknown", false) === null);
check("Hindi names: sign and nakshatra; backend value passes through otherwise",
  signName("Sagittarius", true) === "धनु" && signName("Sagittarius", false) === "Sagittarius" && signName("Unknown", true) === "Unknown" && nakshatraName("Purva Ashadha", true) === "पूर्वाषाढ़ा");
check("boundary note only within one degree of a sign's edge", isNearSignBoundary(0.5) && isNearSignBoundary(29.09) && !isNearSignBoundary(1.5) && !isNearSignBoundary(16.63) && !isNearSignBoundary(undefined) && !isNearSignBoundary(31));

console.log("\n=== D. Result ===");
check("result reads the unmodified API fields; missing values are dropped, never estimated",
  trs.includes("<RashiResult rashi={kundaliData.rashi}") && result.includes(".filter((f): f is { label: string; value: string } => Boolean(f.value))") && result.includes("find((p) => p?.name === 'Moon')"));
check("Hindi headings and the header use Hindi sign names; backend values stay unchanged",
  parser.includes("const rashiHi = signName(rashi, true);") && parser.includes("`आपकी चंद्र राशि ${rashiHi} है`") && parser.includes("`आपका लग्न ${lagnaHi} है`") &&
  trs.includes("signName(kundaliData.rashi, ctaLocale === 'hi')") && trs.includes("signName(kundaliData.lagna_sign, ctaLocale === 'hi')"));
check("ToolResultSection keeps one onClick and no WebsiteEvents", (trs.match(/onClick=/g) || []).length === 1 && !trs.includes("WebsiteEvents"));

console.log("\n=== E. Shared template ===");
check("visible FAQ renders the same tool.faq as the schema", page.includes("tool.faq.map((item: { q: string; a: string }) => (") && page.includes("buildFaqJsonLd(tool.faq)"));
check("valid WebApplication category; old value gone", page.includes('applicationCategory: "LifestyleApplication"') && !page.includes("AstrologyApplication"));
check("breadcrumb names localized", page.includes('lang === "hi" ? "होम" : "Home"') && page.includes('lang === "hi" ? "टूल्स" : "Tools"'));
const toolFiles = fs.readdirSync(path.join(root, "app/data/toolContent")).filter((f) => f !== "index.ts");
const answers = toolFiles.flatMap((f) => (src(`app/data/toolContent/${f}`).match(/^\s*a:\s*".*$/gm) || []).map((l) => `${f}: ${l.trim()}`));
const banned = /100\s*%|insurance policy|बीमा पॉलिसी|typically 33|33 या 36|Our tool|हमारा टूल|Lagnadi|'DNA'|Cosmic DNA|financial empires|वित्तीय साम्राज्य|luxury vehicles|विलासिता के वाहन|ठीक किया जा सकता है/;
const hits = answers.filter((a) => banned.test(a));
check(`no published FAQ answer repeats a removed claim (${answers.length} answers scanned)`, answers.length >= 150 && hits.length === 0);
hits.forEach((h) => console.log("    ", h.slice(0, 120)));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
