import type { Preview } from '@storybook/react'
import { QueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'
import localFont from 'next/font/local'
import React from 'react'
import '../src/app/globals.css'
import { Providers } from '../src/app/providers'
export const pretendard = localFont({
  src: '../fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
})

const preview: Preview = {
  tags: ['autodocs'],

  decorators: [
    (Story) => {
      const queryClient = new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: false,
          },
        },
      })
      const mockSession: Session = {
        user: {
          name: 'John Doe',
          email: 'sangmin4208@gmail.com',
        },
        expires: '2029-01-01T00:00:00Z',
      }
      return (
        <Providers session={mockSession} queryClient={queryClient}>
          <Story />
        </Providers>
      )
    },
  ],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
