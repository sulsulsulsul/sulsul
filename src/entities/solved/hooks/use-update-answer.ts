import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AnswerActionParams,
  createAnswerAction,
} from '../actions/create-answer-action';
import { updateAnswerAction } from '../actions/update-answer-action';

interface EditAnswerProp {
  currentInterviewId: number;
  answerId: number;
  content: string;
  pivotDate: string;
  userId: number;
}
export const useUpdateAnswer = ({
  currentInterviewId,
  answerId,
  content,
  pivotDate,
  userId,
}: EditAnswerProp) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return updateAnswerAction({
        interviewId: currentInterviewId,
        answerId,
        content,
      });
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      toast.success('답변을 수정했어요.');

      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', pivotDate],
      });
    },
  });
};
