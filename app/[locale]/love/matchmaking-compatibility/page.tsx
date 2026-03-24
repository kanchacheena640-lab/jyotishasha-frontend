import MatchmakingCompatibilityDetail from "./MatchmakingCompatibilityDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "अष्टकूट मिलान रिपोर्ट | ज्‍योतिष आशा" : "Ashtakoot Compatibility Report | Jyotishasha",
    description: isHi 
      ? "विस्तृत 36 गुण मिलान और वैदिक अनुकूलता रिपोर्ट।" 
      : "Detailed 36 Guna Milan and Vedic compatibility report.",
  };
}

export default function MatchmakingCompatibilityPage({ params }: { params: { locale: string } }) {
  // Locale ko Client Component mein bhej rahe hain
  return <MatchmakingCompatibilityDetail locale={params.locale} />;
}