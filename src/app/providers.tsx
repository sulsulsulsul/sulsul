'use client';
import { PropsWithChildren } from 'react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/ui/sonner';
import { getQueryClient } from '@/lib/tanstack-query/client';
import { SuccessIcon } from '@/components/shared/success-icon';
import { ErrorIcon } from '@/components/shared/error-icon';

interface ProvidersProps extends PropsWithChildren {
  session?: Session;
  queryClient?: QueryClient;
}

export const Providers = ({
  children,
  session,
  queryClient,
}: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient ?? getQueryClient()}>
        {children}
        <Toaster
          icons={{
            success: <SuccessIcon />,
            error: <ErrorIcon />,
          }}
        />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};
