// lib/marketingMeasurementBridge.ts

/**
 * Task 6 (as googleAdsMeasurementBridge.ts) / Task 7 (generalized,
 * renamed, behavior-preserved) -- centralized GTM dataLayer bridge for
 * a SMALL, EXPLICIT allowlist of first-party canonical facts already
 * fired via lib/websiteEvents.ts.
 *
 * WHY THIS FILE WAS RENAMED (Task 7): Task 6's own `dataLayer.push()`
 * payload shape was already destination-neutral -- plain
 * `{event: "...", ...}` objects, nothing Google-specific in the wire
 * format at all -- but the FILE/type/function names
 * (googleAdsMeasurementBridge.ts, GoogleAdsMeasurementEvent,
 * pushGoogleAdsMeasurementEvent) implied a Google-only mechanism.
 * Without this rename, Task 8 (Meta) would very plausibly have created
 * a SEPARATE metaMeasurementBridge.ts with its own allowlist and its
 * own calls sprinkled next to these same 3 product surfaces --
 * exactly the "product code calls WebsiteEvents + Google-specific
 * bridge + Meta-specific bridge independently" duplication Task 7's
 * own brief warns against. One product fact still occurs once and
 * pushes to `dataLayer` once; which destination(s) (GA4, Meta, both,
 * neither) a GTM tag/trigger forwards it to is entirely a GTM CONSOLE
 * decision this repository cannot make or verify -- see Task 7's own
 * final report's "VERIFIED IN CODE" vs. "REQUIRES CONSOLE
 * CONFIGURATION" split.
 *
 * EVENT NAMES, PAYLOAD SHAPES, AND BEHAVIOR ARE ALL BYTE-IDENTICAL TO
 * TASK 6 -- this is a rename/generalization only, not a redesign:
 *
 *   jyotishasha_kundali_generated
 *   jyotishasha_app_download_intent   { cta_location }
 *   jyotishasha_report_purchase_intent
 *
 * No event pushed here is, or is ever claimed to be, a PRIMARY
 * conversion for any destination. Financial conversions
 * (payment_verified, subscription_started) remain entirely backend-
 * authoritative and are NEVER duplicated here (Task 6 S4 / Task 7 S9's
 * explicit prohibition against a browser-side "purchase success"
 * signal, for either Google or Meta).
 *
 * Uses `window.dataLayer.push(...)` -- NOT `window.gtag(...)`, NOT
 * `window.fbq(...)` -- because GTM (container GTM-WLP7T2DP,
 * app/[locale]/layout.tsx) is this site's existing, sole tag-management
 * installation, and its own bootstrap snippet only ever defines
 * `window.dataLayer` (Task 1's finding, re-verified for Task 7, still
 * true -- no Meta Pixel base code and no direct `fbq` shim exist
 * anywhere in this repository, confirmed by search). Nothing here
 * injects a new script, installs Meta Pixel, configures GA4, or
 * creates any conversion action for any platform.
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
 * content, fbclid/_fbc/_fbp (none of which this repository captures at
 * all -- see Task 7's own final report). Every parameter passed through
 * here is exactly one of the same non-sensitive, already-controlled
 * values `lib/websiteEvents.ts` itself already sends to the first-party
 * ledger -- nothing new is exposed to any third party that wasn't
 * already being computed for the first-party call right next to it.
 *
 * No `page_view` event is ever pushed here -- page views remain
 * exclusively GA4's own automatic collection (frozen contract, Task 1),
 * never duplicated by this bridge.
 */

// Deliberately namespaced ("jyotishasha_" prefix), never a GA4-reserved
// automatically-collected event name (e.g. "purchase", "sign_up",
// "login", "first_open") and never a Meta standard-event name sent
// prematurely (e.g. "Purchase", "Subscribe", "Lead") -- colliding with
// either would corrupt that destination's own automatic reporting or
// misrepresent an unconfirmed action as a real conversion. Mapping one
// of these to a Meta standard event name (via a GTM tag's own
// configuration, if ever done) is a future, console-side, Task 8
// decision -- not something this file performs.
export type MarketingMeasurementEvent =
  | { name: "jyotishasha_kundali_generated" }
  | { name: "jyotishasha_app_download_intent"; ctaLocation: string }
  | { name: "jyotishasha_report_purchase_intent" };

const ALLOWED_EVENT_NAMES: ReadonlySet<MarketingMeasurementEvent["name"]> = new Set([
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
 * Pushes exactly one allowlisted event to window.dataLayer. Never
 * throws -- a missing window/dataLayer, a blocked script, or any other
 * failure is silently swallowed; this must never block product
 * behavior (navigation, generation, checkout). Callers never await
 * this (dataLayer.push is synchronous and local).
 */
export function pushMarketingMeasurementEvent(event: MarketingMeasurementEvent): void {
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
