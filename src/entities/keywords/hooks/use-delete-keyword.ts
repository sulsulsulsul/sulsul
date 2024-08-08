import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { deleteKeywordAction, DeleteKeywordActionParams } from '../actions'

export const useDeleteKeyword = () => {
  return useMutation({
    mutationFn: async (params: DeleteKeywordActionParams) => {
      return deleteKeywordAction(params)
    },
    onError: () => {
      toast.error('요청 중 오류가 발생했습니다. 다시 시도해주세요.')
    },
  })
}
