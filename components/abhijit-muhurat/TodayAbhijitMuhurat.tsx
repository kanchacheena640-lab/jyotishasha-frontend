type Timing = {
  start: string;
  end: string;
};

type TodayAbhijitMuhuratProps = {
  isHi: boolean;
  abhijitMuhurat: Timing | null | undefined;
};

export default function TodayAbhijitMuhurat({
  isHi,
  abhijitMuhurat,
}: TodayAbhijitMuhuratProps) {
  if (!abhijitMuhurat) return null;

  return (
    <section className="mt-12">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज के लिए अभिजीत मुहूर्त का समय" : "Abhijit Muhurat Timings for Today"}
        </h2>
      </header>

      <article className="rounded-xl border border-green-200 bg-green-50 p-6">
        <p className="text-sm font-semibold text-green-800 uppercase tracking-wide">
          {isHi ? "समय" : "Time"}
        </p>

        <p className="mt-2 text-3xl font-bold text-gray-900">
          {abhijitMuhurat.start} – {abhijitMuhurat.end}
        </p>

        <p className="mt-4 text-gray-700 leading-7">
          {isHi
            ? "अभिजीत मुहूर्त दोपहर के समय आने वाला एक अत्यंत शुभ काल है। जब किसी कार्य के लिए विशेष मुहूर्त न मिल रहा हो, तब अभिजीत मुहूर्त को नए कार्य की शुरुआत करने के लिए सर्वश्रेष्ठ माना जाता है।"
            : "Abhijit Muhurat is an exceptionally auspicious period that occurs around midday. When a specific Muhurat is unavailable for a particular task, Abhijit Muhurat is traditionally considered an excellent window for commencing new activities."}
        </p>
      </article>
    </section>
  );
}
