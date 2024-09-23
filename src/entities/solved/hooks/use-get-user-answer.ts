'use client';
import { useQuery } from '@tanstack/react-query';

import {
  AnswerListActionProps,
  getAnswerListAction,
} from '../actions/get-answer-list-action';
import { getUserAnswerAction } from '../actions/get-interview-answer-action';

interface UserAnswerProp {
  interviewId: number;
  userId: number;
}
export const useUserAnswer = ({ interviewId, userId }: UserAnswerProp) => {
  const result = useQuery({
    queryKey: ['interview', interviewId, userId],
    queryFn: () => getUserAnswerAction({ interviewId, userId }),
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
