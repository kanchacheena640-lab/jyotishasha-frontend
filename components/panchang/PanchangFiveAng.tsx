interface PanchangFiveAngProps {
  locale: string;
}

const CONTENT = {
  hi: {
    title: "पंचांग के पाँच मुख्य अंग",
    description:
      "पंचांग पाँच महत्वपूर्ण तत्वों से मिलकर बनता है। इन्हीं के आधार पर शुभ समय, मुहूर्त और दैनिक ज्योतिषीय निर्णय निर्धारित किए जाते हैं।",

    items: [
      {
        title: "तिथि",
        description:
          "चंद्रमा की स्थिति पर आधारित वैदिक दिन। शुभ कार्यों के लिए तिथि का विशेष महत्व है।",
      },
      {
        title: "नक्षत्र",
        description:
          "चंद्रमा जिस नक्षत्र में स्थित होता है वह कार्यों की सफलता और परिणामों को प्रभावित करता है।",
      },
      {
        title: "योग",
        description:
          "सूर्य और चंद्रमा की विशेष स्थिति से बनने वाले योग जो शुभ या अशुभ प्रभाव देते हैं।",
      },
      {
        title: "करण",
        description:
          "तिथि का आधा भाग। मुहूर्त और कार्य आरंभ करने में इसका उपयोग किया जाता है।",
      },
      {
        title: "वार",
        description:
          "सप्ताह का दिन। प्रत्येक वार किसी ग्रह से संबंधित माना जाता है और उसका अलग प्रभाव होता है।",
      },
    ],
  },

  en: {
    title: "Five Elements of Panchang",
    description:
      "A Panchang is composed of five important elements that are used to determine auspicious timings, Muhurats and daily astrological guidance.",

    items: [
      {
        title: "Tithi",
        description:
          "The lunar day based on the Moon's position. It plays a major role in selecting auspicious timings.",
      },
      {
        title: "Nakshatra",
        description:
          "The constellation occupied by the Moon which influences the nature and outcome of activities.",
      },
      {
        title: "Yoga",
        description:
          "Special combinations formed by the Sun and Moon that create favorable or unfavorable influences.",
      },
      {
        title: "Karana",
        description:
          "Half of a Tithi. It is widely used while selecting Muhurats and beginning important activities.",
      },
      {
        title: "Vara",
        description:
          "The weekday associated with a planetary influence and specific qualities.",
      },
    ],
  },
};

export default function PanchangFiveAng({
  locale,
}: PanchangFiveAngProps) {
  const content =
    locale === "hi"
      ? CONTENT.hi
      : CONTENT.en;

  return (
    <section className="mb-16">
      <h2 className="text-3xl font-bold mb-4">
        {content.title}
      </h2>

      <p className="text-gray-300 mb-8">
        {content.description}
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
        {content.items.map((item) => (
          <div
            key={item.title}
            className="bg-white/5 border border-white/10 rounded-xl p-5"
          >
            <h3 className="font-semibold mb-3">
              {item.title}
            </h3>

            <p className="text-sm text-gray-300 leading-6">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}