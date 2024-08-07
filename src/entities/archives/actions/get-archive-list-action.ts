'use server';
import { ArchiveListsDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getArchiveListAction = async (page = 0) => {
  return backendApi<ArchiveListsDTO>({
    endpoint: API_ENDPOINT.archive.getArchives(page),
  });
};
