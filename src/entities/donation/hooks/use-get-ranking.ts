import { useQuery } from '@tanstack/react-query';

import { getRankingAction } from '../actions/get-ranking-action';

export const useGetRanking = () => {
  const result = useQuery({
    queryKey: ['ranking'],
    queryFn: () => getRankingAction(),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    ranking: data,
  };
};
