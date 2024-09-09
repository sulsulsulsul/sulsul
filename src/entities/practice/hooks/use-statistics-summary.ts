import { useQuery, UseQueryOptions } from '@tanstack/react-query';

import getStatisticsSummaryAction from '../actions/get-statistics-summary-action';
import type { StatisticsSummary } from '../types';

export const getQueryKey = (userId: number) => ['statistics-summary', userId];

interface QueryParams {
  userId: number;
  options?: UseQueryOptions<StatisticsSummary, Error>;
}

const useStatisticsSummary = ({ userId, options }: QueryParams) => {
  return useQuery({
    queryKey: getQueryKey(userId),
    queryFn: () => getStatisticsSummaryAction(userId),
    ...options,
  });
};

export default useStatisticsSummary;
