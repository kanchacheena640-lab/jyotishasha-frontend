import { NextResponse } from 'next/server'

const locales = ['en', 'hi']

export function middleware(request) {
  const { pathname } = request.nextUrl

  // Legacy Muhurat URL Fixes

  if (pathname === '/panchang/muhurat/grahpravesh-muhurat') {
    return NextResponse.redirect(
      new URL('/panchang/muhurat/grah-pravesh-muhurat', request.url),
      301
    )
  }

  if (pathname === '/hi/panchang/muhurat/grahpravesh-muhurat') {
    return NextResponse.redirect(
      new URL('/hi/panchang/muhurat/grah-pravesh-muhurat', request.url),
      301
    )
  }

  // FAST EXIT
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/reports') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Public pages
  if (
    pathname === '/privacy-policy' ||
    pathname === '/terms' ||
    pathname === '/refund-policy' ||
    pathname === '/account-deletion'
  ) {
    return NextResponse.next()
  }

  // Holi rewrite
  if (pathname.includes('holi-')) {
    const parts = pathname.split('holi-')
    const year = parts[1]

    return NextResponse.rewrite(
      new URL(`/en/holi/${year}`, request.url)
    )
  }

  // Public SEO URL: /house-9
  if (pathname.includes('house-')) {

    const parts = pathname.split('/').filter(Boolean)

    const isHi = parts[0] === 'hi'

    const planet = isHi ? parts[1] : parts[0]
    const ascendant = isHi ? parts[2] : parts[1]
    const house = (isHi ? parts[3] : parts[2])?.replace('house-', '')

    return NextResponse.rewrite(
      new URL(
        `${isHi ? '/hi' : '/en'}/${planet}/${ascendant}/house/${house}`,
        request.url
      )
    )
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

  // Locale check
  const hasLocale = locales.some(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (!hasLocale) {
    const url = request.nextUrl.clone()
    url.pathname = `/en${pathname}`

    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next|api|favicon.ico|.*\\..*).*)',
  ],
}