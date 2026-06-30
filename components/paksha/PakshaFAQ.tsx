type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type PakshaFAQProps = {
  isHi: boolean;
};

export default function PakshaFAQ({ isHi }: PakshaFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "What is the difference between Shukla Paksha and Krishna Paksha?",
      q_hi: "शुक्ल पक्ष और कृष्ण पक्ष में क्या अंतर है?",
      a: "Shukla Paksha is the waxing phase (Moon growing) of the Moon, while Krishna Paksha is the waning phase (Moon shrinking) of the Moon.",
      a_hi: "शुक्ल पक्ष चंद्रमा के बढ़ने का चरण है, जबकि कृष्ण पक्ष चंद्रमा के घटने का चरण है।",
    },
    {
      q: "Why is Paksha important in Vedic astrology?",
      q_hi: "वैदिक ज्योतिष में पक्ष का क्या महत्व है?",
      a: "Paksha determines the lunar energy and is foundational for festival planning, Muhurat selection, and spiritual observances in the Panchang.",
      a_hi: "पक्ष चंद्र ऊर्जा को निर्धारित करता है और पंचांग में त्योहारों, मुहूर्त चयन और आध्यात्मिक गतिविधियों के लिए आधार प्रदान करता है।",
    },
    {
      q: "Are all festivals based on Paksha?",
      q_hi: "क्या सभी त्योहार पक्ष पर आधारित होते हैं?",
      a: "Yes, most Hindu festivals are determined by the specific Tithi and Paksha combination in the lunar calendar.",
      a_hi: "हाँ, अधिकांश हिंदू त्योहार चंद्र कैलेंडर में तिथि और पक्ष के विशिष्ट संयोजन द्वारा निर्धारित किए जाते हैं।",
    },
    {
      q: "Does Paksha influence spiritual practices?",
      q_hi: "क्या पक्ष आध्यात्मिक प्रथाओं को प्रभावित करता है?",
      a: "Yes, different phases of the Moon are considered more suitable for certain types of meditation, fasting, and spiritual reflection.",
      a_hi: "हाँ, चंद्रमा के विभिन्न चरणों को कुछ प्रकार के ध्यान, उपवास और आध्यात्मिक चिंतन के लिए अधिक अनुकूल माना जाता है।",
    },
    {
      q: "How often does Paksha change?",
      q_hi: "पक्ष कितनी बार बदलता है?",
      a: "A Paksha lasts for approximately 15 days, corresponding to one half of the lunar cycle (either waxing or waning).",
      a_hi: "एक पक्ष लगभग 15 दिनों तक चलता है, जो चंद्र चक्र के आधे हिस्से (बढ़ते या घटते) के बराबर होता है।",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "सामान्य प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, i) => (
          <article key={i} className="bg-white/5 border border-white/10 rounded-xl p-6">
            <h3 className="text-xl font-bold text-white mb-3">{isHi ? faq.q_hi : faq.q}</h3>
            <p className="text-gray-300 leading-7">{isHi ? faq.a_hi : faq.a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
