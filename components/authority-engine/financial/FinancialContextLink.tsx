// components/authority-engine/financial/FinancialContextLink.tsx
// One contextual link to another Financial guide (lib/domains/financial-astrology/_contextLinks.ts), rendered
// after a section of the source guide. Server component: a plain crawlable link.

import Link from 'next/link'
import type { FinancialContextLink as ContextLink } from '@/lib/domains/financial-astrology/_contextLinks'

export default function FinancialContextLink({ link }: { link: ContextLink }) {
  return (
    <p className="mb-10 text-sm text-gray-300" data-financial-context-link="">
      {link.lead}{' '}
      <Link href={link.href} className="font-semibold text-purple-300 underline underline-offset-2 hover:text-white">
        {link.label} <span aria-hidden="true">→</span>
      </Link>
    </p>
  )
}
