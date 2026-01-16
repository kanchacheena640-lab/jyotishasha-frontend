import LoveFormPage from "./LoveForm";

export const metadata = {
  title: "Free Kundli Matching for Marriage | Love Compatibility Astrology",
  description:
    "Check free kundli matching for marriage using Vedic astrology. Analyze Ashtakoot Guna Milan, Manglik (Mangal Dosh) and love compatibility for a successful married life.",
};

export default function LovePage() {
  return (
    <>
      {/* CLIENT FORM — TOP (PRIMARY ACTION) */}
      <LoveFormPage />

      {/* SEO / INFO CONTENT — BELOW FORM */}
      <section className="max-w-3xl mx-auto px-6 mt-16 space-y-8 pb-20">
        
        {/* SECTION 1: INTRODUCTION & WHAT IS KUNDLI MATCHING */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800 border-t-4 border-orange-400">
          <h1 className="text-2xl font-bold mb-4 text-gray-900">
            Free Kundli Matching for Marriage & Love Compatibility
          </h1>
          <p className="text-sm leading-relaxed mb-4">
            Kundli matching for marriage is a traditional Vedic astrology method used to 
            evaluate compatibility between a prospective bride and groom. This process, 
            also known as <strong>Guna Milan</strong>, compares planetary positions, Moon signs, 
            and Nakshatras from both birth charts to understand emotional, mental, and long-term 
            relationship harmony.
          </p>
          <p className="text-sm leading-relaxed">
            In Vedic astrology, marriage is considered a lifelong partnership. Kundli matching 
            helps identify strengths and potential challenges before marriage, making it an 
            essential step for both <strong>arranged and love marriages</strong>.
          </p>
        </div>

        {/* SECTION 2: ASHTAKOOT GUNA MILAN (DETAILED) */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800">
          <h2 className="text-lg font-semibold mb-3 text-gray-900">
            How Ashtakoot Guna Milan Works
          </h2>
          <p className="text-sm leading-relaxed mb-4">
            Ashtakoot Guna Milan is an eight-factor compatibility system that assigns a 
            total of 36 points. These factors analyze mental bonding, mutual attraction, 
            and family harmony:
          </p>
          {/* Visual Grid for 8 Gunas - High SEO value */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            {["Varna", "Vashya", "Tara", "Yoni", "Graha Maitri", "Gana", "Bhakoot", "Nadi"].map((guna) => (
              <div key={guna} className="bg-gray-50 border border-gray-100 rounded-lg p-2 text-center text-xs font-medium text-gray-600">
                {guna}
              </div>
            ))}
          </div>
          <p className="text-sm leading-relaxed">
            A higher Guna score generally indicates better marriage compatibility, while 
            lower scores highlight areas that may need astrological remedies or deeper understanding.
          </p>
        </div>

        {/* SECTION 3: MANGLIK DOSH & LOVE MARRIAGE */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl bg-white p-6 shadow text-gray-800 border-l-4 border-red-400">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Manglik Dosh Analysis</h2>
            <p className="text-sm leading-relaxed">
              Manglik Dosh occurs when Mars (Mangal) is placed in certain houses. Proper analysis 
              during matching helps assess the severity of the dosh and whether <strong>cancellation (Nivaran)</strong> 
              factors are present to ensure marital stability.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow text-gray-800 border-l-4 border-blue-400">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">Love vs Arranged</h2>
            <p className="text-sm leading-relaxed">
              Even in love marriages, astrology helps evaluate long-term sustainability and 
              communication patterns. This insight allows couples to prepare for married life 
              with clarity and informed decisions.
            </p>
          </div>
        </div>

        {/* SECTION 4: WHY JYOTISHASHA */}
        <div className="rounded-2xl bg-orange-50 p-6 border border-orange-100 text-gray-800">
          <h2 className="text-lg font-semibold mb-3 text-orange-900">
            Why Use Jyotishasha for Love Compatibility?
          </h2>
          <p className="text-sm leading-relaxed">
            Jyotishasha combines authentic <strong>Vedic principles</strong> with precise 
            astronomical calculations. Our engine uses high-precision <strong>Lahiri Ayanamsa</strong> 
            and <strong>NASA-grade planetary data</strong> to deliver clear, practical, and reliable 
            marriage compatibility insights.
          </p>
        </div>

        {/* SECTION 5: FAQ SECTION */}
        <div className="rounded-2xl bg-white p-6 shadow text-gray-800">
          <h2 className="text-lg font-semibold mb-6 text-gray-900 border-b pb-2">
            Kundli Matching & Manglik Dosh – FAQs
          </h2>

          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <strong className="block text-gray-900 mb-1">What is kundli matching in Vedic astrology?</strong>
              <p className="text-gray-600">
                Vedic match-making is the process of comparing two kundalis to assess marriage 
                compatibility using Guna Milan, planetary strength, and dosha evaluation.
              </p>
            </div>

            <div>
              <strong className="block text-gray-900 mb-1">What is a good Guna Milan score?</strong>
              <p className="text-gray-600">
                Out of 36 Gunas, a score above 18 is considered acceptable, while 25 to 32 is 
                regarded as very good for a harmonious marriage.
              </p>
            </div>

            <div>
              <strong className="block text-gray-900 mb-1">Is birth time necessary for accuracy?</strong>
              <p className="text-gray-600">
                Yes. Birth time improves accuracy significantly, especially for <strong>Manglik Dosh</strong> 
                and house-based calculations. However, Moon-sign matching can be done with just the date.
              </p>
            </div>

            <div>
              <strong className="block text-gray-900 mb-1">Can Manglik Dosh be cancelled?</strong>
              <p className="text-gray-600">
                Yes, there are several rules in Vedic astrology where the negative impact of Mars 
                is neutralized by the placement of other planets like Jupiter or through mutual 
                Manglik matching.
              </p>
            </div>
          </div>
        </div>         
      </section>
      {/* FAQ SCHEMA */}
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is Vedic match-making?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Vedic match-making is the process of comparing two kundalis to assess marriage compatibility using Guna Milan, planetary strength, and dosha evaluation."
          }
        },
        {
          "@type": "Question",
          "name": "What is a good Guna Milan score?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Out of 36 Gunas, a score above 18 is considered acceptable, while 25 to 32 is regarded as very good for a harmonious marriage."
          }
        },
        {
          "@type": "Question",
          "name": "Is birth time necessary for accuracy?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Birth time improves accuracy significantly, especially for Manglik Dosh and house-based calculations. However, Moon-sign matching can be done with just the date."
          }
        },
        {
          "@type": "Question",
          "name": "Can Manglik Dosh be cancelled?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes, there are several rules in Vedic astrology where the negative impact of Mars is neutralized by the placement of other planets like Jupiter or through mutual Manglik matching."
          }
        }
      ]
    }),
  }}
/>
    </>
  );
}