import TruthOrDareDetail from "./TruthOrDareDetail";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const isHi = params.locale === "hi";
  return {
    title: isHi ? "ट्रुथ या डेयर: रिलेशनशिप चेक | ज्‍योतिष आशा" : "Truth or Dare: Relationship Check | Jyotishasha",
    description: isHi ? "जानिए अपने रिश्ते की असलियत।" : "Check your relationship reality.",
  };
}

export default function TruthOrDarePage({ params }: { params: { locale: string } }) {
  return <TruthOrDareDetail locale={params.locale} />;
}