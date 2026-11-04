'use client'
// MC-04 -- free "Lagna -> 7th-house sign" spouse-nature mini-tool (Spouse Nature topic).
// Pure client-side lookup over frozen data (lib/domains/marriage-astrology/spouseLagnaTool.ts):
// no API, no chart calculation. Server HTML carries only the heading, intro, label and the
// 12 sign options; the selected sign's description renders after a selection. The result CTA
// is a compact text link -- the page's main Spouse Nature Report card stays the primary offer.
// `variant`: 'dark' (default) = the original landing styling; 'editorial' = the ivory article
// template's light card (hero slot). Logic, copy and events are identical in both.

import { useId, useState } from 'react'
import type { ChangeEvent } from 'react'
import Link from 'next/link'
import { WebsiteEvents } from '@/lib/websiteEvents'
import { pushMarketingMeasurementEvent } from '@/lib/marketingMeasurementBridge'
import type { Locale } from '@/lib/authority-engine/types'
import {
  LAGNA_ORDER,
  SEVENTH_SIGN_CARDS,
  SIGN_NAME_HI,
  SPOUSE_LAGNA_TOOL_COPY as COPY,
  SPOUSE_LAGNA_TOOL_EVENTS as EVENTS,
  createFirstResultTracker,
  seventhSignForLagna,
} from '@/lib/domains/marriage-astrology/spouseLagnaTool'

interface Props {
  locale: Locale
  /** /reports/<slug> -- built by the server from the catalogue slug. */
  reportHref: string
  /** Catalogue price (reportsData); the CTA is omitted if it is unavailable. */
  priceRupees?: number
  /** Visual style only; defaults to the original dark landing styling. */
  variant?: 'dark' | 'editorial'
}

const editorialFocus = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2'

/** Class names per variant. `dark` keeps the original markup classes unchanged. */
const STYLES = {
  dark: {
    section: 'mb-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6',
    eyebrow: 'text-xs font-semibold uppercase tracking-wider text-rose-300',
    heading: 'mt-1 text-[20px] font-bold leading-snug text-white md:text-[22px]',
    intro: 'mt-2 text-base leading-7 text-gray-300',
    label: 'mt-4 block text-sm font-semibold text-gray-100',
    select: 'mt-2 block w-full min-h-[48px] rounded-xl border border-white/15 bg-[#121a2e] px-4 text-base text-white focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 sm:max-w-xs',
    unknownWrap: 'mt-2 text-sm text-gray-400',
    unknownLink: 'text-rose-300 underline underline-offset-2 hover:text-white',
    result: 'mt-5 rounded-xl border border-rose-500/25 bg-rose-500/[0.06] px-4 py-4 sm:px-5',
    dt: 'text-gray-400',
    dd: 'font-semibold text-white',
    card: 'mt-3 text-base leading-7 text-gray-100',
    scope: 'mt-3 text-sm leading-6 text-gray-400',
    ctaWrap: 'mt-4 border-t border-white/10 pt-4',
    ctaLead: 'text-sm font-semibold text-white',
    ctaBody: 'mt-1 text-sm leading-6 text-gray-300',
    ctaLink: 'mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-rose-300 underline underline-offset-2 hover:text-white',
  },
  editorial: {
    section: 'rounded-2xl border-2 border-[#1B2A4A] bg-[#FFFFFF] px-5 py-5 sm:px-6',
    eyebrow: 'inline-block rounded-full bg-[#E8C766] px-2.5 py-0.5 text-[13px] font-bold text-[#1B2A4A]',
    heading: 'mt-3 text-[21px] font-bold leading-snug text-[#1B2A4A]',
    intro: 'mt-1.5 text-[15px] leading-6 text-[#45516A]',
    label: 'mt-4 block text-[15px] font-semibold text-[#1B2A4A]',
    select: `mt-2 block w-full min-h-[48px] rounded-xl border border-[#6B7489] bg-[#FFFFFF] px-4 text-base text-[#1B2A4A] ${editorialFocus}`,
    unknownWrap: 'mt-1 text-[14px]',
    unknownLink: `inline-flex min-h-[44px] items-center font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] ${editorialFocus}`,
    result: 'mt-3 rounded-xl border border-[#E8DDC9] bg-[#F5EEDF] px-4 py-4',
    dt: 'text-[#45516A]',
    dd: 'font-semibold text-[#1B2A4A]',
    card: 'mt-3 text-[16px] leading-7 text-[#1B2A4A]',
    scope: 'mt-3 text-[14px] leading-6 text-[#45516A]',
    ctaWrap: 'mt-4 border-t border-[#E8DDC9] pt-4',
    ctaLead: 'text-[14px] font-semibold text-[#1B2A4A]',
    ctaBody: 'mt-1 text-[14px] leading-6 text-[#45516A]',
    ctaLink: `mt-2 inline-flex min-h-[44px] items-center text-[15px] font-semibold text-[#A8461F] underline underline-offset-4 hover:text-[#8A3818] ${editorialFocus}`,
  },
} as const

export default function SpouseLagnaTool({ locale, reportHref, priceRupees, variant = 'dark' }: Props) {
  const [lagna, setLagna] = useState('')
  // One tool-use event per mounted tool session: only the first valid Lagna emits (MC-04A).
  const [trackFirstResult] = useState(() => createFirstResultTracker(() => WebsiteEvents.featureUsed(EVENTS.resultFeature)))
  const selectId = useId()
  const resultId = useId()
  const signName = (sign: string) => (locale === 'hi' ? SIGN_NAME_HI[sign] ?? sign : sign)
  const seventh = lagna ? seventhSignForLagna(lagna) : null
  const card = seventh ? SEVENTH_SIGN_CARDS[seventh] : undefined
  const localePath = locale === 'hi' ? '/hi' : ''
  const s = STYLES[variant]

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    setLagna(value)
    trackFirstResult(value)
  }
  const onReportClick = () => {
    WebsiteEvents.ctaClick(EVENTS.reportCtaId, EVENTS.screenName)
    pushMarketingMeasurementEvent({ name: 'jyotishasha_report_purchase_intent' })
  }

  return (
    <section aria-labelledby={`${selectId}-heading`} className={s.section}>
      <p className={s.eyebrow}>{COPY.eyebrow[locale]}</p>
      <h2 id={`${selectId}-heading`} className={s.heading}>
        {COPY.heading[locale]}
      </h2>
      <p className={s.intro}>{COPY.intro[locale]}</p>

      <label htmlFor={selectId} className={s.label}>
        {COPY.label[locale]}
      </label>
      <select
        id={selectId}
        value={lagna}
        onChange={onChange}
        aria-controls={resultId}
        className={s.select}
      >
        <option value="">{COPY.placeholder[locale]}</option>
        {LAGNA_ORDER.map((sign) => (
          <option key={sign} value={sign}>{signName(sign)}</option>
        ))}
      </select>
      <p className={s.unknownWrap}>
        <Link href={`${localePath}/tools/lagna-finder`} className={s.unknownLink}>
          {COPY.unknownLagna[locale]} →
        </Link>
      </p>

      <div id={resultId} aria-live="polite">
        {seventh && card && (
          <div className={s.result}>
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <div className="flex gap-1.5">
                <dt className={s.dt}>{COPY.yourLagna[locale]}:</dt>
                <dd className={s.dd}>{signName(lagna)}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className={s.dt}>{COPY.seventhSign[locale]}:</dt>
                <dd className={s.dd}>{signName(seventh)}</dd>
              </div>
            </dl>
            <p className={s.card}>{card[locale]}</p>
            <p className={s.scope}>{COPY.scopeNote[locale]}</p>
            {priceRupees !== undefined && (
              <div className={s.ctaWrap}>
                <p className={s.ctaLead}>{COPY.ctaLead[locale]}</p>
                <p className={s.ctaBody}>{COPY.ctaBody[locale]}</p>
                <Link
                  href={reportHref}
                  onClick={onReportClick}
                  className={s.ctaLink}
                >
                  {COPY.ctaLabel[locale].replace('{price}', String(priceRupees))} →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
