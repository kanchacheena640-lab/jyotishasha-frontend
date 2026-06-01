"use client";

import { useTranslation } from "react-i18next";

interface Props {
  report: any;
  seo: any;
}

export default function ReportContentDetails({
  report,
  seo,
}: Props) {
  const { i18n } = useTranslation();

  const lang =
    i18n.language?.startsWith("hi")
      ? "hi"
      : "en";

  return (
    <div className="max-w-4xl mx-auto mt-16">

      <h2 className="text-2xl font-bold text-white mb-6">
        {lang === "hi"
          ? "यह रिपोर्ट क्यों उपयोगी है"
          : "Why This Report Is Helpful"}
      </h2>

      <ul className="space-y-3 text-slate-300 mb-12">

        {seo?.benefits?.[lang]?.map(
          (benefit: string) => (
            <li key={benefit}>
              • {benefit}
            </li>
          )
        )}

      </ul>

      <h2 className="text-2xl font-bold text-white mb-6">
        {lang === "hi"
          ? "अक्सर पूछे जाने वाले प्रश्न"
          : "Frequently Asked Questions"}
      </h2>

      <div className="space-y-6">

        {seo?.faqs?.[lang]?.map((faq: any) => (
          <div
            key={faq.question}
            className="border-b border-slate-700 pb-4"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {faq.question}
            </h3>

            <p className="text-slate-300">
              {faq.answer}
            </p>
          </div>
        ))}

      </div>

      <div className="mt-12 pt-8 border-t border-slate-800">

        <p className="text-sm text-slate-400 leading-relaxed">
          {lang === "hi"
            ? "यह व्यक्तिगत ज्योतिषीय रिपोर्ट जन्म कुंडली, दशा, गोचर तथा पारंपरिक वैदिक ज्योतिष सिद्धांतों के आधार पर तैयार की जाती है। सफल भुगतान के कुछ मिनटों के भीतर रिपोर्ट PDF के रूप में आपके ईमेल पर भेज दी जाती है।"
            : "This personalized astrology report is generated using birth chart analysis, planetary periods (Dasha), current transits, and classical Vedic astrology principles. The report is delivered as a PDF to your email within minutes after successful payment."}
        </p>

      </div>

    </div>
  );
}