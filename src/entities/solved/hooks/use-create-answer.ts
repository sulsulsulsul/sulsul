import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AnswerActionParams,
  createAnswerAction,
} from '../actions/create-answer-action';

interface CreateAnswerProp {
  currentInterviewId: number;
  userId: number;
  pivotDate: string;
  accessToken?: string;
}
export const useCreateAnswer = ({
  currentInterviewId,
  userId,
  pivotDate,
  accessToken,
}: CreateAnswerProp) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AnswerActionParams) => {
      return createAnswerAction(params);
    },

    onSuccess: () => {
      toast.success('답변을 등록했어요.');

      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, 'RECOMMENDED', accessToken],
      });
      queryClient.invalidateQueries({
        queryKey: ['interview', pivotDate],
      });
    },
  });
};
