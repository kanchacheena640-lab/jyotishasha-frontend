type FAQ = {
  q: string;
  q_hi: string;
  a: string;
  a_hi: string;
};

type BhadraFAQProps = {
  isHi: boolean;
};

export default function BhadraFAQ({ isHi }: BhadraFAQProps) {
  const faqs: FAQ[] = [
    {
      q: "What is Bhadra (Vishti Karana)?",
      q_hi: "भद्रा (विष्टि करण) क्या है?",
      a: "Bhadra is one of the 11 Karanas in the Panchang, known for being a sensitive period during Muhurat selection.",
      a_hi: "भद्रा पंचांग के 11 करणों में से एक है, जो मुहूर्त चयन के दौरान एक संवेदनशील समय के रूप में जाना जाता है।",
    },
    {
      q: "Why is Bhadra considered in Muhurat?",
      q_hi: "मुहूर्त निकालते समय भद्रा को क्यों देखा जाता है?",
      a: "Bhadra is considered because it is traditionally perceived as requiring caution for specific auspicious activities.",
      a_hi: "मुहूर्त निकालते समय भद्रा को इसलिए देखा जाता है क्योंकि इसे पारंपरिक रूप से विशिष्ट शुभ कार्यों के लिए सावधानी बरतने वाला माना जाता है।",
    },
    {
      q: "Is Bhadra strictly inauspicious?",
      q_hi: "क्या भद्रा पूरी तरह अशुभ है?",
      a: "No, Bhadra is not strictly inauspicious; it requires careful planning based on the activity and context.",
      a_hi: "नहीं, भद्रा पूरी तरह अशुभ नहीं है; यह कार्य और संदर्भ के आधार पर सावधानीपूर्वक नियोजन की मांग करता है।",
    },
    {
      q: "How often does Bhadra occur?",
      q_hi: "भद्रा कितनी बार आता है?",
      a: "Bhadra follows the fixed sequence of Karanas and occurs periodically within each month based on Tithi transitions.",
      a_hi: "भद्रा करणों के निश्चित अनुक्रम का पालन करता है और तिथि के बदलाव के आधार पर हर महीने में समय-समय पर आता है।",
    },
    {
      q: "Do traditions regarding Bhadra vary?",
      q_hi: "क्या भद्रा को लेकर परंपराएं अलग-अलग हैं?",
      a: "Yes, regional traditions, beliefs, and practices related to Bhadra can vary significantly across different regions.",
      a_hi: "हां, भद्रा से संबंधित क्षेत्रीय परंपराएं, मान्यताएं और प्रथाएं अलग-अलग क्षेत्रों में काफी भिन्न हो सकती हैं।",
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
