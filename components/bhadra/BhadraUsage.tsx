type BhadraUsageProps = {
  isHi: boolean;
};

export default function BhadraUsage({ isHi }: BhadraUsageProps) {
  const usages = [
    {
      title: isHi ? "मुहूर्त चयन" : "Muhurat Selection",
      desc: isHi ? "शुभ कार्यों के लिए भद्रा-रहित समय का सावधानीपूर्वक चुनाव।" : "Carefully choosing Bhadra-free time for auspicious activities.",
    },
    {
      title: isHi ? "विवाह समारोह" : "Marriage Ceremonies",
      desc: isHi ? "विवाह जैसे बड़े आयोजनों में भद्रा की स्थिति पर विचार।" : "Considering Bhadra status for major events like weddings.",
    },
    {
      title: isHi ? "गृह प्रवेश" : "Housewarming",
      desc: isHi ? "नए घर में प्रवेश के लिए भद्रा का ध्यान रखना।" : "Keeping Bhadra in mind for entering a new house.",
    },
    {
      title: isHi ? "संपत्ति पंजीकरण" : "Property Registration",
      desc: isHi ? "भूमि या भवन से जुड़े कानूनी दस्तावेजों के लिए सतर्कता।" : "Exercise caution for legal documents related to land or buildings.",
    },
    {
      title: isHi ? "यात्रा योजना" : "Travel Planning",
      desc: isHi ? "महत्वपूर्ण यात्राओं के लिए भद्रा समय को टालना।" : "Avoiding Bhadra timings for important journeys.",
    },
    {
      title: isHi ? "धार्मिक अनुष्ठान" : "Religious Rituals",
      desc: isHi ? "क्षेत्रीय परंपराओं के अनुसार अनुष्ठान करना।" : "Performing rituals according to regional traditions.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "भद्रा का व्यावहारिक उपयोग" : "Practical Consideration of Bhadra"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {usages.map((u, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-indigo-900 mb-2">{u.title}</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{u.desc}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-gray-300 text-sm italic">
        {isHi
          ? "*टिप्पणी: भद्रा को लेकर क्षेत्रीय मान्यताएं और परंपराएं भिन्न हो सकती हैं। हमेशा अपने स्थानीय पंचांग का परामर्श लें।"
          : "*Note: Regional beliefs and traditions regarding Bhadra may vary. Always consult your local Panchang."}
      </p>
    </section>
  );
}
