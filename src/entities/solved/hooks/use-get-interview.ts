'use client';
import { useQuery } from '@tanstack/react-query';

import { getUserActivityAction } from '../actions';
import { getInterviewAction } from '../actions/get-interview-action';

export const useInterview = (pivotDate: string) => {
  const result = useQuery({
    queryKey: ['interview', pivotDate],
    queryFn: () => getInterviewAction(pivotDate),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
