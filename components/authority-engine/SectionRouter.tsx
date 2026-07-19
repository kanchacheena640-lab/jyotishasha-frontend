// components/authority-engine/SectionRouter.tsx
// Single dispatch point — maps section.layout → renderer component.
// Adding a new layout: add SectionLayout.X to types.ts + one import + one entry here.

import type { ComponentType } from 'react'
import { SectionLayout } from '@/lib/authority-engine/types'
import type { SectionRendererProps, PageSection, Locale } from '@/lib/authority-engine/types'
import CardsSection     from './sections/CardsSection'
import GridSection      from './sections/GridSection'
import ChecklistSection from './sections/ChecklistSection'
import TimelineSection  from './sections/TimelineSection'
import TableSection     from './sections/TableSection'
import AccordionSection from './sections/AccordionSection'
import ListSection      from './sections/ListSection'
import AlertSection     from './sections/AlertSection'
import FaqSection       from './sections/FaqSection'
import ComparisonSection from './sections/ComparisonSection'
import InlineCtaSection from './sections/InlineCtaSection'

const SECTION_RENDERERS: Record<SectionLayout, ComponentType<SectionRendererProps>> = {
  [SectionLayout.Cards]:      CardsSection,
  [SectionLayout.Grid]:       GridSection,
  [SectionLayout.Checklist]:  ChecklistSection,
  [SectionLayout.Timeline]:   TimelineSection,
  [SectionLayout.Table]:      TableSection,
  [SectionLayout.Accordion]:  AccordionSection,
  [SectionLayout.List]:       ListSection,
  [SectionLayout.Alert]:      AlertSection,
  [SectionLayout.FAQ]:        FaqSection,
  [SectionLayout.Comparison]: ComparisonSection,
  [SectionLayout.CTA]:        InlineCtaSection,
}

interface Props {
  section: PageSection
  locale: Locale
}

export default function SectionRouter({ section, locale }: Props) {
  const Renderer = SECTION_RENDERERS[section.layout]
  if (!Renderer) return null
  return <Renderer section={section} locale={locale} />
}
