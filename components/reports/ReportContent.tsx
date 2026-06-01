"use client";

import { useTranslation } from "react-i18next";

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

  return (
    <div className="max-w-4xl mx-auto text-center mb-10">

      <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
        {seo?.seoTitle?.[lang]?.split("|")[0] ||
          report?.title?.[lang]}
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