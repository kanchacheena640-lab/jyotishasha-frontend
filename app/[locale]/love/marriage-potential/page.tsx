import MarriagePotentialDetail from "./MarriagePotentialDetail";
import { Metadata } from "next";
import { DetailPageFrame } from "../loveDetailUi";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "विवाह की प्रवृत्ति | ज्‍योतिष आशा" : "Marriage Tendency | Jyotishasha",
    description: isHi ? "आपकी विवाह की प्रवृत्ति का संकेतात्मक स्कोर।" : "Your indicative marriage-tendency score.",
  };
}

export default function MarriagePotentialPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <DetailPageFrame
      isHi={isHi}
      title={isHi ? "विवाह की प्रवृत्ति" : "Marriage Tendency"}
      subtitle={isHi ? "हर कुंडली से निकला संकेतात्मक स्कोर" : "An indicative score read from each birth chart"}
    >
      <MarriagePotentialDetail locale={params.locale} />
    </DetailPageFrame>
  );
}