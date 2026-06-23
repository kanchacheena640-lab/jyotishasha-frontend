interface Props {
  locale: string;
}

export default function TithiFaq({
  locale,
}: Props) {
  const isHi = locale === "hi";

  const faqs = isHi
    ? [
        {
          q: "तिथि क्या है?",
          a: "तिथि सूर्य और चंद्रमा के बीच के कोणीय अंतर पर आधारित वैदिक समय इकाई है।",
        },
        {
          q: "एक चंद्र मास में कितनी तिथियाँ होती हैं?",
          a: "एक चंद्र मास में कुल 30 तिथियाँ होती हैं, जिनमें 15 शुक्ल पक्ष और 15 कृष्ण पक्ष की तिथियाँ शामिल होती हैं।",
        },
        {
          q: "शुक्ल पक्ष और कृष्ण पक्ष में क्या अंतर है?",
          a: "शुक्ल पक्ष अमावस्या से पूर्णिमा तक तथा कृष्ण पक्ष पूर्णिमा से अमावस्या तक चलता है।",
        },
        {
          q: "क्या तिथि मुहूर्त चयन में महत्वपूर्ण है?",
          a: "हाँ, तिथि मुहूर्त चयन के सबसे महत्वपूर्ण पंचांग तत्वों में से एक मानी जाती है।",
        },
        {
          q: "सबसे महत्वपूर्ण तिथियाँ कौन सी हैं?",
          a: "एकादशी, पूर्णिमा, अमावस्या, चतुर्थी और प्रदोष से जुड़ी तिथियाँ विशेष महत्व रखती हैं।",
        },
        {
          q: "क्या प्रत्येक तिथि का अलग महत्व होता है?",
          a: "हाँ, प्रत्येक तिथि का अपना स्वभाव, देवता, धार्मिक महत्व और पारंपरिक उपयोग माना जाता है।",
        },
      ]
    : [
        {
          q: "What is Tithi?",
          a: "Tithi is a Vedic time unit based on the angular distance between the Sun and Moon.",
        },
        {
          q: "How many Tithis are there in a lunar month?",
          a: "There are 30 Tithis in a lunar month, including 15 Shukla Paksha and 15 Krishna Paksha Tithis.",
        },
        {
          q: "What is the difference between Shukla Paksha and Krishna Paksha?",
          a: "Shukla Paksha runs from Amavasya to Purnima, while Krishna Paksha runs from Purnima to Amavasya.",
        },
        {
          q: "Is Tithi important for Muhurat selection?",
          a: "Yes, Tithi is one of the most important Panchang factors used in Muhurat selection.",
        },
        {
          q: "Which Tithis are considered most important?",
          a: "Ekadashi, Purnima, Amavasya and Chaturthi are among the most significant Tithis.",
        },
        {
          q: "Does every Tithi have a unique significance?",
          a: "Yes, every Tithi has its own nature, deity, spiritual significance and traditional applications.",
        },
      ];

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-8">
        {isHi
          ? "अक्सर पूछे जाने वाले प्रश्न"
          : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-4">

        {faqs.map((faq) => (
          <div
            key={faq.q}
            className="border border-white/10 rounded-xl p-5"
          >
            <h3 className="font-semibold mb-2">
              {faq.q}
            </h3>

            <p className="text-gray-300">
              {faq.a}
            </p>
          </div>
        ))}

      </div>

    </section>
  );
}