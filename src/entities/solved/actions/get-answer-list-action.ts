'use server';

import { AnswerList, InterviewData } from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerListActionProps {
  interviewId: number;
  sortType: 'NEW' | 'RECOMMEND';
  interviewData?: InterviewData;
  accessToken?: string;
  pageParam?: number;
}
export const getAnswerListAction = async ({
  interviewId,
  sortType,
  accessToken,
  pageParam,
}: AnswerListActionProps) => {
  try {
    const response = await backendApi<AnswerList>({
      endpoint: API_ENDPOINT.interview.getSortedInterviewsAnswer({
        interviewId,
        sortType,
      }),
      params: {
        page: pageParam,
      },
      accessToken,
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
