'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { RefreshAuthDTO } from '../types';

export interface RefreshActionParams {
  userId: number;
  refreshToken: string;
}

export const refreshAction = async ({
  userId,
  refreshToken,
}: RefreshActionParams) => {
  try {
    const response = await backendApi<RefreshAuthDTO>({
      endpoint: API_ENDPOINT.auth.refreshAuth(),
      data: {
        userId,
        refreshToken,
      },
    });
    return response;
  } catch (error) {
    console.error('Refresh API error:', error);
    throw error;
  }
};
