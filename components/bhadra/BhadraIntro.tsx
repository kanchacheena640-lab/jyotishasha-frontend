type BhadraIntroProps = {
  isHi: boolean;
};

export default function BhadraIntro({ isHi }: BhadraIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "भद्रा (विष्टि करण) क्या है?" : "What is Bhadra (Vishti Karana)?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "वैदिक ज्योतिष और पंचांग में, 'भद्रा' या 'विष्टि करण' पंचांग के 11 करणों में से एक है। करण तिथि का एक अर्ध-भाग होता है, और विष्टि करण को सामान्यतः भद्रा के रूप में जाना जाता है।"
            : "In Vedic astrology and Panchang, 'Bhadra' or 'Vishti Karana' is one of the 11 Karanas of the Panchang. A Karana is half of a Tithi (lunar day), and Vishti Karana is commonly known as Bhadra."}
        </p>
        <p>
          {isHi
            ? "मुहूर्त चयन के दौरान भद्रा को विशेष रूप से देखा जाता है क्योंकि इसे शुभ कार्यों के लिए सावधानी के साथ माना जाता है। महत्वपूर्ण यह है कि इसकी व्याख्या और परंपराएं भौगोलिक क्षेत्रों और पंचांग पद्धतियों के अनुसार भिन्न हो सकती हैं।"
            : "Bhadra is carefully considered during Muhurat selection as it is viewed with caution for certain auspicious activities. It is important to note that interpretations and traditions can vary significantly based on geographical regions and specific Panchang methodologies."}
        </p>
      </div>
    </section>
  );
}
