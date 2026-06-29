type ChoghadiyaFAQProps = {
  isHi: boolean;
};

const FAQS = {
  en: [
    {
      question: "What is Choghadiya?",
      answer:
        "Choghadiya is a traditional Hindu time calculation system that divides the day and night into eight equal parts to identify auspicious and inauspicious periods for different activities.",
    },
    {
      question: "Which Choghadiya is considered most auspicious?",
      answer:
        "Amrit is considered the most auspicious Choghadiya. Shubh and Labh are also favourable for starting important work, travel, business and investments.",
    },
    {
      question: "Which Choghadiya should be avoided?",
      answer:
        "Kaal, Rog and Udveg are generally considered inauspicious and are avoided for starting important activities or making major decisions.",
    },
    {
      question: "Can I travel during Choghadiya?",
      answer:
        "Yes. Many people prefer travelling during Amrit, Shubh or Labh Choghadiya for a favourable beginning to their journey.",
    },
    {
      question: "Is Choghadiya different from Muhurat?",
      answer:
        "Yes. Choghadiya provides general daily auspicious timings, whereas Muhurat is calculated using multiple Panchang elements for a specific event.",
    },
    {
      question: "Does Choghadiya change every day?",
      answer:
        "Yes. Choghadiya timings depend on local sunrise and sunset, so they change daily and vary from one location to another.",
    },
    {
      question: "Should Rahu Kaal also be considered?",
      answer:
        "Yes. Even during a favourable Choghadiya, Rahu Kaal is generally avoided for starting important or auspicious activities.",
    },
    {
      question: "How is Choghadiya calculated?",
      answer:
        "The duration between sunrise and sunset is divided into eight equal parts for daytime, and the period between sunset and the next sunrise is divided into another eight equal parts for nighttime.",
    },
  ],

  hi: [
    {
      question: "चौघड़िया क्या है?",
      answer:
        "चौघड़िया हिंदू पंचांग की एक पारंपरिक समय-गणना प्रणाली है जिसमें दिन और रात को आठ-आठ समान भागों में विभाजित कर शुभ और अशुभ समय निर्धारित किया जाता है।",
    },
    {
      question: "सबसे शुभ चौघड़िया कौन सा होता है?",
      answer:
        "अमृत चौघड़िया सबसे शुभ माना जाता है। इसके अलावा शुभ और लाभ चौघड़िया भी महत्वपूर्ण कार्यों के लिए अनुकूल माने जाते हैं।",
    },
    {
      question: "किन चौघड़िया से बचना चाहिए?",
      answer:
        "काल, रोग और उद्वेग चौघड़िया को सामान्यतः अशुभ माना जाता है और इन अवधियों में नए कार्य प्रारंभ करने से बचने की सलाह दी जाती है।",
    },
    {
      question: "क्या यात्रा के लिए चौघड़िया देखा जाता है?",
      answer:
        "हाँ। यात्रा प्रारम्भ करने से पहले अमृत, शुभ या लाभ चौघड़िया को प्राथमिकता दी जाती है।",
    },
    {
      question: "क्या चौघड़िया और मुहूर्त अलग हैं?",
      answer:
        "हाँ। चौघड़िया दैनिक शुभ समय बताता है जबकि मुहूर्त किसी विशेष कार्य के लिए पंचांग के अनेक तत्वों के आधार पर निर्धारित किया जाता है।",
    },
    {
      question: "क्या चौघड़िया प्रतिदिन बदलता है?",
      answer:
        "हाँ। चौघड़िया सूर्योदय और सूर्यास्त के समय पर आधारित होता है, इसलिए यह प्रतिदिन और स्थान के अनुसार बदलता है।",
    },
    {
      question: "क्या राहु काल भी देखना चाहिए?",
      answer:
        "हाँ। शुभ चौघड़िया होने पर भी राहु काल में नए और शुभ कार्य शुरू करने से सामान्यतः बचा जाता है।",
    },
    {
      question: "चौघड़िया की गणना कैसे की जाती है?",
      answer:
        "सूर्योदय से सूर्यास्त तक के समय को आठ समान भागों में तथा सूर्यास्त से अगले सूर्योदय तक के समय को पुनः आठ समान भागों में विभाजित कर चौघड़िया निर्धारित किया जाता है।",
    },
  ],
};

export default function ChoghadiyaFAQ({
  isHi,
}: ChoghadiyaFAQProps) {
  const faqs = isHi ? FAQS.hi : FAQS.en;

  return (
    <section className="mt-16">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi
            ? "चौघड़िया से जुड़े सामान्य प्रश्न"
            : "Frequently Asked Questions"}
        </h2>

        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "चौघड़िया, राहु काल और शुभ समय से जुड़े सबसे सामान्य प्रश्नों के उत्तर नीचे दिए गए हैं।"
            : "Find answers to the most frequently asked questions about Choghadiya, Rahu Kaal and auspicious timings."}
        </p>
      </header>

      <div className="space-y-5">
        {faqs.map((faq) => (
          <article
            key={faq.question}
            className="rounded-xl border border-gray-200 bg-white p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {faq.question}
            </h3>

            <p className="mt-3 leading-7 text-gray-700">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}