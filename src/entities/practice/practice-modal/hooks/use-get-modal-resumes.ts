'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { getPracticeResume } from '../actions/get-modal-resume';

export const ResumeListQueryOptions = () =>
  queryOptions({
    queryKey: ['resume'],
    queryFn: () => {
      return getPracticeResume();
    },
    staleTime: Infinity,
  });

export const useResumes = () => {
  const result = useQuery(ResumeListQueryOptions());
  const { data, ...rest } = result;
  return {
    ...rest,
    resume: data,
  };
};
