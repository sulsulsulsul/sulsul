'use client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { answerListOptions } from '@/app/api/solved/query-options';
import { AnswerList } from '@/entities/types/interview';

import { AnswerListActionProps } from '../actions/get-answer-list-action';

export const useAnswerList = ({
  interviewId,
  sortType,
  accessToken,
}: AnswerListActionProps) => {
  const result = useInfiniteQuery({
    ...answerListOptions(interviewId, sortType, accessToken),
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
