export const APP_ROUTES = {
  home: () => '/',
  archive: () => '/archive',
  archiveDetail: (id: number) => `/archive/${id}`,
  createArchive: () => '/archive/create',
  practice: () => '/practice',
  my: () => '/my',
} as const;

export const ROOT = APP_ROUTES.home();
export const PUBLIC_ROUTES = [ROOT] as string[];
export const DEFAULT_REDIRECT = ROOT;

export const API_AUTH_PREFIX = '/api/auth';
