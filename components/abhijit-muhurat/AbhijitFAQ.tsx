type FaqItem = {
  question: string;
  answer: string;
};

type AbhijitFAQProps = {
  isHi: boolean;
};

export default function AbhijitFAQ({ isHi }: AbhijitFAQProps) {
  const faqs: FaqItem[] = isHi
    ? [
        {
          question: "क्या अभिजीत मुहूर्त हर कार्य के लिए शुभ है?",
          answer: "अभिजीत मुहूर्त अत्यंत शुभ है, लेकिन यह विशेष रूप से महत्वपूर्ण कार्यों या जब कोई अन्य मुहूर्त उपलब्ध न हो, तब के लिए सर्वोत्तम है।"
        },
        {
          question: "राहु काल और अभिजीत मुहूर्त के टकराने पर क्या करें?",
          answer: "यदि राहु काल और अभिजीत मुहूर्त एक ही समय पर हों, तो राहु काल के प्रभाव के कारण उस समय को शुभ कार्यों से बचने की सलाह दी जाती है।"
        },
        {
          question: "क्या अभिजीत मुहूर्त का समय स्थान के अनुसार बदलता है?",
          answer: "हाँ, अभिजीत मुहूर्त स्थानीय सूर्योदय और सूर्यास्त के समय पर आधारित होता है, इसलिए यह स्थान के अनुसार भिन्न हो सकता है।"
        },
        {
          question: "अभिजीत मुहूर्त और अन्य मुहूर्तों में क्या अंतर है?",
          answer: "अन्य मुहूर्त कई पंचांग तत्वों पर आधारित होते हैं, जबकि अभिजीत मुहूर्त सूर्य की स्थिति पर आधारित एक अत्यंत शक्तिशाली दैनिक मुहूर्त है।"
        },
        {
          question: "क्या अभिजीत मुहूर्त दैनिक छोटे कार्यों के लिए आवश्यक है?",
          answer: "दैनिक छोटे कार्यों के लिए अभिजीत मुहूर्त आवश्यक नहीं है, यह मुख्य रूप से बड़े और महत्वपूर्ण कार्यों की शुरुआत के लिए उपयोग किया जाता है।"
        }
      ]
    : [
        {
          question: "Is Abhijit Muhurat favorable for all tasks?",
          answer: "Abhijit Muhurat is highly auspicious, but it is best utilized for important projects or when no other specific Muhurat is available."
        },
        {
          question: "What if Abhijit Muhurat conflicts with Rahu Kaal?",
          answer: "If Abhijit Muhurat overlaps with Rahu Kaal, it is generally advised to avoid starting important tasks during that window due to Rahu Kaal."
        },
        {
          question: "Does Abhijit Muhurat timing change by location?",
          answer: "Yes, Abhijit Muhurat is calculated based on local sunrise and sunset timings, so it varies depending on your geographic location."
        },
        {
          question: "Difference between Abhijit Muhurat and other Muhurats?",
          answer: "Other Muhurats are based on multiple Panchang elements, whereas Abhijit Muhurat is a powerful daily period based specifically on the position of the Sun."
        },
        {
          question: "Is Abhijit Muhurat necessary for small daily tasks?",
          answer: "It is not essential for routine daily chores; it is primarily recommended for commencing significant or high-stakes activities."
        }
      ];

  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "अभिजीत मुहूर्त - सामान्य प्रश्न (FAQ)" : "Abhijit Muhurat Frequently Asked Questions"}
        </h2>
      </header>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <article key={index} className="rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h3 className="text-lg font-semibold text-white">
              {faq.question}
            </h3>
            <p className="mt-3 text-gray-300 leading-7">
              {faq.answer}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
