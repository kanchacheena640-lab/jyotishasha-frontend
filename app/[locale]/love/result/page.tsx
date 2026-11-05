import LoveResultSummaryDetail from "./LoveResultSummaryDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "आपका मिलान परिणाम | ज्‍योतिष आशा" : "Your Matchmaking Result | Jyotishasha",
    description: isHi 
      ? "जानिए अपनी अष्टकूट अनुकूलता और मंगल दोष का विवरण।" 
      : "Check your Ashtakoot compatibility and Mangal Dosh details.",
  };
}

export default function LoveResultPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <>
      <main lang={isHi ? "hi" : undefined} className="bg-[#FBF8F2]">
      <div className="text-center bg-[#FBF8F2] pt-8 pb-1 px-4">
        <h1 className="text-[30px] md:text-[40px] font-bold leading-tight tracking-tight text-[#1B2A4A]">
          {isHi ? "कुंडली मिलान परिणाम" : "Kundli Matching Result"}
        </h1>
      </div>
      <LoveResultSummaryDetail locale={params.locale} />
      </main>
    </>
  );
}