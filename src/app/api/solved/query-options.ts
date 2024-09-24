import { queryOptions } from '@tanstack/react-query';

import { getUserActivityAction } from '@/entities/solved/actions';
import { getInterviewAction } from '@/entities/solved/actions/get-interview-action';

export const myActivityOptions = (userId: number, accessToken: string) => {
  return queryOptions({
    queryKey: ['interview', userId, accessToken],
    queryFn: () => {
      return getUserActivityAction({ userId, accessToken });
    },
  });
};

export const interviewOptions = (pivotDate: string) => {
  return queryOptions({
    queryKey: ['interview', pivotDate],
    queryFn: () => {
      return getInterviewAction(pivotDate);
    },
  });
};

export const interviewPrevOptions = (pivotDate: string) => {
  return queryOptions({
    queryKey: ['interview', 'prevDate', pivotDate],
    queryFn: () => {
      return getInterviewAction(pivotDate);
    },
  });
};
