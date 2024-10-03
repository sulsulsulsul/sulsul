'use client';
import { useQuery } from '@tanstack/react-query';

import { interviewOptions } from './../../../app/api/solved/query-options';

export const useInterview = (pivotDate?: string) => {
  const result = useQuery(interviewOptions(pivotDate));
  const { data, ...rest } = result;
  return {
    ...rest,
    data,
  };
};
