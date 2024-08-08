'use server';

import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export interface DeleteArchiveActionRequest {
  id: number;
}

export const deleteArchiveAction = async (id: number) => {
  return backendApi<void>({
    endpoint: API_ENDPOINT.archive.deleteArchive(id),
  });
};
