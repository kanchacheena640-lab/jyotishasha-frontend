// lib/googleAdsMeasurementBridge.ts

/**
 * Task 6 -- centralized GA4/GTM dataLayer bridge for a SMALL, EXPLICIT
 * allowlist of first-party canonical facts already fired via
 * lib/websiteEvents.ts. This is a SECONDARY, OBSERVATIONAL signal layer
 * only -- see Task 6's own final report for the full PRIMARY/SECONDARY/
 * NOT-A-CONVERSION classification. No event pushed here is, or is ever
 * claimed to be, a Google Ads PRIMARY conversion; financial conversions
 * (payment_verified, subscription_started) remain entirely backend-
 * authoritative and are NEVER duplicated here (Task 6 S4's explicit
 * prohibition against a browser-side "purchase success" signal).
 *
 * Uses `window.dataLayer.push(...)` -- NOT `window.gtag(...)` --
 * because GTM (container GTM-WLP7T2DP, app/[locale]/layout.tsx) is this
 * site's existing, sole tag-management installation, and its own
 * bootstrap snippet only ever defines `window.dataLayer`, never a
 * `window.gtag` shim (Task 1's finding, re-verified for Task 6, still
 * true). Whether any GTM tag/trigger is actually configured to READ
 * these dataLayer events and forward them to GA4/Google Ads is a
 * Google Tag Manager CONSOLE action this repository cannot perform or
 * verify -- see Task 6's own final report's "VERIFIED IN CODE" vs.
 * "REQUIRES CONSOLE CONFIGURATION" split. Nothing here injects a new
 * script, configures GA4, or creates a Google Ads conversion action.
 *
 * DECOUPLED BY CONSTRUCTION from lib/websiteEvents.ts's own first-party
 * delivery: `dataLayer.push()` is a synchronous, local, no-network-call
 * operation -- it cannot be blocked by, wait on, or block the separate
 * `sendAnonymousActivityEvent()` call a caller also makes. Each call
 * site invokes both independently; neither one's success or failure
 * affects the other, and neither is awaited.
 *
 * Never sends: PII, birth data, payment/order details, raw referrer,
 * website session_id, Firebase uid/profile_id, Ask Now content, report
 * content. Every parameter passed through here is exactly one of the
 * same non-sensitive, already-controlled values `lib/websiteEvents.ts`
 * itself already sends to the first-party ledger -- nothing new is
 * exposed to a third party (Google) that wasn't already being computed
 * for the first-party call right next to it.
 *
 * No `page_view` event is ever pushed here -- page views remain
 * exclusively GA4's own automatic collection (frozen contract, Task 1),
 * never duplicated by this bridge.
 */

// Deliberately namespaced ("jyotishasha_" prefix), never a GA4-reserved
// automatically-collected event name (e.g. "purchase", "sign_up",
// "login", "first_open") -- colliding with one of those would corrupt
// GA4's own automatic Enhanced Ecommerce/engagement reporting, a
// separate system this task must not touch.
export type GoogleAdsMeasurementEvent =
  | { name: "jyotishasha_kundali_generated" }
  | { name: "jyotishasha_app_download_intent"; ctaLocation: string }
  | { name: "jyotishasha_report_purchase_intent" };

const ALLOWED_EVENT_NAMES: ReadonlySet<GoogleAdsMeasurementEvent["name"]> = new Set([
  "jyotishasha_kundali_generated",
  "jyotishasha_app_download_intent",
  "jyotishasha_report_purchase_intent",
]);

interface DataLayerLike {
  push: (value: unknown) => unknown;
}

function getDataLayer(): DataLayerLike | undefined {
  if (typeof window === "undefined") return undefined;
  const w = window as unknown as { dataLayer?: unknown[] };
  // Mirrors GTM's own bootstrap snippet exactly (`w[l]=w[l]||[]`,
  // app/[locale]/layout.tsx) -- never assumes GTM has already run
  // first; this bridge works regardless of call order or GTM's own
  // presence/absence (e.g. blocked by an ad blocker).
  if (!Array.isArray(w.dataLayer)) w.dataLayer = [];
  return w.dataLayer as unknown as DataLayerLike;
}

/**
 * Pushes exactly one allowlisted GA4/GTM event to window.dataLayer.
 * Never throws -- a missing window/dataLayer, a blocked script, or any
 * other failure is silently swallowed; this must never block product
 * behavior (navigation, generation, checkout). Callers never await
 * this (dataLayer.push is synchronous and local).
 */
export function pushGoogleAdsMeasurementEvent(event: GoogleAdsMeasurementEvent): void {
  try {
    // Structurally unreachable given the union type above, kept as a
    // hard runtime gate too -- defense in depth against a future
    // caller bypassing the type system.
    if (!ALLOWED_EVENT_NAMES.has(event.name)) return;

    const dataLayer = getDataLayer();
    if (!dataLayer) return;

    const payload: Record<string, unknown> = { event: event.name };
    if (event.name === "jyotishasha_app_download_intent") {
      payload.cta_location = event.ctaLocation;
    }
    dataLayer.push(payload);
  } catch {
    // Analytics must never throw into product code.
  }
}
