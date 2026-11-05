import MangalDoshDetail from "./MangalDoshDetail";
import { Metadata } from "next";
import { DetailPageFrame } from "../loveDetailUi";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "मंगल दोष विश्लेषण | ज्‍योतिष आशा" : "Mangal Dosh Analysis | Jyotishasha",
    description: isHi
      ? "वर और वधू की कुंडलियों में मंगल दोष की तुलना।"
      : "Mangal Dosh compared across the groom's and bride's charts.",
  };
}

export default function MangalDoshPage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <DetailPageFrame
      isHi={isHi}
      title={isHi ? "मंगल दोष विश्लेषण" : "Mangal Dosh Analysis"}
      subtitle={isHi ? "दोनों कुंडलियों में मंगल की स्थिति की तुलना" : "How Mars is placed in both charts, compared"}
    >
      <MangalDoshDetail locale={params.locale} />
    </DetailPageFrame>
  );
}