// Server-side registry for optional landing inline tools (TopicLandingConfig.inlineTool).
// Resolves catalogue data (report href + price) on the server so client tools never
// hard-code a product price. Topics without an inlineTool never render this.

import { reportsData } from '@/app/data/reportsData'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingInlineTool } from '@/lib/authority-engine/landing-types'
import SpouseLagnaTool from './SpouseLagnaTool'
import ContextualReportCard from './ContextualReportCard'

interface Props {
  tool: TopicLandingInlineTool
  locale: Locale
}

export default function LandingInlineTool({ tool, locale }: Props) {
  switch (tool.kind) {
    case 'spouse-lagna': {
      const product = reportsData.find(r => r.slug === tool.reportSlug)
      return <SpouseLagnaTool locale={locale} reportHref={`/reports/${tool.reportSlug}`} priceRupees={product?.price} />
    }
    case 'contextual-report': {
      const product = reportsData.find(r => r.slug === tool.reportSlug)
      if (!product) return null
      return <ContextualReportCard unit={tool} locale={locale} reportHref={`/reports/${tool.reportSlug}`} priceRupees={product.price} />
    }
    default:
      return null
  }
}
