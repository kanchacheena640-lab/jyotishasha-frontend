'use client'
// Compact, secondary report card placed inside the article (TopicLandingConfig.inlineTool with
// kind 'contextual-report'). Deliberately low-key -- no large panel or shadow -- so it never competes
// with the page's main offer card. Route and price are resolved on the server by LandingInlineTool.

import Link from 'next/link'
import { WebsiteEvents } from '@/lib/websiteEvents'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingContextualReport } from '@/lib/authority-engine/landing-types'

interface Props {
  unit: TopicLandingContextualReport
  locale: Locale
  reportHref: string
  priceRupees: number
}

export default function ContextualReportCard({ unit, locale, reportHref, priceRupees }: Props) {
  return (
    <aside
      aria-labelledby="topic-landing-contextual-report"
      className="my-10 rounded-2xl border border-gray-700/50 bg-[#1a1744]/30 p-5 md:p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{unit.eyebrow[locale]}</p>
      <h3 id="topic-landing-contextual-report" className="mt-1 text-lg font-bold text-white">
        {unit.heading[locale]}
      </h3>
      <p className="mt-2 text-sm leading-6 text-gray-300">{unit.body[locale]}</p>
      <Link
        href={reportHref}
        onClick={() => WebsiteEvents.ctaClick(unit.ctaId, unit.screenName)}
        className="mt-4 inline-block rounded-xl bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/20"
      >
        {unit.ctaLabel[locale].replace('{price}', String(priceRupees))} →
      </Link>
    </aside>
  )
}
