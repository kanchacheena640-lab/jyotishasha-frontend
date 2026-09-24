"use client";

/**
 * Task 2C -- the smallest possible client-side seam that establishes
 * the website analytics session_id and first-touch attribution
 * (lib/analyticsSession.ts, lib/analyticsAttribution.ts) once a website
 * visitor enters the locale application.
 *
 * Renders nothing (returns null) and emits NO activity event -- this
 * component only establishes sessionStorage context; it is explicitly
 * NOT a page_view tracker and NOT a route-change listener (Task 2C S13/
 * S15/W: "Task 2C establishes context only"). No product/feature event
 * producer is wired here or anywhere else in this task (S14).
 *
 * Mounted once from the ROOT layout (app/layout.tsx), which wraps both
 * the [locale] tree and the standalone /reports tree, so exactly ONE
 * initialization runs per page load and every landing route is covered
 * (Reports Ads P0.1 -- it used to be mounted from app/[locale]/layout.tsx,
 * which never wrapped /reports; that mount was REMOVED, not duplicated).
 * A Server Component root layout only needs this one small client
 * boundary.
 *
 * Reports Ads P0.1 also calls syncAdAttributionFromBrowser() (lib/
 * adAttribution.ts) here: full UTM set + gclid/gbraid/wbraid/fbclid in a
 * consent-gated, 90-day first-party record. All consent logic lives in
 * that module, so this file still imports nothing from consent.
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getOrCreateAnalyticsSessionId } from "@/lib/analyticsSession";
import { getOrCreateAttribution } from "@/lib/analyticsAttribution";
import { syncAdAttributionFromBrowser } from "@/lib/adAttribution";

export default function WebsiteAnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Admin pages are not landing/attribution surfaces.
    if (window.location.pathname.startsWith("/admin")) return;
    try {
      getOrCreateAnalyticsSessionId(window.sessionStorage);
      getOrCreateAttribution(window.sessionStorage, {
        search: window.location.search,
        referrer: document.referrer,
        pathname: pathname || window.location.pathname,
        currentOrigin: window.location.origin,
      });
      syncAdAttributionFromBrowser(pathname || window.location.pathname);
    } catch {
      // Both functions above already never throw on their own (see
      // their own module docstrings) -- this catch is a final,
      // deliberately redundant backstop: analytics initialization must
      // never be able to break the product shell it mounts into.
    }
    // Deliberately mount-once (empty dependency array), not re-run on
    // every pathname change -- getOrCreateAttribution's own read-once-
    // then-persist behavior already makes a repeat call a correct
    // no-op, but running the effect itself only once keeps this
    // component's intent unambiguous and avoids a redundant
    // sessionStorage read on every SPA navigation. Same
    // deliberate-mount-once pattern already used by this codebase's own
    // components/PlaceAutocompleteInput.tsx.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
