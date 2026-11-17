// components/authority-engine/financial/FinancialCtaPanel.tsx
// Financial Astrology guide CTAs (base report, ₹51 focused report, free tool), resolved by
// lib/domains/financial-astrology/_ctas.ts. Server component: plain crawlable links, no client JS.
// Financial-scoped on purpose: the shared CtaBlock (also used by Marriage) is left unchanged.
// Clicks fire the existing first-party `cta_click` event through TrackedLink (the only client piece);
// navigation is never prevented or delayed.

import TrackedLink from '@/components/muhurat/TrackedLink'
import type { FinancialCtaCard } from '@/lib/domains/financial-astrology/_ctas'

interface Props {
  cards: FinancialCtaCard[]
}

const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b1120]'

export default function FinancialCtaPanel({ cards }: Props) {
  if (cards.length === 0) return null
  return (
    <div className="my-8 space-y-4" data-financial-cta-panel="">
      {cards.map(card => (
        <div
          key={card.href}
          data-cta-kind={card.kind}
          className={`rounded-2xl border p-6 ${card.isPrimary ? 'border-amber-500/30 bg-amber-500/10' : 'border-gray-700/50 bg-[#1a1744]/30'}`}
        >
          <p className={`mb-1 text-xs font-semibold uppercase tracking-wider ${card.isPrimary ? 'text-amber-400' : 'text-gray-400'}`}>
            {card.eyebrow}
          </p>
          <h3 className="mb-1 text-lg font-bold text-white">{card.heading}</h3>
          <p className="mb-4 text-sm text-gray-300">{card.description}</p>
          <TrackedLink
            href={card.href}
            ctaId={card.ctaId}
            screenName={card.screenName}
            className={`inline-flex min-h-[44px] items-center rounded-xl px-5 text-sm font-semibold transition-colors ${focusRing} ${
              card.isPrimary ? 'bg-amber-400 text-[#0b1120] hover:bg-amber-300' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {card.button} <span aria-hidden="true" className="ml-1">→</span>
          </TrackedLink>
          {card.notice && <p className="mt-2 text-xs text-gray-400">{card.notice}</p>}
        </div>
      ))}
    </div>
  )
}
