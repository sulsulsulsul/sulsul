'use client'

import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
interface AuthSignedOutProps extends PropsWithChildren {}

export const AuthSignedOut = ({ children }: AuthSignedOutProps) => {
  const { status } = useSession()
  if (status !== 'unauthenticated') {
    return null
  }
  return <>{children}</>
}
