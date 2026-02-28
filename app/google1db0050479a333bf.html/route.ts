import { NextResponse } from 'next/server'

export function GET() {
  return new NextResponse('google-site-verification: google1db0050479a333bf.html', {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
