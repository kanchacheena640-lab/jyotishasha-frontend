import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";

export const revalidate = 86400;

async function getMuhurth(activity: string) {
  const res = await fetch("https://jyotishasha-backend.onrender.com/api/muhurth/list", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      activity,
      latitude: 26.8467,
      longitude: 80.9462,
      days: 60,
    }),
    next: { revalidate: 86400 },
  });
  if (!res.ok) throw new Error("Failed to load muhurth data");
  const data = await res.json();
  return data.results || [];
}

export default async function MuhuratPage({ params }: { params: { slug: string } }) {
  const topic = muhurthTopics[params.slug];
  if (!topic)
    return (
      <main className="min-h-screen flex items-center justify-center text-gray-300">
        <p>Topic not found</p>
      </main>
    );

  const dates = await getMuhurth(topic.activity);

  // 🎯 Show only current month’s muhurat dates (past + upcoming)
  const now = new Date();
  const currentMonth = now.getMonth();
  const year = now.getFullYear();

  const finalDates = dates
    .filter((d: any) => {
      const dt = new Date(d.date);
      return dt.getMonth() === currentMonth && dt.getFullYear() === year;
    })
    .sort((a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const monthName = new Date(year, currentMonth).toLocaleString("en-US", { month: "long" });

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-white leading-relaxed">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-3">
          {topic.title} – {monthName} {year}
        </h1>
        <p className="text-gray-300 max-w-3xl">
          {topic.description} This article lists all Shubh Muhurat dates for {monthName} {year},
          according to Hindu Panchang and Nakshatra. Ideal for those planning their{" "}
          {topic.activity.replace("-", " ")} this month with accurate astrological guidance.
        </p>
      </header>

      {/* Muhurat Dates */}
      <section className="bg-white/10 rounded-2xl border border-purple-400/20 p-6 mb-10">
        <h2 className="text-xl font-semibold text-purple-200 mb-4">
          Auspicious Dates for {monthName} {year}
        </h2>

        {finalDates.length > 0 ? (
          finalDates.map((d: any) => (
            <div key={d.date} className="mb-6 pb-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-purple-300 mb-1">
                🌟 {d.date} ({d.weekday})
              </h3>
              <p className="text-gray-300 text-sm mb-1">
                <strong>Nakshatra:</strong> {d.nakshatra} &nbsp;|&nbsp;
                <strong>Tithi:</strong> {d.tithi}
              </p>
              {d.reason && (
                <p className="text-gray-200 text-sm leading-relaxed mb-1">{d.reason}</p>
              )}
              <p className="text-xs text-gray-400">⭐ Shubh Score: {d.score}/100</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No auspicious dates found for this month.</p>
        )}
      </section>

      {/* Astrological Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-purple-200 mb-3">Astrological Insights</h2>
        <p className="text-gray-300">
          According to Jyotish principles, these muhurat dates occur when the Moon transits through
          favourable Nakshatras and Tithis that promote success, happiness, and growth. Avoid
          periods like Rahu Kaal, Amavasya, and Vishti Karan for best outcomes. Performing the task
          during Shukla Paksha under auspicious constellations ensures lasting prosperity and
          harmony in your {topic.activity.replace("-", " ")}.
        </p>
      </section>

      {/* Astrological Conditions */}
      <section className="bg-white/5 rounded-xl border border-white/10 p-5 mb-10">
        <h2 className="text-lg font-semibold text-purple-300 mb-3">
          🪔 Astrological Conditions for {topic.title.split(" – ")[0]}
        </h2>
        <p className="text-gray-300 text-sm mb-4">
          These planetary and calendar combinations define the auspicious timings for{" "}
          {topic.activity.replace("-", " ")} as per Hindu Panchang.
        </p>

        <h3 className="text-purple-200 font-semibold mt-4 mb-2">✅ Favourable Combinations</h3>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li><strong>Allowed Tithis:</strong> 2, 3, 5, 6, 7, 10, 11, 13</li>
          <li><strong>Favourable Weekdays:</strong> Monday, Wednesday, Thursday, Friday</li>
          <li><strong>Auspicious Nakshatras:</strong> Rohini, Mrigashira, Pushya, Hasta, Swati, Anuradha, Shravana, Revati</li>
        </ul>

        <h3 className="text-purple-200 font-semibold mt-4 mb-2">⚠️ Avoid These Periods</h3>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
          <li><strong>Avoid Tithis:</strong> 4, 8, 9, 14, 15, 30</li>
          <li><strong>Avoid Weekdays:</strong> Tuesday, Saturday</li>
          <li><strong>Inauspicious Nakshatras:</strong> Moola, Jyeshtha, Krittika, Ashlesha</li>
          <li><strong>Inauspicious Yogas:</strong> Vyatipata, Vaidhriti</li>
          <li><strong>Inauspicious Karans:</strong> Vishti (Bhadra)</li>
        </ul>

        <h3 className="text-purple-200 font-semibold mt-4 mb-2">💡 Special Notes</h3>
        <p className="text-gray-300 text-sm">
          Days with Pushya Nakshatra or during Shukla Paksha are extremely beneficial. Avoid
          Amavasya and eclipses. Performing small puja before beginning ensures long-term peace and
          protection.
        </p>
      </section>

      {/* FAQ with Answers */}
      <section className="bg-white/5 rounded-xl border border-white/10 p-5 mb-10">
        <h2 className="text-lg font-semibold text-purple-300 mb-3">Frequently Asked Questions</h2>
        <div className="space-y-4 text-gray-300 text-sm">
          <div>
            <p className="font-semibold">
              1️⃣ Which are the most favourable dates for {topic.activity.replace("-", " ")} in{" "}
              {monthName} {year}?
            </p>
            <p className="text-gray-400">
              The most auspicious dates are those when Moon stays in Rohini, Mrigashira, or Pushya
              Nakshatra with Shukla Paksha tithi. You can refer to the list above; dates with higher
              scores indicate stronger planetary support.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              2️⃣ Which Nakshatra is best for {topic.activity.replace("-", " ")}?
            </p>
            <p className="text-gray-400">
              Nakshatras like Rohini, Pushya, Hasta, and Swati are known to bring prosperity and
              harmony. They help avoid accidents and ensure success in material matters.
            </p>
          </div>

          <div>
            <p className="font-semibold">
              3️⃣ How is Muhurat calculated as per Hindu Panchang?
            </p>
            <p className="text-gray-400">
              A Muhurat is determined based on the position of the Moon, Tithi, Nakshatra, Yoga, and
              Karan. Favourable combinations during Shukla Paksha (waxing phase of the Moon) are
              preferred for all auspicious beginnings.
            </p>
          </div>
        </div>
      </section>

      {/* Internal Links */}
      <footer className="text-sm text-gray-400 border-t border-white/10 pt-4">
        <p>Explore more Muhurat articles:</p>
        <ul className="flex flex-wrap gap-2 mt-2">
          {Object.values(muhurthTopics)
            .filter((t) => t.slug !== topic.slug)
            .map((t) => (
              <li key={t.slug}>
                <a
                  href={`/panchang/muhurat/${t.slug}`}
                  className="text-purple-300 hover:text-purple-100 underline text-xs"
                >
                  {t.title.split(" – ")[0]}
                </a>
              </li>
            ))}
        </ul>
        <p className="mt-6 text-xs text-gray-500">
          Data auto-updated from Jyotishasha API • Based on Hindu Panchang (Lahiri Ayanamsa)
        </p>
      </footer>
    </article>
  );
}
