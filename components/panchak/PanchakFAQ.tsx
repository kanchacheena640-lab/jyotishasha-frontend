type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type PanchakFAQProps = {
  isHi: boolean;
};

export default function PanchakFAQ({ isHi }: PanchakFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "What is Panchak?",
      q_hi: "पंचक क्या है?",
      a: "Panchak is a 5-day period when the Moon passes through specific Nakshatras in Aquarius and Pisces.",
      a_hi: "पंचक पांच दिनों की एक अवधि है जब चंद्रमा कुंभ और मीन राशि में विशिष्ट नक्षत्रों से होकर गुजरता है।",
    },
    {
      q: "Is Panchak always inauspicious?",
      q_hi: "क्या पंचक हमेशा अशुभ होता है?",
      a: "It is considered sensitive for certain activities, but traditions vary and Panchak is not strictly inauspicious for all tasks.",
      a_hi: "यह कुछ कार्यों के लिए संवेदनशील माना जाता है, लेकिन परंपराएं अलग-अलग हैं और पंचक सभी कार्यों के लिए पूरी तरह से अशुभ नहीं है।",
    },
    {
      q: "Which Nakshatras are involved in Panchak?",
      q_hi: "पंचक में कौन से नक्षत्र शामिल हैं?",
      a: "Dhanishta (last two padas), Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati.",
      a_hi: "धनिष्ठा (अंतिम दो चरण), शतभिषा, पूर्वा भाद्रपद, उत्तरा भाद्रपद और रेवती।",
    },
    {
      q: "How often does Panchak occur?",
      q_hi: "पंचक कितनी बार आता है?",
      a: "Panchak occurs approximately once every month when the Moon transits through these Nakshatras.",
      a_hi: "जब चंद्रमा इन नक्षत्रों से होकर गुजरता है, तो पंचक लगभग हर महीने एक बार आता है।",
    },
    {
      q: "Can I perform daily tasks during Panchak?",
      q_hi: "क्या मैं पंचक के दौरान दैनिक कार्य कर सकता हूँ?",
      a: "Yes, routine daily tasks are generally not restricted during the Panchak period.",
      a_hi: "हां, पंचक अवधि के दौरान सामान्य दैनिक कार्यों पर आमतौर पर कोई प्रतिबंध नहीं होता है।",
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
