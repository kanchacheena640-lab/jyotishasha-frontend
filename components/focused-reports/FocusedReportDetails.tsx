// components/focused-reports/FocusedReportDetails.tsx
// Below-the-fold: what it tells you / how Jyotish approaches it / who
// it's for / what you receive / trust+limitations / FAQ / second CTA.
// Server component; locale comes from the route.

import Link from "next/link";
import type { FocusedReportConfig } from "@/app/data/focusedReportsConfig";
import type { Locale } from "@/lib/authority-engine/types";

interface Props {
  config: FocusedReportConfig;
  locale: Locale;
}

function Block({ heading, body }: { heading: string; body: string }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-3">{heading}</h2>
      <p className="text-slate-300 leading-relaxed">{body}</p>
    </div>
  );
}

export default function FocusedReportDetails({ config, locale }: Props) {
  const s = config.sections;
  const faqs = config.faqs;

  const headings =
    locale === "hi"
      ? {
          tellsYou: "यह रिपोर्ट आपको क्या बताती है",
          approach: "ज्योतिष विश्लेषण इस सवाल को कैसे देखता है",
          whoFor: "यह रिपोर्ट किसके लिए उपयोगी है",
          receive: "आपको क्या मिलता है",
          trust: "भरोसा और सीमाएँ",
          faq: "अक्सर पूछे जाने वाले प्रश्न",
          secondCta: `₹${config.priceRupees} में अपनी व्यक्तिगत रिपोर्ट अभी पाएं`,
        }
      : {
          tellsYou: "What This Report Tells You",
          approach: "How the Jyotish Analysis Approaches This Question",
          whoFor: "Who This Report Is Useful For",
          receive: "What You Receive",
          trust: "Trust and Limitations",
          faq: "Frequently Asked Questions",
          secondCta: `Get Your Personalized Report Now for ₹${config.priceRupees}`,
        };

  return (
    <section className="max-w-3xl mx-auto px-4 py-12">
      <Block heading={headings.tellsYou} body={s.whatItTellsYou[locale]} />
      <Block heading={headings.approach} body={s.howJyotishApproachesIt[locale]} />
      <Block heading={headings.whoFor} body={s.whoItIsFor[locale]} />
      <Block heading={headings.receive} body={s.whatYouReceive[locale]} />

      <div className="mb-10 rounded-xl border border-slate-700 bg-slate-900/40 p-5">
        <p className="text-sm text-slate-400 leading-relaxed">{s.trustAndLimitations[locale]}</p>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">{headings.faq}</h2>
      <div className="space-y-6 mb-12">
        {faqs.map((faq) => (
          <div key={faq.question.en} className="border-b border-slate-700 pb-4">
            <h3 className="text-lg font-semibold text-white mb-2">{faq.question[locale]}</h3>
            <p className="text-slate-300">{faq.answer[locale]}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="#focused-report-form"
          className="inline-block bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-4 rounded-xl text-lg shadow-xl transition-all active:scale-95"
        >
          {headings.secondCta}
        </Link>
      </div>
    </section>
  );
}
