type PakshaBenefitsProps = {
  isHi: boolean;
};

export default function PakshaBenefits({ isHi }: PakshaBenefitsProps) {
  const benefits = [
    {
      title: isHi ? "मुहूर्त नियोजन" : "Muhurat Planning",
      desc: isHi ? "शुभ कार्यों की योजना बनाते समय सही पक्ष (शुक्ल या कृष्ण) का चयन करना।" : "Selecting the right Paksha (Shukla or Krishna) while planning auspicious tasks.",
    },
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Observances",
      desc: isHi ? "विभिन्न धार्मिक अनुष्ठानों के लिए अनुकूल चंद्र चरण का पालन करना।" : "Following the favorable lunar phase for various religious rituals.",
    },
    {
      title: isHi ? "त्योहार और उपवास" : "Festivals & Fasting",
      desc: isHi ? "त्योहारों और उपवास की तिथियों को निर्धारित करने के लिए पक्ष की समझ।" : "Understanding the Paksha to determine dates for festivals and fasting.",
    },
    {
      title: isHi ? "आध्यात्मिक साधना" : "Spiritual Practices",
      desc: isHi ? "ध्यान और आध्यात्मिक गतिविधियों के लिए चंद्रमा की ऊर्जा का लाभ उठाना।" : "Leveraging the energy of the Moon for meditation and spiritual activities.",
    },
    {
      title: isHi ? "मासिक योजना" : "Monthly Planning",
      desc: isHi ? "चंद्र चक्र के आधार पर महीने भर की गतिविधियों को व्यवस्थित करना।" : "Organizing activities throughout the month based on the lunar cycle.",
    },
    {
      title: isHi ? "पंचांग की समझ" : "Panchang Understanding",
      desc: isHi ? "दैनिक जीवन में पंचांग के महत्वपूर्ण तत्वों का व्यावहारिक उपयोग।" : "Practical utilization of important Panchang elements in daily life.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "पक्ष का व्यावहारिक महत्व" : "Practical Importance of Paksha"}
      </h2>
      <p className="text-gray-300 mb-8 leading-7">
        {isHi
          ? "वैदिक ज्योतिष में, पक्ष पंचांग का एक आवश्यक अंग है, जो उस चंद्र ऊर्जा को निर्धारित करता है जो हमारे दैनिक जीवन और आध्यात्मिक प्रयासों को प्रभावित करती है।"
          : "In Vedic astrology, Paksha is an essential component of the Panchang, determining the lunar energy that influences our daily lives and spiritual endeavors."}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <article key={i} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">{b.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{b.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
