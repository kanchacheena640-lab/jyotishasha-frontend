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
 * Mounted once from app/[locale]/layout.tsx (a Server Component) --
 * this is the one small client-boundary needed for that; the rest of
 * the locale layout stays exactly as it was, per S13's "do not turn
 * entire layouts into client components unnecessarily."
 */

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { getOrCreateAnalyticsSessionId } from "@/lib/analyticsSession";
import { getOrCreateAttribution } from "@/lib/analyticsAttribution";

export default function WebsiteAnalyticsInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      getOrCreateAnalyticsSessionId(window.sessionStorage);
      getOrCreateAttribution(window.sessionStorage, {
        search: window.location.search,
        referrer: document.referrer,
        pathname: pathname || window.location.pathname,
        currentOrigin: window.location.origin,
      });
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
