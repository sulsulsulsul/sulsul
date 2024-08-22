'use server';
import { ArchiveListsDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getArchiveListAction = (
  page = 0,
  sortType: 'asc' | 'desc' = 'desc',
) => {
  return backendApi<ArchiveListsDTO>({
    endpoint: API_ENDPOINT.archive.getArchives(page, sortType),
  });
};
