import { useQuery } from '@tanstack/react-query';

import { getUserAction } from '../actions';

export const useUserInfo = (userId: number) => {
  const result = useQuery({
    queryKey: ['nickname', 'job', userId],
    queryFn: () => getUserAction({ userId }),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    userInfo: data,
  };
};
