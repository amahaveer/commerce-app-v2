// Don't invoke Middleware on some paths
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('unifiedAccessToken')?.value;
  if (!accessToken && !request.url.endsWith('login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (accessToken && request.url.endsWith('login')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
