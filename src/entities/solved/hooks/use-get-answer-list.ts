'use client';
import { useQuery } from '@tanstack/react-query';

import {
  AnswerListActionProps,
  getAnswerListAction,
} from '../actions/get-answer-list-action';

export const useAnswerList = ({
  interviewId,
  sortType,
}: AnswerListActionProps) => {
  const result = useQuery({
    queryKey: ['interview', interviewId, sortType],
    queryFn: () => getAnswerListAction({ interviewId, sortType }),
  });
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
