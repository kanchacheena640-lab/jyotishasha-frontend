// lib/checkoutUx.ts

/**
 * Report checkout friction fixes (R2-D2) -- pure helpers and copy shared by
 * components/reports/ReportCheckout.tsx and ReportContent.tsx.
 *
 * Nothing here touches payment: the email check runs in a wrapper BEFORE the
 * unchanged handleSubmit, and the rest is display copy / link targets.
 */

/** Stable in-page anchor for the checkout form (ReportContent's top CTA links to it). */
export const CHECKOUT_ANCHOR_ID = "report-checkout";

/** Existing support channel, already used by ReportCheckout and the thank-you page. */
export const SUPPORT_WHATSAPP_URL = "https://wa.me/919118877495";

/** Existing refund policy page (app/refund-policy). */
export const REFUND_POLICY_PATH = "/refund-policy";

/**
 * Deliberately permissive email format check: one "@", no spaces, a dot in
 * the domain with a 2+ character ending. Accepts plus-addressing, subdomains,
 * hyphens, digits, long TLDs and uppercase. Surrounding whitespace is ignored
 * (the field is trimmed on blur); it only catches clear typos such as a
 * missing "@" or "name@gmail".
 */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;

export function isValidCheckoutEmail(raw: string): boolean {
  const value = (raw ?? "").trim();
  if (value.length === 0 || value.length > 254) return false;
  if (!EMAIL_RE.test(value)) return false;
  const domain = value.slice(value.indexOf("@") + 1);
  return !domain.startsWith(".") && !domain.includes("..") && !domain.startsWith("-");
}

/** True when the user has typed something that is not a valid email. Empty is left to the existing required-field check. */
export function hasInvalidCheckoutEmail(raw: string): boolean {
  return (raw ?? "").trim().length > 0 && !isValidCheckoutEmail(raw);
}

type Lang = "en" | "hi";

export const CHECKOUT_COPY = {
  invalidEmail: {
    en: "Please enter a valid email address. Your report PDF will be sent to this email.",
    hi: "कृपया सही ईमेल पता दर्ज करें। आपकी रिपोर्ट PDF इसी ईमेल पर भेजी जाएगी।",
  },
  placesUnavailable: {
    en: "City search could not load, so your place of birth cannot be confirmed. Please refresh the page or turn off any ad or tracker blocker.",
    hi: "शहर खोज लोड नहीं हो सकी, इसलिए जन्म स्थान की पुष्टि नहीं हो पा रही है। कृपया पेज रीफ़्रेश करें या कोई ऐड/ट्रैकर ब्लॉकर बंद करें।",
  },
  needHelp: { en: "Need help? Chat with us on WhatsApp", hi: "मदद चाहिए? व्हाट्सएप पर हमसे बात करें" },
  securePayment: { en: "Secure payment via Razorpay", hi: "Razorpay द्वारा सुरक्षित भुगतान" },
  pdfByEmail: { en: "Report PDF sent to your email", hi: "रिपोर्ट PDF आपके ईमेल पर भेजी जाती है" },
  refundPolicy: { en: "Refund policy", hi: "रिफंड नीति" },
  support: { en: "WhatsApp support", hi: "व्हाट्सएप सहायता" },
  topCta: { en: "Get this report", hi: "यह रिपोर्ट पाएं" },
} as const satisfies Record<string, Record<Lang, string>>;

export function topCtaLabel(lang: Lang, price: number): string {
  return `${CHECKOUT_COPY.topCta[lang]} — ₹${price}`;
}

/**
 * Places loading is polled every 300 ms; give up after this many attempts
 * (~60 s) so a load that never settles cannot poll forever.
 */
export const PLACES_POLL_INTERVAL_MS = 300;
export const PLACES_MAX_POLLS = 200;
