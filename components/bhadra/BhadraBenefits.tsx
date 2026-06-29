type BhadraBenefitsProps = {
  isHi: boolean;
};

export default function BhadraBenefits({ isHi }: BhadraBenefitsProps) {
  const benefits = [
    {
      title: isHi ? "मुहूर्त नियोजन" : "Muhurat Planning",
      desc: isHi ? "किसी भी महत्वपूर्ण कार्य की योजना बनाते समय भद्रा की स्थिति पर विचार करना।" : "Considering the status of Bhadra while planning any important activity.",
    },
    {
      title: isHi ? "शुभ गतिविधियाँ" : "Auspicious Activities",
      desc: isHi ? "शुभ कार्यों के लिए भद्रा-रहित समय चुनना।" : "Selecting Bhadra-free time for auspicious activities.",
    },
    {
      title: isHi ? "परंपरागत सावधानी" : "Traditional Caution",
      desc: isHi ? "विशेष गतिविधियों के लिए परंपरागत रूप से सतर्कता बरतना।" : "Exercising traditional caution for specific activities.",
    },
    {
      title: isHi ? "यात्रा प्रबंधन" : "Travel Management",
      desc: isHi ? "यात्राओं की योजना बनाते समय भद्रा के समय का ध्यान रखना।" : "Taking note of Bhadra timing while planning journeys.",
    },
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Observances",
      desc: isHi ? "धार्मिक कार्यों के दौरान भद्रा का उचित संदर्भ समझना।" : "Understanding the appropriate context of Bhadra during religious tasks.",
    },
    {
      title: isHi ? "दैनिक पंचांग जागरूकता" : "Daily Panchang Awareness",
      desc: isHi ? "दैनिक कार्यों में पंचांग की समझ का लाभ उठाना।" : "Leveraging understanding of the Panchang in daily tasks.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "भद्रा का व्यावहारिक महत्व" : "Practical Importance of Bhadra"}
      </h2>
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
