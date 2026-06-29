type RahuKaalCalculationProps = {
  isHi: boolean;
};

export default function RahuKaalCalculation({
  isHi,
}: RahuKaalCalculationProps) {
  return (
    <section className="mt-14">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "राहु काल की गणना कैसे की जाती है?" : "How is Rahu Kaal Calculated?"}
        </h2>
      </header>

      <div className="space-y-5 text-base leading-8 text-gray-300">
        <p>
          {isHi
            ? "राहु काल की गणना दैनिक सूर्योदय और सूर्यास्त के समय पर आधारित होती है। दिन के कुल समय (सूर्योदय से सूर्यास्त के बीच) को आठ समान भागों में विभाजित किया जाता है।"
            : "Rahu Kaal calculation is based on the daily sunrise and sunset timings. The total duration of the day (between sunrise and sunset) is divided into eight equal segments."}
        </p>

        <p>
          {isHi
            ? "प्रत्येक सप्ताह के दिनों में राहु काल का समय एक निश्चित क्रम में आता है। उदाहरण के लिए, सोमवार के लिए राहु काल का समय दूसरे भाग में पड़ता है, जबकि मंगलवार के लिए यह सातवें भाग में होता है।"
            : "Rahu Kaal occurs in a specific sequence for each day of the week. For example, on a Monday, Rahu Kaal falls in the second segment, whereas on a Tuesday, it occurs in the seventh segment."}
        </p>
      </div>
    </section>
  );
}
