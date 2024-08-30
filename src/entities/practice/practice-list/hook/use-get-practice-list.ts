'use client';

import { useQuery } from '@tanstack/react-query';

import { SearchParam } from '@/entities/types/question';

import { getSearchQuestions } from '../actions/get-list-action';

export const usePracticeList = (props: SearchParam) => {
  const result = useQuery({
    queryKey: ['practiceList', props],
    queryFn: () => getSearchQuestions(props),
  });
  const { data, ...rest } = result;
  return {
    questionsList: data,
    ...rest,
  };
};
