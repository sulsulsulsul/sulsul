'use server';

import { InterviewData, MyActivityData } from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getInterviewAction = (pivotDate: string) => {
  return backendApi<InterviewData>({
    endpoint: API_ENDPOINT.interview.getInterview(pivotDate),
  });
};
