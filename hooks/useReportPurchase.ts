// hooks/useReportPurchase.ts
"use client";

import { useCallback, useState } from "react";
import { buildCampaignContextFromAttribution, readStoredAttribution } from "@/lib/analyticsAttribution";
import { getBrowserOrderAttribution } from "@/lib/adAttribution";
import { trackBackendVerifiedPurchase } from "@/lib/ecommerceMeasurement";

const RAZORPAY_SCRIPT_SRC = "https://checkout.razorpay.com/v1/checkout.js";
const DEFAULT_BACKEND_URL = "https://jyotishasha-backend.onrender.com";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window !== "undefined" && (window as any).Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export interface RazorpayVerificationFields {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface ReportPurchaseOptions {
  /** Product slug sent to the shared backend as POST /api/razorpay-order { product, ...orderPayload } */
  productSlug: string;
  /**
   * Paid Report Platform v1.0 -- R7. The COMPLETE report/customer payload
   * the new backend (R3/R6) requires BEFORE it will create a Razorpay
   * order at all -- name/email/dob/tob/pob/latitude/longitude/language,
   * plus `partner` for relationship_future_report. Sent verbatim
   * (merged with `product`/`campaign_context`) to POST /api/razorpay-order
   * -- never resent to /webhook (the backend no longer needs or trusts
   * customer/birth data at payment-verification time; see the module
   * docstring on the /webhook call below).
   */
  orderPayload: Record<string, unknown>;
  /** Razorpay checkout "description" text shown in the payment modal */
  description: string;
  /** Optional Razorpay checkout `image` */
  image?: string;
  /** Optional Razorpay checkout `prefill` (name/email/contact) */
  prefill?: { name?: string; email?: string; contact?: string };
  /** Razorpay checkout modal theme color -- preserved per report type, not unified */
  themeColor: string;
  /**
   * Where to send the customer -- but ONLY once /webhook has returned a
   * backend-CONFIRMED successful/idempotent result (R7 Section G).
   * Razorpay's own client-side "payment succeeded" callback firing is
   * never, by itself, enough to redirect here -- that was the exact
   * class of gap that let a paid-but-never-fulfilled purchase (the
   * Suresh incident) redirect straight to a thank-you page.
   */
  redirectTo: string;
  /** Razorpay checkout.js itself failed to load */
  onScriptLoadError: () => void;
  /** Backend didn't return an order_id (rejected the payload before ever contacting Razorpay, or Razorpay itself failed) */
  onOrderCreationError: (backendMessage?: string) => void;
  /**
   * Razorpay's payment.failed event. Optional: only attached when supplied, so a
   * report flow that previously had no failure listener (and relied on Razorpay's
   * own modal to show the failure) keeps that exact behaviour.
   */
  onPaymentFailed?: (description?: string) => void;
  /** Any other thrown error during order creation / checkout setup */
  onUnexpectedError: () => void;
  /**
   * /webhook returned 200 with status="payment_confirmed_processing_delayed"
   * (R6): the payment is genuinely PAID, but report generation could not
   * be queued immediately. Must NEVER be presented as a failure or as an
   * invitation to pay again -- and must NOT redirect to redirectTo,
   * since the report is not confirmed queued.
   */
  onProcessingDelayed: () => void;
  /**
   * /webhook itself returned a non-2xx (verification failed, amount/
   * order mismatch, orphaned payment, a manual-review conflict, ...).
   * Never redirect to redirectTo and never auto-retry payment from here
   * -- callers should show a safe "contact support, don't pay again"
   * message, exactly like an unconfirmed-webhook-call failure.
   */
  onFinalizationFailed: (message?: string) => void;
}

export function useReportPurchase() {
  const [isProcessing, setIsProcessing] = useState(false);

  const purchase = useCallback(async (opts: ReportPurchaseOptions) => {
    const {
      productSlug,
      orderPayload,
      description,
      image,
      prefill,
      themeColor,
      redirectTo,
      onScriptLoadError,
      onOrderCreationError,
      onPaymentFailed,
      onUnexpectedError,
      onProcessingDelayed,
      onFinalizationFailed,
    } = opts;

    setIsProcessing(true);
    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady) {
        onScriptLoadError();
        return;
      }

      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL;

      // Task 10A -- attaches Task 2C's own already-immutable, first-touch
      // campaign snapshot to the transaction at CREATION time only (never
      // resent at /webhook verification time -- the backend retrieves its
      // own durable snapshot from Razorpay's order.notes instead, see
      // modules/payments/campaign_attribution.py). Reuses the SAME
      // function lib/anonymousActivityEventClient.ts already calls for
      // every anonymous website event -- no new UTM-parsing logic here.
      // Optional: omitted entirely (not sent as an empty object) when no
      // attribution was ever captured for this visit.
      const campaignContext = typeof window !== "undefined"
        ? buildCampaignContextFromAttribution(readStoredAttribution(window.sessionStorage))
        : undefined;

      // Reports Ads P0.1 -- consent-aware ad-attribution snapshot, sent as
      // `attribution` and persisted by the backend against the internal
      // Order. `campaign_context` above is unchanged (compatibility).
      const orderAttribution = getBrowserOrderAttribution();

      // R7 -- the COMPLETE report/customer payload (name/email/dob/tob/
      // pob/latitude/longitude/language/partner) is sent HERE, at order-
      // creation time, matching the new backend contract exactly. The
      // backend validates it, persists an internal Order BEFORE ever
      // contacting Razorpay, and rejects an incomplete payload with a
      // 4xx before any charge is possible -- there is no longer a
      // {product}-only path.
      const orderRes = await fetch(`${backend}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: productSlug,
          ...orderPayload,
          ...(campaignContext ? { campaign_context: campaignContext } : {}),
          ...(orderAttribution ? { attribution: orderAttribution } : {}),
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.order_id) {
        onOrderCreationError(orderData.error || orderData.message);
        return;
      }

      await new Promise<void>((resolve) => {
        const options: Record<string, unknown> = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          // R7 -- the backend's own `amount` is ALWAYS already in paise
          // (Order.amount_paise, the registry-derived, immutable
          // snapshot) -- passed straight to Razorpay with NO client-side
          // multiplication/division. Never derived from reportsData.ts's
          // own display price.
          amount: orderData.amount,
          currency: orderData.currency,
          name: "Jyotishasha",
          description,
          order_id: orderData.order_id,
          handler: async function (response: any) {
            const fields: RazorpayVerificationFields = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
            // R7 -- /webhook now receives ONLY the Razorpay verification
            // fields (payment proof), never customer/birth/report data.
            // The backend already owns the Order (created above) and
            // resolves it entirely by razorpay_order_id -- there is
            // nothing left here for it to trust from this payload.
            try {
              const webhookRes = await fetch(`${backend}/webhook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(fields),
              });
              const webhookData = await webhookRes.json().catch(() => null);

              if (!webhookRes.ok) {
                // R7 Section G -- never redirect to success on a non-2xx.
                onFinalizationFailed(webhookData?.message);
                return;
              }
              // Reports Ads P0.2 -- this 2xx response is the backend proving the
              // payment verified and the Order PAID; the purchase is measured
              // ONLY from its `purchase_measurement` object (present for the
              // focused reports, absent for anything else -> nothing pushed).
              if (webhookData?.status === "payment_confirmed_processing_delayed") {
                // Payment is genuinely PAID; generation dispatch is
                // delayed. Never a failure, never redirected as if the
                // report were ready.
                trackBackendVerifiedPurchase(webhookData?.purchase_measurement);
                onProcessingDelayed();
                return;
              }
              // "success" / "already_processing" / "recovered_success" --
              // the only backend-confirmed outcomes that mean it is safe
              // to send the customer to the success page.
              // Navigate only after the browser tags had a chance to dispatch
              // (immediately when GTM is absent or already measured).
              trackBackendVerifiedPurchase(webhookData?.purchase_measurement, () => {
                window.location.href = redirectTo;
              });
            } catch {
              // Network failure reaching /webhook itself -- same "payment
              // succeeded, fulfillment unconfirmed" case as a 4xx/5xx.
              onFinalizationFailed();
            } finally {
              resolve();
            }
          },
          theme: { color: themeColor },
        };
        if (image) options.image = image;
        if (prefill) options.prefill = prefill;

        const rzp = new (window as any).Razorpay(options);
        if (onPaymentFailed) {
          rzp.on("payment.failed", function (response: any) {
            onPaymentFailed(response?.error?.description);
            resolve();
          });
        }
        rzp.open();
      });
    } catch {
      onUnexpectedError();
    } finally {
      setIsProcessing(false);
    }
  }, []);

  return { purchase, isProcessing };
}
