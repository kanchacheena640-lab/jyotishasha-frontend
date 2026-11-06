/**
 * Mangal Dosh calculator (/tools/mangal-dosh, EN + HI) -- Architecture A guards. Source-level, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --outDir .ts-test-out lib/mangalDoshTool.test.ts && node .ts-test-out/lib/mangalDoshTool.test.js
 */
import * as fs from "fs";
import * as path from "path";
import { mangalDoshContent } from "../app/data/toolContent/mangalDosh";
import { ENGINE_MANGAL_DOSH_HOUSES, houseOrdinal, marsInHouseHref, mangalStatusView } from "./mangalDosh";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const page = src("app/[locale]/tools/[toolId]/page.tsx");
const landing = src("components/tools/mangal-dosh/MangalDoshLanding.tsx");
const result = src("components/tools/mangal-dosh/MangalDoshResult.tsx");
const cta = src("components/tools/mangal-dosh/MangalDoshReportCta.tsx");
const trs = src("components/ToolResultSection.tsx");
const form = src("components/ToolInputForm.tsx");
const dyn = src("app/[locale]/tools/[toolId]/ToolDynamicPage.tsx");
const sugg = src("components/ToolSuggestions.tsx");
const fetchFk = src("utils/fetchFullKundali.ts");
const fetchLt = src("utils/fetchLifeTool.ts");
const engine = fs.existsSync(path.join(root, "../../Python/Jyotishasha_Backend-main/services/mangalik_dosh_logic.py"))
  ? fs.readFileSync(path.join(root, "../../Python/Jyotishasha_Backend-main/services/mangalik_dosh_logic.py"), "utf8") : null;

console.log("=== A. URLs, metadata, rendering ===");
check("canonical + hreflang generator unchanged for every tool",
  page.includes("canonical: `https://www.jyotishasha.com/${lang === 'hi' ? 'hi/' : ''}tools/${params.toolId}`") &&
  page.includes("en: `${SITE_URL}/tools/${params.toolId}`") && page.includes("hi: `${SITE_URL}/hi/tools/${params.toolId}`"));
check("page.tsx stays a server component and renders the Mangal Dosh landing on the server",
  !/^['"]use client['"]/m.test(page) && page.includes('if (params.toolId === "mangal-dosh") {') && page.includes("<MangalDoshLanding locale={lang} />") && !/^['"]use client['"]/m.test(landing));
check("tool pages prerendered (generateStaticParams from the content map); unknown tool -> 404",
  page.includes("export function generateStaticParams()") && page.includes("if (!tool) notFound();"));
check("titles unchanged (EN + HI); descriptions no longer promise remedies",
  mangalDoshContent.en.seo.title === "Mangal Dosh Calculator – Accurate Manglik Dosha Check | Vedic Astrology" &&
  mangalDoshContent.hi.seo.title === "मंगल दोष कैलकुलेटर – कुंडली में मांगलिक दोष की सटीक जाँच | ज्‍योतिष आशा" &&
  !/remed/i.test(mangalDoshContent.en.seo.description) && !/उपाय/.test(mangalDoshContent.hi.seo.description));

console.log("\n=== B. Server HTML structure ===");
check("H1 (no brand / pipe) then intro BEFORE the calculator island",
  landing.indexOf("<h1") > 0 && landing.indexOf("<h1") < landing.indexOf("<ToolDynamicPage submitLabel") && !/[|]/.test(mangalDoshContent.en.landing.h1 + mangalDoshContent.hi.landing.h1));
check("H2 sections in order: shows, how, cancellation, marriage, houses, FAQ, related",
  ["md-shows", "md-how", "md-cancel", "md-marriage", "md-houses", "md-faq", "md-related"].every((id, i, a) => i === 0 || landing.indexOf(`id="${a[i - 1]}"`) < landing.indexOf(`id="${id}"`)));
check("visible FAQ and FAQPage schema come from the same array (5-8 questions per language)",
  landing.includes("c.faq.map((f) => (") && landing.includes("mainEntity: c.faq.map(") &&
  [mangalDoshContent.en.faq.length, mangalDoshContent.hi.faq.length].every((n) => n >= 5 && n <= 8) &&
  mangalDoshContent.en.faq.length === mangalDoshContent.hi.faq.length);
check("visible breadcrumb matches the BreadcrumbList schema; WebApplication has no ratings",
  landing.includes('aria-label={isHi ? \'ब्रेडक्रम्ब\' : \'Breadcrumb\'}') && landing.includes("itemListElement: crumbs.map(") && !/aggregateRating|"Review"/.test(landing));
check("Hindi page marked lang=hi", landing.includes("lang={isHi ? 'hi' : undefined}"));

console.log("\n=== C. Claims match the engine ===");
const allText = JSON.stringify(mangalDoshContent);
check("no unsupported claims (100%, 20+ rules, degrees, guarantees, remedies, success stories)",
  !/100%|over 20|20 से अधिक|degree|डिग्री|guarantee|गारंटी|remed|उपाय|most successful|सबसे सफल/i.test(allText));
check("houses 1, 2, 4, 7, 8, 12 from Lagna and Moon; three cancellation conditions named",
  allText.includes("1st, 2nd, 4th, 7th, 8th or 12th") && allText.includes("1, 2, 4, 7, 8 या 12") &&
  mangalDoshContent.en.landing.cancel.items.length === 3 && mangalDoshContent.hi.landing.cancel.items.length === 3 &&
  allText.includes("Aries or Scorpio") && allText.includes("Capricorn"));
check("ENGINE_MANGAL_DOSH_HOUSES matches the backend MD_HOUSES",
  ENGINE_MANGAL_DOSH_HOUSES.join(",") === "1,2,4,7,8,12" && (engine === null || engine.includes("MD_HOUSES = {1, 2, 4, 7, 8, 12}")));
if (engine) {
  check("own/exalted signs and Jupiter-only cancellation match the backend",
    engine.includes('return sign in {"Aries", "Scorpio", "Capricorn"}') && engine.includes('CANCELLING_BENEFICS = {"Jupiter"}') && engine.includes("KENDRA_HOUSES = {1, 4, 7, 10}"));
}
check("status labels for every backend strength (EN + HI)",
  ["None", "Cancelled", "Partial", "Strong"].every((s) => mangalStatusView(s, false).tone !== "unknown" && /[ऀ-ॿ]/.test(mangalStatusView(s, true).label)));
check("Mars-in-house links use the existing planet-in-house slugs",
  marsInHouseHref(7, false) === "/planet-in-house/mars-in-7th-house" && marsInHouseHref(1, true) === "/hi/planet-in-house/mars-in-1st-house" &&
  houseOrdinal(12, true) === "बारहवें" && houseOrdinal(2, false) === "2nd");

console.log("\n=== D. Result card ===");
check("structured result: status, Mars from Lagna/Moon, Jupiter, 3 cancellation flags",
  ["mars_house_from_lagna", "mars_house_from_moon", "jupiter_house_from_lagna", "jupiter_house_from_moon",
    "mars_own_or_exalted", "jupiter_in_kendra_from_lagna_or_moon", "benefic_aspect_or_conjunction_on_mars"].every((k) => result.includes(k)) &&
  result.includes("mangalStatusView(data.status?.strength, isHi)"));
check("ToolResultSection renders the card for mangal-dosh; old English-only block removed",
  trs.includes("<MangalDoshResult data={kundaliData.manglik_dosh} locale={ctaLocale} />") && !trs.includes("Status: {kundaliData.manglik_dosh.status.is_mangalic}"));
check("links: Kundli Matching, Marriage hub, the Mars-in-house guide",
  result.includes("kundliMatchingHref(isHi)") && result.includes("`${lp}/marriage-astrology`") && result.includes("marsInHouseHref(marsHouse, isHi)"));
check("₹99 Marriage Report CTA: price from reportsData, path from getReportProductPath, existing tracking pattern",
  cta.includes("MANGAL_DOSH_REPORT_SLUG = 'marriage_report'") && cta.includes("getReportProductPath(report.slug, locale)") &&
  cta.includes("₹${report.price}") && cta.includes("trackYogaReportCtaClick(MANGAL_DOSH_REPORT_CTA)") && cta.includes("'tools_mangal-dosh_report_cta'"));
check("no Sade Sati upsell on the Mangal Dosh result (own suggestions, no unrelated report)",
  /'mangal-dosh': \[[\s\S]*?\],/.test(sugg) && !/'mangal-dosh': \[[^\]]*sadhesati/.test(sugg));
check("result grid: chart column fits the 320px chart (no third-width track below xl), columns can shrink",
  trs.includes("lg:grid-cols-[340px_minmax(0,1fr)]") && trs.includes("'xl:grid-cols-3'") && !trs.includes("md:grid-cols-3") &&
  trs.includes('className="min-w-0 flex justify-center items-start"') && trs.includes('className="w-full max-w-[360px] mx-auto"'));
check("ToolResultSection keeps exactly one onClick and no WebsiteEvents", (trs.match(/onClick=/g) || []).length === 1 && !trs.includes("WebsiteEvents"));

console.log("\n=== E. Shared form + calculator wrapper ===");
check("form: Hindi route asks the backend for Hindi (locale default; cache no longer overrides it)",
  form.includes("useState<'en' | 'hi'>(locale || userData.language || 'en')") && form.includes("if (userData.language && !locale) setLanguage(userData.language);") &&
  dyn.includes("locale={formLocale}") && dyn.includes("const formLocale: 'en' | 'hi' = locale === 'hi' ? 'hi' : 'en';"));
check("form: every field has a programmatic label; navy labels; 16px / 48px fields",
  ["name", "dob", "tob", "pob", "gender", "language"].every((f) => form.includes(`htmlFor={id('${f}')}`) && form.includes(`id={id('${f}')}`)) &&
  form.includes("text-[#1B2A4A]") && form.includes("min-h-[48px]") && form.includes("text-[16px]"));
check("form: DD-MM-YYYY, Hindi calendar, unchanged local-date conversion",
  form.includes('placeholderText="DD-MM-YYYY"') && form.includes('dateFormat="dd-MM-yyyy"') && form.includes("registerLocale('hi', hiLocale);") &&
  form.includes("onChange={(date: Date | null) => setDob(date ? toISODate(date) : '')}") && form.includes("Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())"));
check("form: inline role=alert validation (no alert()), localized labels",
  !/\balert\(/.test(form) && form.includes('role="alert"') && form.includes("noValidate") && form.includes("'परिणाम की भाषा'"));
check("form: payload shape unchanged", form.includes("pob: place.name,\n      latitude: place.lat,\n      longitude: place.lng,\n      toolId,") || /pob: place\.name,\s+latitude: place\.lat,\s+longitude: place\.lng,\s+toolId,/.test(form));
check("wrapper: visible API failure + busy state; result UI loaded on demand",
  dyn.includes('role="alert" data-testid="tool-calc-error"') && dyn.includes("setFailed(true);") && dyn.includes("busy={loading}") &&
  dyn.includes("dynamic(() => import('@/components/ToolResultSection'))"));
check("no personal birth data logged to the console",
  !/console\.(log|error)\([^)]*(payload|json|out|text|errorText)\b/.test(fetchFk + fetchLt) && !/console\.log/.test(fetchFk + fetchLt));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
