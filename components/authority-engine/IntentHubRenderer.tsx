// components/authority-engine/IntentHubRenderer.tsx
// Mobile-first subject hub (currently Marriage only): compact hero ->
// question cards -> free tools + muhurat -> personalised reports (standard,
// relationship, focused question cards) -> topic groups -> the domain's
// existing hub copy. AuthorityHubRenderer and TopicCard are untouched.
// Server component: every link is a plain crawlable <a>, all text is
// server-rendered. Report names, prices and focused questions are read from
// the catalogs, never typed into the hub config.

import Link from 'next/link'
import type { AuthorityDomain, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { reportsData } from '@/app/data/reportsData'
import {
  getFocusedReportCatalogEntry, getFocusedReportConfigBySlug, questionKeyToHumanSlug,
} from '@/app/data/focusedReportsConfig'
import { getReportProductPath } from '@/lib/reportProductSeo'

export interface IntentHubIntent {
  slug: string
  icon: string
  label: string
  label_hi: string
}

export interface IntentHubTool {
  /** Locale-neutral path of an existing route; HI is served under /hi. */
  href: string
  icon: string
  title: string
  title_hi: string
  benefit: string
  benefit_hi: string
}

export interface IntentHubMuhurat extends IntentHubTool {
  cta: string
  cta_hi: string
}

export interface IntentHubReportRef {
  /** reportsData.ts slug -- name and price are read from the catalog. */
  slug: string
  description: string
  description_hi: string
}

export interface IntentHubReports {
  heading: string
  heading_hi: string
  intro: string
  intro_hi: string
  featured: IntentHubReportRef
  more: IntentHubReportRef[]
  focusedHeading: string
  focusedHeading_hi: string
  focusedIntro: string
  focusedIntro_hi: string
  /** Focused-report question_keys -- question, price and description come from the catalog/config. */
  focusedKeys: string[]
}

export interface IntentHubTopicGroup {
  id: string
  icon: string
  title: string
  title_hi: string
  description: string
  description_hi: string
}

export interface IntentHubTopic {
  slug: string
  /** IntentHubTopicGroup.id */
  group: string
  title: string
  title_hi: string
}

export interface IntentHubConfig {
  icon: string
  h1: string
  h1_hi: string
  lead: string
  lead_hi: string
  /** Optional hub-specific <title>/description; the domain's hubTitle stays the fallback. */
  seoTitle?: string
  seoTitle_hi?: string
  metaDescription?: string
  metaDescription_hi?: string
  intentHeading: string
  intentHeading_hi: string
  intents: IntentHubIntent[]
  toolsHeading: string
  toolsHeading_hi: string
  tools: IntentHubTool[]
  muhurat?: IntentHubMuhurat
  reports?: IntentHubReports
  topicsHeading: string
  topicsHeading_hi: string
  topicGroups: IntentHubTopicGroup[]
  topics: IntentHubTopic[]
  /** Optional extra sentence(s) appended to the lower hub-copy section. */
  aboutExtra?: string
  aboutExtra_hi?: string
}

interface Props {
  domain: AuthorityDomain
  hub: IntentHubConfig
  locale: Locale
}

const T = {
  readGuide: { en: 'Read the guide', hi: 'गाइड पढ़ें' },
  openTool: { en: 'Open free tool', hi: 'फ्री टूल खोलें' },
  free: { en: 'Free', hi: 'फ्री' },
  featured: { en: 'Most complete marriage reading', hi: 'विवाह का सबसे विस्तृत विश्लेषण' },
  viewReport: { en: 'View report', hi: 'रिपोर्ट देखें' },
  getAnswer: { en: 'Get My Answer', hi: 'मेरा जवाब पाएं' },
  forOne: { en: 'For one person', hi: 'एक व्यक्ति के लिए' },
  forTwo: { en: 'For two people: both birth details needed', hi: 'दो लोगों के लिए: दोनों की जन्म जानकारी ज़रूरी' },
  enOnlyPage: {
    en: '',
    hi: 'यह पेज अंग्रेज़ी में है; फ़ॉर्म में रिपोर्ट की भाषा हिंदी चुन सकते हैं।',
  },
  enOnlyCatalog: {
    en: '',
    hi: '“सभी रिपोर्ट” वाला पेज अंग्रेज़ी में है।',
  },
  allReports: { en: 'See all reports', hi: 'सभी रिपोर्ट देखें' },
  allFocused: { en: 'See all ₹51 focused reports', hi: 'सभी ₹51 फोकस्ड रिपोर्ट देखें' },
}

// Shared design tokens (warm ivory page, navy text, terracotta/gold accents).
const cardBase =
  'rounded-2xl bg-white shadow-[0_1px_2px_rgba(27,42,74,0.06)] transition hover:shadow-[0_4px_14px_rgba(27,42,74,0.08)] ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2]'
const card = `${cardBase} border border-[#E8DDC9] hover:border-[#C9A227]`
const iconTile = 'flex flex-none items-center justify-center rounded-xl bg-[#F7EED6] text-xl'
const h2Class = 'text-[24px] md:text-[30px] font-bold leading-tight tracking-tight text-[#1B2A4A] [text-wrap:balance]'
const cta = 'inline-flex items-center gap-1 text-[15px] font-semibold text-[#A8461F]'

export default function IntentHubRenderer({ domain, hub, locale }: Props) {
  const localePath = locale === 'hi' ? '/hi' : ''
  const topicHref = (slug: string) => `${localePath}${domain.basePath}/${slug}`
  // Only ever link topics that exist in the registry -- no dead links if a
  // config slug drifts from the domain's topics.
  const exists = (slug: string) => Boolean(domain.topics[slug])
  const intents = hub.intents.filter(i => exists(i.slug))
  const topics = hub.topics.filter(t => exists(t.slug))

  const reports = hub.reports
  const reportBySlug = (slug: string) => reportsData.find(r => r.slug === slug)
  const featured = reports ? reportBySlug(reports.featured.slug) : undefined
  const moreReports = (reports?.more ?? [])
    .map(ref => ({ ref, report: reportBySlug(ref.slug) }))
    .filter((x): x is { ref: IntentHubReportRef; report: NonNullable<typeof x.report> } => Boolean(x.report))
  // Through the focused-reports config layer (the approved catalog entry point):
  // the exact customer question, person mode and price, never retyped here.
  const focused = (reports?.focusedKeys ?? []).flatMap(key => {
    const config = getFocusedReportConfigBySlug(questionKeyToHumanSlug(key))
    return config ? [{ config, question: getFocusedReportCatalogEntry(config).question }] : []
  })
  const isEnglishOnly = (slug: string) => getReportProductPath(slug, locale) === `/reports/${slug}`

  return (
    <main className="min-h-screen bg-[#FBF8F2] text-[#45516A]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-6 md:px-6 md:pt-10">

        {/* Hero -- H1, one supporting line, then the eight questions */}
        <header className="mb-12 md:mb-16">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className={`${iconTile} h-12 w-12 text-2xl`}>{hub.icon}</span>
            <h1 className="text-[30px] md:text-[42px] font-bold leading-tight tracking-tight text-[#1B2A4A]">
              {loc(hub, 'h1', locale)}
            </h1>
          </div>
          <p className="mt-3 max-w-3xl text-[17px] leading-7 text-[#45516A]">
            {loc(hub, 'lead', locale)}
          </p>

          {intents.length > 0 && (
            <section aria-labelledby="hub-intents" className="mt-8 rounded-3xl border border-[#E8DDC9] bg-[#F5EEDF] p-4 md:p-7">
              <h2 id="hub-intents" className={h2Class}>
                {loc(hub, 'intentHeading', locale)}
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {intents.map(intent => (
                  <li key={intent.slug}>
                    <Link href={topicHref(intent.slug)} className={`${card} flex h-full min-h-[64px] items-start gap-3 p-4`}>
                      <span aria-hidden="true" className={`${iconTile} h-10 w-10`}>{intent.icon}</span>
                      <span className="flex-1 text-[16px] font-semibold leading-snug text-[#1B2A4A]">
                        {loc(intent, 'label', locale)}
                      </span>
                      <span aria-hidden="true" className="mt-0.5 flex-none text-lg text-[#A8461F]">›</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </header>

        {/* Free tools + the muhurat page */}
        {hub.tools.length > 0 && (
          <section aria-labelledby="hub-tools" className="mb-14 md:mb-20">
            <h2 id="hub-tools" className={h2Class}>{loc(hub, 'toolsHeading', locale)}</h2>
            <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {hub.tools.map(tool => (
                <li key={tool.href}>
                  <Link href={`${localePath}${tool.href}`} className={`${card} flex h-full flex-col p-5`}>
                    <span className="flex items-center justify-between">
                      <span aria-hidden="true" className={`${iconTile} h-11 w-11`}>{tool.icon}</span>
                      <span className="rounded-full bg-[#E9F3EC] px-2.5 py-0.5 text-[13px] font-semibold text-[#1F6B3A]">{T.free[locale]}</span>
                    </span>
                    <h3 className="mt-4 text-[18px] font-bold leading-snug text-[#1B2A4A]">{loc(tool, 'title', locale)}</h3>
                    <p className="mt-1.5 flex-1 text-[15px] leading-6">{loc(tool, 'benefit', locale)}</p>
                    <span className={`${cta} mt-4`}>{T.openTool[locale]} <span aria-hidden="true">→</span></span>
                  </Link>
                </li>
              ))}
            </ul>
            {hub.muhurat && (
              <Link
                href={`${localePath}${hub.muhurat.href}`}
                className="mt-4 flex flex-col gap-4 rounded-2xl bg-[#1B2A4A] p-5 text-[#FBF8F2] transition hover:bg-[#22355C] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A227] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2] sm:flex-row sm:items-center md:p-6"
              >
                <span aria-hidden="true" className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#C9A227]/20 text-2xl">{hub.muhurat.icon}</span>
                <span className="flex-1">
                  <span className="block text-[19px] font-bold leading-snug text-white">{loc(hub.muhurat, 'title', locale)}</span>
                  <span className="mt-1 block text-[15px] leading-6 text-[#E6E1D6]">{loc(hub.muhurat, 'benefit', locale)}</span>
                </span>
                <span className="inline-flex min-h-[44px] flex-none items-center justify-center rounded-xl bg-[#E8C766] px-5 text-[15px] font-bold text-[#1B2A4A]">
                  {loc(hub.muhurat, 'cta', locale)} <span aria-hidden="true" className="ml-1">→</span>
                </span>
              </Link>
            )}
          </section>
        )}

        {/* Personalised reports */}
        {reports && (featured || moreReports.length > 0 || focused.length > 0) && (
          <section aria-labelledby="hub-reports" className="mb-14 md:mb-20">
            <h2 id="hub-reports" className={h2Class}>{loc(reports, 'heading', locale)}</h2>
            <p className="mt-2 max-w-3xl text-[16px] leading-7">{loc(reports, 'intro', locale)}</p>

            <div className="mt-5 grid grid-cols-1 gap-3 lg:grid-cols-3">
              {featured && (
                <Link
                  href={getReportProductPath(featured.slug, locale)}
                  className={`${cardBase} flex flex-col border-2 border-[#C9A227] p-5 md:p-6 lg:col-span-3 lg:flex-row lg:items-center lg:gap-8`}
                >
                  <span className="flex-1">
                    <span className="inline-block rounded-full bg-[#F7EED6] px-3 py-1 text-[13px] font-semibold text-[#7A5A00]">{T.featured[locale]}</span>
                    <span className="mt-3 block text-[22px] md:text-[26px] font-bold leading-snug text-[#1B2A4A]">{featured.title[locale]}</span>
                    <span className="mt-2 block text-[16px] leading-7">{loc(reports.featured, 'description', locale)}</span>
                    {isEnglishOnly(featured.slug) && T.enOnlyPage[locale] && (
                      <span className="mt-2 block text-[14px] leading-6 text-[#5B667D]">{T.enOnlyPage[locale]}</span>
                    )}
                  </span>
                  <span className="mt-5 flex items-center justify-between gap-4 lg:mt-0 lg:flex-col lg:items-end">
                    <span className="text-[30px] font-bold leading-none text-[#1B2A4A]">₹{featured.price}</span>
                    <span className="inline-flex min-h-[48px] items-center rounded-xl bg-[#A8461F] px-6 text-[16px] font-bold text-white">
                      {T.viewReport[locale]} <span aria-hidden="true" className="ml-1">→</span>
                    </span>
                  </span>
                </Link>
              )}
              {moreReports.map(({ ref, report }) => (
                <Link key={report.slug} href={getReportProductPath(report.slug, locale)} className={`${card} flex flex-col p-5`}>
                  <span className="text-[18px] font-bold leading-snug text-[#1B2A4A]">{report.title[locale]}</span>
                  <span className="mt-1.5 flex-1 text-[15px] leading-6">{loc(ref, 'description', locale)}</span>
                  {isEnglishOnly(report.slug) && T.enOnlyPage[locale] && (
                    <span className="mt-2 text-[13px] leading-5 text-[#5B667D]">{T.enOnlyPage[locale]}</span>
                  )}
                  <span className="mt-4 flex items-center justify-between">
                    <span className="text-[22px] font-bold text-[#1B2A4A]">₹{report.price}</span>
                    <span className={cta}>{T.viewReport[locale]} <span aria-hidden="true">→</span></span>
                  </span>
                </Link>
              ))}
            </div>

            {focused.length > 0 && (
              <div className="mt-10">
                <h3 className="text-[21px] md:text-[24px] font-bold leading-snug text-[#1B2A4A]">{loc(reports, 'focusedHeading', locale)}</h3>
                <p className="mt-1.5 text-[16px] leading-7">{loc(reports, 'focusedIntro', locale)}</p>
                <ul className="mt-4 space-y-3">
                  {focused.map(({ question, config }) => (
                    <li key={config.questionKey}>
                      <Link
                        href={`${localePath}/reports/focused/${config.humanSlug}`}
                        className={`${card} flex flex-col gap-4 p-5 md:flex-row md:items-center md:gap-6`}
                      >
                        <span className="flex-1">
                          <span className="block text-[19px] md:text-[21px] font-bold leading-snug text-[#1B2A4A]">
                            {question.question[locale]}
                          </span>
                          <span className="mt-1.5 block text-[15px] leading-6">{config.benefits[locale][0]}</span>
                          <span className="mt-2 block text-[13px] font-medium text-[#5B667D]">
                            {question.personMode === 'dual' ? T.forTwo[locale] : T.forOne[locale]}
                          </span>
                        </span>
                        <span className="flex flex-none items-center justify-between gap-4 md:flex-col md:items-end md:gap-2">
                          <span className="text-[24px] font-bold leading-none text-[#1B2A4A]">₹{config.priceRupees}</span>
                          <span className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-xl bg-[#1B2A4A] px-5 text-[15px] font-bold text-white">
                            {T.getAnswer[locale]} <span aria-hidden="true" className="ml-1">→</span>
                          </span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reports" className="inline-flex min-h-[48px] items-center rounded-xl border border-[#1B2A4A]/25 bg-white px-5 text-[15px] font-semibold text-[#1B2A4A] transition hover:border-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2]">
                {T.allReports[locale]} <span aria-hidden="true" className="ml-1">→</span>
              </Link>
              <Link href={`${localePath}/reports/focused`} className="inline-flex min-h-[48px] items-center rounded-xl border border-[#1B2A4A]/25 bg-white px-5 text-[15px] font-semibold text-[#1B2A4A] transition hover:border-[#1B2A4A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FBF8F2]">
                {T.allFocused[locale]} <span aria-hidden="true" className="ml-1">→</span>
              </Link>
            </div>
            {T.enOnlyCatalog[locale] && (
              <p className="mt-2 text-[13px] leading-5 text-[#5B667D]">{T.enOnlyCatalog[locale]}</p>
            )}
          </section>
        )}

        {/* Topic groups -- every topic guide exactly once */}
        <section aria-labelledby="hub-topics" className="mb-14 md:mb-20">
          <h2 id="hub-topics" className={h2Class}>{loc(hub, 'topicsHeading', locale)}</h2>
          <ul className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
            {hub.topicGroups.map(group => {
              const groupTopics = topics.filter(t => t.group === group.id)
              if (groupTopics.length === 0) return null
              return (
                <li key={group.id} className="rounded-2xl border border-[#E8DDC9] bg-white p-5">
                  <div className="flex items-center gap-3">
                    <span aria-hidden="true" className={`${iconTile} h-10 w-10`}>{group.icon}</span>
                    <h3 className="text-[18px] font-bold leading-snug text-[#1B2A4A]">{loc(group, 'title', locale)}</h3>
                  </div>
                  <p className="mt-2 text-[15px] leading-6">{loc(group, 'description', locale)}</p>
                  <ul className="mt-3 divide-y divide-[#EFE7D8]">
                    {groupTopics.map(topic => (
                      <li key={topic.slug}>
                        <Link
                          href={topicHref(topic.slug)}
                          className="flex min-h-[48px] items-center justify-between gap-3 rounded-lg px-1 text-[16px] font-semibold text-[#1B2A4A] hover:text-[#A8461F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2A4A]"
                        >
                          <span>{loc(topic, 'title', locale)}</span>
                          <span aria-hidden="true" className="text-[#A8461F]">→</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            })}
          </ul>
        </section>

        {/* The domain's existing hub copy, kept server-rendered lower on the page */}
        <section className="rounded-2xl border border-[#E8DDC9] bg-[#F5EEDF] p-5 md:p-7">
          <h2 className="text-[20px] md:text-[24px] font-bold leading-snug text-[#1B2A4A]">
            {loc(domain, 'hubTitle', locale)}
          </h2>
          <p className="mt-3 max-w-4xl text-[16px] leading-7">{loc(domain, 'hubSubtitle', locale)}</p>
          {hub.aboutExtra && (
            <p className="mt-3 max-w-4xl text-[16px] leading-7">{loc(hub, 'aboutExtra', locale)}</p>
          )}
        </section>
      </div>
    </main>
  )
}
