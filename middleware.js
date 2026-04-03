import { NextResponse } from 'next/server'

const blockedBots = [
  'Bytespider','ClaudeBot','GPTBot','PetalBot','Amazonbot',
  'CCBot','SemrushBot','AhrefsBot','DotBot','YandexBot','Sogou'
]

const locales = ['en','hi']
const defaultLocale = 'en'

export function middleware(request) {
  const { pathname } = request.nextUrl

  // 🔥 FAST EXIT (most important)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/reports') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const userAgent = request.headers.get('user-agent') || ''

  // 🔥 Bot check (only once)
  if (
    !userAgent.includes('Googlebot') &&
    !userAgent.includes('bingbot') &&
    blockedBots.some(bot => userAgent.includes(bot))
  ) {
    return new NextResponse('Blocked', { status: 403 })
  }

  // 🔥 LIGHT CHECK instead of regex
  if (pathname.includes('holi-')) {
    const parts = pathname.split('holi-')
    const year = parts[1]
    const isHindi = pathname.startsWith('/hi')

    return NextResponse.rewrite(
      new URL(`/${isHindi ? 'hi' : 'en'}/holi/${year}`, request.url)
    )
  }

  if (pathname.includes('house-')) {
    const isHindi = pathname.startsWith('/hi')
    const parts = pathname.split('/')

    const planet = parts[1]
    const ascendant = parts[2]
    const house = parts[3]?.replace('house-', '')

    return NextResponse.rewrite(
      new URL(`/${isHindi ? 'hi' : 'en'}/${planet}/${ascendant}/house/${house}`, request.url)
    )
  }

  // 🔥 Locale check
  const hasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  const headers = new Headers(request.headers)

  if (!hasLocale) {
    const lang = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale
    headers.set('x-jyotishasha-lang', lang)

    return NextResponse.rewrite(
      new URL(`/${lang}${pathname}`, request.url),
      { request: { headers } }
    )
  }

  const currentLocale = pathname.startsWith('/hi') ? 'hi' : 'en'
  headers.set('x-jyotishasha-lang', currentLocale)

  return NextResponse.next({
    request: { headers }
  })
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}