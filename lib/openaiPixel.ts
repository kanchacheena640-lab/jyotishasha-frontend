// lib/openaiPixel.ts

/**
 * OpenAI Ads Measurement Pixel -- `order_created` for verified paid report
 * purchases. Follows https://developers.openai.com/ads/measurement-pixel and
 * https://developers.openai.com/ads/supported-events (verified 2026-11-01).
 *
 * WHAT IS MEASURED
 *   Only the backend-confirmed purchase that lib/ecommerceMeasurement.ts
 *   already measures (pushPurchaseOnce): the purchase_measurement object from
 *   the verified /webhook response. A Razorpay order, a checkout start, a
 *   failed or cancelled payment, a redirect or the thank-you page can never
 *   produce an event. Every paid report family is included (focused,
 *   standard, relationship); the event carries no product_family field
 *   because none is documented for the `contents` data shape.
 *
 * DEDUPE
 *   The call rides on pushPurchaseOnce's existing transaction_id markers
 *   (once per page load, and across loads where GTM consumed the event), and
 *   sends event_id = transaction_id, which OpenAI uses to keep the first
 *   event for (Pixel ID, event name, event_id) and ignore later duplicates.
 *
 * PAYLOAD (documented fields only)
 *   { type: "contents", amount, currency, contents: [{ id, name,
 *   content_type, quantity }] } with { event_id } as the options argument.
 *   amount is an integer in the currency's ISO 4217 minor unit (Rs99 -> 9900).
 *   No user object, no name/email/phone/birth data, no click ids: nothing
 *   beyond the transaction id, the report id/name and the amount. Automatic
 *   advanced matching is an Ads Manager setting and must stay off there.
 *
 * CONSENT
 *   The Pixel stores advertising identifiers (__oppref, __obref), so it
 *   follows lib/adAttribution.ts::isAdvertisingIdentifierStorageAllowed:
 *   NORMAL / US_PRIVACY allowed unless the visitor stored advertising:false,
 *   SAFE_FALLBACK only with a stored advertising:true, EUROPE_CONSENT never
 *   (Google's CMP is the authority there and is not readable here). The
 *   bootstrap sets oaiq("consent", ...) BEFORE oaiq("init", ...), as the
 *   docs require; context/ConsentContext.tsx updates it when the visitor
 *   changes their choice. With consent false the Pixel sends nothing.
 *
 * This module imports nothing, so lib/ecommerceMeasurement.ts stays free of
 * consent imports. Nothing here ever throws into product code.
 */

export const OPENAI_PIXEL_SDK_URL = "https://bzrcdn.openai.com/sdk/oaiq.min.js";
export const OPENAI_ORDER_CREATED = "order_created";

const PIXEL_ID_RE = /^[A-Za-z0-9_-]{8,64}$/;

/** The configured Pixel ID, or null when unset/invalid (the Pixel is then not loaded). */
export function getOpenAiPixelId(raw: string | undefined = process.env.NEXT_PUBLIC_OPENAI_PIXEL_ID): string | null {
  const id = (raw ?? "").trim();
  return PIXEL_ID_RE.test(id) ? id : null;
}

/** Minimal shape read from lib/ecommerceMeasurement.ts's PurchaseMeasurement. */
export interface OpenAiPurchaseInput {
  transaction_id: string;
  value: number;
  currency: string;
  item_id: string;
  item_name?: string;
}

export interface OpenAiContent {
  id: string;
  name?: string;
  content_type: "product";
  quantity: number;
}

export interface OpenAiOrderCreated {
  data: { type: "contents"; amount: number; currency: string; contents: OpenAiContent[] };
  options: { event_id: string };
}

/** ISO 4217 minor-unit digits (INR/USD 2, JPY 0); 2 when the runtime cannot tell. */
export function currencyMinorDigits(currency: string): number {
  try {
    const digits = new Intl.NumberFormat("en", { style: "currency", currency }).resolvedOptions().maximumFractionDigits;
    return typeof digits === "number" && digits >= 0 && digits <= 4 ? digits : 2;
  } catch {
    return 2;
  }
}

/** The documented order_created payload, or null when the input cannot form a valid one. */
export function buildOpenAiOrderCreated(m: OpenAiPurchaseInput): OpenAiOrderCreated | null {
  if (!m || typeof m.transaction_id !== "string" || !m.transaction_id) return null;
  if (typeof m.value !== "number" || !Number.isFinite(m.value) || m.value <= 0) return null;
  if (typeof m.currency !== "string" || !/^[A-Z]{3}$/.test(m.currency)) return null;
  if (typeof m.item_id !== "string" || !m.item_id) return null;
  const amount = Math.round(m.value * 10 ** currencyMinorDigits(m.currency));
  if (!Number.isSafeInteger(amount) || amount <= 0) return null;
  const content: OpenAiContent = { id: m.item_id, content_type: "product", quantity: 1 };
  if (typeof m.item_name === "string" && m.item_name) content.name = m.item_name;
  return {
    data: { type: "contents", amount, currency: m.currency, contents: [content] },
    options: { event_id: m.transaction_id },
  };
}

type OaiqFn = (...args: unknown[]) => unknown;

function browserOaiq(): OaiqFn | null {
  if (typeof window === "undefined") return null;
  const fn = (window as unknown as { oaiq?: unknown }).oaiq;
  return typeof fn === "function" ? (fn as OaiqFn) : null;
}

/**
 * Sends order_created for a verified purchase. Called only from
 * lib/ecommerceMeasurement.ts::pushPurchaseOnce after its dedupe and after the
 * GA4 purchase was pushed. No-op when the Pixel is not loaded. Never throws.
 */
export function measureOpenAiOrderCreated(m: OpenAiPurchaseInput, oaiq: OaiqFn | null = browserOaiq()): boolean {
  try {
    if (!oaiq) return false;
    const event = buildOpenAiOrderCreated(m);
    if (!event) return false;
    oaiq("measure", OPENAI_ORDER_CREATED, event.data, event.options);
    return true;
  } catch {
    return false;
  }
}

/** Mirrors a changed advertising consent decision to the Pixel. Never throws. */
export function setOpenAiConsent(allowed: boolean, oaiq: OaiqFn | null = browserOaiq()): void {
  try {
    oaiq?.("consent", allowed === true);
  } catch {
    // Consent signalling must never break the consent UI.
  }
}

/**
 * The inline <head> bootstrap: resolves consent exactly like
 * isAdvertisingIdentifierStorageAllowed (policy cookie written by
 * middleware.js + the jyotishasha_consent_v1 record; a documented
 * duplication, like app/layout.tsx's consent-default script), then runs the
 * official OpenAI snippet with oaiq("consent", ...) before oaiq("init", ...).
 */
export function buildOpenAiPixelBootstrap(pixelId: string): string {
  if (!PIXEL_ID_RE.test(pixelId)) throw new Error("invalid OpenAI Pixel ID");
  return `
(function () {
  try {
    var allowed = false;
    try {
      var policy = "SAFE_FALLBACK";
      var found = document.cookie.split(";").map(function (c) { return c.trim(); })
        .find(function (c) { return c.indexOf("jyotishasha_geo_policy=") === 0; });
      var raw = found ? found.slice("jyotishasha_geo_policy=".length) : null;
      if (["NORMAL", "US_PRIVACY", "EUROPE_CONSENT", "SAFE_FALLBACK"].indexOf(raw) !== -1) policy = raw;
      var stored = null;
      if (policy !== "EUROPE_CONSENT") {
        try {
          var parsed = JSON.parse(window.localStorage.getItem("jyotishasha_consent_v1") || "null");
          if (parsed && parsed.version === 1 && typeof parsed.analytics === "boolean" && typeof parsed.advertising === "boolean") stored = parsed;
        } catch (e) { stored = null; }
      }
      if (policy === "NORMAL" || policy === "US_PRIVACY") allowed = stored === null || stored.advertising !== false;
      else if (policy === "SAFE_FALLBACK") allowed = !!stored && stored.advertising === true;
    } catch (e) { allowed = false; }

    (function (w, d, s, u) {
      if (w.oaiq) return;
      var q = function () {
        q.q.push(arguments);
      };
      q.q = [];
      w.oaiq = q;
      var js = d.createElement(s);
      js.async = true;
      js.src = u;
      var f = d.getElementsByTagName(s)[0];
      f.parentNode.insertBefore(js, f);
    })(window, document, "script", ${JSON.stringify(OPENAI_PIXEL_SDK_URL)});

    window.oaiq("consent", allowed);
    window.oaiq("init", { pixelId: ${JSON.stringify(pixelId)} });
  } catch (e) {
    // The Pixel must never break page load.
  }
})();
`;
}
