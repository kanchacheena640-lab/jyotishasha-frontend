"use client";

// Task 2D -- promoted to a Client Component (it previously had none of
// its own directive) solely to attach the onClick analytics handler
// below; nothing else about it changes. The parent app/[locale]/
// layout.tsx stays a Server Component -- this is the one small leaf
// boundary needed, not a wholesale layout conversion.
import { WebsiteEvents, buildAppDownloadCtaLocation } from "@/lib/websiteEvents";
import { buildAppDownloadPlayStoreUrl } from "@/lib/playStoreAttribution";
import { pushGoogleAdsMeasurementEvent } from "@/lib/googleAdsMeasurementBridge";

type UTM = {
  source: string;
  medium?: string;
  campaign?: string;
};

type StickyAppDownloadCTAProps = {
  utm?: UTM;
};

export default function StickyAppDownloadCTA({
  utm,
}: StickyAppDownloadCTAProps) {
  const base =
    "https://play.google.com/store/apps/details?id=com.jyotishasha.app";

  // Task 5 -- also ADDS Google Play's official `referrer` parameter
  // alongside the existing utm_* params (unchanged, still feed Play
  // Console's own acquisition reports). See lib/playStoreAttribution.ts's
  // docstring for why this is the one value the installed app can
  // actually recover post-install.
  const buildLink = () =>
    buildAppDownloadPlayStoreUrl(base, utm, {
      defaultMedium: "sticky",
      defaultCampaign: "app_download",
      ctaLocationFallback: "sticky_app_download_cta",
    });

  const link = buildLink();

  // Task 2D -- fire-and-forget, never awaited; the outbound Play Store
  // navigation proceeds unconditionally regardless of analytics
  // delivery (no preventDefault, no await before the anchor's own
  // default navigation). cta_location is built only from the
  // developer-authored utm.source/medium constants passed in, never
  // from visible button text.
  const handleClick = () => {
    const ctaLocation = buildAppDownloadCtaLocation(utm, "sticky_app_download_cta", "sticky");
    WebsiteEvents.appDownloadIntent(ctaLocation);

    // Task 6 -- SECONDARY GA4/GTM observation signal, decoupled from the
    // first-party call above. Still an intent, not an install -- never
    // claimed as a Google Ads conversion by this bridge.
    pushGoogleAdsMeasurementEvent({ name: "jyotishasha_app_download_intent", ctaLocation });
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-40 md:hidden
        pb-[env(safe-area-inset-bottom)]
      "
    >
      <div className="bg-gradient-to-r from-purple-700 to-purple-900 px-4 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.35)]">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block w-full text-center rounded-xl bg-white text-purple-800 font-semibold py-3 text-sm"
        >
          📲 Download Jyotishasha App
        </a>
      </div>
    </div>
  );
}
