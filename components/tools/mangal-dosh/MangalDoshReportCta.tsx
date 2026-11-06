'use client';

// The Mangal Dosh result's single paid next step: the existing ₹99 Marriage Report, whose backend context already
// includes the Mangal Dosh engine's summary (modules/payments/report_product_intelligence.py: marriage_report
// context_keys include "manglik_summary"). Price comes from app/data/reportsData.ts and the URL from
// lib/reportProductSeo.ts, never hand-typed. Click tracking follows YogaReportCta: fixed ids only, fire-and-forget.
import Link from 'next/link';
import { reportsData } from '@/app/data/reportsData';
import { getReportProductPath } from '@/lib/reportProductSeo';
import { trackYogaReportCtaClick } from '@/components/YogaReportCta';

export const MANGAL_DOSH_REPORT_SLUG = 'marriage_report';
export const MANGAL_DOSH_REPORT_CTA = { ctaId: 'tools_mangal-dosh_report_cta', screenName: 'tools_mangal-dosh' } as const;

export default function MangalDoshReportCta({ locale }: { locale: 'en' | 'hi' }) {
  const report = reportsData.find((r) => r.slug === MANGAL_DOSH_REPORT_SLUG);
  if (!report) return null;
  const isHi = locale === 'hi';
  return (
    <section aria-labelledby="mangal-report-heading" className="rounded-2xl border-2 border-[#C9A227] bg-white p-5 sm:p-6">
      <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{isHi ? 'विवाह रिपोर्ट' : 'Marriage Report'}</p>
      <h3 id="mangal-report-heading" className="mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]">
        {isHi ? 'आपकी विवाह रिपोर्ट में मंगल दोष शामिल है' : 'Your Marriage Report Takes Mangal Dosh into Account'}
      </h3>
      <p className="mt-2 text-[15px] leading-7 text-[#45516A]">
        {isHi
          ? 'विवाह रिपोर्ट आपकी अपनी कुंडली से विवाह की संभावनाएँ, सहायक दशा अवधियाँ और वैवाहिक जीवन पढ़ती है — इसमें मंगल दोष का यह आकलन भी शामिल है। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।'
          : 'The Marriage Report reads your marriage outlook, supportive Dasha periods and married-life dynamics from your own chart — including this Mangal Dosh assessment. Delivered as a PDF to your email, in English or Hindi.'}
      </p>
      <Link
        href={getReportProductPath(report.slug, locale)}
        onClick={() => trackYogaReportCtaClick(MANGAL_DOSH_REPORT_CTA)}
        className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 text-[15px] font-bold text-white hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
      >
        {isHi ? `विवाह रिपोर्ट पाएं — ₹${report.price}` : `Get Marriage Report — ₹${report.price}`}
      </Link>
    </section>
  );
}
