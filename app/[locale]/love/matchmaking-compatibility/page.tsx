import MatchmakingCompatibilityDetail from "./MatchmakingCompatibilityDetail";
import { Metadata } from "next";
import { DetailPageFrame } from "../loveDetailUi";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "अष्टकूट मिलान रिपोर्ट | ज्‍योतिष आशा" : "Ashtakoot Compatibility Report | Jyotishasha",
    description: isHi 
      ? "विस्तृत 36 गुण मिलान और वैदिक अनुकूलता रिपोर्ट।" 
      : "Detailed 36 Guna Milan and Vedic compatibility report.",
  };
}

export default function MatchmakingCompatibilityPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <DetailPageFrame
      isHi={isHi}
      title={isHi ? "अष्टकूट मिलान: कूट-वार विवरण" : "Ashtakoot Matching: Koota by Koota"}
      subtitle={isHi ? "आपके 36 गुण मिलान का हर कूट और उसका अर्थ" : "Every koota of your 36 Guna Milan and what it means"}
    >
      <MatchmakingCompatibilityDetail locale={params.locale} />
    </DetailPageFrame>
  );
}