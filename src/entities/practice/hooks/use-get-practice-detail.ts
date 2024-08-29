'use client';

import { useCallback } from 'react';
import { useQueries, useQuery } from '@tanstack/react-query';

import { getQuestionDetail } from '../actions/get-question-detail-action';

export const usePracticeDetail = (questionIds: number[]) => {
  const results = useQuery({
    queryKey: ['practiceDetail', questionIds],
    queryFn: () => getQuestionDetail(questionIds),
  });
  const { data, ...res } = results;
  return {
    data,
    ...res,
  };
};
