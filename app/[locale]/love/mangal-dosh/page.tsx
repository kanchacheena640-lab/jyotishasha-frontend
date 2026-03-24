import MangalDoshDetail from "./MangalDoshDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "मंगल दोष विश्लेषण | ज्‍योतिष आशा" : "Mangal Dosh Analysis | Jyotishasha",
    description: isHi 
      ? "अपनी कुंडली में मंगल दोष की स्थिति, प्रभाव और सटीक वैदिक उपाय जानें।" 
      : "Detailed Mangal Dosh analysis, its effects on marriage, and Vedic remedies.",
  };
}

export default function MangalDoshPage({ params }: { params: { locale: string } }) {
  // Locale ko direct child mein bhej rahe hain
  return <MangalDoshDetail locale={params.locale} />;
}