'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'

import { useUserStore } from '@/store/client'

export const useCurrentUser = () => {
  const { data, status, update } = useSession()
  const setUserInfo = useUserStore((state) => state.setUserInfo)

  useEffect(() => {
    if (data?.user) {
      setUserInfo({
        auth: {
          userId: data.user.auth?.userId || 0,
          token: data.user.auth?.token || '',
        },
        data: {
          email: data.user.email || '',
          job: data.user.data?.job || { jobId: 0, name: '' },
          nickname: data.user.data?.nickname || '',
          userId: data.user.auth?.userId || 0,
        },
        image: data.user.image || '',
      })
    }
  }, [data])

  return {
    user: useUserStore((state) => state),
    status,
    update,
  }
}
