// lib/openaiPixel.test.ts

/**
 * Tests for lib/openaiPixel.ts (OpenAI Ads order_created) and its single hook
 * in lib/ecommerceMeasurement.ts::pushPurchaseOnce.
 *
 * Standalone check()/pass-fail-counter convention (no test runner). Run
 * from the repo root:
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/openaiPixel.test.ts
 *   node .ts-test-out/openaiPixel.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 */
import * as fs from "fs";
import * as path from "path";
import * as vm from "vm";
import {
  OPENAI_NEUTRAL_PRODUCT_IDS, OPENAI_ORDER_CREATED, OPENAI_PIXEL_SDK_URL, buildOpenAiOrderCreated, buildOpenAiPixelBootstrap,
  currencyMinorDigits, getEnabledOpenAiPixelId, getOpenAiPixelId,measureOpenAiOrderCreated, neutralProductId, setOpenAiConsent,
} from "./openaiPixel";
import {
  PURCHASE_MEASURED_KEY_PREFIX, parsePurchaseMeasurement, pushPurchaseOnce, resetMeasuredMemoryForTest,
  type PurchaseMeasurement,
} from "./ecommerceMeasurement";
import { isAdvertisingIdentifierStorageAllowed } from "./adAttribution";
import type { ConsentGeoPolicy } from "./geo";

let passed = 0;
let failed = 0;
function check(label: string, condition: boolean) {
  if (condition) { passed++; console.log(`  PASS: ${label}`); }
  else { failed++; console.log(`  FAIL: ${label}`); }
}
const read = (rel: string) => fs.readFileSync(path.join(process.cwd(), rel), "utf8");
const stripComments = (src: string) => src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");

const PIXEL = "ExhiM3d7TAK8ZB5dknSWZ1";
const base = (over: Partial<PurchaseMeasurement> = {}): PurchaseMeasurement => ({
  transaction_id: "ord_7001", value: 99, currency: "INR", item_id: "career_report", item_name: "Career Report",
  item_category: "career", product_family: "original_report", report_type: "standard",
  payment_provider: "RAZORPAY", source_platform: "web", ...over,
});
const FAMILIES: Array<[string, PurchaseMeasurement, number]> = [
  ["Rs99 base report", base(), 9900],
  ["Rs51 focused self", base({ transaction_id: "ord_7002", value: 51, item_id: "promotion_timing", item_name: "Promotion Report", product_family: "focused_report", report_type: "self" }), 5100],
  ["Rs51 focused dual", base({ transaction_id: "ord_7003", value: 51, item_id: "kundali_match_for_marriage", item_name: "Kundali Match", product_family: "focused_report", report_type: "dual" }), 5100],
  ["Rs199 relationship", base({ transaction_id: "ord_7004", value: 199, item_id: "relationship_future_report", item_name: "Relationship Future Report", report_type: "relationship" }), 19900],
];

class FakeDataLayer {
  entries: any[] = [];
  push(v: unknown) { this.entries.push(v); return this.entries.length; }
  events(name: string) { return this.entries.filter((e) => e && e.event === name); }
}
class FakeStorage {
  data: Record<string, string> = {};
  getItem(k: string) { return k in this.data ? this.data[k] : null; }
  setItem(k: string, v: string) { this.data[k] = String(v); }
  removeItem(k: string) { delete this.data[k]; }
}
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
/** dataLayer entries without functions, for byte-level comparison. */
const plain = (entries: any[]) => JSON.stringify(entries, (_k, v) => (typeof v === "function" ? undefined : v));

async function main() {
  console.log("\n=== 1. configuration ===");
  check("1a: the configured Pixel ID is accepted", getOpenAiPixelId(PIXEL) === PIXEL);
  check("1b: unset / empty Pixel ID -> Pixel not loaded", getOpenAiPixelId(undefined) === null && getOpenAiPixelId("  ") === null);
  check("1c: a Pixel ID that could break out of the inline script is refused",
    getOpenAiPixelId('x"});alert(1)//') === null && getOpenAiPixelId("abc def ghi") === null);
  let threw = false;
  try { buildOpenAiPixelBootstrap("</script><script>"); } catch { threw = true; }
  check("1d: the bootstrap builder refuses an invalid Pixel ID", threw);
  check("1e: release gate -- disabled by default (ID set, flag unset/empty)",
    getEnabledOpenAiPixelId(PIXEL, undefined) === null && getEnabledOpenAiPixelId(PIXEL, "") === null);
  check("1f: release gate -- only the exact value \"true\" enables",
    ["false", "0", "1", "yes", "TRUE", "True", "on"].every((v) => getEnabledOpenAiPixelId(PIXEL, v) === null));
  check("1g: release gate -- flag true + valid ID loads; flag true + missing/invalid ID does not",
    getEnabledOpenAiPixelId(PIXEL, "true") === PIXEL && getEnabledOpenAiPixelId(PIXEL, " true ") === PIXEL
    && getEnabledOpenAiPixelId(undefined, "true") === null && getEnabledOpenAiPixelId('x"});', "true") === null);
  const savedEnv = { id: process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID, on: process.env.NEXT_PUBLIC_OPENAI_PIXEL_ENABLED };
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID = PIXEL;
  delete process.env.NEXT_PUBLIC_OPENAI_PIXEL_ENABLED;
  check("1h: release gate reads the environment -- ID alone does not load the Pixel", getEnabledOpenAiPixelId() === null);
  process.env.NEXT_PUBLIC_OPENAI_PIXEL_ENABLED = "true";
  check("1i: release gate reads the environment -- ID + ENABLED=true loads it", getEnabledOpenAiPixelId() === PIXEL);
  if (savedEnv.id === undefined) delete process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID; else process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID = savedEnv.id;
  if (savedEnv.on === undefined) delete process.env.NEXT_PUBLIC_OPENAI_PIXEL_ENABLED; else process.env.NEXT_PUBLIC_OPENAI_PIXEL_ENABLED = savedEnv.on;

  console.log("\n=== 2. documented order_created payload ===");
  for (const [label, m, minor] of FAMILIES) {
    const e = buildOpenAiOrderCreated(m)!;
    check(`2a: ${label} -> amount ${minor} (integer minor units), INR, event_id = transaction_id`,
      e.data.type === "contents" && e.data.amount === minor && Number.isInteger(e.data.amount) && e.data.currency === "INR" && e.options.event_id === m.transaction_id);
  }
  const e = buildOpenAiOrderCreated(base())!;
  check("2b: only documented fields are sent (data: type/amount/currency/contents; options: event_id)",
    JSON.stringify(Object.keys(e.data).sort()) === JSON.stringify(["amount", "contents", "currency", "type"]) &&
    JSON.stringify(Object.keys(e.options)) === JSON.stringify(["event_id"]));
  check("2c: contents[] carries only documented fields and a neutral id (no name)",
    JSON.stringify(e.data.contents) === JSON.stringify([{ id: "original_report", content_type: "product", quantity: 1 }]));
  check("2d: neutral ids -- focused -> focused_report, base and relationship -> original_report, anything else -> report",
    buildOpenAiOrderCreated(FAMILIES[1][1])!.data.contents[0].id === "focused_report" &&
    buildOpenAiOrderCreated(FAMILIES[2][1])!.data.contents[0].id === "focused_report" &&
    buildOpenAiOrderCreated(FAMILIES[3][1])!.data.contents[0].id === "original_report" &&
    neutralProductId("something_new") === "report" && neutralProductId(undefined) === "report" &&
    [...OPENAI_NEUTRAL_PRODUCT_IDS].join() === "focused_report,original_report,report");
  check("2e: zero-decimal currency uses its own minor unit (JPY 500 -> 500)", currencyMinorDigits("JPY") === 0 && buildOpenAiOrderCreated(base({ currency: "JPY", value: 500 }))!.data.amount === 500);
  check("2f: fractional rupees round to whole paise (99.5 -> 9950)", buildOpenAiOrderCreated(base({ value: 99.5 }))!.data.amount === 9950);
  check("2g: invalid inputs produce no event",
    [base({ value: 0 }), base({ value: -1 }), base({ value: NaN }), base({ currency: "inr" }), base({ transaction_id: "" })]
      .every((m) => buildOpenAiOrderCreated(m) === null));
  const parsed = parsePurchaseMeasurement({ ...base(), email: "a@b.com", phone: "9999999999", name: "Asha", dob: "1994-01-26", pob: "Delhi", razorpay_payment_id: "pay_1", gclid: "G1" })!;
  const blob = JSON.stringify(buildOpenAiOrderCreated(parsed));
  check("2h: no personal or birth data can reach OpenAI (extras dropped by the existing allowlist)",
    !/a@b\.com|9999999999|Asha|1994-01-26|Delhi|pay_1|G1|email|phone|dob|gclid|user/.test(blob));
  const SENSITIVE: Array<[string, string, string, string]> = [
    ["mood_mental_health_report", "Mood & Mental Health Report", "health", "standard"],
    ["divorce_possibility_report", "Divorce Possibility Report", "marriage", "standard"],
    ["legal_disputes_report", "Legal Disputes Report", "legal", "standard"],
    ["problem_in_marriage_report", "Problem in Marriage Report", "marriage", "standard"],
    ["love_disappointment_report", "Love Disappointment Report", "love", "standard"],
    ["delay_in_marriage_report", "Delay in Marriage Report", "marriage", "standard"],
    ["second_marriage_report", "Second Marriage Report", "marriage", "standard"],
    ["children_parenting_report", "Children Parenting Report", "family", "standard"],
    ["debt_pressure_easing", "Debt Pressure", "money_business", "self"],
    ["conflict_areas", "Understanding Conflict", "relationship", "dual"],
  ];
  check("2i: no report slug, title, category or report_type ever reaches OpenAI -- only a neutral product id",
    SENSITIVE.every(([slug, title, category, reportType]) => {
      const fam = reportType === "standard" ? "original_report" : "focused_report";
      const out = JSON.stringify(buildOpenAiOrderCreated(base({ item_id: slug, item_name: title, item_category: category, report_type: reportType, product_family: fam })));
      return !out.includes(slug) && !out.includes(title) && !out.includes(`"${category}"`) && !out.includes(`"${reportType}"`) &&
        !/"name"/.test(out) && out.includes(`"id":"${fam}"`);
    }));

  console.log("\n=== 3. measure call ===");
  const calls: unknown[][] = [];
  const oaiq = (...args: unknown[]) => { calls.push(args); };
  check("3a: verified purchase -> oaiq('measure', 'order_created', data, { event_id })",
    measureOpenAiOrderCreated(base(), oaiq) === true && calls.length === 1 && calls[0][0] === "measure" && calls[0][1] === OPENAI_ORDER_CREATED &&
    (calls[0][3] as any).event_id === "ord_7001" && (calls[0][2] as any).amount === 9900);
  check("3b: Pixel not loaded -> no call, no throw", measureOpenAiOrderCreated(base(), null) === false);
  check("3c: a throwing Pixel never throws into product code", measureOpenAiOrderCreated(base(), () => { throw new Error("boom"); }) === false);
  const consentCalls: unknown[][] = [];
  setOpenAiConsent(true, (...a: unknown[]) => { consentCalls.push(a); });
  setOpenAiConsent(false, (...a: unknown[]) => { consentCalls.push(a); });
  setOpenAiConsent(true, () => { throw new Error("boom"); });
  check("3d: consent updates send oaiq('consent', bool) and never throw",
    JSON.stringify(consentCalls) === JSON.stringify([["consent", true], ["consent", false]]));

  console.log("\n=== 4. only verified purchases, once per transaction (real pushPurchaseOnce) ===");
  resetMeasuredMemoryForTest();
  for (const [label, m] of FAMILIES) {
    const sent: PurchaseMeasurement[] = [];
    const ok = pushPurchaseOnce(m, { storage: new FakeStorage(), dataLayer: new FakeDataLayer(), openAiMeasure: (x) => sent.push(x) });
    check(`4a: ${label} (verified) -> exactly one OpenAI order_created`, ok === true && sent.length === 1 && sent[0].transaction_id === m.transaction_id);
  }
  resetMeasuredMemoryForTest();
  for (const [label, raw] of [["no measurement (unpaid / Razorpay order only / failed / cancelled)", undefined], ["null", null],
                              ["malformed", { transaction_id: "x" }], ["zero value", { ...base(), value: 0 }]] as Array<[string, unknown]>) {
    let n = 0; let done = 0;
    pushPurchaseOnce(raw, { storage: new FakeStorage(), dataLayer: new FakeDataLayer(), openAiMeasure: () => { n++; }, onDone: () => { done++; } });
    check(`4b: ${label} -> zero OpenAI conversions, navigation still released once`, n === 0 && done === 1);
  }
  resetMeasuredMemoryForTest();
  {
    const storage = new FakeStorage(); const dl = new FakeDataLayer(); let n = 0;
    // Same shape as the real checkout: GTM loaded + a navigation callback.
    const opts = { storage, dataLayer: dl, waitForTags: true, onDone: () => undefined, openAiMeasure: () => { n++; } };
    pushPurchaseOnce(base({ transaction_id: "ord_7100" }), opts);
    pushPurchaseOnce(base({ transaction_id: "ord_7100" }), opts); // duplicate Razorpay callback / re-render
    check("4c: duplicate callback in the same page -> still one conversion", n === 1);
    dl.entries[1].eventCallback(); // GTM consumed the event -> persistent marker stays
    resetMeasuredMemoryForTest(); // refresh / revisit: fresh memory, same localStorage
    pushPurchaseOnce(base({ transaction_id: "ord_7100" }), { ...opts, dataLayer: new FakeDataLayer() });
    check("4d: refresh / revisit of the success flow -> no duplicate conversion", n === 1 && (PURCHASE_MEASURED_KEY_PREFIX + "ord_7100") in storage.data);
    await sleep(10);
  }

  console.log("\n=== 5. existing GA4 / Meta (GTM dataLayer) behaviour unchanged ===");
  resetMeasuredMemoryForTest();
  const dlWith = new FakeDataLayer(); const dlWithout = new FakeDataLayer();
  pushPurchaseOnce(base({ transaction_id: "ord_7200" }), { storage: new FakeStorage(), dataLayer: dlWith, openAiMeasure: () => undefined });
  resetMeasuredMemoryForTest();
  pushPurchaseOnce(base({ transaction_id: "ord_7200" }), { storage: new FakeStorage(), dataLayer: dlWithout });
  check("5a: identical dataLayer output (GA4 purchase, which GTM also feeds to Meta) with and without OpenAI", plain(dlWith.entries) === plain(dlWithout.entries) && dlWith.events("purchase").length === 1);
  resetMeasuredMemoryForTest();
  {
    const dl = new FakeDataLayer(); const storage = new FakeStorage(); let done = 0;
    const ok = pushPurchaseOnce(base({ transaction_id: "ord_7300" }), { storage, dataLayer: dl, waitForTags: false, onDone: () => { done++; }, openAiMeasure: () => { throw new Error("pixel broke"); } });
    check("5b: a failing OpenAI call never affects the GA4 push, dedupe or navigation", ok === true && dl.events("purchase").length === 1 && done === 1);
    check("5c: ...and the same transaction is still de-duplicated afterwards", pushPurchaseOnce(base({ transaction_id: "ord_7300" }), { storage, dataLayer: dl }) === false);
  }
  resetMeasuredMemoryForTest();
  {
    let n = 0; const throwingDl = { push: () => { throw new Error("hijacked"); } };
    pushPurchaseOnce(base({ transaction_id: "ord_7400" }), { storage: new FakeStorage(), dataLayer: throwingDl, openAiMeasure: () => { n++; } });
    check("5d: if the GA4 push itself fails, OpenAI is not sent either (no partial measurement)", n === 0);
  }

  console.log("\n=== 6. consent: bootstrap runs consent BEFORE init and mirrors isAdvertisingIdentifierStorageAllowed ===");
  const script = buildOpenAiPixelBootstrap(PIXEL);
  function runBootstrap(cookie: string, stored: unknown, preexistingOaiq = false) {
    const inserted: any[] = [];
    const firstScript = { parentNode: { insertBefore: (js: any) => { inserted.push(js); } } };
    const window: any = { localStorage: { getItem: (k: string) => (k === "jyotishasha_consent_v1" && stored !== undefined ? JSON.stringify(stored) : null) } };
    if (preexistingOaiq) { const q: any = function () { q.q.push(Array.from(arguments)); }; q.q = []; window.oaiq = q; }
    const document = { cookie, createElement: () => ({}), getElementsByTagName: () => [firstScript] };
    vm.runInNewContext(script, { window, document });
    const queue = (window.oaiq?.q ?? []).map((a: any) => Array.from(a));
    return { queue, inserted };
  }
  const POLICIES: ConsentGeoPolicy[] = ["NORMAL", "US_PRIVACY", "SAFE_FALLBACK", "EUROPE_CONSENT"];
  const STORED = [undefined, { version: 1, analytics: true, advertising: true, updatedAt: "x" }, { version: 1, analytics: true, advertising: false, updatedAt: "x" }];
  for (const policy of POLICIES) {
    for (const stored of STORED) {
      const { queue, inserted } = runBootstrap(`a=1; jyotishasha_geo_policy=${policy}; b=2`, stored);
      const expected = isAdvertisingIdentifierStorageAllowed(policy, policy === "EUROPE_CONSENT" || !stored ? null : (stored as any));
      const label = `${policy} / stored advertising=${stored ? (stored as any).advertising : "none"}`;
      check(`6a: ${label} -> consent ${expected}, set before init, official SDK loaded once`,
        queue.length === 2 && queue[0][0] === "consent" && queue[0][1] === expected &&
        queue[1][0] === "init" && queue[1][1].pixelId === PIXEL && !("user" in queue[1][1]) &&
        inserted.length === 1 && inserted[0].src === OPENAI_PIXEL_SDK_URL && inserted[0].async === true);
    }
  }
  check("6b: missing / unknown policy cookie is treated as SAFE_FALLBACK (false unless the visitor stored advertising:true)",
    runBootstrap("", undefined).queue[0][1] === false && runBootstrap("jyotishasha_geo_policy=BOGUS", undefined).queue[0][1] === false &&
    runBootstrap("jyotishasha_geo_policy=BOGUS", { version: 1, analytics: true, advertising: true }).queue[0][1] ===
      isAdvertisingIdentifierStorageAllowed("SAFE_FALLBACK", { version: 1, analytics: true, advertising: true, updatedAt: "x" }));
  check("6c: malformed stored consent is ignored (SAFE_FALLBACK stays false)",
    runBootstrap("jyotishasha_geo_policy=SAFE_FALLBACK", { version: 2, advertising: true }).queue[0][1] === false);
  const pre = runBootstrap("jyotishasha_geo_policy=NORMAL", undefined, true);
  check("6d: an already-present oaiq is not replaced (official guard); consent/init still queued", pre.inserted.length === 0 && pre.queue.length === 2);
  check("6e: no automatic advanced matching / user data in code", !/\buser\s*:/.test(script) && !/sha256/i.test(read("lib/openaiPixel.ts").replace(/\/\*[\s\S]*?\*\//g, "")));

  console.log("\n=== 7. structure: only verified purchases can reach OpenAI; nothing else changed ===");
  const sources: string[] = [];
  const walk = (dir: string) => {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
      if (["node_modules", ".next", ".ts-test-out", ".git"].includes(f.name)) continue;
      const p = path.join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else if (/\.(tsx?|jsx?)$/.test(f.name) && !/\.test\./.test(f.name)) sources.push(path.relative(process.cwd(), p).replace(/\\/g, "/"));
    }
  };
  ["app", "components", "hooks", "lib", "context"].forEach((d) => fs.existsSync(d) && walk(d));
  const measureUsers = sources.filter((f) => /measureOpenAiOrderCreated|oaiq\(\s*["']measure/.test(stripComments(read(f))));
  check("7a: order_created is only defined in lib/openaiPixel.ts and only called from lib/ecommerceMeasurement.ts",
    JSON.stringify(measureUsers.sort()) === JSON.stringify(["lib/ecommerceMeasurement.ts", "lib/openaiPixel.ts"]));
  const checkoutish = sources.filter((f) => /ReportCheckout|FocusedReportCheckout|FocusedDualReportCheckout|useReportPurchase|RelationshipFutureReportForm|thank-you/.test(f));
  check("7b: no checkout, Razorpay or thank-you code calls OpenAI directly", checkoutish.length >= 4 && checkoutish.every((f) => !/oaiq|openaiPixel/.test(read(f))));
  const ecom = stripComments(read("lib/ecommerceMeasurement.ts"));
  check("7c: lib/ecommerceMeasurement.ts still imports nothing from consent", !/from\s+["'][^"']*consent["']/.test(ecom) && !/from\s+["'][^"']*adAttribution["']/.test(ecom));
  check("7d: lib/openaiPixel.ts imports nothing", !/^\s*import\s/m.test(stripComments(read("lib/openaiPixel.ts"))));
  const ctx = read("context/ConsentContext.tsx");
  check("7e: consent changes are mirrored with the existing advertising rule", /setOpenAiConsent\(isAdvertisingIdentifierStorageAllowed\(policy, next\)\)/.test(ctx));
  const layout = read("app/layout.tsx");
  check("7f: layout loads the Pixel only through the release gate, beforeInteractive",
    /OPENAI_PIXEL_ID && \(\s*<Script id="openai-pixel" strategy="beforeInteractive">/.test(layout) && /const OPENAI_PIXEL_ID = getEnabledOpenAiPixelId\(\);/.test(layout)
    && !/getOpenAiPixelId\(/.test(layout));
  check("7g: GTM container and consent-default bootstrap are still present", /GTM-WLP7T2DP/.test(layout) && /id="consent-default"/.test(layout));
  check("7h: no direct Meta fbq code was introduced", sources.every((f) => !/\bfbq\s*\(/.test(stripComments(read(f)))));

  console.log("\n=== 8. privacy policy disclosures (wording pending owner approval) ===");
  const policy = read("app/privacy-policy/page.tsx");
  const text = policy.replace(/\s+/g, " ");
  check("8a: effective date component unchanged", policy.includes('<PolicyEffectiveDate policy="privacy" />'));
  check("8b: existing 'do not sell' commitment preserved", /We do <strong>not<\/strong> sell or trade your personal data/.test(text));
  check("8c: Advertising Measurement section present and linked from the sharing clause",
    policy.includes('id="advertising-measurement"') && policy.includes('href="#advertising-measurement"'));
  check("8d: names the partners (Google, Meta, OpenAI)", /Google/.test(text) && /Meta/.test(text) && /OpenAI/.test(text));
  check("8e: discloses __oppref (30 days) and __obref (365 days)",
    /__oppref<\/code>.*30 days/.test(text) && /__obref<\/code>.*365 days/.test(text));
  check("8f: purchase events only after confirmed payment, with no name/contact/birth data, OpenAI gets only a product type",
    /Only after a payment has been confirmed/.test(text) && /general product type/.test(text) && /date, time or place of birth/.test(text));
  check("8g: explains withdrawal via Cookie Settings and the European consent message",
    /Cookie Settings/.test(text) && /European Economic Area/.test(text) && /OpenAI measurement is not used/.test(text));
  check("8h: makes no claim about advanced matching or hashed contact matching (unverified in Ads Manager)",
    !/advanced matching|hashed|sha-?256/i.test(text));

  console.log(`\n${"=".repeat(50)}\nTOTAL: ${passed} passed, ${failed} failed\n${"=".repeat(50)}`);
  if (failed > 0) process.exit(1);
}

main().catch((err) => { console.error(err); process.exit(1); });
