'use server';

import { KeywordDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getKeywordListAction = (questionId: number) => {
  return backendApi<KeywordDTO[]>({
    endpoint: API_ENDPOINT.keyword.getKeywords(questionId),
  });
};
