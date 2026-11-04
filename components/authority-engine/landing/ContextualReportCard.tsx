'use client'
// Compact, secondary report card placed inside the article (TopicLandingConfig.inlineTool with
// kind 'contextual-report'). Deliberately low-key -- no large panel or shadow -- so it never competes
// with the page's main offer card. Route and price are resolved on the server by LandingInlineTool.
// `variant`: 'dark' (default) = the original landing styling; 'editorial' = a light card for the
// ivory article template. Copy, route and the ctaClick event are identical in both.

import Link from 'next/link'
import { WebsiteEvents } from '@/lib/websiteEvents'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingContextualReport } from '@/lib/authority-engine/landing-types'

interface Props {
  unit: TopicLandingContextualReport
  locale: Locale
  reportHref: string
  priceRupees: number
  /** Visual style only; defaults to the original dark landing styling. */
  variant?: 'dark' | 'editorial'
}

/** Class names per variant. `dark` keeps the original markup classes unchanged. */
const STYLES = {
  dark: {
    aside: 'my-10 rounded-2xl border border-gray-700/50 bg-[#1a1744]/30 p-5 md:p-6',
    eyebrow: 'text-xs font-semibold uppercase tracking-wider text-gray-400',
    heading: 'mt-1 text-lg font-bold text-white',
    body: 'mt-2 text-sm leading-6 text-gray-300',
    cta: 'mt-4 inline-block rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20',
  },
  editorial: {
    aside: 'mb-12 rounded-2xl border-2 border-[#C9A227] bg-[#FFFFFF] p-5 md:p-6',
    eyebrow: 'text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]',
    heading: 'mt-1 text-[19px] font-bold leading-snug text-[#1B2A4A]',
    body: 'mt-2 text-[15px] leading-7 text-[#45516A]',
    cta: 'mt-4 inline-flex min-h-[48px] items-center justify-center rounded-xl bg-[#A8461F] px-5 py-2.5 text-center text-[15px] font-bold text-[#FFFFFF] transition hover:bg-[#8A3818] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2',
  },
} as const

export default function ContextualReportCard({ unit, locale, reportHref, priceRupees, variant = 'dark' }: Props) {
  const s = STYLES[variant]
  return (
    <aside
      aria-labelledby="topic-landing-contextual-report"
      className={s.aside}
    >
      <p className={s.eyebrow}>{unit.eyebrow[locale]}</p>
      <h3 id="topic-landing-contextual-report" className={s.heading}>
        {unit.heading[locale]}
      </h3>
      <p className={s.body}>{unit.body[locale]}</p>
      <Link
        href={reportHref}
        onClick={() => WebsiteEvents.ctaClick(unit.ctaId, unit.screenName)}
        className={s.cta}
      >
        {unit.ctaLabel[locale].replace('{price}', String(priceRupees))} →
      </Link>
    </aside>
  )
}
