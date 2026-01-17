// app/panchang/[date]/page.tsx
import PanchangClient from "./PanchangClient";

export const revalidate = 3600; // hourly (perfect for Panchang)

export async function generateMetadata({ params }: { params: { date: string } }) {
  const date = params.date;
  return {
    title: `Hindu Panchang for ${date} | Jyotishasha`,
    description: `Check complete Hindu Panchang for ${date} including Tithi, Nakshatra, Yoga, Karan, sunrise, sunset, Rahu Kaal and auspicious timings.`,
    alternates: {
      canonical: `https://www.jyotishasha.com/panchang/${date}`,
    },
  };
}

export default function PanchangPage({
  params,
}: {
  params: { date: string };
}) {
  const { date } = params;

  return (
    <section className="max-w-5xl mx-auto py-8 px-4">
      {/* ✅ SEO CONTENT (SERVER RENDERED) */}
      <h1 className="text-2xl font-semibold mb-3">
        Hindu Panchang for {date}
      </h1>

      <p className="text-gray-600 mb-4">
        This is the complete Hindu Panchang for {date}, calculated according to
        Vedic astrology using Lahiri Ayanamsa. It includes today’s Tithi,
        Nakshatra, Yoga, Karana, sunrise, sunset, Rahu Kaal, Abhijit Muhurta
        and Chaughadiya timings.
      </p>

      <p className="text-gray-600 mb-6">
        Panchang helps in choosing auspicious timings for daily activities,
        religious rituals, travel, marriage, naming ceremonies and other
        important events.
      </p>

      {/* ✅ CLIENT TOOL */}
      <PanchangClient params={params} />
    </section>
  );
}

