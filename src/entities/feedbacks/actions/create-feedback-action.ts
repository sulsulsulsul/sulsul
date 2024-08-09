'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface CreateFeedbackParams {
  questionId: number;
  accessToken?: string;
}

// http://15.165.12.248:8080/swagger-ui/index.html#/Feedback%20API/createFeedback
export const createFeedbackAction = async ({
  questionId,
  accessToken,
}: CreateFeedbackParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.feedback.createFeedback(questionId),
    accessToken,
  });
};
