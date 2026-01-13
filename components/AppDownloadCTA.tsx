"use client";

type UTM = {
  source: string;
  medium?: string;
  campaign?: string;
};

type AppDownloadCTAProps = {
  utm?: UTM;
};

export default function AppDownloadCTA({ utm }: AppDownloadCTAProps) {
  const base =
    "https://play.google.com/store/apps/details?id=com.jyotishasha.app";

  const link = utm
    ? `${base}?utm_source=${encodeURIComponent(utm.source)}&utm_medium=${encodeURIComponent(
        utm.medium || "organic"
      )}&utm_campaign=${encodeURIComponent(
        utm.campaign || "app_download"
      )}`
    : base;

  const handleClick = () => {
    if (typeof window !== "undefined" && (window as any).gtag && utm) {
      (window as any).gtag("event", "app_download_click", {
        event_category: "app_cta",
        source: utm.source,
        medium: utm.medium || "organic",
        campaign: utm.campaign || "app_download",
      });
    }
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
