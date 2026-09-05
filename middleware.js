import { NextResponse } from 'next/server'
import { resolveConsentGeoPolicy } from './lib/geo'

const locales = ['en', 'hi']

// Geo-Aware Consent v1, Phase 2A -- centralizes the geo cookie(s) onto
// EVERY response this middleware can produce. Phase 1's audit found the
// geo cookie was only attached to 6 of this file's 14 response
// branches (every redirect and the 410 response were skipped). This
// change ONLY adds Set-Cookie headers to whatever response a branch was
// already going to return -- it never changes a redirect's destination
// or status code, a rewrite's target, or which branch runs for a given
// path. Every existing branch's own return value is unchanged; each one
// is now wrapped in withGeoCookies(...) instead of returned bare (the
// 6 that already called the old setCountryCookie(...) keep doing
// exactly that, under its new name).
//
// jyotishasha_geo_country -- UNCHANGED name, value, and attributes from
// the temporary India-diagnostic commit (aa12e67): still the raw
// x-vercel-ip-country value, non-httpOnly, 24h, path=/, sameSite=lax.
// Left byte-for-byte identical so the existing India consent bypass
// (app/layout.tsx, context/ConsentContext.tsx, lib/consent.ts) keeps
// working exactly as it does today -- Phase 2A does not remove or
// change that bypass's behavior.
//
// jyotishasha_geo_policy -- NEW in Phase 2A. Carries the OUTPUT of the
// central resolver (lib/geo.ts::resolveConsentGeoPolicy), computed
// server-side from the same country value. Nothing currently reads
// this cookie -- it is pure foundation for a later phase's
// pre-hydration consent bootstrap, added now so that later work won't
// need to duplicate the EEA/UK/Switzerland list inline in client JS.
// Same attributes as the country cookie. Adding a cookie nobody reads
// yet has no observable effect on any current behavior.
const GEO_COUNTRY_COOKIE = 'jyotishasha_geo_country'
const GEO_POLICY_COOKIE = 'jyotishasha_geo_policy'
const GEO_COOKIE_OPTIONS = {
  path: '/',
  maxAge: 60 * 60 * 24,
  sameSite: 'lax',
}

function withGeoCookies(response, country) {
  if (country) {
    response.cookies.set(GEO_COUNTRY_COOKIE, country, GEO_COOKIE_OPTIONS)
    response.cookies.set(
      GEO_POLICY_COOKIE,
      resolveConsentGeoPolicy(country),
      GEO_COOKIE_OPTIONS
    )
  }
  return response
}

export function middleware(request) {
  const { pathname } = request.nextUrl
  const country = request.headers.get('x-vercel-ip-country') || ''

  // Legacy Muhurat URL Fixes
  // Covers the hub page AND any month/year suffix under the old no-hyphen
  // slug (e.g. /panchang/muhurat/grahpravesh-muhurat/october,
  // /hi/panchang/muhurat/grahpravesh-muhurat/2026) -- not just the bare
  // hub path, so no month/year variant of this alias stays a live duplicate.
  // /en is matched too (and normalized to '', since English is canonically
  // unprefixed) so an /en/ request lands on the corrected bare slug in one
  // hop instead of falling through to the general /en/* rule below and
  // chaining back into this same rule on a second pass.
  const grahPraveshMatch = pathname.match(
    /^(\/hi|\/en)?\/panchang\/muhurat\/grahpravesh-muhurat(\/.*)?$/
  )
  if (grahPraveshMatch) {
    const rawPrefix = grahPraveshMatch[1] || ''
    const localePrefix = rawPrefix === '/en' ? '' : rawPrefix
    const suffix = grahPraveshMatch[2] || ''
    return withGeoCookies(NextResponse.redirect(
      new URL(`${localePrefix}/panchang/muhurat/grah-pravesh-muhurat${suffix}`, request.url),
      301
    ), country)
  }

  // FAST EXIT
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/reports')
  ) {
    return withGeoCookies(NextResponse.next(), country)
  }

  // Public pages
  if (
    pathname === '/privacy-policy' ||
    pathname === '/terms' ||
    pathname === '/refund-policy' ||
    pathname === '/account-deletion'
  ) {
    return withGeoCookies(NextResponse.next(), country)
  }

  // Holi rewrite
  if (pathname.includes('holi-')) {
    const parts = pathname.split('holi-')
    const year = parts[1]
    const isHi = pathname.startsWith('/hi/')

    return withGeoCookies(NextResponse.rewrite(
      new URL(`${isHi ? '/hi' : '/en'}/holi/${year}`, request.url)
    ), country)
  }

  // Public SEO URL: /house-9
  if (pathname.includes('house-')) {

    const parts = pathname.split('/').filter(Boolean)

    const isHi = parts[0] === 'hi'
    const isEn = parts[0] === 'en'

    // English is canonically unprefixed here, so an explicit /en/ segment
    // isn't a locale to strip-and-rewrite the way /hi/ is -- treating it as
    // one (like the branch below does) misparses "en" as the planet segment
    // and 404s. Redirect straight to the bare dash-form URL instead; that
    // request re-enters this same rule and is handled by the branch below.
    if (isEn) {
      return withGeoCookies(NextResponse.redirect(
        new URL(`/${parts.slice(1).join('/')}`, request.url),
        301
      ), country)
    }

    const planet = isHi ? parts[1] : parts[0]
    const ascendant = isHi ? parts[2] : parts[1]
    const house = (isHi ? parts[3] : parts[2])?.replace('house-', '')

    return withGeoCookies(NextResponse.rewrite(
      new URL(
        `${isHi ? '/hi' : '/en'}/${planet}/${ascendant}/house/${house}`,
        request.url
      )
    ), country)
  }

  // Redirect internal route to SEO URL
  if (pathname.includes('/house/')) {

    const parts = pathname.split('/').filter(Boolean)

    const isHi = parts[0] === 'hi'

    const planet = isHi ? parts[1] : parts[0]
    const ascendant = isHi ? parts[2] : parts[1]
    const house = isHi ? parts[4] : parts[3]

    return withGeoCookies(NextResponse.redirect(
      new URL(
        `${isHi ? '/hi' : ''}/${planet}/${ascendant}/house-${house}`,
        request.url
      ),
      301
    ), country)
  }

  // 301: legacy /blog listing -> /blogs
  // /en/blog must land on the bare canonical /blogs in one hop, not /en/blogs
  // (which would then chain into the general /en/* rule below).
  if (pathname === '/blog' || pathname === '/en/blog' || pathname === '/hi/blog') {
    const target = pathname === '/en/blog' ? '/blogs' : pathname + 's'
    return withGeoCookies(NextResponse.redirect(new URL(target, request.url), 301), country)
  }

  // 410 Gone: legacy numeric blog pagination (/blog/1, /en/blog/2, /hi/blog/999)
  if (/^(?:\/(?:en|hi))?\/blog\/\d+$/.test(pathname)) {
    return withGeoCookies(new NextResponse(null, {
      status: 410,
      headers: { 'X-Robots-Tag': 'noindex' },
    }), country)
  }

  // /panchang/today → 307 to today's ISO date URL (IST).
  // Must live in middleware (not the page) so ISR cache never serves a stale redirect target.
  // 307 (not 308): Google re-evaluates daily since the destination changes each day.
  if (pathname === '/panchang/today' || pathname === '/en/panchang/today') {
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return withGeoCookies(NextResponse.redirect(new URL(`/panchang/${today}`, request.url), 307), country)
  }
  if (pathname === '/hi/panchang/today') {
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return withGeoCookies(NextResponse.redirect(new URL(`/hi/panchang/${today}`, request.url), 307), country)
  }

  // Bare /en/panchang must land directly on today's dated bare-English URL
  // in one hop. Without this, it falls through to the general /en/* rule
  // below (-> /panchang, 301) and THEN into /panchang's own bare-hub
  // redirect (-> /panchang/{date}, 307) -- a confirmed 2-hop chain. Same IST
  // logic as the /panchang/today rule above; nextUrl.clone() (rather than
  // `new URL(literal, request.url)`) preserves any query string.
  if (pathname === '/en/panchang') {
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    const url = request.nextUrl.clone()
    url.pathname = `/panchang/${today}`
    return withGeoCookies(NextResponse.redirect(url, 307), country)
  }

  // English pages are canonically served with no locale prefix (/path, not
  // /en/path) -- only Hindi is meant to appear in the URL. Any request that
  // explicitly includes /en/ is therefore a duplicate of the real, canonical
  // URL and should permanently redirect to it. Everything above this point
  // already has its own tailored handling (including any /en/ variant it
  // needs to cover), so this only ever runs for paths nothing else matched.
  // Routes outside the localized [locale] architecture (API, admin, the
  // standalone /reports app) are explicitly excluded and keep prior behavior.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const isOutsideLocaleArchitecture =
      pathname.startsWith('/en/api/') ||
      pathname === '/en/admin' ||
      pathname.startsWith('/en/admin/') ||
      pathname === '/en/reports' ||
      pathname.startsWith('/en/reports/')

    if (!isOutsideLocaleArchitecture) {
      const url = request.nextUrl.clone()
      url.pathname = pathname === '/en' ? '/' : pathname.slice('/en'.length)
      return withGeoCookies(NextResponse.redirect(url, 301), country)
    }
  }

  // Locale check
  const hasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (!hasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`

    return withGeoCookies(NextResponse.rewrite(url), country)
  }

  return withGeoCookies(NextResponse.next(), country)
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}
