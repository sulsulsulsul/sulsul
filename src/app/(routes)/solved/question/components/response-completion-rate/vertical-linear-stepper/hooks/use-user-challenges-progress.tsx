'use client';

import { useQuery } from '@tanstack/react-query';

import { myChallengesProgressOptions } from '@/app/api/solved/query-options';

interface VerticalLinearStepperProps {
  accessToken: string;
}

export const useUserChallengesProgress = ({
  accessToken,
}: VerticalLinearStepperProps) => {
  const result = useQuery(myChallengesProgressOptions(accessToken));
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
