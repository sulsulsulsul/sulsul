import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { createMostFrequentAnswerAction } from '../actions/create-most-frequent-answer-action';

interface MostFrequentAnswerParams {
  challengeId: number;
  accessToken: string;
  answer: string;
}

export const useCreateMostFrequentAnswer = ({
  accessToken,
  category,
}: {
  accessToken: string;
  category: string;
}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: MostFrequentAnswerParams) => {
      return createMostFrequentAnswerAction(params);
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
    onSuccess: () => {
      toast.success('저장되었습니다.');

      queryClient.invalidateQueries({
        queryKey: ['challenge', 'progress', accessToken],
      });
      queryClient.invalidateQueries({
        queryKey: ['challenge', 'questionList', category, accessToken],
      });
    },
  });
};
