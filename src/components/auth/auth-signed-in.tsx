'use client';

import { PropsWithChildren } from 'react';
import { useSession } from 'next-auth/react';
interface AuthSignedInProps extends PropsWithChildren {}

export const AuthSignedIn = ({ children }: AuthSignedInProps) => {
  const { status } = useSession();
  if (status !== 'authenticated') {
    return null;
  }
  return <>{children}</>;
};
