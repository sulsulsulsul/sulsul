'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

import { type StatisticsDetailParams } from '../hooks/use-statistics-detail';
import type { StatisticsDetail } from '../types';

const getStatisticsDetailAction = (params: StatisticsDetailParams) => {
  return backendApi<StatisticsDetail[]>({
    endpoint: API_ENDPOINT.practice.getStatisticsDetail(params.period),
    params: {
      userId: params.userId,
      pivotDate: params.pivotDate,
    },
  });
};

export default getStatisticsDetailAction;
