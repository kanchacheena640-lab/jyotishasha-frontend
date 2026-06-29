type PanchakCalculationProps = {
  isHi: boolean;
};

export default function PanchakCalculation({ isHi }: PanchakCalculationProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-purple-300 mb-6">
        {isHi ? "पंचक की गणना कैसे की जाती है?" : "How is Panchak Determined?"}
      </h2>
      <div className="text-gray-300 leading-7 space-y-4">
        <p>
          {isHi
            ? "पंचक की गणना चंद्रमा के नक्षत्र गोचर पर आधारित है। जब चंद्रमा कुंभ और मीन राशि में स्थित धनिष्ठा (अंतिम दो चरण), शतभिषा, पूर्वा भाद्रपद, उत्तरा भाद्रपद और रेवती नक्षत्रों से होकर गुजरता है, तो पंचक काल होता है।"
            : "Panchak calculation is based on the Moon's transit through specific Nakshatras. When the Moon transits through Dhanishta (last two padas), Shatabhisha, Purva Bhadrapada, Uttara Bhadrapada, and Revati Nakshatras in Aquarius and Pisces, the Panchak period occurs."}
        </p>
        <p>
          {isHi
            ? "यह काल तब शुरू होता है जब चंद्रमा धनिष्ठा नक्षत्र के तीसरे चरण में प्रवेश करता है और रेवती नक्षत्र के अंत तक समाप्त हो जाता है।"
            : "This period begins when the Moon enters the third pada of Dhanishta Nakshatra and concludes after it crosses the end of Revati Nakshatra."}
        </p>
      </div>
    </section>
  );
}
