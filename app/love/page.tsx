import LoveFormPage from "./LoveForm";
import EEATTrustSnippet from "@/components/EEATTrustSnippet";


export const metadata = {
  title: "Vedic Match-Making & Kundali Milan | Marriage Compatibility Check",
  description:
    "Check Vedic match-making and kundali milan for marriage compatibility. Analyze Manglik (Mangal Dosh), Ashtakoot guna milan and planetary harmony for love and marriage.",
};

export default function LovePage() {
  return (
    <>
      {/* CLIENT FORM — TOP (PRIMARY ACTION) */}
      <LoveFormPage />

      {/* SEO / INFO CONTENT — BELOW FORM */}
      <section className="max-w-3xl mx-auto px-6 mt-16 space-y-12">

        {/* INTRO CARD */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800">
          <h1 className="text-xl font-semibold mb-2">
            Vedic Match-Making & Kundali Milan for Marriage & Compatibility Check
          </h1>
          <p className="text-sm leading-relaxed">
            Vedic match-making and kundali milan is the traditional method of
            checking marriage compatibility in Vedic astrology. This process
            evaluates emotional, physical and long-term relationship harmony
            using Ashtakoot guna milan, Manglik (Mangal Dosh) analysis and
            planetary placements from both birth charts.
          </p>
        </div>

        {/* WHY USE */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800">
          <h2 className="text-lg font-semibold mb-3">
            Why Use Vedic Match-Making & Kundali Milan?
          </h2>
          <p className="text-sm leading-relaxed">
            This Vedic match-making tool helps you check marriage and relationship
            compatibility using authentic kundali milan principles. It analyzes
            Ashtakoot guna milan, Manglik (Mangal Dosh) and planetary harmony to
            understand emotional balance, long-term stability and potential
            challenges before marriage.
          </p>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800">
          <h2 className="text-lg font-semibold mb-4">
            Match-Making, Kundali Milan & Manglik Dosh – FAQs
          </h2>

          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <strong>What is Vedic match-making?</strong>
              <p>
                Vedic match-making is the process of comparing two kundalis to
                assess marriage compatibility using kundali milan, planetary
                analysis, Ashtakoot guna milan and dosha evaluation.
              </p>
            </div>

            <div>
              <strong>What is Ashtakoot Guna Milan?</strong>
              <p>
                Ashtakoot guna milan is an eight-factor compatibility system that
                evaluates mental, emotional, health and family harmony. A higher
                score indicates better marriage prospects.
              </p>
            </div>

            <div>
              <strong>What is Manglik (Mangal Dosh)?</strong>
              <p>
                Manglik Dosh occurs when Mars occupies specific houses in the
                birth chart. Its analysis is essential in match-making to avoid
                conflicts, delays or instability in married life.
              </p>
            </div>

            <div>
              <strong>Is match-making required for love marriages?</strong>
              <p>
                Yes. Even in love marriages, kundali match-making helps identify
                long-term compatibility, strengths and potential challenges.
              </p>
            </div>

            <div>
              <strong>Is birth time necessary?</strong>
              <p>
                Birth time improves accuracy, especially for Manglik Dosh and
                planetary strength analysis. However, basic matching can still
                be done using date and place of birth.
              </p>
            </div>
          </div>
        </div>

        {/* 🔐 EEAT TRUST */}
      <section className="mt-16">
        <EEATTrustSnippet />
      </section>

      </section>
    </>
  );
}
