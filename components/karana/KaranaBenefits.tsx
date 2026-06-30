type KaranaBenefitsProps = {
  isHi: boolean;
};

export default function KaranaBenefits({ isHi }: KaranaBenefitsProps) {
  const benefits = [
    {
      title: isHi ? "मुहूर्त चयन" : "Muhurat Selection",
      desc: isHi ? "मुहूर्त चयन की प्रक्रिया में करण का सटीक आकलन करना।" : "Accurately assessing Karana during the Muhurat selection process.",
    },
    {
      title: isHi ? "दैनिक पंचांग योजना" : "Daily Panchang Planning",
      desc: isHi ? "दैनिक पंचांग के माध्यम से दिन की गतिविधियों को व्यवस्थित करना।" : "Organizing daily activities through the daily Panchang.",
    },
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Rituals",
      desc: isHi ? "धार्मिक और आध्यात्मिक कार्यों के लिए अनुकूल समय का चयन।" : "Selecting favorable times for religious and spiritual tasks.",
    },
    {
      title: isHi ? "विवाह और समारोह" : "Marriage & Ceremonies",
      desc: isHi ? "विवाह और अन्य प्रमुख समारोहों के लिए करण की स्थिति का विचार।" : "Considering the status of Karana for weddings and other major ceremonies.",
    },
    {
      title: isHi ? "व्यावसायिक गतिविधियाँ" : "Business Activities",
      desc: isHi ? "महत्वपूर्ण व्यावसायिक निर्णयों और कार्यों के लिए समय का अनुकूलन।" : "Optimizing time for important business decisions and tasks.",
    },
    {
      title: isHi ? "भद्रा (विष्टि करण) समझ" : "Understanding Bhadra (Vishti Karana)",
      desc: isHi ? "विष्टि करण (भद्रा) के प्रभाव को समझना और उसके अनुसार सावधानी बरतना।" : "Understanding the impact of Vishti Karana (Bhadra) and taking caution accordingly.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "करण का व्यावहारिक महत्व" : "Practical Importance of Karana"}
      </h2>
      <p className="text-gray-300 mb-8 leading-7">
        {isHi
          ? "वैदिक ज्योतिष में, करण पंचांग का एक अभिन्न अंग है। करण का व्यावहारिक ज्ञान न केवल दैनिक जीवन की योजना बनाने में मदद करता है, बल्कि महत्वपूर्ण कार्यों के लिए सही समय चुनने में भी सहायक होता है।"
          : "In Vedic astrology, Karana is an integral part of the Panchang. Practical knowledge of Karana not only helps in planning daily life but also assists in choosing the right time for important tasks."}
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
