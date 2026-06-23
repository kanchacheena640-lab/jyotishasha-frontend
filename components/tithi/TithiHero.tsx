interface Props {
  locale: string;
}

export default function TithiHero({
  locale,
}: Props) {
  const isHi = locale === "hi";

  return (
    <section className="text-center mb-14">

      <h1 className="text-4xl md:text-5xl font-bold mb-5">
        {isHi
          ? "तिथि - अर्थ, प्रकार और महत्व"
          : "Tithi - Meaning, Types & Importance"}
      </h1>

      <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
        {isHi
          ? "तिथि पंचांग के पाँच प्रमुख अंगों में से एक है। विवाह, गृह प्रवेश, निवेश, यात्रा और अन्य महत्वपूर्ण कार्यों के लिए शुभ समय चुनने में तिथि की महत्वपूर्ण भूमिका होती है।"
          : "Tithi is one of the five key elements of Panchang. It plays an important role in selecting auspicious timings for marriage, housewarming, investments, travel and other important activities."}
      </p>

      <div className="flex flex-wrap justify-center gap-4 mt-8">

        <a
          href={isHi ? "/hi/today-panchang" : "/today-panchang"}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 transition"
        >
          {isHi ? "आज का पंचांग" : "Today's Panchang"}
        </a>

        <a
          href={isHi ? "/hi/free-kundali" : "/free-kundali"}
          className="px-6 py-3 rounded-xl border border-white/20 hover:bg-white/5 transition"
        >
          {isHi ? "फ्री कुंडली" : "Free Kundali"}
        </a>

      </div>

    </section>
  );
}