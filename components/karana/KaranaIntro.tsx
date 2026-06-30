type KaranaIntroProps = {
  isHi: boolean;
};

export default function KaranaIntro({ isHi }: KaranaIntroProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "करण (Karana) क्या है?" : "What is Karana?"}
      </h2>
      <div className="text-gray-300 space-y-4 leading-7">
        <p>
          {isHi
            ? "वैदिक ज्योतिष और पंचांग में, 'करण' पंचांग के पांच मुख्य अंगों (तिथि, नक्षत्र, योग, करण और वार) में से एक है। एक तिथि के आधे भाग को 'करण' कहा जाता है। चूंकि एक तिथि में दो करण होते हैं, इसलिए पंचांग की गणना में करण का विशेष महत्व है।"
            : "In Vedic astrology and Panchang, 'Karana' is one of the five main limbs of the Panchang (Tithi, Nakshatra, Yoga, Karana, and Vara). A Karana is half of a Tithi (lunar day). Since there are two Karanas in one Tithi, Karana holds special importance in Panchang calculations."}
        </p>
        <p>
          {isHi
            ? "कुल 11 करण होते हैं, जिनमें से 7 करण आवर्ती (Recurring) होते हैं और 4 करण स्थिर (Fixed) होते हैं। इन 11 करणों में से, 'विष्टि करण' को 'भद्रा' के नाम से भी जाना जाता है, जो मुहूर्त चयन के दौरान एक संवेदनशील समय माना जाता है।"
            : "There are a total of 11 Karanas, out of which 7 are recurring and 4 are fixed. Among these 11 Karanas, the 'Vishti Karana' is also known as 'Bhadra', which is considered a sensitive time during Muhurat selection."}
        </p>
        <p>
          {isHi
            ? "करण का उपयोग न केवल दैनिक पंचांग की गणना में किया जाता है, बल्कि यह मुहूर्त निर्धारण में भी एक महत्वपूर्ण कारक है। किसी भी शुभ कार्य को शुरू करने से पहले, समय की अनुकूलता की जांच करने के लिए करण को अन्य पंचांग तत्वों के साथ देखा जाता है।"
            : "Karana is used not only in daily Panchang calculations but is also a crucial factor in Muhurat determination. Before starting any auspicious work, Karana is evaluated along with other Panchang elements to check the favorability of the time."}
        </p>
      </div>
    </section>
  );
}
