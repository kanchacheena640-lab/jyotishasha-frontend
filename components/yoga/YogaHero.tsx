type YogaHeroProps = {
  isHi: boolean;
};

export default function YogaHero({
  isHi,
}: YogaHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज का योग और उसका महत्व" : "Today's Yoga and Its Significance"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "योग पंचांग का एक महत्वपूर्ण अंग है, जो दिन की ऊर्जा और विभिन्न कार्यों के लिए इसकी अनुकूलता को प्रभावित करता है। यह पृष्ठ आपको आज के योग और इसके प्रभाव के बारे में सटीक जानकारी प्रदान करता है, ताकि आप अपने दिन को बेहतर ढंग से नियोजित कर सकें।"
            : "Yoga is a crucial element of the Panchang, significantly influencing the day's energy and its suitability for various activities. This page provides accurate information about today's Yoga and its impact, helping you plan your day effectively."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
            {isHi ? "✓ वैदिक गणना" : "✓ Vedic Calculations"}
          </span>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            {isHi ? "✓ दैनिक पंचांग" : "✓ Daily Panchang"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ शुभ कार्यों में सहायक" : "✓ Assists in Planning"}
          </span>
        </div>
      </header>
    </section>
  );
}
