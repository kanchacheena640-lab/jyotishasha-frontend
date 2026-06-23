interface Props {
  locale: string;
}

export default function PanchangCalculationSection({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mt-16">
      <h2 className="text-3xl font-bold mb-6">
        {isHi
          ? "पंचांग की गणना कैसे की जाती है?"
          : "How Is Panchang Calculated?"}
      </h2>

      <p className="text-gray-300 mb-8">
        {isHi
          ? "पंचांग सूर्य और चंद्रमा की खगोलीय स्थितियों के आधार पर बनाया जाता है। तिथि, नक्षत्र, योग, करण और वार की गणना करके शुभ मुहूर्त और दैनिक मार्गदर्शन निर्धारित किया जाता है।"
          : "Panchang is calculated using the astronomical positions of the Sun and Moon. The five elements of Panchang—Tithi, Nakshatra, Yoga, Karana and Vara—are derived using traditional Vedic calculations."}
      </p>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="font-semibold text-xl mb-2">
            {isHi ? "तिथि" : "Tithi"}
          </h3>
          <p className="text-gray-300">
            {isHi
              ? "सूर्य और चंद्रमा के बीच कोणीय दूरी के आधार पर तिथि निर्धारित होती है।"
              : "Tithi is determined by the angular distance between the Sun and Moon."}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="font-semibold text-xl mb-2">
            {isHi ? "नक्षत्र" : "Nakshatra"}
          </h3>
          <p className="text-gray-300">
            {isHi
              ? "चंद्रमा जिस नक्षत्र में स्थित होता है, वही उस दिन का नक्षत्र कहलाता है।"
              : "Nakshatra is based on the Moon’s position among the 27 lunar constellations."}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="font-semibold text-xl mb-2">
            {isHi ? "योग" : "Yoga"}
          </h3>
          <p className="text-gray-300">
            {isHi
              ? "सूर्य और चंद्रमा की संयुक्त स्थिति से योग की गणना की जाती है।"
              : "Yoga is calculated using the combined longitudes of the Sun and Moon."}
          </p>
        </div>

        <div className="bg-gray-900 p-5 rounded-xl">
          <h3 className="font-semibold text-xl mb-2">
            {isHi ? "करण" : "Karana"}
          </h3>
          <p className="text-gray-300">
            {isHi
              ? "करण तिथि का आधा भाग होता है और मुहूर्त चयन में महत्वपूर्ण माना जाता है।"
              : "Karana represents half of a Tithi and is widely used in Muhurat selection."}
          </p>
        </div>

      </div>
    </section>
  );
}