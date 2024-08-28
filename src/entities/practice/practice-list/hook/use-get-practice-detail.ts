'use client';

import { useQueries, useQuery } from '@tanstack/react-query';

import { SearchParam } from '@/entities/types/question';

import { getPrefecthList } from '../actions/get-prefetch-action';
import { getQuestionDetail } from '../actions/get-question-detail-action';

export const usePracticeDetail = (questionIds: number[]) => {
  // const result = useQueries({
  //   // queryKey: ['practiceCount'],
  //   // queryFn: () => getPrefecthList(),
  //   // queryKey:['practiceDetail', questionId],
  //   // queryFn:()=> getQuestionDetail(questionId),
  //   queries: questionIds.map((id) => ({
  //     queryKey: ['practiceDetail', id],
  //     queryFn: () => getQuestionDetail(id),
  //     staleTime: Infinity,
  // }))});
  // return result
};
