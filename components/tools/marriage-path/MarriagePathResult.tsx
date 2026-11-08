// Marriage Path result card (rendered inside ToolResultSection for toolId "marriage-path"). Presentation only:
// every value comes from the /api/life-tool "marriage_path" block (services/marriage_path.py). The 7th-house facts
// (seventh_sign, seventh_lord, seventh_lord_house, seventh_house_planets) are additive fields; when an older backend
// does not send them, those rows are simply left out. Empty point lists are never shown as empty headings, and
// nothing is interpreted for an empty 7th house beyond the facts themselves. No hooks.
import Link from 'next/link';
import { houseOrdinal, isHouse } from '@/lib/mangalDosh';
import { planetInHouseHref, planetName, signName } from '@/lib/rashi';
import { kundliMatchingHref } from '@/lib/kundliMatchingRoute';
import MarriagePathReportCta from './MarriagePathReportCta';

type MarriagePath = {
  heading?: string;
  positive_points?: string[];
  negative_points?: string[];
  dominant_influence?: string;
  seventh_sign?: string;
  seventh_lord?: string;
  seventh_lord_house?: number | null;
  seventh_house_planets?: string[];
};

// Hindi house name in the direct form, for a standalone value ("पहला भाव"); houseOrdinal gives the oblique form used
// inside sentences ("पहले भाव में").
const HI_HOUSE_DIRECT = ['', 'पहला', 'दूसरा', 'तीसरा', 'चौथा', 'पाँचवाँ', 'छठा', 'सातवाँ', 'आठवाँ', 'नौवाँ', 'दसवाँ', 'ग्यारहवाँ', 'बारहवाँ'];

const textLink =
  'inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm';
const card = 'rounded-2xl border border-[#E8DDC9] bg-white p-5';

export default function MarriagePathResult({ data, locale }: { data: MarriagePath; locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const positives = Array.isArray(data.positive_points) ? data.positive_points.filter(Boolean) : [];
  const negatives = Array.isArray(data.negative_points) ? data.negative_points.filter(Boolean) : [];
  const occupants = Array.isArray(data.seventh_house_planets) ? data.seventh_house_planets : null;
  const lordHouse = data.seventh_lord_house;
  const hasFacts = Boolean(data.seventh_sign || data.seventh_lord);

  const facts = [
    { label: isHi ? 'सप्तम भाव की राशि' : '7th house sign', value: data.seventh_sign ? signName(data.seventh_sign, isHi) : undefined },
    { label: isHi ? 'सप्तमेश' : '7th lord', value: data.seventh_lord ? planetName(data.seventh_lord, isHi) : undefined },
    { label: isHi ? 'सप्तमेश का भाव' : '7th lord is in', value: isHouse(lordHouse) ? (isHi ? `${HI_HOUSE_DIRECT[lordHouse]} भाव` : `the ${houseOrdinal(lordHouse, false)} house`) : undefined },
    {
      label: isHi ? 'सप्तम भाव में ग्रह' : 'Planets in your 7th house',
      value: occupants ? (occupants.length ? occupants.map((p) => planetName(p, isHi)).join(isHi ? ', ' : ', ') : (isHi ? 'कोई नहीं' : 'None')) : undefined,
    },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const lordGuide = planetInHouseHref(data.seventh_lord, lordHouse, isHi);
  const noRule = positives.length === 0 && negatives.length === 0 && !data.dominant_influence;

  return (
    <div data-testid="marriage-path-result" className="space-y-5 text-[#45516A]">
      {facts.length > 0 && (
        <section aria-labelledby="mp-facts-heading" className={card}>
          <h3 id="mp-facts-heading" className="text-[19px] font-bold leading-snug text-[#1B2A4A]">{isHi ? 'आपका सप्तम भाव' : 'Your 7th House'}</h3>
          <dl className="mt-3 divide-y divide-[#EFE7D8]">
            {facts.map((f) => (
              <div key={f.label} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                <dt className="text-[15px] text-[#45516A]">{f.label}</dt>
                <dd className="text-[15px] font-semibold text-[#1B2A4A]">{f.value}</dd>
              </div>
            ))}
          </dl>
          {noRule && hasFacts && (
            <p data-testid="mp-no-rule" className="mt-3 rounded-xl border border-[#E8DDC9] bg-[#FBF8F2] px-4 py-3 text-[15px] leading-6 text-[#45516A]">
              {isHi
                ? 'इस कैलकुलेटर की जाँचों (सप्तम भाव में ग्रह, उच्च या नीच के शुक्र और गुरु, सप्तमेश के साथ राहु) में से कोई आपकी कुंडली पर लागू नहीं होती। आपका सप्तम भाव ऊपर दी गई राशि और सप्तमेश से पढ़ा जाता है।'
                : 'None of this calculator’s checks (planets in the 7th house, exalted or debilitated Venus and Jupiter, Rahu with the 7th lord) applies to your chart. Your 7th house is read through the sign and lord shown above.'}
            </p>
          )}
        </section>
      )}

      {data.dominant_influence && (
        <section aria-labelledby="mp-key-heading" className={card}>
          <h3 id="mp-key-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'प्रमुख प्रभाव' : 'Key Influence'}</h3>
          <p className="mt-2 text-[15px] leading-7 text-[#45516A]">{data.dominant_influence}</p>
        </section>
      )}

      {positives.length > 0 && (
        <section aria-labelledby="mp-pos-heading" className={card}>
          <h3 id="mp-pos-heading" className="text-[18px] font-bold text-[#1E6B3A]">{isHi ? 'सहायक संकेत' : 'Supportive Indicators'}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-[#45516A] marker:text-[#1E6B3A]">
            {positives.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}

      {negatives.length > 0 && (
        <section aria-labelledby="mp-neg-heading" className={card}>
          <h3 id="mp-neg-heading" className="text-[18px] font-bold text-[#8A4B00]">{isHi ? 'ध्यान देने योग्य संकेत' : 'Points to Watch'}</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[15px] leading-7 text-[#45516A] marker:text-[#8A4B00]">
            {negatives.map((p, i) => <li key={i}>{p}</li>)}
          </ul>
        </section>
      )}

      <p className="text-[14px] leading-6 text-[#5B667D]">
        {isHi
          ? 'ये पारंपरिक संकेत हैं, तय परिणाम नहीं। यह जाँच विवाह का समय या जीवनसाथी से अनुकूलता नहीं बताती।'
          : 'These are traditional indicators, not fixed outcomes. This check does not predict marriage timing or partner compatibility.'}
      </p>

      <section aria-labelledby="mp-next-heading" className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5">
        <h3 id="mp-next-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'आगे क्या देखें' : 'Next Steps'}</h3>
        <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {lordGuide && (
            <li>
              <Link href={lordGuide} className={textLink}>
                {isHi
                  ? `${houseOrdinal(lordHouse as number, true)} भाव में ${planetName(data.seventh_lord, true)} का अर्थ`
                  : `What ${data.seventh_lord} in the ${houseOrdinal(lordHouse as number, false)} house means`}
              </Link>
            </li>
          )}
          <li><Link href={kundliMatchingHref(isHi)} className={textLink}>{isHi ? 'फ्री कुंडली मिलान' : 'Free Kundli Matching'}</Link></li>
          <li><Link href={`${lp}/tools/mangal-dosh`} className={textLink}>{isHi ? 'मंगल दोष जाँचें' : 'Check Mangal Dosh'}</Link></li>
          <li><Link href={`${lp}/marriage-astrology/marriage-timing`} className={textLink}>{isHi ? 'विवाह के समय की मार्गदर्शिका' : 'Marriage Timing guide'}</Link></li>
          <li><Link href={`${lp}/marriage-astrology`} className={textLink}>{isHi ? 'विवाह ज्योतिष' : 'Marriage Astrology'}</Link></li>
        </ul>
      </section>

      <MarriagePathReportCta locale={locale} />
    </div>
  );
}
