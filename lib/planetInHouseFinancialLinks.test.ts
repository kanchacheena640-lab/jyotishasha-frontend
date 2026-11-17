/**
 * Checkpoint 4 -- Financial links on the 2nd, 10th and 11th house planet-in-house pages.
 *   - exactly the 27 pages of those houses (9 planets x 3) get the block; the other 81 get none;
 *   - each block links the Financial hub, the Dhan Yog tool and the Financial Report, once each;
 *   - names and the price come from the registries (domain meta, toolsData, reportsData);
 *   - Hindi keeps /hi for the hub and tool, and links the English-only report page with a notice
 *     (getReportProductPath; there is no /hi report URL);
 *   - every destination has a real route file.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/planetInHouseFinancialLinks.test.ts && node <compiled test>
 */
import * as fs from "fs";
import * as path from "path";
import { planetInHouseList } from "./planetInHouse";
import { FINANCIAL_LINK_HOUSES, resolvePlanetInHouseFinancialLinks } from "./planetInHouse/financialLinks";
import { reportsData } from "../app/data/reportsData";
import { toolsData } from "../app/data/toolsData";
import { financialAstrologyMeta } from "./domains/financial-astrology/_meta";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const DEVANAGARI = /[\u0900-\u097F]/;
const report = reportsData.find((r) => r.slug === "financial_report");
const tool = toolsData.find((t) => t.slug === "dhan-yog");

console.log("=== 1. destinations exist ===");
check("1a: financial_report is in reportsData", !!report);
check("1b: dhan-yog is in toolsData", !!tool);
check("1c: hub route app/[locale]/financial-astrology/page.tsx exists", fs.existsSync(path.join(root, "app/[locale]/financial-astrology/page.tsx")));
check("1d: tool route app/[locale]/tools/[toolId]/page.tsx exists", fs.existsSync(path.join(root, "app/[locale]/tools/[toolId]/page.tsx")));
check("1e: report route app/reports/[slug]/page.tsx exists", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
check("1f: no /hi standard-report route exists (Hindi links the /reports page)", !fs.existsSync(path.join(root, "app/[locale]/reports/[slug]")));

console.log("=== 2. coverage ===");
check("2a: houses are exactly 2, 10, 11", JSON.stringify([...FINANCIAL_LINK_HOUSES]) === "[2,10,11]");
let withLinks = 0;
for (const data of planetInHouseList) {
  for (const locale of ["en", "hi"] as const) {
    const id = `${locale}:${data.slug}`;
    const block = resolvePlanetInHouseFinancialLinks(data, locale);
    if (!FINANCIAL_LINK_HOUSES.includes(data.house)) { check(`2b: ${id} -- no block outside the 2nd/10th/11th house`, block === null); continue; }
    if (!block) { check(`2c: ${id} -- block resolved`, false); continue; }
    withLinks++;
    const lp = locale === "hi" ? "/hi" : "";
    const hrefs = block.links.map((l) => l.href);
    check(`3a: ${id} -- hub, tool, report in order`, JSON.stringify(hrefs) === JSON.stringify([`${lp}/financial-astrology`, `${lp}/tools/dhan-yog`, "/reports/financial_report"]));
    check(`3b: ${id} -- no duplicate link`, new Set(hrefs).size === 3);
    const [hub, t, r] = block.links;
    check(`3c: ${id} -- hub label from domain meta`, hub.label.startsWith(locale === "hi" ? financialAstrologyMeta.label_hi : financialAstrologyMeta.label));
    check(`3d: ${id} -- tool label from toolsData`, !!tool && t.label.includes(tool.title[locale]));
    check(`3e: ${id} -- report label is the catalog name and price`, !!report && r.label === `${report.title[locale]} — ₹${report.price}`);
    const text = [block.lead, ...block.links.map((l) => l.label), block.notice ?? ""].join(" ");
    if (locale === "hi") {
      check(`3f: ${id} -- Hindi copy is Devanagari`, DEVANAGARI.test(block.lead) && block.links.every((l) => DEVANAGARI.test(l.label)));
      check(`3g: ${id} -- English-only report notice shown`, !!block.notice && block.notice.includes("अंग्रेज़ी"));
    } else {
      check(`3h: ${id} -- English copy has no Devanagari`, !DEVANAGARI.test(text));
      check(`3i: ${id} -- no notice on English pages`, block.notice === undefined);
    }
  }
}
check(`2d: 54 blocks (27 pages x en/hi), got ${withLinks}`, withLinks === 54);

console.log("=== 4. source guards ===");
const cfg = fs.readFileSync(path.join(root, "lib/planetInHouse/financialLinks.ts"), "utf8");
check("4a: no hand-typed price in the config", !/₹\s?\d/.test(cfg));
const page = fs.readFileSync(path.join(root, "app/[locale]/planet-in-house/[slug]/page.tsx"), "utf8");
// The Career & Finance section is a ternary: with links, or exactly the original section (no empty child in the RSC payload).
const personality = page.indexOf('t("Personality", "व्यक्तित्व")');
const block = page.indexOf("{financialLinks ? (");
const relationships = page.indexOf("{/* Relationships */}");
check("4b: page renders the block in the Career & Finance section (after Personality, before Relationships)", personality > 0 && block > personality && block < relationships);
check("4c: page renders it once", page.split("{financialLinks ? (").length === 2 && page.split("financialLinks.links.map").length === 2);
check("4d: no `financialLinks &&` child (would add an empty slot to every other page)", !page.includes("{financialLinks && ("));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
