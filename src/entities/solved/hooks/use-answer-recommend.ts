import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createAnswerRecommendAction } from '../actions/create-answer-recommend-action';
import { deleteAnswerRecommendAction } from '../actions/delete-answer-recommend-action';

interface AnswerRecommendProp {
  currentInterviewId: number;
  accessToken: string;
  userId: number;
  pivotDate: string;
  sortType?: string;
}

interface AnswerRecommendParams {
  isRecommended: boolean;
  answerId: number;
}
export const useAnswerRecommend = ({
  currentInterviewId,
  accessToken,
  userId,
  pivotDate,
  sortType,
}: AnswerRecommendProp) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: AnswerRecommendParams) => {
      if (params.isRecommended) {
        return deleteAnswerRecommendAction({
          accessToken: accessToken,
          interviewId: currentInterviewId,
          answerId: params.answerId,
          userId: userId,
        });
      } else {
        return createAnswerRecommendAction({
          accessToken: accessToken,
          interviewId: currentInterviewId,
          answerId: params.answerId,
        });
      }
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myActivity', userId, accessToken],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });

      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, 'NEW', accessToken],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, 'RECOMMEND', accessToken],
      });
    },
  });
};
