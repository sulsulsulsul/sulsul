'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface PracticeQuestionProp {
  questionId: number;
  questionIds: number[];
}

export const createPracticeQuestion = async ({
  questionId,
  questionIds,
}: PracticeQuestionProp) => {
  return backendApi({
    endpoint: API_ENDPOINT.practice.createPracticeQuestion(questionId),
    data: {
      questionIds: questionIds,
    },
  });
};
