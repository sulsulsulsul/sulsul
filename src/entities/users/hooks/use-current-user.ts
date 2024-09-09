'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

import { useUserStore } from '@/store/client';

export const useCurrentUser = () => {
  const { data, status, update } = useSession();
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  useEffect(() => {
    if (data?.user) {
      setUserInfo({
        auth: {
          userId: data.user.auth?.userId || 0,
          accessToken: data.user.auth?.accessToken || '',
          refreshToken: data.user.auth?.refreshToken || '',
        },
        data: {
          email: data.user.email || '',
          job: data.user.data?.job || { jobId: 0, name: '' },
          nickname: data.user.data?.nickname || '',
          userId: data.user.auth?.userId || 0,
          firstLogin: data.user.data?.firstLogin || false,
          firstPractice: data.user.data?.firstPractice || false,
        },
        image: data.user.image || '',
      });
    }
  }, [data, update, setUserInfo]);

  return {
    user: useUserStore((state) => state),
    status,
    update,
  };
};
