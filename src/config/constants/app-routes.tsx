export const APP_ROUTES = {
  home: () => '/',
  archive: () => '/archive',
  archiveDetail: (id: number) => `/archive/${id}`,
  createArchive: () => '/archive/create',
  practice: () => '/practice',
  login: () => '/auth/login',
  authError: () => '/auth/error',
  my: () => '/my',
} as const

export const ROOT = APP_ROUTES.home()
export const PUBLIC_ROUTES = [ROOT, APP_ROUTES.login()] as string[]
export const DEFAULT_REDIRECT = ROOT

export const AUTH_ROUTES = [APP_ROUTES.login(), APP_ROUTES.authError()]
export const API_AUTH_PREFIX = '/api/auth'
