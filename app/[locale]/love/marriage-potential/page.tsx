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
  return <MarriagePotentialDetail locale={params.locale} />;
}