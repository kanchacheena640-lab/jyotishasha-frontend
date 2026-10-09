// components/authority-engine/landing/MarriageYouTubeShort.tsx
// Server component: a topic's YouTube Short inside the article (TopicLandingConfig.inlineVideo),
// placed after one content section. Heading and text are server-rendered; only the existing
// YouTubeShortFacade hydrates. Before a tap it shows the self-hosted 9:16 poster in a box whose
// size is fixed by aspect-ratio (no YouTube request, no layout shift); a tap mounts the
// youtube-nocookie.com iframe. An <aside> with an <h3>, like the contextual report card, so the
// article's <h2> section outline is unchanged.

import type { Locale } from '@/lib/authority-engine/types'
import type { TopicLandingInlineVideo } from '@/lib/authority-engine/landing-types'
import YouTubeShortFacade from './YouTubeShortFacade'

interface Props {
  video: TopicLandingInlineVideo
  locale: Locale
}

export default function MarriageYouTubeShort({ video, locale }: Props) {
  return (
    <aside
      aria-labelledby="topic-landing-video"
      className="my-10 rounded-3xl border border-white/10 bg-white/[0.03] px-5 py-6 sm:px-8 sm:py-8"
    >
      <div className="mx-auto max-w-md text-center">
        <h3 id="topic-landing-video" className="text-lg font-bold leading-snug text-white sm:text-xl">
          {video.heading[locale]}
        </h3>
        <p className="mt-2 text-sm leading-6 text-gray-300">{video.description[locale]}</p>
      </div>
      <figure className="mx-auto mt-5 w-full max-w-[260px] sm:max-w-[300px]">
        <YouTubeShortFacade
          youtubeId={video.youtubeId}
          posterSrc={video.posterSrc}
          posterWidth={video.posterWidth}
          posterHeight={video.posterHeight}
          playLabel={video.playLabel[locale]}
          iframeTitle={video.heading[locale]}
          playFeatureName={video.playFeatureName}
        />
      </figure>
    </aside>
  )
}
