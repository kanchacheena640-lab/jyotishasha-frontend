type Timing = {
  start: string;
  end: string;
};

type RahuAbhijitCardProps = {
  isHi: boolean;
  rahuKaal?: Timing | null;
  abhijitMuhurat?: Timing | null;
};

export default function RahuAbhijitCard({
  isHi,
  rahuKaal,
  abhijitMuhurat,
}: RahuAbhijitCardProps) {
  if (!rahuKaal && !abhijitMuhurat) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का राहु काल एवं अभिजीत मुहूर्त" : "Today's Rahu Kaal & Abhijit Muhurat"}
        </h2>

        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "राहु काल को नए और शुभ कार्यों के लिए अशुभ माना जाता है, जबकि अभिजीत मुहूर्त अधिकांश कार्यों की शुरुआत के लिए अत्यंत शुभ माना जाता है।"
            : "Rahu Kaal is generally avoided for starting new or auspicious activities, whereas Abhijit Muhurat is regarded as one of the most favourable periods for beginning important work."}
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {rahuKaal && (
          <article className="rounded-xl border border-red-200 bg-red-50 p-6">
            <h3 className="text-xl font-semibold text-red-700">
              {isHi ? "राहु काल" : "Rahu Kaal"}
            </h3>

            <p className="mt-3 text-2xl font-bold text-gray-900">
              {rahuKaal.start} – {rahuKaal.end}
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              {isHi
                ? "इस अवधि में विवाह, गृह प्रवेश, निवेश, नया व्यापार या अन्य शुभ कार्य प्रारंभ करने से बचना चाहिए।"
                : "Avoid starting new ventures, investments, travel, weddings or other auspicious activities during this period whenever possible."}
            </p>
          </article>
        )}

        {abhijitMuhurat && (
          <article className="rounded-xl border border-green-200 bg-green-50 p-6">
            <h3 className="text-xl font-semibold text-green-700">
              {isHi ? "अभिजीत मुहूर्त" : "Abhijit Muhurat"}
            </h3>

            <p className="mt-3 text-2xl font-bold text-gray-900">
              {abhijitMuhurat.start} – {abhijitMuhurat.end}
            </p>

            <p className="mt-4 text-gray-700 leading-7">
              {isHi
                ? "यदि किसी कार्य के लिए विशेष मुहूर्त उपलब्ध न हो, तो अभिजीत मुहूर्त को शुभ कार्यों की शुरुआत के लिए श्रेष्ठ समय माना जाता है।"
                : "When a specific Muhurat is unavailable, Abhijit Muhurat is traditionally considered an excellent time for commencing important activities."}
            </p>
          </article>
        )}
      </div>
    </section>
  );
}