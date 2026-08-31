'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

// Routes where ads must never appear: the report purchase funnel, payment/
// checkout/processing pages, the post-payment thank-you page, and legal/
// policy pages. Matched after stripping a leading "/hi" locale segment so
// both the unprefixed English path and its Hindi equivalent are covered.
const AD_FREE_PREFIXES = [
  '/reports', // report purchase funnel (also covers /reports/[slug])
  '/love/report/relationship_future_report', // Razorpay checkout page
  '/processing', // payment-in-progress page
  '/thank-you', // post-payment success page
  '/privacy-policy',
  '/refund-policy',
  '/terms',
  '/account-deletion',
];

function isAdFreeRoute(pathname: string): boolean {
  const stripped = pathname.replace(/^\/hi(?=\/|$)/, '') || '/';
  return AD_FREE_PREFIXES.some(
    (prefix) => stripped === prefix || stripped.startsWith(`${prefix}/`)
  );
}

// Loads the Google AdSense script everywhere except the ad-free routes above.
// Client Component so it can read the current pathname; the script itself
// stays lazyOnload, matching prior behavior on every route that keeps ads.
export default function ConditionalAdSense() {
  const pathname = usePathname();

  if (isAdFreeRoute(pathname)) return null;

  return (
    <Script
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2039377363616016"
      strategy="lazyOnload"
      crossOrigin="anonymous"
    />
  );
}
