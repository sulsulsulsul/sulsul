import { useMutation } from '@tanstack/react-query';

import {
  updateQuestionAction,
  UpdateQuestionParams,
} from '../actions/update-question-action';

export const useUpdateQuestion = () => {
  return useMutation({
    mutationFn: (params: UpdateQuestionParams) => {
      return updateQuestionAction(params);
    },
  });
};
