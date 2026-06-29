type FaqItem = {
  question: string;
  answer: string;
};

type RahuKaalFAQProps = {
  isHi: boolean;
};

export default function RahuKaalFAQ({ isHi }: RahuKaalFAQProps) {
  const faqs: FaqItem[] = isHi
    ? [
        {
          question: "क्या राहु काल यात्रा के लिए अशुभ है?",
          answer: "राहु काल में महत्वपूर्ण यात्राएं शुरू करने से बचने की सलाह दी जाती है। हालांकि, यदि यात्रा अपरिहार्य हो, तो इसे पूर्व नियोजित या जरूरी माना जा सकता है।"
        },
        {
          question: "क्या राहु काल में भोजन कर सकते हैं?",
          answer: "हाँ, राहु काल दैनिक दिनचर्या के कार्यों जैसे भोजन करना, काम पर जाना या घर के कार्यों पर लागू नहीं होता है।"
        }
      ]
    : [
        {
          question: "Is Rahu Kaal inauspicious for travel?",
          answer: "It is generally advised to avoid starting important journeys during Rahu Kaal. However, if travel is unavoidable, it may be necessary to proceed."
        },
        {
          question: "Can I eat during Rahu Kaal?",
          answer: "Yes, Rahu Kaal does not restrict routine daily activities such as eating, going to work, or household chores."
        }
      ];

  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "राहु काल संबंधी सामान्य प्रश्न (FAQ)" : "Rahu Kaal Frequently Asked Questions"}
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
