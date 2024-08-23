'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { SearchParam } from '@/entities/types/question';

import { getSearchQuestions } from '../actions/getList';

export const usePracticeList = (props: SearchParam) => {
  const result = useQuery({
    queryKey: ['practiceList', props],
    queryFn: () => getSearchQuestions(props),
    staleTime: Infinity,
  });
  const { data, ...rest } = result;
  return {
    questionsList: data,
    ...rest,
  };
};
