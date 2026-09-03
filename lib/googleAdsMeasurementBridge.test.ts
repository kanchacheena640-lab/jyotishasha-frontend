// lib/googleAdsMeasurementBridge.test.ts

/**
 * Task 6 regression tests for lib/googleAdsMeasurementBridge.ts and its
 * 3 wired call sites (free-birthchart-result/page.tsx, AppDownloadCTA.tsx,
 * StickyAppDownloadCTA.tsx, ReportsPageClient.tsx).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/googleAdsMeasurementBridge.ts lib/googleAdsMeasurementBridge.test.ts
 *   node .ts-test-out/googleAdsMeasurementBridge.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

import { pushGoogleAdsMeasurementEvent, GoogleAdsMeasurementEvent } from "./googleAdsMeasurementBridge";

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

  pushGoogleAdsMeasurementEvent({ name: "jyotishasha_kundali_generated" });

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
  const bridgeSource = readSource("lib/googleAdsMeasurementBridge.ts");
  check("2a: bridge source contains no 'page_view' event name anywhere", !bridgeSource.includes('"page_view"'));

  const touchedFiles = [
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "app/reports/ReportsPageClient.tsx",
  ];
  for (const file of touchedFiles) {
    const source = readSource(file);
    check(`2b: ${file} -- no pushGoogleAdsMeasurementEvent call names page_view`, !/pushGoogleAdsMeasurementEvent\([^)]*page_view/.test(source));
  }
}

// ===========================================================================
// 3. Kundali completion sends no birth data -- payload is exactly {event}
// ===========================================================================
console.log("\n=== 3. kundali completion: no birth data, no extra keys ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushGoogleAdsMeasurementEvent({ name: "jyotishasha_kundali_generated" });

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

  pushGoogleAdsMeasurementEvent({ name: "jyotishasha_app_download_intent", ctaLocation: "daily_panchang_primary_cta" });

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

  pushGoogleAdsMeasurementEvent({ name: "jyotishasha_report_purchase_intent" });

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

  const bypassed = { name: "totally_unapproved_event" } as unknown as GoogleAdsMeasurementEvent;
  pushGoogleAdsMeasurementEvent(bypassed);

  check("6a: nothing pushed for a non-allowlisted event name (runtime gate, defense in depth)", dataLayer.length === 0);

  setGlobal("window", undefined);
}

// ===========================================================================
// 7. Missing dataLayer initializes safely (mirrors GTM's own snippet)
// ===========================================================================
console.log("\n=== 7. missing dataLayer initializes safely ===");
{
  setGlobal("window", {}); // window present, but no .dataLayer property at all

  pushGoogleAdsMeasurementEvent({ name: "jyotishasha_kundali_generated" });

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
    pushGoogleAdsMeasurementEvent({ name: "jyotishasha_kundali_generated" });
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
    pushGoogleAdsMeasurementEvent({ name: "jyotishasha_kundali_generated" });
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
  check("11b: the new dataLayer bridge call coexists alongside it in the same handler", appDownloadCta.includes("pushGoogleAdsMeasurementEvent("));
  check("11c: a comment documents this is a first-party call independent of the legacy gtag call", appDownloadCta.includes("does NOT depend on it existing or firing"));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
