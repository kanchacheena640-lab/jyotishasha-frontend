// components/authority-engine/AuthorityDetailRenderer.tsx
import type { AuthorityDetailProps } from '@/lib/authority-engine/types'
import { getRelatedTopics } from '@/lib/authority-engine/resolver'
import AuthorityBreadcrumb from './AuthorityBreadcrumb'
import TopicHero from './TopicHero'
import SectionRouter from './SectionRouter'
import CtaBlock from './CtaBlock'
import RelatedTopics from './RelatedTopics'
import CrossDomainLinks from './CrossDomainLinks'

export default function AuthorityDetailRenderer({ domain, topic, locale }: AuthorityDetailProps) {
  const related = getRelatedTopics(domain, topic)

  return (
    <main className="min-h-screen bg-[#0b1120] text-white pt-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <AuthorityBreadcrumb domain={domain} topic={topic} locale={locale} />
        <TopicHero domain={domain} topic={topic} locale={locale} />

        {topic.sections.map(section => (
          <SectionRouter key={section.id} section={section} locale={locale} />
        ))}

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
