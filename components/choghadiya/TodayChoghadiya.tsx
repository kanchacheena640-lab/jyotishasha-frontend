import { ChaughadiyaItem } from "@/components/panchang/ChoghadiyaCard";
import { ChoghadiyaGrid } from "@/components/panchang/ChoghadiyaGrid";

type TodayChoghadiyaProps = {
  isHi: boolean;
  dayItems: ChaughadiyaItem[];
  nightItems: ChaughadiyaItem[];
};

export default function TodayChoghadiya({
  isHi,
  dayItems,
  nightItems,
}: TodayChoghadiyaProps) {
  return (
    <section className="space-y-10">
      <header>
        <h2 className="text-3xl font-bold text-purple-300">
          {isHi ? "आज का चौघड़िया समय" : "Today's Choghadiya Timings"}
        </h2>

        <p className="mt-3 max-w-3xl text-gray-300 leading-7">
          {isHi
            ? "दिन और रात्रि दोनों के चौघड़िया नीचे दिए गए हैं। शुभ चौघड़िया नए कार्य, यात्रा, व्यापार तथा महत्वपूर्ण निर्णयों के लिए उपयुक्त माने जाते हैं, जबकि अशुभ चौघड़िया में ऐसे कार्यों से बचना चाहिए।"
            : "Below are today's Day and Night Choghadiya timings. Auspicious Choghadiya periods are considered suitable for travel, business, investments and starting important activities, while inauspicious periods are generally avoided for new beginnings."}
        </p>
      </header>

      <article>
        <h3 className="mb-4 text-2xl font-semibold text-white">
          {isHi ? "दिन का चौघड़िया" : "Day Choghadiya"}
        </h3>

        <ChoghadiyaGrid items={dayItems} isHi={isHi} />
      </article>

      <article>
        <h3 className="mb-4 text-2xl font-semibold text-white">
          {isHi ? "रात्रि का चौघड़िया" : "Night Choghadiya"}
        </h3>

        <ChoghadiyaGrid items={nightItems} isHi={isHi} />
      </article>
    </section>
  );
}