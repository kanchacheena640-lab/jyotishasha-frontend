// lib/loveMatchmakingAnalytics.test.ts

/**
 * Task 13E regression tests for app/[locale]/love/LoveForm.tsx -- the
 * Match Making free-calculation submit handler (Task 13D's own finding:
 * the actual interactive form, embedded directly on /love, distinct from
 * the SEO hub in page.tsx). Neither this file nor React components in
 * general are unit-testable via direct rendering in this repo (no
 * component-rendering harness -- confirmed repeatedly across every
 * earlier task), so, matching lib/websiteEvents.test.ts's and
 * lib/toolsAnalytics.test.ts's own established "Strategy 2" (direct
 * source-text inspection via fs.readFileSync), this file proves the
 * exact placement/semantics invariants Task 13E requires by reading the
 * real, committed source and asserting structural facts about it.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/loveMatchmakingAnalytics.test.ts
 *   node .ts-test-out/loveMatchmakingAnalytics.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

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

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

const LOVE_FORM_PATH = "app/[locale]/love/LoveForm.tsx";
const src = readSource(LOVE_FORM_PATH);

console.log("\n=== LoveForm.tsx -- Match Making free-calculation submit handler ===");

// 1. imports the existing, established WebsiteEvents facade -- no new
// analytics helper/framework introduced, no direct fetch to an analytics
// endpoint.
check("1: imports WebsiteEvents from the existing lib/websiteEvents facade (no second analytics framework)",
  src.includes('import { WebsiteEvents } from "@/lib/websiteEvents"'));

const submitBody = src.slice(src.indexOf("const submit = async"), src.lastIndexOf("};") + 2);

// 2/3/4. cta_click fires exactly once, AFTER the required local
// validation block (both DOBs present, both lat !== 0), and BEFORE the
// API calls (Promise.all / try block) begin.
const ctaClickOccurrences = (submitBody.match(/WebsiteEvents\.ctaClick\(/g) || []).length;
check("2: WebsiteEvents.ctaClick is called exactly once in submit", ctaClickOccurrences === 1);
check("3: ctaClick fires AFTER the required local validation block (after the DOB/lat check's own return)",
  submitBody.indexOf("Please fill birth details correctly") < submitBody.indexOf("WebsiteEvents.ctaClick("));
check("4: ctaClick fires BEFORE the try block (before Promise.all/API calls begin)",
  submitBody.indexOf("WebsiteEvents.ctaClick(") < submitBody.indexOf("try {"));

// 5/6/7/8. feature_used fires exactly once, INSIDE the try block, AFTER
// all three sessionStorage writes (the point at which the usable result
// is actually safely prepared/stored), BEFORE the result-page
// navigation, and never inside the catch/finally blocks.
const tryBlockStart = submitBody.indexOf("try {");
const catchBlockStart = submitBody.indexOf("} catch");
const finallyBlockStart = submitBody.indexOf("} finally");
const tryBlock = submitBody.slice(tryBlockStart, catchBlockStart);
const catchAndFinallyBlock = submitBody.slice(catchBlockStart);
const featureUsedOccurrences = (submitBody.match(/WebsiteEvents\.featureUsed\(/g) || []).length;
check("5: WebsiteEvents.featureUsed is called exactly once in submit", featureUsedOccurrences === 1);
check("6: featureUsed is inside the try block (success path only)", tryBlock.includes("WebsiteEvents.featureUsed("));
check("6b: featureUsed fires AFTER all three sessionStorage.setItem calls -- only after the usable result is safely stored",
  tryBlock.indexOf('sessionStorage.setItem("love_payload"') < tryBlock.indexOf("WebsiteEvents.featureUsed(")
  && tryBlock.indexOf('sessionStorage.setItem("love_summary"') < tryBlock.indexOf("WebsiteEvents.featureUsed(")
  && tryBlock.indexOf('sessionStorage.setItem("love_tools"') < tryBlock.indexOf("WebsiteEvents.featureUsed("));
check("7: featureUsed fires BEFORE the result-page navigation (router.push)",
  tryBlock.indexOf("WebsiteEvents.featureUsed(") < tryBlock.indexOf("router.push("));
check("8: featureUsed NEVER appears in the catch or finally block (a failed calculation produces no feature_used)",
  !catchAndFinallyBlock.includes("WebsiteEvents.featureUsed"));
check("8b: featureUsed never appears before the primary API ok-check (if (!reportRes.ok) throw) -- an API failure short-circuits before it",
  tryBlock.indexOf("if (!reportRes.ok) throw") < tryBlock.indexOf("WebsiteEvents.featureUsed("));

// 9. Stable, safe, fixed developer-controlled identifiers -- never user-
// entered form data (name/dob/tob/pob/lat/lng/gender/email/phone never
// referenced inside either WebsiteEvents.* call's own argument list), and
// never a spread of any object.
const ctaClickCallMatch = submitBody.match(/WebsiteEvents\.ctaClick\(([^)]*)\)/);
const featureUsedCallMatch = submitBody.match(/WebsiteEvents\.featureUsed\(([^)]*)\)/);
check("9: ctaClick uses the fixed identifiers ('love_matchmaking_generate', 'love')",
  !!ctaClickCallMatch && ctaClickCallMatch[1].includes('"love_matchmaking_generate"') && ctaClickCallMatch[1].includes('"love"'));
check("9b: featureUsed uses the fixed identifier ('love_matchmaking_generate')",
  !!featureUsedCallMatch && featureUsedCallMatch[1].includes('"love_matchmaking_generate"'));
check("9c: neither call spreads any object into its arguments (no '...' anywhere in either call's own arguments)",
  !(ctaClickCallMatch?.[1] || "").includes("...") && !(featureUsedCallMatch?.[1] || "").includes("..."));

// 10. No birth-data/PII/payload/response field name appears anywhere
// inside either call's own arguments.
const piiTerms = ["form.boy", "form.girl", "dob", "tob", "pob", "lat", "lng", "name", "gender", "email", "phone",
  "payload", "reportJson", "truthJson", "marriageJson", "reportRes", "truthRes", "marriageRes"];
check("10: no birth-data/PII/payload/response identifier appears inside either WebsiteEvents.* call's own arguments",
  !piiTerms.some((t) => (ctaClickCallMatch?.[1] || "").toLowerCase().includes(t.toLowerCase()) || (featureUsedCallMatch?.[1] || "").toLowerCase().includes(t.toLowerCase())));

// 11. page_path is never manually constructed here -- relies entirely on
// WebsiteEvents' own existing, automatic Task 9A page_path attachment.
check("11: no manual page_path/pagePath construction in this file (reuses the existing automatic WebsiteEvents wrapper)",
  !src.includes("page_path:") && !src.includes("pagePath"));

// 12. Analytics failure isolation: WebsiteEvents.* calls are never
// wrapped in their own try/catch here -- they rely on the existing,
// already-proven never-throws guarantee (Task 2C/9A/13B) rather than a
// second defensive layer, exactly like every other WebsiteEvents call
// site in this codebase.
check("12: WebsiteEvents calls are not individually wrapped in their own try/catch (rely on the existing never-throws guarantee, matching every other call site)",
  !/try\s*\{\s*WebsiteEvents\./.test(src));

// 13. Business logic untouched -- the actual calculation flow (the 3
// Promise.all API calls, the reportRes.ok gate, sessionStorage keys, and
// the router.push destination) is structurally unchanged.
check("13: all three API calls are still present and unchanged (report, truth-or-dare, love-marriage-probability)",
  src.includes("/api/love/report") && src.includes("/api/love/truth-or-dare") && src.includes("/api/love/love-marriage-probability"));
check("13b: the primary API ok-gate is unchanged", src.includes('if (!reportRes.ok) throw new Error("Primary API failed")'));
check("13c: all three sessionStorage keys are unchanged", src.includes('"love_payload"') && src.includes('"love_summary"') && src.includes('"love_tools"'));
check("13d: navigation destination is unchanged (/love/result)", src.includes("/love/result"));

console.log("\n=== Scope discipline: paid report / free result-detail pages untouched ===");

// 14. The paid report page and its shared purchase hook are untouched --
// Task 13E is scoped to the free generation action only.
const reportFormSrc = readSource("app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx");
const purchaseHookSrc = readSource("hooks/useReportPurchase.ts");
check("14: RelationshipFutureReportForm.tsx has no WebsiteEvents reference (paid-report CTA instrumentation is explicitly out of Task 13E's scope)",
  !reportFormSrc.includes("WebsiteEvents"));
check("14b: useReportPurchase.ts has no WebsiteEvents reference (payment/campaign-attribution infrastructure untouched)",
  !purchaseHookSrc.includes("WebsiteEvents"));

// 15. The free result-detail pages do NOT gain their own feature_used --
// the completion event belongs to the successful generation action, not
// every subsequent result-page view.
const resultDetailFiles = [
  "app/[locale]/love/result/LoveResultSummaryDetail.tsx",
  "app/[locale]/love/matchmaking-compatibility/MatchmakingCompatibilityDetail.tsx",
  "app/[locale]/love/mangal-dosh/MangalDoshDetail.tsx",
  "app/[locale]/love/marriage-potential/MarriagePotentialDetail.tsx",
  "app/[locale]/love/truth-or-dare/TruthOrDareDetail.tsx",
];
for (const f of resultDetailFiles) {
  const detailSrc = readSource(f);
  check(`15: ${f} has no WebsiteEvents reference (no feature_used on result-page view)`, !detailSrc.includes("WebsiteEvents"));
}

// 16. No page_view / GA4-only concept was added anywhere in LoveForm.tsx.
check("16: no page_view reference anywhere in LoveForm.tsx", !src.includes("page_view"));

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
