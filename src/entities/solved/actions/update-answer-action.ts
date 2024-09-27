'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerActionParams {
  accessToken?: string;
  interviewId: number;
  content: string;
  answerId: number;
}
export const updateAnswerAction = ({
  accessToken,
  interviewId,
  content,
  answerId,
}: AnswerActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.interview.updateInterviewsAnswer(
      interviewId,
      answerId,
    ),
    data: {
      content: content,
    },
    accessToken,
  });
};
