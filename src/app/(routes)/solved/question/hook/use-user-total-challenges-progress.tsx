'use client';

import { useQuery } from '@tanstack/react-query';

import { myTotalChallengesProgressOptions } from '@/app/api/solved/query-options';

const UseUserTotalChallengesProgress = ({
  accessToken,
}: {
  accessToken: string;
}) => {
  const result = useQuery(myTotalChallengesProgressOptions(accessToken));
  const { data, ...reset } = result;
  return {
    ...reset,
    data,
  };
};

export default UseUserTotalChallengesProgress;
