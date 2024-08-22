import { auth } from './app/api/auth/[...nextauth]/auth';
import { API_AUTH_PREFIX, PUBLIC_ROUTES } from './config/constants/app-routes';

export default auth((req) => {
  const { nextUrl } = req;

  const isAuthenticated = !!req.auth;
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname);
  const isAPIAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX);

  if (isAPIAuthRoute || isPublicRoute) {
    return;
  }
});

export const config = {
  matcher: [
    '/((?!.+\\.[\\w]+$|_next).*)',
    '/',
    '/(api|trpc)(.*)',
    '/archive/:path*',
  ],
};
