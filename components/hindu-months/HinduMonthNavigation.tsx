import { HinduMonthDetail } from '@/lib/data/hinduMonthsData';
import Link from 'next/link';

export default function HinduMonthNavigation({
  data,
  locale,
}: {
  data: HinduMonthDetail['crossLinks'];
  locale: string;
}) {
  const isHi = locale === 'hi';
  const langPath = isHi ? '/hi' : '';

  return (
    <section className="py-10 border-t border-white/10 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <Link
          href={`${langPath}/hindu-months/${data.previousMonthSlug}`}
          className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors font-medium"
        >
          <span>←</span>
          <span>{isHi ? "पिछला महीना" : "Previous Month"}</span>
        </Link>
        <Link
          href={`${langPath}/hindu-months`}
          className="text-sm text-gray-400 hover:text-purple-300 transition-colors"
        >
          {isHi ? "सभी महीने" : "All Months"}
        </Link>
        <Link
          href={`${langPath}/hindu-months/${data.nextMonthSlug}`}
          className="flex items-center gap-2 text-purple-300 hover:text-white transition-colors font-medium"
        >
          <span>{isHi ? "अगला महीना" : "Next Month"}</span>
          <span>→</span>
        </Link>
      </div>
    </section>
  );
}
