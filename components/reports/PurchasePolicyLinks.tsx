import { CHECKOUT_COPY, REFUND_POLICY_PATH, SUPPORT_WHATSAPP_URL } from "@/lib/checkoutUx";

/** Purchase reassurance shown next to a report's checkout, using ONLY the
 * existing approved copy and pages (same line as ReportCheckout's R2-D2 note).
 * "full": secure payment · PDF by email · refund policy · WhatsApp support.
 * "refund": only the refund-policy link -- for checkouts that already show the
 * secure-payment and WhatsApp-support lines themselves. */
export default function PurchasePolicyLinks({ lang, variant = "full" }: { lang: "en" | "hi"; variant?: "full" | "refund" }) {
  const refund = (
    <a href={REFUND_POLICY_PATH} className="underline text-purple-300 hover:text-white">{CHECKOUT_COPY.refundPolicy[lang]}</a>
  );
  return (
    <p className="max-w-4xl mx-auto px-4 pb-10 text-center text-xs text-slate-400">
      {variant === "full" ? (
        <>
          🔒 {CHECKOUT_COPY.securePayment[lang]} · {CHECKOUT_COPY.pdfByEmail[lang]} · {refund} ·{" "}
          <a href={SUPPORT_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline text-purple-300 hover:text-white">
            {CHECKOUT_COPY.support[lang]}
          </a>
        </>
      ) : (
        refund
      )}
    </p>
  );
}
