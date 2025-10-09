// app/panchang/[date]/page.tsx
import PanchangClient from "./PanchangClient";

export async function generateMetadata({ params }: { params: { date: string } }) {
  const date = params.date;
  return {
    title: `Panchang for ${date} | Jyotishasha`,
    description:
      `Check Hindu Panchang for ${date}: Sunrise, Sunset, Tithi, Nakshatra, Yoga, Karan, Muhurta & Rahu Kaal.`,
    alternates: { canonical: `/panchang/${date}` },
  };
}

export default function PanchangPage({ params }: { params: { date: string } }) {
  return <PanchangClient params={params} />;
}
