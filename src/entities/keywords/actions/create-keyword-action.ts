'use server'

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

export type CreateKeywordActionParams = {
  questionId: number
  content: string
  accessToken?: string
}

export const createKeywordAction = ({
  questionId,
  content,
  accessToken,
}: CreateKeywordActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.keyword.createKeyword(questionId),
    data: {
      content,
    },
    accessToken,
  })
}
