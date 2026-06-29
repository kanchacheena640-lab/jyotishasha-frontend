type PanchakHeroProps = {
  isHi: boolean;
};

export default function PanchakHero({
  isHi,
}: PanchakHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज का पंचक - जानकारी और महत्व" : "Today's Panchak - Insights and Significance"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "पंचक पंचांग का एक विशेष समय है जिसे कुछ कार्यों के लिए अशुभ माना जाता है। यह पृष्ठ आपको आज की पंचक स्थिति और इसके महत्व के बारे में सटीक जानकारी प्रदान करता है, ताकि आप अपने दिन की योजना सावधानीपूर्वक बना सकें।"
            : "Panchak is a specific period in the Panchang traditionally considered unfavorable for certain activities. This page provides accurate information about today's Panchak status and its significance, helping you plan your day cautiously."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            {isHi ? "✓ ज्योतिषीय गणना" : "✓ Astrological Calculation"}
          </span>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {isHi ? "✓ दैनिक अपडेट" : "✓ Daily Update"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ सावधानी के लिए" : "✓ For Cautious Planning"}
          </span>
        </div>
      </header>
    </section>
  );
}
