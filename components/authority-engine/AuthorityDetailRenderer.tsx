// components/authority-engine/AuthorityDetailRenderer.tsx
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import type { AuthorityDetailProps } from '@/lib/authority-engine/types'
import { getRelatedTopics } from '@/lib/authority-engine/resolver'
import AuthorityBreadcrumb from './AuthorityBreadcrumb'
import TopicHero from './TopicHero'
import SectionRouter from './SectionRouter'
import StaticFaqSection from './sections/StaticFaqSection'
import CtaBlock from './CtaBlock'
import RelatedTopics from './RelatedTopics'
import CrossDomainLinks from './CrossDomainLinks'
import landingStyles from './landing/landing.module.css'

/** Optional per-topic landing slots. All absent = the original layout, unchanged. */
interface LandingSlots {
  /** Rendered right after the hero (e.g. direct answer + conversion unit). */
  lead?: ReactNode
  /** Rendered immediately before the FAQ section (or after all sections if none). */
  beforeFaq?: ReactNode
  /**
   * Render FAQ answers -- and accordion-layout section bodies -- in server HTML
   * (native <details>) instead of the client-only accordions.
   */
  ssrFaq?: boolean
  /** Opt-in long-form reading rhythm (landing.module.css `.longform`). */
  longForm?: boolean
  /** Optional node rendered right after the content section with this id (e.g. an inline tool). */
  afterSection?: { sectionId: string; node: ReactNode }
  /** Optional extra nodes after content sections (e.g. an inline video), rendered after `afterSection`. */
  afterSections?: { sectionId: string; node: ReactNode }[]
}

export default function AuthorityDetailRenderer({
  domain, topic, locale, lead, beforeFaq, ssrFaq, longForm, afterSection, afterSections,
}: AuthorityDetailProps & LandingSlots) {
  const related = getRelatedTopics(domain, topic)
  const hasFaq = topic.sections.some(section => section.layout === 'faq')

  return (
    <main className={`min-h-screen bg-[#0b1120] text-white ${lead ? 'pt-2' : 'pt-12'}`}>
      <div className={`max-w-4xl mx-auto px-4 md:px-6 ${lead ? `pt-4 pb-10 md:py-10 ${landingStyles.landing}${longForm ? ` ${landingStyles.longform}` : ''}` : 'py-10'}`}>
        <AuthorityBreadcrumb domain={domain} topic={topic} locale={locale} />
        <TopicHero domain={domain} topic={topic} locale={locale} />
        {lead}

        {topic.sections.map(section => (
          <Fragment key={section.id}>
            {section.layout === 'faq' && beforeFaq}
            {ssrFaq && (section.layout === 'faq' || section.layout === 'accordion')
              ? <StaticFaqSection section={section} locale={locale} />
              : <SectionRouter section={section} locale={locale} />}
            {afterSection?.sectionId === section.id && afterSection.node}
            {afterSections?.map((slot, i) =>
              slot.sectionId === section.id ? <Fragment key={`after-${i}`}>{slot.node}</Fragment> : null
            )}
          </Fragment>
        ))}
        {!hasFaq && beforeFaq}

        {topic.ctas.map((cta, i) => (
          <CtaBlock
            key={`${cta.type}-${cta.slug}`}
            cta={cta}
            locale={locale}
            isPrimary={i === 0}
            accentColor={domain.accentColor}
          />
        ))}

        <RelatedTopics
          topics={related}
          basePath={domain.basePath}
          locale={locale}
          accentColor={domain.accentColor}
        />

        {topic.crossDomainLinks && topic.crossDomainLinks.length > 0 && (
          <CrossDomainLinks links={topic.crossDomainLinks} locale={locale} />
        )}
      </div>
    </main>
  )
}
