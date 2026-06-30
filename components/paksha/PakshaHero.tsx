type PakshaFeatureBadgeProps = {
  text: string;
};

function FeatureBadge({ text }: PakshaFeatureBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-700 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
      {text}
    </span>
  );
}

type PakshaHeroProps = {
  isHi: boolean;
};

export default function PakshaHero({ isHi }: PakshaHeroProps) {
  return (
    <section className="rounded-2xl border border-purple-800 bg-purple-950 p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-white">
          {isHi ? "पक्ष (Paksha) - जानकारी" : "Paksha (Lunar Fortnight) - Insights"}
        </h1>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <FeatureBadge text={isHi ? "चंद्र चरण" : "Lunar Phase"} />
        <FeatureBadge text={isHi ? "पंचांग का अंग" : "Panchang Limb"} />
        <FeatureBadge text={isHi ? "वैदिक ज्योतिष" : "Vedic Astrology"} />
      </div>

      <p className="text-gray-300 leading-7">
        {isHi
          ? "पंचांग में, एक चंद्र मास को दो पक्षों में विभाजित किया जाता है: शुक्ल पक्ष और कृष्ण पक्ष। पंचांग की गणना और मुहूर्त चयन में इन पक्षों का महत्वपूर्ण स्थान है।"
          : "In Panchang, a lunar month is divided into two fortnights: Shukla Paksha and Krishna Paksha. These Pakshas play a significant role in Panchang calculations and Muhurat selection."}
      </p>
    </section>
  );
}
