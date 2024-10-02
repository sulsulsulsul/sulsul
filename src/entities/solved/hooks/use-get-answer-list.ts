'use client';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { AnswerList } from '@/entities/types/interview';

import {
  AnswerListActionProps,
  getAnswerListAction,
} from '../actions/get-answer-list-action';

export const useAnswerList = ({
  interviewId,
  sortType,
  accessToken,
  size,
}: AnswerListActionProps) => {
  const result = useInfiniteQuery({
    queryKey: ['interview', interviewId, sortType, accessToken, size],
    queryFn: ({ pageParam }) =>
      getAnswerListAction({
        interviewId,
        sortType,
        accessToken,
        size,
        pageParam,
      }),
    enabled: !!accessToken && !!interviewId,
    initialPageParam: 0,
    getNextPageParam: (lastPage: AnswerList) => {
      const nextPage = lastPage.page + 1;
      return nextPage < lastPage.totalPage ? nextPage : undefined;
    },
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
