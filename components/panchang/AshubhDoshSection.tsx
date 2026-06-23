interface AshubhDoshSectionProps {
  locale: string;
}

const CONTENT = {
  hi: {
    title: "अशुभ समय और दोष जिनसे आपको बचना चाहिए",
    description:
      "किसी भी महत्वपूर्ण कार्य से पहले केवल शुभ तिथि और नक्षत्र देखना पर्याप्त नहीं है। राहु काल, भद्रा, पंचक और अन्य दोषों की जांच करना भी आवश्यक माना जाता है।",
    doshas: [
      {
        name: "राहु काल",
        effect:
          "नए कार्य, निवेश, यात्रा और महत्वपूर्ण शुरुआत के लिए सामान्यतः टाला जाता है।",
      },
      {
        name: "भद्रा",
        effect:
          "विवाह, गृह प्रवेश, खरीदारी और कई शुभ कार्यों के लिए अनुकूल नहीं मानी जाती।",
      },
      {
        name: "पंचक",
        effect:
          "कुछ विशेष कार्य पंचक के दौरान नहीं किए जाते या विशेष नियमों के साथ किए जाते हैं।",
      },
      {
        name: "ग्रहण काल",
        effect:
          "सूर्य और चंद्र ग्रहण के समय नए शुभ कार्य आरंभ करने से बचा जाता है।",
      },
      {
        name: "दग्ध तिथि",
        effect:
          "कुछ वारों के साथ आने वाली तिथियाँ शुभ कार्यों के लिए कम अनुकूल मानी जाती हैं।",
      },
    ],
  },

  en: {
    title: "Inauspicious Periods and Doshas to Avoid",
    description:
      "Checking an auspicious Tithi or Nakshatra alone is not enough. Rahu Kaal, Bhadra, Panchak and other doshas should also be reviewed before starting important activities.",
    doshas: [
      {
        name: "Rahu Kaal",
        effect:
          "Generally avoided for new ventures, investments, travel and important beginnings.",
      },
      {
        name: "Bhadra",
        effect:
          "Traditionally considered unsuitable for marriage, housewarming and many auspicious activities.",
      },
      {
        name: "Panchak",
        effect:
          "Certain activities are avoided or performed with additional precautions during Panchak.",
      },
      {
        name: "Eclipse Period",
        effect:
          "New auspicious activities are generally not started during solar or lunar eclipses.",
      },
      {
        name: "Dagdha Tithi",
        effect:
          "Specific Tithi and weekday combinations are considered less favorable for important work.",
      },
    ],
  },
};

export default function AshubhDoshSection({
  locale,
}: AshubhDoshSectionProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-4">
        {content.title}
      </h2>

      <p className="text-gray-300 mb-8">
        {content.description}
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {content.doshas.map((dosha) => (
          <div
            key={dosha.name}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <h3 className="text-xl font-semibold mb-2">
              {dosha.name}
            </h3>

            <p className="text-gray-300">
              {dosha.effect}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}