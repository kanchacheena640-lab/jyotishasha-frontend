import "./globals.css";
import type { Metadata } from "next";
import Script from "next/script";
import ConditionalAdSense from "../components/ConditionalAdSense";
import { ConsentProvider } from "@/context/ConsentContext";
import ConsentBanner from "@/components/consent/ConsentBanner";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.jyotishasha.com"),
  title: "Jyotishasha",
  description: "Astrology Reports and Tools",
  icons: { icon: "/favicon.ico" },
  openGraph: {
    siteName: "Jyotishasha",
    images: [
      {
        url: "https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg",
        width: 1730,
        height: 909,
        alt: "Jyotishasha – Free Kundali, Panchang & Muhurat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://www.jyotishasha.com/og/jyotishasha-og-banner.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        {/* Geo-Aware Consent v1, Phase 2B -- Google Consent Mode v2
            bootstrap, established BEFORE any other script (including
            the GTM container bootstrap in app/[locale]/layout.tsx) can
            run. `strategy="beforeInteractive"` is a hard Next.js
            guarantee (root-layout-only), not a JSX-order assumption --
            this is what makes the ordering structurally correct rather
            than a race.

            This REPLACES the temporary India-only diagnostic bypass
            (commit aa12e67, `jyotishasha_geo_country === "IN"`) with the
            general, policy-driven behavior from lib/geo.ts /
            middleware.js's jyotishasha_geo_policy cookie. See
            lib/consent.ts::readConsentGeoPolicyCookie() for the
            TypeScript-side mirror of the cookie-reading logic (this
            inline script necessarily duplicates it in plain JS because
            it must run with zero bundled imports, before hydration --
            keep both in sync); see context/ConsentContext.tsx's own
            docstring for the parallel per-policy rules that govern the
            separate Jyotishasha custom banner (never Consent Mode
            itself).

            Per-policy behavior (Geo-Aware Consent v1 Phase 2B contract):
              NORMAL / US_PRIVACY -- issues NO consent command at all.
                Not a synthesized "granted" choice either -- simply
                nothing, so Google's own tags apply their own default,
                exactly restoring pre-Sep-4 measurement behavior. This is
                the same mechanism the India-only bypass proved works in
                production, now applied to its correct general case.
              EUROPE_CONSENT -- explicit denied default on all four
                signals, ALWAYS -- Google's certified Privacy & Messaging
                CMP (published for jyotishasha.com) is the sole consent
                authority for this region, so this deliberately never
                reads jyotishasha_consent_v1 here; a stale/local decision
                must never override the CMP.
              SAFE_FALLBACK -- the original Task 8 behavior, unchanged:
                explicit denied default, but a visitor's own valid stored
                decision (jyotishasha_consent_v1) is honored immediately.
            An unrecognized/missing policy cookie value safely falls back
            to SAFE_FALLBACK (fail closed), never to NORMAL/US_PRIVACY's
            no-command behavior. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            (function () {
              try {
                function readCookie(name) {
                  var found = document.cookie.split(";").map(function (c) {
                    return c.trim();
                  }).find(function (c) {
                    return c.indexOf(name + "=") === 0;
                  });
                  return found ? found.slice(name.length + 1) : null;
                }

                var VALID_POLICIES = ["NORMAL", "US_PRIVACY", "EUROPE_CONSENT", "SAFE_FALLBACK"];
                var rawPolicy = readCookie("jyotishasha_geo_policy");
                var policy = VALID_POLICIES.indexOf(rawPolicy) !== -1 ? rawPolicy : "SAFE_FALLBACK";

                if (policy === "NORMAL" || policy === "US_PRIVACY") {
                  return;
                }

                window.dataLayer = window.dataLayer || [];
                if (typeof window.gtag !== "function") {
                  window.gtag = function () { window.dataLayer.push(arguments); };
                }

                var consent = {
                  ad_storage: "denied",
                  analytics_storage: "denied",
                  ad_user_data: "denied",
                  ad_personalization: "denied"
                };

                // Only SAFE_FALLBACK honors a stored Jyotishasha decision --
                // EUROPE_CONSENT must never let a stale/local choice
                // override Google's certified CMP for that region.
                if (policy === "SAFE_FALLBACK") {
                  try {
                    var raw = window.localStorage.getItem("jyotishasha_consent_v1");
                    if (raw) {
                      var parsed = JSON.parse(raw);
                      if (
                        parsed &&
                        parsed.version === 1 &&
                        typeof parsed.analytics === "boolean" &&
                        typeof parsed.advertising === "boolean"
                      ) {
                        consent = {
                          analytics_storage: parsed.analytics ? "granted" : "denied",
                          ad_storage: parsed.advertising ? "granted" : "denied",
                          ad_user_data: parsed.advertising ? "granted" : "denied",
                          ad_personalization: parsed.advertising ? "granted" : "denied"
                        };
                      }
                    }
                  } catch (e) {
                    // Malformed/blocked storage -- fall back to the safe
                    // fully-denied default declared above.
                  }
                }

                window.gtag("consent", "default", consent);
              } catch (e) {
                // Consent bootstrap must never break page load.
              }
            })();
          `}
        </Script>

        {/* ✅ Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WLP7T2DP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        {/* Google Maps and Razorpay are no longer loaded globally here.
            Maps is loaded on demand by components/PlaceAutocompleteInput.tsx
            (only on the routes that actually render a place-of-birth field).
            Razorpay is loaded on demand by hooks/useReportPurchase.ts (only
            when a purchase is actually initiated). Previously both scripts
            executed on every page regardless of need. */}

        {/* Task 8 -- consent context lives at the ROOT layout (not
            app/[locale]/layout.tsx) deliberately: app/reports/ is its
            own separate route tree outside [locale] (confirmed by
            inspection -- app/reports/layout.tsx even re-initializes
            i18n itself for exactly this reason) and still needs
            Footer.tsx's Cookie Settings link to work correctly, so the
            provider (and the banner, so every route -- not just
            locale-scoped ones -- gets the first-visit prompt) must wrap
            both trees at their common ancestor. */}
        <ConsentProvider>
          {children}
          {/* Google AdSense — lazyOnload keeps it out of the critical path.
              Suppressed on purchase-intent, payment, and legal/policy routes;
              see components/ConditionalAdSense.tsx for the excluded list. */}
          <ConditionalAdSense />
          <ConsentBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}