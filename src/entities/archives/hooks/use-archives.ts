'use client';

import { queryOptions, useQuery } from '@tanstack/react-query';

import { getArchiveListAction } from '@/entities/archives/actions';

export const ArchiveListQueryOptions = (page: number) =>
  queryOptions({
    queryKey: ['archives', 'list', page],
    queryFn: () => {
      return getArchiveListAction(page);
    },
  });

export const useArchives = (page: number) => {
  const result = useQuery(ArchiveListQueryOptions(page));
  const { data, ...rest } = result;
  return {
    ...rest,
    archives: data,
  };
};
