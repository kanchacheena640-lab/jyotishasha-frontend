/**
 * lib/marriagePathToolCopy.test.ts
 *
 * Marriage Path correctness gate: the free tool's page copy describes only what the tool computes
 * (backend services/marriage_path.py: 7th-house occupants, Venus/Jupiter exaltation/debilitation,
 * Rahu with the 7th lord, a dominant-planet note). It must not claim Navamsa (D9) or Dasha analysis.
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

for (const locale of ["en", "hi"] as const) {
  const c = marriagePathContent[locale].content;
  const how = c.howToolWorks;
  console.log(`=== ${locale.toUpperCase()} ===`);
  check(`${locale}: 'how the tool works' names only computed factors`,
    locale === "en"
      ? ["7th house", "Venus and Jupiter", "exalted or debilitated", "Rahu", "lord of the 7th house", "strongest influence"].every((w) => how.includes(w))
      : ["सप्तम भाव", "शुक्र और बृहस्पति", "उच्च या नीच", "राहु", "सप्तमेश", "सबसे प्रबल प्रभाव"].every((w) => how.includes(w)));
  check(`${locale}: D9 / Dasha are mentioned only as NOT analysed`,
    locale === "en"
      ? /It does not analyse the Navamsa \(D9\) chart or your Dasha periods\.$/.test(how) && !/Mahadasha|Antardasha|time windows/i.test(how)
      : /यह नवमांश \(D9\) कुंडली या आपकी दशाओं का विश्लेषण नहीं करता।$/.test(how) && !/महादशा|अंतर्दशा|समय अवधि/.test(how));
  const toolClaims = [how, ...c.benefits].join(" ");
  check(`${locale}: no tool claim of timing windows / Navamsa strength / Dasha correlation in the benefits`,
    !/ideal marriage timing|time windows|Navamsha|correlating|अनुकूल समय|नवमांश \(D9\) कुंडली की शक्ति|समन्वय/.test(c.benefits.join(" ")) &&
    !/sophisticated analysis|सूक्ष्म विश्लेषण/.test(toolClaims));
}

console.log("=== Result CTA -> Marriage Report (catalogue route + price) ===");
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);
const result = fs.readFileSync(path.join(root, "components/ToolResultSection.tsx"), "utf8");
const mp = result.slice(result.indexOf("{/* Marriage Path Start */}"), result.indexOf("{/* Marriage Path End */}"));
const report = reportsData.find((r) => r.slug === "marriage_report");
check("catalogue: marriage_report is rep_004 with a catalogue price", report?.id === "rep_004" && typeof report.price === "number" && report.price > 0);
check("report route exists (/reports/[slug])", fs.existsSync(path.join(root, "app/reports/[slug]/page.tsx")));
check("result component resolves the product from the catalogue by slug",
  result.includes("const MARRIAGE_PATH_REPORT = reportsData.find((r) => r.slug === 'marriage_report');"));
check("result CTA is a link to /reports/<catalogue slug>, not a dead button",
  mp.includes("href={`/reports/${MARRIAGE_PATH_REPORT.slug}`}") && !/<button\b/.test(mp) && !/Buy Now/.test(mp));
check("CTA wording EN + HI with the catalogue price (no hard-coded amount)",
  mp.includes("`Get Detailed Marriage Report – ₹${MARRIAGE_PATH_REPORT.price}`") && mp.includes("`विस्तृत विवाह रिपोर्ट पाएं – ₹${MARRIAGE_PATH_REPORT.price}`") &&
  !/₹\s*\d/.test(mp));
check("CTA never points at love_marriage_report, never says intercaste / D9 / exact age or date",
  !/love_marriage_report|Intercaste|Navamsa|D9|exact (age|date)/i.test(mp));

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
