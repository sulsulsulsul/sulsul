import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAnswerRecommendAction } from '../actions/create-answer-recommend-action';
import { deleteAnswerRecommendAction } from '../actions/delete-answer-recommend-action';

interface AnswerRecommendProp {
  currentInterviewId: number;
  userId: number;
  pivotDate: string;
  accessToken: string;
  isRecommended: boolean;
  answerId: number;
}
export const useAnswerRecommend = ({
  currentInterviewId,
  userId,
  pivotDate,
  accessToken,
  isRecommended,
  answerId,
}: AnswerRecommendProp) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => {
      if (isRecommended) {
        return deleteAnswerRecommendAction({
          accessToken,
          interviewId: currentInterviewId,
          answerId,
          userId,
        });
      } else {
        return createAnswerRecommendAction({
          accessToken,
          interviewId: currentInterviewId,
          answerId,
        });
      }
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', pivotDate],
      });
    },
  });
};
