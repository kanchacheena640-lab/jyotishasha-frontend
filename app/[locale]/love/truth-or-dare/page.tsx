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
  const isHi = params.locale === "hi";
  return (
    <>
      <div className="text-center bg-[#0f0a1e] pt-10 pb-2 px-4">
        <h1 className="text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-300 uppercase tracking-tighter">
          {isHi ? "ट्रुथ या डेयर" : "Truth or Dare"}
        </h1>
      </div>
      <TruthOrDareDetail locale={params.locale} />
    </>
  );
}