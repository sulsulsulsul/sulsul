'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const createPracticeAction = (questionIds: number[]) => {
  return backendApi<number>({
    endpoint: API_ENDPOINT.practice.createPractice(),
    data: {
      questionIds,
    },
  });
};
