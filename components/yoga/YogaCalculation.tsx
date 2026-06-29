type YogaCalculationProps = {
  isHi: boolean;
};

export default function YogaCalculation({ isHi }: YogaCalculationProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "योग की गणना कैसे की जाती है?" : "How is Yoga Calculated?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "पंचांग योग की गणना सूर्य और चंद्रमा की आकाशीय स्थिति के आधार पर की जाती है। सूर्य और चंद्रमा के देशांतर (Longitudes) को जोड़ने पर जो कुल योग प्राप्त होता है, उसी से योग का निर्धारण होता है।"
            : "Panchang Yoga is calculated based on the celestial positions of the Sun and the Moon. The Yoga is determined by the total sum obtained by adding the longitudes of the Sun and the Moon."}
        </p>
        <p>
          {isHi
            ? "इस प्रक्रिया के माध्यम से कुल 27 योग बनते हैं। चूंकि सूर्य और चंद्रमा की गति निरंतर होती है, इसलिए आज का योग उनकी गति के साथ समय के अनुसार बदलता रहता है।"
            : "Through this process, a total of 27 Yogas are formed. As the motion of the Sun and the Moon is continuous, today's Yoga changes over time along with their movement."}
        </p>
      </div>
    </section>
  );
}
