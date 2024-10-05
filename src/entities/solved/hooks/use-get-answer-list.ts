'use client';
import { useInfiniteQuery } from '@tanstack/react-query';

import { answerListOptions } from '@/app/api/solved/query-options';

import { AnswerListActionProps } from '../actions/get-answer-list-action';

export const useAnswerList = ({
  interviewId,
  sortType,
  accessToken,
}: AnswerListActionProps) => {
  const result = useInfiniteQuery({
    ...answerListOptions(interviewId, sortType, accessToken),
    enabled: !!accessToken,
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
