import { APP_ROUTES } from './app-routes';

export const DesktopHeaderLinks = [
  {
    label: '면접질문 예측',
    link: APP_ROUTES.createArchive(),
  },
  {
    label: '기출문제',
    link: APP_ROUTES.solved(),
  },
  { label: '실전연습', link: APP_ROUTES.practice() },
  { label: '아카이브', link: APP_ROUTES.archive() },
] as const;

export const MobileHeaderLinks = [
  {
    label: '홈',
    link: APP_ROUTES.home(),
  },
  {
    label: '면접질문 예측',
    link: APP_ROUTES.createArchive(),
  },
  {
    label: '기출문제',
    link: APP_ROUTES.solved(),
  },
  { label: '실전연습', link: APP_ROUTES.practice() },
  { label: '아카이브', link: APP_ROUTES.archive() },
] as const;

export const LandingFooterLinks = [
  // {
  //   label: '홈',
  //   link: APP_ROUTES.home(),
  // },
  {
    label: '면접질문 예측',
    link: APP_ROUTES.createArchive(),
  },
  {
    label: '기출문제',
    link: APP_ROUTES.solved(),
  },
  { label: '실전연습', link: APP_ROUTES.practice() },
  { label: '아카이브', link: APP_ROUTES.archive() },
] as const;
