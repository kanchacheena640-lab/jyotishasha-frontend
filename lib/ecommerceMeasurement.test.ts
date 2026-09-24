// lib/ecommerceMeasurement.test.ts

/**
 * Reports Ads P0.2 -- tests for lib/ecommerceMeasurement.ts (backend-
 * confirmed `purchase`, `view_item`, `begin_checkout`) and for the
 * structural facts about where the checkouts call it.
 *
 * Standalone check()/pass-fail-counter convention (no test runner). Run
 * from the repo root:
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/ecommerceMeasurement.test.ts
 *   node .ts-test-out/ecommerceMeasurement.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 *
 * The backend half (unpaid/failed payments never yield a measurement,
 * correct object for PAID SELF/DUAL, value from amount_paise, PII-free) is
 * proven against the real routes in the backend repo's
 * test_reports_ads_p02_purchase_measurement.py.
 */

import * as fs from "fs";
import * as path from "path";
import {
  PURCHASE_MEASURED_KEY_PREFIX,
  buildBeginCheckoutEvent,
  buildPurchaseEvent,
  buildViewItemEvent,
  parsePurchaseMeasurement,
  pushPurchaseOnce,
  resetMeasuredMemoryForTest,
  type MeasuredStorageLike,
} from "./ecommerceMeasurement";

let passed = 0;
let failed = 0;

function check(label: string, condition: boolean) {
  if (condition) { passed += 1; console.log(`  PASS: ${label}`); }
  else { failed += 1; console.log(`  FAIL: ${label}`); }
}

function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(__dirname, "..", relativePath), "utf8");
}

function stripComments(src: string): string {
  return src
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

class MemStorage implements MeasuredStorageLike {
  data: Record<string, string> = {};
  getItem(k: string) { return k in this.data ? this.data[k] : null; }
  setItem(k: string, v: string) { this.data[k] = v; }
  removeItem(k: string) { delete this.data[k]; }
}

class FakeDataLayer {
  entries: any[] = [];
  push(v: unknown) { this.entries.push(v); }
  events(name: string) { return this.entries.filter((e) => e && e.event === name); }
}

const SELF_M = {
  transaction_id: "ord_5010", value: 51, currency: "INR", item_id: "promotion_timing", item_name: "Promotion Report",
  item_category: "career", product_family: "focused_report", report_type: "self", payment_provider: "RAZORPAY", source_platform: "web",
};
const DUAL_M = { ...SELF_M, transaction_id: "ord_5011", item_id: "relationship_lead_to_marriage", item_name: "Relationship and Marriage", item_category: "relationship", report_type: "dual" };

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function main() {
  console.log("\n=== 3/4. purchase event built from the backend object (SELF, DUAL) ===");
  {
    const e = buildPurchaseEvent(parsePurchaseMeasurement(SELF_M)!);
    check("3a: GA4 ecommerce structure -- event 'purchase' with transaction_id/value/currency/items",
      e.event === "purchase" && JSON.stringify(e.ecommerce) === JSON.stringify({
        transaction_id: "ord_5010", value: 51, currency: "INR",
        items: [{ item_id: "promotion_timing", item_category: "career", price: 51, quantity: 1, item_name: "Promotion Report" }],
      }));
    check("3b: extra non-PII dimensions carried through", e.product_family === "focused_report" && e.report_type === "self" && e.payment_provider === "RAZORPAY" && e.source_platform === "web");
    const d = buildPurchaseEvent(parsePurchaseMeasurement(DUAL_M)!);
    check("4: DUAL purchase event (dual / relationship / its own transaction)",
      (d.ecommerce as any).transaction_id === "ord_5011" && (d.ecommerce as any).items[0].item_id === "relationship_lead_to_marriage" && d.report_type === "dual" && (d.ecommerce as any).items[0].item_category === "relationship");
    check("6: value/price are copied from the backend object -- item.price equals the backend value, never a frontend constant",
      (buildPurchaseEvent(parsePurchaseMeasurement({ ...SELF_M, value: 123.45 })!).ecommerce as any).items[0].price === 123.45);
    const noName = buildPurchaseEvent(parsePurchaseMeasurement({ ...SELF_M, item_name: undefined })!);
    check("3c: item_name is omitted when the backend did not supply one", !("item_name" in (noName.ecommerce as any).items[0]));
  }

  console.log("\n=== 1/2/10. anything not backend-confirmed or malformed produces NO event; no PII ===");
  {
    for (const [label, raw] of [
      ["undefined (backend sent no measurement: unpaid / failed / out of scope)", undefined], ["null", null], ["string", "ord_1"], ["empty object", {}],
      ["missing transaction_id", { ...SELF_M, transaction_id: undefined }], ["bad transaction_id", { ...SELF_M, transaction_id: "5010" }],
      ["zero value", { ...SELF_M, value: 0 }], ["negative value", { ...SELF_M, value: -51 }], ["string value", { ...SELF_M, value: "51" }],
      ["NaN value", { ...SELF_M, value: NaN }], ["bad currency", { ...SELF_M, currency: "rupees" }], ["missing item_id", { ...SELF_M, item_id: undefined }],
    ] as Array<[string, unknown]>) {
      const dl = new FakeDataLayer(); let done = 0;
      const fired = pushPurchaseOnce(raw, { storage: new MemStorage(), dataLayer: dl, onDone: () => { done += 1; } });
      check(`1/2: ${label} -> no dataLayer push, navigation callback still runs once`, fired === false && dl.entries.length === 0 && done === 1);
    }
    const hostile = parsePurchaseMeasurement({ ...SELF_M, email: "a@b.com", phone: "9999999999", name: "Asha", dob: "1994-01-26", pob: "Delhi", latitude: 1, razorpay_payment_id: "pay_1", gclid: "G1" })!;
    const blob = JSON.stringify(buildPurchaseEvent(hostile));
    check("10a: extra/PII keys on the backend object are dropped, never forwarded", !/a@b\.com|9999999999|Asha|1994-01-26|Delhi|pay_1|G1|email|phone|dob|gclid/.test(blob));
    check("10b: the parsed object contains only the ten allowlisted fields",
      Object.keys(hostile).every((k) => ["transaction_id", "value", "currency", "item_id", "item_name", "item_category", "product_family", "report_type", "payment_provider", "source_platform"].includes(k)));
  }

  console.log("\n=== 12/13. once per transaction: duplicate callback, repeat response, refresh, navigation ===");
  {
    resetMeasuredMemoryForTest();
    const storage = new MemStorage(); const dl = new FakeDataLayer();
    const first = pushPurchaseOnce(SELF_M, { storage, dataLayer: dl, waitForTags: true });
    const second = pushPurchaseOnce(SELF_M, { storage, dataLayer: dl, waitForTags: true });       // duplicate Razorpay callback / repeated backend response
    const third = pushPurchaseOnce({ ...SELF_M }, { storage, dataLayer: dl, waitForTags: true });  // React re-render
    check("12: the same transaction fires exactly ONE purchase", first === true && second === false && third === false && dl.events("purchase").length === 1);
    check("12b: the dedupe marker is the documented first-party key", (PURCHASE_MEASURED_KEY_PREFIX + "ord_5010") in storage.data && PURCHASE_MEASURED_KEY_PREFIX === "purchase_measured:");
    resetMeasuredMemoryForTest(); // a refresh / back-forward / new page load: memory gone, localStorage survives
    const dl2 = new FakeDataLayer();
    check("13: after a refresh (fresh memory, same localStorage) the transaction is NOT measured again", pushPurchaseOnce(SELF_M, { storage, dataLayer: dl2, waitForTags: true }) === false && dl2.entries.length === 0);
    check("13b: a DIFFERENT transaction still measures", pushPurchaseOnce(DUAL_M, { storage, dataLayer: dl2, waitForTags: true }) === true && dl2.events("purchase").length === 1);
    const blocked: MeasuredStorageLike = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); } };
    resetMeasuredMemoryForTest();
    const dl3 = new FakeDataLayer();
    const a = pushPurchaseOnce(SELF_M, { storage: blocked, dataLayer: dl3 });
    const b = pushPurchaseOnce(SELF_M, { storage: blocked, dataLayer: dl3 });
    check("13c: blocked storage never throws and still de-duplicates within the page (in-memory)", a === true && b === false && dl3.events("purchase").length === 1);
    resetMeasuredMemoryForTest();
  }

  console.log("\n=== 11. sequencing: ecommerce cleared, then purchase; navigation waits for tags only when GTM can call back ===");
  {
    resetMeasuredMemoryForTest();
    const dl = new FakeDataLayer(); let done = 0;
    pushPurchaseOnce(SELF_M, { storage: new MemStorage(), dataLayer: dl, waitForTags: true, timeoutMs: 40, onDone: () => { done += 1; } });
    check("11a: GA4 pattern -- {ecommerce:null} is pushed before the purchase event", dl.entries[0] && dl.entries[0].ecommerce === null && dl.entries[1].event === "purchase");
    check("11b: with GTM present, navigation is NOT triggered until the tags call eventCallback", done === 0 && typeof dl.entries[1].eventCallback === "function" && dl.entries[1].eventTimeout === 40);
    dl.entries[1].eventCallback(); dl.entries[1].eventCallback();
    check("11c: eventCallback releases navigation exactly once (even if called twice)", done === 1);
    await sleep(120);
    check("11d: ...and the hard timeout never fires it a second time", done === 1);

    resetMeasuredMemoryForTest();
    const dl2 = new FakeDataLayer(); let done2 = 0;
    pushPurchaseOnce(SELF_M, { storage: new MemStorage(), dataLayer: dl2, waitForTags: true, timeoutMs: 40, onDone: () => { done2 += 1; } });
    await sleep(400); // hard stop is timeoutMs + 250ms
    check("11e: if GTM never calls back, the timeout still releases navigation once (customer never stuck)", done2 === 1);

    resetMeasuredMemoryForTest();
    const dl3 = new FakeDataLayer(); let done3 = 0;
    pushPurchaseOnce(SELF_M, { storage: new MemStorage(), dataLayer: dl3, waitForTags: false, onDone: () => { done3 += 1; } });
    check("11f: without GTM (ad blocker) navigation is released immediately and no callback fields are added", done3 === 1 && !("eventCallback" in dl3.entries[1]));
    resetMeasuredMemoryForTest();
  }

  console.log("\n=== HARDENING. dedupe marker vs. dispatch failure modes ===");
  {
    const KEY = PURCHASE_MEASURED_KEY_PREFIX + "ord_5010";

    // (1) push succeeds and GTM calls back -> persistent marker stays (at-most-once)
    resetMeasuredMemoryForTest();
    let s = new MemStorage(); let dl = new FakeDataLayer(); let done = 0;
    pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dl, waitForTags: true, timeoutMs: 40, onDone: () => { done += 1; } });
    dl.entries[1].eventCallback();
    await sleep(400);
    check("H1: GTM present + eventCallback fired -> persistent marker kept, navigation released once", KEY in s.data && done === 1);
    resetMeasuredMemoryForTest();
    check("H1b: ...and the same verified transaction received again later is NOT pushed again", pushPurchaseOnce(SELF_M, { storage: s, dataLayer: new FakeDataLayer(), waitForTags: true }) === false);

    // (2) GTM present but never calls back -> hard timeout withdraws the PERSISTENT marker only
    resetMeasuredMemoryForTest();
    s = new MemStorage(); dl = new FakeDataLayer(); done = 0;
    pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dl, waitForTags: true, timeoutMs: 40, onDone: () => { done += 1; } });
    check("H2a: marker is present while the tags are still pending", KEY in s.data && done === 0);
    await sleep(400);
    check("H2b: no callback -> navigation released once and the persistent marker is withdrawn (no permanent false 'measured')", done === 1 && !(KEY in s.data));
    check("H2c: ...but the in-page marker remains, so THIS page load still cannot double fire",
      pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dl, waitForTags: true }) === false && dl.events("purchase").length === 1);
    resetMeasuredMemoryForTest();
    const dlLater = new FakeDataLayer();
    check("H2d: a later re-delivery of that verified transaction CAN be measured (GA4 / Ads de-duplicate on transaction_id)",
      pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dlLater, waitForTags: true }) === true && dlLater.events("purchase").length === 1);

    // (3) GTM blocked / absent -> in-page marker only, NOTHING persisted
    resetMeasuredMemoryForTest();
    s = new MemStorage(); dl = new FakeDataLayer(); done = 0;
    const a = pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dl, waitForTags: false, onDone: () => { done += 1; } });
    const b = pushPurchaseOnce(SELF_M, { storage: s, dataLayer: dl, waitForTags: false });
    check("H3a: no GTM -> navigation immediate, in-page duplicate still blocked", a === true && b === false && done === 1 && dl.events("purchase").length === 1);
    check("H3b: no GTM -> NO persistent marker is written (never permanently 'measured' without a consumer)", !(KEY in s.data) && Object.keys(s.data).length === 0);
    resetMeasuredMemoryForTest();
    check("H3c: a later load where GTM works can still measure the same verified transaction",
      pushPurchaseOnce(SELF_M, { storage: s, dataLayer: new FakeDataLayer(), waitForTags: true }) === true && KEY in s.data);

    // (4) the push itself throws -> both markers rolled back, navigation still released
    resetMeasuredMemoryForTest();
    s = new MemStorage(); done = 0;
    const exploding = { push() { throw new Error("hijacked dataLayer"); } };
    const r = pushPurchaseOnce(SELF_M, { storage: s, dataLayer: exploding, waitForTags: true, onDone: () => { done += 1; } });
    check("H4a: a throwing push never throws into product code and releases navigation", r === false && done === 1);
    check("H4b: ...and leaves NO marker behind (memory or storage)", !(KEY in s.data) && pushPurchaseOnce(SELF_M, { storage: s, dataLayer: new FakeDataLayer(), waitForTags: true }) === true);

    // (5) page closes right after a verified payment: marker and push are one synchronous block
    const libSrc = stripComments(readSource("lib/ecommerceMeasurement.ts"));
    const region = libSrc.slice(libSrc.indexOf("markMeasured(storage, transactionId, gtmPresent)"), libSrc.indexOf("options.dataLayer.push(event)"));
    check("H5: no await / timer between marking and the dataLayer push (a tab close cannot leave 'marked but never pushed')", !/await |setTimeout|setInterval|Promise/.test(region) && region.length > 0);
    resetMeasuredMemoryForTest();
  }

  console.log("\n=== 14/15. view_item and begin_checkout ===");
  {
    const input = { questionKey: "promotion_timing", itemName: "Promotion Report", category: "career", price: 51, reportType: "self" as const };
    const v = buildViewItemEvent(input);
    check("14: view_item -- GA4 ecommerce structure with currency/value/items", v.event === "view_item" && JSON.stringify(v.ecommerce) === JSON.stringify({
      currency: "INR", value: 51, items: [{ item_id: "promotion_timing", item_category: "career", price: 51, quantity: 1, item_name: "Promotion Report" }] }));
    check("14b: view_item carries family/report_type and NO transaction_id (it is not a purchase)", v.product_family === "focused_report" && v.report_type === "self" && !("transaction_id" in (v.ecommerce as any)));
    const b = buildBeginCheckoutEvent({ ...input, questionKey: "relationship_lead_to_marriage", category: "relationship", reportType: "dual" });
    check("15: begin_checkout -- GA4 structure, DUAL item", b.event === "begin_checkout" && (b.ecommerce as any).items[0].item_id === "relationship_lead_to_marriage" && b.report_type === "dual" && (b.ecommerce as any).value === 51);
    check("15b: neither funnel event contains PII keys", !/email|phone|dob|name"|latitude|pob/.test(JSON.stringify([v, b]).replace(/item_name/g, "")));
  }

  console.log("\n=== source-level: where the events are (and are not) fired ===");
  {
    const self = readSource("components/focused-reports/FocusedReportCheckout.tsx");
    const dual = readSource("components/focused-reports/FocusedDualReportCheckout.tsx");
    const hook = readSource("hooks/useReportPurchase.ts");
    const thankYou = readSource("app/[locale]/thank-you/page.tsx") + readSource("app/[locale]/thank-you/ThankYouDetail.tsx");
    const selfCode = stripComments(self);
    const hookCode = stripComments(hook);

    // 11: purchase only after backend verification
    const selfOkIdx = selfCode.indexOf("if (!webhookRes.ok)");
    const selfCalls = [...selfCode.matchAll(/trackBackendVerifiedPurchase\(/g)].map((m) => m.index as number);
    check("11g: SELF -- purchase tracking exists ONLY after the non-2xx guard (2 calls: delayed + success branch)", selfCalls.length === 2 && selfCalls.every((i) => i > selfOkIdx) && selfOkIdx > 0);
    check("11h: SELF -- never from the Razorpay handler entry, payment.failed, ondismiss or the 'unconfirmed' branch",
      !/handler: async function \(response: any\) \{\s*paymentConfirmedRef\.current = true;\s*setIsProcessing\(true\);\s*trackBackend/.test(selfCode)
      && !/payment\.failed[\s\S]{0,200}trackBackend/.test(selfCode) && !/ondismiss[\s\S]{0,200}trackBackend/.test(selfCode));
    const hookOkIdx = hookCode.indexOf("if (!webhookRes.ok)");
    const hookCalls = [...hookCode.matchAll(/trackBackendVerifiedPurchase\(/g)].map((m) => m.index as number);
    check("11i: hook (DUAL) -- purchase tracking exists ONLY after the non-2xx guard (2 calls)", hookCalls.length === 2 && hookCalls.every((i) => i > hookOkIdx) && hookOkIdx > 0);
    check("11j: the value comes from the backend response (webhookData.purchase_measurement) in both, never built locally",
      (selfCode.match(/webhookData\?\.purchase_measurement/g) || []).length === 2 && (hookCode.match(/webhookData\?\.purchase_measurement/g) || []).length === 2);
    check("11k: navigation to thank-you happens inside the onDone callback (after tags dispatch) in both",
      /trackBackendVerifiedPurchase\(webhookData\?\.purchase_measurement, \(\) => \{\s*window\.location\.href = `\/\$\{currentLang\}\/thank-you`;/.test(selfCode)
      && /trackBackendVerifiedPurchase\(webhookData\?\.purchase_measurement, \(\) => \{\s*window\.location\.href = redirectTo;/.test(hookCode));
    check("11l: no frontend price/value constant feeds the purchase (no priceRupees / literal 51 near the track calls)",
      !/trackBackendVerifiedPurchase\([^)]*(priceRupees|51)/.test(selfCode + hookCode));
    check("11m: /webhook request body is unchanged (no measurement/attribution fields resent)", !/\/webhook[\s\S]{0,700}?\}\)/.exec(hookCode)?.[0].includes("purchase"));

    // thank-you page: not a measurement point, cannot be forged
    const tyCode = stripComments(thankYou);
    check("5/11n: the thank-you page fires NOTHING (no dataLayer/gtag/purchase) and reads no URL parameters -- a hand-typed URL cannot fabricate revenue",
      !/dataLayer|gtag\(|purchase|useSearchParams|searchParams|location\.search/i.test(tyCode));

    // 14/15 placement
    for (const [name, src] of [["SELF", selfCode], ["DUAL", stripComments(dual)]] as const) {
      check(`14c: ${name} -- view_item is pushed once per mount (ref-guarded) from the mount effect`, /viewItemSentRef\.current = true;\s*pushViewItem\(funnelItem\)/.test(src) && (src.match(/pushViewItem\(/g) || []).length === 1);
      check(`15c: ${name} -- begin_checkout is pushed at checkout initiation (ref-guarded), once, and not on a page view`,
        /beginCheckoutSentRef\.current = true;\s*pushBeginCheckout\(funnelItem\)/.test(src) && (src.match(/pushBeginCheckout\(/g) || []).length === 1);
    }
    check("15d: SELF begin_checkout sits before the order-creation request; DUAL before purchase()",
      selfCode.indexOf("pushBeginCheckout(funnelItem)") < selfCode.indexOf("/api/razorpay-order")
      && stripComments(dual).indexOf("pushBeginCheckout(funnelItem)") < stripComments(dual).indexOf("await purchase("));
    check("14d: the DUAL component does not track the purchase itself (the shared hook does)", !stripComments(dual).includes("trackBackendVerifiedPurchase"));

    // consent + scope
    const lib = readSource("lib/ecommerceMeasurement.ts");
    check("8a: the module imports nothing from consent and adds no second consent system", !/from "\.\/consent"|ConsentContext|useConsent/.test(stripComments(lib)));
    check("8b: dataLayer only -- no gtag()/fbq()/pixel/Meta/enhanced-conversion code", !/gtag\(|fbq\(|connect\.facebook|Meta ?Pixel|enhanced|hash|sha256/i.test(stripComments(lib)));
    const bridge = readSource("lib/marketingMeasurementBridge.ts");
    check("8c: the marketing bridge is untouched in behaviour (still 3 allowlisted events, no purchase pushed)",
      /ALLOWED_EVENT_NAMES[\s\S]{0,300}jyotishasha_kundali_generated[\s\S]{0,120}jyotishasha_app_download_intent[\s\S]{0,120}jyotishasha_report_purchase_intent/.test(bridge)
      && !/event: "purchase"/.test(stripComments(bridge)));
    const original = readSource("components/reports/ReportCheckout.tsx");
    check("8d: scope -- the original-25 checkout does not use the new measurement", !original.includes("ecommerceMeasurement"));
    const attr = readSource("lib/adAttribution.ts");
    check("17: P0.1 is untouched -- adAttribution.ts does not reference the purchase module; checkouts still send attribution",
      !attr.includes("ecommerceMeasurement") && self.includes("attribution: orderAttribution") && hook.includes("attribution: orderAttribution"));
  }

  console.log("\n==================================================");
  console.log(`RESULT: ${passed} passed, ${failed} failed`);
  console.log("==================================================");
  if (failed > 0) process.exit(1);
}

main();
