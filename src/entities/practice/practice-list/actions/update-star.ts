'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface QuestionStarState {
  questionId: number;
  star: boolean;
}

export const updateQuestionStar = async ({
  questionId,
  star,
}: QuestionStarState) => {
  return backendApi({
    endpoint: API_ENDPOINT.practice.updateStar(),
    data: {
      questionId: questionId,
    },
  });
};
