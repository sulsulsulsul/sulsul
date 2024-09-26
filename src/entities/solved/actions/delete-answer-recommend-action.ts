'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface DeleteAnswerRecommendActionParams {
  accessToken: string;
  interviewId: number;
  answerId: number;
  userId: number;
}
export const deleteAnswerRecommendAction = ({
  accessToken,
  interviewId,
  answerId,
  userId,
}: DeleteAnswerRecommendActionParams) => {
  console.log(accessToken, interviewId, answerId, userId);
  return backendApi({
    endpoint: API_ENDPOINT.interview.deleteAnswerRecommend(
      interviewId,
      answerId,
      userId,
    ),
    accessToken,
  });
};
