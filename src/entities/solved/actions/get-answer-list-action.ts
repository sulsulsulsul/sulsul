'use server';

import { AnswerList } from '@/entities/types/interview';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerListActionProps {
  interviewId: number;
  sortType: 'NEW' | 'RECOMMEND';
  accessToken: string;
  count?: number;
}
export const getAnswerListAction = async ({
  interviewId,
  sortType,
  accessToken,
}: AnswerListActionProps) => {
  try {
    const response = await backendApi<AnswerList>({
      endpoint: API_ENDPOINT.interview.getSortedInterviewsAnswer({
        interviewId,
        sortType,
      }),
      accessToken,
    });
    return response;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};
