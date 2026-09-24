// lib/adAttribution.test.ts

/**
 * Reports Ads P0.1 -- tests for lib/adAttribution.ts (capture, first-touch /
 * latest-click semantics, consent gating, checkout snapshot) and for the
 * structural facts about its integration points (single initialization,
 * SELF + DUAL checkout wiring, no PII, no payment-path changes).
 *
 * Same standalone check()/pass-fail-counter convention as every other
 * lib/*.test.ts file (no test runner installed). Run from the repo root:
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/adAttribution.test.ts
 *   node .ts-test-out/adAttribution.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import * as fs from "fs";
import * as path from "path";
import {
  AD_ATTRIBUTION_STORAGE_KEY,
  AD_ATTRIBUTION_TTL_MS,
  buildOrderAttributionPayload,
  captureAdvertisingParams,
  hasAdSignal,
  isAdvertisingIdentifierStorageAllowed,
  readAdAttribution,
  syncAdAttribution,
  type AdAttributionSyncContext,
  type AdStorageLike,
} from "./adAttribution";
import type { AnalyticsAttribution } from "./analyticsAttribution";
import type { ConsentState } from "./consent";
import type { ConsentGeoPolicy } from "./geo";

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

/** Strips JS/TSX comments so "no PII" checks scan real code, not prose. */
function stripComments(src: string): string {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

class MemStorage implements AdStorageLike {
  data: Record<string, string> = {};
  getItem(k: string) { return k in this.data ? this.data[k] : null; }
  setItem(k: string, v: string) { this.data[k] = v; }
  removeItem(k: string) { delete this.data[k]; }
}

const NOW = Date.UTC(2026, 8, 24, 10, 0, 0);
const DAY = 24 * 60 * 60 * 1000;

function consent(analytics: boolean, advertising: boolean): ConsentState {
  return { version: 1, analytics, advertising, updatedAt: new Date(NOW).toISOString() };
}

function ctx(search: string, over: Partial<AdAttributionSyncContext> = {}): AdAttributionSyncContext {
  return {
    search, referrer: "", pathname: "/reports/focused/promotion-timing", currentOrigin: "https://www.jyotishasha.com",
    policy: "NORMAL", storedConsent: null, now: NOW, ...over,
  };
}

const FULL_QS =
  "?utm_source=google&utm_medium=cpc&utm_campaign=promo_search_in&utm_content=ad_a&utm_term=promotion%20astrology" +
  "&gclid=Cj0KCQjw_TEST-gclid.123&gbraid=0AAAAAgb_1&wbraid=Cjww-2&fbclid=IwAR0_fb-9";

// ---------------------------------------------------------------------
console.log("\n=== 1-4. capture: full UTM set, gclid, gbraid/wbraid, fbclid ===");
{
  const p = captureAdvertisingParams(FULL_QS);
  check("1: full UTM set (source/medium/campaign/content/term)",
    p.utmSource === "google" && p.utmMedium === "cpc" && p.utmCampaign === "promo_search_in" && p.utmContent === "ad_a" && p.utmTerm === "promotion astrology");
  check("2: gclid captured", p.gclid === "Cj0KCQjw_TEST-gclid.123");
  check("3: gbraid and wbraid captured", p.gbraid === "0AAAAAgb_1" && p.wbraid === "Cjww-2");
  check("4: fbclid captured", p.fbclid === "IwAR0_fb-9");
  check("hasAdSignal true for any click id or utm, false for nothing / unrelated params",
    hasAdSignal(p) && hasAdSignal(captureAdvertisingParams("?gclid=abc")) && hasAdSignal(captureAdvertisingParams("?utm_term=x"))
    && !hasAdSignal(captureAdvertisingParams("")) && !hasAdSignal(captureAdvertisingParams("?page=2&ref=home")));
}

console.log("\n=== 5. invalid / oversized / PII-shaped values ===");
{
  const p = captureAdvertisingParams(`?gclid=${encodeURIComponent("has space")}&gbraid=${"x".repeat(300)}&wbraid=%3Cscript%3E&fbclid=ok_1` +
    `&utm_source=${"s".repeat(1000)}&utm_medium=${encodeURIComponent("person@example.com")}&utm_campaign=${encodeURIComponent("a\u0000b\nc")}`);
  check("5a: click id with a bad charset / oversize / markup is DROPPED (never truncated)", p.gclid === undefined && p.gbraid === undefined && p.wbraid === undefined);
  check("5b: a valid click id alongside them is still captured", p.fbclid === "ok_1");
  check("5c: oversized utm text truncated to 256", p.utmSource?.length === 256);
  check("5d: email-shaped value dropped entirely", p.utmMedium === undefined);
  check("5e: control characters stripped", p.utmCampaign === "abc");
}

// ---------------------------------------------------------------------
console.log("\n=== 6. first touch + latest click creation ===");
{
  const s = new MemStorage();
  const r = syncAdAttribution(s, ctx(FULL_QS, { referrer: "https://www.google.com/search?q=x" }));
  check("6a: created", r.action === "created" && r.record !== null);
  check("6b: stored under the versioned key", JSON.parse(s.data[AD_ATTRIBUTION_STORAGE_KEY]).version === 1);
  check("6c: first touch AND latest click both hold the full set + landing page + external referrer",
    r.record!.firstTouch.gclid === "Cj0KCQjw_TEST-gclid.123" && r.record!.latestClick?.utmContent === "ad_a"
    && r.record!.firstTouch.landingPage === "/reports/focused/promotion-timing" && r.record!.firstTouch.referrer === "https://www.google.com/search");
  check("6d: referrer query string never stored", !JSON.stringify(r.record).includes("q=x"));
  const same = new MemStorage();
  const internal = syncAdAttribution(same, ctx("?gclid=g1", { referrer: "https://www.jyotishasha.com/hi/reports" }));
  check("6e: an internal referrer is not stored", internal.record!.firstTouch.referrer === undefined);
  const organic = syncAdAttribution(new MemStorage(), ctx(""));
  check("6f: organic first visit -> first touch recorded, latestClick null", organic.record!.latestClick === null && organic.record!.firstTouch.landingPage === "/reports/focused/promotion-timing");
}

console.log("\n=== 7-9. semantics: no overwrite by direct visits, replace by a new click, refresh no-op ===");
{
  const s = new MemStorage();
  syncAdAttribution(s, ctx("?gclid=CLICK_ONE&utm_source=google", { now: NOW }));
  const direct = syncAdAttribution(s, ctx("", { pathname: "/", now: NOW + 2 * DAY }));
  check("7a: a later DIRECT visit does NOT overwrite the valid ad click", direct.action === "unchanged" && direct.record!.latestClick?.gclid === "CLICK_ONE");
  const referral = syncAdAttribution(s, ctx("", { referrer: "https://news.example/a", now: NOW + 3 * DAY }));
  check("7b: a later plain-referral visit does not overwrite it either", referral.action === "unchanged" && readAdAttribution(s, NOW + 3 * DAY)!.latestClick?.gclid === "CLICK_ONE");

  const reload = syncAdAttribution(s, ctx("?gclid=CLICK_ONE&utm_source=google", { now: NOW + 4 * DAY }));
  check("9: reloading the SAME landing URL is a no-op (lifetime not reset)", reload.action === "unchanged" && reload.record!.latestClick?.capturedAt === new Date(NOW).toISOString());

  const second = syncAdAttribution(s, ctx("?gclid=CLICK_TWO&utm_source=google&utm_campaign=c2", { now: NOW + 5 * DAY }));
  check("8a: a NEW click replaces the latest click (last-click)", second.action === "updated_latest_click" && second.record!.latestClick?.gclid === "CLICK_TWO");
  check("8b: first touch is preserved unchanged", second.record!.firstTouch.gclid === "CLICK_ONE");
}

console.log("\n=== 10. lifetime (90 days) ===");
{
  check("10a: TTL constant is 90 days", AD_ATTRIBUTION_TTL_MS === 90 * DAY);
  const s = new MemStorage();
  syncAdAttribution(s, ctx("?gclid=OLD_CLICK", { now: NOW }));
  syncAdAttribution(s, ctx("?gclid=MID_CLICK", { now: NOW + 60 * DAY }));
  const later = readAdAttribution(s, NOW + 100 * DAY);
  check("10b: first touch aged out (100d) but a valid latest click (40d) remains -> the click is kept, never lost",
    later !== null && later.latestClick?.gclid === "MID_CLICK" && later.firstTouch.gclid === "MID_CLICK");
  const s2 = new MemStorage();
  syncAdAttribution(s2, ctx("?gclid=FIRST", { now: NOW }));
  syncAdAttribution(s2, ctx("?gclid=FRESH", { now: NOW + 80 * DAY }));
  const at100 = readAdAttribution(s2, NOW + 89 * DAY + 1 * DAY / 2);
  check("10c: within the window both touches are readable", at100 !== null && at100.latestClick?.gclid === "FRESH" && at100.firstTouch.gclid === "FIRST");
  const expiredLatestOnly = readAdAttribution(s2, NOW + 80 * DAY + 91 * DAY);
  check("10d: fully expired record reads as null", expiredLatestOnly === null);
  const corrupt = new MemStorage();
  corrupt.setItem(AD_ATTRIBUTION_STORAGE_KEY, "{not json");
  check("10e: corrupt storage reads as null and is re-created on next sync",
    readAdAttribution(corrupt, NOW) === null && syncAdAttribution(corrupt, ctx("?gclid=X", { now: NOW })).action === "created");
  const wrongVersion = new MemStorage();
  wrongVersion.setItem(AD_ATTRIBUTION_STORAGE_KEY, JSON.stringify({ version: 99, firstTouch: {}, latestClick: null }));
  check("10f: an unknown version is ignored, never reinterpreted", readAdAttribution(wrongVersion, NOW) === null);
}

// ---------------------------------------------------------------------
console.log("\n=== 11. consent (mirrors the existing Geo-Aware Consent policies) ===");
{
  const policies: ConsentGeoPolicy[] = ["NORMAL", "US_PRIVACY", "SAFE_FALLBACK", "EUROPE_CONSENT"];
  check("11a: NORMAL / US_PRIVACY need no Jyotishasha consent gate", isAdvertisingIdentifierStorageAllowed("NORMAL", null) && isAdvertisingIdentifierStorageAllowed("US_PRIVACY", null));
  check("11b: SAFE_FALLBACK requires advertising === true (analytics alone is not enough)",
    !isAdvertisingIdentifierStorageAllowed("SAFE_FALLBACK", null) && !isAdvertisingIdentifierStorageAllowed("SAFE_FALLBACK", consent(true, false)) && isAdvertisingIdentifierStorageAllowed("SAFE_FALLBACK", consent(false, true)));
  check("11c: EUROPE_CONSENT fails closed even with a stored 'granted' local choice (Google's CMP is authoritative)",
    !isAdvertisingIdentifierStorageAllowed("EUROPE_CONSENT", consent(true, true)));
  check("11d: every policy has an explicit outcome", policies.every((p) => typeof isAdvertisingIdentifierStorageAllowed(p, null) === "boolean"));

  const eu = new MemStorage();
  const r1 = syncAdAttribution(eu, ctx(FULL_QS, { policy: "EUROPE_CONSENT" }));
  check("11e: EUROPE_CONSENT -> nothing persisted (no click ids, no utm)", r1.action === "skipped_consent" && Object.keys(eu.data).length === 0);
  const sf = new MemStorage();
  const r2 = syncAdAttribution(sf, ctx(FULL_QS, { policy: "SAFE_FALLBACK", storedConsent: null }));
  check("11f: SAFE_FALLBACK without a choice -> nothing persisted", r2.action === "skipped_consent" && Object.keys(sf.data).length === 0);
  const granted = new MemStorage();
  const r3 = syncAdAttribution(granted, ctx(FULL_QS, { policy: "SAFE_FALLBACK", storedConsent: consent(false, true) }));
  check("11g: SAFE_FALLBACK with advertising granted -> persisted", r3.action === "created" && r3.record!.latestClick?.gclid === "Cj0KCQjw_TEST-gclid.123");
  const revoked = syncAdAttribution(granted, ctx("", { policy: "SAFE_FALLBACK", storedConsent: consent(true, false) }));
  check("11h: consent later withdrawn -> the stored record is DELETED", revoked.action === "skipped_consent" && !(AD_ATTRIBUTION_STORAGE_KEY in granted.data));
  const us = new MemStorage();
  check("11i: US_PRIVACY -> persisted", syncAdAttribution(us, ctx("?gclid=US1", { policy: "US_PRIVACY" })).action === "created");
}

console.log("\n=== 11B. NORMAL / US_PRIVACY honor an explicit stored advertising:false (Gate-2 fix) ===");
for (const policy of ["NORMAL", "US_PRIVACY"] as ConsentGeoPolicy[]) {
  // Predicate semantics
  check(`11B/${policy}-1: no stored choice -> allowed`, isAdvertisingIdentifierStorageAllowed(policy, null) === true);
  check(`11B/${policy}-2: advertising:true -> allowed (analytics either way)`,
    isAdvertisingIdentifierStorageAllowed(policy, consent(true, true)) === true && isAdvertisingIdentifierStorageAllowed(policy, consent(false, true)) === true);
  check(`11B/${policy}-3: advertising:false -> BLOCKED (analytics grant does not matter)`,
    isAdvertisingIdentifierStorageAllowed(policy, consent(false, false)) === false && isAdvertisingIdentifierStorageAllowed(policy, consent(true, false)) === false);

  // Sync behaviour
  const nullChoice = new MemStorage();
  check(`11B/${policy}-1b: null choice -> record persisted`,
    syncAdAttribution(nullChoice, ctx(FULL_QS, { policy, storedConsent: null })).action === "created" && AD_ATTRIBUTION_STORAGE_KEY in nullChoice.data);
  const granted = new MemStorage();
  check(`11B/${policy}-2b: advertising:true -> record persisted`,
    syncAdAttribution(granted, ctx(FULL_QS, { policy, storedConsent: consent(false, true) })).action === "created" && AD_ATTRIBUTION_STORAGE_KEY in granted.data);
  const denied = new MemStorage();
  const blocked = syncAdAttribution(denied, ctx(FULL_QS, { policy, storedConsent: consent(true, false) }));
  check(`11B/${policy}-3b: advertising:false -> nothing persisted (no click ids, no utm record)`,
    blocked.action === "skipped_consent" && blocked.record === null && Object.keys(denied.data).length === 0);

  // Existing record is deleted after an explicit false
  const existing = new MemStorage();
  syncAdAttribution(existing, ctx(FULL_QS, { policy, storedConsent: null }));
  const before = AD_ATTRIBUTION_STORAGE_KEY in existing.data;
  const afterDeny = syncAdAttribution(existing, ctx("", { policy, storedConsent: consent(true, false), now: NOW + DAY }));
  check(`11B/${policy}-4: an existing record is DELETED once advertising:false is stored`,
    before && afterDeny.action === "skipped_consent" && !(AD_ATTRIBUTION_STORAGE_KEY in existing.data) && readAdAttribution(existing, NOW + DAY) === null);

  // Checkout must not expose blocked click identifiers, even if a record is still in storage
  const withRecord = new MemStorage();
  syncAdAttribution(withRecord, ctx(FULL_QS, { policy, storedConsent: null }));
  const stillStored = readAdAttribution(withRecord, NOW + DAY);
  const session: AnalyticsAttribution = { landingPage: "/reports/focused/x", utmSource: "google", utmMedium: "cpc", utmCampaign: "c1", referrer: "https://www.google.com/", classification: "campaign" };
  const payload = buildOrderAttributionPayload({ record: stillStored, sessionAttribution: session, policy, storedConsent: consent(true, false) });
  const blockedKeys = ["gclid", "gbraid", "wbraid", "fbclid", "utm_content", "utm_term", "first_touch"];
  check(`11B/${policy}-5: checkout snapshot exposes NO stored click ids / persisted-record fields after explicit false`,
    stillStored !== null && blockedKeys.every((k) => !(k in payload)) && !JSON.stringify(payload).includes("Cj0KCQjw_TEST-gclid.123"));
  check(`11B/${policy}-5b: the permitted session fallback (utm source/medium/campaign, landing, referrer) stays intact`,
    payload.attribution_type === "first_touch" && payload.utm_source === "google" && payload.utm_medium === "cpc" && payload.utm_campaign === "c1"
    && payload.landing_page === "/reports/focused/x" && payload.referrer === "https://www.google.com/");
  check(`11B/${policy}-5c: the explicit choice is reported truthfully in the consent snapshot`,
    payload.consent.geo_policy === policy && payload.consent.advertising === false && payload.consent.analytics === true);
  const allowedPayload = buildOrderAttributionPayload({ record: stillStored, sessionAttribution: session, policy, storedConsent: null });
  check(`11B/${policy}-5d: with no stored choice the same record IS used (click ids present)`, allowedPayload.attribution_type === "latest_click" && allowedPayload.gclid === "Cj0KCQjw_TEST-gclid.123");
}

console.log("\n=== 12. never throws ===");
{
  const throwing: AdStorageLike = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); }, removeItem() { throw new Error("blocked"); } };
  let threw = false;
  let out: ReturnType<typeof syncAdAttribution> | undefined;
  try { out = syncAdAttribution(throwing, ctx(FULL_QS)); } catch { threw = true; }
  check("12a: blocked/full storage never throws into product code", !threw && out?.action === "storage_error");
  let threw2 = false;
  try { syncAdAttribution(throwing, ctx(FULL_QS, { policy: "EUROPE_CONSENT" })); } catch { threw2 = true; }
  check("12b: removal failure under a strict policy never throws either", !threw2);
}

// ---------------------------------------------------------------------
console.log("\n=== 13. checkout snapshot (the `attribution` wire payload) ===");
{
  const s = new MemStorage();
  syncAdAttribution(s, ctx("?utm_source=newsletter&utm_medium=email", { pathname: "/", now: NOW }));
  syncAdAttribution(s, ctx(FULL_QS, { now: NOW + DAY, referrer: "https://www.google.com/" }));
  const rec = readAdAttribution(s, NOW + 2 * DAY);
  const p = buildOrderAttributionPayload({ record: rec, sessionAttribution: null, policy: "NORMAL", storedConsent: null });
  check("13a: latest click is the effective attribution (all nine fields + landing + referrer)",
    p.attribution_type === "latest_click" && p.gclid === "Cj0KCQjw_TEST-gclid.123" && p.fbclid === "IwAR0_fb-9" && p.utm_term === "promotion astrology"
    && p.landing_page === "/reports/focused/promotion-timing" && p.referrer === "https://www.google.com/");
  check("13b: the original first touch is kept alongside", p.first_touch?.utm_source === "newsletter" && p.first_touch?.landing_page === "/");
  check("13c: consent snapshot -- policy known, choice unknown stays null (never guessed)",
    p.consent.geo_policy === "NORMAL" && p.consent.analytics === null && p.consent.advertising === null);

  const firstOnlyRecord = { version: 1 as const, firstTouch: { landingPage: "/", capturedAt: new Date(NOW).toISOString(), utmSource: "blog", utmMedium: "post" }, latestClick: null };
  const firstOnly = buildOrderAttributionPayload({ record: firstOnlyRecord, sessionAttribution: null, policy: "NORMAL", storedConsent: null });
  check("13d: a record with a signal only on the first touch -> 'first_touch'", firstOnly.attribution_type === "first_touch" && firstOnly.utm_source === "blog" && firstOnly.first_touch === undefined);
  const organic = buildOrderAttributionPayload({ record: null, sessionAttribution: null, policy: "NORMAL", storedConsent: null });
  check("14: organic / nothing captured -> still an object, attribution_type 'none', consent snapshot present",
    organic.attribution_type === "none" && organic.consent.geo_policy === "NORMAL" && Object.keys(organic).sort().join() === "attribution_type,consent");

  const session: AnalyticsAttribution = { landingPage: "/hi/reports/focused/x", utmSource: "google", utmMedium: "cpc", utmCampaign: "c1", referrer: "https://www.google.com/", classification: "campaign" };
  const strict = buildOrderAttributionPayload({ record: null, sessionAttribution: session, policy: "EUROPE_CONSENT", storedConsent: null });
  check("15a: consent-blocked visitor -> the existing session snapshot is used (utm source/medium/campaign, landing, referrer)",
    strict.attribution_type === "first_touch" && strict.utm_source === "google" && strict.utm_campaign === "c1" && strict.landing_page === "/hi/reports/focused/x");
  check("15b: ...and it can never carry click ids or utm_content/term", !("gclid" in strict) && !("fbclid" in strict) && !("gbraid" in strict) && !("wbraid" in strict) && !("utm_content" in strict) && !("utm_term" in strict));
  check("15c: EUROPE_CONSENT consent snapshot has NO readable choice", strict.consent.geo_policy === "EUROPE_CONSENT" && strict.consent.analytics === null && strict.consent.advertising === null);

  const directSession: AnalyticsAttribution = { landingPage: "/", classification: "direct" };
  const dp = buildOrderAttributionPayload({ record: null, sessionAttribution: directSession, policy: "SAFE_FALLBACK", storedConsent: consent(true, false) });
  check("15d: direct session -> 'none' with landing page, recorded choice reported as-is",
    dp.attribution_type === "none" && dp.landing_page === "/" && dp.consent.analytics === true && dp.consent.advertising === false);

  const revokedAtCheckout = buildOrderAttributionPayload({ record: rec, sessionAttribution: null, policy: "SAFE_FALLBACK", storedConsent: consent(true, false) });
  check("16: a stored record is NOT used if consent no longer allows it at checkout time", revokedAtCheckout.attribution_type === "none" && !("gclid" in revokedAtCheckout));

  const allowedKeys = new Set(["attribution_type", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "gclid", "gbraid", "wbraid", "fbclid", "landing_page", "referrer", "first_touch", "consent"]);
  check("17: the wire payload contains only allowlisted keys (no name/email/phone/birth/session/user id)",
    Object.keys(p).every((k) => allowedKeys.has(k)) && !/@|email|phone|dob|latitude/i.test(JSON.stringify(Object.keys(p))));
}

// ---------------------------------------------------------------------
console.log("\n=== 18-22. integration: initialization is single; SELF + DUAL wiring; payment path untouched ===");
{
  const initSrc = readSource("components/analytics/WebsiteAnalyticsInit.tsx");
  const rootLayout = readSource("app/layout.tsx");
  const localeLayout = readSource("app/[locale]/layout.tsx");

  function walk(dir: string, out: string[] = []): string[] {
    for (const entry of fs.readdirSync(path.join(__dirname, "..", dir), { withFileTypes: true })) {
      const rel = `${dir}/${entry.name}`;
      if (entry.isDirectory()) { if (entry.name !== "node_modules" && !entry.name.startsWith(".")) walk(rel, out); }
      else if (/\.(tsx|ts)$/.test(entry.name)) out.push(rel);
    }
    return out;
  }
  const mounts = [...walk("app"), ...walk("components")].filter((f) => /<WebsiteAnalyticsInit\b/.test(stripComments(readSource(f))));
  check("18a: exactly ONE <WebsiteAnalyticsInit /> mount exists in the whole app", mounts.length === 1 && mounts[0] === "app/layout.tsx");
  check("18b: it is the ROOT layout (covers [locale] AND /reports); the locale layout no longer mounts or imports it",
    rootLayout.includes("<WebsiteAnalyticsInit />") && !stripComments(localeLayout).includes("WebsiteAnalyticsInit"));
  check("18c: the init runs its effect once per mount (empty dependency array) and syncs ad attribution exactly once",
    (stripComments(initSrc).match(/syncAdAttributionFromBrowser\(/g) || []).length === 1 && /\}, \[\]\);/.test(initSrc));
  check("18d: root layout adds no second GTM/consent script (GTM stays in the locale layout, consent-default stays in root)",
    !rootLayout.includes("gtm.js") && localeLayout.includes("GTM-WLP7T2DP") && rootLayout.includes('id="consent-default"'));
  check("18e: admin pages are not attribution surfaces", initSrc.includes('startsWith("/admin")'));
  check("18f: WebsiteAnalyticsInit still imports nothing from consent (lib/consent.test.ts #14 invariant)",
    !initSrc.includes("lib/consent") && !initSrc.includes("ConsentContext") && !initSrc.includes("useConsent"));
  const attrSrc = readSource("lib/analyticsAttribution.ts");
  check("18g: analyticsAttribution.ts is unchanged in spirit -- no consent import, no fbclid/click-id handling",
    !attrSrc.includes("consent") && !/fbclid|gclid|gbraid|wbraid/.test(stripComments(attrSrc)));

  const self = readSource("components/focused-reports/FocusedReportCheckout.tsx");
  const hook = readSource("hooks/useReportPurchase.ts");
  const dual = readSource("components/focused-reports/FocusedDualReportCheckout.tsx");
  for (const [name, src] of [["SELF FocusedReportCheckout", self], ["shared useReportPurchase (DUAL + relationship)", hook]] as const) {
    check(`19: ${name} imports the snapshot builder and sends it as optional 'attribution' on /api/razorpay-order`,
      src.includes('from "@/lib/adAttribution"') && src.includes("getBrowserOrderAttribution()")
      && src.includes("...(orderAttribution ? { attribution: orderAttribution } : {})"));
    check(`19b: ${name} keeps campaign_context (compatibility) and the product identifier`,
      src.includes("...(campaignContext ? { campaign_context: campaignContext } : {})") && /razorpay-order[\s\S]{0,1200}product/.test(src));
    const webhook = src.match(/\/webhook[\s\S]{0,900}?\}\)/);
    check(`19c: ${name} never resends attribution at /webhook verification time`, !webhook || !webhook[0].includes("attribution"));
    check(`19d: ${name} does not parse the URL itself (single capture point)`, !src.includes("URLSearchParams") && !src.includes("location.search"));
  }
  check("20: DUAL checkout goes through the shared hook (so it carries attribution too) and adds no purchase-event code",
    dual.includes("useReportPurchase") && !stripComments(dual).includes("gtag(") && !stripComments(dual).includes("dataLayer"));

  const codeOnly = stripComments(readSource("lib/adAttribution.ts"));
  check("21: adAttribution.ts code never references customer/identity fields",
    !/\b(email|phone|dob|tob|pob|latitude|longitude|firebase|sessionId|session_id|userId|user_id)\b/i.test(codeOnly));
  check("22: no purchase / ecommerce / pixel / CAPI code was added anywhere in this task's frontend files",
    ["lib/adAttribution.ts", "components/analytics/WebsiteAnalyticsInit.tsx", "hooks/useReportPurchase.ts", "components/focused-reports/FocusedReportCheckout.tsx"]
      .every((f) => !/fbq\(|gtag\(|dataLayer|ecommerce|purchase_event|["']purchase["']/i.test(stripComments(readSource(f)))));
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
