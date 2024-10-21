'use client';
import { useQuery } from '@tanstack/react-query';

import { InterviewData } from '@/entities/types/interview';

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
    enabled: !!accessToken && !!interviewId,
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
