import { useMutation } from '@tanstack/react-query';

import {
  updateAnswerAction,
  UpdateAnswerParams,
} from '../actions/update-answer-action';

export const useUpdateAnswer = () => {
  return useMutation({
    mutationFn: (params: UpdateAnswerParams) => {
      return updateAnswerAction(params);
    },
  });
};
