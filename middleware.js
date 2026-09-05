import { NextResponse } from 'next/server'

const locales = ['en', 'hi']

// TEMPORARY diagnostic (Sep 2026 GA4 investigation) -- surfaces Vercel's
// own edge-populated geolocation header to the client via a small,
// non-httpOnly cookie, so app/layout.tsx and context/ConsentContext.tsx
// can bypass the new denied-by-default consent state for India traffic
// only, to verify whether that rollout caused the Sep 4 GA4 drop.
// x-vercel-ip-country is Vercel's own documented, server-side, edge
// request header (no client-side IP lookup, no new dependency) --
// unlike components/location/LocationProvider.tsx's ipapi.co call, this
// cannot be blocked by CORS/ad-blockers and needs no extra round trip.
// Remove this constant, setCountryCookie(), and its call sites once the
// diagnostic is complete.
const GEO_COUNTRY_COOKIE = 'jyotishasha_geo_country'

function setCountryCookie(response, country) {
  if (country) {
    response.cookies.set(GEO_COUNTRY_COOKIE, country, {
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
    })
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
    return NextResponse.redirect(
      new URL(`${localePrefix}/panchang/muhurat/grah-pravesh-muhurat${suffix}`, request.url),
      301
    )
  }

  // FAST EXIT
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/reports')
  ) {
    return setCountryCookie(NextResponse.next(), country)
  }

  // Public pages
  if (
    pathname === '/privacy-policy' ||
    pathname === '/terms' ||
    pathname === '/refund-policy' ||
    pathname === '/account-deletion'
  ) {
    return setCountryCookie(NextResponse.next(), country)
  }

  // Holi rewrite
  if (pathname.includes('holi-')) {
    const parts = pathname.split('holi-')
    const year = parts[1]
    const isHi = pathname.startsWith('/hi/')

    return setCountryCookie(NextResponse.rewrite(
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
      return NextResponse.redirect(
        new URL(`/${parts.slice(1).join('/')}`, request.url),
        301
      )
    }

    const planet = isHi ? parts[1] : parts[0]
    const ascendant = isHi ? parts[2] : parts[1]
    const house = (isHi ? parts[3] : parts[2])?.replace('house-', '')

    return setCountryCookie(NextResponse.rewrite(
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

    return NextResponse.redirect(
      new URL(
        `${isHi ? '/hi' : ''}/${planet}/${ascendant}/house-${house}`,
        request.url
      ),
      301
    )
  }

  // 301: legacy /blog listing -> /blogs
  // /en/blog must land on the bare canonical /blogs in one hop, not /en/blogs
  // (which would then chain into the general /en/* rule below).
  if (pathname === '/blog' || pathname === '/en/blog' || pathname === '/hi/blog') {
    const target = pathname === '/en/blog' ? '/blogs' : pathname + 's'
    return NextResponse.redirect(new URL(target, request.url), 301)
  }

  // 410 Gone: legacy numeric blog pagination (/blog/1, /en/blog/2, /hi/blog/999)
  if (/^(?:\/(?:en|hi))?\/blog\/\d+$/.test(pathname)) {
    return new NextResponse(null, {
      status: 410,
      headers: { 'X-Robots-Tag': 'noindex' },
    })
  }

  // /panchang/today → 307 to today's ISO date URL (IST).
  // Must live in middleware (not the page) so ISR cache never serves a stale redirect target.
  // 307 (not 308): Google re-evaluates daily since the destination changes each day.
  if (pathname === '/panchang/today' || pathname === '/en/panchang/today') {
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return NextResponse.redirect(new URL(`/panchang/${today}`, request.url), 307)
  }
  if (pathname === '/hi/panchang/today') {
    const today = new Date(Date.now() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 10)
    return NextResponse.redirect(new URL(`/hi/panchang/${today}`, request.url), 307)
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
    return NextResponse.redirect(url, 307)
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
      return NextResponse.redirect(url, 301)
    }
  }

  // Locale check
  const hasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (!hasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`

    return setCountryCookie(NextResponse.rewrite(url), country)
  }

  return setCountryCookie(NextResponse.next(), country)
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}