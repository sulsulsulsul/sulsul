'use client';

import { useQuery } from '@tanstack/react-query';

import { getArchiveDetailedAction } from '../actions/getList';

export const usePracticeList = () => {
  const result = useQuery({
    queryKey: ['practiceList'],
    queryFn: () => getArchiveDetailedAction(),
  });
  const { data, ...rest } = result;
  return {
    list: data!,
    ...rest,
  };
};
