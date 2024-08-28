import { signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

import {
  withdrawUser,
  WithdrawUserActionParams,
} from '../actions/withdraw-user-action';

export const useWithdrawUser = () => {
  return useMutation({
    mutationFn: async (params: WithdrawUserActionParams) => {
      return withdrawUser(params);
    },
    onSuccess: async () => {
      await signOut({ callbackUrl: '/' });
    },
  });
};
