import { auth } from './app/api/auth/[...nextauth]/auth'
import {
  API_AUTH_PREFIX,
  APP_ROUTES,
  AUTH_ROUTES,
  DEFAULT_REDIRECT,
  PUBLIC_ROUTES,
} from './config/constants/app-routes'

export default auth((req) => {
  const { nextUrl } = req

  const isAuthenticated = !!req.auth
  const isPublicRoute = PUBLIC_ROUTES.includes(nextUrl.pathname)
  const isAPIAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
  const isAuthRoute = AUTH_ROUTES.includes(nextUrl.pathname)

  if (isAPIAuthRoute) {
    return
  }
  if (isAuthRoute) {
    if (isAuthenticated) {
      return Response.redirect(new URL(DEFAULT_REDIRECT, nextUrl))
    }
    return
  }

  if (isPublicRoute) {
    return
  }

  if (!isAuthenticated) {
    let callbackUrl = nextUrl.pathname
    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    return Response.redirect(
      new URL(
        `${APP_ROUTES.login()}?callbackUrl=${encodedCallbackUrl}`,
        nextUrl,
      ),
    )
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
