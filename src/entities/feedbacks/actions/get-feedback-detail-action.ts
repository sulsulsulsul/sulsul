'use server';

import { ArchiveFeedback } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getFeedbackDetailAction = (questionId: number) => {
  return backendApi<ArchiveFeedback>({
    endpoint: API_ENDPOINT.feedback.getFeedback(questionId),
  });
};
