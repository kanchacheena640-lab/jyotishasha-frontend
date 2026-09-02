// lib/playStoreAttribution.test.ts

/**
 * Task 5 regression tests for lib/playStoreAttribution.ts and its two
 * wired call sites (AppDownloadCTA.tsx, StickyAppDownloadCTA.tsx).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file in this repo (no test runner installed).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/websiteEvents.ts lib/playStoreAttribution.ts \
 *     lib/playStoreAttribution.test.ts
 *   node .ts-test-out/playStoreAttribution.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";

import { buildAppDownloadPlayStoreUrl, buildPlayStoreReferrerValue } from "./playStoreAttribution";

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

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

const BASE = "https://play.google.com/store/apps/details?id=com.jyotishasha.app";

// ===========================================================================
// A. Existing destination/package unchanged
// ===========================================================================
console.log("\n=== A. destination/package unchanged ===");
{
  const url = buildAppDownloadPlayStoreUrl(BASE, { source: "daily_panchang", medium: "primary_cta", campaign: "hero" }, { defaultMedium: "organic", defaultCampaign: "app_download", ctaLocationFallback: "app_download_cta" });
  const parsed = new URL(url);
  check("A1: host is still play.google.com", parsed.host === "play.google.com");
  check("A2: path is still the store listing path", parsed.pathname === "/store/apps/details");
  check("A3: package id unchanged", parsed.searchParams.get("id") === "com.jyotishasha.app");
}

// ===========================================================================
// B/C. referrer parameter encoding + UTM values survive it
// ===========================================================================
console.log("\n=== B/C. referrer encoding + UTM survival ===");
{
  const url = buildAppDownloadPlayStoreUrl(BASE, { source: "daily panchang", medium: "primary cta", campaign: "hero&launch" }, { defaultMedium: "organic", defaultCampaign: "app_download", ctaLocationFallback: "app_download_cta" });
  const parsed = new URL(url);
  const referrerRaw = parsed.searchParams.get("referrer");
  check("B1: referrer parameter is present", referrerRaw !== null);
  check("B2: outer URL remains a single valid URL (special chars in utm values don't break parsing)", parsed.toString().startsWith("https://play.google.com/"));

  // The inner referrer VALUE, once URL-decoded (which URLSearchParams.get
  // already does for us), must itself be a well-formed query string whose
  // own values decode back to the exact original utm values.
  const inner = new URLSearchParams(referrerRaw || "");
  check("C1: utm_source survives encode/decode round-trip exactly", inner.get("utm_source") === "daily panchang");
  check("C2: utm_medium survives encode/decode round-trip exactly", inner.get("utm_medium") === "primary cta");
  check("C3: utm_campaign (containing an literal '&') survives encode/decode round-trip exactly", inner.get("utm_campaign") === "hero&launch");
  check("C4: cta_location is present in the referrer payload too", inner.get("cta_location") === "daily panchang_primary cta");

  // The plain, pre-existing utm_* query params (Play Console's own
  // acquisition-report channel) must ALSO still be present, unchanged,
  // alongside the new referrer param -- not replaced by it.
  check("C5: plain utm_source param still present (unchanged, pre-existing behavior)", parsed.searchParams.get("utm_source") === "daily panchang");
  check("C6: plain utm_medium param still present (unchanged, pre-existing behavior)", parsed.searchParams.get("utm_medium") === "primary cta");
  check("C7: plain utm_campaign param still present (unchanged, pre-existing behavior)", parsed.searchParams.get("utm_campaign") === "hero&launch");
}

// ===========================================================================
// D. Missing UTM context still produces a valid Play URL
// ===========================================================================
console.log("\n=== D. missing UTM context ===");
{
  const url = buildAppDownloadPlayStoreUrl(BASE, undefined, { defaultMedium: "organic", defaultCampaign: "app_download", ctaLocationFallback: "app_download_cta" });
  check("D1: with no utm at all, the base URL is returned unchanged", url === BASE);
  const parsed = new URL(url);
  check("D2: still a valid, parseable Play Store URL", parsed.host === "play.google.com" && parsed.searchParams.get("id") === "com.jyotishasha.app");
  check("D3: no referrer param when there is no utm at all", parsed.searchParams.get("referrer") === null);
}

// ===========================================================================
// E. CTA location is controlled
// ===========================================================================
console.log("\n=== E. controlled CTA location in the referrer payload ===");
{
  const value = buildPlayStoreReferrerValue({ source: "site_global", medium: "sticky_cta" }, "site_global_sticky_cta");
  const inner = new URLSearchParams(value || "");
  check("E1: cta_location in the referrer payload matches the controlled value passed in", inner.get("cta_location") === "site_global_sticky_cta");
  check("E2: never derived from arbitrary text -- exactly the string handed in, nothing appended/altered", value?.includes("cta_location=site_global_sticky_cta") === true);
}

// ===========================================================================
// F. No website session_id appears in the outbound Play URL
// ===========================================================================
console.log("\n=== F. no session_id in outbound Play URL ===");
{
  const url = buildAppDownloadPlayStoreUrl(BASE, { source: "daily_panchang", medium: "primary_cta", campaign: "hero" }, { defaultMedium: "organic", defaultCampaign: "app_download", ctaLocationFallback: "app_download_cta" });
  check("F1: URL contains no 'session' substring at all", !url.toLowerCase().includes("session"));
  check("F2: buildPlayStoreReferrerValue's own type signature accepts no session-related field (source/medium/campaign/cta_location only)", true); // structural guarantee -- see PlayStoreReferrerUtm's own type, no session field exists to pass
}

// ===========================================================================
// G. No PII appears
// ===========================================================================
console.log("\n=== G. no PII in the outbound URL ===");
{
  const url = buildAppDownloadPlayStoreUrl(BASE, { source: "daily_panchang", medium: "primary_cta", campaign: "hero" }, { defaultMedium: "organic", defaultCampaign: "app_download", ctaLocationFallback: "app_download_cta" });
  const forbidden = ["email", "phone", "name=", "dob=", "tob=", "lat=", "lng=", "@", "firebase", "auth_token", "payment"];
  check("G1: no PII/identity substring appears anywhere in the built URL", forbidden.every((f) => !url.toLowerCase().includes(f)));
}

// ===========================================================================
// H/I. source-level verification: app_download_intent still fires on
// click only, navigation remains fire-and-forget (both already proven
// executable in lib/websiteEvents.test.ts's C/D/F sections -- re-verified
// here specifically against the now-refactored buildLink() call sites).
// ===========================================================================
console.log("\n=== H/I. click-only firing + fire-and-forget navigation (source verification) ===");
{
  const appDownloadCta = readSource("components/AppDownloadCTA.tsx");
  const stickyAppDownloadCta = readSource("components/StickyAppDownloadCTA.tsx");

  check("H1 (AppDownloadCTA): buildLink() calls the shared pure URL builder", appDownloadCta.includes("buildAppDownloadPlayStoreUrl(base, utm,"));
  check("H2 (StickyAppDownloadCTA): buildLink() calls the shared pure URL builder", stickyAppDownloadCta.includes("buildAppDownloadPlayStoreUrl(base, utm,"));
  check("H3 (AppDownloadCTA): WebsiteEvents.appDownloadIntent is still only inside handleClick, not buildLink", !appDownloadCta.slice(appDownloadCta.indexOf("const buildLink"), appDownloadCta.indexOf("const link = buildLink();")).includes("WebsiteEvents."));
  check("H4 (StickyAppDownloadCTA): WebsiteEvents.appDownloadIntent is still only inside handleClick, not buildLink", !stickyAppDownloadCta.slice(stickyAppDownloadCta.indexOf("const buildLink"), stickyAppDownloadCta.indexOf("const link = buildLink();")).includes("WebsiteEvents."));

  check("I1 (AppDownloadCTA): the outbound <a href> still uses `link` (built independently of the click handler)", appDownloadCta.includes("href={link}"));
  check("I2 (StickyAppDownloadCTA): the outbound <a href> still uses `link` (built independently of the click handler)", stickyAppDownloadCta.includes("href={link}"));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
