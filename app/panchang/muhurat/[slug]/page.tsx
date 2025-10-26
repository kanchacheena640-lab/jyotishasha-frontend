import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";

export const revalidate = 86400;

// ✅ 2. Dynamic SEO Metadata Function
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const topic = muhurthTopics[params.slug];
  const now = new Date();
  const month = now.toLocaleString("en-US", { month: "long" });
  const year = now.getFullYear();

  if (!topic) {
    return {
      title: "Muhurat Not Found | Jyotishasha",
      description: "Requested muhurat page does not exist.",
    };
  }

  return {
    title: `${topic.title} – ${month} ${year}`,
    description: `${topic.description} Updated monthly with auspicious ${topic.activity.replace("-", " ")} dates for ${month} ${year}.`,
    alternates: { canonical: topic.canonical },
    openGraph: {
      title: `${topic.title} – ${month} ${year}`,
      description: topic.description,
      url: topic.canonical,
      images: ["/og/muhurat-base.jpg"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} – ${month} ${year}`,
      description: topic.description,
      images: ["/og/muhurat-base.jpg"],
    },
  };
}
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
  return data.results?.slice(0, 30) || [];
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

  const finalDates = dates.sort(
    (a: any, b: any) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const monthName = new Date(year, currentMonth).toLocaleString("en-US", { month: "long" });

  return (
    <article className="max-w-5xl mx-auto px-4 py-10 text-white leading-relaxed">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-purple-300 mb-3">
          {topic.title} – {monthName} {year}
        </h1>
        <p className="text-gray-300 max-w-3xl">
            Discover auspicious <strong>{monthName} {year}</strong> {topic.title.split(" – ")[0]} dates 
            as per the Hindu Panchang and Nakshatra. Updated every month, this guide helps you find 
            the most suitable days for your {` ${topic.activity.replace("-", " ")}`} rituals. 
            All timings for {topic.title.split(" – ")[0]} <strong>{monthName} {year}</strong> are carefully 
            calculated using Vedic astrology principles to ensure success, peace, and prosperity.
        </p>
      </header>

      {/* Muhurat Dates Section */}
        <section className="bg-white/10 rounded-2xl border border-purple-400/20 p-6 mb-10">
          <h2 className="text-xl font-semibold text-purple-200 mb-4">
            Auspicious Dates for {monthName} {year}
          </h2>

          {finalDates && finalDates.length > 0 ? (
            finalDates.map((d: any) => {
              const formattedDate = new Date(d.date).toLocaleDateString("en-GB");

              // Single final sentence for each score
              const getSummary = (score: number) => {
                switch (Math.round(score)) {
                  case 7:
                    return "⭐ This day shines with strong planetary harmony — highly supportive for major life events and spiritual beginnings.";
                  case 6:
                    return "⭐ A bright and favorable alignment that encourages progress, joy, and auspicious outcomes.";
                  case 5:
                    return "⭐ This day holds a balanced mix of energies — suitable for routine rituals and personal growth activities.";
                  case 4:
                    return "⭐ A day with average auspicious strength, ideal for smaller or symbolic ceremonies.";
                  case 3:
                    return "⭐ Planetary support is mild; you may proceed with general tasks but avoid crucial beginnings.";
                  case 2:
                    return "⭐ This alignment carries limited auspicious energy — best reserved for preparatory or routine activities.";
                  case 1:
                  default:
                    return "⭐ A subtle planetary influence marks this day, making it peaceful yet not ideal for significant undertakings.";
                }
              };

              return (
                <div key={d.date} className="mb-6 pb-4 border-b border-white/10">
                  <div className="text-gray-200 text-sm space-y-1">
                    <p><strong>Date:</strong> {formattedDate} ({d.weekday})</p>
                    <p><strong>Nakshatra:</strong> {d.nakshatra || "—"}</p>
                    <p><strong>Tithi:</strong> {d.tithi || "—"}</p>
                  </div>
                  <p className="text-gray-300 text-sm mt-2">{getSummary(d.score)}</p>
                </div>
              );
            })
          ) : (
            <p className="text-gray-400">
              No auspicious dates found for this month. Check again on the 1st of next month when new Panchang data updates automatically.
            </p>
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
