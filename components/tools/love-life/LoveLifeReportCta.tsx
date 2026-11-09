'use client';

// The Love Life result's single paid next step: the existing Love & Relationship Report, whose backend context reads
// the same factors (houses 5 and 7; Venus, Moon, Mars -- report_product_intelligence "love_relationship_report").
// Price from app/data/reportsData.ts (live price set by migration c5e1d7a9b2f4), URL from lib/reportProductSeo.ts,
// click tracking with fixed ids only (same convention as the other tool report CTAs). Checkout is untouched.
import Link from 'next/link';
import { reportsData } from '@/app/data/reportsData';
import { getReportProductPath } from '@/lib/reportProductSeo';
import { trackYogaReportCtaClick } from '@/components/YogaReportCta';

export const LOVE_LIFE_REPORT_SLUG = 'love_relationship_report';
export const LOVE_LIFE_REPORT_CTA = { ctaId: 'tools_love-life_report_cta', screenName: 'tools_love-life' } as const;

export default function LoveLifeReportCta({ locale }: { locale: 'en' | 'hi' }) {
  const report = reportsData.find((r) => r.slug === LOVE_LIFE_REPORT_SLUG);
  if (!report) return null;
  const isHi = locale === 'hi';
  return (
    <section aria-labelledby="ll-report-heading" className="rounded-2xl border-2 border-[#C9A227] bg-white p-5 sm:p-6">
      <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{isHi ? 'प्रेम और संबंध रिपोर्ट' : 'Love & Relationship Report'}</p>
      <h3 id="ll-report-heading" className="mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]">
        {isHi ? 'अपने प्रेम जीवन का विस्तृत विश्लेषण चाहते हैं?' : 'Want a Detailed Reading of Your Love Life?'}
      </h3>
      <p className="mt-2 text-[15px] leading-7 text-[#45516A]">
        {isHi
          ? 'यह फ्री जाँच आपके पंचम और सप्तम भाव की झलक है। प्रेम और संबंध रिपोर्ट आपकी कुंडली से इन भावों, शुक्र, चंद्र और मंगल, और आपकी वर्तमान दशा का अलग, विस्तृत विश्लेषण है। रिपोर्ट PDF के रूप में आपके ईमेल पर, हिंदी या अंग्रेज़ी में।'
          : 'This free check is a snapshot of your 5th and 7th houses. The Love & Relationship Report is a separate, detailed reading of these houses, Venus, the Moon and Mars, and your current Dasha period from your chart. Delivered as a PDF to your email, in English or Hindi.'}
      </p>
      <Link
        href={getReportProductPath(report.slug, locale)}
        onClick={() => trackYogaReportCtaClick(LOVE_LIFE_REPORT_CTA)}
        className="mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 text-[15px] font-bold text-white hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2"
      >
        {isHi ? `प्रेम और संबंध रिपोर्ट पाएं — ₹${report.price}` : `Get Love & Relationship Report — ₹${report.price}`}
      </Link>
    </section>
  );
}
