'use client'
// Optional primary action card for a landing overlay (TopicLandingConfig.primaryAction): a compact,
// server-rendered card that sends the reader to an EXISTING site route (for example the free Kundli
// Matching calculator) instead of a paid report. Click tracking reuses WebsiteEvents.ctaClick.

import Link from 'next/link'
import { WebsiteEvents } from '@/lib/websiteEvents'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingPrimaryAction } from '@/lib/authority-engine/landing-types'

interface Props {
  action: TopicLandingPrimaryAction
  locale: Locale
}

export default function LeadPrimaryAction({ action, locale }: Props) {
  const href = `${locale === 'hi' ? '/hi' : ''}${action.href}`
  return (
    <section
      aria-labelledby="topic-landing-primary-action"
      className="mb-14 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6 md:p-8"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">{action.eyebrow[locale]}</p>
      <h2 id="topic-landing-primary-action" className="mt-1 text-[22px] font-bold leading-snug text-white md:text-2xl">
        {action.heading[locale]}
      </h2>
      <p className="mt-2 text-base leading-7 text-gray-300">{action.body[locale]}</p>
      <Link
        href={href}
        onClick={() => WebsiteEvents.ctaClick(action.ctaId, action.screenName)}
        className="mt-5 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-rose-900/30 transition-colors hover:bg-rose-500 sm:w-auto sm:px-8"
      >
        {action.ctaLabel[locale]}
      </Link>
      <p className="mt-2 text-sm text-gray-400">{action.microcopy[locale]}</p>
    </section>
  )
}
