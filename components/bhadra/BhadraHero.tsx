type BhadraHeroProps = {
  isHi: boolean;
};

export default function BhadraHero({
  isHi,
}: BhadraHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज का भद्रा (विष्टि करण) - जानकारी" : "Today's Bhadra (Vishti Karana) - Insights"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "भद्रा, जिसे विष्टि करण भी कहा जाता है, पंचांग का एक महत्वपूर्ण और संवेदनशील समय है। यह पृष्ठ आपको आज की भद्रा स्थिति और इसके प्रभाव के बारे में सटीक जानकारी प्रदान करता है, ताकि आप अपने कार्यों की योजना सावधानीपूर्वक बना सकें।"
            : "Bhadra, also known as Vishti Karana, is a significant and sensitive time in the Panchang. This page provides accurate information about today's Bhadra status and its impact, helping you plan your activities cautiously."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            {isHi ? "✓ ज्योतिषीय गणना" : "✓ Astrological Calculation"}
          </span>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {isHi ? "✓ दैनिक पंचांग" : "✓ Daily Panchang"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ सावधानी के लिए" : "✓ For Cautious Planning"}
          </span>
        </div>
      </header>
    </section>
  );
}
