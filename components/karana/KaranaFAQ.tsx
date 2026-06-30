type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type KaranaFAQProps = {
  isHi: boolean;
};

export default function KaranaFAQ({ isHi }: KaranaFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "How do I check today's Karana?",
      q_hi: "आज का करण कैसे देखें?",
      a: "You can check today's Karana by using our Panchang widget or by visiting the daily Panchang page.",
      a_hi: "आप हमारे पंचांग विजेट का उपयोग करके या दैनिक पंचांग पेज पर जाकर आज का करण देख सकते हैं।",
    },
    {
      q: "Is Karana essential for Muhurat selection?",
      q_hi: "क्या मुहूर्त चयन के लिए करण महत्वपूर्ण है?",
      a: "Yes, Karana is a major element of the Panchang and plays a significant role in determining the success of a Muhurat.",
      a_hi: "हाँ, करण पंचांग का एक प्रमुख तत्व है और मुहूर्त की सफलता निर्धारित करने में महत्वपूर्ण भूमिका निभाता है।",
    },
    {
      q: "Is Vishti Karana (Bhadra) always inauspicious?",
      q_hi: "क्या विष्टि करण (भद्रा) हमेशा अशुभ होता है?",
      a: "Vishti Karana (Bhadra) is considered a sensitive period, and caution is recommended for certain activities, but it is not entirely inauspicious.",
      a_hi: "विष्टि करण (भद्रा) को एक संवेदनशील अवधि माना जाता है और कुछ गतिविधियों के लिए सावधानी की सिफारिश की जाती है, लेकिन यह पूरी तरह से अशुभ नहीं है।",
    },
    {
      q: "Does Karana calculation vary by region?",
      q_hi: "क्या करण गणना क्षेत्रीय पंचांग में भिन्न होती है?",
      a: "Karana calculation is based on standard Panchang principles, although there might be minor differences in regional calculation methods.",
      a_hi: "करण गणना मानक पंचांग सिद्धांतों पर आधारित है, हालांकि क्षेत्रीय गणना विधियों में मामूली अंतर हो सकता है।",
    },
    {
      q: "How does Karana impact a chosen Muhurat?",
      q_hi: "मुहूर्त पर करण का क्या प्रभाव पड़ता है?",
      a: "The impact of Karana on a Muhurat depends on the nature of the task; a favorable Karana can enhance the positivity of the time.",
      a_hi: "मुहूर्त पर करण का प्रभाव कार्य की प्रकृति पर निर्भर करता है; एक अनुकूल करण समय की सकारात्मकता को बढ़ा सकता है।",
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
