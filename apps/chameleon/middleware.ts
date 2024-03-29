import { NextResponse } from 'next/server'

import { auth } from './lib/auth'

export default auth((req) => {
  const token = req.auth
  const isAuth = !!token
  const isAuthPage =
    req.nextUrl.pathname.startsWith('/login') ||
    req.nextUrl.pathname.startsWith('/register')

  if (isAuthPage) {
    if (isAuth) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return null
  }

  if (!isAuth) {
    let from = req.nextUrl.pathname
    if (req.nextUrl.search) {
      from += req.nextUrl.search
    }

    return NextResponse.redirect(
      new URL(`/login?from=${encodeURIComponent(from)}`, req.url)
    )
  }
})

export const config = {
  matcher: ['/dashboard/:path*', '/editor/:path*', '/login', '/register'],
}
