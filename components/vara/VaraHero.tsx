type VaraFeatureBadgeProps = {
  text: string;
};

function FeatureBadge({ text }: VaraFeatureBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-700 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
      {text}
    </span>
  );
}

type VaraHeroProps = {
  isHi: boolean;
};

export default function VaraHero({ isHi }: VaraHeroProps) {
  return (
    <section className="rounded-2xl border border-purple-800 bg-purple-950 p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-white">
          {isHi ? "वार (Vara) - जानकारी" : "Vara (Weekday) - Insights"}
        </h1>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <FeatureBadge text={isHi ? "पंचांग का अंग" : "Panchang Limb"} />
        <FeatureBadge text={isHi ? "ग्रह स्वामी" : "Ruling Planet"} />
        <FeatureBadge text={isHi ? "पारंपरिक व्रत" : "Traditional Observance"} />
      </div>

      <p className="text-gray-300 leading-7">
        {isHi
          ? "वैदिक पंचांग में, 'वार' (सप्ताह का दिन) का विशेष महत्व है। प्रत्येक वार एक विशिष्ट ग्रह और देवता से जुड़ा होता है, जो उस दिन की ऊर्जा और गतिविधियों को प्रभावित करता है।"
          : "In the Vedic Panchang, 'Vara' (weekday) holds special significance. Each Vara is associated with a specific ruling planet and presiding deity, which influences the energy and activities of that day."}
      </p>
    </section>
  );
}
