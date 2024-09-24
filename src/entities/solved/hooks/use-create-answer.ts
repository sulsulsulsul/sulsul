import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import {
  AnswerActionParams,
  createAnswerAction,
} from '../actions/create-answer-action';

export const useCreateAnswer = () => {
  return useMutation({
    mutationFn: (params: AnswerActionParams) => {
      return createAnswerAction(params);
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
