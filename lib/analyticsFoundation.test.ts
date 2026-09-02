// lib/analyticsFoundation.test.ts

/**
 * Task 2C regression tests for lib/analyticsSession.ts,
 * lib/analyticsAttribution.ts, and lib/anonymousActivityEventClient.ts.
 *
 * Same standalone check()/pass-fail-counter convention established by
 * Task 2A.1's lib/freeKundaliSession.test.ts (this repo has no test
 * runner installed -- no jest/vitest/RTL in package.json). Exercises
 * the pure, framework-free functions directly; no DOM/jsdom/React
 * renderer needed (Node 20's own global `fetch`/`AbortController`/
 * `URL`/`URLSearchParams`/`crypto.randomUUID` cover everything the
 * event-client tests below need).
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/analyticsSession.ts lib/analyticsAttribution.ts \
 *     lib/anonymousActivityEventClient.ts lib/analyticsFoundation.test.ts
 *   node .ts-test-out/analyticsFoundation.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */

import {
  AnalyticsStorageLike,
  ANALYTICS_SESSION_STORAGE_KEY,
  generateAnalyticsSessionId,
  getOrCreateAnalyticsSessionId,
} from "./analyticsSession";

import {
  ANALYTICS_ATTRIBUTION_STORAGE_KEY,
  buildCampaignContextFromAttribution,
  captureUtmParams,
  classifySourceMedium,
  getOrCreateAttribution,
  normalizeLandingPage,
  normalizeReferrer,
  readStoredAttribution,
} from "./analyticsAttribution";

import {
  ANONYMOUS_EVENT_BODY_KEYS,
  buildAnonymousEventBody,
  sendAnonymousActivityEvent,
} from "./anonymousActivityEventClient";

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

/** Simple in-memory Storage-like stand-in for window.sessionStorage. */
class FakeStorage implements AnalyticsStorageLike {
  private store = new Map<string, string>();
  setItem(key: string, value: string) {
    this.store.set(key, value);
  }
  getItem(key: string): string | null {
    return this.store.has(key) ? this.store.get(key)! : null;
  }
}

/** A storage stand-in whose every method throws -- simulates a fully
 * blocked/unavailable sessionStorage (private mode, disabled site
 * data, etc.). */
class ThrowingStorage implements AnalyticsStorageLike {
  getItem(): string {
    throw new Error("blocked");
  }
  setItem(): void {
    throw new Error("blocked");
  }
}

const CURRENT_ORIGIN = "https://www.jyotishasha.com";

// ===========================================================================
// A-C. Session id: creation, reuse, uniqueness across fresh sessions
// ===========================================================================
console.log("\n=== A-C. session id creation/reuse/uniqueness ===");
{
  const storage = new FakeStorage();
  const first = getOrCreateAnalyticsSessionId(storage);
  check("A1: first init creates a non-empty session_id", !!first && first.length > 0);
  check("A2: session_id is persisted under the documented key", storage.getItem(ANALYTICS_SESSION_STORAGE_KEY) === first);

  const second = getOrCreateAnalyticsSessionId(storage);
  check("B1: same storage context reuses the identical session_id", second === first);

  const freshStorage = new FakeStorage();
  const fresh = getOrCreateAnalyticsSessionId(freshStorage);
  check("C1: a fresh (separate) storage context gets a different session_id", fresh !== first);

  const id1 = generateAnalyticsSessionId();
  const id2 = generateAnalyticsSessionId();
  check("C2: two independently generated ids differ", id1 !== id2);
}

// ===========================================================================
// D. session_id contains no user-derived data
// ===========================================================================
console.log("\n=== D. session_id contains no user-derived data ===");
{
  const id = generateAnalyticsSessionId();
  const forbiddenSubstrings = ["@", "firebase", "email", "phone", String(process.pid)];
  check(
    "D1: generated id contains no obviously user/process-derived substrings",
    forbiddenSubstrings.every((s) => !id.toLowerCase().includes(s.toLowerCase()))
  );
  // UUID or the documented fallback shape only.
  const uuidShape = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const fallbackShape = /^sess-[a-z0-9]+-[a-z0-9]+-[a-z0-9]+$/;
  check("D2: id matches the UUID shape or the documented random fallback shape", uuidShape.test(id) || fallbackShape.test(id));
}

// ===========================================================================
// E. UTM source/medium/campaign captured
// ===========================================================================
console.log("\n=== E. UTM capture ===");
{
  const utm = captureUtmParams("?utm_source=newsletter&utm_medium=email&utm_campaign=launch&utm_content=ignored&utm_term=ignored");
  check("E1: utm_source captured", utm.utmSource === "newsletter");
  check("E2: utm_medium captured", utm.utmMedium === "email");
  check("E3: utm_campaign captured", utm.utmCampaign === "launch");

  const empty = captureUtmParams("?other=1");
  check("E4: no UTM params present -> all undefined", empty.utmSource === undefined && empty.utmMedium === undefined && empty.utmCampaign === undefined);

  const trimmed = captureUtmParams("?utm_source=" + encodeURIComponent("  spaced  "));
  check("E5: value is trimmed", trimmed.utmSource === "spaced");

  const empty2 = captureUtmParams("?utm_source=");
  check("E6: empty utm_source value becomes absent (undefined)", empty2.utmSource === undefined);

  const oversized = captureUtmParams("?utm_source=" + "x".repeat(300));
  check("E7: oversized utm_source value is capped to 256 chars", oversized.utmSource !== undefined && oversized.utmSource.length === 256);
}

// ===========================================================================
// F/G. UTM/attribution survives later navigation, never overwritten
// ===========================================================================
console.log("\n=== F/G. attribution persists across navigation, not overwritten ===");
{
  const storage = new FakeStorage();
  const first = getOrCreateAttribution(storage, {
    search: "?utm_source=newsletter&utm_medium=email&utm_campaign=launch",
    referrer: "",
    pathname: "/free-kundali",
    currentOrigin: CURRENT_ORIGIN,
  });
  check("F1: first capture records the UTM values", first?.utmSource === "newsletter" && first?.utmCampaign === "launch");
  check("F1b: attribution is persisted under the documented storage key", storage.getItem(ANALYTICS_ATTRIBUTION_STORAGE_KEY) !== null);

  // Simulate SPA navigation to a DIFFERENT page with NO UTM params at all.
  const second = getOrCreateAttribution(storage, {
    search: "",
    referrer: "",
    pathname: "/panchang/today",
    currentOrigin: CURRENT_ORIGIN,
  });
  check("F2: attribution survives navigation with no UTM in the new URL", second?.utmSource === "newsletter" && second?.utmCampaign === "launch");
  check("G1: landingPage is NOT overwritten by the later pathname", second?.landingPage === "/free-kundali");

  // Simulate navigation to a page with a DIFFERENT utm_source in the URL --
  // must still not overwrite the original.
  const third = getOrCreateAttribution(storage, {
    search: "?utm_source=different-campaign",
    referrer: "",
    pathname: "/reports",
    currentOrigin: CURRENT_ORIGIN,
  });
  check("G2: a later URL's own UTM values do not overwrite the original attribution", third?.utmSource === "newsletter");
}

// ===========================================================================
// H/I. landing_page: pathname only, no query/fragment
// ===========================================================================
console.log("\n=== H/I. landing_page shape ===");
{
  check("H1: plain pathname preserved as-is", normalizeLandingPage("/free-kundali") === "/free-kundali");
  check("H2: locale-prefixed pathname preserved", normalizeLandingPage("/hi/free-kundali") === "/hi/free-kundali");
  check("I1: query string stripped", normalizeLandingPage("/reports?utm_source=x") === "/reports");
  check("I2: fragment stripped", normalizeLandingPage("/reports#section") === "/reports");
  check("I3: both query and fragment stripped", normalizeLandingPage("/reports?x=1#y") === "/reports");
  check("I4: a full URL accidentally passed is reduced to pathname only", normalizeLandingPage("https://www.jyotishasha.com/free-kundali?x=1#y") === "/free-kundali");

  const storage = new FakeStorage();
  const attribution = getOrCreateAttribution(storage, {
    search: "?utm_source=a",
    referrer: "",
    pathname: "/free-kundali?should=not-appear#neither",
    currentOrigin: CURRENT_ORIGIN,
  });
  check("I5: end-to-end via getOrCreateAttribution, landingPage has no query/fragment", attribution?.landingPage === "/free-kundali");
}

// ===========================================================================
// J/K. referrer normalization
// ===========================================================================
console.log("\n=== J/K. referrer normalization ===");
{
  const normalized = normalizeReferrer("https://user:pass@ref.example.com/some/path?utm_source=x&secret=y#frag");
  check("J1: referrer normalizes to origin+pathname only", normalized?.full === "https://ref.example.com/some/path");
  check("J2: no query string in normalized referrer", !normalized?.full.includes("?"));
  check("J3: no fragment in normalized referrer", !normalized?.full.includes("#"));
  check("J4: no credentials in normalized referrer", !normalized?.full.includes("user:pass") && !normalized?.full.includes("@ref"));

  check("K1: empty referrer omitted", normalizeReferrer("") === undefined);
  check("K2: malformed referrer omitted", normalizeReferrer("not a url") === undefined);
  check("K3: non-http(s) scheme omitted", normalizeReferrer("ftp://example.com/x") === undefined);
  check("K4: javascript: scheme omitted", normalizeReferrer("javascript:alert(1)") === undefined);
}

// ===========================================================================
// L/M. deterministic classification
// ===========================================================================
console.log("\n=== L/M. source/medium classification ===");
{
  check("L1: no UTM, no referrer -> direct", classifySourceMedium({ currentOrigin: CURRENT_ORIGIN }) === "direct");
  check("L2: no UTM, same-origin referrer -> direct (internal navigation, not acquisition)", classifySourceMedium({ referrerOrigin: CURRENT_ORIGIN, currentOrigin: CURRENT_ORIGIN }) === "direct");

  check("M1: no UTM, external referrer -> referral", classifySourceMedium({ referrerOrigin: "https://google.com", currentOrigin: CURRENT_ORIGIN }) === "referral");

  check("N: explicit utm_source -> campaign (wins over referrer)", classifySourceMedium({ utmSource: "newsletter", referrerOrigin: "https://google.com", currentOrigin: CURRENT_ORIGIN }) === "campaign");
  check("N2: explicit utm_medium alone -> campaign", classifySourceMedium({ utmMedium: "email", currentOrigin: CURRENT_ORIGIN }) === "campaign");
}

// ===========================================================================
// N. blocked/unavailable sessionStorage does not throw
// ===========================================================================
console.log("\n=== N(storage). blocked sessionStorage never throws ===");
{
  let threwSession = false;
  let sessionResult: string | null = "unset";
  try {
    sessionResult = getOrCreateAnalyticsSessionId(new ThrowingStorage());
  } catch {
    threwSession = true;
  }
  check("N-storage-1: getOrCreateAnalyticsSessionId never throws on blocked storage", !threwSession);
  check("N-storage-2: returns null (not a fabricated id) when storage is blocked", sessionResult === null);

  let threwAttribution = false;
  let attributionResult: unknown = "unset";
  try {
    attributionResult = getOrCreateAttribution(new ThrowingStorage(), {
      search: "?utm_source=x",
      referrer: "https://google.com",
      pathname: "/free-kundali",
      currentOrigin: CURRENT_ORIGIN,
    });
  } catch {
    threwAttribution = true;
  }
  check("N-storage-3: getOrCreateAttribution never throws on blocked storage", !threwAttribution);
  check("N-storage-4: returns null when storage is blocked", attributionResult === null);

  let threwRead = false;
  try {
    readStoredAttribution(new ThrowingStorage());
  } catch {
    threwRead = true;
  }
  check("N-storage-5: readStoredAttribution never throws on blocked storage", !threwRead);
}

// ===========================================================================
// O/P/Q/R. anonymous event client body construction
// ===========================================================================
console.log("\n=== O/P/Q/R. anonymous event body construction ===");
{
  const attribution = {
    landingPage: "/free-kundali",
    utmSource: "newsletter",
    utmMedium: "email",
    utmCampaign: "launch",
    referrer: "https://google.com/search",
    classification: "campaign" as const,
  };
  const campaignContext = buildCampaignContextFromAttribution(attribution);

  const body = buildAnonymousEventBody(
    { eventName: "cta_click", properties: { cta_id: "x", screen_name: "y" } },
    { sessionId: "sess-abc-123", campaignContext, now: () => new Date("2026-01-01T00:00:00.000Z") }
  );

  check("O1: body is built (session available)", body !== null);
  check("O2: event_name correct", body?.event_name === "cta_click");
  check("O3: event_version defaults to 1", body?.event_version === 1);
  check("O4: session_id correct", body?.session_id === "sess-abc-123");
  check("O5: properties passed through", body?.properties.cta_id === "x" && body?.properties.screen_name === "y");
  check("O6: campaign_context derived from attribution (utm_* + referrer only)", JSON.stringify(body?.campaign_context) === JSON.stringify({ utm_source: "newsletter", utm_medium: "email", utm_campaign: "launch", referrer: "https://google.com/search" }));

  check("P1: body has exactly the 6 allowed top-level keys at most", body ? Object.keys(body).every((k) => (ANONYMOUS_EVENT_BODY_KEYS as readonly string[]).includes(k)) : false);
  const forbidden = ["platform", "environment", "firebase_uid", "profile_id", "anonymous_id", "event_id", "recorded_at", "correlation_id", "dedupe_key", "entity_type", "entity_id", "notification_context"];
  check("P2: none of the forbidden/backend-owned keys are ever present", body ? forbidden.every((k) => !(k in body)) : false);
  // Simulate a hostile/buggy caller stuffing extra fields onto the input at
  // runtime (bypassing TypeScript) -- the built body must still exclude them.
  const hostileInput = { eventName: "cta_click", platform: "app_android", firebase_uid: "x", entity_type: "ai_report" } as unknown as Parameters<typeof buildAnonymousEventBody>[0];
  const hostileBody = buildAnonymousEventBody(hostileInput, { sessionId: "s1" });
  check("P3: even a hostile input object cannot inject a forbidden key into the body", hostileBody ? forbidden.every((k) => !(k in hostileBody)) : false);

  check("Q1: landing_page is never a key anywhere in the built body", body ? !("landing_page" in body) && !("landingPage" in (body.campaign_context || {})) : false);
  check("Q2: campaign_context itself never contains a landing_page/landingPage key", body?.campaign_context ? !("landing_page" in body.campaign_context) && !("landingPage" in body.campaign_context) : true);

  check("R1: occurred_at is a valid ISO-8601 UTC string", body?.occurred_at === "2026-01-01T00:00:00.000Z");
  check("R2: occurred_at parses back to a valid Date", body ? !isNaN(new Date(body.occurred_at).getTime()) : false);
  check("R3: occurred_at ends in Z (UTC, timezone-aware)", !!body?.occurred_at.endsWith("Z"));

  const noSession = buildAnonymousEventBody({ eventName: "cta_click" }, { sessionId: null });
  check("O7: no session_id -> body is null (never sent)", noSession === null);

  const noCampaignContext = buildAnonymousEventBody({ eventName: "cta_click" }, { sessionId: "s1" });
  check("O8: no attribution captured yet -> campaign_context key is entirely omitted", noCampaignContext !== null && !("campaign_context" in noCampaignContext));
}

// ===========================================================================
// S/T/U/V. sendAnonymousActivityEvent failure behavior
// ===========================================================================
async function runAsyncChecks() {
  console.log("\n=== S. network failure safely drops ===");
  {
    let fetchCalls = 0;
    const failingFetch = (async () => {
      fetchCalls += 1;
      throw new TypeError("Failed to fetch");
    }) as unknown as typeof fetch;

    let threw = false;
    try {
      await sendAnonymousActivityEvent(
        { eventName: "cta_click" },
        { sessionId: "s1", fetchImpl: failingFetch, backendUrl: "https://example.invalid" }
      );
    } catch {
      threw = true;
    }
    check("S1: sendAnonymousActivityEvent never throws on a network failure", !threw);
    check("S2: fetch was actually attempted once", fetchCalls === 1);
  }

  console.log("\n=== T. timeout safely drops ===");
  {
    let aborted = false;
    const hangingFetch = ((_url: string, init?: RequestInit) => {
      return new Promise((_resolve, reject) => {
        init?.signal?.addEventListener("abort", () => {
          aborted = true;
          reject(new DOMException("Aborted", "AbortError"));
        });
      });
    }) as unknown as typeof fetch;

    let threw = false;
    try {
      await sendAnonymousActivityEvent(
        { eventName: "cta_click" },
        { sessionId: "s1", fetchImpl: hangingFetch, backendUrl: "https://example.invalid", timeoutMs: 30 }
      );
    } catch {
      threw = true;
    }
    check("T1: sendAnonymousActivityEvent never throws when the request times out", !threw);
    check("T2: the request was actually aborted via the timeout", aborted);
  }

  console.log("\n=== U. non-2xx response safely drops ===");
  {
    let fetchCalls = 0;
    const errorFetch = (async () => {
      fetchCalls += 1;
      return new Response(JSON.stringify({ error: "invalid_field", field: "session_id" }), { status: 400 });
    }) as unknown as typeof fetch;

    let threw = false;
    try {
      await sendAnonymousActivityEvent(
        { eventName: "cta_click" },
        { sessionId: "s1", fetchImpl: errorFetch, backendUrl: "https://example.invalid" }
      );
    } catch {
      threw = true;
    }
    check("U1: sendAnonymousActivityEvent never throws on a 400/413/429/503 response", !threw);
    check("U2: fetch was actually attempted once", fetchCalls === 1);
  }

  console.log("\n=== V. no retry behavior ===");
  {
    let fetchCalls = 0;
    const failingFetch = (async () => {
      fetchCalls += 1;
      throw new TypeError("Failed to fetch");
    }) as unknown as typeof fetch;

    await sendAnonymousActivityEvent(
      { eventName: "cta_click" },
      { sessionId: "s1", fetchImpl: failingFetch, backendUrl: "https://example.invalid" }
    );
    check("V1: exactly one fetch attempt, no retry after failure", fetchCalls === 1);
  }

  console.log("\n=== O(no-session). session unavailable -> fetch never attempted ===");
  {
    let fetchCalls = 0;
    const spyFetch = (async () => {
      fetchCalls += 1;
      return new Response("{}", { status: 201 });
    }) as unknown as typeof fetch;

    await sendAnonymousActivityEvent(
      { eventName: "cta_click" },
      { sessionId: null, fetchImpl: spyFetch, backendUrl: "https://example.invalid" }
    );
    check("O9: no session_id -> fetch is never even attempted", fetchCalls === 0);
  }

  console.log("\n=== O(success). well-formed request actually sends the right body ===");
  {
    // Captured via an object property (not a bare `let`) -- TypeScript's
    // control-flow narrowing does not track a reassignment made inside
    // a closure that runs after this point in program order, so a bare
    // `let` here narrows incorrectly; a property on a stable object
    // sidesteps that.
    const captured: { url: string | null; body: Record<string, unknown> | null } = { url: null, body: null };
    const spyFetch = (async (url: string, init?: RequestInit) => {
      captured.url = url;
      captured.body = init?.body ? JSON.parse(init.body as string) : null;
      return new Response(JSON.stringify({ status: "written", event_id: "11111111-1111-1111-1111-111111111111" }), { status: 201 });
    }) as unknown as typeof fetch;

    await sendAnonymousActivityEvent(
      { eventName: "feature_used", properties: { feature_name: "kundali_generate" } },
      { sessionId: "s-final", fetchImpl: spyFetch, backendUrl: "https://api.example.invalid" }
    );

    check("O10: request hits the exact anonymous endpoint path", captured.url === "https://api.example.invalid/api/activity-events/anonymous");
    check("O11: sent body has the correct event_name", captured.body?.event_name === "feature_used");
    check("O12: sent body has the correct session_id", captured.body?.session_id === "s-final");
    check("O13: sent body has no forbidden keys", captured.body !== null && ["platform", "environment", "firebase_uid"].every((k) => !(k in captured.body!)));
  }

  console.log("\n=== W. no product event emitted during initialization ===");
  {
    // WebsiteAnalyticsInit.tsx (documented, verified by direct source
    // inspection -- this repo has no component-rendering test harness,
    // same limitation Task 2A.1 already documented) calls ONLY
    // getOrCreateAnalyticsSessionId and getOrCreateAttribution -- never
    // sendAnonymousActivityEvent or any other event-emitting function.
    // Enforced here at the module level instead: neither
    // analyticsSession.ts nor analyticsAttribution.ts imports
    // anonymousActivityEventClient.ts (a real network-call capability),
    // so a session/attribution initialization can structurally never
    // itself fire a network request.
    const sessionModule = await import("./analyticsSession");
    const attributionModule = await import("./analyticsAttribution");
    check("W1: analyticsSession module exports no send/track/emit function", Object.keys(sessionModule).every((k) => !/send|track|emit|fetch/i.test(k)));
    check("W2: analyticsAttribution module exports no send/track/emit function", Object.keys(attributionModule).every((k) => !/send|track|emit|fetch/i.test(k)));
  }

  console.log("\n==================================================");
  console.log(`RESULT: ${passed} passed, ${failed} failed`);
  console.log("==================================================");
  if (failed > 0) process.exit(1);
}

runAsyncChecks();
