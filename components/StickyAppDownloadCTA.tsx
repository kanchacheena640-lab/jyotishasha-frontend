"use client";

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
          className="block w-full text-center rounded-xl bg-white text-purple-800 font-semibold py-3 text-sm"
        >
          📲 Download Jyotishasha App
        </a>
      </div>
    </div>
  );
}
