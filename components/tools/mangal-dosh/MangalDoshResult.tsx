// Mangal Dosh result card (rendered inside ToolResultSection for toolId "mangal-dosh"). Presentation only: every
// value comes from the backend's manglik_dosh block (services/mangalik_dosh_logic.py), which is not changed.
// Shows the status, Mars from Lagna and Moon, Jupiter's position and the three cancellation checks, then the
// backend's own personalised paragraphs and the next steps. No hooks.
import Link from 'next/link';
import { kundliMatchingHref } from '@/lib/kundliMatchingRoute';
import { ENGINE_MANGAL_DOSH_HOUSES, houseOrdinal, isHouse, marsInHouseHref, mangalStatusView } from '@/lib/mangalDosh';
import MangalDoshReportCta from './MangalDoshReportCta';

type Manglik = {
  heading?: string;
  status?: { is_mangalic?: string; strength?: string };
  context?: {
    mars_sign?: string;
    mars_house_from_lagna?: number;
    mars_house_from_moon?: number;
    jupiter_house_from_lagna?: number;
    jupiter_house_from_moon?: number;
    cancellation_flags?: {
      mars_own_or_exalted?: boolean;
      jupiter_in_kendra_from_lagna_or_moon?: boolean;
      benefic_aspect_or_conjunction_on_mars?: boolean;
    };
  };
  evaluation?: { triggers?: { from_lagna?: boolean; from_moon?: boolean } };
  report_paragraphs?: string[];
  general_explanation?: string;
};

const TONE: Record<string, string> = {
  clear: 'bg-[#E8F3EC] text-[#1E6B3A] border-[#9CCBAE]',
  cancelled: 'bg-[#E8F3EC] text-[#1E6B3A] border-[#9CCBAE]',
  partial: 'bg-[#FDF3E3] text-[#8A4B00] border-[#E6C28A]',
  present: 'bg-[#FDECE7] text-[#8A2A1F] border-[#E7B3A6]',
  unknown: 'bg-[#F5EEDF] text-[#45516A] border-[#E8DDC9]',
};
const textLink =
  'inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm';

export default function MangalDoshResult({ data, locale }: { data: Manglik; locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const ctx = data.context || {};
  const flags = ctx.cancellation_flags || {};
  const triggers = data.evaluation?.triggers || {};
  const status = mangalStatusView(data.status?.strength, isHi);

  const house = (n: unknown) => (isHouse(n) ? (isHi ? `${houseOrdinal(n, true)} भाव` : `${houseOrdinal(n, false)} house`) : '—');
  const counts = (on: boolean | undefined) =>
    on ? (
      <span className="ml-2 inline-flex rounded-md border border-[#E6C28A] bg-[#FDF3E3] px-2 py-0.5 text-[13px] font-semibold text-[#8A4B00]">
        {isHi ? 'मंगल दोष भाव' : 'Mangal Dosh house'}
      </span>
    ) : null;

  const facts = [
    { label: isHi ? 'मंगल की राशि' : 'Mars sign', value: ctx.mars_sign || '—' },
    { label: isHi ? 'लग्न से मंगल' : 'Mars from Lagna', value: house(ctx.mars_house_from_lagna), extra: counts(triggers.from_lagna) },
    { label: isHi ? 'चंद्र से मंगल' : 'Mars from Moon', value: house(ctx.mars_house_from_moon), extra: counts(triggers.from_moon) },
    { label: isHi ? 'लग्न से गुरु' : 'Jupiter from Lagna', value: house(ctx.jupiter_house_from_lagna) },
    { label: isHi ? 'चंद्र से गुरु' : 'Jupiter from Moon', value: house(ctx.jupiter_house_from_moon) },
  ];
  const checks = [
    { label: isHi ? 'मंगल स्वराशि या उच्च राशि में (मेष, वृश्चिक, मकर)' : 'Mars in its own or exaltation sign (Aries, Scorpio, Capricorn)', on: flags.mars_own_or_exalted },
    { label: isHi ? 'गुरु लग्न या चंद्र से केंद्र (1, 4, 7, 10) में' : 'Jupiter in a Kendra (1, 4, 7, 10) from Lagna or Moon', on: flags.jupiter_in_kendra_from_lagna_or_moon },
    { label: isHi ? 'मंगल पर गुरु की दृष्टि या एक ही राशि में युति' : "Jupiter's aspect on Mars, or Jupiter in the same sign", on: flags.benefic_aspect_or_conjunction_on_mars },
  ];
  const marsHouse = ctx.mars_house_from_lagna;

  return (
    <div data-testid="mangal-result" className="space-y-5 text-[#45516A]">
      {/* Status */}
      <section aria-labelledby="mangal-status-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 id="mangal-status-heading" className="text-[19px] font-bold leading-snug text-[#1B2A4A]">
            {isHi ? 'आपकी मांगलिक स्थिति' : 'Your Manglik Status'}
          </h3>
          <span data-testid="mangal-status" className={`rounded-lg border px-3 py-1 text-[15px] font-bold ${TONE[status.tone]}`}>{status.label}</span>
        </div>
        {data.status?.is_mangalic && <p className="mt-2 text-[16px] leading-7 text-[#1B2A4A]">{data.status.is_mangalic}</p>}
      </section>

      {/* Mars and Jupiter positions */}
      <section aria-labelledby="mangal-positions-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
        <h3 id="mangal-positions-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'मंगल और गुरु की स्थिति' : 'Mars and Jupiter Positions'}</h3>
        <dl className="mt-3 divide-y divide-[#EFE7D8]">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <dt className="text-[15px] text-[#45516A]">{f.label}</dt>
              <dd className="text-[15px] font-semibold text-[#1B2A4A]">{f.value}{f.extra}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-[14px] leading-6 text-[#5B667D]">
          {isHi
            ? `मंगल दोष तब माना जाता है जब मंगल लग्न या चंद्र से ${ENGINE_MANGAL_DOSH_HOUSES.join(', ')}वें भाव में हो।`
            : `Mangal Dosh is read when Mars is in the ${ENGINE_MANGAL_DOSH_HOUSES.map((n) => houseOrdinal(n, false)).join(', ')} house from the Lagna or the Moon.`}
        </p>
      </section>

      {/* Three cancellation checks */}
      <section aria-labelledby="mangal-checks-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
        <h3 id="mangal-checks-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'तीन दोष भंग जाँच' : 'Three Cancellation Checks'}</h3>
        <ul className="mt-3 space-y-2">
          {checks.map((c) => (
            <li key={c.label} className="flex items-start justify-between gap-3 rounded-xl border border-[#EFE7D8] px-4 py-3">
              <span className="text-[15px] leading-6 text-[#1B2A4A]">{c.label}</span>
              <span className={`flex-none rounded-md border px-2 py-0.5 text-[13px] font-semibold ${c.on ? TONE.clear : TONE.unknown}`}>
                {c.on ? (isHi ? 'मौजूद' : 'Present') : (isHi ? 'नहीं' : 'Not present')}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Backend's personalised reading */}
      {Array.isArray(data.report_paragraphs) && data.report_paragraphs.length > 0 && (
        <section aria-labelledby="mangal-reading-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
          <h3 id="mangal-reading-heading" className="text-[18px] font-bold text-[#1B2A4A]">{data.heading || (isHi ? 'मंगल दोष विश्लेषण' : 'Mangal Dosh Analysis')}</h3>
          <div className="mt-2 space-y-3">
            {data.report_paragraphs.map((p, i) => (
              <p key={i} className="whitespace-pre-line text-[15px] leading-7 text-[#45516A]">{p}</p>
            ))}
          </div>
        </section>
      )}
      {data.general_explanation && (
        <details className="rounded-2xl border border-[#E8DDC9] bg-white px-5 py-3">
          <summary className="min-h-[44px] cursor-pointer py-2 text-[15px] font-semibold text-[#1B2A4A]">
            {isHi ? 'मंगल दोष के बारे में पढ़ें' : 'Read about Mangal Dosh'}
          </summary>
          <p className="mt-1 whitespace-pre-line pb-2 text-[15px] leading-7 text-[#45516A]">{data.general_explanation}</p>
        </details>
      )}

      {/* Next steps */}
      <section aria-labelledby="mangal-next-heading" className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5">
        <h3 id="mangal-next-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'आगे क्या देखें' : 'Next Steps'}</h3>
        <ul className="mt-2 space-y-1">
          {isHouse(marsHouse) && (
            <li>
              <Link href={marsInHouseHref(marsHouse, isHi)} className={textLink}>
                {isHi ? `${houseOrdinal(marsHouse, true)} भाव में मंगल का अर्थ` : `What Mars in the ${houseOrdinal(marsHouse, false)} house means`}
              </Link>
            </li>
          )}
          <li>
            <Link href={kundliMatchingHref(isHi)} className={textLink}>
              {isHi ? 'साथी के साथ मंगल दोष मिलाएँ — फ्री कुंडली मिलान' : "Compare with a partner's chart — Free Kundli Matching"}
            </Link>
          </li>
          <li>
            <Link href={`${lp}/marriage-astrology`} className={textLink}>{isHi ? 'विवाह ज्योतिष — सभी प्रश्न और टूल' : 'Marriage Astrology — every question and tool'}</Link>
          </li>
        </ul>
      </section>

      <MangalDoshReportCta locale={locale} />
    </div>
  );
}
