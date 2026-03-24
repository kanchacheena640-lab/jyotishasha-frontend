import LoveResultSummaryDetail from "./LoveResultSummaryDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "आपका मिलान परिणाम | ज्‍योतिष आशा" : "Your Matchmaking Result | Jyotishasha",
    description: isHi 
      ? "जानिए अपनी अष्टकूट अनुकूलता और मंगल दोष का विवरण।" 
      : "Check your Ashtakoot compatibility and Mangal Dosh details.",
  };
}

export default function LoveResultPage({ params }: { params: { locale: string } }) {
  // Locale ko direct client component mein bhej rahe hain
  return <LoveResultSummaryDetail locale={params.locale} />;
}