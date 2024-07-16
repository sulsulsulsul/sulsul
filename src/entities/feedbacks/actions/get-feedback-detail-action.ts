'use server'

import { FeedbackDTO } from '@/entities/types'
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

// http://15.165.12.248:8080/swagger-ui/index.html#/Feedback%20API/getFeedbackDetail
export const getFeedbackDetailAction = async (questionId: number) => {
  return backendApi<FeedbackDTO>({
    endpoint: API_ENDPOINT.feedback.getFeedback(questionId),
  })
}
