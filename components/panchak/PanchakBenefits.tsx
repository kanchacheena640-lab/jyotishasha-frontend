type PanchakBenefitsProps = {
  isHi: boolean;
};

export default function PanchakBenefits({ isHi }: PanchakBenefitsProps) {
  const benefits = [
    {
      title: isHi ? "यात्रा योजना" : "Travel Planning",
      desc: isHi ? "पंचक के दौरान लंबी यात्रा से बचना बेहतर माना जाता है।" : "Avoiding long-distance travel during Panchak is generally recommended.",
    },
    {
      title: isHi ? "निर्माण कार्य" : "Construction Work",
      desc: isHi ? "घर की छत डालने या नए निर्माण से बचने की सलाह दी जाती है।" : "It is advised to avoid laying the roof of a house or starting major construction.",
    },
    {
      title: isHi ? "महत्वपूर्ण समारोह" : "Important Ceremonies",
      desc: isHi ? "शादी या अन्य बड़े कार्यक्रमों के लिए शुभ समय का चयन करना।" : "Selecting an auspicious time for weddings or other major ceremonies.",
    },
    {
      title: isHi ? "संपत्ति लेनदेन" : "Property Transactions",
      desc: isHi ? "संपत्ति की खरीद-बिक्री के लिए सावधानी बरतना।" : "Exercising caution for buying or selling property.",
    },
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Observances",
      desc: isHi ? "पंचक में विशेष पूजा में सावधानी और सतर्कता रखना।" : "Maintaining caution and vigilance in special rituals during Panchak.",
    },
    {
      title: isHi ? "दैनिक जागरूकता" : "Daily Awareness",
      desc: isHi ? "अपने दिन की योजना बनाते समय पंचक के बारे में जागरूक रहना।" : "Staying aware of Panchak while planning your daily activities.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "पंचक का व्यावहारिक महत्व" : "Practical Importance of Panchak"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((b, i) => (
          <article
              key={i}
              className="bg-indigo-50 border border-indigo-100 rounded-xl p-6"
            >
            <h3 className="text-lg font-bold text-indigo-900 mb-2">{b.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{b.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
