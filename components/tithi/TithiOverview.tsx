interface Props {
  locale: string;
}

export default function TithiOverview({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="mb-14">

      <h2 className="text-3xl font-bold mb-6">
        {isHi
          ? "तिथि क्या है?"
          : "What Is Tithi?"}
      </h2>

      <div className="space-y-5 text-gray-300 leading-relaxed">

      <p>
        {isHi
          ? "तिथि पंचांग के पाँच प्रमुख अंगों में से एक है। यह सूर्य और चंद्रमा के बीच के कोणीय अंतर पर आधारित होती है और वैदिक कैलेंडर का महत्वपूर्ण भाग मानी जाती है।"
          : "Tithi is one of the five major elements of Panchang. It is based on the angular distance between the Sun and Moon and forms an essential part of the Vedic calendar."}
      </p>

      <p>
        {isHi
          ? "जब सूर्य और चंद्रमा के बीच लगभग 12 डिग्री का अंतर बनता है तब एक नई तिथि प्रारंभ होती है। इसी कारण तिथि की अवधि हमेशा 24 घंटे की नहीं होती और यह किसी भी समय शुरू या समाप्त हो सकती है।"
          : "A new Tithi begins whenever the angular distance between the Sun and Moon increases by approximately 12 degrees. Because of this, a Tithi does not always last exactly 24 hours and may begin or end at any time of the day."}
      </p>

      <p>
        {isHi
          ? "एक चंद्र मास में कुल 30 तिथियाँ होती हैं। इनमें 15 तिथियाँ शुक्ल पक्ष और 15 तिथियाँ कृष्ण पक्ष में आती हैं। प्रतिपदा से पूर्णिमा तक का भाग शुक्ल पक्ष तथा प्रतिपदा से अमावस्या तक का भाग कृष्ण पक्ष कहलाता है।"
          : "A lunar month contains 30 Tithis. Fifteen belong to Shukla Paksha and fifteen belong to Krishna Paksha. The bright half culminates in Purnima, while the dark half culminates in Amavasya."}
      </p>

      <p>
        {isHi
          ? "प्रत्येक तिथि का अपना स्वभाव, अधिष्ठाता देवता, धार्मिक महत्व और पारंपरिक उपयोग माना जाता है। कुछ तिथियाँ विवाह, गृह प्रवेश और नए कार्यों के लिए अधिक अनुकूल मानी जाती हैं जबकि कुछ तिथियाँ व्रत, साधना और आध्यात्मिक कार्यों से जुड़ी होती हैं।"
          : "Every Tithi has its own nature, ruling deity, spiritual significance and traditional applications. Some Tithis are preferred for marriage, housewarming and new beginnings, while others are associated with fasting, worship and spiritual practices."}
      </p>

      <p>
        {isHi
          ? "मुहूर्त चयन में तिथि सबसे महत्वपूर्ण कारकों में से एक मानी जाती है। विवाह, गृह प्रवेश, यात्रा, व्यवसाय, निवेश, धार्मिक अनुष्ठान और व्रत जैसे कार्यों में उपयुक्त तिथि का विशेष महत्व बताया गया है।"
          : "Tithi is one of the most important factors used in Muhurat selection. It plays a major role in choosing favorable timings for marriage, travel, business activities, investments, religious ceremonies and many other important events."}
      </p>

    </div>

    </section>
  );
}