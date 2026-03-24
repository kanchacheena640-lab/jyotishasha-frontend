import { NextResponse } from 'next/server'

// 1. In bots ko block rakhenge
const blockedBots = [
  'Bytespider', 'ClaudeBot', 'GPTBot', 'PetalBot', 'Amazonbot', 'CCBot',
  'SemrushBot', 'AhrefsBot', 'DotBot', 'YandexBot', 'Sogou'
]

const locales = ['en', 'hi'];
const defaultLocale = 'en';

export function middleware(request) {
  const userAgent = request.headers.get('user-agent') || ''
  const { pathname } = request.nextUrl

  // ✅ KAAM 1: Bot Blocking (Security)
  const isGoodBot = userAgent.includes('Googlebot') || userAgent.includes('bingbot');
  if (!isGoodBot && blockedBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Blocked by Jyotishasha Security', { status: 403 })
  }

  // ✅ KAAM 2: Static Files & API Bypass (Inhe redirect mat karo)
  if (
    pathname.startsWith('/_next') || 
    pathname.startsWith('/api') || 
    pathname.startsWith('/admin') || 
    pathname.startsWith('/reports') ||
    pathname.includes('.') // favicon.ico, sitemap.xml etc.
  ) {
    return NextResponse.next();
  }

  // 🔥 KAAM 2.5: Holi clean URL fix
  const holiMatch = pathname.match(/^\/(hi\/)?holi-(\d{4})$/);

  if (holiMatch) {
    const isHindi = !!holiMatch[1];
    const year = holiMatch[2];

    return NextResponse.rewrite(
      new URL(`/${isHindi ? "hi" : "en"}/holi/${year}`, request.url)
    );
  }

  // 🔥 FIX: house-2.5.1 clean URL (like Holi)
  const houseMatch = pathname.match(/^\/(hi\/)?([a-z-]+)\/([a-z]+)\/house-(\d+)$/);

  if (houseMatch) {
    const isHindi = !!houseMatch[1];
    const planet = houseMatch[2];
    const ascendant = houseMatch[3];
    const house = houseMatch[4];

    return NextResponse.rewrite(
      new URL(`/${isHindi ? "hi" : "en"}/${planet}/${ascendant}/house/${house}`, request.url)
    );
  }

  // ✅ KAAM 3: Language Detection & Routing (The 404 Fix)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // Request headers copy karo backend ke liye
  const requestHeaders = new Headers(request.headers);

  if (!pathnameHasLocale) {
    // Agar URL mein locale nahi hai (e.g. /love), toh cookie check karo ya default 'en'
    const lang = request.cookies.get('NEXT_LOCALE')?.value || defaultLocale;
    
    // Backend ko bhasha ka signal bhejo
    requestHeaders.set('x-jyotishasha-lang', lang);

    // URL Rewrite: User ko /love dikhega, par Next load karega /[locale]/love
    return NextResponse.rewrite(
      new URL(`/${lang}${pathname}`, request.url),
      { request: { headers: requestHeaders } }
    );
  }

  // Agar URL mein pehle se locale hai (e.g. /hi/love)
  const currentLocale = pathname.startsWith('/hi') ? 'hi' : 'en';
  requestHeaders.set('x-jyotishasha-lang', currentLocale);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}