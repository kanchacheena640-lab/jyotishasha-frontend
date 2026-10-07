'use client'
// MC-04 -- free "Lagna -> 7th-house sign" spouse-nature mini-tool (Spouse Nature topic).
// Pure client-side lookup over frozen data (lib/domains/marriage-astrology/spouseLagnaTool.ts):
// no API, no chart calculation. Server HTML carries only the heading, intro, label and the
// 12 sign options; the selected sign's description renders after a selection. The result CTA
// is a compact text link -- the page's main Spouse Nature Report card stays the primary offer.

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
}

export default function SpouseLagnaTool({ locale, reportHref, priceRupees }: Props) {
  const [lagna, setLagna] = useState('')
  // One tool-use event per mounted tool session: only the first valid Lagna emits (MC-04A).
  const [trackFirstResult] = useState(() => createFirstResultTracker(() => WebsiteEvents.featureUsed(EVENTS.resultFeature)))
  const selectId = useId()
  const resultId = useId()
  const signName = (sign: string) => (locale === 'hi' ? SIGN_NAME_HI[sign] ?? sign : sign)
  const seventh = lagna ? seventhSignForLagna(lagna) : null
  const card = seventh ? SEVENTH_SIGN_CARDS[seventh] : undefined
  const localePath = locale === 'hi' ? '/hi' : ''

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
    <section aria-labelledby={`${selectId}-heading`} className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-5 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">{COPY.eyebrow[locale]}</p>
      <h2 id={`${selectId}-heading`} className="mt-1 text-[20px] font-bold leading-snug text-white md:text-[22px]">
        {COPY.heading[locale]}
      </h2>
      <p className="mt-2 text-base leading-7 text-gray-300">{COPY.intro[locale]}</p>

      <label htmlFor={selectId} className="mt-4 block text-sm font-semibold text-gray-100">
        {COPY.label[locale]}
      </label>
      <select
        id={selectId}
        value={lagna}
        onChange={onChange}
        aria-controls={resultId}
        className="mt-2 block w-full min-h-[48px] rounded-xl border border-white/15 bg-[#121a2e] px-4 text-base text-white focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-400/40 sm:max-w-xs"
      >
        <option value="">{COPY.placeholder[locale]}</option>
        {LAGNA_ORDER.map((sign) => (
          <option key={sign} value={sign}>{signName(sign)}</option>
        ))}
      </select>
      <p className="mt-2 text-sm text-gray-400">
        <Link href={`${localePath}/tools/lagna-finder`} className="text-rose-300 underline underline-offset-2 hover:text-white">
          {COPY.unknownLagna[locale]} →
        </Link>
      </p>

      <div id={resultId} aria-live="polite">
        {seventh && card && (
          <div className="mt-5 rounded-xl border border-rose-500/25 bg-rose-500/[0.06] px-4 py-4 sm:px-5">
            <dl className="flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <div className="flex gap-1.5">
                <dt className="text-gray-400">{COPY.yourLagna[locale]}:</dt>
                <dd className="font-semibold text-white">{signName(lagna)}</dd>
              </div>
              <div className="flex gap-1.5">
                <dt className="text-gray-400">{COPY.seventhSign[locale]}:</dt>
                <dd className="font-semibold text-white">{signName(seventh)}</dd>
              </div>
            </dl>
            <p className="mt-3 text-base leading-7 text-gray-100">{card[locale]}</p>
            <p className="mt-3 text-sm leading-6 text-gray-400">{COPY.scopeNote[locale]}</p>
            {priceRupees !== undefined && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">{COPY.ctaLead[locale]}</p>
                <p className="mt-1 text-sm leading-6 text-gray-300">{COPY.ctaBody[locale]}</p>
                <Link
                  href={reportHref}
                  onClick={onReportClick}
                  className="mt-2 inline-flex min-h-[44px] items-center text-sm font-semibold text-rose-300 underline underline-offset-2 hover:text-white"
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
