import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define public routes that anyone can access
  const isPublicRoute = 
    pathname === '/login' ||
    pathname === '/admin/login' || 
    pathname === '/signup' || 
    pathname.startsWith('/api/auth');

  // 2. Define static assets and API routes that should be public (images, fonts, etc.)
  const isStaticAsset = 
    pathname.startsWith('/_next') || 
    pathname.startsWith('/public') || 
    pathname.startsWith('/favicon.ico');

  if (isPublicRoute || isStaticAsset) {
    return NextResponse.next();
  }

  // 3. Check for authentication tokens
  const userToken = request.cookies.get('user_token')?.value;
  const adminToken = request.cookies.get('admin_token')?.value;

  // If no token is found, redirect the user to the login page
  if (!userToken && !adminToken) {
    const loginUrl = new URL('/admin/login', request.url);
    // Optional: add a redirect parameter to send them back after login
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Configure which paths the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (unless it's auth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
