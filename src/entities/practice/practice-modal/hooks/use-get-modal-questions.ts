'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPracticeQuestion } from '../actions/get-modal-questions';

export const QuestionListQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['questions', id],
    queryFn: () => {
      return getPracticeQuestion(id);
    },
    staleTime: Infinity,
  });

export const usePracticeQuestions = (id: number) => {
  const result = useQuery(QuestionListQueryOptions(id));
  const { data, ...rest } = result;
  return {
    ...rest,
    questions: data,
  };
};
