interface Props {
  locale: string;
}

export default function TithiMuhuratSection({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-6">
        {isHi
          ? "शुभ मुहूर्त चयन में तिथि का महत्व"
          : "Importance of Tithi in Muhurat Selection"}
      </h2>

      <div className="space-y-5 text-gray-300 leading-relaxed">

        <p>
          {isHi
            ? "कुछ तिथियाँ विवाह और गृह प्रवेश जैसे शुभ कार्यों के लिए अधिक अनुकूल मानी जाती हैं, जबकि कुछ तिथियाँ व्रत, साधना और पितृ कर्मों से जुड़ी होती हैं। इसलिए किसी भी मुहूर्त का चयन करते समय तिथि की प्रकृति को अवश्य देखा जाता है।"
            : "Some Tithis are considered more favorable for marriage and housewarming, while others are associated with fasting, spiritual practices and ancestral observances. Therefore the nature of a Tithi is always evaluated during Muhurat selection."}
        </p>

        <p>
          {isHi
            ? "मुहूर्त चयन में केवल तिथि ही नहीं बल्कि नक्षत्र, योग, करण, वार, राहु काल और अन्य पंचांग तत्वों को भी साथ में देखा जाता है।"
            : "While Tithi is important, Muhurat selection also considers Nakshatra, Yoga, Karana, Vara, Rahu Kaal and other Panchang factors."}
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

        <div className="border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            {isHi ? "विवाह" : "Marriage"}
          </h3>

          <p className="text-sm text-gray-400">
            {isHi
              ? "उपयुक्त तिथि और नक्षत्र का चयन"
              : "Selection of suitable Tithi and Nakshatra"}
          </p>
        </div>

        <div className="border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            {isHi ? "वाहन खरीद" : "Vehicle Purchase"}
          </h3>

          <p className="text-sm text-gray-400">
            {isHi
              ? "शुभ समय का चयन"
              : "Choosing an auspicious timing"}
          </p>
        </div>

        <div className="border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            {isHi ? "संपत्ति" : "Property"}
          </h3>

          <p className="text-sm text-gray-400">
            {isHi
              ? "रजिस्ट्री और खरीद"
              : "Property purchase and registration"}
          </p>
        </div>

        <div className="border border-white/10 rounded-xl p-4">
          <h3 className="font-semibold mb-2">
            {isHi ? "व्यवसाय" : "Business"}
          </h3>

          <p className="text-sm text-gray-400">
            {isHi
              ? "व्यवसाय आरंभ और समझौते"
              : "Business launches and agreements"}
          </p>
        </div>

      </div>

    </section>
  );
}