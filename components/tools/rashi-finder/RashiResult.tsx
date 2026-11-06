// Rashi Finder result card (rendered inside ToolResultSection for toolId "rashi-finder"). Presentation only: values
// come from the existing /api/full-kundali response. A field the API did not send is left out, never estimated.
// The Moon's nakshatra, pada and degree are read from the raw `Planets` list, because fetchFullKundali reduces
// `planets` to name + house for the chart. No hooks; no paid report links here.
import Link from 'next/link';
import { horoscopeHref, isNearSignBoundary, nakshatraHref, nakshatraName, signName } from '@/lib/rashi';

type Moon = { name?: string; sign?: string; degree?: number; nakshatra?: string; pada?: number };
type MoonTraits = { title?: string; personality?: string; element?: string; ruling_planet?: string; symbol?: string };

const textLink =
  'inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] rounded-sm';

export default function RashiResult({ rashi, planets, traits, locale }: { rashi?: string; planets?: unknown; traits?: MoonTraits | null; locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi';
  const lp = isHi ? '/hi' : '';
  const moon = (Array.isArray(planets) ? (planets as Moon[]) : []).find((p) => p?.name === 'Moon');
  const sign = rashi || moon?.sign;
  const displaySign = signName(sign, isHi);
  const degree = typeof moon?.degree === 'number' ? moon.degree : undefined;

  const facts = [
    { label: isHi ? 'चंद्र राशि' : 'Moon sign', value: displaySign },
    { label: isHi ? 'नक्षत्र' : 'Nakshatra', value: moon?.nakshatra ? nakshatraName(moon.nakshatra, isHi) : undefined },
    { label: isHi ? 'पद' : 'Pada', value: moon?.pada ? String(moon.pada) : undefined },
    { label: isHi ? 'राशि स्वामी' : 'Ruling planet', value: traits?.ruling_planet },
    { label: isHi ? 'तत्व' : 'Element', value: traits?.element },
    { label: isHi ? 'चंद्रमा का अंश' : "Moon's degree", value: degree !== undefined ? `${degree.toFixed(2)}°` : undefined },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value));

  const daily = horoscopeHref('daily', sign, isHi);
  const monthly = horoscopeHref('monthly', sign, isHi);
  const yearly = horoscopeHref('yearly', sign, isHi);
  const nakshatra = nakshatraHref(moon?.nakshatra, isHi);
  const links = [
    daily && { href: daily, label: isHi ? `${displaySign} का आज का राशिफल` : `Today's ${displaySign} horoscope` },
    monthly && { href: monthly, label: isHi ? `${displaySign} का मासिक राशिफल` : `${displaySign} monthly horoscope` },
    yearly && { href: yearly, label: isHi ? `${displaySign} का वार्षिक राशिफल` : `${displaySign} yearly horoscope` },
    nakshatra && { href: nakshatra, label: isHi ? `${nakshatraName(moon?.nakshatra, true)} नक्षत्र मार्गदर्शिका` : `${moon?.nakshatra} Nakshatra guide` },
    { href: `${lp}/tools/sadhesati-calculator`, label: isHi ? 'साढ़े साती कैलकुलेटर' : 'Sade Sati Calculator' },
    { href: `${lp}/tools/lagna-finder`, label: isHi ? 'अपना लग्न जानें' : 'Find your Lagna' },
  ].filter((l): l is { href: string; label: string } => Boolean(l));

  return (
    <div data-testid="rashi-result" className="space-y-5 text-[#45516A]">
      <section aria-labelledby="rashi-moon-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
        <h3 id="rashi-moon-heading" className="text-[19px] font-bold leading-snug text-[#1B2A4A]">{isHi ? 'आपकी चंद्र राशि' : 'Your Moon Sign'}</h3>
        <dl className="mt-3 divide-y divide-[#EFE7D8]">
          {facts.map((f) => (
            <div key={f.label} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <dt className="text-[15px] text-[#45516A]">{f.label}</dt>
              <dd className="text-[15px] font-semibold text-[#1B2A4A]">{f.value}</dd>
            </div>
          ))}
        </dl>
        {isNearSignBoundary(degree) && (
          <p data-testid="rashi-boundary-note" className="mt-3 rounded-xl border border-[#E6C28A] bg-[#FDF3E3] px-4 py-3 text-[15px] leading-6 text-[#5C3A00]">
            {isHi
              ? 'जन्म के समय चंद्रमा राशि की सीमा के पास था। चंद्रमा लगभग दो घंटे में एक अंश चलता है, इसलिए अपना जन्म समय जाँच लें: समय में थोड़ा अंतर होने पर राशि बदल सकती है।'
              : 'The Moon was close to the edge of this sign at your birth. It moves about one degree in two hours, so please double-check your birth time: a small difference could change your Rashi.'}
          </p>
        )}
      </section>

      {traits?.personality && (
        <section aria-labelledby="rashi-traits-heading" className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
          <h3 id="rashi-traits-heading" className="text-[18px] font-bold text-[#1B2A4A]">{traits.title || (isHi ? 'आपकी राशि का स्वभाव' : 'Your Rashi Traits')}</h3>
          <p className="mt-2 whitespace-pre-line text-[15px] leading-7 text-[#45516A]">{traits.personality}</p>
        </section>
      )}

      <section aria-labelledby="rashi-next-heading" className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5">
        <h3 id="rashi-next-heading" className="text-[18px] font-bold text-[#1B2A4A]">{isHi ? 'आगे क्या देखें' : 'Next Steps'}</h3>
        <ul className="mt-2 grid grid-cols-1 gap-x-6 sm:grid-cols-2">
          {links.map((l) => (
            <li key={l.href}><Link href={l.href} className={textLink}>{l.label}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
}
