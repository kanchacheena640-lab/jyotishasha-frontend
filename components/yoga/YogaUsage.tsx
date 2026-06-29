type YogaUsageProps = {
  isHi: boolean;
};

export default function YogaUsage({ isHi }: YogaUsageProps) {
  const usages = [
    {
      title: isHi ? "मुहूर्त चयन" : "Muhurat Selection",
      desc: isHi ? "विभिन्न मांगलिक कार्यों के लिए शुभ योग का चयन करना।" : "Selecting an auspicious Yoga for various religious ceremonies.",
    },
    {
      title: isHi ? "दैनिक योजना" : "Daily Planning",
      desc: isHi ? "दिन भर की ऊर्जा के अनुसार अपने कार्यों को व्यवस्थित करना।" : "Organizing tasks according to the day's inherent energy.",
    },
    {
      title: isHi ? "धार्मिक कार्य" : "Religious Rituals",
      desc: isHi ? "विशेष पूजा और अनुष्ठान के लिए योग का महत्व।" : "The significance of Yoga for specific prayers and rituals.",
    },
    {
      title: isHi ? "व्यावसायिक गतिविधि" : "Business Activities",
      desc: isHi ? "बड़े सौदों या निवेश के लिए सही समय चुनना।" : "Choosing the right time for major deals or investments.",
    },
    {
      title: isHi ? "यात्रा" : "Travel",
      desc: isHi ? "यात्रा के लिए अनुकूल योग की जानकारी।" : "Information about favorable Yoga for travel.",
    },
    {
      title: isHi ? "महत्वपूर्ण निर्णय" : "Important Decisions",
      desc: isHi ? "कठिन निर्णयों के लिए स्पष्टता प्रदान करने में सहायक।" : "Assisting in providing clarity for making difficult decisions.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "पंचांग योग का उपयोग कैसे करें?" : "How to Use Panchang Yoga?"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usages.map((u, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">{u.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
