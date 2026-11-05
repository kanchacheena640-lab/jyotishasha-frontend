/**
 * Free Kundli Matching landing (/love) -- Phase 1 redesign guards.
 * Source-level checks only (no network). URL stays /love in Phase 1; no /kundli-matching route or redirect.
 *
 * Run:
 *   node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *     --esModuleInterop --outDir .ts-test-out lib/loveLanding.test.ts
 *   node .ts-test-out/loveLanding.test.js
 */
import * as fs from "fs";
import * as path from "path";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const page = src("app/[locale]/love/page.tsx");
const form = src("app/[locale]/love/LoveForm.tsx");
const summary = src("app/[locale]/love/result/LoveResultSummaryDetail.tsx");
const sitemap = src("app/sitemap.ts");
const SESSION = ["result", "matchmaking-compatibility", "mangal-dosh", "marriage-potential", "truth-or-dare"];

console.log("=== A. URL and indexing (Phase 1) ===");
check("URL stays /love: canonical + hreflang en/hi/x-default unchanged",
  page.includes("const canonicalUrl = `${SITE_URL}${isHi ? \"/hi\" : \"\"}/love`;") && page.includes("en: `${SITE_URL}/love`,") &&
  page.includes("hi: `${SITE_URL}/hi/love`,") && page.includes('"x-default": `${SITE_URL}/love`,'));
check("no /kundli-matching route or redirect yet", !fs.existsSync(path.join(root, "app/[locale]/kundli-matching")) && !/kundli-matching/.test(src("next.config.js")));
for (const d of SESSION) {
  check(`session-only page /love/${d} is noindex,follow`, /robots: \{ index: false, follow: true \}/.test(src(`app/[locale]/love/${d}/page.tsx`)));
}
check("sitemap lists only the landing and the ₹199 product page under /love",
  /const loveSubPaths = \[\s*"",\s*"\/report\/relationship_future_report",\s*\];/.test(sitemap) &&
  !SESSION.some((d) => sitemap.includes(`"/${d}"`)));
check("landing itself is not noindex", !/robots:/.test(page));

console.log("\n=== B. Headings, content and claims ===");
check("H1 comes before the form; the form heading is an H2",
  page.indexOf("<h1") > 0 && page.indexOf("<h1") < page.indexOf("<LoveFormPage") && /<h2 id=\{`\$\{uid\}-heading`\}/.test(form) && !/<h1/.test(form));
check("H1 targets the free kundli matching intent (EN + HI)", page.includes('"Free Kundli Matching for Marriage"') && page.includes('"शादी के लिए फ्री कुंडली मिलान"'));
check("all eight kootas with 36 total", ["Varna", "Vashya", "Tara", "Yoni", "Graha Maitri", "Gana", "Bhakoot", "Nadi"].every((k) => page.includes(`en: "${k}"`)) &&
  (page.match(/pts: \d/g) || []).map((m) => +m.slice(5)).reduce((a, b) => a + b, 0) === 36);
check("no unsupported scientific / marriage-success claims (EN + HI)",
  !/Genetics|genetic|आनुवंशिक|two souls|souls joining|ancient Vedic science|successful life|successful marriage|विवाह की सफलता|guarantee|गारंटी|100%/i.test(page));
check("no name-only matching claim; the name-only question is answered honestly",
  page.includes("Not with this calculator. It matches charts from birth details") && !/match(ing)? by name(?! uses)/i.test(page.replace("Can I match kundli by name only?", "")));
check("score bands match the Compatibility guide", page.includes("above 24 and up to 32 is good") && src("lib/domains/marriage-astrology/topics/compatibility.ts").includes("above 24 and up to 32 is good"));
check("Hindi: page language marked and koota names translated", page.includes('lang={isHi ? "hi" : undefined}') && ["वर्ण", "वश्य", "तारा", "योनि", "ग्रह मैत्री", "गण", "भकूट", "नाड़ी"].every((k) => page.includes(k)));

console.log("\n=== C. Structured data and internal links ===");
check("FAQPage + BreadcrumbList + WebApplication (no ratings)",
  page.includes('"@type": "FAQPage"') && page.includes('"@type": "BreadcrumbList"') && page.includes('"@type": "WebApplication"') && !/aggregateRating|"Review"/.test(page));
check("links to the Hub, Compatibility guide and Mangal Dosh tool (locale-aware)",
  page.includes("`${lp}/marriage-astrology`") && page.includes("`${lp}/marriage-astrology/compatibility`") && page.includes("`${lp}/tools/mangal-dosh`"));

console.log("\n=== D. Form accessibility (logic untouched) ===");
const labels = (form.match(/<label htmlFor=\{fieldId\(key, "(name|dob|tob|pob)"\)\}/g) || []).length;
const ids = (form.match(/id=\{fieldId\(key, "(name|dob|tob|pob)"\)\}/g) || []).length;
check("every field (x2 partners) has a programmatic label", labels === 4 && ids === 4 && form.includes("people.map("));
check("16px inputs and 48px targets", form.includes("text-[16px]") && form.includes("min-h-[48px]"));
check("place input receives the label id (backward-compatible optional prop)",
  form.includes('id={fieldId(key, "pob")}') && /id\?: string;/.test(src("components/PlaceAutocompleteInput.tsx")) &&
  src("components/PlaceAutocompleteInput.tsx").includes('placeholder={placeholder ?? "Enter place of birth"}'));
check("submit logic unchanged: validation, both events, API, session keys, navigation",
  form.includes("validateLoveMatchForm(form, isHi)") && form.includes('WebsiteEvents.ctaClick("love_matchmaking_generate", "love")') &&
  form.includes('WebsiteEvents.featureUsed("love_matchmaking_generate")') && form.includes('pushMarketingMeasurementEvent({ name: "jyotishasha_love_match_success" })') &&
  form.includes("fetch(`${BACKEND}/api/love/report`") && form.includes("router.push(`${isHi ? \"/hi\" : \"\"}/love/result`)"));

console.log("\n=== E. Result summary ===");
check("the four result tiles are real links (no clickable divs)",
  !/<div onClick=/.test(summary) && ["matchmaking-compatibility", "mangal-dosh", "truth-or-dare", "marriage-potential"].every((d) => summary.includes(`<Link href={\`\${lp}/love/${d}\`}`)));
check("koota-wise table inline from the existing koota_notes section", summary.includes('s.id === "koota_notes"') && summary.includes("<table"));
check("Hindi result table uses Hindi koota names (same as the landing page)",
  ["वर्ण", "वश्य", "तारा", "योनि", "ग्रह मैत्री", "गण", "भकूट", "नाड़ी"].every((k) => summary.includes(`"${k}"`)) && summary.includes("isHi && KOOTA_HI[key]"));
check("exactly one paid report link on the summary", (summary.match(/\/love\/report\/relationship_future_report/g) || []).length === 1);
check("one H1 on the result page (no duplicate client heading)", !/Matchmaking Result/.test(summary) && src("app/[locale]/love/result/page.tsx").includes("<h1"));
check("no tracking added to result pages", !summary.includes("WebsiteEvents"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
