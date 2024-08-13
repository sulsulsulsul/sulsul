import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  createOwnQuestionAction,
  CreateOwnQuestionParams,
} from '../actions/create-own-question-action';

export const useCreateOwnQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CreateOwnQuestionParams) => {
      return createOwnQuestionAction(params);
    },
  });
};
