'use client';

import { useSession } from 'next-auth/react';
import { queryOptions, useQuery } from '@tanstack/react-query';

import { getArchiveListAction } from '@/entities/archives/actions';

export const ArchiveListQueryOptions = (
  page: number,
  sortType: 'asc' | 'desc',
  isAuthenticated?: boolean,
) =>
  queryOptions({
    queryKey: ['archives', 'list', page, sortType],
    queryFn: () => {
      return getArchiveListAction(page, sortType);
    },
    enabled: isAuthenticated,
  });

export const useArchives = (page: number, sortType: 'asc' | 'desc' = 'asc') => {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const result = useQuery(
    ArchiveListQueryOptions(page, sortType, isAuthenticated),
  );
  const { data, ...rest } = result;
  return {
    ...rest,
    archives: data,
    isAuthenticated,
  };
};
