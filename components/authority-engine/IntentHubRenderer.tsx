// components/authority-engine/IntentHubRenderer.tsx
// Mobile-first, concern-led hub: compact hero -> "What do you want to know?"
// intent links -> ONE ordered topic list -> the domain's existing hub copy
// -> optional hubLinks. Opt-in per hub route (currently Marriage only);
// AuthorityHubRenderer and TopicCard are untouched. Server component: every
// link is a plain crawlable <a>, all text is server-rendered.

import Link from 'next/link'
import type { AuthorityDomain, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'

export interface IntentHubIntent {
  slug: string
  label: string
  label_hi: string
}

export interface IntentHubTopic {
  slug: string
  icon: string
  title: string
  title_hi: string
  description: string
  description_hi: string
}

export interface IntentHubConfig {
  icon: string
  h1: string
  h1_hi: string
  lead: string
  lead_hi: string
  intentHeading: string
  intentHeading_hi: string
  intents: IntentHubIntent[]
  topicsHeading: string
  topicsHeading_hi: string
  topics: IntentHubTopic[]
  planningHeading: string
  planningHeading_hi: string
  /** Optional extra sentence(s) appended to the lower hub-copy section. */
  aboutExtra?: string
  aboutExtra_hi?: string
}

interface Props {
  domain: AuthorityDomain
  hub: IntentHubConfig
  locale: Locale
}

const READ_MORE = { en: 'Read more', hi: 'और पढ़ें' }

export default function IntentHubRenderer({ domain, hub, locale }: Props) {
  const localePath = locale === 'hi' ? '/hi' : ''
  const topicHref = (slug: string) => `${localePath}${domain.basePath}/${slug}`
  // Only ever link topics that exist in the registry -- no dead links if a
  // config slug drifts from the domain's topics.
  const exists = (slug: string) => Boolean(domain.topics[slug])
  const intents = hub.intents.filter(i => exists(i.slug))
  const topics = hub.topics.filter(t => exists(t.slug))

  return (
    <main className="min-h-screen bg-[#0b1120] text-white">
      <div className="max-w-5xl mx-auto px-4 md:px-6 pt-5 md:pt-10 pb-12">

        {/* Hero -- compact: icon, short H1, one supporting line */}
        <header className="mb-8 md:mb-10">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-11 w-11 flex-none items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-500/15 text-2xl"
            >
              {hub.icon}
            </span>
            <h1 className="text-[28px] md:text-4xl font-bold leading-tight tracking-tight text-white">
              {loc(hub, 'h1', locale)}
            </h1>
          </div>
          <p className="mt-3 max-w-2xl text-base leading-[26px] text-gray-300">
            {loc(hub, 'lead', locale)}
          </p>
        </header>

        {/* What do you want to know? -- concern-led links to existing topics */}
        {intents.length > 0 && (
          <section aria-labelledby="hub-intents" className="mb-10 md:mb-12">
            <h2 id="hub-intents" className="mb-4 text-[22px] md:text-2xl font-bold leading-snug text-white">
              {loc(hub, 'intentHeading', locale)}
            </h2>
            <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {intents.map(intent => (
                <li key={intent.slug}>
                  <Link
                    href={topicHref(intent.slug)}
                    className="flex h-full min-h-[56px] items-center justify-between gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-[15px] font-medium leading-snug text-gray-100 transition-colors hover:border-rose-400/50 hover:bg-white/[0.07] active:bg-white/[0.1]"
                  >
                    <span>{loc(intent, 'label', locale)}</span>
                    <span aria-hidden="true" className="flex-none text-rose-300">›</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ONE ordered topic list */}
        <section aria-labelledby="hub-topics" className="mb-12">
          <h2 id="hub-topics" className="mb-4 text-[22px] md:text-2xl font-bold leading-snug text-white">
            {loc(hub, 'topicsHeading', locale)}
          </h2>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map(topic => (
              <li key={topic.slug}>
                <Link
                  href={topicHref(topic.slug)}
                  className="group flex h-full gap-3.5 rounded-2xl border border-white/10 bg-[#121a2e] p-4 transition-colors hover:border-rose-400/40 hover:bg-[#16203a] active:bg-[#16203a]"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-rose-500/10 text-xl"
                  >
                    {topic.icon}
                  </span>
                  <div className="flex min-w-0 flex-col">
                    <h3 className="text-[17px] font-semibold leading-6 text-white">
                      {loc(topic, 'title', locale)}
                    </h3>
                    <p className="mt-1 text-[15px] leading-6 text-gray-300">
                      {loc(topic, 'description', locale)}
                    </p>
                    <span className="mt-2 text-sm font-medium text-rose-300 group-hover:text-rose-200">
                      {READ_MORE[locale]} →
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* The domain's existing hub copy, kept server-rendered lower on the page */}
        <section className="mb-10 rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6">
          <h2 className="text-[22px] md:text-2xl font-bold leading-snug text-white">
            {loc(domain, 'hubTitle', locale)}
          </h2>
          <p className="mt-3 text-base leading-7 text-gray-300">
            {loc(domain, 'hubSubtitle', locale)}
          </p>
          {hub.aboutExtra && (
            <p className="mt-3 text-base leading-7 text-gray-300">
              {loc(hub, 'aboutExtra', locale)}
            </p>
          )}
        </section>

        {/* Existing hubLinks (e.g. Vivah Muhurat), moved below the topic list */}
        {domain.hubLinks && domain.hubLinks.length > 0 && (
          <section aria-labelledby="hub-planning">
            <h2 id="hub-planning" className="mb-4 text-[22px] md:text-2xl font-bold leading-snug text-white">
              {loc(hub, 'planningHeading', locale)}
            </h2>
            <div className="flex flex-wrap gap-3">
              {domain.hubLinks.map(link => (
                <Link
                  key={link.href}
                  href={`${localePath}${link.href}`}
                  className="inline-flex min-h-[48px] items-center rounded-xl border border-purple-900/50 bg-[#1e1b4b] px-4 py-2 text-[15px] font-medium text-purple-200 transition-colors hover:border-purple-500 hover:bg-[#2a2565] hover:text-white"
                >
                  {loc(link, 'label', locale)} →
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
