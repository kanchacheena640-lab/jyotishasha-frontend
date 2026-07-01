import { Multilingual } from '@/lib/data/hinduMonthsData';

export default function HinduMonthIntroduction({
  data,
  isHi,
}: {
  data: Multilingual[];
  isHi: boolean;
}) {
  return (
    <section className="py-10 max-w-4xl mx-auto">
      <div className="space-y-5 text-gray-300 leading-8">
        {data.map((para, index) => (
          <p key={index}>{isHi ? para.hi : para.en}</p>
        ))}
      </div>
    </section>
  );
}
