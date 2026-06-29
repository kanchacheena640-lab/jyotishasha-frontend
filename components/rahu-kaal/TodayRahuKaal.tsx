type Timing = {
  start: string;
  end: string;
};

type TodayRahuKaalProps = {
  isHi: boolean;
  rahuKaal: Timing | null | undefined;
};

export default function TodayRahuKaal({
  isHi,
  rahuKaal,
}: TodayRahuKaalProps) {
  if (!rahuKaal) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज के लिए राहु काल का समय" : "Rahu Kaal Timings for Today"}
        </h2>
      </header>

      <article className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm font-semibold text-red-700 uppercase tracking-wide">
          {isHi ? "समय" : "Time"}
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {rahuKaal.start} – {rahuKaal.end}
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi
            ? "राहु काल प्रतिदिन लगभग 90 मिनट के लिए होता है और इसे पारंपरिक रूप से नए उपक्रमों की शुरुआत के लिए प्रतिकूल माना जाता है। इस समय को जानने से बेहतर योजना बनाने में मदद मिलती है, यह सुनिश्चित करते हुए कि महत्वपूर्ण कार्यों को इस अवधि के दौरान निर्धारित न किया जाए।"
            : "Rahu Kaal occurs for approximately 90 minutes daily and is traditionally viewed as an unfavorable window for initiating new ventures. Being aware of this timeframe allows for better planning, ensuring that vital tasks are not scheduled during this period."}
        </p>
      </article>
    </section>
  );
}
