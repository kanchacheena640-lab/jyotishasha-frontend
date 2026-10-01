"use client";

// A plain "download the app" link that keeps the CALLER's own label and
// styling, for CTAs embedded in otherwise server-rendered pages (transit house
// pages, daily-horoscope sign pages, the blogs hub). Same mechanism as
// AppDownloadCTA.tsx / StickyAppDownloadCTA.tsx -- the canonical Play Store URL
// built by buildAppDownloadPlayStoreUrl (utm_* + Play `referrer`), and on click
// the first-party app_download_intent event plus the secondary GTM signal.
// cta_location comes only from the developer-authored utm constants, never
// from the visible (localized) label.
import type { ReactNode } from "react";
import { WebsiteEvents, buildAppDownloadCtaLocation } from "@/lib/websiteEvents";
import { buildAppDownloadPlayStoreUrl } from "@/lib/playStoreAttribution";
import { pushMarketingMeasurementEvent } from "@/lib/marketingMeasurementBridge";

const PLAY_STORE_BASE = "https://play.google.com/store/apps/details?id=com.jyotishasha.app";
const DEFAULT_MEDIUM = "content_cta";
const CTA_LOCATION_FALLBACK = "app_download_link";

type UTM = {
  source: string;
  medium?: string;
  campaign?: string;
};

type AppDownloadLinkProps = {
  utm: UTM;
  className?: string;
  children: ReactNode;
};

export default function AppDownloadLink({ utm, className, children }: AppDownloadLinkProps) {
  const link = buildAppDownloadPlayStoreUrl(PLAY_STORE_BASE, utm, {
    defaultMedium: DEFAULT_MEDIUM,
    defaultCampaign: "app_download",
    ctaLocationFallback: CTA_LOCATION_FALLBACK,
  });

  // Fire-and-forget; the outbound navigation never waits for analytics.
  const handleClick = () => {
    const ctaLocation = buildAppDownloadCtaLocation(utm, CTA_LOCATION_FALLBACK, DEFAULT_MEDIUM);
    WebsiteEvents.appDownloadIntent(ctaLocation);
    pushMarketingMeasurementEvent({ name: "jyotishasha_app_download_intent", ctaLocation });
  };

  return (
    <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
