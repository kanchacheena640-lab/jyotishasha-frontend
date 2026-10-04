'use client'
// components/authority-engine/landing/LeadOfferActions.tsx
// The interactive part of the topic report card: the primary report CTA (a
// real link to the existing report page) and the existing sample viewer,
// plus click tracking through the EXISTING WebsiteEvents / marketing-bridge
// conventions (same pair the reports catalog fires on a purchase intent).

import Link from 'next/link'
import type { MouseEvent } from 'react'
import FocusedSampleViewer from '@/components/focused-reports/FocusedSampleViewer'
import { WebsiteEvents } from '@/lib/websiteEvents'
import { pushMarketingMeasurementEvent } from '@/lib/marketingMeasurementBridge'
import type { Locale } from '@/lib/authority-engine/types'

interface Props {
  locale: Locale
  reportHref: string
  ctaLabel: string
  priceRupees: number
  sampleHref: string
  sampleLabel: string
  sampleTitle: string
  reportCtaId: string
  sampleCtaId: string
  screenName: string
}

export default function LeadOfferActions({
  locale, reportHref, ctaLabel, priceRupees, sampleHref, sampleLabel, sampleTitle,
  reportCtaId, sampleCtaId, screenName,
}: Props) {
  const trackReportIntent = () => {
    WebsiteEvents.ctaClick(reportCtaId, screenName)
    pushMarketingMeasurementEvent({ name: 'jyotishasha_report_purchase_intent' })
  }

  // The sample viewer owns its trigger and its in-dialog purchase button;
  // observe them by their data markers instead of changing their handlers.
  const onClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as Element | null
    if (target?.closest('[data-sample-trigger]')) WebsiteEvents.ctaClick(sampleCtaId, screenName)
    else if (target?.closest('[data-sample-purchase]')) trackReportIntent()
  }

  return (
    <div onClickCapture={onClickCapture}>
      <Link
        href={reportHref}
        onClick={trackReportIntent}
        className="flex min-h-[52px] w-full items-center justify-center rounded-xl bg-rose-600 px-5 py-3 text-center text-base font-bold text-white shadow-lg shadow-rose-900/30 transition-colors hover:bg-rose-700 active:bg-rose-800 focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300"
      >
        {ctaLabel}
      </Link>
      <div className="mt-2 flex justify-center">
        <FocusedSampleViewer
          href={sampleHref}
          locale={locale}
          priceRupees={priceRupees}
          title={sampleTitle}
          purchaseHref={reportHref}
          triggerLabel={sampleLabel}
          triggerClassName="inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 text-[15px] font-medium text-rose-200 underline-offset-4 hover:text-white hover:underline"
        />
      </div>
    </div>
  )
}
