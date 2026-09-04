'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const ADSENSE_CLIENT = 'ca-pub-2039377363616016';
const ADSENSE_SRC = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
const ADSENSE_SCRIPT_ID = 'jyotishasha-adsense-script';

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

// Removes only DOM nodes that carry Google's own documented AdSense/Auto Ads
// markers: the <ins class="adsbygoogle"> ad-unit tag, any element carrying
// our exact ad-client attribute, and Google's own "aswift_"/"google_ads_iframe_"
// id-naming convention for the iframes (and their wrapper divs) it injects.
// Never removes an element based on position/proximity -- only an exact,
// positively-identified Google marker.
function removeGoogleAdArtifacts() {
  const selector = [
    'ins.adsbygoogle',
    `[data-ad-client="${ADSENSE_CLIENT}"]`,
    'iframe[id^="aswift_"]',
    'iframe[id^="google_ads_iframe_"]',
    'div[id^="google_ads_iframe_"]',
  ].join(',');
  document.querySelectorAll(selector).forEach((node) => node.remove());
}

function loadAdSenseScript() {
  if (document.getElementById(ADSENSE_SCRIPT_ID)) return; // already present -- dedupe
  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.src = ADSENSE_SRC;
  script.async = true;
  script.crossOrigin = 'anonymous';
  document.body.appendChild(script);
}

function unloadAdSenseScript() {
  document.getElementById(ADSENSE_SCRIPT_ID)?.remove();
  removeGoogleAdArtifacts();
}

// Loads the AdSense publisher script only on allowed routes, and explicitly
// tears the script element (and any already-injected Auto Ads) down the
// instant a client-side navigation lands on an excluded route. next/script
// alone never removes a previously-inserted script when the rendering
// component stops rendering it, which let a bootstrapped Auto Ads instance
// keep running -- and keep injecting ads -- after SPA navigation into an
// excluded route. Manual load/unload here closes that gap; see
// AD_FREE_PREFIXES above for the excluded route list.
export default function ConditionalAdSense() {
  const pathname = usePathname();
  const excludedRef = useRef(isAdFreeRoute(pathname));

  useEffect(() => {
    const excluded = isAdFreeRoute(pathname);
    excludedRef.current = excluded;

    if (excluded) {
      unloadAdSenseScript();
      return;
    }

    // Allowed route: load lazily, once the page has settled, mirroring the
    // prior lazyOnload timing as closely as practical for a manually
    // controlled script. Re-checks excludedRef at fire time so a route
    // change into an excluded page before this fires doesn't load ads onto it.
    const tryLoad = () => {
      if (!excludedRef.current) loadAdSenseScript();
    };

    if (document.readyState === 'complete') {
      const timeoutId = window.setTimeout(tryLoad, 0);
      return () => window.clearTimeout(timeoutId);
    }

    window.addEventListener('load', tryLoad, { once: true });
    return () => window.removeEventListener('load', tryLoad);
  }, [pathname]);

  return null;
}
