'use client';

import { useCallback } from 'react';
import { useQueries } from '@tanstack/react-query';

import { getQuestionDetail } from '../actions/get-question-detail-action';

export const usePracticeDetail = (questionIds: number[]) => {
  const results = useQueries({
    queries: questionIds.map((id) => ({
      queryKey: ['practiceDetail', id],
      queryFn: () => getQuestionDetail(id),
      enabled: false,
    })),
  });
  const refetchAll = useCallback(() => {
    results.forEach((result) => result.refetch());
  }, [results]);
  const dataAll = useCallback(() => {
    results.forEach((result) => result.data);
  }, [results]);

  return {
    data: dataAll,
    refetchAll,
  };
  // const {data, ...res} = result
  // return result
};
