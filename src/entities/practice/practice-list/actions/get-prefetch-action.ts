'use server';
import { PracticeQuestionListType } from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export async function getPrefecthList() {
  return backendApi<PracticeQuestionListType>({
    endpoint: API_ENDPOINT.question.getAllSearchQuestions(),
  });
}
