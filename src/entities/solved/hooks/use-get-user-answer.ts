'use client';
import { useQuery } from '@tanstack/react-query';

import { getUserAnswerAction } from '../actions/get-interview-answer-action';

interface UserAnswerProp {
  interviewId: number;
  userId: number;
  accessToken: string;
}
export const useUserAnswer = ({
  interviewId,
  userId,
  accessToken,
}: UserAnswerProp) => {
  const result = useQuery({
    queryKey: ['interview', interviewId, userId, accessToken],
    queryFn: () => getUserAnswerAction({ interviewId, userId, accessToken }),
    enabled: !!accessToken,
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
