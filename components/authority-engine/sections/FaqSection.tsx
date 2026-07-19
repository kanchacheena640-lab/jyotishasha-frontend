'use client'
import { useState } from 'react'
import type { SectionRendererProps } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'
import SectionShell from './SectionShell'

export default function FaqSection({ section, locale }: SectionRendererProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <SectionShell section={section} locale={locale}>
      <dl className="space-y-2">
        {section.items.map(item => {
          const isOpen = openId === item.id
          return (
            <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
              <dt>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="w-full text-left px-4 py-3 text-white text-sm font-medium flex justify-between items-center gap-3"
                >
                  <span>{loc(item, 'label', locale)}</span>
                  <span className="shrink-0 text-gray-400 select-none" aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              </dt>
              {isOpen && item.body && (
                <dd className="px-4 pb-4 pt-3 text-xs text-gray-400 leading-relaxed border-t border-white/10">
                  {loc(item, 'body', locale)}
                </dd>
              )}
            </div>
          )
        })}
      </dl>
    </SectionShell>
  )
}
