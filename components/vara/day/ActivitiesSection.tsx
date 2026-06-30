import { VaraDetail } from "@/lib/data/varaData";

type ActivitiesSectionProps = {
  data: VaraDetail;
  isHi: boolean;
};

export default function ActivitiesSection({ data, isHi }: ActivitiesSectionProps) {
  return (
    <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 className="text-2xl font-bold text-emerald-300 mb-6">
          {isHi ? "अनुशंसित गतिविधियाँ" : "Recommended Activities"}
        </h2>
        <div className="space-y-4">
          {data.activities.recommended.map((activity, index) => (
            <article key={index} className="bg-emerald-50 border border-emerald-100 rounded-xl p-4">
              <h3 className="font-bold text-emerald-900 mb-1">{isHi ? activity.title.hi : activity.title.en}</h3>
              <p className="text-sm text-gray-700">{isHi ? activity.description.hi : activity.description.en}</p>
            </article>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-amber-300 mb-6">
          {isHi ? "वर्जित गतिविधियाँ" : "Traditionally Avoided Activities"}
        </h2>
        <div className="space-y-4">
          {data.activities.avoided.map((activity, index) => (
            <article key={index} className="bg-amber-50 border border-amber-100 rounded-xl p-4">
              <h3 className="font-bold text-amber-900 mb-1">{isHi ? activity.title.hi : activity.title.en}</h3>
              <p className="text-sm text-gray-700">{isHi ? activity.description.hi : activity.description.en}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
