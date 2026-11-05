// Server-side registry for optional landing inline tools (TopicLandingConfig.inlineTool).
// Resolves catalogue data (report href + price) on the server so client tools never
// hard-code a product price. Topics without an inlineTool never render this.

import { reportsData } from '@/app/data/reportsData'
import { getReportProductPath } from '@/lib/reportProductSeo'
import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingInlineTool } from '@/lib/authority-engine/landing-types'
import SpouseLagnaTool from './SpouseLagnaTool'
import ContextualReportCard from './ContextualReportCard'

interface Props {
  tool: TopicLandingInlineTool
  locale: Locale
  /** Visual style of interactive tools; 'dark' (default) = the original landing styling. */
  variant?: 'dark' | 'editorial'
}

export default function LandingInlineTool({ tool, locale, variant = 'dark' }: Props) {
  switch (tool.kind) {
    case 'spouse-lagna': {
      const product = reportsData.find(r => r.slug === tool.reportSlug)
      return <SpouseLagnaTool locale={locale} reportHref={`/reports/${tool.reportSlug}`} priceRupees={product?.price} variant={variant} />
    }
    case 'contextual-report': {
      const product = reportsData.find(r => r.slug === tool.reportSlug)
      if (!product) return null
      // The real, locale-aware product page (= /reports/<slug> for every report except the Relationship Future Report).
      return <ContextualReportCard unit={tool} locale={locale} reportHref={getReportProductPath(tool.reportSlug, locale)} priceRupees={product.price} variant={variant} />
    }
    default:
      return null
  }
}
