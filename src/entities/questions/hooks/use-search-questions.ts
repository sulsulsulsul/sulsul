import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import getSearchQuestionsAction from '../actions/get-search-questions-action';
import type { PracticeStatus, SearchQuestion } from '../types';

export interface SearchQuestionsParams {
  userId: number;
  practiceStatus?: PracticeStatus;
  hint?: boolean;
  star?: boolean;
  page?: number;
  size?: number;
}

export const getQueryKey = (params: SearchQuestionsParams) => [
  'question-search',
  params,
];

interface QueryParams {
  params: SearchQuestionsParams;
  options?: UseQueryOptions<SearchQuestion, Error>;
}

const useSearchQuestions = ({ params, options }: QueryParams) => {
  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getSearchQuestionsAction(params),
    ...options,
  });
};

export default useSearchQuestions;
