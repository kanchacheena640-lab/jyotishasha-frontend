import TruthOrDareDetail from "./TruthOrDareDetail";
import { Metadata } from "next";
import { DetailPageFrame } from "../loveDetailUi";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    // Session-only page (rendered from this browser's sessionStorage): kept out of search results.
    robots: { index: false, follow: true },
    title: isHi ? "ट्रुथ या डेयर: रिलेशनशिप चेक | ज्‍योतिष आशा" : "Truth or Dare: Relationship Check | Jyotishasha",
    description: isHi ? "जानिए अपने रिश्ते की असलियत।" : "Check your relationship reality.",
  };
}

export default function TruthOrDarePage({ params }: { params: { locale: string } }) {
  const isHi = params.locale === "hi";
  return (
    <DetailPageFrame
      isHi={isHi}
      title={isHi ? "रिलेशनशिप रियलिटी चेक: ट्रुथ या डेयर" : "Relationship Reality Check: Truth or Dare"}
      subtitle={isHi ? "दोनों कुंडलियों से रिश्ते के खास पहलू" : "Key relationship themes read from both charts"}
    >
      <TruthOrDareDetail locale={params.locale} />
    </DetailPageFrame>
  );
}