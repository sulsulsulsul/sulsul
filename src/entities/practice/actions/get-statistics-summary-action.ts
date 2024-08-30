'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { StatisticsSummary } from '../types';

const getStatisticsSummaryAction = (userId: number) => {
  return backendApi<StatisticsSummary>({
    endpoint: API_ENDPOINT.practice.getStatisticsSummary(),
    params: {
      userId,
    },
  });
};

export default getStatisticsSummaryAction;
