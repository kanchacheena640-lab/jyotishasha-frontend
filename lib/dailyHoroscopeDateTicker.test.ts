/**
 * lib/dailyHoroscopeDateTicker.test.ts
 *
 * Keyword 01 "Aaj Ka Rashifal" regression guards:
 *   1. Daily horoscope date: one IST source (lib/istDate.ts) for the page date,
 *      a per-IST-day cache key for the backend fetches, a short-lived retry
 *      when the backend's `date` is not today's IST date, and a per-request
 *      (force-dynamic) sign route -- for all 12 signs,
 *      EN and HI, including the 00:00-05:30 IST window where UTC is still
 *      yesterday.
 *   2. Homepage "एस्ट्रो अपडेट्स" ticker: never renders "undefined"; uses the
 *      panchang API's real fields (`name` localized, `name_en`).
 *   3. Hindi sign pages show "शुभ रंग" / "शुभ अंक"; English is unchanged.
 *
 * Standalone, repo convention (no test runner dependency). The sibling
 * tsconfig adds the `@/` path alias, JSX and Next's fetch types:
 *   npx tsc -p lib/dailyHoroscopeDateTicker.tsconfig.json
 *   node .ts-test-out/lib/dailyHoroscopeDateTicker.test.js
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-require-imports */
import * as fs from "fs";
import * as path from "path";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Module = require("module");

// Map the app's "@/..." alias onto the compiled output tree.
const outRoot = path.resolve(__dirname, "..");
let repoRoot = __dirname;
while (!fs.existsSync(path.join(repoRoot, "package.json")) && path.dirname(repoRoot) !== repoRoot) repoRoot = path.dirname(repoRoot);
const origResolve = (Module as any)._resolveFilename;
(Module as any)._resolveFilename = function (request: string, ...rest: any[]) {
  if (request.startsWith("@/")) request = path.join(outRoot, request.slice(2));
  return origResolve.call(this, request, ...rest);
};

process.env.NEXT_PUBLIC_BACKEND_URL = "https://backend.test";

import { expectedBackendHoroscopeDate, formatIstLongDate, istDateKey } from "./istDate";
import { choghadiyaSlotName, choghadiyaTickerMessage, isShubhSlot } from "./homeTicker";
import { getDailyHoroscope } from "./getDailyHoroscope";
import { getDailySummary } from "./getDailySummary";
import Block from "../components/DailyHoroscopeBlock";
import { createRequestNow, getRequestNow } from "./requestNow";

let passed = 0;
let failed = 0;
const failures: string[] = [];
function check(label: string, ok: boolean): void {
  if (ok) { passed++; }
  else { failed++; failures.push(label); console.log(`  FAIL: ${label}`); }
}
function section(title: string): void {
  console.log(`\n=== ${title} ===`);
}

const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];

// 2026-11-20T18:40Z = 21 Nov 00:10 IST (UTC still says 20 Nov)
const IST_AFTER_MIDNIGHT = new Date("2026-11-20T18:40:00Z");
// 2026-11-20T18:29Z = 20 Nov 23:59 IST
const IST_BEFORE_MIDNIGHT = new Date("2026-11-20T18:29:00Z");
// 2026-12-31T18:45Z = 1 Jan 2027 00:15 IST
const IST_NEW_YEAR = new Date("2026-12-31T18:45:00Z");

async function main(): Promise<void> {
  section("1a. IST date helpers (independent of the server's timezone)");
  check("istDateKey: 00:10 IST is the new IST day", istDateKey(IST_AFTER_MIDNIGHT) === "2026-11-21");
  check("istDateKey: 23:59 IST is still the old IST day", istDateKey(IST_BEFORE_MIDNIGHT) === "2026-11-20");
  check("istDateKey: New Year boundary", istDateKey(IST_NEW_YEAR) === "2027-01-01");
  check("formatIstLongDate hi: 21 नवंबर 2026 at 00:10 IST", formatIstLongDate("hi", IST_AFTER_MIDNIGHT).includes("21 नवंबर 2026"));
  check("formatIstLongDate en: 21 November 2026 at 00:10 IST", formatIstLongDate("en", IST_AFTER_MIDNIGHT).includes("21 November 2026"));
  check("formatIstLongDate hi weekday is शनिवार (21 Nov 2026)", formatIstLongDate("hi", IST_AFTER_MIDNIGHT).startsWith("शनिवार"));
  check("expected backend date hi", expectedBackendHoroscopeDate("hi", IST_AFTER_MIDNIGHT) === "21 नवंबर 2026");
  check("expected backend date en", expectedBackendHoroscopeDate("en", IST_AFTER_MIDNIGHT) === "21 November 2026");
  check("expected backend date en zero-pads like strftime %d", expectedBackendHoroscopeDate("en", IST_NEW_YEAR) === "01 January 2027");
  check("expected backend date hi does not pad", expectedBackendHoroscopeDate("hi", IST_NEW_YEAR) === "1 जनवरी 2027");

  section("1b. getDailyHoroscope: per-IST-day cache key + short-lived retry, all 12 signs, EN and HI");
  const realFetch = (globalThis as any).fetch;
  const RealDate = Date;
  const calls: { url: string; init: any }[] = [];
  let backendDate: (lang: string) => string = () => "";
  (globalThis as any).fetch = async (url: string, init: any) => {
    calls.push({ url, init });
    const lang = new URL(url).searchParams.get("lang") || "en";
    const sign = new URL(url).searchParams.get("sign") || "";
    const date = backendDate(lang);
    return {
      ok: true,
      json: async () => ({
        date, heading: `heading ${sign} – ${date}`, intro: "i", paragraph: "p",
        lucky_color: "Red", lucky_number: "7", tips: "t", sign, lang,
      }),
    };
  };
  // Freeze "now" at 00:10 IST (UTC still 20 Nov), so `new Date()` inside the module sees it.
  (globalThis as any).Date = class extends RealDate {
    constructor(...args: any[]) {
      // @ts-expect-error -- forwarding Date's overloaded constructor arguments
      super(...(args.length ? args : [IST_AFTER_MIDNIGHT.getTime()]));
    }
    static now() { return IST_AFTER_MIDNIGHT.getTime(); }
  };
  try {
    for (const lang of ["hi", "en"]) {
      for (const sign of SIGNS) {
        // backend agrees with IST today -> exactly one cached fetch
        calls.length = 0;
        backendDate = (l) => expectedBackendHoroscopeDate(l, IST_AFTER_MIDNIGHT);
        const r = await getDailyHoroscope(sign, lang);
        const u = new URL(calls[0]?.url || "https://x");
        check(`${lang}/${sign}: cache key carries the IST day`, u.searchParams.get("date") === "2026-11-21");
        check(`${lang}/${sign}: one fetch, cached 30 min`, calls.length === 1 && calls[0].init?.next?.revalidate === 1800);
        check(`${lang}/${sign}: heading date == page date`, !!r && r.heading.endsWith(expectedBackendHoroscopeDate(lang, IST_AFTER_MIDNIGHT))
          && formatIstLongDate(lang, IST_AFTER_MIDNIGHT).includes(expectedBackendHoroscopeDate(lang, IST_AFTER_MIDNIGHT).replace(/^0/, "")));

        // a stale/previous-day response -> one retry under a short-lived key, fresh one wins
        calls.length = 0;
        let n = 0;
        backendDate = (l) => (n++ === 0 ? expectedBackendHoroscopeDate(l, IST_BEFORE_MIDNIGHT) : expectedBackendHoroscopeDate(l, IST_AFTER_MIDNIGHT));
        const r2 = await getDailyHoroscope(sign, lang);
        check(`${lang}/${sign}: stale day -> retried once under a short-lived key`,
          calls.length === 2 && new URL(calls[1].url).searchParams.get("t") === String(Math.floor(IST_AFTER_MIDNIGHT.getTime() / 60000))
          && calls[1].init?.next?.revalidate === 60);
        check(`${lang}/${sign}: retry never uses no-store (ISR-safe in Next 14.2)`, calls.every((c) => c.init?.cache !== "no-store"));
        check(`${lang}/${sign}: retried result is today`, !!r2 && r2.date === expectedBackendHoroscopeDate(lang, IST_AFTER_MIDNIGHT));
      }
    }

    section("1c. getDailySummary: per-IST-day cache key");
    calls.length = 0;
    backendDate = () => "";
    await getDailySummary("hi");
    check("summary URL carries the IST day", new URL(calls[0]?.url || "https://x").searchParams.get("date") === "2026-11-21");
    check("summary keeps lang", new URL(calls[0]?.url || "https://x").searchParams.get("lang") === "hi");

    section("1e. Edge cases: stale first response is never returned; one IST-day snapshot");
    // Scripted backend: each call takes the next step; a step is a date string,
    // "http-500" (non-ok response) or "throw" (network error). `advanceClockTo`
    // moves the global clock while the fetch is "in flight".
    let steps: string[] = [];
    let advanceClockTo: Date | null = null;
    let clock = IST_AFTER_MIDNIGHT.getTime();
    (globalThis as any).Date = class extends RealDate {
      constructor(...args: any[]) {
        // @ts-expect-error -- forwarding Date's overloaded constructor arguments
        super(...(args.length ? args : [clock]));
      }
      static now() { return clock; }
    };
    (globalThis as any).fetch = async (url: string, init: any) => {
      calls.push({ url, init });
      if (advanceClockTo) clock = advanceClockTo.getTime();
      const step = steps.shift() ?? "throw";
      if (step === "throw") throw new Error("network down");
      if (step === "http-500") return { ok: false, json: async () => ({}) };
      return {
        ok: true,
        json: async () => ({ date: step, heading: `h – ${step}`, intro: "i", paragraph: "p",
          lucky_color: "Red", lucky_number: "7", tips: "t", sign: "x", lang: "x" }),
      };
    };
    for (const lang of ["hi", "en"]) {
      const today = expectedBackendHoroscopeDate(lang, IST_AFTER_MIDNIGHT);       // 21 Nov
      const yesterday = expectedBackendHoroscopeDate(lang, IST_BEFORE_MIDNIGHT);  // 20 Nov
      for (const sign of SIGNS) {
        // retry fails (HTTP error) -> null, never the stale first response
        calls.length = 0; clock = IST_AFTER_MIDNIGHT.getTime(); advanceClockTo = null;
        steps = [yesterday, "http-500"];
        const a = await getDailyHoroscope(sign, lang, IST_AFTER_MIDNIGHT);
        check(`${lang}/${sign}: retry HTTP failure -> null (stale not returned)`, a === null && calls.length === 2);

        // retry fails (network throw) -> null
        calls.length = 0;
        steps = [yesterday, "throw"];
        const b = await getDailyHoroscope(sign, lang, IST_AFTER_MIDNIGHT);
        check(`${lang}/${sign}: retry network failure -> null (stale not returned)`, b === null && calls.length === 2);

        // retry still stale -> null
        calls.length = 0;
        steps = [yesterday, yesterday];
        const c = await getDailyHoroscope(sign, lang, IST_AFTER_MIDNIGHT);
        check(`${lang}/${sign}: retry still stale -> null`, c === null && calls.length === 2);

        // request starts 23:59 IST (snapshot 20 Nov), completes after midnight with
        // the backend already on 21 Nov -> never paired with the 20 Nov page date
        calls.length = 0; clock = IST_BEFORE_MIDNIGHT.getTime(); advanceClockTo = IST_AFTER_MIDNIGHT;
        const snapshot = new Date(IST_BEFORE_MIDNIGHT.getTime());
        steps = [today, today];
        const d = await getDailyHoroscope(sign, lang, snapshot);
        const shownDate = formatIstLongDate(lang, snapshot);
        check(`${lang}/${sign}: crossed midnight, backend on new day -> null (no mismatch)`, d === null);
        check(`${lang}/${sign}: cache key stays on the snapshot's day`,
          calls.every((x) => new URL(x.url).searchParams.get("date") === "2026-11-20"));
        check(`${lang}/${sign}: page date stays on the snapshot's day although the clock moved`,
          shownDate.includes(lang === "hi" ? "20 नवंबर 2026" : "20 November 2026") && istDateKey() === "2026-11-21");

        // same crossing, backend still answers for the snapshot's day -> accepted, consistent
        calls.length = 0; clock = IST_BEFORE_MIDNIGHT.getTime(); advanceClockTo = IST_AFTER_MIDNIGHT;
        steps = [yesterday];
        const e = await getDailyHoroscope(sign, lang, new Date(IST_BEFORE_MIDNIGHT.getTime()));
        check(`${lang}/${sign}: crossed midnight, backend on snapshot day -> returned, heading matches page date`,
          !!e && e.date === yesterday && e.heading.endsWith(yesterday) && calls.length === 1);

        // crossing where the first answer is the new day but the retry is the snapshot day -> retry wins
        calls.length = 0; clock = IST_BEFORE_MIDNIGHT.getTime(); advanceClockTo = IST_AFTER_MIDNIGHT;
        steps = [today, yesterday];
        const f = await getDailyHoroscope(sign, lang, new Date(IST_BEFORE_MIDNIGHT.getTime()));
        check(`${lang}/${sign}: retry matching the snapshot day is returned`, !!f && f.date === yesterday && calls.length === 2);
      }
    }
    advanceClockTo = null;

    section("1f. generateMetadata and page body share ONE per-request snapshot (React cache)");
    // A request-scoped memo, standing in for React's cache() inside one RSC render.
    const requestScopedCache = (<T extends (...args: never[]) => unknown>(fn: T): T => {
      let done = false;
      let value: unknown;
      return ((...args: never[]) => (done ? value : ((done = true), (value = fn(...args))))) as T;
    });
    const JUST_BEFORE = new Date("2026-11-20T18:29:59.999Z"); // 20 Nov 23:59:59.999 IST
    const JUST_AFTER = new Date("2026-11-20T18:30:00.001Z");  // 21 Nov 00:00:00.001 IST
    for (const lang of ["hi", "en"]) {
      // one request: metadata reads first (before midnight), body reads after midnight
      const requestNow = createRequestNow(requestScopedCache);
      clock = JUST_BEFORE.getTime();
      const titleDate = formatIstLongDate(lang, requestNow());   // generateMetadata
      clock = JUST_AFTER.getTime();
      const bodyDate = formatIstLongDate(lang, requestNow());    // page body
      check(`${lang}: title and body dates identical across IST midnight`, titleDate === bodyDate);
      check(`${lang}: both on the snapshot's day (20 Nov)`, titleDate.includes(lang === "hi" ? "20 नवंबर 2026" : "20 November 2026"));
      check(`${lang}: body fetch keyed to the same day`, istDateKey(requestNow()) === "2026-11-20");

      // without a request cache (old behaviour) the same straddle does mismatch
      const unshared = createRequestNow(undefined);
      clock = JUST_BEFORE.getTime();
      const t2 = formatIstLongDate(lang, unshared());
      clock = JUST_AFTER.getTime();
      const b2 = formatIstLongDate(lang, unshared());
      check(`${lang}: control -- unshared clocks DO diverge (the race being fixed)`, t2 !== b2);

      // a new request gets a fresh snapshot (nothing leaks across requests)
      const nextRequest = createRequestNow(requestScopedCache);
      clock = JUST_AFTER.getTime();
      check(`${lang}: next request sees the new day`, istDateKey(nextRequest()) === "2026-11-21");
    }
    // the real React used by Next's server components provides cache()
    const reactServer = require(path.join(repoRoot, "node_modules/next/dist/compiled/react/cjs/react.react-server.production.js"));
    check("Next 14.2 react-server build exports cache()", typeof reactServer.cache === "function");
    check("getRequestNow() returns a Date (plain-React fallback in this test runtime)", getRequestNow() instanceof RealDate);
  } finally {
    (globalThis as any).fetch = realFetch;
    (globalThis as any).Date = RealDate;
  }

  section("1d. Sign route renders per request (page date, <title>, schema never stale)");
  const pageSrc = fs.readFileSync(path.join(repoRoot, "app/[locale]/daily-horoscope/[sign]/page.tsx"), "utf8");
  check("route exports dynamic = force-dynamic", /export const dynamic = "force-dynamic";/.test(pageSrc));
  check("route has no conflicting revalidate export", !/export const revalidate\s*=/.test(pageSrc));
  check("page date uses the IST helper (2 places: metadata + body)", (pageSrc.match(/formatIstLongDate\(/g) || []).length === 2);
  check("no server-clock toLocaleDateString left on the route", !/toLocaleDateString\(/.test(pageSrc));
  check("body: one per-request snapshot taken before the fetch",
    /const now = getRequestNow\(\);\s*\n\s*const horoscope = await getDailyHoroscope\(sign, locale, now\)/.test(pageSrc));
  check("body: displayed date uses the same snapshot", /const today = formatIstLongDate\(locale, now\);/.test(pageSrc));
  check("metadata: title date uses the same per-request snapshot",
    /const today = formatIstLongDate\(params\.locale, getRequestNow\(\)\);/.test(pageSrc));
  check("route takes no other clock reading for dates", !/new Date\(\)/.test(pageSrc.replace(/toISTDatePublished\(\)/g, "")));

  section("2. Homepage ticker never renders undefined");
  // Exact shape returned live by /api/panchang (language "hi"): name + name_en, no name_hi.
  const liveHi = { end: "20:45", name: "रोग", name_en: "Rog", nature: "अशुभ", nature_en: "ashubh", start: "19:05" };
  const liveEn = { end: "20:45", name: "Rog", name_en: "Rog", nature: "ashubh", nature_en: "ashubh", start: "19:05" };
  check("hi name from `name` (no name_hi)", choghadiyaSlotName(liveHi, "hi") === "रोग");
  check("en name unchanged (name_en)", choghadiyaSlotName(liveEn, "en") === "Rog");
  check("name_hi still preferred if a future API sends it", choghadiyaSlotName({ ...liveHi, name_hi: "रोग*" }, "hi") === "रोग*");
  check("hi message", choghadiyaTickerMessage(liveHi, "hi", "शुभ", "महत्वपूर्ण कार्यों से बचें") === "🔴 रोग (19:05–20:45) – महत्वपूर्ण कार्यों से बचें");
  check("en message unchanged", choghadiyaTickerMessage(liveEn, "en", "Good time", "Avoid important work") === "🔴 Rog (19:05–20:45) – Avoid important work");
  check("shubh detected from nature_en", isShubhSlot({ ...liveHi, nature: "शुभ", nature_en: "shubh" }));
  check("shubh detected from Hindi nature alone", isShubhSlot({ nature: "शुभ" }));
  for (const [label, slot] of [
    ["no name fields", { start: "19:05", end: "20:45", nature_en: "ashubh" }],
    ["missing start", { ...liveHi, start: undefined }],
    ["missing end", { ...liveHi, end: undefined }],
    ["non-string name", { ...liveHi, name: 5, name_en: null }],
    ["null slot", null],
  ] as [string, any][]) {
    const msg = choghadiyaTickerMessage(slot, "hi", "x", "y");
    check(`hidden (empty) for ${label}`, msg === "" && !msg.includes("undefined"));
  }
  check("hidden when dictionary text missing", choghadiyaTickerMessage(liveHi, "hi", undefined, undefined) === "");

  section("3. Lucky labels: Hindi on /hi, English unchanged");
  const React = require("react");
  const { renderToStaticMarkup } = require("react-dom/server");
  const data = { date: "d", heading: "h", intro: "i", paragraph: "p", lucky_color: "लाल", lucky_number: "7", tips: "t", sign: "leo", lang: "hi" };
  const hiHtml = renderToStaticMarkup(React.createElement(Block, { data, lang: "hi" }));
  const enHtml = renderToStaticMarkup(React.createElement(Block, { data, lang: "en" }));
  const noLangHtml = renderToStaticMarkup(React.createElement(Block, { data }));
  check("hi: शुभ रंग", hiHtml.includes("🎨 शुभ रंग: लाल"));
  check("hi: शुभ अंक", hiHtml.includes("🔢 शुभ अंक: 7"));
  check("hi: no English labels", !hiHtml.includes("Lucky Color") && !hiHtml.includes("Lucky Number"));
  check("en: Lucky Color unchanged", enHtml.includes("🎨 Lucky Color: लाल"));
  check("en: Lucky Number unchanged", enHtml.includes("🔢 Lucky Number: 7"));
  check("no lang prop -> English (unchanged default)", noLangHtml === enHtml);

  console.log(`\nRESULT: ${passed} passed, ${failed} failed`);
  if (failed) {
    console.log("FAILURES:\n  " + failures.join("\n  "));
    process.exit(1);
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
