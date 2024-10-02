'use server';

import { MyChallengesProgressData } from '@/entities/types/challenges';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getUserChallengesProgress = (accessToken: string) => {
  return backendApi<MyChallengesProgressData[]>({
    endpoint: API_ENDPOINT.challenges.getUserChallengesProgress(),
    accessToken,
  });
};
