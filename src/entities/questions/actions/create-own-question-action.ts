'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface CreateOwnQuestionParams {
  archiveId: number;
  accessToken?: string;
  question: string;
}

export const createOwnQuestionAction = async ({
  archiveId,
  question,
  accessToken,
}: CreateOwnQuestionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.question.createOwnQuestion(archiveId),
    accessToken,
    data: {
      question,
    },
  });
};
