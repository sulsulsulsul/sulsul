'use client';

import { useQuery } from '@tanstack/react-query';

import { SearchParam } from '@/entities/types/question';

import { getPrefecthList } from '../actions/get-prefetch-action';

export const useAllPracticeList = (userId: number) => {
  const result = useQuery({
    queryKey: ['practiceCount', userId],
    queryFn: () => getPrefecthList(userId),
  });
  const { data, ...rest } = result;
  return {
    list: data,
    ...rest,
  };
};
