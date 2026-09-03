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
        {/* Task 8 -- Google Consent Mode v2 default, established BEFORE
            any other script (including the GTM container bootstrap in
            app/[locale]/layout.tsx) can run. `strategy="beforeInteractive"`
            is a hard Next.js guarantee (root-layout-only), not a JSX-order
            assumption -- this is what makes the ordering structurally
            correct rather than a race. See lib/consent.ts for the
            TypeScript-side mirror of this exact contract (storage key,
            version, and Google Consent Mode mapping); this inline script
            necessarily duplicates that logic in plain JS because it must
            run with zero bundled imports, before hydration -- keep both
            in sync if the consent contract (jyotishasha_consent_v1,
            version 1) ever changes.
            Default for a visitor with no stored decision: everything
            denied (ad_storage, analytics_storage, ad_user_data,
            ad_personalization). A visitor with a valid stored decision
            gets that decision reflected immediately, every load -- this
            script does NOT reset a returning visitor's consent to denied
            on every page view. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            (function () {
              try {
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