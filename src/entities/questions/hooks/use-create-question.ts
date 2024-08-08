import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createQuestionAction,
  CreateQuestionParams,
} from '../actions/create-question-action';

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CreateQuestionParams) => {
      return createQuestionAction(params);
    },
  });
};
