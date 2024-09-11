'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { RefreshAuthDTO } from '../types';

export interface RefreshActionParams {
  userId: number;
  refreshToken: string;
}

export const refreshAction = ({
  userId,
  refreshToken,
}: RefreshActionParams) => {
  return backendApi<RefreshAuthDTO>({
    endpoint: API_ENDPOINT.auth.refreshAuth(),
    data: {
      userId,
      refreshToken,
    },
  });
};
