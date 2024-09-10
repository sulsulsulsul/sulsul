'use server';

import { ArchiveDetailDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getPracticeQuestion = async (id: number) => {
  return backendApi<ArchiveDetailDTO>({
    endpoint: API_ENDPOINT.archive.getArchive(id),
  });
};

export const getAllPracticeQuestion = async (ids: number[]) => {
  const collect = [];
  for (let i of ids) {
    collect.push(
      backendApi<ArchiveDetailDTO>({
        endpoint: API_ENDPOINT.archive.getArchive(i),
      }),
    );
  }
  const result = await Promise.all(collect);
  return result.flatMap((item) => item.questions);
};
