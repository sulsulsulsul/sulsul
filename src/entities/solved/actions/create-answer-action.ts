'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerActionParams {
  accessToken?: string;
  interviewId: number;
  content: string;
}
export const createAnswerAction = ({
  accessToken,
  interviewId,
  content,
}: AnswerActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.interview.createInterviewsAnswer(interviewId),
    data: {
      content: content,
    },
    accessToken,
  });
};
