'use server'

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

import { UserDTO } from '../types'

export interface UpdateUserNicknameActionParams {
  userId: number
  nickname: string
}

export const updateUserNicknameAction = async ({
  nickname,
  userId,
}: UpdateUserNicknameActionParams) => {
  return backendApi<Pick<UserDTO, 'userId' | 'nickname'>>({
    endpoint: API_ENDPOINT.user.getUser(userId),
    data: {
      nickname,
    },
  })
}
