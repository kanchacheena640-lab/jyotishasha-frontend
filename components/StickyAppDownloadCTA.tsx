"use client";

// Task 2D -- promoted to a Client Component (it previously had none of
// its own directive) solely to attach the onClick analytics handler
// below; nothing else about it changes. The parent app/[locale]/
// layout.tsx stays a Server Component -- this is the one small leaf
// boundary needed, not a wholesale layout conversion.
import { WebsiteEvents, buildAppDownloadCtaLocation } from "@/lib/websiteEvents";

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

  const buildLink = () => {
    if (!utm) return base;

    const url = new URL(base);
    url.searchParams.set("utm_source", utm.source);
    url.searchParams.set("utm_medium", utm.medium || "sticky");
    url.searchParams.set("utm_campaign", utm.campaign || "app_download");

    return url.toString();
  };

  const link = buildLink();

  // Task 2D -- fire-and-forget, never awaited; the outbound Play Store
  // navigation proceeds unconditionally regardless of analytics
  // delivery (no preventDefault, no await before the anchor's own
  // default navigation). cta_location is built only from the
  // developer-authored utm.source/medium constants passed in, never
  // from visible button text.
  const handleClick = () => {
    WebsiteEvents.appDownloadIntent(buildAppDownloadCtaLocation(utm, "sticky_app_download_cta", "sticky"));
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
