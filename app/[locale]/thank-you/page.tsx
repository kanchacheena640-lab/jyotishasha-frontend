import ThankYouDetail from "./ThankYouDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "धन्यवाद | ज्‍योतिष आशा" : "Thank You | Jyotishasha",
    robots: "noindex, nofollow", // Success pages ko index nahi karte
  };
}

export default function ThankYouPage({ params }: { params: { locale: string } }) {
  return <ThankYouDetail locale={params.locale} />;
}