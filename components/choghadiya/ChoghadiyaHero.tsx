type ChoghadiyaHeroProps = {
  isHi: boolean;
};

export default function ChoghadiyaHero({
  isHi,
}: ChoghadiyaHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज का चौघड़िया मुहूर्त" : "Today's Choghadiya Timings"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "आज के दिन और रात के चौघड़िया मुहूर्त का सटीक समय जानें। यहां आपको शुभ चौघड़िया (अमृत, शुभ, लाभ) और अशुभ चौघड़िया (काल, रोग, उद्वेग) के साथ आज का राहु काल और अभिजीत मुहूर्त भी प्राप्त होगा। चौघड़िया का उपयोग यात्रा, व्यापार, नए कार्य, निवेश, गृह प्रवेश और अन्य महत्वपूर्ण कार्यों के लिए उपयुक्त समय चुनने में किया जाता है। यह पृष्ठ प्रतिदिन पंचांग के अनुसार अपडेट होता है ताकि आपको विश्वसनीय और सटीक दैनिक चौघड़िया जानकारी मिल सके।"
            : "Find today's accurate Day and Night Choghadiya timings along with Rahu Kaal and Abhijit Muhurat. This page displays auspicious Choghadiya periods such as Amrit, Shubh and Labh, as well as inauspicious periods including Kaal, Rog and Udveg. Choghadiya is widely used to select favourable timings for travel, business, investments, starting new work, Grah Pravesh and other important activities. The timings are updated daily using Panchang calculations to provide reliable and practical guidance."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {isHi ? "✓ दैनिक अपडेट" : "✓ Updated Daily"}
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {isHi ? "✓ दिन एवं रात्रि चौघड़िया" : "✓ Day & Night Choghadiya"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ राहु काल एवं अभिजीत मुहूर्त" : "✓ Rahu Kaal & Abhijit Muhurat"}
          </span>
        </div>
      </header>
    </section>
  );
}