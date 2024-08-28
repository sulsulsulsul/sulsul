import {
  keepPreviousData,
  useQuery,
  UseQueryOptions,
} from '@tanstack/react-query';

import getStatisticsDetailAction from '../actions/get-statistics-detail-action';
import type { Period, StatisticsDetail } from '../types';

export interface StatisticsDetailParams {
  period: Period;
  userId: number;
  pivotDate?: string;
}

export const getQueryKey = (params: StatisticsDetailParams) => [
  'statistics-detail',
  params,
];

interface QueryParams {
  params: StatisticsDetailParams;
  options?: UseQueryOptions<StatisticsDetail[], Error>;
}

const useStatisticsDetail = ({ params, options }: QueryParams) => {
  return useQuery({
    queryKey: getQueryKey(params),
    queryFn: () => getStatisticsDetailAction(params),
    placeholderData: keepPreviousData,
    ...options,
  });
};

export default useStatisticsDetail;
