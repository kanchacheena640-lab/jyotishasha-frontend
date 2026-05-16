import { NextResponse } from 'next/server'

const locales = ['en', 'hi']

export function middleware(request) {
  const { pathname } = request.nextUrl

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

  // House rewrite
  if (pathname.includes('house-')) {
    const parts = pathname.split('/')

    const planet = parts[1]
    const ascendant = parts[2]
    const house = parts[3]?.replace('house-', '')

    return NextResponse.rewrite(
      new URL(
        `/en/${planet}/${ascendant}/house/${house}`,
        request.url
      )
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