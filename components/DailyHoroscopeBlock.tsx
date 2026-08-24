import type { DailyHoroscopeResponse } from "@/lib/getDailyHoroscope";

interface Props {
  data: DailyHoroscopeResponse | null;
}

export default function DailyHoroscopeBlock({ data }: Props) {
  if (!data) return <p className="text-gray-700">Horoscope not available.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{data.heading}</h3>

      <p className="text-gray-800">{data.intro}</p>

      <p className="text-gray-800">{data.paragraph}</p>

      <div className="flex gap-6 text-sm text-gray-700">
        <span>🎨 Lucky Color: {data.lucky_color}</span>
        <span>🔢 Lucky Number: {data.lucky_number}</span>
      </div>

      <p className="italic text-gray-600">{data.tips}</p>
    </div>
  );
}
