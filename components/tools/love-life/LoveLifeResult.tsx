// Love Life result card (rendered inside ToolResultSection for toolId "love-life"). Presentation only: every value
// comes from the /api/life-tool "love_life" block (services/love_life.py). Points are {en, hi} objects and are shown in
// the page language. The 5th/7th-house facts are additive fields; with an older backend those rows are left out.
// Empty point lists never render a heading, and nothing is interpreted for houses without these placements. No hooks.
import Link from 'next/link';
import { planetName, signName } from '@/lib/rashi';
import { kundliMatchingHref } from '@/lib/kundliMatchingRoute';
import LoveLifeReportCta from './LoveLifeReportCta';

type Point = string | { en?: string; hi?: string };
type LoveLife = {
  heading?: string;
  positive_points?: Point[];
  negative_points?: Point[];
  fifth_sign?: string | null;
  seventh_sign?: string | null;
  fifth_house_planets?: string[];
  seventh_house_planets?: string[];
};

const textLink =
  'inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm';
const card = 'rounded-2xl border border-[#E8DDC9] bg-white p-5';

/** The point in the page language; a plain string (older payloads) is shown as it came. */
export const pointText = (p: Point, locale: 'en' | 'hi'): string =>
  typeof p === 'string' ? p : (p?.[locale] || p?.en || '');

export default function LoveLifeResult({ data, locale }: { data: LoveLife; locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const positives = (Array.isArray(data.positive_points) ? data.positive_points : []).map((p) => pointText(p, locale)).filter(Boolean);
  const negatives = (Array.isArray(data.negative_points) ? data.negative_points : []).map((p) => pointText(p, locale)).filter(Boolean);
  const list = (ps?: string[]) => (Array.isArray(ps) ? (ps.length ? ps.map((p) => planetName(p, isHi)).join(', ') : (isHi ? 'कोई नहीं' : 'None')) : undefined);

  const facts = [
    { label: isHi ? 'पंचम भाव की राशि' : '5th house sign', value: data.fifth_sign ? signName(data.fifth_sign, isHi) : undefined },
    { label: isHi ? 'पंचम भाव में ग्रह' : 'Planets in your 5th house', value: list(data.fifth_house_planets) },
    { label: isHi ? 'सप्तम भाव की राशि' : '7th house sign', value: data.seventh_sign ? signName(data.seventh_sign, isHi) : undefined },
    { label: isHi ? 'सप्तम भाव में ग्रह' : 'Planets in your 7th house', value: list(data.seventh_house_planets) },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));
  const noRule = positives.length === 0 && negatives.length === 0;

  return (
    <div data-testid="love-life-result" className="space-y-5 text-[#45516A]">
      {facts.length > 0 && (
        <section aria-labelledby="ll-facts-heading" className={card}>
          <h3 id="ll-facts-heading" className="text-[19px] font-bold leading-snug text-[#1B2A4A]">{isHi ? 'आपके प्रेम और साझेदारी के भाव' : 'Your Houses of Love and Partnership'}</h3>
          <dl className="mt-3 divide-y divide-[#EFE7D8]">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <dt className="text-[15px] text-[#45516A]">{f.label}</dt>
                <dd className="text-[15px] font-semibold text-[#1B2A4A]">{f.value}</dd>
              </div>
            ))}
          </dl>
          {noRule && (
            <p data-testid="ll-no-rule" className="mt-3 rounded-xl border border-[#E8DDC9] bg-[#FBF8F2] px-4 py-3 text-[15px] leading-6 text-[#45516A]">
              {isHi
                ? 'इस कैलकुलेटर की कोई भी स्थिति (पंचम या सप्तम में शुक्र, चंद्र, शनि या केतु, या सप्तम में सूर्य या मंगल) आपकी कुंडली पर लागू नहीं होती। आपके भाव ऊपर दी गई राशियों और उनके स्वामियों से पढ़े जाते हैं।'
                : 'None of this calculator’s placements (Venus, Moon, Saturn or Ketu in the 5th or 7th, or the Sun or Mars in the 7th) applies to your chart. Your houses are read through the signs shown above and their lords.'}
            </p>
          )}
        </section>
      )}

      {positives.length > 0 && (
        <section aria-labelledby="ll-pos-heading" className={card}>
          <h3 id="ll-pos-heading" className="text-[18px] font-bold text-[#1E6B3A]">{isHi ? 'सहायक संकेत' : 'Supportive Indicators'}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-[#45516A] marker:text-[#1E6B3A]">
            {positives.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}

      {negatives.length > 0 && (
        <section aria-labelledby="ll-neg-heading" className={card}>
          <h3 id="ll-neg-heading" className="text-[18px] font-bold text-[#8A4B00]">{isHi ? 'ध्यान देने योग्य संकेत' : 'Points to Watch'}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-[#45516A] marker:text-[#8A4B00]">
            {negatives.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}

      <p className="text-[14px] leading-6 text-[#5B667D]">
        {isHi
          ? 'ये पारंपरिक संकेत हैं, तय परिणाम नहीं। यह जाँच अनुकूलता या समय नहीं बताती।'
          : 'These are traditional indicators, not fixed outcomes. This check does not predict compatibility or timing.'}
      </p>

      <section aria-labelledby="ll-next-heading" className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5">
        <h3 id="ll-next-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'आगे क्या देखें' : 'Next Steps'}</h3>
        <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          <li><Link href={kundliMatchingHref(isHi)} className={textLink}>{isHi ? 'साथी के साथ मिलान — फ्री कुंडली मिलान' : "Compare with a partner — Free Kundli Matching"}</Link></li>
          <li><Link href={`${lp}/tools/marriage-path`} className={textLink}>{isHi ? 'विवाह मार्ग कैलकुलेटर' : 'Marriage Path Calculator'}</Link></li>
          <li><Link href={`${lp}/marriage-astrology/love-marriage`} className={textLink}>{isHi ? 'प्रेम विवाह मार्गदर्शिका' : 'Love Marriage guide'}</Link></li>
          <li><Link href={`${lp}/marriage-astrology`} className={textLink}>{isHi ? 'विवाह ज्योतिष' : 'Marriage Astrology'}</Link></li>
        </ul>
      </section>

      <LoveLifeReportCta locale={locale} />
    </div>
  );
}
