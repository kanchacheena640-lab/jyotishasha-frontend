// components/focused-reports/RelatedFocusedReports.tsx
//
// Generalized for all 63 (this task's own Part 5 -- no longer pilot-only):
// up to 3 OTHER products from the SAME authoritative category, resolved by
// app/data/focusedReportsConfig.ts::getRelatedFocusedReports() -- never a
// hardcoded per-product list. Deliberately TEXT-ONLY (no image -- unlike
// components/reports/RelatedReports.tsx, no product photography exists yet
// for any focused report, and this does not fabricate one). No emoji.
import Link from "next/link";
import type { Locale } from "@/lib/authority-engine/types";

export interface RelatedFocusedReportItem {
  slug: string;
  title: string;
  priceRupees: number;
}

interface Props {
  items: RelatedFocusedReportItem[];
  locale: Locale;
}

export default function RelatedFocusedReports({ items, locale }: Props) {
  if (items.length === 0) return null;
  const prefix = locale === "hi" ? "/hi" : "";

  return (
    <section className="max-w-4xl mx-auto px-4 pb-16">
      <h2 className="text-xl font-bold text-white mb-5 text-center">
        {locale === "hi" ? "संबंधित रिपोर्ट्स" : "Related Reports"}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`${prefix}/reports/focused/${item.slug}`}
            className="rounded-xl border border-purple-900/40 bg-slate-900/30 p-4 text-center hover:border-purple-500/50 hover:bg-slate-900/50 transition-colors"
          >
            <p className="text-white text-sm font-semibold mb-1">{item.title}</p>
            <p className="text-purple-300 text-sm">₹{item.priceRupees}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
