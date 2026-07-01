import { hinduMonthsData } from '@/lib/data/hinduMonthsData';
import Link from 'next/link';

export default function HinduMonthsGrid({ locale }: { locale: string }) {
  const isHi = locale === 'hi';
  const langPath = isHi ? '/hi' : '';

  return (
    <section className="py-10">
      <h2 className="text-2xl font-bold text-purple-300 mb-6">
        {isHi ? "सभी 12 महीने" : "All 12 Months"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Object.entries(hinduMonthsData).map(([slug, data]) => (
          <Link
            key={slug}
            href={`${langPath}/hindu-months/${slug}`}
            className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-purple-500/40 transition-all"
          >
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
              {isHi ? `${data.basic.monthNumber}` : `Month ${data.basic.monthNumber}`}
            </p>
            <h3 className="text-lg font-bold text-white">
              {isHi ? data.basic.hindiName : data.basic.englishName}
            </h3>
            <p className="text-sm text-purple-300 mt-1">
              {isHi ? data.ritu.name.hi : data.ritu.name.en}
            </p>
            <p className="text-xs text-gray-400 mt-2 leading-snug line-clamp-2">
              {isHi ? data.hero.subtitle.hi : data.hero.subtitle.en}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
