// lib/campaignAttributionCheckout.test.ts

/**
 * Task 10A regression tests for the 2 live website report-purchase
 * checkout call sites that now attach Task 2C's campaign snapshot to
 * transaction creation: hooks/useReportPurchase.ts (used by
 * RelationshipFutureReportForm.tsx) and components/reports/
 * ReportCheckout.tsx (used by /reports/[slug]'s own catalog purchase
 * flow, the primary flow reached via WebsiteEvents.ctaClick(
 * "report_catalog_buy_now", ...)).
 *
 * Neither file is independently unit-testable via direct function calls
 * (both are full React components with DOM/Razorpay-SDK dependencies,
 * and this repo has no component-rendering test harness -- confirmed in
 * every earlier task) -- so, matching lib/websiteEvents.test.ts's own
 * established "Strategy 2" (direct source-text inspection via
 * fs.readFileSync), this file proves the exact invariants Task 10A's
 * own S29 requires by reading the real, committed source and asserting
 * structural facts about it.
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/campaignAttributionCheckout.test.ts
 *   node .ts-test-out/campaignAttributionCheckout.test.js
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

const FILES = {
  useReportPurchase: readSource("hooks/useReportPurchase.ts"),
  ReportCheckout: readSource("components/reports/ReportCheckout.tsx"),
};

for (const [name, source] of Object.entries(FILES)) {
  console.log(`\n=== ${name} ===`);

  // 1. valid existing attribution is added to live transaction creation.
  check(`${name} #1: imports the existing Task 2C helper (no new UTM-parsing logic)`,
    source.includes("buildCampaignContextFromAttribution") && source.includes("readStoredAttribution")
    && source.includes('from "@/lib/analyticsAttribution"'));
  check(`${name} #1b: campaign_context is included in the /api/razorpay-order request body`,
    /razorpay-order[\s\S]{0,600}campaign_context/.test(source));

  // 2/10. missing attribution omits the field entirely (conditional
  // spread), old behavior without attribution remains valid.
  check(`${name} #2/#10: campaign_context uses a conditional spread, never unconditionally included`,
    source.includes("...(campaignContext ? { campaign_context: campaignContext } : {})"));

  // 3. no UTM reparsing at checkout -- never reads location.search /
  // URLSearchParams / captureUtmParams directly in this file.
  check(`${name} #3: no direct UTM query-string parsing in this file`,
    !source.includes("captureUtmParams") && !source.includes("URLSearchParams") && !source.includes("location.search"));

  // 4. later SPA UTM does not overwrite first-touch snapshot -- this file
  // only ever READS attribution (readStoredAttribution), never (re)creates
  // it (getOrCreateAttribution, Task 2C's own write path, is never called
  // here -- only WebsiteAnalyticsInit calls that, once, at session start).
  check(`${name} #4: never calls getOrCreateAttribution (read-only consumer of the already-immutable snapshot)`,
    !source.includes("getOrCreateAttribution"));

  // 5/6. no landing-page/action-page confusion -- campaign_context
  // construction never references landingPage or page_path.
  check(`${name} #5/#6: no landingPage/page_path reference anywhere in this file`,
    !source.includes("landingPage") && !source.toLowerCase().includes("page_path") && !source.includes("pagePath"));

  // 7. no sensitive values -- campaignContext is built EXCLUSIVELY via
  // the shared helper, never manually assembled from form fields.
  const campaignContextAssignment = source.match(/const campaignContext = [\s\S]{0,300}?;/);
  check(`${name} #7: campaignContext is assigned exactly once, exclusively via the shared helper (no manual field construction)`,
    !!campaignContextAssignment && campaignContextAssignment[0].includes("buildCampaignContextFromAttribution(readStoredAttribution(")
    && !campaignContextAssignment[0].includes("form."));

  // 8. checkout request shape otherwise unchanged -- the product/
  // productId/productSlug key is still present alongside the new field.
  check(`${name} #8: the /api/razorpay-order body still sends the product identifier`,
    /razorpay-order[\s\S]{0,600}product/.test(source));

  // 9. payment verification request (/webhook) does NOT resend
  // campaign_context -- the durable backend snapshot is retrieved
  // server-side instead (Task 10A S9/S13).
  const webhookBodyMatch = source.match(/\/webhook[\s\S]{0,900}?\}\)/);
  check(`${name} #9: the /webhook POST body never includes campaign_context (backend retrieves its own durable snapshot)`,
    !webhookBodyMatch || !webhookBodyMatch[0].includes("campaign_context"));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
