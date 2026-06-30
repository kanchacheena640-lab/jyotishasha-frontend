type PakshaIntroProps = {
  isHi: boolean;
};

export default function PakshaIntro({ isHi }: PakshaIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पक्ष (Paksha) क्या है?" : "What is Paksha?"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "वैदिक पंचांग में, 'पक्ष' चंद्र चक्र के एक पखवाड़े (15 दिन) की अवधि को दर्शाता है। एक चंद्र मास को दो भागों में विभाजित किया जाता है: शुक्ल पक्ष और कृष्ण पक्ष।"
            : "In the Vedic Panchang, 'Paksha' refers to a lunar fortnight (15 days) period of the lunar cycle. A lunar month is divided into two halves: Shukla Paksha and Krishna Paksha."}
        </p>
        <p>
          {isHi
            ? "पक्ष का निर्धारण चंद्रमा के चरणों के आधार पर होता है। शुक्ल पक्ष चंद्रमा के बढ़ने का चरण है (अमावस्या से पूर्णिमा तक), जबकि कृष्ण पक्ष चंद्रमा के घटने का चरण है (पूर्णिमा से अमावस्या तक)।"
            : "Paksha is determined by the phases of the Moon. Shukla Paksha is the waxing phase of the Moon (from New Moon to Full Moon), while Krishna Paksha is the waning phase of the Moon (from Full Moon to New Moon)."}
        </p>
        <p>
          {isHi
            ? "पंचांग में पक्ष का अत्यधिक महत्व है, क्योंकि यह सभी त्योहारों, उपवासों और मुहूर्त चयन का आधार बनाता है। प्रत्येक पक्ष की अपनी विशिष्ट ऊर्जा होती है, जो आध्यात्मिक साधना और दैनिक गतिविधियों के लिए महत्वपूर्ण मानी जाती है।"
            : "Paksha holds immense importance in the Panchang, as it forms the basis for all festivals, fasts, and Muhurat selections. Each Paksha has its own unique energy, which is considered significant for spiritual practices and daily activities."}
        </p>
      </div>
    </section>
  );
}
