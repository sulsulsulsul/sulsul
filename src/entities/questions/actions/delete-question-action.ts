'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface DeleteAnswerParams {
  questionId: number;
  accessToken?: string;
}

export const deleteAnswerAction = async ({
  questionId,
  accessToken,
}: DeleteAnswerParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.deleteQuestion(questionId),
    accessToken,
  });
};
