"use client";

import { WebsiteEvents, buildAppDownloadCtaLocation } from "@/lib/websiteEvents";
import { buildAppDownloadPlayStoreUrl } from "@/lib/playStoreAttribution";
import { pushGoogleAdsMeasurementEvent } from "@/lib/googleAdsMeasurementBridge";

type UTM = {
  source: string;
  medium?: string;
  campaign?: string;
};

type AppDownloadCTAProps = {
  utm?: UTM;
};

export default function AppDownloadCTA({ utm }: AppDownloadCTAProps) {
  const base = "https://play.google.com/store/apps/details?id=com.jyotishasha.app";

  // ✅ IMPORTANT: base already has id=..., so buildAppDownloadPlayStoreUrl
  // appends using "&". Task 5 -- also ADDS Google Play's official
  // `referrer` parameter alongside the existing utm_* params (which are
  // unchanged and continue to feed Play Console's own acquisition
  // reports); `referrer` is the one value the installed app can
  // actually recover via the Play Install Referrer API -- see
  // lib/playStoreAttribution.ts's own docstring for why the plain
  // utm_* params alone are not enough.
  const buildLink = () =>
    buildAppDownloadPlayStoreUrl(base, utm, {
      defaultMedium: "organic",
      defaultCampaign: "app_download",
      ctaLocationFallback: "app_download_cta",
    });

  const link = buildLink();

  const handleClick = () => {
    // Task 1 found this call's guard (`window.gtag`) is very likely
    // never satisfied -- the GTM snippet this site loads only ever
    // defines window.dataLayer, not a window.gtag shim -- but that
    // can't be proven from this repo alone (a GTM container tag could
    // define one), and removing a call that might feed an existing GTM
    // trigger risks silently breaking a live GTM configuration this
    // repo can't see. Preserved exactly as-is, unmodified; the Task 2D
    // first-party event below does NOT depend on it existing or firing.
    if (typeof window !== "undefined" && (window as any).gtag && utm) {
      (window as any).gtag("event", "app_download_click", {
        event_category: "app_cta",
        source: utm.source,
        medium: utm.medium || "organic",
        campaign: utm.campaign || "app_download",
      });
    }

    // Task 2D -- fire-and-forget, never awaited; the outbound Play
    // Store navigation (the <a href> below) proceeds unconditionally
    // regardless of analytics delivery. cta_location is built only
    // from the developer-authored utm.source/medium constants each
    // call site already passes -- never from visible/localized button
    // text. Only app_download_intent fires here, deliberately not also
    // cta_click: for a single-purpose download CTA the two would name
    // the exact same fact twice, not two distinct facts.
    const ctaLocation = buildAppDownloadCtaLocation(utm, "app_download_cta", "organic");
    WebsiteEvents.appDownloadIntent(ctaLocation);

    // Task 6 -- SECONDARY GA4/GTM observation signal, decoupled from the
    // first-party call above. Still an intent, not an install -- never
    // claimed as a Google Ads conversion by this bridge.
    pushGoogleAdsMeasurementEvent({ name: "jyotishasha_app_download_intent", ctaLocation });
  };

  return (
    <div className="my-8 rounded-2xl border border-purple-400/30 bg-gradient-to-r from-purple-600/10 to-purple-800/10 p-5 text-center">
      <p className="text-purple-200 font-semibold mb-2">
        📱 Get personalized Muhurat & daily guidance
      </p>
      <p className="text-gray-300 text-sm mb-4">
        Free Kundali • Daily Astrology • No calls • Pocket-friendly
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="inline-block rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
      >
        Download Jyotishasha App
      </a>
    </div>
  );
}
