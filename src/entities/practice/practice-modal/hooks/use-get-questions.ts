'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { ArchiveDetailDTO } from '@/entities/types';

import { getPracticeQuestion } from '../actions/get-questions';
import { getPracticeResume } from '../actions/get-resume';

export const QuestionListQueryOptions = (resumes: ArchiveDetailDTO[]) =>
  queryOptions({
    queryKey: ['questions', resumes],
    queryFn: () => {
      return getPracticeQuestion(resumes);
    },
    enabled: false,
  });

export const useQuestions = (resumes: ArchiveDetailDTO[]) => {
  const result = useQuery(QuestionListQueryOptions(resumes));
  const { data, ...rest } = result;
  return {
    ...rest,
    questions: data,
  };
};
