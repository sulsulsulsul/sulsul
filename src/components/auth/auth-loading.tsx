'use client'
import { PropsWithChildren } from 'react'
import { useSession } from 'next-auth/react'
interface AuthLoadingProps extends PropsWithChildren {}

export const AuthLoading = ({ children }: AuthLoadingProps) => {
  const { status } = useSession()
  if (status !== 'loading') {
    return null
  }
  return <>{children}</>
}
