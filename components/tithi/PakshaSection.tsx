interface Props {
  locale: string;
}

export default function PakshaSection({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "शुक्ल पक्ष और कृष्ण पक्ष"
          : "Shukla Paksha vs Krishna Paksha"}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            {isHi
              ? "शुक्ल पक्ष"
              : "Shukla Paksha"}
          </h3>

          <p className="text-gray-300 leading-relaxed">
            {isHi
              ? "शुक्ल पक्ष अमावस्या के बाद प्रारंभ होता है और पूर्णिमा पर समाप्त होता है। इस अवधि में चंद्रमा का प्रकाश प्रतिदिन बढ़ता है, इसलिए इसे वृद्धि, विकास, समृद्धि और नए आरंभ का पक्ष माना जाता है। विवाह, गृह प्रवेश, व्यवसाय प्रारंभ, निवेश और अन्य शुभ कार्यों के लिए शुक्ल पक्ष की कई तिथियाँ विशेष रूप से अनुकूल मानी जाती हैं।"
              : "Shukla Paksha begins after Amavasya and culminates on Purnima. During this phase the Moon gradually waxes, symbolizing growth, prosperity and new beginnings. Many auspicious activities such as marriage, housewarming, business launches and important investments are traditionally preferred during favorable Tithis of Shukla Paksha."}
          </p>

        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

          <h3 className="text-xl font-semibold mb-4">
            {isHi
              ? "कृष्ण पक्ष"
              : "Krishna Paksha"}
          </h3>

          <p className="text-gray-300 leading-relaxed">
            {isHi
              ? "कृष्ण पक्ष पूर्णिमा के बाद शुरू होता है और अमावस्या तक चलता है। इस अवधि में चंद्रमा का प्रकाश घटता है। इसे आत्मचिंतन, साधना, समापन और आंतरिक विकास से जोड़ा जाता है।"
              : "Krishna Paksha begins after Purnima and continues until Amavasya. During this period the Moon wanes and is traditionally associated with reflection, spiritual practices, completion and inner growth."}
          </p>

        </div>

      </div>

    </section>
  );
}