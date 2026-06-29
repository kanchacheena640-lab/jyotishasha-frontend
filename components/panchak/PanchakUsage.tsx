type PanchakUsageProps = {
  isHi: boolean;
};

export default function PanchakUsage({ isHi }: PanchakUsageProps) {
  const usages = [
    {
      title: isHi ? "गृह निर्माण" : "House Construction",
      desc: isHi ? "नया निर्माण कार्य या छत डालने से संबंधित विचार।" : "Considerations related to starting new construction or laying a roof.",
    },
    {
      title: isHi ? "लंबी यात्रा" : "Long-distance Travel",
      desc: isHi ? "पंचक काल के दौरान लंबी दूरी की यात्रा से बचना।" : "Avoiding long-distance travel during the Panchak period.",
    },
    {
      title: isHi ? "महत्वपूर्ण समारोह" : "Important Ceremonies",
      desc: isHi ? "विभिन्न मांगलिक कार्यक्रमों के लिए समय का चयन।" : "Selecting time for various auspicious ceremonies.",
    },
    {
      title: isHi ? "संपत्ति लेनदेन" : "Property Transactions",
      desc: isHi ? "जमीन या भवन खरीदने-बेचने में सतर्कता।" : "Exercise caution while buying or selling land or buildings.",
    },
    {
      title: isHi ? "धार्मिक परंपराएं" : "Religious Traditions",
      desc: isHi ? "अंतिम संस्कार से संबंधित क्षेत्रीय मान्यताएं।" : "Regional beliefs related to funeral traditions.",
    },
    {
      title: isHi ? "क्षेत्रीय विविधता" : "Regional Variations",
      desc: isHi ? "परंपराएं और मान्यताएं एक क्षेत्र से दूसरे क्षेत्र में भिन्न हो सकती हैं।" : "Traditions and beliefs can vary significantly from one region to another.",
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-8">
        {isHi ? "पंचक का व्यावहारिक उपयोग" : "Practical Consideration of Panchak"}
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
