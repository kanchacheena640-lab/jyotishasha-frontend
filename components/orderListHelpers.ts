// components/orderListHelpers.ts
//
// Admin Orders P0 fixes -- pure, framework-free helpers extracted out of
// OrderList.tsx so the "Not Ready" / Resend-guard logic can be unit
// tested directly (this repo has no component-render harness; see
// components/orderListWiring.test.ts for how the JSX itself is proven
// to actually use these).
//
// Architecture this encodes (Admin Orders audit, P0 fixes):
//   - A paid report's temporary PDF is deleted right after a successful
//     SMTP send (modules/payments/report_delivery_service.py::
//     deliver_generated_report() nulls Order.pdf_url BEFORE deleting the
//     file). So `pdf_url == null` on an old, successfully-emailed order
//     is CORRECT, permanent architecture -- never a bug, never "not
//     ready yet". The previous UI collapsed every null pdf_url into the
//     single label "Not ready", which is indistinguishable from a
//     report that is still genuinely generating.
//   - Resend (routes/admin_orders.py -> ReconciliationService.
//     retry_delivery()) only ever succeeds for report_stage=="Ready"
//     AND email_status=="FAILED"; every other combination is a 409.
//     canResend() mirrors that exact backend precondition so the button
//     is never shown active for a request that can only ever fail.

export type DeliveryStatusKind =
  | "download"
  | "generating"
  | "failed"
  | "emailed_no_pdf"
  | "not_available";

export interface DeliveryStatus {
  kind: DeliveryStatusKind;
  label: string;
}

export interface OrderDeliveryFields {
  report_stage: string;
  email_status?: string | null;
  pdf_url: string | null;
}

const GENERATING_STAGES = new Set(["Pending", "Queued", "Processing"]);

/**
 * Renders the ONE status shown in place of the old "Not ready" span.
 * A truthy pdf_url always wins (the backend only ever sets it when a
 * usable temporary artifact currently exists on disk -- see
 * report_delivery_service.py::pdf_artifact_is_usable()), so Download is
 * offered whenever it's genuinely possible, independent of report_stage/
 * email_status.
 */
export function deliveryStatus(order: OrderDeliveryFields): DeliveryStatus {
  if (order.pdf_url) {
    return { kind: "download", label: "Download" };
  }
  if (GENERATING_STAGES.has(order.report_stage)) {
    return { kind: "generating", label: "Generating…" };
  }
  if (order.report_stage === "Failed" || order.email_status === "FAILED") {
    return { kind: "failed", label: "Failed — use Resend" };
  }
  if (order.email_status === "SENT") {
    return { kind: "emailed_no_pdf", label: "Emailed — temporary download no longer available" };
  }
  return { kind: "not_available", label: "Not available" };
}

/** Mirrors ReconciliationService.retry_delivery()'s exact eligibility precondition. */
export function canResend(order: { report_stage: string; email_status?: string | null }): boolean {
  return order.report_stage === "Ready" && order.email_status === "FAILED";
}
