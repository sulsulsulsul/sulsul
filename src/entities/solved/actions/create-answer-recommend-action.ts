'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface CreateAnswerRecommendActionParams {
  accessToken?: string;
  interviewId: number;
  answerId: number;
}
export const createAnswerRecommendAction = ({
  accessToken,
  interviewId,
  answerId,
}: CreateAnswerRecommendActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.interview.createAnswerRecommend(
      interviewId,
      answerId,
    ),

    accessToken,
  });
};
