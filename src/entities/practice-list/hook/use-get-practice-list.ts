'use client';

import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { useArchives } from '@/entities/archives/hooks';

import { getArchiveDetailedAction } from '../actions/getList';

// export const PracticeQueryOptions = queryOptions({
//     queryKey: ['practiceList', "list"],
//     queryFn: () => getArchiveDetailedAction(),
//   });

// export const usePracticeArchive = (page:number) => {
//   const result = useQuery({
//     queryKey: ['practiceArchive'],
//     queryFn: () => getArchiveListAction(page),
//   });
//   const { data, ...rest } = result;
//   return {
//     practiceArchive: data,
//     ...rest,
//   };
//};

export const usePracticeList = () => {
  const result = useQuery({
    queryKey: ['practiceList'],
    queryFn: () => getArchiveDetailedAction(),
  });
  const { data, ...rest } = result;
  return {
    list: data,
    ...rest,
  };
};

// export const ArchiveListQueryOptions = (page: number) =>
//   queryOptions({
//     queryKey: ['archives', 'list', page],
//     queryFn: () => {
//       return getArchiveListAction(page);
//     },
//   });
