'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface UpdateUserJobParams {
  userId: number;
  jobId: number;
  accessToken?: string;
}

export const updateUserJob = async ({
  userId,
  jobId,
  accessToken,
}: UpdateUserJobParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.user.updateUserJob(userId, jobId),
    accessToken,
  });
};
