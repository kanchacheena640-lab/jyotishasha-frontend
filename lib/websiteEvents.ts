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
 */

import { sendAnonymousActivityEvent } from "./anonymousActivityEventClient";

export const WebsiteEvents = {
  /** `cta_click` -- frozen properties: {cta_id, screen_name} only. */
  ctaClick(ctaId: string, screenName: string): void {
    void sendAnonymousActivityEvent({
      eventName: "cta_click",
      properties: { cta_id: ctaId, screen_name: screenName },
    });
  },

  /** `feature_used` -- frozen properties: {feature_name} only. Callers
   * must only invoke this at an actual feature-invocation/success
   * boundary -- never on a landing/marketing view, never on render. */
  featureUsed(featureName: string): void {
    void sendAnonymousActivityEvent({
      eventName: "feature_used",
      properties: { feature_name: featureName },
    });
  },

  /** `app_download_intent` -- frozen properties: {cta_location} only.
   * Fired only on an actual click/tap toward the store -- never on
   * render/impression. */
  appDownloadIntent(ctaLocation: string): void {
    void sendAnonymousActivityEvent({
      eventName: "app_download_intent",
      properties: { cta_location: ctaLocation },
    });
  },

  /** `report_discovery_viewed` -- frozen properties: {report_type}
   * (optional). No report_type is sent here: this fires once for the
   * report CATALOG page as a whole (many report types at once), not
   * for one specific type -- fabricating a single report_type value
   * for a multi-report listing would misrepresent the fact. */
  reportDiscoveryViewed(): void {
    void sendAnonymousActivityEvent({ eventName: "report_discovery_viewed" });
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
