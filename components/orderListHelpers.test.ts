// components/orderListHelpers.test.ts
//
// Admin Orders P0 fixes -- pure-function tests for deliveryStatus()/
// canResend() (components/orderListHelpers.ts). Standalone check()/
// pass-fail-counter convention (no test runner), matching
// lib/relationshipPlaceValidation.test.ts's helperTests style. Run from
// the repo root:
//
//   npx tsc --module commonjs --target es2020 --strict --skipLibCheck \
//     --outDir .ts-test-out components/orderListHelpers.ts components/orderListHelpers.test.ts
//   node .ts-test-out/orderListHelpers.test.js
//
// (then remove .ts-test-out/ -- build output, never committed.)

import * as assert from "assert";
import { deliveryStatus, canResend } from "./orderListHelpers";

let passed = 0;
function check(label: string, test: () => void) {
  test();
  passed++;
  console.log(`PASS: ${label}`);
}

console.log("=== deliveryStatus: pdf_url truthy always wins (a usable temp artifact currently exists) ===");
check("Ready + pdf_url set -> download, regardless of email_status", () => {
  assert.deepEqual(deliveryStatus({ report_stage: "Ready", email_status: "NOT_ATTEMPTED", pdf_url: "/admin/download/1" }), { kind: "download", label: "Download" });
});
check("Ready + FAILED email + pdf_url STILL set (the real retry_delivery precondition) -> download, not 'failed'", () => {
  assert.deepEqual(deliveryStatus({ report_stage: "Ready", email_status: "FAILED", pdf_url: "/admin/download/2" }), { kind: "download", label: "Download" });
});

console.log("\n=== deliveryStatus: Pending/Queued/Processing -> Generating, never 'Not ready' ===");
for (const stage of ["Pending", "Queued", "Processing"]) {
  check(`${stage} + no pdf_url -> generating`, () => {
    assert.deepEqual(deliveryStatus({ report_stage: stage, email_status: "NOT_ATTEMPTED", pdf_url: null }), { kind: "generating", label: "Generating…" });
  });
}

console.log("\n=== deliveryStatus: SENT + no pdf_url -> clear 'emailed, cleaned up' wording, never 'Not ready' and never 'Delivered' ===");
check("report_stage Ready, email_status SENT, pdf_url null (the exact post-send architecture) -> emailed_no_pdf", () => {
  const result = deliveryStatus({ report_stage: "Ready", email_status: "SENT", pdf_url: null });
  assert.equal(result.kind, "emailed_no_pdf");
  assert.ok(!/delivered/i.test(result.label), "label must never claim inbox delivery");
  assert.ok(/email/i.test(result.label), "label must reference email/emailed, matching Revenue Dashboard terminology");
});

console.log("\n=== deliveryStatus: failure states -> clear failed/retry wording ===");
check("report_stage Failed (generation itself failed), no pdf_url -> failed", () => {
  assert.equal(deliveryStatus({ report_stage: "Failed", email_status: "NOT_ATTEMPTED", pdf_url: null }).kind, "failed");
});
check("email_status FAILED with no pdf_url (artifact vanished before retry could use it) -> failed", () => {
  assert.equal(deliveryStatus({ report_stage: "Ready", email_status: "FAILED", pdf_url: null }).kind, "failed");
});

console.log("\n=== deliveryStatus: no unexpected combination silently becomes 'Not ready' with no explanation ===");
check("Ready + NOT_ATTEMPTED + no pdf_url (rare/edge state) -> a distinct not_available kind, not a crash", () => {
  assert.equal(deliveryStatus({ report_stage: "Ready", email_status: "NOT_ATTEMPTED", pdf_url: null }).kind, "not_available");
});
check("missing email_status entirely (older row) does not throw and does not falsely claim emailed/failed", () => {
  const result = deliveryStatus({ report_stage: "Ready", pdf_url: null });
  assert.equal(result.kind, "not_available");
});

console.log("\n=== canResend: mirrors ReconciliationService.retry_delivery()'s exact precondition ===");
check("Ready + FAILED -> enabled (the only eligible combination)", () => {
  assert.equal(canResend({ report_stage: "Ready", email_status: "FAILED" }), true);
});
check("Ready + SENT -> disabled (nothing to retry)", () => {
  assert.equal(canResend({ report_stage: "Ready", email_status: "SENT" }), false);
});
check("Ready + NOT_ATTEMPTED -> disabled", () => {
  assert.equal(canResend({ report_stage: "Ready", email_status: "NOT_ATTEMPTED" }), false);
});
check("Processing + FAILED -> disabled (report_stage must be Ready)", () => {
  assert.equal(canResend({ report_stage: "Processing", email_status: "FAILED" }), false);
});
check("Failed (report_stage) + FAILED (email) -> disabled (backend's 409 boundary is report_stage==Ready specifically)", () => {
  assert.equal(canResend({ report_stage: "Failed", email_status: "FAILED" }), false);
});
check("Pending/Queued -> always disabled regardless of email_status", () => {
  assert.equal(canResend({ report_stage: "Pending", email_status: "FAILED" }), false);
  assert.equal(canResend({ report_stage: "Queued", email_status: "FAILED" }), false);
});

console.log("\n==================================================");
console.log(`RESULT: ${passed} passed, 0 failed`);
console.log("==================================================");
