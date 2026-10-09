// components/authority-engine/landing/MarriageYouTubeShort.tsx
// Server component: a topic's YouTube Short inside the article (TopicLandingConfig.inlineVideo),
// placed after one content section. Styled like the Marriage Timing lead video (same card
// border/gradient, 240px phone / 290px desktop poster, caption below, optional sample hook),
// but kept out of the report card so the paid CTA stays where it is. Before a tap it shows the
// self-hosted 9:16 poster in a box whose size is fixed by aspect-ratio (no YouTube request, no
// layout shift); a tap mounts the youtube-nocookie.com iframe. Only the facade and the sample
// hook hydrate.

import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingInlineVideo } from '@/lib/authority-engine/landing-types'
import YouTubeShortFacade from './YouTubeShortFacade'
import SampleHookLink from './SampleHookLink'

interface Props {
  video: TopicLandingInlineVideo
  locale: Locale
  /** Verified sample PDF of the page's report offer; the hook renders only with it. */
  sampleHref?: string
  sampleLabel?: string
}

export default function MarriageYouTubeShort({ video, locale, sampleHref, sampleLabel }: Props) {
  return (
    <aside
      aria-labelledby="topic-landing-video"
      className="mb-12 overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#1d1530] via-[#151a31] to-[#121a2e] p-4 shadow-xl shadow-black/40 sm:p-6"
    >
      <figure className="mx-auto w-[240px] md:w-[290px]">
        <YouTubeShortFacade
          youtubeId={video.youtubeId}
          posterSrc={video.posterSrc}
          posterWidth={video.posterWidth}
          posterHeight={video.posterHeight}
          playLabel={video.playLabel[locale]}
          iframeTitle={video.heading[locale]}
          playFeatureName={video.playFeatureName}
        />
        <figcaption id="topic-landing-video" className="mt-2 text-center text-sm leading-5 text-gray-300">
          {video.heading[locale]}
          <span className="mt-1 block text-xs leading-5 text-gray-400">{video.description[locale]}</span>
        </figcaption>
        {sampleHref && sampleLabel && video.sampleHookLead && (
          <SampleHookLink href={sampleHref} lead={video.sampleHookLead[locale]} label={sampleLabel} />
        )}
      </figure>
    </aside>
  )
}
