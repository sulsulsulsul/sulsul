'use server';
import { ModalQuestionDetail } from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export async function getQuestionDetail(questionIds: number[]) {
  let getQuestionPromises = [];
  for (let i of questionIds) {
    getQuestionPromises.push(
      backendApi<ModalQuestionDetail>({
        endpoint: API_ENDPOINT.question.getQuestions(i),
      }),
    );
  }
  const result = await Promise.all(getQuestionPromises);
  return result.map((item, index) => {
    return { questionId: questionIds[index], data: item };
  });
}
