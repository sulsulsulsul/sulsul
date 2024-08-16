import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  updateQuestionAction,
  UpdateQuestionParams,
} from '../actions/update-question-action';

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: UpdateQuestionParams) => {
      return updateQuestionAction(params);
    },
  });
};
