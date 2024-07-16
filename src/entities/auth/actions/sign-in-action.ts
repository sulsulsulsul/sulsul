'use server'

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'
import { AuthDTO } from '../types'

export interface SignInActionParams {
  token: string
  oauthType: 'GOOGLE' | 'KAKAO'
}

export const signInAction = ({ token, oauthType }: SignInActionParams) => {
  return backendApi<AuthDTO>({
    endpoint: API_ENDPOINT.auth.signIn(oauthType),
    data: {
      token,
    },
  })
}
