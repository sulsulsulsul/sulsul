'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { type SearchQuestionsParams } from '../hooks/use-search-questions';
import type { SearchQuestion } from '../types';

const getSearchQuestionsAction = (params: SearchQuestionsParams) => {
  return backendApi<SearchQuestion>({
    endpoint: API_ENDPOINT.question.getSearchQuestions(),
    params,
  });
};

export default getSearchQuestionsAction;
