// components/authority-engine/editorial/EditorialArticle.tsx
// Server components for the opt-in editorial (ivory) article template
// (landing config `theme: 'editorial'`; docs/seo/JYOTISHASHA_ARTICLE_STANDARD.md).
// Same data as the default layout -- direct answer, the topic's free-tool CTA,
// report offer, video, context links, related topics and cross-domain links --
// arranged by user intent: answer -> free tool -> compact report -> article
// (video in context) -> FAQ -> related guides. Colours match the Marriage Hub.

import Link from 'next/link'
import type { AuthorityDomain, AuthorityTopic, Locale } from '@/lib/authority-engine/types'
import type { TopicLandingConfig, TopicLandingVideo } from '@/lib/authority-engine/landing-types'
import { loc } from '@/lib/authority-engine/i18n'
import { CTA_ACTION_LABELS, CTA_BASE_PATHS } from '@/lib/authority-engine/constants'
import { getRelatedTopics } from '@/lib/authority-engine/resolver'
import { reportsData } from '@/app/data/reportsData'
import { getReportSampleLabel, getReportSampleUrl } from '@/lib/reportSamples'
import type { CSSProperties, ReactNode } from 'react'
import YouTubeShortFacade from '../landing/YouTubeShortFacade'
import LeadOfferActions from '../landing/LeadOfferActions'
import styles from './editorial.module.css'

const T = {
  free: { en: 'Free', hi: 'फ्री' },
  related: { en: 'Related Marriage Guides', hi: 'विवाह से जुड़ी अन्य मार्गदर्शिकाएँ' },
}

const focusRing = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2]'

/**
 * 1-3. Hero row: the direct answer (reading width) and the two user actions -- the free
 * calculator first and prominent, then a compact report offer. Desktop: actions beside the
 * answer; tablet: side by side under it; phones: stacked in that order. `heroTool` (optional):
 * an interactive on-page tool shown in place of the free-tool link card.
 */
export function EditorialLead({ config, topic, locale, heroTool }: {
  config: TopicLandingConfig; topic: AuthorityTopic; locale: Locale; heroTool?: ReactNode
}) {
  const { offer } = config
  const product = reportsData.find(r => r.slug === offer.reportSlug)
  const localePath = locale === 'hi' ? '/hi' : ''
  const tool = topic.ctas.find(cta => cta.type === 'tool')
  const reportHref = `/reports/${offer.reportSlug}`

  return (
    <div className="mb-14 grid grid-cols-1 gap-4 lg:grid-cols-[minmax(0,46rem)_minmax(0,1fr)] lg:items-start lg:gap-x-12">
      <section aria-label={config.directAnswerLabel[locale]} className="rounded-2xl border border-[#E8DDC9] border-l-4 border-l-[#A8461F] bg-white px-5 py-5 shadow-[0_1px_2px_rgba(27,42,74,0.06)] sm:px-7">
        <p className="text-[13px] font-semibold uppercase tracking-wider text-[#A8461F]">{config.directAnswerLabel[locale]}</p>
        <p className="mt-2.5 text-[17px] leading-[1.8] text-[#1B2A4A]">{config.directAnswer[locale]}</p>
      </section>

      <div className="grid grid-cols-1 gap-4">
        {heroTool ?? (tool && (
          <aside aria-labelledby="editorial-tool-cta" className="flex flex-col rounded-2xl bg-[#1B2A4A] p-5 text-[#E6E1D6] sm:flex-row sm:items-center sm:gap-6 sm:p-6 lg:flex-col lg:items-stretch lg:gap-0">
            <div className="flex-1">
              <span className="inline-block rounded-full bg-[#E8C766] px-2.5 py-0.5 text-[13px] font-bold text-[#1B2A4A]">{T.free[locale]}</span>
              <h2 id="editorial-tool-cta" className="mt-3 text-[21px] font-bold leading-snug text-[#FFFFFF]">{loc(tool, 'label', locale)}</h2>
              <p className="mt-1.5 text-[15px] leading-6">{loc(tool, 'description', locale)}</p>
            </div>
            <Link
              href={`${localePath}${CTA_BASE_PATHS.tool}/${tool.slug}`}
              className="mt-4 inline-flex min-h-[52px] flex-none items-center justify-center rounded-xl bg-[#E8C766] px-6 text-[16px] font-bold text-[#1B2A4A] transition hover:bg-[#F0D47F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E8C766] focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B2A4A] sm:mt-0 lg:mt-4"
            >
              {CTA_ACTION_LABELS.tool[locale]} <span aria-hidden="true" className="ml-1">→</span>
            </Link>
          </aside>
        ))}

        <aside aria-labelledby="topic-landing-offer" className="rounded-2xl border-2 border-[#C9A227] bg-white p-5">
          <p className="text-[13px] font-semibold uppercase tracking-wider text-[#7A5A00]">{offer.eyebrow[locale]}</p>
          <div className="mt-1 flex items-start justify-between gap-3">
            <h2 id="topic-landing-offer" className="text-[19px] font-bold leading-snug text-[#1B2A4A]">{offer.heading[locale]}</h2>
            {product && <span className="flex-none text-[22px] font-bold leading-7 text-[#1B2A4A]">₹{product.price}</span>}
          </div>
          <p className="mt-1 text-[14px] leading-6 text-[#45516A]">{offer.intro[locale]}</p>
          <ul className="mt-2 grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-2 lg:grid-cols-1">
            {offer.bullets[locale].map(bullet => (
              <li key={bullet} className="flex gap-2 text-[14px] leading-6 text-[#1B2A4A]">
                <span aria-hidden="true" className="font-bold text-[#A8461F]">✓</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          {product && (
            <div className="mt-3">
              <LeadOfferActions
                locale={locale}
                reportHref={reportHref}
                ctaLabel={offer.ctaLabel[locale].replace('{price}', String(product.price))}
                priceRupees={product.price}
                sampleHref={getReportSampleUrl(offer.reportSlug, locale)}
                sampleLabel={getReportSampleLabel(locale)}
                sampleTitle={offer.sampleTitle[locale]}
                reportCtaId={offer.reportCtaId}
                sampleCtaId={offer.sampleCtaId}
                screenName={offer.screenName}
                ctaClassName={`flex min-h-[48px] w-full items-center justify-center rounded-xl bg-[#A8461F] px-5 py-2.5 text-center text-[15px] font-bold text-[#FFFFFF] transition hover:bg-[#8A3818] ${focusRing}`}
                sampleTriggerClassName={`inline-flex min-h-[44px] items-center gap-1.5 rounded-xl px-4 text-[14px] font-semibold text-[#A8461F] underline-offset-4 hover:underline ${focusRing}`}
              />
              <p className="text-center text-[13px] leading-5 text-[#5B667D]">{offer.microcopy[locale]}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  )
}

/**
 * 4a. The existing tap-to-load Short, placed right after the section it explains. On large
 * screens (editorial.module.css `.aside`) the same node moves into the article's sticky side
 * column, spanning `gridRows` (e.g. "1 / span 4") of the content sections.
 */
export function EditorialVideo({ video, locale, gridRows }: { video: TopicLandingVideo; locale: Locale; gridRows: string }) {
  return (
    <figure
      className={`mb-12 rounded-3xl border border-[#E8DDC9] bg-[#F5EEDF] p-4 sm:p-6 ${styles.aside}`}
      style={{ '--editorial-aside-rows': gridRows } as CSSProperties}
    >
      <div className="mx-auto w-[240px] md:w-[290px] lg:w-[260px]">
        <YouTubeShortFacade
          youtubeId={video.youtubeId}
          posterSrc={video.posterSrc}
          posterWidth={video.posterWidth}
          posterHeight={video.posterHeight}
          playLabel={video.playLabel[locale]}
          iframeTitle={video.caption[locale]}
          playFeatureName={video.playFeatureName}
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-md text-center text-[15px] leading-6 text-[#45516A]">
        {video.caption[locale]}
      </figcaption>
    </figure>
  )
}

/** 6. One related-guides block: the context links' topics, related topics, the overview guide and cross-domain links. */
export function EditorialRelatedGuides({ config, domain, topic, locale }: {
  config: TopicLandingConfig; domain: AuthorityDomain; topic: AuthorityTopic; locale: Locale
}) {
  const localePath = locale === 'hi' ? '/hi' : ''
  const { contextLinks } = config
  const slugs = [...contextLinks.topicSlugs, ...getRelatedTopics(domain, topic).map(t => t.slug), contextLinks.overviewSlug]
  const topics = [...new Set(slugs)].filter(slug => slug !== topic.slug && domain.topics[slug]).map(slug => domain.topics[slug])
  const crossLinks = topic.crossDomainLinks ?? []

  return (
    <section aria-labelledby="editorial-related" className="mt-6 rounded-3xl border border-[#E8DDC9] bg-[#F5EEDF] p-4 md:p-7">
      <h2 id="editorial-related" className="text-[24px] md:text-[28px] font-bold leading-tight tracking-tight text-[#1B2A4A] [text-wrap:balance]">{T.related[locale]}</h2>
      <p className="mt-2 max-w-[46rem] text-[16px] leading-7 text-[#45516A]">{contextLinks.body[locale]}</p>
      <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map(t => (
          <li key={t.slug}>
            <Link
              href={`${localePath}${domain.basePath}/${t.slug}`}
              className={`flex h-full flex-col rounded-2xl border border-[#E8DDC9] bg-white p-4 transition hover:border-[#C9A227] ${focusRing}`}
            >
              <h3 className="text-[16px] font-bold leading-snug text-[#1B2A4A]">{loc(t, 'title', locale)}</h3>
              <span className="mt-1 flex-1 text-[14px] leading-6 text-[#45516A]">{loc(t, 'subtitle', locale)}</span>
              <span aria-hidden="true" className="mt-2 text-[#A8461F]">→</span>
            </Link>
          </li>
        ))}
        {crossLinks.map(link => (
          <li key={`${link.domainSlug}-${link.topicSlug}`}>
            <Link
              href={`${localePath}/${[link.domainSlug, link.topicSlug].filter(Boolean).join('/')}`}
              className={`flex h-full min-h-[64px] items-center justify-between gap-3 rounded-2xl border border-[#E8DDC9] bg-white p-4 transition hover:border-[#C9A227] ${focusRing}`}
            >
              <span className="text-[16px] font-bold leading-snug text-[#1B2A4A]">{loc(link, 'label', locale)}</span>
              <span aria-hidden="true" className="text-[#A8461F]">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
