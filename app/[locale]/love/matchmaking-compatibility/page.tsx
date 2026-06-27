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
  const isHi = params.locale === "hi";
  return (
    <>
      <div className="text-center bg-[#0f0a1e] pt-10 pb-2 px-4">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-300">
          🧿 {isHi ? "अष्टकूट मिलान" : "Matchmaking Compatibility"}
        </h1>
      </div>
      {/* Locale ko Client Component mein bhej rahe hain */}
      <MatchmakingCompatibilityDetail locale={params.locale} />
    </>
  );
}