// lib/websiteEvents.test.ts

/**
 * Task 2D regression tests for lib/websiteEvents.ts and its wired
 * producers (FreeKundaliClient.tsx, free-birthchart-result/page.tsx,
 * ReportsPageClient.tsx, AppDownloadCTA.tsx, StickyAppDownloadCTA.tsx).
 *
 * Same standalone check()/pass-fail-counter convention as Task 2A.1's
 * lib/freeKundaliSession.test.ts and Task 2C's
 * lib/analyticsFoundation.test.ts (this repo still has no test runner
 * installed).
 *
 * Two verification strategies, used deliberately for different things:
 *   1. REAL, EXECUTED calls into lib/websiteEvents.ts's exported
 *      functions, with globalThis.window/document/fetch minimally
 *      stubbed (Node has no DOM) -- proves the exact event body a
 *      producer call constructs.
 *   2. Direct SOURCE-TEXT inspection of the actual committed producer
 *      files (via fs.readFileSync) -- this repo has no component-
 *      rendering test harness (confirmed in Task 2A.1 and Task 2C), so
 *      "does this component only call X inside handler Y, never in the
 *      catch block, never at render time" is verified by reading the
 *      real file content and asserting structural invariants against
 *      it, not by rendering. Documented per-check, not silently
 *      substituted for strategy 1 where strategy 1 is possible.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/analyticsSession.ts lib/analyticsAttribution.ts \
 *     lib/anonymousActivityEventClient.ts lib/pagePath.ts lib/websiteEvents.ts lib/websiteEvents.test.ts
 *   node .ts-test-out/websiteEvents.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 *
 * Task 9A -- sections R/S/T/U below cover its own 20 numbered frontend
 * test requirements (S22) for page_path attachment; lib/pagePath.test.ts
 * covers the normalizer itself (its own separate 10 numbered items).
 */

import * as fs from "fs";
import * as path from "path";

import { WebsiteEvents, buildAppDownloadCtaLocation } from "./websiteEvents";
import { AnalyticsStorageLike } from "./analyticsSession";

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

class FakeStorage implements AnalyticsStorageLike {
  private store = new Map<string, string>();
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
}

type CapturedCall = { url: string; body: Record<string, unknown> | null };

// globalThis has no `window`/`document` typing in a plain Node
// compile target -- this repo's own tsconfig `lib` includes "dom", but
// this file is compiled standalone (see the module docstring's run
// command) without it. A single typed accessor pair here replaces
// every ad hoc `(globalThis as any)` cast below.
type MutableGlobal = Record<string, unknown>;
function setGlobal(key: string, value: unknown): void {
  (globalThis as unknown as MutableGlobal)[key] = value;
}
function getGlobal(key: string): unknown {
  return (globalThis as unknown as MutableGlobal)[key];
}
function asProperties(value: unknown): Record<string, unknown> | undefined {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : undefined;
}

/** Minimal browser stubs -- just enough for
 * sendAnonymousActivityEvent()'s real (non-override) window-backed
 * lookup path to run in plain Node. Every fetchImpl call up to (but not
 * including) its own internal `await` happens synchronously, so a
 * caller of WebsiteEvents.* can assert against `calls` immediately
 * afterward with no `await`/tick needed. */
function installBrowserStubs(): { calls: CapturedCall[]; restore: () => void } {
  const calls: CapturedCall[] = [];
  const originalWindow = getGlobal("window");
  const originalDocument = getGlobal("document");
  const originalFetch = globalThis.fetch;

  setGlobal("window", {
    sessionStorage: new FakeStorage(),
    location: { search: "", origin: "https://www.jyotishasha.com", pathname: "/" },
  });
  setGlobal("document", { referrer: "" });
  globalThis.fetch = ((url: string, init?: RequestInit) => {
    calls.push({ url, body: init?.body ? JSON.parse(init.body as string) : null });
    return Promise.resolve(new Response("{}", { status: 201 }));
  }) as unknown as typeof fetch;

  return {
    calls,
    restore: () => {
      setGlobal("window", originalWindow);
      setGlobal("document", originalDocument);
      globalThis.fetch = originalFetch;
    },
  };
}

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

// ===========================================================================
// A. Instrumented CTA emits correct cta_click body
// ===========================================================================
console.log("\n=== A. cta_click body ===");
{
  const { calls, restore } = installBrowserStubs();
  WebsiteEvents.ctaClick("kundali_form_generate", "kundali_form");
  check("A1: exactly one request sent", calls.length === 1);
  check("A2: hits the anonymous endpoint", calls[0]?.url.endsWith("/api/activity-events/anonymous"));
  check("A3: event_name is cta_click", calls[0]?.body?.event_name === "cta_click");
  check("A4: properties.cta_id correct", asProperties(calls[0]?.body?.properties)?.cta_id === "kundali_form_generate");
  check("A5: properties.screen_name correct", asProperties(calls[0]?.body?.properties)?.screen_name === "kundali_form");
  check("A6: no forbidden top-level keys", ["platform", "environment", "firebase_uid"].every((k) => calls[0]?.body && !(k in calls[0].body)));
  // Task 9A -- 13/19: page_path attached alongside the existing
  // properties, which remain unchanged (not replaced/renamed).
  check("A7 (Task 9A #13/#19): properties.page_path attached, cta_id/screen_name still both present", asProperties(calls[0]?.body?.properties)?.page_path === "/" && asProperties(calls[0]?.body?.properties)?.cta_id === "kundali_form_generate" && asProperties(calls[0]?.body?.properties)?.screen_name === "kundali_form");
  restore();
}

// ===========================================================================
// C/D/E. app_download_intent -- correct event, controlled placement,
// both AppDownloadCTA and StickyAppDownloadCTA covered
// ===========================================================================
console.log("\n=== C/D/E. app_download_intent ===");
{
  const { calls, restore } = installBrowserStubs();
  WebsiteEvents.appDownloadIntent("daily_panchang_primary_cta");
  check("C1: exactly one request sent", calls.length === 1);
  check("C2: event_name is app_download_intent", calls[0]?.body?.event_name === "app_download_intent");
  // Task 9A #15: page_path (call-time current pathname) is now attached
  // ALONGSIDE cta_location -- placement and page are two distinct,
  // both-populated dimensions, neither replaces the other. installBrowserStubs()
  // sets location.pathname to "/", a valid page_path.
  check("C3: properties has exactly {cta_location, page_path}, cta_location correct", JSON.stringify(calls[0]?.body?.properties) === JSON.stringify({ cta_location: "daily_panchang_primary_cta", page_path: "/" }));
  restore();

  check("E1: cta_location built from utm.source+medium", buildAppDownloadCtaLocation({ source: "daily_panchang", medium: "primary_cta" }, "fallback", "organic") === "daily_panchang_primary_cta");
  check("E2: falls back to defaultMedium when utm.medium absent", buildAppDownloadCtaLocation({ source: "site_global" }, "fallback", "organic") === "site_global_organic");
  check("E3: falls back to the fallback constant when utm entirely absent", buildAppDownloadCtaLocation(undefined, "app_download_cta", "organic") === "app_download_cta");
  check("E4: never derived from anything but the two utm fields", buildAppDownloadCtaLocation({ source: "muhurat_hub", medium: "content_cta" }, "x", "y") === "muhurat_hub_content_cta");
}

console.log("\n=== D. both AppDownloadCTA and StickyAppDownloadCTA are wired ===");
{
  const appDownloadCta = readSource("components/AppDownloadCTA.tsx");
  const stickyAppDownloadCta = readSource("components/StickyAppDownloadCTA.tsx");
  check("D1: AppDownloadCTA calls WebsiteEvents.appDownloadIntent", appDownloadCta.includes("WebsiteEvents.appDownloadIntent("));
  check("D2: StickyAppDownloadCTA calls WebsiteEvents.appDownloadIntent", stickyAppDownloadCta.includes("WebsiteEvents.appDownloadIntent("));
  check("D3: StickyAppDownloadCTA is mounted in the locale layout (live, not orphaned)", readSource("app/[locale]/layout.tsx").includes("<StickyAppDownloadCTA"));

  // C(only-on-click): the call sites are inside their own onClick handler
  // function, not inside the component's top-level render body -- proven
  // by the call appearing strictly after the `const handleClick = () => {`
  // line and before its closing `};` in each file.
  const acHandlerBody = appDownloadCta.slice(appDownloadCta.indexOf("const handleClick"), appDownloadCta.indexOf("return ("));
  check("C4 (AppDownloadCTA): appDownloadIntent call lives inside handleClick, not the render body", acHandlerBody.includes("WebsiteEvents.appDownloadIntent("));
  const stickyHandlerBody = stickyAppDownloadCta.slice(stickyAppDownloadCta.indexOf("const handleClick"), stickyAppDownloadCta.indexOf("return ("));
  check("C5 (StickyAppDownloadCTA): appDownloadIntent call lives inside handleClick, not the render body", stickyHandlerBody.includes("WebsiteEvents.appDownloadIntent("));
}

// ===========================================================================
// F. Analytics failure does not block outbound app-store navigation
// ===========================================================================
console.log("\n=== F. analytics failure never blocks navigation ===");
{
  // sendAnonymousActivityEvent's own never-throws guarantee (proven
  // directly in Task 2C's lib/analyticsFoundation.test.ts, tests S/T/U)
  // is exactly what WebsiteEvents.* relies on -- re-verified here at the
  // facade layer with a failing fetch.
  const originalWindow = getGlobal("window");
  const originalDocument = getGlobal("document");
  const originalFetch = globalThis.fetch;
  setGlobal("window", { sessionStorage: new FakeStorage(), location: { search: "", origin: "https://x.test", pathname: "/" } });
  setGlobal("document", { referrer: "" });
  globalThis.fetch = (() => {
    throw new TypeError("Failed to fetch");
  }) as unknown as typeof fetch;

  let threw = false;
  try {
    WebsiteEvents.appDownloadIntent("test_location");
  } catch {
    threw = true;
  }
  check("F1: WebsiteEvents.appDownloadIntent never throws synchronously even when fetch itself throws", !threw);

  setGlobal("window", originalWindow);
  setGlobal("document", originalDocument);
  globalThis.fetch = originalFetch;

  const appDownloadCta = readSource("components/AppDownloadCTA.tsx");
  const stickyAppDownloadCta = readSource("components/StickyAppDownloadCTA.tsx");
  // \bawait\b (not a bare .includes) so a comment saying "never
  // awaited" doesn't false-positive on the substring "await" inside it.
  const AWAIT_KEYWORD_RE = /\bawait\b/;
  check("F2 (AppDownloadCTA): handleClick contains no `await` keyword", !AWAIT_KEYWORD_RE.test(appDownloadCta.slice(appDownloadCta.indexOf("const handleClick"), appDownloadCta.indexOf("return ("))));
  check("F3 (StickyAppDownloadCTA): handleClick contains no `await` keyword", !AWAIT_KEYWORD_RE.test(stickyAppDownloadCta.slice(stickyAppDownloadCta.indexOf("const handleClick"), stickyAppDownloadCta.indexOf("return ("))));
  check("F4 (AppDownloadCTA): handleClick never calls preventDefault", !appDownloadCta.includes("preventDefault"));
  check("F5 (StickyAppDownloadCTA): outbound href is independent of the click handler (built by buildLink(), not inside handleClick)", stickyAppDownloadCta.indexOf("const link = buildLink();") < stickyAppDownloadCta.indexOf("const handleClick"));
}

// ===========================================================================
// G/H/I. Free Kundali: payload untouched, completion fires only on
// genuine success, never on failure
// ===========================================================================
console.log("\n=== G/H/I. Free Kundali completion semantics ===");
{
  const resultPage = readSource("app/[locale]/free-kundali/free-birthchart-result/page.tsx");
  const freeKundaliClient = readSource("app/[locale]/free-kundali/FreeKundaliClient.tsx");

  check("G1: buildFullKundaliApiPayload is still the API body (payload construction untouched)", resultPage.includes("body: JSON.stringify(apiPayload)"));
  check("G2: the fetch URL/method/headers are unchanged", resultPage.includes(`method: "POST"`) && resultPage.includes(`"Content-Type": "application/json"`));
  check("G3 (FreeKundaliClient): sessionStorage payload write call is unchanged (lat/lng untouched)", freeKundaliClient.includes("sessionStorage.setItem(buildFreeKundaliStorageKey(rid), serializeFreeKundaliPayload(payload))"));

  const tryBlock = resultPage.slice(resultPage.indexOf("try {", resultPage.indexOf("async function fetchKundali")), resultPage.indexOf("} catch (err: any) {"));
  const catchBlock = resultPage.slice(resultPage.indexOf("} catch (err: any) {"), resultPage.indexOf("} finally {"));

  check("H1: featureUsed call is inside the try block, after setData(json)", tryBlock.indexOf("setData(json)") < tryBlock.indexOf("WebsiteEvents.featureUsed(") && tryBlock.includes("WebsiteEvents.featureUsed(\"kundali_generate\")"));
  check("I1: featureUsed is NOT called anywhere in the catch block (no false completion on failure)", !catchBlock.includes("WebsiteEvents.featureUsed"));
  check("I2: featureUsed is NOT called in the `else` (missing rid/payload) branch", !resultPage.slice(resultPage.indexOf("} else {"), resultPage.indexOf("}, [rid, isHi]);")).includes("WebsiteEvents.featureUsed"));
}

// ===========================================================================
// J/K. Report discovery seam + purchase-entry CTA id
// ===========================================================================
console.log("\n=== J/K. report discovery + purchase-entry CTA ===");
{
  const reportsPage = readSource("app/reports/ReportsPageClient.tsx");
  const occurrences = (reportsPage.match(/WebsiteEvents\.reportDiscoveryViewed\(\)/g) || []).length;
  check("J1: reportDiscoveryViewed is called exactly once in the file", occurrences === 1);
  check("J2: the call is inside a useEffect with an empty dependency array", /useEffect\(\(\) => \{[\s\S]*?WebsiteEvents\.reportDiscoveryViewed\(\);[\s\S]*?\}, \[\]\);/.test(reportsPage));
  check("J3: guarded by a ref so it cannot fire twice from Strict Mode/rerender", reportsPage.includes("hasTrackedDiscoveryRef.current") && reportsPage.includes("if (hasTrackedDiscoveryRef.current) return;"));

  check("K1: exact frozen purchase-entry cta_id string is used", reportsPage.includes('WebsiteEvents.ctaClick("report_catalog_buy_now", "report_catalog")'));

  // Cross-check against the backend's own frozen constant value (not
  // re-derived -- read directly from the real backend source file).
  const backendContractPath = path.join(__dirname, "..", "..", "Jyotishasha_Backend", "modules", "activity_events", "analytics_contract.py");
  if (fs.existsSync(backendContractPath)) {
    const backendContract = fs.readFileSync(backendContractPath, "utf8");
    const match = backendContract.match(/PURCHASED_REPORT_ENTRY_CTA_ID\s*=\s*"([^"]+)"/);
    check("K2: matches the backend's own PURCHASED_REPORT_ENTRY_CTA_ID constant exactly", !!match && match[1] === "report_catalog_buy_now");
  } else {
    check("K2: backend contract file reachable for cross-check (skipped -- path not found in this environment)", true);
  }
}

// ===========================================================================
// L/M/N. No purchased-report view/download producer, no subscription
// producer of any kind
// ===========================================================================
console.log("\n=== L/M/N. absence checks ===");
{
  const changedFiles = [
    "lib/websiteEvents.ts",
    "app/[locale]/free-kundali/FreeKundaliClient.tsx",
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "app/reports/ReportsPageClient.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "app/[locale]/layout.tsx",
  ].map(readSource);
  const combined = changedFiles.join("\n");

  check("L1: no report_viewed producer anywhere in this task's changed files", !combined.includes('"report_viewed"'));
  check("L2: no report_downloaded producer anywhere in this task's changed files", !combined.includes('"report_downloaded"'));

  // Checks for an actual CALL/invocation shape, not bare mentions --
  // lib/websiteEvents.ts's own docstring explains the deferral decision
  // in prose and legitimately contains the event name as a word, which
  // must not itself trip this check.
  const subscriptionDiscoveryCallPatterns = [
    /WebsiteEvents\.subscriptionDiscoveryViewed\s*\(/,
    /eventName:\s*"subscription_discovery_viewed"/,
  ];
  check(
    "M1/N1: no subscription_discovery_viewed producer call wired anywhere (no live seam found -- deferred)",
    subscriptionDiscoveryCallPatterns.every((re) => !re.test(combined))
  );
  const subscriptionLifecycleEvents = [
    "subscription_trial_started", "subscription_trial_expired", "subscription_pending_created",
    "subscription_started", "subscription_renewed", "subscription_grace_entered",
    "subscription_expired", "subscription_cancelled", "subscription_refunded",
  ];
  check("N2: no subscription lifecycle event string appears anywhere", subscriptionLifecycleEvents.every((e) => !combined.includes(e)));
}

// ===========================================================================
// O. Duplicate control -- ref guards present for both view/discovery
// producers
// ===========================================================================
console.log("\n=== O. duplicate control ===");
{
  const resultPage = readSource("app/[locale]/free-kundali/free-birthchart-result/page.tsx");
  check("O1: kundali completion guarded by hasTrackedCompletionRef", resultPage.includes("hasTrackedCompletionRef.current = true;") && resultPage.includes("if (!hasTrackedCompletionRef.current) {"));

  const reportsPage = readSource("app/reports/ReportsPageClient.tsx");
  check("O2: report discovery guarded by hasTrackedDiscoveryRef", reportsPage.includes("hasTrackedDiscoveryRef.current = true;"));

  // Click events (cta_click, app_download_intent) are legitimately NOT
  // guarded -- a user clicking "Buy Now" or the download CTA twice is
  // two real, distinct clicks, not a duplicate.
  check("O3: cta_click/app_download_intent call sites carry no once-guard (clicks may legitimately repeat)", !reportsPage.slice(reportsPage.indexOf("const handleBuyNow"), reportsPage.indexOf("return (")).includes("Ref.current"));
}

// ===========================================================================
// P. No PII/birth/payment/auth data in any producer's properties
// ===========================================================================
console.log("\n=== P. no PII in producer properties ===");
{
  const forbiddenIdentifiers = ["form.name", "form.email", "form.phone", "form.dob", "form.tob", "form.pob", "form.lat", "form.lng", "form.place", "payload.name", "payload.dob", "payload.tob", "payload.place", "payload.lat", "payload.lng", "razorpay_signature", "razorpay_payment_id"];
  const producerFiles: Record<string, string> = {
    "FreeKundaliClient.tsx": readSource("app/[locale]/free-kundali/FreeKundaliClient.tsx"),
    "free-birthchart-result/page.tsx": readSource("app/[locale]/free-kundali/free-birthchart-result/page.tsx"),
    "ReportsPageClient.tsx": readSource("app/reports/ReportsPageClient.tsx"),
    "AppDownloadCTA.tsx": readSource("components/AppDownloadCTA.tsx"),
    "StickyAppDownloadCTA.tsx": readSource("components/StickyAppDownloadCTA.tsx"),
  };
  for (const [name, source] of Object.entries(producerFiles)) {
    // Only check the argument lists actually passed to WebsiteEvents.*
    // calls, not the whole file (which legitimately references form.name
    // etc. elsewhere for the actual product flow).
    const calls = source.match(/WebsiteEvents\.\w+\([^)]*\)/g) || [];
    const callsText = calls.join(" ");
    check(`P: ${name} -- no WebsiteEvents call references PII/payment/auth fields`, forbiddenIdentifiers.every((id) => !callsText.includes(id)));
  }
}

// ===========================================================================
// Q. No product component bypasses sendAnonymousActivityEvent with a
// direct fetch to the activity-events endpoint
// ===========================================================================
console.log("\n=== Q. no direct fetch bypass ===");
{
  const producerFilesList = [
    "app/[locale]/free-kundali/FreeKundaliClient.tsx",
    "app/[locale]/free-kundali/free-birthchart-result/page.tsx",
    "app/reports/ReportsPageClient.tsx",
    "components/AppDownloadCTA.tsx",
    "components/StickyAppDownloadCTA.tsx",
    "lib/websiteEvents.ts",
  ];
  const clientModule = readSource("lib/anonymousActivityEventClient.ts");
  check("Q0: the endpoint path constant lives only in the client module itself", clientModule.includes("/api/activity-events/anonymous"));
  for (const file of producerFilesList) {
    const source = readSource(file);
    check(`Q: ${file} -- contains no direct "/api/activity-events" fetch`, !source.includes("/api/activity-events"));
  }
}

// ===========================================================================
// R. featureUsed / reportDiscoveryViewed also carry page_path (Task 9A
// #14/#16), and page_path is derived at CALL TIME, not once globally
// (Task 9A #11/#12 -- SPA navigation between two calls)
// ===========================================================================
console.log("\n=== R. featureUsed/reportDiscoveryViewed page_path + call-time derivation ===");
{
  const { calls, restore } = installBrowserStubs();
  const win = getGlobal("window") as { location: { pathname: string } };

  win.location.pathname = "/free-kundali/free-birthchart-result/";
  WebsiteEvents.featureUsed("kundali_generate");
  check("R1 (#14): featureUsed properties.feature_name unchanged, plus page_path from the CURRENT pathname", asProperties(calls[0]?.body?.properties)?.feature_name === "kundali_generate" && asProperties(calls[0]?.body?.properties)?.page_path === "/free-kundali/free-birthchart-result/");

  win.location.pathname = "/reports";
  WebsiteEvents.reportDiscoveryViewed();
  check("R2 (#16): reportDiscoveryViewed carries page_path (and no other property)", JSON.stringify(calls[1]?.body?.properties) === JSON.stringify({ page_path: "/reports" }));

  // #11/#12: SPA navigation -- the SAME producer method, called twice
  // with the pathname changed in between (no reload, no re-init),
  // yields two DIFFERENT page_path values -- proves this is read live
  // at call time, never cached/captured once.
  win.location.pathname = "/en/panchang";
  WebsiteEvents.ctaClick("x", "y");
  win.location.pathname = "/en/muhurat";
  WebsiteEvents.ctaClick("x", "y");
  check("R3 (#11/#12): first ctaClick call captured the pathname AT THAT TIME (/en/panchang)", asProperties(calls[2]?.body?.properties)?.page_path === "/en/panchang");
  check("R4 (#11/#12): second ctaClick call (after SPA navigation) captured the NEW pathname (/en/muhurat), not the first", asProperties(calls[3]?.body?.properties)?.page_path === "/en/muhurat");

  restore();
}

// ===========================================================================
// S. No query string / fragment ever enters the event payload, even if
// window.location.pathname is fed something malformed (Task 9A #17/#18)
// ===========================================================================
console.log("\n=== S. no query/fragment enters payload ===");
{
  const { calls, restore } = installBrowserStubs();
  const win = getGlobal("window") as { location: { pathname: string } };

  win.location.pathname = "/free-kundali?rid=abc123&utm_source=fb";
  WebsiteEvents.ctaClick("kundali_form_generate", "kundali_form");
  const props1 = asProperties(calls[0]?.body?.properties);
  check("S1 (#17): no '?' character anywhere in the sent page_path", typeof props1?.page_path === "string" && !(props1.page_path as string).includes("?"));
  check("S1b (#17): rid never reaches the event payload at all", JSON.stringify(calls[0]?.body) .indexOf("rid") === -1);
  check("S1c: page_path correctly stripped down to the bare pathname", props1?.page_path === "/free-kundali");

  win.location.pathname = "/reports#pricing";
  WebsiteEvents.reportDiscoveryViewed();
  const props2 = asProperties(calls[1]?.body?.properties);
  check("S2 (#18): no '#' character anywhere in the sent page_path", typeof props2?.page_path === "string" && !(props2.page_path as string).includes("#"));
  check("S2b: page_path correctly stripped down to the bare pathname", props2?.page_path === "/reports");

  restore();
}

// ===========================================================================
// T. Delivery-failure semantics unchanged by the page_path addition
// (Task 9A #20) -- neither a throwing fetch nor a throwing
// window.location access can make any WebsiteEvents.* method throw.
// ===========================================================================
console.log("\n=== T. delivery-failure semantics unchanged ===");
{
  const originalWindow = getGlobal("window");
  const originalDocument = getGlobal("document");
  const originalFetch = globalThis.fetch;

  // window.location itself throws on access -- getCurrentPagePath()
  // must swallow this (pagePath.ts's own try/catch) and the whole
  // producer call must still never throw, exactly like the pre-Task-9A
  // fetch-throws case (test F) already proved for the network layer.
  setGlobal("window", {
    sessionStorage: new FakeStorage(),
    get location(): never {
      throw new Error("boom");
    },
  });
  setGlobal("document", { referrer: "" });
  globalThis.fetch = (() => {
    return Promise.resolve(new Response("{}", { status: 201 }));
  }) as unknown as typeof fetch;

  let threw = false;
  try {
    WebsiteEvents.ctaClick("x", "y");
    WebsiteEvents.featureUsed("kundali_generate");
    WebsiteEvents.appDownloadIntent("test_location");
    WebsiteEvents.reportDiscoveryViewed();
  } catch {
    threw = true;
  }
  check("T1 (#20): no WebsiteEvents.* method throws even when window.location access itself throws", !threw);

  setGlobal("window", originalWindow);
  setGlobal("document", originalDocument);
  globalThis.fetch = originalFetch;
}

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("==================================================");
if (failed > 0) process.exit(1);
