export default function HinduMonthsPanchangContext({ isHi }: { isHi: boolean }) {
  return (
    <section className="py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        {isHi ? "पंचांग संदर्भ" : "Panchang Context"}
      </h2>
      <p className="text-gray-300 leading-8">
        {isHi
          ? "हिंदू पंचांग पांच मुख्य घटकों पर आधारित है: तिथि (चंद्र दिन), वार (सप्ताह का दिन), नक्षत्र (चंद्र मंसिल), योग और करण। प्रत्येक महीना इन घटकों के मौसमी और आध्यात्मिक महत्व को निर्धारित करता है — यही कारण है कि हर हिंदू महीने का शुभ मुहूर्त, त्योहार और धार्मिक परंपराओं से सीधा संबंध होता है।"
          : "A Panchang (Hindu Almanac) relies on five main components: Tithi (lunar day), Vara (day of the week), Nakshatra (lunar mansion), Yoga, and Karana. Understanding which Hindu month is active helps determine the seasonal and spiritual importance of these daily elements — which is why every Muhurat, festival and religious tradition is inseparable from the month in which it falls."}
      </p>
    </section>
  );
}
