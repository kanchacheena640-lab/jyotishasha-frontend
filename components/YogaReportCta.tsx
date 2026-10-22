'use client';

import Link from 'next/link';
import { WebsiteEvents } from '@/lib/websiteEvents';
import { resolveYogaReportCta, type ResolvedYogaReportCta, type YogaKey } from '@/lib/yogaReportCta';

// Fire-and-forget click tracking: only the CTA's fixed ids are sent (never
// birth details), nothing is awaited, and the default Link navigation is
// never prevented -- a tracking failure can never block the click.
export function trackYogaReportCtaClick(cta: Pick<ResolvedYogaReportCta, 'ctaId' | 'screenName'>): void {
  try {
    WebsiteEvents.ctaClick(cta.ctaId, cta.screenName);
  } catch {
    // Analytics must never affect navigation.
  }
}

export default function YogaReportCta({
  yogaKey,
  yoga,
  locale,
}: {
  yogaKey: YogaKey;
  yoga?: { is_active?: boolean } | null;
  locale: 'en' | 'hi';
}) {
  const cta = resolveYogaReportCta(yogaKey, yoga, locale);
  if (!cta) return null;

  return (
    <div className="rounded border border-indigo-200 bg-indigo-50 p-4 space-y-2">
      <p className="font-medium text-gray-800">{cta.title}</p>
      <p className="text-sm text-gray-700">{cta.description}</p>
      <Link
        href={cta.href}
        onClick={() => trackYogaReportCtaClick(cta)}
        className="mt-1 inline-block px-4 py-2 bg-indigo-600 text-white text-sm rounded hover:bg-indigo-700"
      >
        {cta.label} →
      </Link>
    </div>
  );
}
