'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const updateTimerAction = ({
  practiceId,
  time,
}: {
  practiceId: number;
  time: number;
}) => {
  return backendApi({
    endpoint: API_ENDPOINT.practice.updateTime(practiceId),
    data: {
      practiceTimeSec: time,
    },
  });
};
