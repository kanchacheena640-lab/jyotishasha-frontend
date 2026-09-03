// lib/marketingMeasurementBridge.test.ts

/**
 * Task 6 (as googleAdsMeasurementBridge.test.ts) / Task 7 (renamed,
 * generalized, extended) regression tests for
 * lib/marketingMeasurementBridge.ts and its 3 wired call sites
 * (free-birthchart-result/page.tsx, AppDownloadCTA.tsx,
 * StickyAppDownloadCTA.tsx, ReportsPageClient.tsx). Sections 1-9 and 11
 * are Task 6's own original coverage (event names/payloads unchanged,
 * only the import path/function name updated for the rename); sections
 * labeled T7-* are new, Task 7-specific checks (no Meta Pixel/fbq
 * injection, no fbclid/_fbc/_fbp persistence, no duplicate producers).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/marketingMeasurementBridge.ts lib/marketingMeasurementBridge.test.ts
 *   node .ts-test-out/marketingMeasurementBridge.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

import { pushMarketingMeasurementEvent, MarketingMeasurementEvent } from "./marketingMeasurementBridge";

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

type MutableGlobal = Record<string, unknown>;
function setGlobal(key: string, value: unknown): void {
  (globalThis as unknown as MutableGlobal)[key] = value;
}
function getGlobal(key: string): unknown {
  return (globalThis as unknown as MutableGlobal)[key];
}

// ===========================================================================
// 1. Controlled event maps correctly to dataLayer
// ===========================================================================
console.log("\n=== 1. controlled event maps correctly to dataLayer ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushMarketingMeasurementEvent({ name: "jyotishasha_kundali_generated" });

  check("1a: exactly one entry pushed", dataLayer.length === 1);
  check("1b: pushed entry has the correct event name", (dataLayer[0] as Record<string, unknown>).event === "jyotishasha_kundali_generated");

  setGlobal("window", undefined);
}

// ===========================================================================
// 2. No page_view duplication -- structurally impossible + source check
// ===========================================================================
console.log("\n=== 2. no page_view duplication ===");
{
  // The union type itself has no "page_view" member -- TypeScript would
  // reject `{ name: "page_view" }` at compile time; re-verified here as
  // a runtime fact too via the exported type's own allowed shapes.
  const bridgeSource = readSource("lib/marketingMeasurementBridge.ts");
  check("2a: bridge source contains no 'page_view' event name anywhere", !bridgeSource.includes('"page_view"'));

  const touchedFiles = [
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "app/reports/ReportsPageClient.tsx",
  ];
  for (const file of touchedFiles) {
    const source = readSource(file);
    check(`2b: ${file} -- no pushMarketingMeasurementEvent call names page_view`, !/pushMarketingMeasurementEvent\([^)]*page_view/.test(source));
  }
}

// ===========================================================================
// 3. Kundali completion sends no birth data -- payload is exactly {event}
// ===========================================================================
console.log("\n=== 3. kundali completion: no birth data, no extra keys ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushMarketingMeasurementEvent({ name: "jyotishasha_kundali_generated" });

  const pushed = dataLayer[0] as Record<string, unknown>;
  check("3a: payload has exactly one key (event)", Object.keys(pushed).length === 1 && "event" in pushed);
  const forbidden = ["name", "dob", "tob", "place", "lat", "lng", "email", "phone"];
  check("3b: no birth/PII field name appears anywhere in the payload", forbidden.every((f) => !(f in pushed)));

  setGlobal("window", undefined);
}

// ===========================================================================
// 4. App download event contains no session/user/PII data
// ===========================================================================
console.log("\n=== 4. app download event: no session/user/PII data ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushMarketingMeasurementEvent({ name: "jyotishasha_app_download_intent", ctaLocation: "daily_panchang_primary_cta" });

  const pushed = dataLayer[0] as Record<string, unknown>;
  check("4a: payload has exactly {event, cta_location}", Object.keys(pushed).sort().join(",") === "cta_location,event");
  check("4b: cta_location matches the controlled value passed in", pushed.cta_location === "daily_panchang_primary_cta");
  const forbidden = ["session_id", "firebase_uid", "profile_id", "email", "phone", "name"];
  check("4c: no session/user/PII field anywhere in the payload", forbidden.every((f) => !(f in pushed)));

  setGlobal("window", undefined);
}

// ===========================================================================
// 5. Report purchase intent contains no payment/form PII
// ===========================================================================
console.log("\n=== 5. report purchase intent: no payment/form PII ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushMarketingMeasurementEvent({ name: "jyotishasha_report_purchase_intent" });

  const pushed = dataLayer[0] as Record<string, unknown>;
  check("5a: payload has exactly one key (event)", Object.keys(pushed).length === 1 && "event" in pushed);
  const forbidden = ["amount", "price", "order_id", "email", "phone", "name", "razorpay_payment_id"];
  check("5b: no payment/form field anywhere in the payload", forbidden.every((f) => !(f in pushed)));

  setGlobal("window", undefined);
}

// ===========================================================================
// 6. Unsupported events cannot be pushed through the controlled bridge
// ===========================================================================
console.log("\n=== 6. unsupported events rejected at the runtime gate ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  const bypassed = { name: "totally_unapproved_event" } as unknown as MarketingMeasurementEvent;
  pushMarketingMeasurementEvent(bypassed);

  check("6a: nothing pushed for a non-allowlisted event name (runtime gate, defense in depth)", dataLayer.length === 0);

  setGlobal("window", undefined);
}

// ===========================================================================
// 7. Missing dataLayer initializes safely (mirrors GTM's own snippet)
// ===========================================================================
console.log("\n=== 7. missing dataLayer initializes safely ===");
{
  setGlobal("window", {}); // window present, but no .dataLayer property at all

  pushMarketingMeasurementEvent({ name: "jyotishasha_kundali_generated" });

  const w = getGlobal("window") as Record<string, unknown>;
  check("7a: dataLayer was created", Array.isArray(w.dataLayer));
  check("7b: the event was still pushed into the newly-created array", (w.dataLayer as unknown[]).length === 1);

  setGlobal("window", undefined);
}

// ===========================================================================
// 8. GTM absence (no window at all) never breaks product action
// ===========================================================================
console.log("\n=== 8. GTM/window absence never throws ===");
{
  setGlobal("window", undefined); // simulates a non-browser/SSR-like call, or window genuinely absent

  let threw = false;
  try {
    pushMarketingMeasurementEvent({ name: "jyotishasha_kundali_generated" });
  } catch {
    threw = true;
  }
  check("8a: no throw when window is entirely absent", !threw);
}

// ===========================================================================
// 9. Analytics exception (a broken/hijacked dataLayer.push) never throws
// ===========================================================================
console.log("\n=== 9. a throwing dataLayer.push never propagates ===");
{
  setGlobal("window", {
    dataLayer: {
      push: () => {
        throw new Error("ad blocker / hijacked dataLayer");
      },
    },
  });

  let threw = false;
  try {
    pushMarketingMeasurementEvent({ name: "jyotishasha_kundali_generated" });
  } catch {
    threw = true;
  }
  check("9a: no throw even when dataLayer.push itself throws", !threw);

  setGlobal("window", undefined);
}

// ===========================================================================
// 11. Legacy app_download_click gtag call: retained, documented, unmodified
// ===========================================================================
console.log("\n=== 11. legacy app_download_click decision ===");
{
  const appDownloadCta = readSource("components/AppDownloadCTA.tsx");
  check("11a: legacy window.gtag('event','app_download_click',...) call still present, not deleted", appDownloadCta.includes('gtag("event", "app_download_click"'));
  check("11b: the new dataLayer bridge call coexists alongside it in the same handler", appDownloadCta.includes("pushMarketingMeasurementEvent("));
  check("11c: a comment documents this is a first-party call independent of the legacy gtag call", appDownloadCta.includes("does NOT depend on it existing or firing"));
}

// ===========================================================================
// T7-1. No Meta Pixel / fbq is automatically injected anywhere
// ===========================================================================
console.log("\n=== T7-1. no Meta Pixel/fbq injection ===");
{
  // lib/marketingMeasurementBridge.ts itself is deliberately excluded --
  // its own docstring legitimately DISCUSSES "Meta Pixel"/"fbq" BY NAME
  // to document their absence (a prose mention, not an injection); every
  // file that could actually EXECUTE or INJECT something is scanned.
  const scannedFiles = [
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "app/reports/ReportsPageClient.tsx",
    "app/[locale]/layout.tsx",
    "app/layout.tsx",
  ];
  const forbiddenPatterns = [/\bfbq\s*\(/, /connect\.facebook\.net/i, /Meta ?Pixel/i, /Facebook ?Pixel/i];
  for (const file of scannedFiles) {
    const source = readSource(file);
    check(`T7-1: ${file} -- contains no fbq()/Pixel script reference`, forbiddenPatterns.every((re) => !re.test(source)));
  }
}

// ===========================================================================
// T7-2. No fbclid/_fbc/_fbp capture or persistence anywhere
// ===========================================================================
console.log("\n=== T7-2. no fbclid/_fbc/_fbp persistence ===");
{
  // lib/marketingMeasurementBridge.ts itself is deliberately excluded --
  // its own docstring legitimately DISCUSSES fbclid/_fbc/_fbp BY NAME to
  // document that none of them are captured (a prose mention, not a
  // capture); every file that could actually READ/STORE one is scanned.
  const scannedFiles = [
    "lib/analyticsAttribution.ts",
    "lib/analyticsSession.ts",
    "lib/anonymousActivityEventClient.ts",
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "app/reports/ReportsPageClient.tsx",
  ];
  const forbiddenTerms = ["fbclid", "_fbc", "_fbp"];
  for (const file of scannedFiles) {
    const source = readSource(file);
    check(`T7-2: ${file} -- no fbclid/_fbc/_fbp reference anywhere`, forbiddenTerms.every((t) => !source.toLowerCase().includes(t.toLowerCase())));
  }
}

// ===========================================================================
// T7-3. No duplicate product listeners -- exactly one
// pushMarketingMeasurementEvent call per touched product call site
// ===========================================================================
console.log("\n=== T7-3. no duplicate producers ===");
{
  const singleCallSites: Record<string, number> = {
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx": 1,
    "components/AppDownloadCTA.tsx": 1,
    "components/StickyAppDownloadCTA.tsx": 1,
    "app/reports/ReportsPageClient.tsx": 1,
  };
  for (const [file, expectedCount] of Object.entries(singleCallSites)) {
    const source = readSource(file);
    const occurrences = (source.match(/pushMarketingMeasurementEvent\(/g) || []).length;
    check(`T7-3: ${file} -- exactly ${expectedCount} pushMarketingMeasurementEvent call site (no duplicate producer)`, occurrences === expectedCount);
  }
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
