"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { WebsiteEvents } from "@/lib/websiteEvents";

// Fire-and-forget click tracking with the existing `cta_click` event (fixed ids only).
// Navigation is never prevented or delayed; a tracking failure can never block the click.
export function trackMuhuratClick(ctaId: string, screenName: string): void {
  try {
    WebsiteEvents.ctaClick(ctaId, screenName);
  } catch {
    // Analytics must never affect navigation.
  }
}

export default function TrackedLink({
  href,
  ctaId,
  screenName,
  className,
  children,
}: {
  href: string;
  ctaId: string;
  screenName: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link href={href} className={className} onClick={() => trackMuhuratClick(ctaId, screenName)}>
      {children}
    </Link>
  );
}
