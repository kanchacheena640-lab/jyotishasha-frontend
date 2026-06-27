import MarriagePotentialDetail from "./MarriagePotentialDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "विवाह संभावना | ज्‍योतिष आशा" : "Marriage Potential | Jyotishasha",
    description: isHi ? "आपके विवाह की सफलता की संभावना।" : "Your marriage success probability.",
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