'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface UpdateQuestionParams {
  questionId: number;
  accessToken?: string;
  content: string;
}

export const updateQuestionAction = ({
  questionId,
  accessToken,
  content,
}: UpdateQuestionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.updateQuestion(questionId),
    accessToken,
    data: { content },
  });
};
