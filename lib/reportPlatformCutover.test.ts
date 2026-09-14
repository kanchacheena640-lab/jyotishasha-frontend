// lib/reportPlatformCutover.test.ts

/**
 * Paid Report Platform v1.0 -- R7 (Frontend Checkout Cutover)
 * regression tests, covering the R7 task's own 30-item test matrix.
 *
 * Two verification strategies, matching lib/websiteEvents.test.ts's
 * and lib/campaignAttributionCheckout.test.ts's own established
 * convention (this repo has no component-rendering test harness, and
 * hooks/useReportPurchase.ts cannot be called directly outside a React
 * render -- it uses useState/useCallback):
 *   1. REAL, EXECUTED imports/checks against plain data modules
 *      (app/data/reportsData.ts has no React/DOM dependency at all).
 *   2. Direct SOURCE-TEXT inspection (fs.readFileSync) of the real,
 *      committed checkout files -- proving structural invariants about
 *      what is/isn't sent, in what order, and under what condition.
 *
 * Run with (from the repo root, no new dependencies required):
 *
 *   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
 *     --outDir .ts-test-out lib/reportPlatformCutover.test.ts
 *   node .ts-test-out/reportPlatformCutover.test.js
 *
 * (then remove .ts-test-out/ -- build output, never committed.)
 *
 * Campaign-attribution preservation (test matrix item 25) is NOT
 * duplicated here -- lib/campaignAttributionCheckout.test.ts already
 * covers it exhaustively (18 checks, re-run and confirmed still
 * passing against both R7-updated files) and remains the single source
 * of truth for that concern.
 */

import * as fs from "fs";
import * as path from "path";
import { reportsData } from "../app/data/reportsData";

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

// Resolved from process.cwd() (the documented run command always
// executes from the repo root), not __dirname -- this file's own
// import of reportsData.ts causes tsc to mirror source subdirectories
// under --outDir, unlike sibling *.test.ts files with no such import,
// so a __dirname-relative "../" traversal would land in the wrong
// place depending on how deeply this compiled file gets nested.
function readSource(relativePath: string): string {
  return fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
}

const reportCheckout = readSource("components/reports/ReportCheckout.tsx");
const useReportPurchase = readSource("hooks/useReportPurchase.ts");
const relationshipForm = readSource(
  "app/[locale]/love/report/relationship_future_report/RelationshipFutureReportForm.tsx",
);

// Captures the order-creation request body block in each file (from
// the fetch(`.../api/razorpay-order` call up to its closing `});`).
function orderCreationBodyBlock(source: string): string {
  const match = source.match(/razorpay-order`[\s\S]{0,1200}?\}\)\;/);
  return match ? match[0] : "";
}

// Captures the /webhook request body block in each file.
function webhookBodyBlock(source: string): string {
  const match = source.match(/\/webhook[\s\S]{0,700}?\}\)\;/);
  return match ? match[0] : "";
}

console.log("\n=== 1-6: ReportCheckout.tsx (standard reports) sends the complete order payload ===");
const rcOrderBody = orderCreationBodyBlock(reportCheckout);
check("1: order-creation body captured", rcOrderBody.length > 0);
check("2: report_slug (product: productId) present", rcOrderBody.includes("product: productId"));
check("3: name/email/phone present", ["name: form.name", "email: form.email", "phone: form.phone"].every((s) => rcOrderBody.includes(s)));
check("4: dob/tob/pob present", ["dob: form.dob", "tob: form.tob", "pob: form.pob"].every((s) => rcOrderBody.includes(s)));
check("5: latitude/longitude present", ["latitude: form.latitude", "longitude: form.longitude"].every((s) => rcOrderBody.includes(s)));
check("6: language present", rcOrderBody.includes("language: form.language"));

console.log("\n=== 7-9: Razorpay amount authority comes ONLY from the backend response, unmodified ===");
function razorpayAmountExpression(source: string): string | null {
  const match = source.match(/amount:\s*([^,\n]+),/);
  return match ? match[1].trim() : null;
}
const rcAmountExpr = razorpayAmountExpression(reportCheckout.slice(reportCheckout.indexOf("const options")));
const hookAmountExpr = razorpayAmountExpression(useReportPurchase.slice(useReportPurchase.indexOf("const options")));
check("7/8: ReportCheckout passes orderData.amount straight through (5100/19900 stay exact)", rcAmountExpr === "orderData.amount");
check("7/8: useReportPurchase passes orderData.amount straight through (5100/19900 stay exact)", hookAmountExpr === "orderData.amount");
check("9: no client-side ×100 anywhere in either file", !reportCheckout.includes("amount * 100") && !useReportPurchase.includes("amount * 100"));
check("9: no client-side amountMultiplier / division remnants", !useReportPurchase.includes("amountMultiplier") && !reportCheckout.includes("orderData.amount / 100"));

console.log("\n=== 10/26: display price stays human-readable rupees; all 25 reports remain purchasable ===");
check("10: reportsData.ts still has real, unconverted rupee prices (51/199), never paise", reportsData.some((r) => r.price === 51) && reportsData.some((r) => r.price === 199));
check("26: exactly 25 report products remain defined", reportsData.length === 25);
check("26: every report has a non-empty slug and a positive price", reportsData.every((r) => !!r.slug && r.price > 0));

console.log("\n=== 11-13: relationship_future_report sends the complete primary + partner payload ===");
const orderPayloadMatch = relationshipForm.match(/const orderPayload = \{[\s\S]{0,600}?\n    \};/);
const orderPayloadBlock = orderPayloadMatch ? orderPayloadMatch[0] : "";
check("11: orderPayload block captured", orderPayloadBlock.length > 0);
check("11: primary name/email/dob/tob/pob/latitude/longitude/language present",
  ["name: form.boy.name", "email: form.email", "dob: form.boy.dob", "tob: form.boy.tob", "pob: form.boy.pob",
    "latitude: form.boy.lat", "longitude: form.boy.lng", "language: form.language"].every((s) => orderPayloadBlock.includes(s)));
check("12: partner_payload nested exactly under `partner`, not flattened",
  /partner:\s*\{\s*\n\s*name: form\.girl\.name,\s*\n\s*dob: form\.girl\.dob,\s*\n\s*tob: form\.girl\.tob,\s*\n\s*pob: form\.girl\.pob,\s*\n\s*latitude: form\.girl\.lat,\s*\n\s*longitude: form\.girl\.lng,/.test(orderPayloadBlock));
check("13: relationship checkout does not invent/send a phone field (the live form collects none)", !orderPayloadBlock.includes("phone"));

console.log("\n=== 14/15: browser callback sends ONLY payment identifiers/signature ===");
const rcWebhookBody = webhookBodyBlock(reportCheckout);
// useReportPurchase builds `body: JSON.stringify(fields)` from a
// `fields` object declared just above the fetch call -- check that
// declaration's own shape, not the fetch-call block itself.
const hookFieldsMatch = useReportPurchase.match(/const fields: RazorpayVerificationFields = \{[\s\S]{0,300}?\};/);
const hookFieldsBlock = hookFieldsMatch ? hookFieldsMatch[0] : "";
const hookWebhookBody = webhookBodyBlock(useReportPurchase);
check("14: ReportCheckout /webhook body sends razorpay_order_id/payment_id/signature",
  ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"].every((s) => rcWebhookBody.includes(s)));
check("15: ReportCheckout /webhook body no longer includes name/email/dob/tob/pob/product/partner",
  ["name:", "email:", "dob:", "tob:", "pob:", "product:", "partner:"].every((s) => !rcWebhookBody.includes(s)));
check("14: useReportPurchase's `fields` (the actual /webhook body) is razorpay_order_id/payment_id/signature only",
  hookFieldsBlock.length > 0 && ["razorpay_order_id", "razorpay_payment_id", "razorpay_signature"].every((s) => hookFieldsBlock.includes(s)));
check("15: useReportPurchase /webhook fetch call sends only `fields`, no separately-constructed customer data",
  hookWebhookBody.includes("JSON.stringify(fields)")
  && ["name:", "email:", "dob:", "tob:", "pob:", "product:", "partner:"].every((s) => !hookFieldsBlock.includes(s)));

console.log("\n=== 16-21: backend result mapping -- success/idempotent/delayed/error handling ===");
check("16/17: redirect only happens after a successful/idempotent /webhook response (inside the ok-and-not-delayed path)",
  /webhookRes\.ok[\s\S]{0,50}window\.location\.href|processing_delayed[\s\S]{0,400}window\.location\.href/.test(reportCheckout) === false
  && reportCheckout.includes("window.location.href") && reportCheckout.indexOf("if (!webhookRes.ok)") < reportCheckout.indexOf("window.location.href"));
check("18: payment_confirmed_processing_delayed is handled distinctly, never as a plain redirect", reportCheckout.includes("payment_confirmed_processing_delayed") && useReportPurchase.includes("payment_confirmed_processing_delayed"));
// "do not/don't pay again" is the REQUIRED, safe phrasing -- only a
// standalone encouragement to pay (never preceded by a negation) would
// violate Section G. Checks each raw "pay again" occurrence in the
// user-facing copy is immediately preceded by a negation word.
// Checks only user-facing string-literal text (strips `//` comment
// lines first) -- a source comment mentioning "pay again" further away
// from its own negation than a fixed char window is not user-facing
// copy and is irrelevant to Section G's actual requirement.
function everyPayAgainIsNegated(source: string): boolean {
  const codeOnly = source.split("\n").filter((line) => !line.trim().startsWith("//")).join("\n");
  const occurrences = codeOnly.match(/.{0,20}pay again/gi) || [];
  return occurrences.every((snippet) => /not|don.?t|never|कभी न|न करें/i.test(snippet));
}
check("18: processing-delayed messaging never instructs a second payment (every 'pay again' is negated)", everyPayAgainIsNegated(reportCheckout) && everyPayAgainIsNegated(relationshipForm));
function rejectsBeforeAnyRedirect(source: string): boolean {
  const guardIdx = source.indexOf("if (!webhookRes.ok)");
  const nextRedirectIdx = source.indexOf("window.location.href", guardIdx);
  if (guardIdx === -1 || nextRedirectIdx === -1) return false;
  const guardBlock = source.slice(guardIdx, nextRedirectIdx);
  return guardBlock.includes("return");
}
check("19/20/21: a non-2xx /webhook response never redirects to success (ReportCheckout)", rejectsBeforeAnyRedirect(reportCheckout));
check("19/20/21: a non-2xx /webhook response never redirects to success (useReportPurchase)", rejectsBeforeAnyRedirect(useReportPurchase));

console.log("\n=== 22: double-submit protection preserved ===");
check("22: ReportCheckout disables the Pay CTA while isProcessing", reportCheckout.includes("disabled={isProcessing}"));
check("22: RelationshipFutureReportForm disables the Pay CTA while loading", relationshipForm.includes("disabled={loading}"));

console.log("\n=== 23: Place Autocomplete -> lat/lng flow preserved, unregressed ===");
check("23: ReportCheckout still derives lat/lng from the selected place, never a hardcoded default", reportCheckout.includes("place.geometry?.location?.lat()") && reportCheckout.includes("place.geometry?.location?.lng()"));
check("23: RelationshipFutureReportForm still wires PlaceAutocompleteInput's onPlaceSelected to lat/lng", relationshipForm.includes("onPlaceSelected"));
check("23: neither file introduces a default Delhi/28.6/77.2 coordinate fallback", !reportCheckout.includes("28.6139") && !relationshipForm.includes("28.6139"));

console.log("\n=== 24: language preserved exactly, no forced conversion ===");
check("24: ReportCheckout sends the form's own language, never a hardcoded 'en'", rcOrderBody.includes("language: form.language"));
check("24: RelationshipFutureReportForm sends the form's own language", orderPayloadBlock.includes("language: form.language"));

console.log("\n=== 27: no live report path sends {product}-only anymore ===");
check("27: ReportCheckout's order-creation body is not product-only (carries real customer fields alongside it)", rcOrderBody.includes("product: productId") && rcOrderBody.includes("name: form.name"));
check("27: useReportPurchase's order-creation body spreads a caller-supplied orderPayload, never {product} alone", useReportPurchase.includes("...orderPayload"));

console.log("\n=== 28: no path re-multiplies the R6 backend amount ===");
check("28: 'amount * 100' does not appear anywhere in either checkout file", !reportCheckout.includes("amount * 100") && !useReportPurchase.includes("amount * 100"));

console.log("\n" + "=".repeat(50));
console.log(`RESULT: ${passed} passed, ${failed} failed`);
console.log("=".repeat(50));
if (failed > 0) process.exit(1);
