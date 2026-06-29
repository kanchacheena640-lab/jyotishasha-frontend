type YogaBenefitsProps = {
  isHi: boolean;
};

export default function YogaBenefits({ isHi }: YogaBenefitsProps) {
  const benefits = [
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Rituals",
      desc: isHi ? "शुभ योग में पूजा-पाठ करने से फल अधिक प्राप्त होता है।" : "Performing rituals during auspicious Yogas enhances the benefits received.",
    },
    {
      title: isHi ? "व्यावसायिक उपक्रम" : "Business Ventures",
      desc: isHi ? "व्यापार की शुरुआत के लिए सही योग चुनना सफलता की संभावना बढ़ाता है।" : "Selecting the right Yoga for starting a business increases the chances of success.",
    },
    {
      title: isHi ? "यात्रा की योजना" : "Travel Planning",
      desc: isHi ? "यात्रा के लिए अनुकूल योग दुर्घटनाओं को कम करने में सहायक माना जाता है।" : "Choosing a favorable Yoga for travel is considered helpful in minimizing accidents.",
    },
    {
      title: isHi ? "संपत्ति लेनदेन" : "Property Transactions",
      desc: isHi ? "जमीन या घर खरीदने के लिए शुभ योग अत्यंत महत्वपूर्ण है।" : "An auspicious Yoga is vital for buying land or homes.",
    },
    {
      title: isHi ? "स्वास्थ्य और कल्याण" : "Health & Wellness",
      desc: isHi ? "औषधि ग्रहण या चिकित्सा शुरू करने के लिए अनुकूल योग का चयन करना चाहिए।" : "Selecting a favorable Yoga is recommended for starting medical treatments.",
    },
    {
      title: isHi ? "व्यक्तिगत मील के पत्थर" : "Personal Milestones",
      desc: isHi ? "नामकरण या अन्य व्यक्तिगत समारोहों के लिए योग का विशेष महत्व है।" : "Yoga holds special significance for naming ceremonies or other personal milestones.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "पंचांग योग का महत्व" : "Importance of Panchang Yoga"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <div key={i} className="bg-indigo-50 border border-indigo-100 rounded-xl p-6">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">{b.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
