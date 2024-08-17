'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { getArchiveListAction } from '@/entities/archives/actions';

export const ArchiveListQueryOptions = (
  page: number,
  sortType: 'asc' | 'desc',
) =>
  queryOptions({
    queryKey: ['archives', 'list', page, sortType],
    queryFn: () => {
      return getArchiveListAction(page, sortType);
    },
  });

export const useArchives = (page: number, sortType: 'asc' | 'desc') => {
  const result = useQuery(ArchiveListQueryOptions(page, sortType));
  const { data, ...rest } = result;
  return {
    ...rest,
    archives: data,
  };
};
