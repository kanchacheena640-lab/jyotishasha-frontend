import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const blockedBots = [
  'Bytespider',
  'ClaudeBot',
  'GPTBot',
  'PetalBot',
  'Amazonbot',
  'CCBot'
]

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''

  if (blockedBots.some(bot => userAgent.includes(bot))) {
    return new NextResponse('Blocked', { status: 403 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/:path*'
}