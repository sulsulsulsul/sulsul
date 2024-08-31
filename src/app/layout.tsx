import type { Metadata } from 'next';

import { Header } from '@/components/layouts/header';
import { pretendard } from '@/lib/fonts';
import GoogleAnalytics from '@/lib/google-analytics';

import { Providers } from './providers';

import './globals.css';

export const metadata: Metadata = {
  title: '술술ㅣAI 면접 질문 예측부터 면접 기출 100선까지',
  description:
    '인공지능 수리와 함께하는 취업 면접 올킬 작전! 체계적인 면접준비, 지금 무료로 시작해보세요.',
  icons: {
    icon: '/public/images/favicon.ico',
  },
  openGraph: {
    images: 'https://suulsuul.vercel.app/public/images/favicon.ico',
    title: '술술ㅣAI 면접 질문 예측부터 면접 기출 100선까지',
    description:
      '인공지능 수리와 함께하는 취업 면접 올킬 작전! 체계적인 면접준비, 지금 무료로 시작해보세요.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={pretendard.variable} lang="ko" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS ? (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        ) : null}
        <Providers>
          <div className="min-h-[940px] overflow-hidden bg-gray-50">
            <Header />
            <div className="min-h-[calc(100vh-60px)]">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
