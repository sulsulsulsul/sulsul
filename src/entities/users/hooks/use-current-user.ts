import { useSession } from 'next-auth/react'

export const useCurrentUser = () => {
  const { data, status, update } = useSession()
  return {
    user: {
      ...data?.user,
      ...data?.user.auth,
      ...data?.user.data,
    },
    status,
    update,
  }
}
