'use server';

import { MyActivityData } from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface GetUserActivityParams {
  userId: number;
  accessToken: string;
}
export const getUserActivityAction = ({
  userId,
  accessToken,
}: GetUserActivityParams) => {
  return backendApi<MyActivityData>({
    endpoint: API_ENDPOINT.interview.getUserActivity(userId),
    accessToken,
  });
};
