// lib/consent.test.ts

/**
 * Task 8 regression tests for lib/consent.ts and its wiring
 * (context/ConsentContext.tsx, components/consent/*, app/layout.tsx's
 * beforeInteractive bootstrap, app/[locale]/layout.tsx).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed). React
 * component behavior (ConsentProvider/ConsentBanner/ConsentPreferences)
 * is verified by direct source inspection where the pure lib/consent.ts
 * logic itself can't reach it -- this repo has no component-rendering
 * test harness (same documented limitation as every prior task's own
 * test file: Task 2A.1, 2C, 2D, 5, 6, 7).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/consent.ts lib/consent.test.ts
 *   node .ts-test-out/consent.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  ConsentStorageLike,
  pushConsentUpdate,
  readStoredConsent,
  toGoogleConsentMode,
  writeConsent,
} from "./consent";

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

class FakeStorage implements ConsentStorageLike {
  private store = new Map<string, string>();
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
  raw(key: string): string | undefined {
    return this.store.get(key);
  }
}

type MutableGlobal = Record<string, unknown>;
function setGlobal(key: string, value: unknown): void {
  (globalThis as unknown as MutableGlobal)[key] = value;
}

// ===========================================================================
// 1/2. Fresh user defaults: analytics AND advertising denied
// ===========================================================================
console.log("\n=== 1/2. fresh-user defaults ===");
{
  const storage = new FakeStorage();
  const stored = readStoredConsent(storage);
  check("1: fresh storage -> no stored consent (null)", stored === null);

  const mode = toGoogleConsentMode(stored);
  check("1: fresh user -> analytics_storage denied", mode.analytics_storage === "denied");
  check("2: fresh user -> ad_storage denied", mode.ad_storage === "denied");
  check("2: fresh user -> ad_user_data denied", mode.ad_user_data === "denied");
  check("2: fresh user -> ad_personalization denied", mode.ad_personalization === "denied");
}

// ===========================================================================
// 3. Necessary always enabled -- structurally, not a togglable field
// ===========================================================================
console.log("\n=== 3. necessary is not a togglable field ===");
{
  const storage = new FakeStorage();
  const state = writeConsent(storage, { analytics: false, advertising: false });
  check("3: persisted state has no 'necessary' key at all (never a user choice)", !("necessary" in state));
  check("3: ConsentPreferences source shows the Necessary checkbox as checked+disabled", (() => {
    const src = readSource("components/consent/ConsentPreferences.tsx");
    return /checked\s+disabled/.test(src);
  })());
}

// ===========================================================================
// 4/5/6/7. Consent Mode mapping for every combination (Manage Preferences
// independence -- Task 8 explicitly allows analytics=false/advertising=true)
// ===========================================================================
console.log("\n=== 4/5/6/7. Consent Mode mapping, all 4 combinations ===");
{
  const allGranted = toGoogleConsentMode({ analytics: true, advertising: true });
  check("4: Accept All -> analytics_storage granted", allGranted.analytics_storage === "granted");
  check("4: Accept All -> ad_storage/ad_user_data/ad_personalization granted", allGranted.ad_storage === "granted" && allGranted.ad_user_data === "granted" && allGranted.ad_personalization === "granted");

  const allDenied = toGoogleConsentMode({ analytics: false, advertising: false });
  check("5: Reject Non-Essential -> everything denied", Object.values(allDenied).every((v) => v === "denied"));

  const analyticsOnly = toGoogleConsentMode({ analytics: true, advertising: false });
  check("6: analytics=true/advertising=false -> analytics_storage granted", analyticsOnly.analytics_storage === "granted");
  check("6: analytics=true/advertising=false -> all ad_* denied (advertising never implied by analytics)", analyticsOnly.ad_storage === "denied" && analyticsOnly.ad_user_data === "denied" && analyticsOnly.ad_personalization === "denied");

  const advertisingOnly = toGoogleConsentMode({ analytics: false, advertising: true });
  check("7: analytics=false/advertising=true -> analytics_storage denied (analytics never implied by advertising)", advertisingOnly.analytics_storage === "denied");
  check("7: analytics=false/advertising=true -> all ad_* granted", advertisingOnly.ad_storage === "granted" && advertisingOnly.ad_user_data === "granted" && advertisingOnly.ad_personalization === "granted");
}

// ===========================================================================
// 8. Stored valid consent restores correctly
// ===========================================================================
console.log("\n=== 8. valid stored consent restores correctly ===");
{
  const storage = new FakeStorage();
  writeConsent(storage, { analytics: true, advertising: false });
  const restored = readStoredConsent(storage);
  check("8: restored analytics matches", restored?.analytics === true);
  check("8: restored advertising matches", restored?.advertising === false);
  check("8: restored version matches CONSENT_VERSION", restored?.version === CONSENT_VERSION);
  check("8: restored updatedAt is a non-empty string", typeof restored?.updatedAt === "string" && restored.updatedAt.length > 0);
}

// ===========================================================================
// 9. Unknown consent version safely resets/falls back
// ===========================================================================
console.log("\n=== 9. unknown version falls back safely ===");
{
  const storage = new FakeStorage();
  storage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ version: 999, analytics: true, advertising: true, updatedAt: "2020-01-01" }));
  const result = readStoredConsent(storage);
  check("9: unknown version -> null (never reinterpreted as current version)", result === null);
  check("9: unknown version -> Google Consent Mode falls back to fully denied", Object.values(toGoogleConsentMode(result)).every((v) => v === "denied"));
}

// ===========================================================================
// 10. Malformed consent safely falls back
// ===========================================================================
console.log("\n=== 10. malformed consent falls back safely ===");
{
  const storage = new FakeStorage();
  storage.setItem(CONSENT_STORAGE_KEY, "{not valid json at all");
  check("10a: malformed JSON -> null, never throws", readStoredConsent(storage) === null);

  const storage2 = new FakeStorage();
  storage2.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ version: 1, analytics: "yes", advertising: true, updatedAt: "x" }));
  check("10b: wrong field type (analytics not boolean) -> null", readStoredConsent(storage2) === null);

  const storage3 = new FakeStorage();
  storage3.setItem(CONSENT_STORAGE_KEY, JSON.stringify("just a string"));
  check("10c: valid JSON but not an object -> null", readStoredConsent(storage3) === null);
}

// ===========================================================================
// 11. Consent persistence contains no identity/PII
// ===========================================================================
console.log("\n=== 11. no identity/PII in persisted consent ===");
{
  const storage = new FakeStorage();
  const state = writeConsent(storage, { analytics: true, advertising: true });
  check("11a: persisted state has exactly 4 keys", Object.keys(state).sort().join(",") === "advertising,analytics,updatedAt,version");

  const raw = storage.raw(CONSENT_STORAGE_KEY);
  const forbidden = ["email", "firebase_uid", "profile_id", "dob", "tob", "lat", "lng", "name", "ip"];
  check("11b: raw persisted JSON contains no identity/PII field name", !!raw && forbidden.every((f) => !raw.toLowerCase().includes(f)));

  // Even a hostile caller bypassing TypeScript cannot inject an extra field.
  const hostileChoice = { analytics: true, advertising: true, email: "user@example.com" } as unknown as Parameters<typeof writeConsent>[1];
  const hostileState = writeConsent(new FakeStorage(), hostileChoice);
  check("11c: hostile input with an extra PII field is not persisted", !("email" in hostileState));
}

// ===========================================================================
// 12. Consent update sends the correct Google Consent Mode state
// ===========================================================================
console.log("\n=== 12. pushConsentUpdate sends correct state ===");
{
  const dataLayer: unknown[] = [];
  setGlobal("window", { dataLayer });

  pushConsentUpdate({ analytics: true, advertising: false });

  check("12a: exactly one entry pushed", dataLayer.length === 1);
  const pushedArgs = Array.from(dataLayer[0] as ArrayLike<unknown>);
  check("12b: pushed as ['consent', 'update', {...}]", pushedArgs[0] === "consent" && pushedArgs[1] === "update");
  const mode = pushedArgs[2] as Record<string, string>;
  check("12c: pushed state reflects analytics=true/advertising=false correctly", mode.analytics_storage === "granted" && mode.ad_storage === "denied");

  setGlobal("window", undefined);
}

// ===========================================================================
// 13. Default consent occurs before GTM bootstrap (structural verification)
// ===========================================================================
console.log("\n=== 13. consent default precedes GTM bootstrap (structural) ===");
{
  const rootLayout = readSource("app/layout.tsx");
  const localeLayout = readSource("app/[locale]/layout.tsx");

  check("13a: consent-default script uses strategy=\"beforeInteractive\" (hard Next.js ordering guarantee)", /id="consent-default"[\s\S]*?strategy="beforeInteractive"/.test(rootLayout));
  check("13b: consent-default script lives in the ROOT layout (app/layout.tsx), not [locale]/layout.tsx", rootLayout.includes('id="consent-default"') && !localeLayout.includes('id="consent-default"'));
  check("13c: GTM bootstrap script still uses strategy=\"afterInteractive\" (unchanged from before Task 8)", /id="gtm-script"[\s\S]*?strategy="afterInteractive"/.test(localeLayout));
  check("13d: consent-default script pushes gtag('consent','default',...)", rootLayout.includes('window.gtag("consent", "default", consent)'));
}

// ===========================================================================
// 14. First-party WebsiteEvents remains independent of marketing consent
// ===========================================================================
console.log("\n=== 14. first-party pipeline independent of consent ===");
{
  const filesToCheck = [
    "lib/websiteEvents.ts",
    "lib/anonymousActivityEventClient.ts",
    "lib/analyticsSession.ts",
    "lib/analyticsAttribution.ts",
    "components/analytics/WebsiteAnalyticsInit.tsx",
  ];
  for (const file of filesToCheck) {
    const src = readSource(file);
    check(`14: ${file} -- does not import consent.ts or ConsentContext`, !src.includes("lib/consent") && !src.includes("ConsentContext") && !src.includes("useConsent"));
  }
}

// ===========================================================================
// 15. Marketing bridge behavior under consent -- documented design
// decision: dataLayer.push() stays UNCONDITIONAL; Google Consent Mode's
// own signals (not a client-side gate before the push) are what control
// what GTM/GA4/Ads actually do with it. Verified: the bridge itself is
// untouched (no consent.ts import, no gating logic added).
// ===========================================================================
console.log("\n=== 15. marketing bridge stays unconditional, Consent-Mode-governed ===");
{
  const bridge = readSource("lib/marketingMeasurementBridge.ts");
  check("15a: marketingMeasurementBridge.ts does not import consent.ts (unconditional push, unchanged from Task 7)", !bridge.includes("lib/consent") && !bridge.includes("ConsentContext"));
  check("15b: marketingMeasurementBridge.ts still pushes unconditionally (no consent-based early return added)", bridge.includes("dataLayer.push(payload)"));
}

// ===========================================================================
// 19. Cookie Settings can reopen preferences
// ===========================================================================
console.log("\n=== 19. Cookie Settings reopens preferences ===");
{
  const link = readSource("components/consent/CookieSettingsLink.tsx");
  check("19a: CookieSettingsLink calls openPreferences()", link.includes("openPreferences"));
  const footer = readSource("components/Footer.tsx");
  check("19b: Footer.tsx renders CookieSettingsLink", footer.includes("<CookieSettingsLink"));
}

// ===========================================================================
// 20/21. Withdrawal semantics (re-verified via the same mapping, framed
// explicitly as "withdraw")
// ===========================================================================
console.log("\n=== 20/21. withdrawal changes the correct signals ===");
{
  const withdrawAnalytics = toGoogleConsentMode({ analytics: false, advertising: true });
  check("20: withdrawing analytics (while advertising stays granted) -> analytics_storage denied", withdrawAnalytics.analytics_storage === "denied");

  const withdrawAdvertising = toGoogleConsentMode({ analytics: true, advertising: false });
  check("21: withdrawing advertising -> ad_storage/ad_user_data/ad_personalization all denied", withdrawAdvertising.ad_storage === "denied" && withdrawAdvertising.ad_user_data === "denied" && withdrawAdvertising.ad_personalization === "denied");
  check("21: withdrawing advertising does not affect analytics_storage", withdrawAdvertising.analytics_storage === "granted");
}

// ===========================================================================
// 22. No Meta Pixel/fbq introduced
// ===========================================================================
console.log("\n=== 22. no Meta Pixel/fbq introduced ===");
{
  const files = [
    "lib/consent.ts",
    "context/ConsentContext.tsx",
    "components/consent/ConsentBanner.tsx",
    "components/consent/ConsentPreferences.tsx",
    "components/consent/CookieSettingsLink.tsx",
    "app/layout.tsx",
    "app/[locale]/layout.tsx",
  ];
  const forbidden = [/\bfbq\s*\(/, /connect\.facebook\.net/i, /Meta ?Pixel/i, /Facebook ?Pixel/i];
  for (const file of files) {
    const src = readSource(file);
    check(`22: ${file} -- no fbq()/Pixel reference`, forbidden.every((re) => !re.test(src)));
  }
}

// ===========================================================================
// 23. No gclid/fbclid/_fbc/_fbp persistence introduced
// ===========================================================================
console.log("\n=== 23. no click-ID persistence introduced ===");
{
  const files = [
    "lib/consent.ts",
    "context/ConsentContext.tsx",
    "components/consent/ConsentBanner.tsx",
    "components/consent/ConsentPreferences.tsx",
    "components/consent/CookieSettingsLink.tsx",
    "app/layout.tsx",
    "app/[locale]/layout.tsx",
  ];
  const forbidden = ["gclid", "fbclid", "_fbc", "_fbp"];
  for (const file of files) {
    const src = readSource(file);
    check(`23: ${file} -- no gclid/fbclid/_fbc/_fbp reference`, forbidden.every((t) => !src.toLowerCase().includes(t.toLowerCase())));
  }
}

// ===========================================================================
// 24. No Enhanced Conversions/Advanced Matching introduced
// ===========================================================================
console.log("\n=== 24. no Enhanced Conversions/Advanced Matching ===");
{
  const files = ["lib/consent.ts", "context/ConsentContext.tsx", "components/consent/ConsentBanner.tsx", "components/consent/ConsentPreferences.tsx"];
  // Deliberately excludes "user_data" -- ad_user_data is a legitimate,
  // required Google Consent Mode v2 field name (not Advanced Matching).
  const forbidden = ["hashed_email", "hashedemail", "sha256", "external_id", "enhanced_conversion", "advanced_matching"];
  for (const file of files) {
    const src = readSource(file).toLowerCase();
    check(`24: ${file} -- no Advanced Matching/Enhanced Conversions field`, forbidden.every((t) => !src.includes(t)));
  }
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
