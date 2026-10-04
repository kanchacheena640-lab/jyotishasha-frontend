'use client'
// components/authority-engine/landing/YouTubeShortFacade.tsx
// Click-to-load YouTube Short. Initial render is a real link (opens the Short
// on YouTube without JS) showing a local, lazily-loaded 9:16 poster inside a
// box whose size is fixed by aspect-ratio -- no YouTube request and no layout
// shift before interaction. A tap mounts the youtube-nocookie.com iframe in
// the same box with autoplay + playsinline.

import { useState } from 'react'
import type { MouseEvent } from 'react'
import { WebsiteEvents } from '@/lib/websiteEvents'

interface Props {
  youtubeId: string
  posterSrc: string
  posterWidth: number
  posterHeight: number
  playLabel: string
  iframeTitle: string
  playFeatureName: string
}

export default function YouTubeShortFacade({
  youtubeId, posterSrc, posterWidth, posterHeight, playLabel, iframeTitle, playFeatureName,
}: Props) {
  const [playing, setPlaying] = useState(false)

  const onPlay = (event: MouseEvent<HTMLAnchorElement>) => {
    // New-tab / modifier clicks keep the native link behaviour.
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    setPlaying(true)
    WebsiteEvents.featureUsed(playFeatureName)
  }

  return (
    <div className="relative aspect-[9/16] w-full overflow-hidden rounded-2xl bg-black shadow-lg shadow-black/40">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&playsinline=1&rel=0`}
          title={iframeTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <a
          href={`https://www.youtube.com/shorts/${youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={onPlay}
          aria-label={playLabel}
          className="group absolute inset-0 block focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-400"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- static local poster, fixed box */}
          <img
            src={posterSrc}
            width={posterWidth}
            height={posterHeight}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 ring-2 ring-white/80 transition-transform group-hover:scale-105"
          >
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7 fill-white"><path d="M8 5v14l11-7z" /></svg>
          </span>
        </a>
      )}
    </div>
  )
}
