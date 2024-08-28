'use server';

import { ModalQuestionDetail } from '@/entities/types/question';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getModalQuestionDetail = async (id: number) => {
  return backendApi<ModalQuestionDetail>({
    endpoint: API_ENDPOINT.question.getQuestions(id),
  });
};
