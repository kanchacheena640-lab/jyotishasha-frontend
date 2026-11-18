// components/authority-engine/financial/FinancialLanding.tsx
// Financial guide landing units (lib/domains/financial-astrology/_landing.ts), following the Marriage guide
// pattern (components/authority-engine/landing/TopicLandingLead.tsx direct answer and
// TopicLandingContextLinks.tsx): same markup and classes, server-rendered, crawlable links.

import Link from 'next/link'
import type { ResolvedFinancialLanding } from '@/lib/domains/financial-astrology/_landing'

/** The visible "Short answer" box, rendered right under the hero. */
export function FinancialShortAnswer({ landing }: { landing: ResolvedFinancialLanding }) {
  return (
    <section aria-label={landing.label} className="mb-8" data-financial-short-answer="">
      <div className="rounded-2xl border-l-4 border-rose-400 bg-rose-500/[0.07] px-5 py-4 sm:px-6 sm:py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">{landing.label}</p>
        <p className="mt-2.5 text-base leading-7 text-gray-100">{landing.answer}</p>
      </div>
    </section>
  )
}

/** Related guides, rendered just before the FAQ. */
export function FinancialRelatedGuides({ related }: { related: NonNullable<ResolvedFinancialLanding['related']> }) {
  return (
    <section className="mb-10" data-financial-related-guides="">
      <h2 className="mb-3 border-l-[3px] border-rose-500/70 pl-3 text-[22px] font-bold leading-snug text-white md:text-2xl">{related.heading}</h2>
      <p className="text-base leading-7 text-gray-300">{related.body}</p>
      <ul className="mt-3 space-y-2">
        {related.links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex min-h-[44px] items-center text-base font-medium text-rose-300 underline underline-offset-4 hover:text-rose-200"
            >
              {link.title} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
