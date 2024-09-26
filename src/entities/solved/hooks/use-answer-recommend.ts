import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AnswerActionParams,
  createAnswerAction,
} from '../actions/create-answer-action';
import {
  createAnswerRecommendAction,
  CreateAnswerRecommendActionParams,
} from '../actions/create-answer-recommend-action';
import {
  deleteAnswerRecommendAction,
  DeleteAnswerRecommendActionParams,
} from '../actions/delete-answer-recommend-action';
import { updateAnswerAction } from '../actions/update-answer-action';

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
  console.log(isRecommended);
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
      toast.success('답변을 등록했어요.');

      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', pivotDate],
      });
    },
  });
};
