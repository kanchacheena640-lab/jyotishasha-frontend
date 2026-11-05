import MarriagePotentialDetail from "./MarriagePotentialDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "विवाह संभावना | ज्‍योतिष आशा" : "Marriage Potential | Jyotishasha",
    description: isHi ? "आपकी विवाह की प्रवृत्ति का संकेतात्मक स्कोर।" : "Your indicative marriage-tendency score.",
  };
}

export default function MarriagePotentialPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <>
      <h1 className="text-3xl md:text-5xl font-black text-center text-emerald-400 bg-[#0f0a1e] pt-10 pb-2 px-4">
        💍 {isHi ? "विवाह संभावना" : "Marriage Potential"}
      </h1>
      <MarriagePotentialDetail locale={params.locale} />
    </>
  );
}