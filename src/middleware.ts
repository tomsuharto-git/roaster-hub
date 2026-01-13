import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('roaster-auth')?.value === 'authenticated';
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Allow login page and API routes
  if (isLoginPage || request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
