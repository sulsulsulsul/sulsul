'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface AnswerActionParams {
  challengeId: number;
  accessToken: string;
  answer: string;
}
export const createMostFrequentAnswerAction = ({
  challengeId,
  accessToken,
  answer,
}: AnswerActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.challenges.createMostFrequentAnswer(challengeId),
    data: {
      answer: answer,
    },
    accessToken,
  });
};
