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

  const now = new Date();
  const nextMonth = now.getMonth() + 1;
  const year = now.getFullYear();
  const monthName = new Date(year, nextMonth - 1).toLocaleString("en-US", { month: "long" });
  const filtered = dates.filter((d: any) => {
    const dt = new Date(d.date);
    return dt.getMonth() + 1 === nextMonth && dt.getFullYear() === year;
  });

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-white leading-relaxed">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-3">
          {topic.title} – {monthName} {year}
        </h1>
        <p className="text-gray-300 max-w-3xl">
          {topic.description} This article lists all Shubh Muhurat dates for {monthName} {year} 
          according to Hindu Panchang and Nakshatra. Ideal for those planning 
          their {topic.activity.replace("-", " ")} this month.
        </p>
      </header>

      {/* Muhurat List */}
      <section className="bg-white/10 rounded-2xl border border-purple-400/20 p-6 mb-10">
        <h2 className="text-xl font-semibold text-purple-200 mb-4">
          Auspicious Dates for {monthName} {year}
        </h2>
        {filtered.length > 0 ? (
          <ul className="space-y-2">
            {filtered.map((d: any) => (
              <li key={d.date} className="border-b border-white/10 pb-2 text-sm">
                <strong className="text-purple-200">{d.date}</strong> – {d.nakshatra} Nakshatra ({d.weekday})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No auspicious dates found for this month.</p>
        )}
      </section>

      {/* Insights */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-purple-200 mb-3">Astrological Insights</h2>
        <p className="text-gray-300">
          According to Jyotish principles, these dates occur when the Moon transits favorable Nakshatras 
          and Tithis. Avoid Rahu Kaal and Amavasya for important beginnings. 
          Proper weekday and nakshatra selection brings harmony and prosperity in your 
          {` ${topic.activity.replace("-", " ")}.`}
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-white/5 rounded-xl border border-white/10 p-5 mb-10">
        <h2 className="text-lg font-semibold text-purple-300 mb-3">Common Questions</h2>
        <ul className="list-disc list-inside text-gray-300 text-sm space-y-2">
          <li>Which are the most favorable dates for {topic.activity.replace("-", " ")} in {monthName} {year}?</li>
          <li>Which Nakshatra is best for this activity?</li>
          <li>How is Muhurat calculated as per Hindu Panchang?</li>
        </ul>
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
