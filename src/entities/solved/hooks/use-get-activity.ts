'use client';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { myActivityOptions } from '@/app/api/solved/query-options';

interface UseUserActivityProps {
  userId: number;
  accessToken: string;
}

export const useUserActivity = ({
  userId,
  accessToken,
}: UseUserActivityProps) => {
  const result = useQuery(myActivityOptions(userId, accessToken));
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
