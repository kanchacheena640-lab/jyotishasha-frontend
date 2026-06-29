type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type YogaFAQProps = {
  isHi: boolean;
};

export default function YogaFAQ({ isHi }: YogaFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "What is the total number of Yogas in Panchang?",
      q_hi: "पंचांग में कुल कितने योग होते हैं?",
      a: "There are 27 Nithya (daily) Yogas in the Panchang.",
      a_hi: "पंचांग में कुल 27 नित्य (दैनिक) योग होते हैं।",
    },
    {
      q: "Does Yoga change daily?",
      q_hi: "क्या योग प्रतिदिन बदलता है?",
      a: "Yes, Yoga changes daily based on the movement of the Sun and the Moon.",
      a_hi: "हां, सूर्य और चंद्रमा की गति के आधार पर योग प्रतिदिन बदलता है।",
    },
    {
      q: "Are all Yogas auspicious?",
      q_hi: "क्या सभी योग शुभ होते हैं?",
      a: "No, some Yogas are considered auspicious while others may be challenging for certain activities.",
      a_hi: "नहीं, कुछ योग शुभ माने जाते हैं, जबकि कुछ योग कुछ विशेष कार्यों के लिए चुनौतीपूर्ण हो सकते हैं।",
    },
    {
      q: "How does Yoga impact daily life?",
      q_hi: "योग दैनिक जीवन को कैसे प्रभावित करता है?",
      a: "Yoga influences the inherent energy of the day, helping to plan activities accordingly.",
      a_hi: "योग दिन की अंतर्निहित ऊर्जा को प्रभावित करता है, जिससे कार्यों की योजना बनाने में मदद मिलती है।",
    },
    {
      q: "Can I use Yoga for business planning?",
      q_hi: "क्या मैं व्यावसायिक योजना के लिए योग का उपयोग कर सकता हूँ?",
      a: "Yes, considering auspicious Yogas can be helpful for important business decisions.",
      a_hi: "हां, महत्वपूर्ण व्यावसायिक निर्णयों के लिए शुभ योगों पर विचार करना सहायक हो सकता है।",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "अक्सर पूछे जाने वाले प्रश्न" : "Frequently Asked Questions"}
      </h2>
      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details key={i} className="group bg-white rounded-xl p-6 border border-gray-100">
            <summary className="cursor-pointer font-bold text-indigo-900 flex justify-between items-center">
              {isHi ? f.q_hi : f.q}
              <span className="text-indigo-400 group-open:rotate-180 transition-transform">↓</span>
            </summary>
            <p className="mt-4 text-gray-700 leading-relaxed">
              {isHi ? f.a_hi : f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
