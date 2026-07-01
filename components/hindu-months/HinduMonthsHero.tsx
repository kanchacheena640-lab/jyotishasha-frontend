export default function HinduMonthsHero({ isHi }: { isHi: boolean }) {
  return (
    <section className="py-12 text-center max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
        {isHi ? "हिंदू कैलेंडर के महीने" : "Hindu Calendar Months"}
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {isHi
          ? "हिंदू पंचांग के 12 पवित्र चंद्र महीनों की विस्तृत जानकारी — ऋतु, नामकरण नक्षत्र, प्रमुख त्योहार, व्रत और मुहूर्त के साथ।"
          : "Explore all 12 sacred lunar months of the Hindu lunisolar calendar — with their Ritu, naming Nakshatra, major festivals, vrats and muhurat guidance."}
      </p>
    </section>
  );
}
