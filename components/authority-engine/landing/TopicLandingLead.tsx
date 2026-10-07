// components/authority-engine/landing/TopicLandingLead.tsx
// Server component: the direct answer under the hero, then ONE conversion
// unit (video + report card in a single container, so the page flow treats
// them as one block). With no video configured the report card renders on
// its own -- no video slot, no sample hook, no play tracking. All text is
// server-rendered; only the video facade and the CTA/sample actions hydrate.

import type { Locale } from '@/lib/authority-engine/types'
import type { AnyTopicLandingConfig, TopicLandingOffer } from '@/lib/authority-engine/landing-types'
import { reportsData } from '@/app/data/reportsData'
import { getReportSampleLabel, getReportSampleUrl } from '@/lib/reportSamples'
import YouTubeShortFacade from './YouTubeShortFacade'
import LeadOfferActions from './LeadOfferActions'
import SampleHookLink from './SampleHookLink'
import LeadPrimaryAction from './LeadPrimaryAction'

interface Props {
  config: AnyTopicLandingConfig
  locale: Locale
}

export default function TopicLandingLead({ config, locale }: Props) {
  return (
    <>
      <section aria-label={config.directAnswerLabel[locale]} className="mb-8">
        <div className="rounded-2xl border-l-4 border-rose-400 bg-rose-500/[0.07] px-5 py-4 sm:px-6 sm:py-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">
            {config.directAnswerLabel[locale]}
          </p>
          <p className="mt-2.5 text-base leading-7 text-gray-100">{config.directAnswer[locale]}</p>
        </div>
      </section>
      {config.primaryAction && <LeadPrimaryAction action={config.primaryAction} locale={locale} />}
      {config.offer && <LeadOfferUnit config={config} offer={config.offer} locale={locale} />}
    </>
  )
}

/** The report conversion unit: video + report card, or the report card alone. */
function LeadOfferUnit({ config, offer, locale }: Props & { offer: TopicLandingOffer }) {
  const { video } = config
  const product = reportsData.find(r => r.slug === offer.reportSlug)
  const reportHref = `/reports/${offer.reportSlug}`
  const price = product?.price

  const heading = (
    <>
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-300">{offer.eyebrow[locale]}</p>
      <div className="mt-1 flex items-start justify-between gap-3">
        <h2 id="topic-landing-offer" className="text-[22px] font-bold leading-snug text-white md:text-2xl">
          {offer.heading[locale]}
        </h2>
        {price !== undefined && (
          <span className="flex-none rounded-xl border border-rose-400/40 bg-rose-500/15 px-3 py-1 text-xl font-extrabold leading-8 text-rose-100">
            ₹{price}
          </span>
        )}
      </div>
    </>
  )
  const bullets = (
    <ul className="mt-4 space-y-2.5 rounded-2xl border border-white/[0.06] bg-white/[0.04] p-4">
      {offer.bullets[locale].map(bullet => (
        <li key={bullet} className="flex gap-2.5 text-[15px] leading-6 text-gray-100">
          <span aria-hidden="true" className="mt-0.5 font-bold text-rose-300">✓</span>
          <span>{bullet}</span>
        </li>
      ))}
    </ul>
  )
  const actions = product && price !== undefined && (
    <>
      <LeadOfferActions
        locale={locale}
        reportHref={reportHref}
        ctaLabel={offer.ctaLabel[locale].replace('{price}', String(price))}
        priceRupees={price}
        sampleHref={getReportSampleUrl(offer.reportSlug, locale)}
        sampleLabel={getReportSampleLabel(locale)}
        sampleTitle={offer.sampleTitle[locale]}
        reportCtaId={offer.reportCtaId}
        sampleCtaId={offer.sampleCtaId}
        screenName={offer.screenName}
      />
      <p className="mt-1 text-center text-sm text-gray-400">{offer.microcopy[locale]}</p>
    </>
  )

  return (
    <>
      {video ? (
        <section
          aria-labelledby="topic-landing-offer"
          className="mb-14 overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6"
        >
          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start md:gap-8">
            <figure className="w-[240px] flex-none md:w-[290px]">
              <YouTubeShortFacade
                youtubeId={video.youtubeId}
                posterSrc={video.posterSrc}
                posterWidth={video.posterWidth}
                posterHeight={video.posterHeight}
                playLabel={video.playLabel[locale]}
                iframeTitle={video.caption[locale]}
                playFeatureName={video.playFeatureName}
              />
              <figcaption className="mt-2 text-center text-sm leading-5 text-gray-300">
                {video.caption[locale]}
              </figcaption>
              {product && offer.sampleHookLead && (
                <SampleHookLink
                  href={getReportSampleUrl(offer.reportSlug, locale)}
                  lead={offer.sampleHookLead[locale]}
                  label={getReportSampleLabel(locale)}
                />
              )}
            </figure>

            <div className="w-full min-w-0 border-t border-white/10 pt-5 md:border-t-0 md:pt-0">
              {heading}
              {/* Phones: skip the intro sentence so the CTA stays close to the video (still in the HTML). */}
              <p className="mt-2 hidden text-base leading-7 text-gray-300 sm:block">{offer.intro[locale]}</p>
              {bullets}
              {actions && <div className="mt-5">{actions}</div>}
            </div>
          </div>
        </section>
      ) : (
        <section
          aria-labelledby="topic-landing-offer"
          className="mb-14 overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6 md:p-8"
        >
          {heading}
          {/* Phones: skip the intro sentence so the CTA stays close to the price (still in the HTML). */}
          <p className="mt-2 hidden text-base leading-7 text-gray-300 sm:block">{offer.intro[locale]}</p>
          {/* Desktop: benefits and actions side by side, so the card reads as one complete unit. */}
          <div className="md:mt-1 md:grid md:grid-cols-[minmax(0,1fr)_20rem] md:items-center md:gap-8">
            {bullets}
            {actions && <div className="mt-5 md:mt-4">{actions}</div>}
          </div>
        </section>
      )}
    </>
  )
}
