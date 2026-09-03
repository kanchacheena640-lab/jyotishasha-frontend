// lib/websiteEvents.ts

/**
 * Task 2D -- a small, typed facade over Task 2C's
 * sendAnonymousActivityEvent(), one method per canonical event this
 * task actually wires a producer for. Mirrors the Flutter app's own
 * lib/core/analytics/activity_events.dart `ActivityEvents` class
 * (same naming, same one-method-per-event shape, same fire-and-forget
 * contract) so a call site can never construct a raw properties object
 * itself and can never accidentally add an extra/forbidden key -- each
 * method builds EXACTLY the frozen properties shape for its event and
 * nothing else.
 *
 * Every method is fire-and-forget and returns void, not a Promise a
 * caller might feel obliged to await -- sendAnonymousActivityEvent()
 * itself never throws (Task 2C), so there is nothing to catch here
 * either. No product call site in this task awaits any of these.
 *
 * Deliberately narrow: only the 4 events an actual producer exists for
 * in this task (cta_click, feature_used, app_download_intent,
 * report_discovery_viewed). No subscription_discovery_viewed method --
 * Task 2D's own forensic pass found no live subscription-discovery
 * product seam on the website to call it from (see the Task 2D final
 * report's DEFER section); adding an unused method here would invite a
 * future accidental call site with no real discovery moment behind it.
 *
 * Task 9A -- every method below now also attaches `page_path` (see
 * lib/pagePath.ts), derived automatically at CALL TIME via
 * getCurrentPagePath(). This is deliberate architecture choice A over
 * B (Task 9A S9): existing and future producers get action-page
 * context for free, without every call site remembering to supply one
 * -- no method signature below changed. Omitted (never a fallback
 * value) when the current pathname is unavailable/unsafe (SSR, or a
 * malformed value) -- see getCurrentPagePath()'s own contract.
 */

import { sendAnonymousActivityEvent } from "./anonymousActivityEventClient";
import { getCurrentPagePath } from "./pagePath";

type EventProperties = Record<string, string | number | boolean>;

/** Attaches `page_path` (call-time current pathname) to a producer's
 * own frozen properties, only when a safe value is available -- never
 * adds the key at all otherwise (an absent page_path, not an invented
 * placeholder, is how "unavailable" is represented on the wire). */
function withPagePath(properties: EventProperties): EventProperties {
  const pagePath = getCurrentPagePath();
  return pagePath ? { ...properties, page_path: pagePath } : properties;
}

export const WebsiteEvents = {
  /** `cta_click` -- frozen properties: {cta_id, screen_name}, plus
   * `page_path` (Task 9A) when available. */
  ctaClick(ctaId: string, screenName: string): void {
    void sendAnonymousActivityEvent({
      eventName: "cta_click",
      properties: withPagePath({ cta_id: ctaId, screen_name: screenName }),
    });
  },

  /** `feature_used` -- frozen properties: {feature_name}, plus
   * `page_path` (Task 9A) when available. Callers must only invoke
   * this at an actual feature-invocation/success boundary -- never on
   * a landing/marketing view, never on render. */
  featureUsed(featureName: string): void {
    void sendAnonymousActivityEvent({
      eventName: "feature_used",
      properties: withPagePath({ feature_name: featureName }),
    });
  },

  /** `app_download_intent` -- frozen properties: {cta_location}, plus
   * `page_path` (Task 9A) when available. `cta_location` (which CTA
   * placement/component was clicked) and `page_path` (which page it
   * was clicked from) are DIFFERENT dimensions -- neither replaces the
   * other; this matters most for the globally-mounted sticky CTA
   * (`site_global_sticky_cta`), whose own cta_location value is
   * identical on every page. Fired only on an actual click/tap toward
   * the store -- never on render/impression. */
  appDownloadIntent(ctaLocation: string): void {
    void sendAnonymousActivityEvent({
      eventName: "app_download_intent",
      properties: withPagePath({ cta_location: ctaLocation }),
    });
  },

  /** `report_discovery_viewed` -- frozen properties: {report_type}
   * (optional, never sent here -- see below), plus `page_path` (Task
   * 9A) when available. No report_type is sent here: this fires once
   * for the report CATALOG page as a whole (many report types at
   * once), not for one specific type -- fabricating a single
   * report_type value for a multi-report listing would misrepresent
   * the fact. */
  reportDiscoveryViewed(): void {
    void sendAnonymousActivityEvent({
      eventName: "report_discovery_viewed",
      properties: withPagePath({}),
    });
  },
};

/**
 * Shared, pure, unit-testable formula for both AppDownloadCTA.tsx and
 * StickyAppDownloadCTA.tsx's `cta_location` -- built only from the
 * developer-authored `utm.source`/`utm.medium` constants each call site
 * already passes (never from visible/localized button text, per Task
 * 2D's privacy requirement). `fallback` covers the (currently unused in
 * practice, since every real call site passes `utm`) case where no utm
 * prop is supplied at all.
 */
export function buildAppDownloadCtaLocation(
  utm: { source: string; medium?: string } | undefined,
  fallback: string,
  defaultMedium: string
): string {
  return utm ? `${utm.source}_${utm.medium || defaultMedium}` : fallback;
}
