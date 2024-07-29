import { useMutation, useQueryClient } from '@tanstack/react-query'

import {
  updateAnswerAction,
  UpdateAnswerParams,
} from '../actions/update-answer-action'

export const useUpdateAnswer = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (params: UpdateAnswerParams) => {
      return updateAnswerAction(params)
    },
  })
}
