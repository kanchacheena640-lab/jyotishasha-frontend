/**
 * Marriage Path page structure (/tools/marriage-path, EN + HI): server rendering, FAQ/schema parity, links that
 * resolve to real routes, result empty-state handling and the shared result layout. Source-level, no network.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --outDir .ts-test-out lib/marriagePathTool.test.ts && node <compiled marriagePathTool.test.js>
 */
import * as fs from "fs";
import * as path from "path";
import { marriagePathContent } from "../app/data/toolContent/marriagePath";
import { ALL_PLANET_NAMES, planetInHouseHref, planetName } from "./rashi";
import { getAllPlanetInHouseSlugs } from "./planetInHouse";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

const page = src("app/[locale]/tools/[toolId]/page.tsx");
const landing = src("components/tools/marriage-path/MarriagePathLanding.tsx");
const result = src("components/tools/marriage-path/MarriagePathResult.tsx");
const trs = src("components/ToolResultSection.tsx");
const sugg = src("components/ToolSuggestions.tsx");

console.log("=== A. Rendering and SEO ===");
check("server-rendered landing for marriage-path; canonical/hreflang generator unchanged",
  !/^['"]use client['"]/m.test(landing) && page.includes('if (params.toolId === "marriage-path") {') && page.includes("<MarriagePathLanding locale={lang} />") &&
  page.includes("hi: `${SITE_URL}/hi/tools/${params.toolId}`"));
check("H1 and intro before the calculator island; H1 has no brand or pipe",
  landing.indexOf("<h1") > 0 && landing.indexOf("<h1") < landing.indexOf("<ToolDynamicPage submitLabel") && !/[|]/.test(marriagePathContent.en.landing.h1 + marriagePathContent.hi.landing.h1));
check("6-7 visible FAQs per language, same array as FAQPage; valid category; Hindi marked",
  [marriagePathContent.en.faq.length, marriagePathContent.hi.faq.length].every((n) => n >= 6 && n <= 7) &&
  landing.includes("c.faq.map((f) => (") && landing.includes("mainEntity: c.faq.map(") && landing.includes("applicationCategory: 'LifestyleApplication'") &&
  landing.includes("lang={isHi ? 'hi' : undefined}") && !/aggregateRating/.test(landing));
check("no unverified video embedded on this page", !/youtube|<iframe/.test(landing) && !("video" in marriagePathContent.en));

console.log("\n=== B. Links resolve to real routes ===");
const hrefs = [
  ...marriagePathContent.en.landing.related.links.map((l) => l.href),
  ...marriagePathContent.en.landing.sections.flatMap((s) => ("links" in s && s.links ? s.links.map((l) => l.href) : [])),
];
const exists = (href: string) => {
  if (href === "/kundli-matching") return fs.existsSync(path.join(root, "app/[locale]/kundli-matching/page.tsx"));
  if (href === "/marriage-astrology") return fs.existsSync(path.join(root, "lib/domains/marriage-astrology/_hub.ts"));
  if (href.startsWith("/marriage-astrology/")) return fs.existsSync(path.join(root, `lib/domains/marriage-astrology/topics/${href.split("/").pop()}.ts`));
  if (href.startsWith("/tools/")) return src("app/data/toolsData.ts").includes(`slug: "${href.split("/").pop()}"`);
  return false;
};
check(`every content link points at an existing route (${hrefs.length} links)`, hrefs.length >= 8 && hrefs.every(exists));
const realSlugs = new Set(getAllPlanetInHouseSlugs());
const lords = ["Sun", "Moon", "Mars", "Mercury", "Jupiter", "Venus", "Saturn"];
const missing = lords.flatMap((p) => Array.from({ length: 12 }, (_, i) => i + 1)
  .map((h) => (planetInHouseHref(p, h, false) as string).split("/").pop() as string).filter((s) => !realSlugs.has(s)));
check(`7th-lord guide link matches a real planet-in-house slug for every lord in every house (84; ${realSlugs.size} slugs)`, missing.length === 0);
missing.slice(0, 5).forEach((m) => console.log("     missing:", m));
check("planet link helper rejects unknown values; Hindi planet names", planetInHouseHref("Pluto", 7, false) === null && planetInHouseHref("Venus", 13, false) === null &&
  planetName("Venus", true) === "शुक्र" && ALL_PLANET_NAMES.length === 9);

console.log("\n=== C. Result ===");
check("empty point lists never render a heading", result.includes("{positives.length > 0 && (") && result.includes("{negatives.length > 0 && (") && !/Positive Points:|Negative Points:/.test(result));
check("no-rule chart shows its 7th-house facts and a factual note, no invented reading",
  result.includes('data-testid="mp-no-rule"') && result.includes("noRule && hasFacts") && result.includes(".filter((f): f is { label: string; value: string } => Boolean(f.value))"));
check("older backend without the new facts still renders (fields optional)", /seventh_sign\?: string/.test(result) && /seventh_house_planets\?: string\[\]/.test(result));
check("shared chart column also used for marriage-path; other tools keep thirds",
  trs.includes("result.toolId === 'marriage-path'") && trs.includes("lg:grid-cols-[340px_minmax(0,1fr)]") && trs.includes("'xl:grid-cols-3'"));
check("Marriage Path suggestions: marriage-related free tools, no report",
  /'marriage-path': \[[\s\S]*?\],/.test(sugg) && !/\/reports\//.test((sugg.match(/'marriage-path': \[[\s\S]*?\],/) || [""])[0]) &&
  (sugg.match(/'marriage-path': \[[\s\S]*?\],/) || [""])[0].includes("/kundli-matching"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
