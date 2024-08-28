'use server';

import { ArchiveListsDTO } from '@/entities/types';
import { API_ENDPOINT } from '@/lib/backend-api/api-end-point';
import { backendApi } from '@/lib/backend-api/client';

export const getPracticeResume = async () => {
  // 첫 페이지를 먼저 호출하여 전체 페이지 수를 가져옴
  // const totalPages = firstPageData.totalPages;

  // 모든 페이지에 대해 비동기 호출을 병렬로 수행
  // const archivePromises = Array.from({ length: totalPages }, (_, index) =>
  //   backendApi<ArchiveListsDTO>({
  //     endpoint: API_ENDPOINT.archive.getArchives(index),
  //   }),
  // );

  // const allArchives = await Promise.all(archivePromises);

  // 각 페이지의 아카이브를 합쳐서 반환
  //const allResume = allArchives.flatMap((archive) => archive.archives);
  //FIX ROBIN
  //제한 풀고
  const firstPageData = await backendApi<ArchiveListsDTO>({
    endpoint: API_ENDPOINT.archive.getArchives(0, 'desc'),
  });
  return firstPageData.archives;
};
