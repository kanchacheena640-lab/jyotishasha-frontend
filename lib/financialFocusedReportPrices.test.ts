/**
 * Checkpoint 1 -- Financial focused-report price accuracy.
 * In the 5 Financial focused-report content modules, every visible mention of a linked standard report
 * (/reports/<slug>) carries that report's catalog price (app/data/reportsData.ts), in EN and HI:
 *   - each internalLinks label pointing at /reports/<slug> shows exactly "₹<catalog price>";
 *   - the differentiation text never pairs ₹51 (the focused price) with a standard report name;
 *   - the prices are rendered from the catalog in source (no retyped standard-report price).
 * The focused reports' own ₹51 price (links to /reports/focused/*) is untouched.
 * Run: node_modules/.bin/tsc --module commonjs --target es2020 --strict --skipLibCheck --resolveJsonModule \
 *        --esModuleInterop --jsx react-jsx --outDir .ts-test-out lib/financialFocusedReportPrices.test.ts && node <compiled test>
 */
import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";
import { businessStartTiming } from "../app/data/focused-report-content/business_start_timing";
import { debtPressureEasing } from "../app/data/focused-report-content/debt_pressure_easing";
import { incomeIncreaseTiming } from "../app/data/focused-report-content/income_increase_timing";
import { newJobTiming } from "../app/data/focused-report-content/new_job_timing";
import { promotionTiming } from "../app/data/focused-report-content/promotion_timing";
import { getFocusedReportConfigBySlug } from "../app/data/focusedReportsConfig";

let passed = 0;
let failed = 0;
function check(label: string, ok: boolean): void {
  if (ok) { passed++; console.log(`  PASS: ${label}`); } else { failed++; console.log(`  FAIL: ${label}`); }
}
let root = __dirname;
while (!fs.existsSync(path.join(root, "package.json")) && path.dirname(root) !== root) root = path.dirname(root);

const FILES: Record<string, { file: string; content: typeof businessStartTiming }> = {
  business_start_timing: { file: "business_start_timing.ts", content: businessStartTiming },
  debt_pressure_easing: { file: "debt_pressure_easing.ts", content: debtPressureEasing },
  income_increase_timing: { file: "income_increase_timing.ts", content: incomeIncreaseTiming },
  new_job_timing: { file: "new_job_timing.ts", content: newJobTiming },
  promotion_timing: { file: "promotion_timing.ts", content: promotionTiming },
};
const price = (slug: string) => reportsData.find((r) => r.slug === slug)?.price;
// Names the standard reports carry in these modules' visible copy (EN + HI).
const STANDARD_NAMES = /Startup Suggestion|Business Report|Business रिपोर्ट|Financial Stability|Financial Report|Financial रिपोर्ट|Career Report|करियर रिपोर्ट/;

for (const [key, { file, content }] of Object.entries(FILES)) {
  console.log(`\n=== ${key} ===`);
  check(`${key}: still the content of a real ₹51 focused product`, getFocusedReportConfigBySlug(key.replace(/_/g, "-"))?.priceRupees === 51);
  const standardLinks = content.internalLinks.filter((l) => /^\/reports\/[a-z_]+$/.test(l.path));
  check(`${key}: links at least one standard report`, standardLinks.length > 0);
  for (const link of standardLinks) {
    const slug = link.path.split("/")[2];
    const p = price(slug);
    for (const lang of ["en", "hi"] as const) {
      const prices = [...link.label[lang].matchAll(/₹\s?(\d+)/g)].map((m) => Number(m[1]));
      check(`${key} [${lang}] "${link.label[lang]}" shows the catalog price ₹${p} for ${slug}`, p !== undefined && prices.length === 1 && prices[0] === p);
    }
  }
  for (const link of content.internalLinks.filter((l) => l.path.startsWith("/reports/focused/"))) {
    for (const lang of ["en", "hi"] as const) {
      check(`${key} [${lang}] focused-report link keeps its own ₹51 ("${link.label[lang]}")`, link.label[lang].includes("₹51"));
    }
  }
  for (const lang of ["en", "hi"] as const) {
    const text = content.differentiation[lang];
    const sentences = text.split(/(?<=[.।])\s+/);
    const bad = sentences.filter((s) => /₹\s?51/.test(s) && STANDARD_NAMES.test(s));
    check(`${key} [${lang}] differentiation pairs no standard report with ₹51`, bad.length === 0);
    for (const m of text.matchAll(/₹\s?(\d+)/g)) {
      check(`${key} [${lang}] differentiation price ₹${m[1]} is a real catalog price`, reportsData.some((r) => r.price === Number(m[1])) || Number(m[1]) === 51);
    }
  }
  const src = fs.readFileSync(path.join(root, "app/data/focused-report-content", file), "utf8");
  check(`${key}: standard-report prices come from the catalog in source (reportsData import, no retyped price)`,
    src.includes('import { reportsData } from "../reportsData";') && src.includes("reportPrice(") &&
    !/\/reports\/[a-z_]+", localized: false, label: \{ en: "[^"]*₹\d+/.test(src));
}

console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
if (failed) process.exit(1);
