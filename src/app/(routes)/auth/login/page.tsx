'use client'
import { PUBLIC_ROUTES } from '@/config/constants/app-routes'
import { SingInView } from '@/entities/auth/views/sing-in-view'

interface Props {
  searchParams: {
    callbackUrl?: string
  }
}

const Page = ({ searchParams: { callbackUrl = '/' } }: Props) => {
  return (
    <SingInView
      callbackUrl={PUBLIC_ROUTES.includes(callbackUrl) ? callbackUrl : '/'}
    />
  )
}

export default Page
