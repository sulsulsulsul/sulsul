'use server';

import { MyQuestionList } from '@/entities/types/challenges';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getUserQuestionList = ({
  accessToken,
  category,
}: {
  accessToken: string;
  category: string;
}) => {
  return backendApi<MyQuestionList>({
    endpoint: API_ENDPOINT.challenges.getUserQuestionList(category),
    accessToken,
  });
};
