// components/focused-reports/FocusedReportHero.tsx
// Above-the-fold: H1 (exact catalog question), value proposition, price,
// 3-4 benefits, primary CTA, trust line. Server component -- no client JS
// needed, locale comes from the route (params.locale), never re-detected.

import Link from "next/link";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";
import { getReportSampleUrl } from "@/lib/reportSamples";

interface Props {
  config: FocusedReportConfig;
  title: string;
  question: string;
  locale: Locale;
}

export default function FocusedReportHero({ config, title, question, locale }: Props) {
  const benefits = config.benefits[locale];

  return (
    <section className="max-w-4xl mx-auto text-center px-4 pt-12 pb-8">
      <p className="text-sm font-semibold tracking-wide uppercase text-purple-400 mb-3">
        {locale === "hi" ? "व्यक्तिगत ज्योतिष रिपोर्ट" : "Personalized Astrology Report"}
      </p>

      <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}
      </h1>

      <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-6">
        {question}
      </p>

      <p className="text-slate-400 max-w-2xl mx-auto mb-8">
        {locale === "hi"
          ? "आपकी अपनी जन्म कुंडली, दशा और गोचर के आधार पर तैयार एक व्यक्तिगत रिपोर्ट -- सामान्य जानकारी नहीं।"
          : "A report generated specifically for your own birth chart, Dasha and transits -- not generic content."}
      </p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-8 text-left">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex gap-2 text-slate-300 text-sm md:text-base">
            <span className="text-purple-400 mt-0.5" aria-hidden="true">✓</span>
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-col items-center gap-3">
        <Link
          href="#focused-report-form"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-all active:scale-95"
        >
          {locale === "hi" ? `₹${config.priceRupees} में अपनी रिपोर्ट पाएं` : `Get Your Report for ₹${config.priceRupees}`}
        </Link>

        <p className="text-xs text-slate-500 max-w-md">
          {locale === "hi"
            ? "आपकी जन्म जानकारी से तैयार, सुरक्षित भुगतान के बाद कुछ ही मिनटों में ईमेल पर।"
            : "Built from your own birth details, emailed to you within minutes of secure payment."}
        </p>

        {/* Secondary "View Sample Report" link -- reuses the existing shared
            sample-report infrastructure (lib/reportSamples.ts + public/
            report-samples/), exactly like components/reports/ReportContent.tsx
            already does for the 25 standard reports. config.questionKey (never
            humanSlug/title) drives the URL, so #62 can only ever link to its
            own sample and #63 to its own -- there is no code path for either
            to open the other's PDF. Plain anchor: no order/payment/backend
            request, no carousel/modal, no second sample architecture. */}
        <a
          href={getReportSampleUrl(config.questionKey, locale)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:border-purple-300 hover:text-white"
        >
          {locale === "hi" ? "Sample Report देखें" : "View Sample Report"}
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
