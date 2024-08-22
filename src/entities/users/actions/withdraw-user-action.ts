'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface WithdrawUserActionParams {
  userId: number;
}

export const withdrawUser = ({ userId }: WithdrawUserActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.user.withdrawUser(userId),
  });
};
