"use client";

import Image from "next/image";
import { useTranslation } from "react-i18next";
import { getReportSampleLabel, getReportSampleUrl } from "@/lib/reportSamples";
import { CHECKOUT_ANCHOR_ID, topCtaLabel } from "@/lib/checkoutUx";
import { getReportDisplayName } from "@/lib/reportProductSeo";

interface Props {
  report: any;
  seo: any;
}

export default function ReportContent({
  report,
  seo,
}: Props) {
  const { i18n } = useTranslation();

  const lang =
    i18n.language?.startsWith("hi")
      ? "hi"
      : "en";

  const displayName = getReportDisplayName(report, seo, lang);

  return (
    <div className="max-w-4xl mx-auto text-center mb-10">

      {/* Product image (the same catalog asset the Product schema uses).
          next/image serves a 160-192px-sized file instead of the 1000-1536px
          original; fixed box + width/height = no layout shift; object-contain
          never crops non-square art. Decorative: the H1 right below already
          names the product, so alt="" avoids announcing it twice. Priority:
          it can be the page's largest above-the-fold paint. */}
      <Image
        src={report.image}
        alt=""
        width={192}
        height={192}
        sizes="(min-width: 768px) 192px, 160px"
        priority
        className="mx-auto mb-6 h-40 w-40 md:h-48 md:w-48 rounded-2xl object-contain shadow-lg"
      />

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {displayName}
      </h1>

      <p className="text-lg text-slate-300 leading-relaxed max-w-3xl mx-auto mb-6">
        {report?.fullDescription?.[lang]}
      </p>

      <div className="w-24 h-px bg-purple-500 mx-auto mb-6"></div>

      <div className="text-slate-300 text-sm md:text-base mb-8 text-center max-w-3xl mx-auto leading-8">

        <span>
          • <strong className="text-white">
            {lang === "hi" ? "मूल्य:" : "Price:"}
          </strong>{" "}
          ₹{report.price}
        </span>

        <span className="mx-2 text-purple-400">|</span>

        <span>
          • <strong className="text-white">
            {lang === "hi" ? "फॉर्मेट:" : "Format:"}
          </strong>{" "}
          PDF Report
        </span>

        <span className="mx-2 text-purple-400">|</span>

        <span>
          • <strong className="text-white">
            {lang === "hi" ? "भाषा:" : "Language:"}
          </strong>{" "}
          Hindi / English
        </span>

        <span className="mx-2 text-purple-400">|</span>

        <span>
          • <strong className="text-white">
            {lang === "hi" ? "डिलीवरी:" : "Delivery:"}
          </strong>{" "}
          {lang === "hi"
            ? "5 मिनट में ईमेल"
            : "Email in 5 Minutes"}
        </span>

      </div>

      {/* R2-D2 -- primary purchase CTA near the top: jumps to the checkout
          form further down this page (no navigation, no order). Price comes
          from the report catalog entry. */}
      <div className="mb-4">
        <a
          href={`#${CHECKOUT_ANCHOR_ID}`}
          className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-base font-bold text-white shadow-lg transition-colors hover:bg-purple-700"
        >
          {topCtaLabel(lang, report.price)}
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      {/* Secondary, static sample PDF (public/report-samples). A plain anchor: no order, no payment,
          no backend request. Follows the PAGE language, not the checkout's separate Report Language. */}
      <div className="mb-10">
        <a
          href={getReportSampleUrl(report.slug, lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-purple-400/40 px-4 py-1.5 text-sm font-medium text-purple-300 transition-colors hover:border-purple-300 hover:text-white"
        >
          {getReportSampleLabel(lang)}
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-xl font-semibold text-white mb-4">
          {lang === "hi"
            ? "इस रिपोर्ट में शामिल है"
            : "This Report Covers"}
        </h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-12 text-slate-300 max-w-4xl mx-auto">

          {seo?.reportSections?.[lang]?.map(
            (section: string) => (
              <li
                key={section}
                className="border-l-2 border-purple-500 pl-4 text-left"
              >
                {section}
              </li>
            )
          )}

        </ul>

      </div>

    </div>
  );
}