import { KeywordDTO } from '@/entities/types'
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

export type CreateKeywordActionParams = {
  questionId: number
  content: string
}

export const createKeywordAction = ({
  questionId,
  content,
}: CreateKeywordActionParams) => {
  return backendApi<KeywordDTO>({
    endpoint: API_ENDPOINT.keyword.createKeyword(questionId),
    data: {
      content,
    },
  })
}
