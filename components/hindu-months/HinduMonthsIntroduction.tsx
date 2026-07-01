export default function HinduMonthsIntroduction({ isHi }: { isHi: boolean }) {
  return (
    <section className="py-10 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-purple-300 mb-4">
        {isHi ? "हिंदू महीनों के बारे में" : "About Hindu Months"}
      </h2>
      <div className="space-y-4 text-gray-300 leading-8">
        {isHi ? (
          <>
            <p>
              हिंदू चंद्र-सौर पंचांग, चंद्रमा की कलाओं और सूर्य की स्थिति पर आधारित, हिंदू सांस्कृतिक, धार्मिक और कृषि जीवन का केंद्र है। 12 चंद्र महीनों में से प्रत्येक का अपना विशिष्ट महत्व है, जो त्योहारों, व्रतों और शुभ मुहूर्तों को निर्धारित करता है।
            </p>
            <p>
              प्रत्येक महीने का नाम उस महीने की पूर्णिमा के निकटतम नक्षत्र पर रखा जाता है। महीने छह ऋतुओं में विभाजित हैं: वसंत, ग्रीष्म, वर्षा, शरद, हेमंत और शिशिर। नीचे सभी 12 महीनों का विवरण दिया गया है।
            </p>
          </>
        ) : (
          <>
            <p>
              The Hindu lunisolar calendar, based on the cycles of the Moon and the position of the Sun, is central to Hindu cultural, religious, and agricultural life. Each of the 12 months carries distinct significance, dictating festivals, fasts, and auspicious timings.
            </p>
            <p>
              Every month is named after the nakshatra nearest to the full moon of that month. The months are divided across six Ritus (seasons): Vasanta, Grishma, Varsha, Sharad, Hemanta and Shishira. Explore each of the 12 months below.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
