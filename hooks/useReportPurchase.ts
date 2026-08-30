// hooks/useReportPurchase.ts
"use client";

import { useCallback, useState } from "react";

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
  /** Product slug sent to the shared backend as POST /api/razorpay-order { product } */
  productSlug: string;
  /** Razorpay checkout "description" text shown in the payment modal */
  description: string;
  /**
   * Multiplies the backend's returned `amount` before handing it to Razorpay.
   * The two report flows disagreed on this before unification (one treated the
   * backend amount as rupees and converted to paise, the other passed it through
   * unchanged) -- that discrepancy is preserved per-caller here, not resolved,
   * since resolving it one way or the other would silently change what a real
   * flow charges. See audit output for details.
   */
  amountMultiplier?: number;
  /** Optional Razorpay checkout `image` */
  image?: string;
  /** Optional Razorpay checkout `prefill` (name/email/contact) */
  prefill?: { name?: string; email?: string; contact?: string };
  /** Razorpay checkout modal theme color -- preserved per report type, not unified */
  themeColor: string;
  /** Where to send the customer once the webhook call has been attempted (existing thank-you behaviour) */
  redirectTo: string;
  /** Builds the POST /webhook body; receives the Razorpay verification fields to fold in */
  buildWebhookPayload: (fields: RazorpayVerificationFields) => Record<string, unknown>;
  /** Razorpay checkout.js itself failed to load */
  onScriptLoadError: () => void;
  /** Backend didn't return an order_id */
  onOrderCreationError: (backendMessage?: string) => void;
  /**
   * Razorpay's payment.failed event. Optional: only attached when supplied, so a
   * report flow that previously had no failure listener (and relied on Razorpay's
   * own modal to show the failure) keeps that exact behaviour.
   */
  onPaymentFailed?: (description?: string) => void;
  /** Any other thrown error during order creation / checkout setup */
  onUnexpectedError: () => void;
}

export function useReportPurchase() {
  const [isProcessing, setIsProcessing] = useState(false);

  const purchase = useCallback(async (opts: ReportPurchaseOptions) => {
    const {
      productSlug,
      description,
      amountMultiplier = 1,
      image,
      prefill,
      themeColor,
      redirectTo,
      buildWebhookPayload,
      onScriptLoadError,
      onOrderCreationError,
      onPaymentFailed,
      onUnexpectedError,
    } = opts;

    setIsProcessing(true);
    try {
      const scriptReady = await loadRazorpayScript();
      if (!scriptReady) {
        onScriptLoadError();
        return;
      }

      const backend = process.env.NEXT_PUBLIC_BACKEND_URL || DEFAULT_BACKEND_URL;

      const orderRes = await fetch(`${backend}/api/razorpay-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productSlug }),
      });
      const orderData = await orderRes.json();

      if (!orderData.order_id) {
        onOrderCreationError(orderData.error);
        return;
      }

      await new Promise<void>((resolve) => {
        const options: Record<string, unknown> = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: orderData.amount * amountMultiplier,
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
            try {
              await fetch(`${backend}/webhook`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildWebhookPayload(fields)),
              });
            } finally {
              // Always redirect once the webhook attempt has settled -- the previous
              // Relationship Future Report code had no try/finally here, so a network
              // error on this fetch would silently strand the customer with no
              // redirect and no message. Centralizing the call fixes that edge case
              // as a side effect; the golden path is unchanged.
              resolve();
              window.location.href = redirectTo;
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
