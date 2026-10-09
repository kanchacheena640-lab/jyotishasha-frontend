'use client'
// components/authority-engine/landing/SampleHookLink.tsx
// Secondary "see what you'll get" proof link under the video. It does NOT
// own a viewer: a tap activates the offer card's existing FocusedSampleViewer
// trigger in the same unit, so there is still exactly one dialog / history
// entry, and the click is tracked once by LeadOfferActions' existing capture
// handler (marriage_timing_sample_report). Without JS, or if that trigger is
// missing, it stays a plain link to the same locale sample PDF.

import type { MouseEvent } from 'react'

interface Props {
  href: string
  lead: string
  label: string
}

export default function SampleHookLink({ href, lead, label }: Props) {
  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    // Inside the offer unit (Marriage Timing): that unit's trigger. Outside it (inline Shorts card):
    // the page's report-offer trigger, so the same viewer opens and the click is tracked once there.
    const trigger =
      event.currentTarget.closest('section')?.querySelector<HTMLAnchorElement>('[data-sample-trigger]') ??
      document.querySelector<HTMLAnchorElement>('section[aria-labelledby="topic-landing-offer"] [data-sample-trigger]')
    if (!trigger) return
    event.preventDefault()
    trigger.click()
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
      className="mt-2 flex min-h-[44px] flex-wrap items-center justify-center gap-x-1.5 px-2 text-center text-sm leading-5 underline-offset-4 hover:underline"
    >
      <span className="text-gray-400">{lead}</span>
      <span className="font-medium text-rose-200">{label} →</span>
    </a>
  )
}
