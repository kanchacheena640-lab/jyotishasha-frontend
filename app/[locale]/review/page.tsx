import type { Metadata } from "next";
import ReviewForm from "@/components/reports/ReviewForm";

// F10-P15: verified-buyer review form, opened from the personal link in the
// report delivery email (the token is in the URL fragment, read client-side).
// Private, per-buyer page: never indexed, never in the sitemap.
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "अपनी रिपोर्ट की समीक्षा करें | ज्‍योतिष आशा" : "Review your report | Jyotishasha",
    robots: { index: false, follow: false },
  };
}

export default function ReviewPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-[#0f0a1e]">
      <ReviewForm lang={params.locale === "hi" ? "hi" : "en"} />
    </div>
  );
}
