'use server'

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point'
import { backendApi } from '@/lib/backend-api/client'

export const updatePracticeAction = async ({
  questionId,
  practiceStatus,
}: {
  questionId: number
  practiceStatus: string
}) => {
  return backendApi({
    endpoint: API_ENDPOINT.practice.updatePractice(),
    data: {
      questionId,
      practiceStatus,
    },
  })
}
