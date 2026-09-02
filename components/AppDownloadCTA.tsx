"use client";

import { WebsiteEvents, buildAppDownloadCtaLocation } from "@/lib/websiteEvents";

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

  const buildLink = () => {
    if (!utm) return base;

    const url = new URL(base);

    // ✅ IMPORTANT: base already has id=..., so this will append using "&"
    url.searchParams.set("utm_source", utm.source);
    url.searchParams.set("utm_medium", utm.medium || "organic");
    url.searchParams.set("utm_campaign", utm.campaign || "app_download");

    return url.toString();
  };

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
    WebsiteEvents.appDownloadIntent(buildAppDownloadCtaLocation(utm, "app_download_cta", "organic"));
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
