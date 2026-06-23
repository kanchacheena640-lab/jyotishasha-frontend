interface PanchangFaqProps {
  locale: string;
}

export default function PanchangFaq({
  locale,
}: PanchangFaqProps) {
  const isHi = locale === "hi";

  const faqs = isHi
    ? [
        {
          question: "पंचांग क्या है?",
          answer:
            "पंचांग एक वैदिक कैलेंडर प्रणाली है जो तिथि, नक्षत्र, योग, करण और वार के आधार पर शुभ-अशुभ समय की जानकारी प्रदान करती है।",
        },
        {
          question: "पंचांग देखने का क्या लाभ है?",
          answer:
            "पंचांग की सहायता से आप विवाह, गृह प्रवेश, व्यवसाय, निवेश, यात्रा और अन्य महत्वपूर्ण कार्यों के लिए शुभ समय चुन सकते हैं।",
        },
        {
          question: "पंचांग के पाँच अंग कौन-कौन से हैं?",
          answer:
            "तिथि, नक्षत्र, योग, करण और वार पंचांग के पाँच मुख्य अंग हैं।",
        },
        {
          question: "राहु काल क्या होता है?",
          answer:
            "राहु काल दिन का वह समय माना जाता है जिसमें नए कार्यों की शुरुआत सामान्यतः टाली जाती है।",
        },
        {
          question: "क्या पंचांग से मुहूर्त निकाला जा सकता है?",
          answer:
            "हाँ, पंचांग के आधार पर विवाह, गृह प्रवेश, वाहन खरीद, संपत्ति खरीद और अन्य कार्यों के लिए शुभ मुहूर्त निकाले जाते हैं।",
        },
      ]
    : [
        {
          question: "What is Panchang?",
          answer:
            "Panchang is a traditional Vedic calendar system that provides guidance using Tithi, Nakshatra, Yoga, Karana and Vara.",
        },
        {
          question: "Why should I check Panchang?",
          answer:
            "Panchang helps you choose favorable timings for marriage, business, investments, travel and other important activities.",
        },
        {
          question: "What are the five elements of Panchang?",
          answer:
            "Tithi, Nakshatra, Yoga, Karana and Vara are the five main elements of Panchang.",
        },
        {
          question: "What is Rahu Kaal?",
          answer:
            "Rahu Kaal is a period generally avoided for starting important new activities.",
        },
        {
          question: "Can Panchang be used for Muhurat selection?",
          answer:
            "Yes, Panchang is widely used for selecting auspicious Muhurats for important life events.",
        },
      ];

      const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    };

  return (
    <section className="mt-16">

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "अक्सर पूछे जाने वाले प्रश्न"
          : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <h3 className="font-semibold text-lg mb-2">
              {faq.question}
            </h3>

            <p className="text-gray-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}