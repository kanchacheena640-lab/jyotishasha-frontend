type AbhijitUsageProps = {
  isHi: boolean;
};

export default function AbhijitUsage({ isHi }: AbhijitUsageProps) {
  const usageItems = isHi
    ? [
        { title: "व्यावसायिक उद्यम", desc: "नए व्यावसायिक सौदे या लेन-देन की प्रक्रिया को इसी समय से आरंभ करें।" },
        { title: "शैक्षिक कार्य", desc: "अध्ययन या किसी विशेष शैक्षिक गतिविधि को इस मुहूर्त में करने से एकाग्रता बढ़ती है।" },
        { title: "यात्रा प्रबंधन", desc: "महत्वपूर्ण यात्रा के लिए प्रस्थान करने हेतु अभिजीत मुहूर्त का चयन करें।" },
        { title: "गृह अनुष्ठान", desc: "गृह प्रवेश या घर से संबंधित नए कार्यों का शुभारंभ इसी अवधि में करें।" },
        { title: "संपत्ति लेनदेन", desc: "प्रॉपर्टी या बड़े सौदों के लिए अनुबंध प्रक्रिया को इसी दौरान आगे बढ़ाएं।" },
        { title: "महत्वपूर्ण बैठकें", desc: "निर्णायक चर्चा या विचार-विमर्श शुरू करने के लिए समय का अनुकूल उपयोग करें।" },
      ]
    : [
        { title: "Business Operations", desc: "Begin the process of new business transactions or initiatives during this timeframe." },
        { title: "Educational Tasks", desc: "Utilize this window to start focused study or specific educational projects." },
        { title: "Travel Planning", desc: "Plan the commencement of important journeys to align with this period." },
        { title: "Home Rituals", desc: "Schedule the start of Grah Pravesh or household-related initiatives here." },
        { title: "Property Transactions", desc: "Progress contractual documentation or crucial stages of property deals." },
        { title: "Key Meetings", desc: "Use this time to initiate decisive discussions or important business meetings." },
      ];

  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "अभिजीत मुहूर्त का व्यावहारिक उपयोग" : "Practical Applications of Abhijit Muhurat"}
        </h2>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {usageItems.map((item, index) => (
          <article
            key={index}
            className="rounded-xl border border-gray-700 bg-gray-800 p-6"
          >
            <h3 className="text-xl font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-3 text-gray-300 leading-7">
              {item.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
