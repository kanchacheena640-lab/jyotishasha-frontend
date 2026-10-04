// components/authority-engine/sections/StaticFaqSection.tsx
// Server-rendered FAQ using native <details>/<summary>: every answer is in the
// HTML (crawlable, works without JS), collapsed by default. Opt-in per topic
// (AuthorityDetailRenderer `ssrFaq`); FaqSection stays the default elsewhere.

import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import SectionShell from './SectionShell'

export default function StaticFaqSection({ section, locale }: SectionRendererProps) {
  return (
    <SectionShell section={section} locale={locale}>
      <div className="space-y-2">
        {section.items.map(item => (
          <details key={item.id} className="group rounded-xl border border-white/10 bg-white/[0.03] open:bg-white/[0.05]">
            <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-[15px] font-medium leading-6 text-white [&::-webkit-details-marker]:hidden">
              <span>{loc(item, 'label', locale)}</span>
              <span aria-hidden="true" className="shrink-0 text-lg text-gray-400 transition-transform group-open:rotate-45">+</span>
            </summary>
            {item.body && (
              <div className="border-t border-white/10 px-4 pb-4 pt-3 text-base leading-7 text-gray-300">
                {loc(item, 'body', locale)}
              </div>
            )}
          </details>
        ))}
      </div>
    </SectionShell>
  )
}
