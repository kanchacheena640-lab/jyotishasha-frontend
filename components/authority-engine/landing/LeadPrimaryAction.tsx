'use client'
// Optional primary action card for a landing overlay (TopicLandingConfig.primaryAction): a compact,
// server-rendered card that sends the reader to an EXISTING site route (for example the free Kundli
// Matching calculator) instead of a paid report. Click tracking reuses WebsiteEvents.ctaClick.
// `variant`: 'dark' (default) = the original landing styling; 'editorial' = the ivory article
// template's free-tool card (hero slot on tool-led pages). Copy, route and the event are identical.

import Link from 'next/link'
import { WebsiteEvents } from '@/lib/websiteEvents'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingPrimaryAction } from '@/lib/authority-engine/landing-types'

interface Props {
  action: TopicLandingPrimaryAction
  locale: Locale
  /** Visual style only; defaults to the original dark landing styling. */
  variant?: 'dark' | 'editorial'
}

/** Class names per variant. `dark` keeps the original markup classes unchanged. */
const STYLES = {
  dark: {
    section: 'mb-14 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6 md:p-8',
    eyebrow: 'text-xs font-semibold uppercase tracking-wider text-rose-300',
    heading: 'mt-1 text-[22px] font-bold leading-snug text-white md:text-2xl',
    body: 'mt-2 text-base leading-7 text-gray-300',
    cta: 'mt-5 flex min-h-[48px] w-full items-center justify-center rounded-2xl bg-rose-600 px-5 py-3 text-base font-bold text-white shadow-lg shadow-rose-900/30 transition-colors hover:bg-rose-500 sm:w-auto sm:px-8',
    microcopy: 'mt-2 text-sm text-gray-400',
  },
  // Same look as the editorial template's free-tool card (navy, gold action).
  editorial: {
    section: 'rounded-2xl bg-[#1B2A4A] p-5 text-[#E6E1D6] sm:p-6',
    eyebrow: 'inline-block rounded-full bg-[#E8C766] px-2.5 py-0.5 text-[13px] font-bold text-[#1B2A4A]',
    heading: 'mt-3 text-[21px] font-bold leading-snug text-[#FFFFFF]',
    body: 'mt-1.5 text-[15px] leading-6 text-[#E6E1D6]',
    cta: 'mt-4 flex min-h-[52px] w-full items-center justify-center rounded-xl bg-[#E8C766] px-6 text-[16px] font-bold text-[#1B2A4A] transition hover:bg-[#F0D47F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C766] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2A4A]',
    microcopy: 'mt-2 text-center text-[13px] leading-5 text-[#D5D9E2]',
  },
} as const

export default function LeadPrimaryAction({ action, locale, variant = 'dark' }: Props) {
  const href = `${locale === 'hi' ? '/hi' : ''}${action.href}`
  const s = STYLES[variant]
  return (
    <section
      aria-labelledby="topic-landing-primary-action"
      className={s.section}
    >
      <p className={s.eyebrow}>{action.eyebrow[locale]}</p>
      <h2 id="topic-landing-primary-action" className={s.heading}>
        {action.heading[locale]}
      </h2>
      <p className={s.body}>{action.body[locale]}</p>
      <Link
        href={href}
        onClick={() => WebsiteEvents.ctaClick(action.ctaId, action.screenName)}
        className={s.cta}
      >
        {action.ctaLabel[locale]}
      </Link>
      <p className={s.microcopy}>{action.microcopy[locale]}</p>
    </section>
  )
}
