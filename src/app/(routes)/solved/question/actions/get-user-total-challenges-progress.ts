'use server';

import { MyTotalChallengesProgressData } from '@/entities/types/challenges';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const GetUserTotalChallengesProgress = (accessToken: string) => {
  return backendApi<MyTotalChallengesProgressData>({
    endpoint: API_ENDPOINT.challenges.getUserTotalChallengesProgress(),
    accessToken,
  });
};
