// app/panchang/tools/[tool]/page.tsx
import ShubhDates from "@/components/ShubhDates";

interface Props {
  params: { tool?: string };
  searchParams?: { lat?: string; lng?: string; place?: string };
}

export async function generateMetadata({ params }: Props) {
  const tool = params?.tool ?? "muhurta";
  const nice = tool.replace(/-/g, " ");
  return {
    title: `Shubh ${nice} Muhurta | Jyotishasha`,
    description: `Best ${nice} dates based on Panchang and Vedic astrology for your location.`,
    alternates: { canonical: `/panchang/tools/${tool}` },
  };
}

export default function ToolMuhurthaPage({ params, searchParams }: Props) {
  const tool = params?.tool ?? "muhurta";
  const place = searchParams?.place ?? "Lucknow";

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold text-center text-purple-800 mb-2 capitalize">
          {tool.replace(/-/g, " ")} Muhurta
        </h1>
        <p className="text-center text-gray-600 mb-6">
          You are viewing Shubh dates for{" "}
          <span className="font-medium text-purple-700">
            {decodeURIComponent(place)}
          </span>
        </p>

        {/* ✅ Pass params exactly as expected */}
        <ShubhDates params={{ tool }} />
      </div>
    </main>
  );
}
