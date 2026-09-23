// components/focused-reports/RelatedFocusedReports.tsx
//
// P0.4 pilot scope: exactly 2 focused reports exist/are routable. This is
// a deliberately minimal, TEXT-ONLY cross-link between them (no image --
// unlike components/reports/RelatedReports.tsx, no product photography
// exists yet for any focused report, and this task does not fabricate
// one). Reused only where it already makes sense: the other pilot is a
// genuinely related "birth chart diagnostic" product, not a stand-in for
// the eventual Reports-Hub-wide related-reports feature.
import Link from "next/link";
import type { Locale } from "@/lib/authority-engine/types";

interface Props {
  /** The OTHER pilot's humanSlug -- never the current page's own slug. */
  otherSlug: string;
  otherTitle: string;
  priceRupees: number;
  locale: Locale;
}

export default function RelatedFocusedReports({ otherSlug, otherTitle, priceRupees, locale }: Props) {
  const href = `${locale === "hi" ? "/hi" : ""}/reports/focused/${otherSlug}`;
  return (
    <section className="max-w-3xl mx-auto px-4 pb-16">
      <div className="rounded-xl border border-purple-900/40 bg-slate-900/30 p-5 text-center">
        <p className="text-slate-400 text-sm mb-2">
          {locale === "hi" ? "आपकी रुचि इसमें भी हो सकती है" : "You may also find this useful"}
        </p>
        <Link href={href} className="text-purple-300 hover:text-white font-semibold underline underline-offset-4">
          {otherTitle} — ₹{priceRupees}
        </Link>
      </div>
    </section>
  );
}
