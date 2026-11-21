import type { DailyHoroscopeResponse } from "@/lib/getDailyHoroscope";
import en from "@/dictionaries/en";
import hi from "@/dictionaries/hi";

interface Props {
  data: DailyHoroscopeResponse | null;
  /** Route locale. Only "hi" changes anything (the Lucky labels); default is English. */
  lang?: string;
}

export default function DailyHoroscopeBlock({ data, lang }: Props) {
  if (!data) return <p className="text-gray-700">Horoscope not available.</p>;

  // Same labels the homepage horoscope card already uses (dictionaries/*.ts):
  // "Lucky Color" / "Lucky Number" in English, "शुभ रंग" / "शुभ अंक" in Hindi.
  const labels = (lang === "hi" ? hi : en).horoscope;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{data.heading}</h3>

      <p className="text-gray-800">{data.intro}</p>

      <p className="text-gray-800">{data.paragraph}</p>

      <div className="flex gap-6 text-sm text-gray-700">
        <span>🎨 {labels.luckyColor}: {data.lucky_color}</span>
        <span>🔢 {labels.luckyNumber}: {data.lucky_number}</span>
      </div>

      <p className="italic text-gray-600">{data.tips}</p>
    </div>
  );
}
