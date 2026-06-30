type KaranaFeatureBadgeProps = {
  text: string;
};

function FeatureBadge({ text }: KaranaFeatureBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-full border border-purple-700 bg-purple-900/50 px-3 py-1 text-xs font-medium text-purple-200">
      {text}
    </span>
  );
}

type KaranaHeroProps = {
  isHi: boolean;
};

export default function KaranaHero({ isHi }: KaranaHeroProps) {
  return (
    <section className="rounded-2xl border border-purple-800 bg-purple-950 p-6 lg:p-8">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-white">
          {isHi ? "आज का करण (पंचांग का एक अंग) - जानकारी" : "Today's Karana (Panchang Limb) - Insights"}
        </h1>
      </header>

      <div className="flex flex-wrap gap-3 mb-6">
        <FeatureBadge text={isHi ? "पंचांग का अंग" : "Panchang Limb"} />
        <FeatureBadge text={isHi ? "मुहूर्त के लिए आवश्यक" : "Essential for Muhurat"} />
        <FeatureBadge text={isHi ? "वैदिक गणना" : "Vedic Calculation"} />
      </div>

      <p className="text-gray-300 leading-7">
        {isHi
          ? "करण, पंचांग के पांच प्रमुख अंगों में से एक है। प्रत्येक तिथि को दो भागों में विभाजित किया जाता है, और प्रत्येक भाग को 'करण' कहा जाता है। मुहूर्त चयन और दैनिक गतिविधियों के लिए करण की स्थिति को समझना बहुत महत्वपूर्ण माना जाता है।"
          : "Karana is one of the five major limbs of the Panchang. Each Tithi (lunar day) is divided into two halves, and each half is called a 'Karana'. Understanding the Karana is considered very important for Muhurat selection and planning daily activities."}
      </p>
    </section>
  );
}
