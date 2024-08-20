'use client';

import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
interface AuthSignedOutProps extends PropsWithChildren {}

export const AuthSignedOut = ({ children }: AuthSignedOutProps) => {
  const { status } = useSession();
  if (status !== 'unauthenticated') {
    return null;
  }
  return <>{children}</>;
};
