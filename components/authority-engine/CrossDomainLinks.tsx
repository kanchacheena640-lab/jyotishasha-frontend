// components/authority-engine/CrossDomainLinks.tsx
// Links to topics in other registered domains.

import Link from 'next/link'
import type { CrossDomainLink, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import { UI_LABELS } from '@/lib/authority-engine/constants'

interface Props {
  links: CrossDomainLink[]
  locale: Locale
}

export default function CrossDomainLinks({ links, locale }: Props) {
  const localePath = locale === 'hi' ? '/hi' : ''

  return (
    <section className="mt-10 pt-6 border-t border-purple-900/20">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        {UI_LABELS.exploreMore[locale]}
      </p>
      <div className="flex flex-wrap gap-3">
        {links.map(link => (
          <Link
            key={`${link.domainSlug}-${link.topicSlug}`}
            href={`${localePath}/${link.domainSlug}/${link.topicSlug}`}
            className="text-sm text-purple-300 hover:text-white bg-[#1e1b4b] hover:bg-[#2a2565] border border-purple-900/50 hover:border-purple-500 px-4 py-2 rounded-lg transition-all"
          >
            {loc(link, 'label', locale)}
          </Link>
        ))}
      </div>
    </section>
  )
}
