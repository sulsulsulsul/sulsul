import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';

import {
  withdrawUser,
  WithdrawUserActionParams,
} from '../actions/withdraw-user-action';

export const useWithdrawUser = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (params: WithdrawUserActionParams) => {
      return withdrawUser(params);
    },
    onSuccess: async () => {
      await signOut({ callbackUrl: '/' });
    },
  });
};
