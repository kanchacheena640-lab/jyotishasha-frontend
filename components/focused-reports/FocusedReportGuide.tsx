// components/focused-reports/FocusedReportGuide.tsx
// F12-P2.1: the topic-specific explanatory content for focused reports that
// have their own SEO content (config.seo): introduction, what the report reads
// in the chart, a reading guide useful without buying, how it differs from
// related pages (with links), and how the report is written. Server component.

import Link from "next/link";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import { AI_DISCLOSURE } from "@/app/data/focused-report-content";
import type { Locale } from "@/lib/authority-engine/types";

interface Props {
  config: FocusedReportConfig;
  locale: Locale;
}

export default function FocusedReportGuide({ config, locale }: Props) {
  const seo = config.seo;
  if (!seo) return null;
  const isHi = locale === "hi";

  return (
    <section className="max-w-3xl mx-auto px-4 pt-12">
      <div className="space-y-4 mb-10">
        {seo.intro[locale].map((paragraph) => (
          <p key={paragraph.slice(0, 32)} className="text-slate-300 leading-relaxed text-base md:text-lg">{paragraph}</p>
        ))}
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
        {isHi ? "यह रिपोर्ट आपकी कुंडली में क्या पढ़ती है" : "What This Report Reads in Your Chart"}
      </h2>
      <ul className="mb-10 space-y-2">
        {seo.analyzes[locale].map((item) => (
          <li key={item} className="flex gap-2 text-slate-300">
            <span className="text-purple-400 mt-0.5" aria-hidden="true">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{seo.readingGuide.heading[locale]}</h2>
      <ul className="mb-10 space-y-3">
        {seo.readingGuide.points[locale].map((point) => (
          <li key={point} className="rounded-xl border border-slate-700/70 bg-slate-900/30 p-4 text-slate-300 leading-relaxed">
            {point}
          </li>
        ))}
      </ul>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">
        {isHi ? "यह रिपोर्ट दूसरे पेजों से कैसे अलग है" : "How This Differs From Related Pages"}
      </h2>
      <p className="text-slate-300 leading-relaxed mb-4">{seo.differentiation[locale]}</p>
      <ul className="mb-10 grid gap-2 sm:grid-cols-2">
        {seo.internalLinks.map((link) => (
          <li key={link.path}>
            <Link
              href={isHi && link.localized ? `/hi${link.path}` : link.path}
              className="block rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-sm font-medium text-purple-100 hover:bg-purple-500/20"
            >
              {link.label[locale]} →
            </Link>
          </li>
        ))}
      </ul>

      <div className="rounded-xl border border-amber-300/25 bg-amber-300/[0.06] p-5">
        <h2 className="text-base font-semibold text-amber-100 mb-1">{AI_DISCLOSURE.heading[locale]}</h2>
        <p className="text-sm text-amber-50/85 leading-relaxed">{AI_DISCLOSURE.body[locale]}</p>
      </div>
    </section>
  );
}
