import { useMutation } from '@tanstack/react-query';

import {
  updateUserNicknameAction,
  UpdateUserNicknameActionParams,
} from '@/entities/users/actions';

export const useUpdateNickname = () => {
  return useMutation({
    mutationFn: (params: UpdateUserNicknameActionParams) => {
      return updateUserNicknameAction(params);
    },
  });
};
