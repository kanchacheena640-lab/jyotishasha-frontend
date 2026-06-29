type AbhijitCalculationProps = {
  isHi: boolean;
};

export default function AbhijitCalculation({ isHi }: AbhijitCalculationProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "अभिजीत मुहूर्त की गणना" : "How is Abhijit Muhurat Calculated?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "अभिजीत मुहूर्त की गणना स्थानीय सूर्योदय और सूर्यास्त के समय पर आधारित होती है। पंचांग के अनुसार, प्रत्येक दिन का समय बदलता है, इसलिए इस मुहूर्त का समय भी दैनिक आधार पर परिवर्तित होता है।"
            : "Abhijit Muhurat calculation is based on the local sunrise and sunset timings. Since the duration of daylight changes daily, the timing of this Muhurat also varies on a daily basis."}
        </p>

        <p>
          {isHi
            ? "तकनीकी रूप से, सूर्योदय और सूर्यास्त के ठीक बीच के समय को 'स्थानीय स्पष्ट मध्याह्न' (Local Apparent Noon) कहा जाता है। अभिजीत मुहूर्त इसी मध्याह्न के दोनों ओर (पूर्व और पश्चिम) की समान अवधि को लेकर निर्धारित किया जाता है।"
            : "Technically, the exact midpoint between the local sunrise and sunset is known as the 'Local Apparent Noon'. Abhijit Muhurat is determined by taking an equal duration of time before and after this midpoint."}
        </p>
      </div>
    </section>
  );
}
