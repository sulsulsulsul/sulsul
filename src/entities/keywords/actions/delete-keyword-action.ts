import { KeywordDTO } from '@/entities/types'
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

export type DeleteKeywordActionParams = {
  questionId: number
  id: number
}

export const deleteKeywordAction = (params: DeleteKeywordActionParams) => {
  return backendApi<KeywordDTO>({
    endpoint: API_ENDPOINT.keyword.deleteKeyword(params),
  })
}
