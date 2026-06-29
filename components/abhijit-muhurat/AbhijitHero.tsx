type AbhijitHeroProps = {
  isHi: boolean;
};

export default function AbhijitHero({ isHi }: AbhijitHeroProps) {
  return (
    <section className="mb-12">
      <header className="max-w-5xl">
        <h1 className="text-4xl font-bold tracking-tight text-purple-300 md:text-5xl">
          {isHi ? "आज का अभिजीत मुहूर्त" : "Today's Abhijit Muhurat"}
        </h1>

        <p className="mt-5 text-lg leading-8 text-gray-300">
          {isHi
            ? "अभिजीत मुहूर्त को दिन का सबसे शुभ और शक्तिशाली समय माना जाता है। पंचांग के अनुसार, यह काल किसी भी नए कार्य की शुरुआत, महत्वपूर्ण बैठकों और शुभ कार्यों के लिए अत्यंत अनुकूल होता है।"
            : "Abhijit Muhurat is considered one of the most powerful and auspicious periods of the day. According to the Panchang, this timeframe is exceptionally favorable for commencing new ventures, scheduling important meetings, and performing significant tasks."}
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
            {isHi ? "✓ अत्यंत शुभ" : "✓ Highly Auspicious"}
          </span>

          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            {isHi ? "✓ दैनिक पंचांग गणना" : "✓ Daily Panchang Calculation"}
          </span>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-700">
            {isHi ? "✓ महत्वपूर्ण कार्यों के लिए श्रेष्ठ" : "✓ Ideal for Important Tasks"}
          </span>
        </div>
      </header>
    </section>
  );
}
