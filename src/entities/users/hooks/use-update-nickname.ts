import {
  UpdateUserNicknameActionParams,
  updateUserNicknameAction,
} from '@/entities/users/actions'
import { useMutation } from '@tanstack/react-query'

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: (params: UpdateUserNicknameActionParams) => {
      return updateUserNicknameAction(params)
    },
  })
}
