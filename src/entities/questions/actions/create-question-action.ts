'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface CreateQuestionParams {
  archiveId: number;
  accessToken?: string;
}

export const createQuestionAction = ({
  archiveId,
  accessToken,
}: CreateQuestionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.createQuestions(archiveId),
    accessToken,
  });
};
