import { type ReactNode } from 'react'
import type { PageSection, Locale } from '@/lib/authority-engine/types'
import { loc } from '@/lib/authority-engine/i18n'

interface SectionShellProps {
  section: PageSection
  locale: Locale
  children: ReactNode
}

export default function SectionShell({ section, locale, children }: SectionShellProps) {
  return (
    <section className="mb-10">
      <h2 className="text-base font-semibold text-white mb-4 tracking-tight">
        {loc(section, 'title', locale)}
      </h2>
      {children}
    </section>
  )
}
