'use client';

import { useQuery } from '@tanstack/react-query';

import { SearchParam } from '@/entities/types/question';

import { getPrefecthList } from '../actions/get-prefetch-action';

export const useAllPracticeList = () => {
  const result = useQuery({
    queryKey: ['practiceCount'],
    queryFn: () => getPrefecthList(),
  });
  const { data, ...rest } = result;
  return {
    list: data,
    ...rest,
  };
};
