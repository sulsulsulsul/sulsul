'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface CreateFeedbackParams {
  questionId: number;
  accessToken?: string;
}

export const createFeedbackAction = ({
  questionId,
  accessToken,
}: CreateFeedbackParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.feedback.createFeedback(questionId),
    accessToken,
  });
};
