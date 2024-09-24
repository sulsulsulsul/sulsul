import {
  QueryClient,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AnswerActionParams,
  createAnswerAction,
} from '../actions/create-answer-action';

interface CreateAnswerProp {
  currentInterviewId: number;
  userId: number;
}
export const useCreateAnswer = ({
  currentInterviewId,
  userId,
}: CreateAnswerProp) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AnswerActionParams) => {
      return createAnswerAction(params);
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['interview', currentInterviewId, userId],
      });
    },
  });
};
