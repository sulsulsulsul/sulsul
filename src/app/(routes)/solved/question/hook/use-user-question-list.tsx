'use client';

import { useQuery } from '@tanstack/react-query';

import { myQuestionListOptions } from '@/app/api/solved/query-options';

interface QuestionListType {
  accessToken: string;
  category: string;
}

export const useUserQuestionList = ({
  accessToken,
  category,
}: QuestionListType) => {
  const result = useQuery(myQuestionListOptions(accessToken, category));
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
