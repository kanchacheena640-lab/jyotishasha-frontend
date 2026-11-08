/**
 * lib/marriagePathToolCopy.test.ts
 *
 * Marriage Path correctness gate: the free tool's page describes only what the tool computes
 * (backend services/marriage_path.py: 7th sign and lord, the lord's house, 7th-house occupants,
 * Venus/Jupiter exaltation/debilitation, Rahu with the 7th lord, and a "key influence" -- the first
 * planet a rule finds, not a strength ranking). It must not claim timing, compatibility, Navamsa (D9)
 * or Dasha analysis, and the result's single ₹99 CTA must use the catalogue + product-path helper.
 * Standalone, repo convention:
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --resolveJsonModule --esModuleInterop --outDir .ts-test-out lib/marriagePathToolCopy.test.ts
 *   node .ts-test-out/lib/marriagePathToolCopy.test.js
 */
import * as fs from "fs";
import * as path from "path";
import { marriagePathContent } from "../app/data/toolContent/marriagePath";
import { reportsData } from "../app/data/reportsData";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const src = (rel: string) => fs.readFileSync(path.join(root, rel), "utf8");

for (const locale of ["en", "hi"] as const) {
  const c = marriagePathContent[locale];
  const checks = c.landing.sections.find((s) => s.id === "mp-checks")!.body.join(" ");
  const all = JSON.stringify(c);
  console.log(`=== ${locale.toUpperCase()} ===`);
  check(`${locale}: 'what this calculator checks' names only computed factors`,
    locale === "en"
      ? ["7th house sign", "its lord", "Venus or Jupiter", "exalted or debilitated", "Rahu", "7th lord", "key influence"].every((w) => checks.includes(w))
      : ["सप्तम भाव की राशि", "सप्तमेश", "शुक्र या गुरु", "उच्च या नीच", "राहु", "प्रमुख प्रभाव"].every((w) => checks.includes(w)));
  check(`${locale}: key influence is described as the first match, not strength`,
    locale === "en" ? checks.includes("not a ranking of strength") && !/strongest|dominant/i.test(all) : checks.includes("बल की तुलना नहीं") && !/सबसे प्रबल/.test(all));
  check(`${locale}: D9 / Dasha named only as NOT analysed; no timing or compatibility claim`,
    locale === "en"
      ? checks.includes("It does not analyse the Navamsa (D9) chart or your Dasha periods, so it does not predict when you will marry or how compatible you are with a partner.")
      : checks.includes("यह नवमांश (D9) कुंडली या आपकी दशाओं का विश्लेषण नहीं करता, इसलिए यह विवाह का समय या जीवनसाथी से अनुकूलता नहीं बताता।"));
  check(`${locale}: title and description position a 7th-house analysis, not timing or compatibility`,
    (locale === "en" ? /7th House Marriage Analysis/.test(c.seo.title) : /सप्तम भाव से विवाह विश्लेषण/.test(c.seo.title)) &&
    !/Timing|Compatibility|समय और अनुकूलता/.test(c.seo.title) && !/timing|compatib/i.test(c.seo.description));
  check(`${locale}: no unsupported accuracy or destiny claims`,
    !/100%|accurate|authentic|cosmic blueprint|union of two souls|सटीक विश्लेषण|प्रामाणिक|आत्माओं के मिलन|guarantee|गारंटी/i.test(all));
}

console.log("=== Result CTA -> Marriage Report (catalogue route + price) ===");
const cta = src("components/tools/marriage-path/MarriagePathReportCta.tsx");
const result = src("components/tools/marriage-path/MarriagePathResult.tsx");
const trs = src("components/ToolResultSection.tsx");
const report = reportsData.find((r) => r.slug === "marriage_report");
check("catalogue: marriage_report is rep_004 with a catalogue price", report?.id === "rep_004" && typeof report.price === "number" && report.price > 0);
check("report route exists (/reports/[slug])", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
check("CTA resolves the product from the catalogue by slug and links via getReportProductPath",
  cta.includes("MARRIAGE_PATH_REPORT_SLUG = 'marriage_report'") && cta.includes("reportsData.find((r) => r.slug === MARRIAGE_PATH_REPORT_SLUG)") &&
  cta.includes("href={getReportProductPath(report.slug, locale)}"));
check("CTA is a tracked link (fixed ids), not a button; price from the catalogue only",
  cta.includes("trackYogaReportCtaClick(MARRIAGE_PATH_REPORT_CTA)") && cta.includes("'tools_marriage-path_report_cta'") &&
  !/<button\b/.test(cta) && !/₹\s*\d/.test(cta) && cta.includes("₹${report.price}"));
check("exactly one paid CTA on the result; never love_marriage_report / D9 / exact date",
  (result.match(/<MarriagePathReportCta/g) || []).length === 1 && !/\/reports\//.test(result) &&
  !/love_marriage_report|Navamsa|exact (age|date)/i.test(cta + result));
const mpBlock = trs.slice(trs.indexOf("{/* Marriage Path Start */}"), trs.indexOf("{/* Marriage Path End */}"));
check("ToolResultSection renders the card; the old inline block and its English headings are gone",
  mpBlock.includes("<MarriagePathResult data={kundaliData.marriage_path} locale={ctaLocale} />") &&
  !mpBlock.includes("Positive Points:") && !trs.includes("💖 Marriage Life Report") && !trs.includes("MARRIAGE_PATH_REPORT"));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
