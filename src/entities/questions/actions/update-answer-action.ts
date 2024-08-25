'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface UpdateAnswerParams {
  questionId: number;
  accessToken?: string;
  answer: string;
}

export const updateAnswerAction = ({
  questionId,
  accessToken,
  answer,
}: UpdateAnswerParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.updateAnswer(questionId),
    accessToken,
    data: { answer },
  });
};
