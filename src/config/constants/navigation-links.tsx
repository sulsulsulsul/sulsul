import { APP_ROUTES } from './app-routes'

export const DesktopHeaderLinks = [
  {
    label: '내 면접 질문',
    link: APP_ROUTES.createArchive(),
  },
  { label: '아카이브', link: APP_ROUTES.archive() },
  { label: '실전연습', link: APP_ROUTES.practice() },
] as const

export const MobileHeaderLinks = [
  {
    label: '홈',
    link: APP_ROUTES.home(),
  },
  {
    label: '면접 질문 예측',
    link: APP_ROUTES.createArchive(),
  },
  { label: '아카이브', link: APP_ROUTES.archive() },
  { label: '실전연습', link: APP_ROUTES.practice() },
] as const

export const LandingFooterLinks = [
  {
    label: '홈',
    link: APP_ROUTES.home(),
  },
  {
    label: '내 면접 질문',
    link: APP_ROUTES.createArchive(),
  },
  { label: '아카이브', link: APP_ROUTES.archive() },
  { label: '실전연습', link: APP_ROUTES.practice() },
] as const
