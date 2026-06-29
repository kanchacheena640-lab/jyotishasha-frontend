type RahuKaalHeroProps = {
  isHi: boolean;
};

export default function RahuKaalHero({
  isHi,
}: RahuKaalHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज राहु काल का समय" : "Today's Rahu Kaal Timings"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "आज के राहु काल का सटीक समय देखें और जानें कि इस अवधि में नए एवं महत्वपूर्ण कार्य शुरू करने से क्यों बचा जाता है। यह पृष्ठ पंचांग के अनुसार प्रतिदिन अपडेट होता है ताकि आपको विश्वसनीय और सटीक दैनिक राहु काल की जानकारी मिल सके।"
            : "Check today's accurate Rahu Kaal timings along with its significance and understand why this period is traditionally avoided for starting important activities. The timings are updated daily using Panchang calculations to provide reliable and practical guidance."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {isHi ? "✓ दैनिक अपडेट" : "✓ Updated Daily"}
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {isHi ? "✓ पंचांग आधारित" : "✓ Based on Panchang"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ महत्वपूर्ण कार्य से बचें" : "✓ Avoid for Important Tasks"}
          </span>
        </div>
      </header>
    </section>
  );
}
