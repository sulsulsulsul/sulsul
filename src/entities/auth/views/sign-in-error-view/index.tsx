'use client';

import { HTMLAttributes } from 'react';
import { redirect } from 'next/navigation';

import { APP_ROUTES } from '@/config/constants/app-routes';
import { useCurrentUser } from '@/entities/users/hooks';
import { cn } from '@/lib/utils';
interface SignInErrorViewProps extends HTMLAttributes<HTMLDivElement> {}

export const SignInErrorView = ({
  className,
  ...props
}: SignInErrorViewProps) => {
  const { status } = useCurrentUser();
  if (status === 'authenticated') {
    redirect(APP_ROUTES.home());
  }
  return (
    <div className={cn(className)} {...props}>
      <main className="container">
        <h2>로그인 실패</h2>
        <p>
          나중에 다시 시도해주세요. 문제가 지속되면 관리자에게 문의해주세요.
        </p>
      </main>
    </div>
  );
};
