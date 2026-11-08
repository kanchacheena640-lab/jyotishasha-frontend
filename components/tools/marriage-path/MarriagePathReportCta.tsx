'use client';

// The Marriage Path result's single paid next step: the existing Marriage Report. Price from
// app/data/reportsData.ts, URL from lib/reportProductSeo.ts, click tracking with fixed ids only (same convention as
// the yoga and Mangal Dosh report CTAs). Checkout and payment are untouched.
import Link from 'next/link';
import { reportsData } from '@/app/data/reportsData';
import { getReportProductPath } from '@/lib/reportProductSeo';
import { trackYogaReportCtaClick } from '@/components/YogaReportCta';

export const MARRIAGE_PATH_REPORT_SLUG = 'marriage_report';
export const MARRIAGE_PATH_REPORT_CTA = { ctaId: 'tools_marriage-path_report_cta', screenName: 'tools_marriage-path' } as const;

export default function MarriagePathReportCta({ locale }: { locale: 'en' | 'hi' }) {
  const report = reportsData.find((r) => r.slug === MARRIAGE_PATH_REPORT_SLUG);
  if (!report) return null;
  const isHi = locale === 'hi';
  return (
    <section aria-labelledby="mp-report-heading" className="rounded-2xl border-2 border-[#C9A227] bg-white p-5 sm:p-6">
      <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{isHi ? 'विवाह रिपोर्ट' : 'Marriage Report'}</p>
      <h3 id="mp-report-heading" className="mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]">
        {isHi ? 'अपने विवाह का विस्तृत विश्लेषण चाहते हैं?' : 'Want a Detailed Reading of Your Marriage?'}
      </h3>
      <p className="mt-2 text-[15px] leading-7 text-[#45516A]">
        {isHi
          ? 'यह फ्री जाँच आपके सप्तम भाव की झलक है। विवाह रिपोर्ट आपकी कुंडली से विवाह की संभावनाएँ, वर्तमान दशा और वैवाहिक जीवन का अलग, विस्तृत विश्लेषण है। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।'
          : 'This free check is a snapshot of your 7th house. The Marriage Report is a separate, detailed reading of your marriage outlook, current Dasha period and married life from your chart. Delivered as a PDF to your email, in English or Hindi.'}
      </p>
      <Link
        href={getReportProductPath(report.slug, locale)}
        onClick={() => trackYogaReportCtaClick(MARRIAGE_PATH_REPORT_CTA)}
        className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 text-[15px] font-bold text-white hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
      >
        {isHi ? `विवाह रिपोर्ट पाएं — ₹${report.price}` : `Get Marriage Report — ₹${report.price}`}
      </Link>
    </section>
  );
}
