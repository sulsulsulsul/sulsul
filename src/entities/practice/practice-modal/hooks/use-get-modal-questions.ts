'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import {
  getAllPracticeQuestion,
  getPracticeQuestion,
} from '../actions/get-modal-questions';

export const QuestionListQueryOptions = (id: number) =>
  queryOptions({
    queryKey: ['questions', id],
    queryFn: () => {
      return getPracticeQuestion(id);
    },
  });

export const usePracticeQuestions = (id: number) => {
  const result = useQuery(QuestionListQueryOptions(id));
  const { data, ...rest } = result;
  return {
    ...rest,
    questions: data,
  };
};

export const AllQuestionListQueryOptions = (ids: number[]) =>
  queryOptions({
    queryKey: ['questions', ids],
    queryFn: () => {
      return getAllPracticeQuestion(ids);
    },
    // staleTime: Infinity,
  });

export const useAllPracticeQuestions = (ids: number[]) => {
  const result = useQuery(AllQuestionListQueryOptions(ids));
  const { data, ...rest } = result;
  return {
    ...rest,
    allQuestions: data,
  };
};
