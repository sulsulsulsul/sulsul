'use client';
import { useQuery } from '@tanstack/react-query';

import { getUserActivityAction } from '../actions';

interface UseUserActivityProps {
  userId: number;
  accessToken: string;
}

export const useUserActivity = ({
  userId,
  accessToken,
}: UseUserActivityProps) => {
  const result = useQuery({
    queryKey: ['interview', userId, accessToken],
    queryFn: () => getUserActivityAction({ userId, accessToken }),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
