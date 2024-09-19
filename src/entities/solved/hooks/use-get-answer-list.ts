'use client';
import { useQuery } from '@tanstack/react-query';

import {
  AnswerListActionProps,
  getAnswerListAction,
} from '../actions/get-answer-list-action';

export const useAnswerList = ({
  interviewId,
  sortType,
  accessToken,
}: AnswerListActionProps) => {
  const result = useQuery({
    queryKey: ['interview', interviewId, sortType, accessToken],
    queryFn: () => getAnswerListAction({ interviewId, sortType, accessToken }),
  });

  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
