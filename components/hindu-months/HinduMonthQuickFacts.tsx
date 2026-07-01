import { QuickFact } from '@/lib/data/hinduMonthsData';

export default function HinduMonthQuickFacts({
  data,
  isHi,
}: {
  data: QuickFact[];
  isHi: boolean;
}) {
  return (
    <section className="py-8 border-y border-white/10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((fact, index) => (
          <div key={index} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            {fact.icon && <p className="text-2xl mb-2">{fact.icon}</p>}
            <p className="text-xs text-purple-300 uppercase tracking-widest mb-1">
              {isHi ? fact.label.hi : fact.label.en}
            </p>
            <p className="text-base font-semibold text-white">
              {isHi ? fact.value.hi : fact.value.en}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
