// components/tools/FinancialToolSeo.tsx
// Financial Astrology tool pages only (lib/domains/financial-astrology/_tools.ts): a visible breadcrumb
// rendered FROM the page's own BreadcrumbList object (same items, names and URLs by construction), and a
// server-rendered links block to the Financial hub, the matching guide and the ₹99 standard report.
// Server component: plain crawlable links, no client JavaScript.

import Link from 'next/link'
import type { FinancialToolLinkSet } from '@/lib/domains/financial-astrology/_tools'

const SITE = 'https://www.jyotishasha.com'
const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120]'

interface BreadcrumbItem { name: string; item: string }

/** Absolute schema URL -> the same page's site path ("https://www.jyotishasha.com" -> "/"). */
const toPath = (url: string) => url.replace(SITE, '') || '/'

export function FinancialToolBreadcrumb({ schema, locale }: { schema: { itemListElement: BreadcrumbItem[] }; locale: 'en' | 'hi' }) {
  const items = schema.itemListElement
  return (
    <nav aria-label={locale === 'hi' ? 'ब्रेडक्रम्ब' : 'Breadcrumb'} className="max-w-5xl mx-auto px-4 pt-6">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-gray-300">
        {items.map((crumb, i) => {
          const last = i === items.length - 1
          return (
            <li key={crumb.item} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="px-1 font-medium text-white">{crumb.name}</span>
              ) : (
                <>
                  <Link href={toPath(crumb.item)} className={`inline-flex min-h-[44px] min-w-[44px] items-center px-1 text-purple-200 hover:underline ${focusRing}`}>
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true" className="text-gray-400">›</span>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export function FinancialToolLinks({ links, locale }: { links: FinancialToolLinkSet; locale: 'en' | 'hi' }) {
  const isHi = locale === 'hi'
  const card = `flex min-h-[44px] flex-col justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-base text-purple-50 hover:bg-purple-500/20 ${focusRing}`
  return (
    <section aria-labelledby="financial-tool-links" className="pt-4" data-financial-tool-links="">
      <h2 id="financial-tool-links" className="text-2xl font-semibold text-purple-300">
        {isHi ? 'वित्त ज्योतिष में आगे पढ़ें' : 'Continue With Financial Astrology'}
      </h2>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
        <li>
          <Link href={links.hub.href} className={card}>
            <span className="font-semibold">{links.hub.label} <span aria-hidden="true">→</span></span>
            <span className="text-sm text-gray-300">{isHi ? 'सभी गाइड, टूल्स और रिपोर्ट' : 'All guides, tools and reports'}</span>
          </Link>
        </li>
        <li>
          <Link href={links.guide.href} className={card}>
            <span className="font-semibold">{links.guide.label} <span aria-hidden="true">→</span></span>
            <span className="text-sm text-gray-300">{isHi ? 'मुफ़्त गाइड' : 'Free guide'}</span>
          </Link>
        </li>
        <li>
          <Link href={links.report.href} className={card}>
            <span className="font-semibold">{links.report.label} — ₹{links.report.price} <span aria-hidden="true">→</span></span>
            <span className="text-sm text-gray-300">{isHi ? 'विस्तृत PDF रिपोर्ट' : 'Detailed PDF report'}</span>
            {links.report.englishOnlyNotice && <span className="mt-1 text-sm text-gray-300">{links.report.englishOnlyNotice}</span>}
          </Link>
        </li>
      </ul>
    </section>
  )
}
