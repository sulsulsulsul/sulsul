import { NextRequest, NextResponse, userAgent } from 'next/server';

import { auth } from './app/api/auth/[...nextauth]/auth';
import { API_AUTH_PREFIX, PUBLIC_ROUTES } from './config/constants/app-routes';

export default auth((request) => {
  const { nextUrl } = request;

  const isAuthenticated = !!request.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAPIAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);

  if (isAPIAuthRoute || isPublicRoute) {
    return;
  }
});

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const { device } = userAgent(request);
  const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';
  console.log('>>', viewport);
  url.searchParams.set('viewport', viewport);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/archive/:path*',
    '/practice/:path*',
  ],
};
