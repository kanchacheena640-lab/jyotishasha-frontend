import LoveFormPage from "./LoveForm";

export const metadata = {
  title: "Vedic Match-Making & Kundali Milan | Marriage Compatibility Check",
  description:
    "Check Vedic match-making and kundali milan for marriage compatibility. Analyze Manglik (Mangal Dosh), Ashtakoot guna milan and planetary harmony for love and marriage.",
};

export default function LovePage() {
  return (
    <>
      {/* SEO INTRO */}
      <section className="max-w-3xl mx-auto px-6 pt-8 text-gray-800">
        <h1 className="text-2xl font-semibold mb-2">
          Vedic Match-Making & Kundali Milan for Marriage & Compatibility Check
        </h1>
        <p className="text-sm text-gray-600 leading-relaxed">
          Vedic match-making and kundali milan is the traditional method of
          checking marriage compatibility in Vedic astrology. This compatibility
          check evaluates emotional, physical and long-term relationship harmony
          using Ashtakoot guna milan, Manglik (Mangal Dosh) analysis and planetary
          placements from both birth charts.
        </p>
      </section>

      {/* CLIENT FORM */}
      <LoveFormPage />

      <section className="max-w-3xl mx-auto px-6 mt-10 text-gray-700">
        <h2 className="text-xl font-semibold mb-3">
          Why Use Vedic Match-Making & Kundali Milan?
        </h2>
        <p className="text-sm leading-relaxed">
          This Vedic match-making tool helps you check marriage and relationship
          compatibility using authentic kundali milan principles. It analyzes
          Ashtakoot guna milan, Manglik (Mangal Dosh) and planetary harmony to
          understand emotional balance, long-term stability and potential challenges
          before marriage.
        </p>
      </section>

      {/* SEO FAQ SECTION */}
      <section className="max-w-3xl mx-auto px-6 pb-16 mt-12">
        <h2 className="text-xl font-semibold mb-4">
          Match-Making, Kundali Milan & Manglik Dosh – FAQs
        </h2>

        <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <strong>What is Vedic match-making?</strong>
            <p>
              Vedic match-making is the process of comparing two kundalis to
              assess marriage compatibility. It includes kundali milan,
              planetary analysis, Ashtakoot guna milan and dosha evaluation to
              understand long-term marital harmony.
            </p>
          </div>

          <div>
            <strong>What is Ashtakoot Guna Milan?</strong>
            <p>
              Ashtakoot guna milan is an eight-factor compatibility system used
              in kundali matching. It measures mental, emotional, health and
              family compatibility, where a higher score indicates better
              marriage prospects.
            </p>
          </div>

          <div>
            <strong>What is Manglik (Mangal Dosh) in match-making?</strong>
            <p>
              Manglik Dosh occurs when Mars is placed in specific houses of the
              birth chart. In marriage match-making, Manglik analysis is
              essential to identify potential conflicts, delays or instability
              in married life.
            </p>
          </div>

          <div>
            <strong>Is match-making required for love marriages?</strong>
            <p>
              Yes. Even in love marriages, kundali match-making helps identify
              strengths, challenges and long-term compatibility, allowing
              couples to take informed and balanced decisions.
            </p>
          </div>

          <div>
            <strong>Is birth time necessary for accurate compatibility check?</strong>
            <p>
              Birth time significantly improves the accuracy of kundali milan,
              especially for Manglik Dosh and planetary strength analysis.
              However, basic match-making can still be performed using date and
              place of birth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
