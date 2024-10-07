'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface createReportUserActionParams {
  accessToken: string;
  answerId: number;
}
export const createReportUserAction = ({
  accessToken,
  answerId,
}: createReportUserActionParams) => {
  return backendApi({
    endpoint: API_ENDPOINT.report.createUserReport(),
    data: {
      contentId: answerId,
    },
    accessToken,
  });
};
