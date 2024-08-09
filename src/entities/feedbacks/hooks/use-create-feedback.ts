import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createFeedbackAction, CreateFeedbackParams } from '../actions';

export const useCreateFeedback = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: CreateFeedbackParams) => {
      return createFeedbackAction(params);
    },
    onSuccess: (_, variables) => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: ['feedback', variables.questionId],
        });
      }, 4000);
    },
  });
};
