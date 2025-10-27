import { muhurthTopics } from "@/app/panchang/muhurat/muhurth_topics";
import { CtaMuhurth, CtaKundali, CtaReport } from "@/components/cta";


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
  // --- Fix mapping for Grah Pravesh ---
  if (activity === "grahpravesh-muhurat") activity = "grahpravesh";

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
        <h2 className="text-xl font-semibold text-purple-200 mb-3">
          Astrological Insights for {topic.title.split(" – ")[0]}
        </h2>
        <p className="text-gray-300 text-sm leading-relaxed">
          {topic.activity === "naamkaran" && (
            <>
              Selecting a <strong>Naamkaran Muhurat</strong> depends on Tithi, Nakshatra,
              and weekday alignment. Auspicious Tithis include Dwitiya, Tritiya, Panchami,
              and Dashami, while Chaturthi and Amavasya are avoided. Favourable Nakshatras
              such as Rohini, Mrigashira, Pushya, Hasta, Swati, and Revati help ensure
              divine blessings for the newborn’s name. Monday, Wednesday, and Thursday are
              preferred for baby naming ceremonies.
            </>
          )}

          {topic.activity === "marriage" && (
            <>
              <strong>Marriage Muhurat</strong> is determined by analyzing Tithi, Nakshatra,
              and planetary yogas. Benefic Tithis like Dwitiya, Tritiya, Panchami, Saptami,
              and Dashami are ideal. Nakshatras such as Rohini, Magha, Anuradha, and Revati
              bring harmony and lifelong prosperity. Monday, Wednesday, Thursday, and Friday
              are best for weddings, while Tuesday and Saturday are usually avoided.
            </>
          )}

          {topic.activity === "grah_pravesh" && (
            <>
              For <strong>Grah Pravesh Muhurat</strong>, astrologers look for auspicious
              Tithis like Dwitiya, Tritiya, Panchami, Dashami, and Ekadashi along with
              Nakshatras such as Mrigashira, Anuradha, Pushya, and Revati. Avoid Amavasya
              and Krura Nakshatras like Moola or Jyeshtha. Entering a new home during
              Shukla Paksha ensures peace, prosperity, and positive vibrations.
            </>
          )}

          {topic.activity === "vehicle" && (
            <>
              A <strong>Vehicle Buying Muhurat</strong> is chosen by analyzing Tithi,
              Nakshatra, and weekday combinations. Tithis like Dwitiya, Tritiya, Panchami,
              and Dashami are preferred. Nakshatras such as Rohini, Mrigashira, Pushya, and
              Revati bring safety and fortune. Mondays, Wednesdays, and Fridays are ideal
              for purchasing vehicles, while Tuesdays and Saturdays should be avoided.
            </>
          )}

          {topic.activity === "childbirth" && (
            <>
              A <strong>Child Birth Muhurat</strong> focuses on ensuring divine timing for
              the baby’s safe arrival. Auspicious Tithis include Dwitiya, Tritiya, Panchami,
              and Dashami, and Nakshatras like Rohini, Pushya, and Hasta are considered
              nurturing. Avoid Amavasya and harsh Nakshatras such as Moola and Jyeshtha.
              Monday, Wednesday, and Thursday are preferred days for child-related rituals.
            </>
          )}

          {topic.activity === "gold" && (
            <>
              The <strong>Gold Buying Muhurat</strong> is decided by checking the Moon’s
              position, Nakshatra, and Tithi. Favourable Tithis like Dwitiya, Tritiya,
              Panchami, and Dashami, especially on Pushya Nakshatra or Dhanteras, attract
              wealth and blessings. Avoid Tuesdays and Saturdays for major jewellery
              purchases.
            </>
          )}

          {topic.activity === "travel" && (
            <>
              Choosing a <strong>Foreign Travel Muhurat</strong> involves looking for
              auspicious Tithis like Dwitiya, Tritiya, and Panchami along with Nakshatras
              such as Rohini, Mrigashira, and Anuradha. Avoid Amavasya, Moola, and
              Jyeshtha. Thursdays and Fridays are ideal for beginning long journeys or
              overseas ventures.
            </>
          )}

          {topic.activity === "property" && (
            <>
              A <strong>Property Purchase Muhurat</strong> is determined by auspicious
              Tithis like Dwitiya, Tritiya, Panchami, and Dashami, and Nakshatras such as
              Rohini, Mrigashira, Anuradha, and Revati. Avoid days with Moola or Jyeshtha
              Nakshatra. Performing registration or possession during Shukla Paksha ensures
              wealth growth and family happiness.
            </>
          )}
        </p>
      </section>

          {/* After Insights Section */}
          <CtaKundali />

      {/* 🪔 Astrological Summary Table */}
      <section className="bg-white/5 rounded-xl border border-white/10 p-5 mb-10">
        <h2 className="text-lg font-semibold text-purple-300 mb-3">
          🪔 Astrological Summary for {topic.title.split(" – ")[0]}
        </h2>

        <p className="text-gray-300 text-sm mb-4">
          Below are the traditional Panchang-based parameters considered auspicious for{" "}
          {topic.activity.replace("-", " ")}. These rules help identify ideal days based on Tithi,
          Nakshatra, and weekday alignment.
        </p>

        {/* ✅ Conditional Tables Based on Activity */}
        {topic.activity === "naamkaran" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya, Tritiya, Panchami, Dashami, Ekadashi</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi, Ashtami, Amavasya, Chaturdashi</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Rohini, Mrigashira, Pushya, Hasta, Swati, Revati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Moola, Jyeshtha, Ashlesha, Krittika</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Tuesday, Saturday</td>
              </tr>
            </tbody>
          </table>
        )}
        {topic.activity === "childbirth" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya, Tritiya, Panchami, Saptami, Dashami, Ekadashi, Trayodashi</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi, Ashtami, Navami, Chaturdashi, Amavasya</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Rohini, Mrigashira, Pushya, Hasta, Anuradha, Shravana, Dhanishtha, Revati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Ashwini, Bharani, Ashlesha, Magha, Jyeshtha, Moola</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Saturday, Sunday, Tuesday</td>
              </tr>
            </tbody>
          </table>
        )}

        {topic.activity === "travel" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya, Tritiya, Panchami, Shashti, Dashami, Ekadashi, Trayodashi</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi, Ashtami, Navami, Chaturdashi, Purnima, Amavasya</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Punarvasu, Swati, Anuradha, Shravana, Dhanishtha, Uttara Bhadrapada, Rohini, Pushya</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Ashwini, Bharani, Magha, Jyeshtha, Moola, Purva Ashadha</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Wednesday, Thursday, Friday</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Saturday, Sunday, Tuesday</td>
              </tr>
            </tbody>
          </table>
        )}
        {topic.activity === "marriage" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya (2), Tritiya (3), Panchami (5), Saptami (7), Dashami (10), Ekadashi (11), Trayodashi (13)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi (4), Ashtami (8), Navami (9), Chaturdashi (14), Purnima (15), Amavasya (30)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha, Shravana, Dhanishtha, Revati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Krittika, Ashlesha, Jyeshtha, Moola, Magha</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Saturday, Sunday, Tuesday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Yogas</td>
                <td>Vyatipata, Vaidhriti</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Karans</td>
                <td>Vishti (Bhadra)</td>
              </tr>
            </tbody>
          </table>
        )}

        {topic.activity === "vehicle" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya (2), Tritiya (3), Panchami (5), Shashti (6), Saptami (7), Dashami (10), Ekadashi (11), Trayodashi (13)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi (4), Ashtami (8), Navami (9), Chaturdashi (14), Purnima (15), Amavasya (30)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Ashwini, Rohini, Mrigashira, Punarvasu, Pushya, Hasta, Swati, Anuradha, Shravana, Revati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Krittika, Ashlesha, Moola, Jyeshtha</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Tuesday, Saturday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Yogas</td>
                <td>Vyatipata, Vaidhriti</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Karans</td>
                <td>Vishti (Bhadra)</td>
              </tr>
            </tbody>
          </table>
        )}

        {topic.activity === "grah_pravesh" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya (2), Tritiya (3), Panchami (5), Saptami (7), Dashami (10), Ekadashi (11), Trayodashi (13)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi (4), Ashtami (8), Navami (9), Chaturdashi (14), Purnima (15), Amavasya (30)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Rohini, Mrigashira, Uttara Phalguni, Hasta, Swati, Anuradha, Shravana, Dhanishta, Revati</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Krittika, Ashlesha, Magha, Mula, Jyeshtha</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Saturday, Sunday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Yogas</td>
                <td>Vyatipata, Vaidhriti</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Karans</td>
                <td>Vishti (Bhadra)</td>
              </tr>
            </tbody>
          </table>
        )}

        {topic.activity === "gold" && (
          <table className="w-full text-sm text-gray-300 border-collapse">
            <tbody>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Special Days</td>
                <td>Akshaya Tritiya, Dhanteras, Pushya Nakshatra days</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Tithis</td>
                <td>Dwitiya (2), Tritiya (3), Panchami (5), Saptami (7), Dashami (10), Ekadashi (11), Trayodashi (13)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Tithis</td>
                <td>Chaturthi (4), Ashtami (8), Navami (9), Chaturdashi (14), Purnima (15), Amavasya (30)</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Auspicious Nakshatras</td>
                <td>Rohini, Mrigashira, Pushya, Hasta, Swati, Anuradha, Shravana, Dhanishtha, Uttara Phalguni</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Nakshatras</td>
                <td>Ashwini, Bharani, Ashlesha, Magha, Jyeshtha, Moola</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Favourable Weekdays</td>
                <td>Monday, Wednesday, Thursday, Friday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Weekdays</td>
                <td>Saturday, Sunday, Tuesday</td>
              </tr>
              <tr className="border-b border-white/10">
                <td className="py-2 font-semibold text-purple-200">Avoid Yogas</td>
                <td>Vyatipata, Vaidhriti, Ganda, Shoola</td>
              </tr>
              <tr>
                <td className="py-2 font-semibold text-purple-200">Avoid Karans</td>
                <td>Vishti (Bhadra)</td>
              </tr>
            </tbody>
          </table>
        )}

        <p className="text-gray-400 text-xs mt-4">
          These details are based on traditional Hindu Panchang and are updated monthly for each activity type.
        </p>
      </section>
        {/* CTA promoting same category Muhurat */}
        <CtaMuhurth slug={topic.slug} />

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
      {/* CTA for paid reports */}
      <CtaReport />


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
