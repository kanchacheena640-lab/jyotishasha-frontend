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
  const isHi = params.locale === "hi";
  return (
    <>
      <div className="text-center bg-[#0f0a1e] pt-10 pb-2 px-4">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-300 to-orange-300">
          {isHi ? "मिलान परिणाम" : "Matchmaking Result"}
        </h1>
      </div>
      {/* Locale ko direct client component mein bhej rahe hain */}
      <LoveResultSummaryDetail locale={params.locale} />
    </>
  );
}