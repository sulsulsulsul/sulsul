'use client'
import { Toaster } from '@/components/ui/sonner'
import { getQueryClient } from '@/lib/tanstack-query/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

interface ProvidersProps extends PropsWithChildren {
  session?: Session
  queryClient?: QueryClient
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
        <Toaster />

        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  )
}
