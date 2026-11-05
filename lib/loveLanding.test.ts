/**
 * Free Kundli Matching landing (/kundli-matching, moved from /love) -- redesign + migration guards.
 * Source-level checks only (no network). The landing moved to /kundli-matching; /love, /hi/love and /en/love
 * 308-redirect there; every /love/* child route (session results, ₹199 product page) keeps its URL.
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

const page = src("app/[locale]/kundli-matching/page.tsx");
const form = src("app/[locale]/love/LoveForm.tsx");
const summary = src("app/[locale]/love/result/LoveResultSummaryDetail.tsx");
const sitemap = src("app/sitemap.ts");
const nextConfig = src("next.config.js");
const route = src("lib/kundliMatchingRoute.ts");
const SESSION = ["result", "matchmaking-compatibility", "mangal-dosh", "marriage-potential", "truth-or-dare"];
const DETAILS = [
  "matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx", "mangal-dosh/MangalDoshDetail.tsx",
  "marriage-potential/MarriagePotentialDetail.tsx", "truth-or-dare/TruthOrDareDetail.tsx",
];

console.log("=== A. URL migration and indexing ===");
check("route constant: /kundli-matching", route.includes('export const KUNDLI_MATCHING_PATH = "/kundli-matching";'));
check("canonical + hreflang en/hi/x-default point at /kundli-matching",
  page.includes("const canonicalUrl = `${SITE_URL}${isHi ? \"/hi\" : \"\"}${KUNDLI_MATCHING_PATH}`;") &&
  page.includes("en: `${SITE_URL}${KUNDLI_MATCHING_PATH}`,") && page.includes("hi: `${SITE_URL}/hi${KUNDLI_MATCHING_PATH}`,") &&
  page.includes('"x-default": `${SITE_URL}${KUNDLI_MATCHING_PATH}`,'));
check("one landing only: /love has no page of its own any more (no duplicate indexable landing)",
  !fs.existsSync(path.join(root, "app/[locale]/love/page.tsx")) && fs.existsSync(path.join(root, "app/[locale]/kundli-matching/page.tsx")));
check("permanent (308) redirects for the three old landing URLs, exact paths only",
  nextConfig.includes("{ source: '/love', destination: '/kundli-matching', permanent: true },") &&
  nextConfig.includes("{ source: '/hi/love', destination: '/hi/kundli-matching', permanent: true },") &&
  nextConfig.includes("{ source: '/en/love', destination: '/kundli-matching', permanent: true },") &&
  !/source: '\/(hi\/|en\/)?love\/:/.test(nextConfig));
check("every /love/* child route keeps its page (session results + ₹199 product page)",
  [...SESSION, "report/relationship_future_report"].every((d) => fs.existsSync(path.join(root, `app/[locale]/love/${d}/page.tsx`))));
for (const d of SESSION) {
  check(`session-only page /love/${d} is noindex,follow`, /robots: \{ index: false, follow: true \}/.test(src(`app/[locale]/love/${d}/page.tsx`)));
}
check("sitemap lists /kundli-matching (EN + HI) and the ₹199 product page; no /love landing, no session pages",
  sitemap.includes("createUrl(`${baseUrl}${KUNDLI_MATCHING_PATH}`, 0.75, \"monthly\")") &&
  sitemap.includes("createUrl(`${baseUrl}/hi${KUNDLI_MATCHING_PATH}`, 0.7, \"monthly\")") &&
  sitemap.includes("createProductUrl(`${baseUrl}${RELATIONSHIP_REPORT_PATH}`") && sitemap.includes("createProductUrl(`${baseUrl}/hi${RELATIONSHIP_REPORT_PATH}`") &&
  !sitemap.includes("`${baseUrl}/love") && !sitemap.includes("`${baseUrl}/hi/love") && !SESSION.some((d) => sitemap.includes(`"/${d}"`)));
check("landing itself is not noindex", !/robots:/.test(page));
check("internal landing links use /kundli-matching (hub, compatibility CTA, cross-links, muhurat grid, report breadcrumb)",
  src("lib/domains/marriage-astrology/_hub.ts").includes("{ href: '/kundli-matching', icon: '💍',") &&
  src("lib/domains/marriage-astrology/_landing.ts").includes("href: '/kundli-matching',") &&
  ["compatibility", "married-life"].every((t) => /domain: +'kundli-matching',\s+slug: +'',/.test(src(`lib/domains/marriage-astrology/topics/${t}.ts`))) &&
  src("components/muhurat/QuickActionGrid.tsx").includes('/kundli-matching`,') &&
  src("app/[locale]/love/report/relationship_future_report/page.tsx").includes("path: `${prefix}/kundli-matching`"));
check("no code path still sends visitors to the old landing (result + detail guards, 'check another match')",
  [summary, ...DETAILS.map((f) => src(`app/[locale]/love/${f}`))].every((s) => !/\/love`\)|\/love`\}/.test(s) && !s.includes('"/hi" : ""}/love`')) &&
  summary.includes("router.replace(kundliMatchingHref(isHi))") && summary.includes("<Link href={kundliMatchingHref(isHi)}"));

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
check("date of birth shows DD-MM-YYYY on every device (no locale-dependent native date input)",
  !form.includes('type="date"') && form.includes('dateFormat="dd-MM-yyyy"') && form.includes('placeholderText="DD-MM-YYYY"') &&
  /import DatePicker(, \{ registerLocale \})? from "react-datepicker";/.test(form));
check("DOB stays YYYY-MM-DD without timezone shift (local-midnight parse + shared formatCalendarDob)",
  form.includes("new Date(`${form[key].dob}T00:00:00`)") &&
  form.includes('onChange={(date: Date | null) => update(key, "dob", date ? formatCalendarDob(date) : "")}') &&
  form.includes('import { formatCalendarDob } from "@/lib/formatCalendarDob";'));
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

console.log("\n=== F. Date/time fields ===");
check("Hindi calendar: month and weekday names localised (date-fns hi), display only",
  form.includes('import { hi as hiLocale } from "date-fns/locale/hi";') && form.includes('registerLocale("hi", hiLocale);') &&
  form.includes('locale={isHi ? "hi" : undefined}') && form.includes('dateFormat="dd-MM-yyyy"'));
check("time input uses the compact padding so the browser's AM/PM is not clipped",
  form.includes('const compactInputClass = inputClass.replace("px-4", "px-3");') &&
  form.includes('type="time" className={compactInputClass}') && /className=\{compactInputClass\}\s+wrapperClassName/.test(form));

console.log("\n=== G. Result-detail pages (editorial redesign, logic unchanged) ===");
for (const f of DETAILS) {
  const s = src(`app/[locale]/love/${f}`);
  const name = f.split("/").pop();
  check(`${name}: ivory editorial UI (no dark #0f0a1e, no tiny 10-12px text)`, !s.includes("#0f0a1e") && !/text-\[1[0-2]px\]|text-xs/.test(s) && s.includes('from "../loveDetailUi"'));
  check(`${name}: one real ₹199 report link (no router.push button)`,
    (s.match(/\/love\/report\/relationship_future_report/g) || []).length === 1 && !s.includes("router.push(") && s.includes("<DetailNextSteps"));
  check(`${name}: still reads the same session keys and adds no tracking`,
    s.includes('sessionStorage.getItem("love_') && !s.includes("WebsiteEvents") && !s.includes("sessionStorage.setItem"));
}
for (const d of ["matchmaking-compatibility", "mangal-dosh", "marriage-potential", "truth-or-dare"]) {
  const p = src(`app/[locale]/love/${d}/page.tsx`);
  check(`/love/${d}: one H1 via the shared frame (lang marked), noindex kept`,
    p.includes("<DetailPageFrame") && !p.includes("<h1") && p.includes("robots: { index: false, follow: true }"));
}
const ui = src("app/[locale]/love/loveDetailUi.tsx");
check("shared frame: one navy H1, lang on Hindi, no hooks / data access",
  (ui.match(/<h1/g) || []).length === 1 && ui.includes('lang={isHi ? "hi" : undefined}') && !/use(State|Effect)|sessionStorage|fetch\(|WebsiteEvents/.test(ui));
check("approximate score never shows a number on the koota detail page either",
  src("app/[locale]/love/matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx").includes('loveScorePrecision(data, storedPayload) === "approximate"') &&
  src("app/[locale]/love/matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx").includes('{approximate ? "—" : verdict.score}'));
check("Hindi marriage-tendency band label (no English 'Band:' on /hi)", src("app/[locale]/love/marriage-potential/MarriagePotentialDetail.tsx").includes('{isHi ? "स्तर" : "Band"}: {r.band}'));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
