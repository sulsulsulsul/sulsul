'use client'

import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
interface AuthSignedInProps extends PropsWithChildren {}

export const AuthSignedIn = ({ children }: AuthSignedInProps) => {
  const { status } = useSession()
  if (status !== 'authenticated') {
    return null
  }
  return <>{children}</>
}
