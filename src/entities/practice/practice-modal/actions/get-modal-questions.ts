'use server';

import { ArchiveDetailDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getPracticeQuestion = async (id: number) => {
  return backendApi<ArchiveDetailDTO>({
    endpoint: API_ENDPOINT.archive.getArchive(id),
  });
};
