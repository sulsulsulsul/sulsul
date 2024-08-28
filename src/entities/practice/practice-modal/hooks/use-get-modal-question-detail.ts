'use client';

import { queryOptions, useQueries, useQuery } from '@tanstack/react-query';

import { getModalQuestionDetail } from '../actions/get-modal-questionDetail';

// export const ModalQuestionDetail = () =>
//   queryOptions({
//     queryKey: ['questionDetail'],
//     queryFn: () => {
//       return
//     },
//     staleTime: Infinity,
//   });

export const useModalQuestionDetail = (questionIds: number[]) => {
  const result = useQueries({
    queries: questionIds.map((item: number) => ({
      queryKey: ['questionDetail', item],
      queryFn: () => getModalQuestionDetail(item),
    })),
  });
  // const { data, ...rest } = result;
  return result;
};
