import { HinduMonthDetail } from '@/lib/data/hinduMonthsData';

export default function HinduMonthHero({
  data,
  basic,
  isHi,
}: {
  data: HinduMonthDetail['hero'];
  basic: HinduMonthDetail['basic'];
  isHi: boolean;
}) {
  return (
    <section className="py-12 text-center max-w-4xl mx-auto">
      <p className="text-xs text-gray-400 uppercase tracking-widest mb-3">
        {isHi ? `हिंदू महीना ${basic.monthNumber}` : `Hindu Month ${basic.monthNumber}`}
      </p>
      <h1 className="text-4xl md:text-5xl font-bold text-purple-300 mb-4">
        {isHi ? data.h1.hi : data.h1.en}
      </h1>
      <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {isHi ? data.subtitle.hi : data.subtitle.en}
      </p>
    </section>
  );
}
