type KaranaCalculationProps = {
  isHi: boolean;
};

export default function KaranaCalculation({ isHi }: KaranaCalculationProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "करण की गणना कैसे की जाती है?" : "How is Karana Calculated?"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "पंचांग की गणना में, एक 'तिथि' (चंद्र दिवस) को दो बराबर भागों में विभाजित किया जाता है। प्रत्येक भाग को एक 'करण' कहा जाता है। चूंकि एक तिथि में दो करण होते हैं, इसलिए एक पूर्ण चंद्र मास में करणों का एक व्यवस्थित क्रम चलता है।"
            : "In Panchang calculations, one 'Tithi' (lunar day) is divided into two equal halves. Each half is called a 'Karana'. Since there are two Karanas in one Tithi, a systematic sequence of Karanas follows throughout a complete lunar month."}
        </p>
        <p>
          {isHi
            ? "कुल 11 करण होते हैं, जिन्हें दो श्रेणियों में वर्गीकृत किया गया है:"
            : "There are a total of 11 Karanas, classified into two categories:"}
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>{isHi ? "7 आवर्ती (चर) करण" : "7 Recurring (Movable) Karanas"}:</strong>{" "}
            {isHi ? "ये करण पंचांग में बार-बार एक निश्चित क्रम में आते हैं।" : "These Karanas repeat in a defined sequence within the Panchang."}
          </li>
          <li>
            <strong>{isHi ? "4 स्थिर (ध्रुव) करण" : "4 Fixed (Dhruva) Karanas"}:</strong>{" "}
            {isHi ? "ये करण पंचांग के विशिष्ट समय पर स्थिर रूप से आते हैं।" : "These Karanas occur at fixed points in the Panchang sequence."}
          </li>
        </ul>
        <p>
          {isHi
            ? "करणों का यह क्रम एक निश्चित चक्र के अनुसार चलता है, जो पंचांग की सटीकता सुनिश्चित करने में मदद करता है।"
            : "This sequence of Karanas follows a defined cycle, which helps ensure the accuracy of the Panchang."}
        </p>
      </div>
    </section>
  );
}
