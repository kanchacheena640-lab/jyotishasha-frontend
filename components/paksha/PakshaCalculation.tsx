type PakshaCalculationProps = {
  isHi: boolean;
};

export default function PakshaCalculation({ isHi }: PakshaCalculationProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पक्ष की गणना कैसे की जाती है?" : "How is Paksha Calculated?"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "पक्ष की गणना सूर्य और चंद्रमा के बीच की कोणीय दूरी (Relative Position) के आधार पर की जाती है। एक चंद्र मास को दो बराबर भागों में विभाजित किया गया है, जिन्हें 'पक्ष' कहा जाता है।"
            : "Paksha is calculated based on the angular distance (relative position) between the Sun and the Moon. A lunar month is divided into two equal halves, which are called 'Paksha'."}
        </p>
        <p>
          {isHi
            ? "इन दो पक्षों का वर्गीकरण इस प्रकार है:"
            : "These two Pakshas are classified as follows:"}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>{isHi ? "शुक्ल पक्ष" : "Shukla Paksha"}:</strong>{" "}
            {isHi ? "यह अमावस्या के बाद शुरू होता है और पूर्णिमा पर समाप्त होता है। यह चंद्रमा के बढ़ने का चरण है।" : "It begins after the Amavasya (New Moon) and ends at the Purnima (Full Moon). This is the waxing phase of the Moon."}
          </li>
          <li>
            <strong>{isHi ? "कृष्ण पक्ष" : "Krishna Paksha"}:</strong>{" "}
            {isHi ? "यह पूर्णिमा के बाद शुरू होता है और अमावस्या पर समाप्त होता है। यह चंद्रमा के घटने का चरण है।" : "It begins after the Purnima (Full Moon) and ends at the Amavasya (New Moon). This is the waning phase of the Moon."}
          </li>
        </ul>
        <p>
          {isHi
            ? "सूर्य और चंद्रमा की स्थिति के आधार पर पंचांग में इन पक्षों का चक्र निरंतर चलता रहता है, जो चंद्र मास की संरचना को परिभाषित करता है।"
            : "Based on the positions of the Sun and Moon, the cycle of these Pakshas continues continuously in the Panchang, which defines the structure of the lunar month."}
        </p>
      </div>
    </section>
  );
}
