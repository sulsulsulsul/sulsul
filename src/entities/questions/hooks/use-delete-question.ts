import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  deleteAnswerAction,
  DeleteAnswerParams,
} from '../actions/delete-question-action';

export const useDeleteQuestion = (archiveId: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: DeleteAnswerParams) => {
      return deleteAnswerAction(params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['archive', archiveId] });
    },
  });
};
