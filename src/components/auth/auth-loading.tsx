'use client'
import { useSession } from 'next-auth/react'
import { PropsWithChildren } from 'react'
interface AuthLoadingProps extends PropsWithChildren {}

export const AuthLoading = ({ children }: AuthLoadingProps) => {
  const { status } = useSession()
  if (status !== 'loading') {
    return null
  }
  return <>{children}</>
}
