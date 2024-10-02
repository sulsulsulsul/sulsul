'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export type CreateKeywordActionParams = {
  questionId: number;
  content: string;
  type: string;
  accessToken?: string;
};

export const createKeywordAction = ({
  questionId,
  content,
  type,
  accessToken,
}: CreateKeywordActionParams) => {
  if (type !== 'challenge') {
    return backendApi({
      endpoint: API_ENDPOINT.keyword.createKeyword(questionId),
      data: {
        content,
      },
      accessToken,
    });
  } else {
    return backendApi({
      endpoint: API_ENDPOINT.keyword.createChallengeKeyword(questionId),
      data: {
        content,
      },
      accessToken,
    });
  }
};
