'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerActionParams {
  accessToken: string;
  interviewId: number;
  answerId: number;
}
export const deleteAnswerAction = ({
  accessToken,
  interviewId,
  answerId,
}: AnswerActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.interview.deleteInterviewsAnswer(
      interviewId,
      answerId,
    ),
    accessToken,
  });
};
