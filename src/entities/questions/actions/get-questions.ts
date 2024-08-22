'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getQuestionsAction = (questionId: number) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.getQuestions(questionId),
  });
};
